import React from 'react';
import { FengShuiReport, FengShuiElement, ShaQiIssue, ItemAnalysis } from '../types';

interface Props {
  report: FengShuiReport;
  onReset: () => void;
}

const ElementBadge = ({ element }: { element: FengShuiElement }) => {
  const colors = {
    [FengShuiElement.WOOD]: 'bg-wood text-green-900',
    [FengShuiElement.FIRE]: 'bg-fire text-red-900',
    [FengShuiElement.EARTH]: 'bg-earth text-yellow-900',
    [FengShuiElement.METAL]: 'bg-metal text-slate-900',
    [FengShuiElement.WATER]: 'bg-water text-blue-900',
    [FengShuiElement.UNKNOWN]: 'bg-gray-200 text-gray-700',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors[element]}`}>
      {element}
    </span>
  );
};

const IssueCard = ({ issue }: { issue: ShaQiIssue }) => {
  const isHigh = issue.severity === 'High';
  return (
    <div className={`p-4 rounded-lg border-l-4 ${isHigh ? 'border-red-500 bg-red-50' : 'border-orange-400 bg-orange-50'} mb-4`}>
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-gray-800">{issue.title}</h4>
        <span className={`text-xs uppercase tracking-wider font-bold ${isHigh ? 'text-red-600' : 'text-orange-600'}`}>
          {issue.type} • {issue.severity} 风险
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
      <div className="mt-3 flex items-start gap-2">
        <span className="text-xl">🛡️</span>
        <div>
          <span className="text-xs font-bold uppercase text-gray-500 block">化煞建议</span>
          <p className="text-sm font-medium text-gray-800">{issue.remedy}</p>
        </div>
      </div>
    </div>
  );
};

const SOPItem = ({ task, index }: { task: any, index: number }) => (
  <div className="flex gap-4 items-start p-3 hover:bg-white rounded-lg transition-colors border-b border-gray-100 last:border-0">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 font-serif font-bold">
      {index + 1}
    </div>
    <div>
      <h5 className="font-bold text-gray-900">{task.time}</h5>
      <p className="text-gray-800 font-medium">{task.action}</p>
      <p className="text-xs text-gray-500 mt-1 italic">“{task.meaning}”</p>
    </div>
  </div>
);

export const AnalysisView: React.FC<Props> = ({ report, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in">
      {/* Header / Score */}
      <div className="text-center mb-10">
        <div className="inline-block p-1 rounded-full border-4 border-double border-stone-300 mb-4">
           <div className="w-24 h-24 rounded-full bg-stone-800 flex items-center justify-center text-white flex-col">
             <span className="text-3xl font-serif">{report.overallScore}</span>
             <span className="text-xs uppercase tracking-widest text-stone-400">气场评分</span>
           </div>
        </div>
        <h2 className="text-2xl font-serif text-gray-900 mb-2">办公室气场分析</h2>
        <p className="text-gray-600 italic max-w-lg mx-auto">"{report.overallVibe}"</p>
        <p className="text-sm text-stone-500 mt-2">朝向分析：{report.orientationAnalysis}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Col: Issues & SOP */}
        <div className="space-y-8">
          
          <section className="bg-white p-6 rounded-2xl shadow-sm ink-brush">
            <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2 text-stone-800">
              <span className="text-red-500">⚠️</span> 煞气检测
            </h3>
            {report.issues.length === 0 ? (
              <p className="text-green-600 italic">未检测到明显煞气，很棒！</p>
            ) : (
              report.issues.map((issue, i) => <IssueCard key={i} issue={issue} />)
            )}
          </section>

          <section className="bg-stone-100 p-6 rounded-2xl shadow-inner">
            <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2 text-stone-800">
              <span className="text-indigo-500">🗓️</span> 每日微风水 SOP
            </h3>
            <div className="space-y-1">
              {report.dailySOP.map((task, i) => <SOPItem key={i} task={task} index={i} />)}
            </div>
          </section>

        </div>

        {/* Right Col: Item Analysis */}
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm ink-brush min-h-full">
            <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2 text-stone-800">
              <span className="text-emerald-500">✨</span> 能量地图
            </h3>
            <div className="space-y-6">
              {report.items.map((item, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-gray-100 hover:border-stone-400 transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <ElementBadge element={item.element} />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="bg-blue-50 p-2 rounded text-xs text-blue-800 font-medium">
                     💡 摆放建议：{item.placementAdvice}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
      
      <div className="mt-12 text-center">
        <button 
          onClick={onReset}
          className="bg-stone-800 text-white px-8 py-3 rounded-full hover:bg-stone-700 transition shadow-lg font-medium"
        >
          重新分析其他空间
        </button>
      </div>
    </div>
  );
};