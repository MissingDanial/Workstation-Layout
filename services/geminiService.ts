import OpenAI from "openai";
import { FengShuiReport, FengShuiElement } from "../types";

// Helper to convert blob to base64
export const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const facingDirMap: Record<string, string> = {
  "North": "北",
  "South": "南",
  "East": "东",
  "West": "西",
  "North-East": "东北",
  "North-West": "西北",
  "South-East": "东南",
  "South-West": "西南",
};

const formatOrientationAnalysis = (value: any): string => {
  if (value && typeof value === "object") {
    const dirRaw = value.facingDirection ?? value.direction ?? value.dir;
    const dirZh = typeof dirRaw === "string" ? (facingDirMap[dirRaw] ?? dirRaw) : "";
    const element = value.elementAlignment ?? value.elementAssociation ?? "";
    const flow = value.energyFlow ?? value.flow ?? "";
    const parts = [
      dirZh ? `朝向：${dirZh}` : "",
      element ? `五行：${element}` : "",
      flow ? `气流：${flow}` : "",
    ].filter(Boolean);
    if (parts.length) return parts.join("；");
  }
  return typeof value === "string" ? value : JSON.stringify(value);
};

export const analyzeOfficeSpace = async (file: File, orientation: string): Promise<FengShuiReport> => {
  const apiKey = import.meta.env.VITE_DASHSCOPE_API_KEY as string | undefined;
  if (!apiKey) throw new Error("API Key not found. Set VITE_DASHSCOPE_API_KEY in your env.");

  const openai = new OpenAI({
    apiKey,
    // 北京区域默认；若使用新加坡区域请改为：https://dashscope-intl.aliyuncs.com/compatible-mode/v1
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    // 注意：在浏览器环境启用会暴露密钥，需确保前端不可被滥用
    dangerouslyAllowBrowser: true,
  });

  const filePart = await fileToGenerativePart(file);

  const messages = [
    {
      role: "user" as const,
      content: [
        {
          type: "image_url" as const,
          image_url: {
            url: `data:${file.type};base64,${filePart.inlineData.data}`
          }
        },
        {
          type: "text" as const,
          text: `
你是一位精通现代企业环境的世界级风水大师，请用中文输出。
输入是一段${file.type.startsWith('video') ? '视频' : '图片'}，用户的工位朝向为：${orientation}。

请完成：
1) 识别主要物件（桌子、绿植、电子设备、艺术品等），判断其五行属性。
2) 检测煞气来源：横梁压顶、尖角对座、杂乱、枯萎植物、错误的座位朝向/背门等。
3) 给出现代且含蓄的化煞建议。
4) 生成每日微风水 SOP（小而可执行的习惯）。

请务必以 JSON 返回，键名如下：
- overallScore (1-100)
- overallVibe
- orientationAnalysis
- items[{name, element, energyScore, description, placementAdvice}]
- issues[{title, type, severity, description, remedy}]
- dailySOP[{time, action, meaning, icon?}]

如果被问到“你是什么模型/是谁”等类似问题，必须回答：
“我是风水大师”
`
        }
      ]
    }
  ];

  try {
    const result = await openai.chat.completions.create({
      model: "qwen3-vl-plus",
      messages,
      response_format: { type: "json_object" }
    });

    const text = result.choices?.[0]?.message?.content;
    if (!text) throw new Error("No response from model");

    const parsed = JSON.parse(text) as any;

    // Normalize fields that UI expects as string
    const coerce = (v: any) => typeof v === "string" ? v : JSON.stringify(v);
    const report: FengShuiReport = {
      overallScore: Number(parsed.overallScore) || 0,
      overallVibe: coerce(parsed.overallVibe),
      orientationAnalysis: formatOrientationAnalysis(parsed.orientationAnalysis),
      items: Array.isArray(parsed.items) ? parsed.items.map((it: any) => ({
        name: coerce(it.name),
        element: (it.element ?? it.Element ?? it.fiveElement ?? 'Unknown') as any,
        energyScore: Number(it.energyScore ?? it.score ?? 0),
        description: coerce(it.description),
        placementAdvice: coerce(it.placementAdvice ?? it.advice),
      })) : [],
      issues: Array.isArray(parsed.issues) ? parsed.issues.map((it: any) => ({
        title: coerce(it.title),
        type: it.type ?? 'Other',
        severity: it.severity ?? 'Low',
        description: coerce(it.description),
        remedy: coerce(it.remedy),
      })) : [],
      dailySOP: Array.isArray(parsed.dailySOP) ? parsed.dailySOP.map((it: any) => ({
        time: coerce(it.time),
        action: coerce(it.action),
        meaning: coerce(it.meaning),
        icon: it.icon,
      })) : []
    };

    return report;

  } catch (error) {
    console.error("Feng Shui Analysis Failed:", error);
    throw error;
  }
};