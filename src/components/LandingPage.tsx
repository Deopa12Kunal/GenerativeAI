import React, { useState } from 'react';
import { NotePillar } from '../data/notesData';
import {
  ArrowRight,
  Github,
  BookOpen,
  Sparkles,
  Zap,
  Layers,
  CheckCircle2,
  FolderGit2,
  PlaySquare,
  Cpu,
  Brain,
  Sliders,
  BarChart3,
  Rocket,
  ShieldCheck,
  FileCode2,
  Bot
} from 'lucide-react';

interface LandingPageProps {
  pillars: NotePillar[];
  onExploreNotes: (pillarId?: string, sectionId?: string) => void;
  onOpenUploader: () => void;
  onOpenFlashcards: () => void;
  onOpenExportModal: () => void;
  onNavigateToPerspective: (view: 'roadmap' | 'user-view') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  pillars,
  onExploreNotes,
  onOpenUploader,
  onOpenFlashcards,
  onOpenExportModal,
  onNavigateToPerspective,
}) => {
  const [selectedPerspective, setSelectedPerspective] = useState<'user' | 'builder'>('user');

  const activePillars = pillars.filter((p) => p.perspective === selectedPerspective);

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <section className="relative pt-6 pb-12 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Metadata Bar */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
              <PlaySquare className="w-3.5 h-3.5" />
              Nitish Singh (CampusX)
            </span>
            <span aria-hidden="true">·</span>
            <span>Two Landmark Perspectives</span>
            <span aria-hidden="true">·</span>
            <span>Builder (35:35) & User (41:37)</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Generative AI Notes <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              Builder & User Perspectives
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Clean, easy-to-understand study notes built directly from the two lecture slides: <strong>The Builder's Perspective</strong> (how models are created) and <strong>The User's Perspective</strong> (how apps are built)—ready to expand as you learn and push to GitHub.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigateToPerspective('user-view')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              <Bot className="w-4 h-4" />
              <span>Explore User's View (41:37)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToPerspective('roadmap')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-300 dark:border-slate-700 transition-all hover:scale-[1.02]"
            >
              <Cpu className="w-4 h-4 text-emerald-500" />
              <span>Builder's Blueprint (35:35)</span>
            </button>

            <button
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 font-semibold text-sm shadow-sm transition-all hover:scale-[1.02]"
            >
              <Github className="w-4 h-4" />
              <span>Push Code to GitHub</span>
            </button>
          </div>

          {/* Feature Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 mt-8">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              14 Slide-Anchored Modules
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Simple & Easy-to-Read Notes
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Add Your Own Notes Parallelly
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Direct GitHub REST Sync
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Bento Grid with Perspective Switcher */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Interactive Curricula
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              {selectedPerspective === 'user'
                ? "The User's Perspective: Application Ecosystem (Slide 2)"
                : "The Builder's Perspective: Model Roadmap (Slide 1)"}
            </h2>
          </div>

          {/* Perspective Selector Segmented Switch */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setSelectedPerspective('user')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedPerspective === 'user'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>User's View (41:37)</span>
            </button>
            <button
              onClick={() => setSelectedPerspective('builder')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedPerspective === 'builder'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Builder's View (35:35)</span>
            </button>
          </div>
        </div>

        {/* Bento Grid displaying active perspective pillars */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {activePillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              onClick={() => onExploreNotes(pillar.id)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 group flex flex-col justify-between ${
                pillar.colorBg
              } ${pillar.colorBorder} hover:shadow-lg hover:scale-[1.01] ${
                idx === 0
                  ? 'md:col-span-6'
                  : idx === 1
                  ? 'md:col-span-6'
                  : idx === 2
                  ? 'md:col-span-4'
                  : idx === 3
                  ? 'md:col-span-4'
                  : idx === 4
                  ? 'md:col-span-4'
                  : 'md:col-span-6'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className={pillar.colorText}>
                    {pillar.slideBoxName} ({pillar.slideBoxColor})
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                    {pillar.filename}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed line-clamp-2">
                  {pillar.description}
                </p>

                {pillar.sections.length > 1 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pillar.sections.slice(1).map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onExploreNotes(pillar.id, sec.id);
                        }}
                        className="px-2 py-1 rounded-md bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-colors"
                      >
                        {sec.title} →
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px] truncate max-w-[240px]">
                  {pillar.subtopics[0]}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Extensibility & Future Pages Banner */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white dark:bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <FolderGit2 className="w-4 h-4" />
              <span>Full Codebase Push & Study Workflow</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Add Your Own Notes & Push Everything to GitHub
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every module starts with clear, simple basics straight from the lecture slides so you never feel lost. As you watch the YouTube playlist, add your own notes inside any topic and push the <strong>entire app + notes</strong> straight to GitHub.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenExportModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Push Full Code to GitHub</span>
            </button>
            <button
              onClick={onOpenUploader}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Upload Next Lecture Slide</span>
            </button>
          </div>
        </div>

        {/* 3-Pillar Extensibility Walkthrough */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-200">1. Modular Architecture</span>
            <p className="text-slate-400">
              Clean separation of views in <code>/src/components/</code> and notes in <code>/src/data/</code> makes adding new pages effortless.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-slate-200">2. Parallel Note-Taking</span>
            <p className="text-slate-400">
              Open any module and append your own takeaways in plain Markdown while watching the video—saved automatically in your browser.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-slate-200">3. 1-Click GitHub Sync</span>
            <p className="text-slate-400">
              Sync your updated web app and Markdown files directly to your GitHub repository without leaving the browser.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Comparison Table: Builder vs User */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Mental Model
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            The Builder vs The User Perspective
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
            <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 font-bold">
              <span>The Builder's Perspective (Timestamp 35:35)</span>
              <span className="font-mono text-[10px]">Building Models</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Covers how AI models themselves are created and prepared: Transformer Architecture, Types of Transformers (BERT, GPT, T5), Pretraining, Fine-Tuning, Optimization, Evaluation, and Deployment.
            </p>
            <button
              onClick={() => onNavigateToPerspective('roadmap')}
              className="text-emerald-700 dark:text-emerald-400 font-bold inline-flex items-center gap-1 hover:underline pt-2"
            >
              <span>Explore Builder's View →</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl border border-indigo-300 dark:border-indigo-800/80 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-2">
            <div className="flex items-center justify-between text-indigo-800 dark:text-indigo-300 font-bold">
              <span>The User's Perspective (Timestamp 41:37)</span>
              <span className="font-mono text-[10px]">Building Apps</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Covers how developers use existing LLMs to build real apps: Building Basic LLM Apps (APIs, LangChain, HuggingFace, Ollama), Prompt Engineering, RAG, Fine Tuning, Agents, LLMOps, and Miscellaneous topics.
            </p>
            <button
              onClick={() => onNavigateToPerspective('user-view')}
              className="text-indigo-700 dark:text-indigo-400 font-bold inline-flex items-center gap-1 hover:underline pt-2"
            >
              <span>Explore User's View →</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
