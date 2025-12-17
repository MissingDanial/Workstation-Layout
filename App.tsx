import React, { useState } from 'react';
import { analyzeOfficeSpace } from './services/geminiService';
import { FengShuiReport, Orientation } from './types';
import { AnalysisView } from './components/AnalysisView';
import { CompassIcon, UploadIcon, YinYangIcon, VideoIcon } from './components/Icons';

const ORIENTATIONS: { value: Orientation; label: string }[] = [
  { value: 'North', label: '北' },
  { value: 'South', label: '南' },
  { value: 'East', label: '东' },
  { value: 'West', label: '西' },
  { value: 'North-East', label: '东北' },
  { value: 'North-West', label: '西北' },
  { value: 'South-East', label: '东南' },
  { value: 'South-West', label: '西南' },
];

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [orientation, setOrientation] = useState<Orientation>('North');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<FengShuiReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Basic validation
      if (selectedFile.size > 20 * 1024 * 1024) {
        setError("文件过大，请上传 10MB 以内的图片或短视频。");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await analyzeOfficeSpace(file, orientation);
      setReport(data);
    } catch (err: any) {
      setError(err.message || "分析能量流失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setReport(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-zen-bg font-sans selection:bg-stone-200">
      <nav className="bg-zen-paper border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <YinYangIcon className="h-8 w-8 text-stone-800" />
            <span className="text-xl font-serif font-bold tracking-tight text-stone-900">ZenOffice AI · 数字风水</span>
          </div>
          <div className="text-xs text-stone-500 font-medium hidden sm:block">
            由百炼模型提供能力
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {!report && (
          <div className="max-w-2xl mx-auto text-center mt-10 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6 leading-tight">
              平衡你的 <br/> <span className="text-stone-500">办公室气场</span>
            </h1>
            <p className="text-lg text-stone-600 mb-10">
              上传工位/办公室的照片或短视频，AI 风水师会识别煞气、判断五行能量，并给出每日小习惯和化煞建议。
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 ink-brush">
              
              {/* Step 1: Compass */}
              <div className="mb-8 text-left">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <CompassIcon className="w-5 h-5" />
                  第一步：你的工位朝向哪里？
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {ORIENTATIONS.map(item => (
                    <button
                      key={item.value}
                      onClick={() => setOrientation(item.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        orientation === item.value 
                          ? 'bg-stone-800 text-white shadow-md transform scale-105' 
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Upload */}
              <div className="mb-8 text-left">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <UploadIcon className="w-5 h-5" />
                  第二步：上传布局（照片或短视频）
                </label>
                
                <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      file ? 'border-green-400 bg-green-50' : 'border-stone-300 hover:border-stone-400 bg-stone-50'
                    }`}>
                      {file ? (
                        <div className="flex items-center justify-center gap-2 text-green-800 font-medium">
                          {file.type.startsWith('video') ? <VideoIcon className="w-6 h-6"/> : <span className="text-2xl">📷</span>}
                          {file.name}
                        </div>
                      ) : (
                        <div className="text-stone-500">
                          <div className="text-4xl mb-2">📸</div>
                          <p className="font-medium">点击上传或拖拽文件</p>
                          <p className="text-xs mt-1">支持图片 / 短视频（最大 10MB）</p>
                        </div>
                      )}
                    </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleAnalyze}
                disabled={!file || loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 ${
                  loading 
                    ? 'bg-stone-300 cursor-not-allowed text-stone-500' 
                    : 'bg-stone-900 text-white hover:bg-stone-800 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    正在请教风水大师...
                  </>
                ) : (
                  <>
                    <span>开始分析</span>
                    <span>✨</span>
                  </>
                )}
              </button>

            </div>
          </div>
        )}

        {report && (
          <AnalysisView report={report} onReset={reset} />
        )}

      </main>

      <footer className="py-8 text-center text-stone-400 text-sm">
        <p></p>
      </footer>
    </div>
  );
}

export default App;