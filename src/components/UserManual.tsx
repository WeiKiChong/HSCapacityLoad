import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  HelpCircle, 
  Zap, 
  BarChart3, 
  Settings, 
  Info,
  ArrowRight,
  CheckCircle2,
  LayoutGrid,
  ClipboardList,
  ChevronDown,
  AlertCircle,
  Workflow
} from 'lucide-react';
import { cn } from '../utils';

interface Section {
  id: string;
  title: string;
}

const sections: Section[] = [
  { id: 'guide', title: '快速入门指引' },
  { id: 'features', title: '功能模块详解' },
  { id: 'logic', title: '产能负荷计算逻辑' },
  { id: 'faq', title: '常见问题解决方案 (FAQ)' },
];

export default function UserManual() {
  const [activeSection, setActiveSection] = useState('guide');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = document.querySelector('main');
    if (!scrollContainer) return;

    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = scrollContainer.scrollTop + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const scrollContainer = document.querySelector('main');
    if (element && scrollContainer) {
      const offset = 40; // Adjust based on padding/header
      const elementPosition = element.offsetTop - offset;

      scrollContainer.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative flex gap-12 max-w-7xl mx-auto">
      {/* Main Content */}
      <div className="flex-1 space-y-12 pb-32">
        {/* 1. 快速入门指引 */}
        <section id="guide" className="scroll-mt-32 space-y-6">
          <div className="flex items-center gap-6 py-2">
            <div className="flex-1 h-px bg-slate-200" />
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                <Zap size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">快速入门指引</h2>
            </div>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: '数据准备', desc: '准备生产需求、资源分组及标准工时等基础 Excel 数据。' },
              { step: '02', title: '数据导入', desc: '在对应模块点击“导入”按钮，上传准备好的 Excel 文件。' },
              { step: '03', title: '产能分析', desc: '进入总览看板，系统将自动根据导入数据生成负荷分析。' },
            ].map((item, idx) => (
              <div key={idx} className="relative p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="text-4xl font-black text-slate-100 absolute top-4 right-6 group-hover:text-blue-50 transition-colors">
                  {item.step}
                </div>
                <div className="relative space-y-3">
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. 功能模块详解 */}
        <section id="features" className="scroll-mt-32 space-y-6">
          <div className="flex items-center gap-6 py-2">
            <div className="flex-1 h-px bg-slate-200" />
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                <LayoutGrid size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">功能模块详解</h2>
            </div>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              { 
                title: '总览看板 (Analysis)', 
                icon: BarChart3, 
                color: 'text-emerald-600', 
                bg: 'bg-emerald-50',
                desc: '核心决策中心。展示月度产能负荷率、班组负荷排名及趋势图。支持按年份、月份和班组进行多维过滤。'
              },
              { 
                title: '生产需求 (Demand)', 
                icon: ClipboardList, 
                color: 'text-blue-600', 
                bg: 'bg-blue-50',
                desc: '管理待生产订单。包含订单号、工序、交货日期及需求数量。是产能计算的“需求端”来源。'
              },
              { 
                title: '资源与工时 (Resources & Time)', 
                icon: Settings, 
                color: 'text-amber-600', 
                bg: 'bg-amber-50',
                desc: '定义生产能力。配置各班组的人员、机器数量及其对应的 OEE（综合设备效率）。'
              }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-6 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", feature.bg, feature.color)}>
                  <feature.icon size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 产能负荷计算逻辑 */}
        <section id="logic" className="scroll-mt-32 space-y-6">
          <div className="flex items-center gap-6 py-2">
            <div className="flex-1 h-px bg-slate-200" />
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                <Workflow size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">产能负荷计算逻辑</h2>
            </div>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="glass-card overflow-hidden border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-sm font-bold text-slate-900 border-b border-slate-100">计算模式</th>
                  <th className="px-8 py-5 text-sm font-bold text-slate-900 border-b border-slate-100">核心逻辑</th>
                  <th className="px-8 py-5 text-sm font-bold text-slate-900 border-b border-slate-100">适用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-8 py-6 border-b border-slate-100">
                    <div className="font-bold text-slate-900">模式A：按开始生产日期</div>
                    <div className="text-[10px] text-emerald-600 font-bold uppercase mt-1">Start Date Mode</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-600 leading-relaxed border-b border-slate-100">
                    将负荷统计在工序预计“开始生产日期”的月份。<br/>
                    开始生产日期 = 交货日期 - 工序周期
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500 border-b border-slate-100">
                    适用于精细化排产，关注资源占用时间。
                  </td>
                </tr>
                <tr>
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900">模式B：按交货日期</div>
                    <div className="text-[10px] text-blue-600 font-bold uppercase mt-1">Due Date Mode</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-600 leading-relaxed">
                    直接将负荷统计在订单“交货日期”所属的月份。
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500">
                    适用于宏观产能评估，关注交付压力。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section id="faq" className="scroll-mt-32 space-y-6">
          <div className="flex items-center gap-6 py-2">
            <div className="flex-1 h-px bg-slate-200" />
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200">
                <HelpCircle size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">常见问题解决方案 (FAQ)</h2>
            </div>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-3">
            {[
              { 
                q: '导入数据时提示“验证失败”怎么办？', 
                a: '请检查导入的Excel/CSV文件，确保表头名称与系统要求一致，且文件内容不为空。系统需要识别特定的关键词（如“工单号”、“资源组ID”、“班组”等）。' 
              },
              { 
                q: '异常监控里出现了“未匹配数据”，如何处理？', 
                a: '这通常是因为“生产需求”中的资源组ID或工序代码在系统中无备案。请前往相应的基础数据模块，手动补充缺失的资源组或工序信息，系统将自动重新关联。' 
              },
              { 
                q: '为什么导入数据后看板没有显示？', 
                a: '请依次检查以下三点：\n（1）关联性：确保“生产需求”表中的资源组ID在“资源分组”配置表中存在对应记录。\n（2）资源匹配：确保“资源分组”模块中已配置了对应的班组信息。\n（3）筛选范围：检查页面顶部的年份和月份筛选器，确保其包含所导入数据的时间段。' 
              },
              { 
                q: '图表数据不显示或显示不全？', 
                a: '请检查页面顶部的“年份、月份、班组”筛选器。如果筛选条件过于严格，图表将无法展示内容。尝试将所有筛选器重置为“全部”。' 
              },
              { 
                q: '如何调整班组的显示顺序？', 
                a: '进入“系统设置”模块，在“班组展示优先级”区域通过拖拽调整顺序，点击保存后看板将立即更新。' 
              },
              { 
                q: '为什么分析结果显示“存在产能瓶颈”？', 
                a: '当某一班组在特定月份的负荷率（人员或设备）超过120%时，系统会自动将其标记为产能瓶颈。建议通过“总览看板”的热力图定位具体月份和班组，并核实关联的“标准工时”配置是否准确。' 
              },
              { 
                q: '系统支持多人协作吗？', 
                a: '本系统目前采用本地存储（localStorage）方案，数据直接存储在您的浏览器缓存中，暂不支持多人协作。' 
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl bg-white overflow-hidden">
                <button 
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown className={cn("text-slate-400 transition-transform", expandedFaq === idx && "rotate-180")} size={20} />
                </button>
                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4 whitespace-pre-wrap">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Navigator */}
      <div className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-32 space-y-8">
          <div className="space-y-1 relative">
            {/* Vertical Line Background */}
            <div className="absolute left-[17px] top-0 bottom-0 w-px bg-slate-100" />
            
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full group flex items-center gap-4 py-3 pl-4 text-left transition-all relative"
                >
                  {/* Decorative Line */}
                  <div className={cn(
                    "w-1 h-5 rounded-full transition-all duration-300 z-10",
                    isActive ? "bg-blue-600 h-8" : "bg-slate-200 group-hover:bg-slate-400"
                  )} />
                  
                  <span className={cn(
                    "text-sm transition-all duration-300",
                    isActive ? "text-blue-600 font-bold translate-x-1" : "text-slate-400 group-hover:text-slate-600"
                  )}>
                    {section.title}
                  </span>

                  {isActive && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute left-0 right-0 h-full bg-blue-50/50 rounded-r-xl -z-0"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
