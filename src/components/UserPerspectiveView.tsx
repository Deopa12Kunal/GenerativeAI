import React, { useState } from 'react';
import { NotePillar } from '../data/notesData';
import {
  LayoutGrid,
  Eye,
  ArrowRight,
  Sparkles,
  Bot,
  Search,
  Sliders,
  BarChart2,
  Shield,
  Layers,
  Terminal,
  ExternalLink,
  Code2,
  CheckCircle2
} from 'lucide-react';

interface UserPerspectiveViewProps {
  userPillars: NotePillar[];
  selectedPillarId: string;
  onSelectPillar: (pillarId: string) => void;
  onOpenNotesForPillar: (pillarId: string, sectionId?: string) => void;
  slideImagePath: string;
}

export const UserPerspectiveView: React.FC<UserPerspectiveViewProps> = ({
  userPillars,
  selectedPillarId,
  onSelectPillar,
  onOpenNotesForPillar,
  slideImagePath,
}) => {
  const [viewMode, setViewMode] = useState<'blueprint' | 'screenshot'>('blueprint');

  const getPillar = (id: string) => userPillars.find((p) => p.id === id);

  const basicApps = getPillar('basic-llm-apps');
  const promptEng = getPillar('prompt-engineering');
  const rag = getPillar('rag');
  const fineTuning = getPillar('fine-tuning-user');
  const agents = getPillar('agents');
  const llmops = getPillar('llmops');
  const misc = getPillar('miscellaneous');

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              Part 2: Application Engineering
            </span>
            <span aria-hidden="true">·</span>
            <span>Nitish Singh (CampusX)</span>
            <span aria-hidden="true">·</span>
            <span>Timestamp 41:37 / 50:14</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            The User's Perspective: Application Ecosystem
          </h2>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => setViewMode('blueprint')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              viewMode === 'blueprint'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Interactive Blueprint</span>
          </button>
          <button
            onClick={() => setViewMode('screenshot')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              viewMode === 'screenshot'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Slide Hotspots (41:37)</span>
          </button>
        </div>
      </div>

      {viewMode === 'blueprint' ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            This module maps how engineers build products on top of foundation models — click any box (or jump straight into <strong>LangChain</strong>) to read the slide-anchored notes.
          </p>

          {/* Grid Layout mimicking Slide 2 exact geometry */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 min-h-[560px]">
            {/* Left Column (Full Height): Building Basic LLM Apps (Green) */}
            <div className="md:col-span-4 flex flex-col">
              {basicApps && (
                <div
                  onClick={() => {
                    onSelectPillar(basicApps.id);
                    onOpenNotesForPillar(basicApps.id);
                  }}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 flex-1 flex flex-col justify-between ${
                    basicApps.colorBg
                  } ${
                    selectedPillarId === basicApps.id
                      ? 'ring-2 ring-emerald-500 shadow-md border-emerald-400'
                      : basicApps.colorBorder
                  } hover:shadow-md`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        08. Getting Started
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {basicApps.filename}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {basicApps.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                      The 5 starting blocks shown on the slide for building your first AI app.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/60 space-y-2.5">
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Open Source vs Closed Source LLMs</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Using LLM APIs</span>
                      </li>
                      <li className="space-y-1.5 pt-1 pb-1">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>LangChain</span>
                        </div>
                        <div className="pl-5 flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectPillar(basicApps.id);
                              onOpenNotesForPillar(basicApps.id, 'langchain-what-is-langchain');
                            }}
                            className="px-2 py-1 rounded-md bg-white/90 dark:bg-slate-900/90 border border-emerald-300 dark:border-emerald-700 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-colors"
                          >
                            What is LangChain & Benefits →
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectPillar(basicApps.id);
                              onOpenNotesForPillar(basicApps.id, 'how-semantic-search-works');
                            }}
                            className="px-2 py-1 rounded-md bg-white/90 dark:bg-slate-900/90 border border-emerald-300 dark:border-emerald-700 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-colors"
                          >
                            How Semantic Search Works →
                          </button>
                        </div>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>HuggingFace</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Ollama</span>
                      </li>
                    </ul>

                    <div className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      <span>Open Notes & Add Yours</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Center Column: Prompt Engineering (Top), RAG (Middle), Fine Tuning (Bottom) */}
            <div className="md:col-span-4 flex flex-col gap-3.5">
              {/* Blue: Prompt Engineering */}
              {promptEng && (
                <div
                  onClick={() => {
                    onSelectPillar(promptEng.id);
                    onOpenNotesForPillar(promptEng.id);
                  }}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex-1 flex flex-col justify-between ${
                    promptEng.colorBg
                  } ${
                    selectedPillarId === promptEng.id
                      ? 'ring-2 ring-sky-500 shadow-md border-sky-400'
                      : promptEng.colorBorder
                  } hover:shadow-md hover:scale-[1.01]`}
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                      09. Prompting
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {promptEng.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                      Writing clear instructions and examples so the model gives better, more accurate replies.
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-sky-700 dark:text-sky-400">
                    <span>Open Notes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              {/* Yellow: RAG */}
              {rag && (
                <div
                  onClick={() => {
                    onSelectPillar(rag.id);
                    onOpenNotesForPillar(rag.id);
                  }}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex-1 flex flex-col justify-between ${
                    rag.colorBg
                  } ${
                    selectedPillarId === rag.id
                      ? 'ring-2 ring-amber-500 shadow-md border-amber-400'
                      : rag.colorBorder
                  } hover:shadow-md hover:scale-[1.01]`}
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      10. Your Data
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {rag.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                      Letting the LLM search your own PDFs and documents first so answers are based on real facts.
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400">
                    <span>Open Notes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              {/* Pink/Coral: Fine Tuning (User Perspective) */}
              {fineTuning && (
                <div
                  onClick={() => {
                    onSelectPillar(fineTuning.id);
                    onOpenNotesForPillar(fineTuning.id);
                  }}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex-1 flex flex-col justify-between ${
                    fineTuning.colorBg
                  } ${
                    selectedPillarId === fineTuning.id
                      ? 'ring-2 ring-rose-500 shadow-md border-rose-400'
                      : fineTuning.colorBorder
                  } hover:shadow-md hover:scale-[1.01]`}
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                      11. Customization
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {fineTuning.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                      Teaching an existing model your custom style or format when prompting and RAG aren’t enough.
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-rose-700 dark:text-rose-400">
                    <span>Open Notes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Agents (Top), LLMOps & Miscellaneous (Bottom Split) */}
            <div className="md:col-span-4 flex flex-col gap-3.5">
              {/* Purple: Agents */}
              {agents && (
                <div
                  onClick={() => {
                    onSelectPillar(agents.id);
                    onOpenNotesForPillar(agents.id);
                  }}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 flex-1 flex flex-col justify-between ${
                    agents.colorBg
                  } ${
                    selectedPillarId === agents.id
                      ? 'ring-2 ring-purple-500 shadow-md border-purple-400'
                      : agents.colorBorder
                  } hover:shadow-md hover:scale-[1.01]`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                        12. Action & Tools
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {agents.filename}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {agents.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                      AI systems that don’t just chat—they plan steps, use tools (like web search or APIs), and finish tasks on their own.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-200/60 dark:border-purple-800/60 flex items-center justify-between text-xs font-semibold text-purple-700 dark:text-purple-400">
                    <span>Open Notes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              {/* Bottom Split: LLMOps (Cyan) & Miscellaneous (Stone) */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Cyan: LLMOps */}
                {llmops && (
                  <div
                    onClick={() => {
                      onSelectPillar(llmops.id);
                      onOpenNotesForPillar(llmops.id);
                    }}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                      llmops.colorBg
                    } ${
                      selectedPillarId === llmops.id
                        ? 'ring-2 ring-cyan-500 shadow-md border-cyan-400'
                        : llmops.colorBorder
                    } hover:shadow-md hover:scale-[1.01]`}
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                        13. Operations
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        {llmops.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        Tracking cost, speed, and answer quality in live apps.
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                      <span>Notes</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}

                {/* Stone: Miscellaneous */}
                {misc && (
                  <div
                    onClick={() => {
                      onSelectPillar(misc.id);
                      onOpenNotesForPillar(misc.id);
                    }}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                      misc.colorBg
                    } ${
                      selectedPillarId === misc.id
                        ? 'ring-2 ring-stone-500 shadow-md border-stone-400'
                        : misc.colorBorder
                    } hover:shadow-md hover:scale-[1.01]`}
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-400">
                        14. Extra
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        {misc.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        Safety guardrails, images/audio, and privacy.
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-400">
                      <span>Notes</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Slide 2 Hotspot View (image_4c380213.png) */
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Click on any box in Nitish Singh's lecture slide below (Timestamp 41:37) to open easy study notes for that topic:
          </p>

          <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-lg bg-black">
            <img
              src={slideImagePath}
              alt="Nitish Singh - The User's Perspective YouTube Lecture Slide"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain block"
            />

            {/* Hotspots matching Slide 2 */}
            {/* 1. Building Basic LLM Apps (Left Green Column) */}
            <button
              onClick={() => {
                onSelectPillar('basic-llm-apps');
                onOpenNotesForPillar('basic-llm-apps');
              }}
              className="absolute left-[5.5%] top-[23%] w-[29%] h-[75%] border-2 border-dashed border-emerald-400 bg-emerald-500/20 hover:bg-emerald-500/35 transition-colors rounded-sm flex items-start p-2 text-left group"
              title="Click to view Building Basic LLM Apps notes"
            >
              <span className="bg-emerald-900/90 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                08. Building Basic LLM Apps →
              </span>
            </button>

            {/* 2. Prompt Engineering (Center-Top Blue) */}
            <button
              onClick={() => {
                onSelectPillar('prompt-engineering');
                onOpenNotesForPillar('prompt-engineering');
              }}
              className="absolute left-[34.8%] top-[23%] w-[17.5%] h-[24%] border-2 border-dashed border-sky-400 bg-sky-500/20 hover:bg-sky-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view Prompt Engineering notes"
            >
              <span className="bg-sky-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                09. Prompt Engineering →
              </span>
            </button>

            {/* 3. RAG (Center-Middle Yellow) */}
            <button
              onClick={() => {
                onSelectPillar('rag');
                onOpenNotesForPillar('rag');
              }}
              className="absolute left-[34.8%] top-[48%] w-[17.5%] h-[24%] border-2 border-dashed border-amber-400 bg-amber-500/20 hover:bg-amber-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view RAG notes"
            >
              <span className="bg-amber-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                10. RAG →
              </span>
            </button>

            {/* 4. Fine Tuning (Center-Bottom Coral) */}
            <button
              onClick={() => {
                onSelectPillar('fine-tuning-user');
                onOpenNotesForPillar('fine-tuning-user');
              }}
              className="absolute left-[34.8%] top-[73%] w-[17.5%] h-[25%] border-2 border-dashed border-rose-400 bg-rose-500/20 hover:bg-rose-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view Fine Tuning notes"
            >
              <span className="bg-rose-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                11. Fine Tuning →
              </span>
            </button>

            {/* 5. Agents (Right-Top Large Purple) */}
            <button
              onClick={() => {
                onSelectPillar('agents');
                onOpenNotesForPillar('agents');
              }}
              className="absolute left-[52.8%] top-[23%] w-[43%] h-[43.5%] border-2 border-dashed border-purple-400 bg-purple-500/20 hover:bg-purple-500/35 transition-colors rounded-sm flex items-start p-2 text-left group"
              title="Click to view Agents notes"
            >
              <span className="bg-purple-900/90 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                12. Agents →
              </span>
            </button>

            {/* 6. LLMOps (Right-Bottom-Left Cyan) */}
            <button
              onClick={() => {
                onSelectPillar('llmops');
                onOpenNotesForPillar('llmops');
              }}
              className="absolute left-[52.8%] top-[67.5%] w-[19.5%] h-[30.5%] border-2 border-dashed border-cyan-400 bg-cyan-500/20 hover:bg-cyan-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view LLMOps notes"
            >
              <span className="bg-cyan-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                13. LLMOps →
              </span>
            </button>

            {/* 7. Miscellaneous (Right-Bottom-Right Stone) */}
            <button
              onClick={() => {
                onSelectPillar('miscellaneous');
                onOpenNotesForPillar('miscellaneous');
              }}
              className="absolute left-[72.8%] top-[67.5%] w-[23%] h-[30.5%] border-2 border-dashed border-stone-300 bg-stone-500/20 hover:bg-stone-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view Miscellaneous notes"
            >
              <span className="bg-stone-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                14. Miscellaneous →
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Synthesis Section: Builder vs User Comparison */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>The Two Halves of GenAI: Builder vs User</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 font-semibold">Aspect</th>
                <th className="py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  The Builder's Perspective (Slide 1)
                </th>
                <th className="py-2.5 font-semibold text-indigo-600 dark:text-indigo-400">
                  The User's Perspective (Slide 2)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-2.5 font-medium">Main Question</td>
                <td>How do we create, train, optimize, and host an LLM?</td>
                <td>How do we use existing LLMs to build useful apps?</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">Key Topics on Slide</td>
                <td>Transformers, Pretraining, Fine-Tuning, Optimization, Evaluation, Deployment</td>
                <td>LLMs & APIs, LangChain, HuggingFace, Ollama, Prompting, RAG, Agents, LLMOps</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">Main Goal</td>
                <td>Build a smarter, faster, smaller, and safe base model.</td>
                <td>Build accurate, helpful, and reliable AI products for end users.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
