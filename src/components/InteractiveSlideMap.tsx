import React, { useState } from 'react';
import { NotePillar } from '../data/notesData';
import { ArrowRight, Eye, LayoutGrid, CheckCircle2 } from 'lucide-react';

interface InteractiveSlideMapProps {
  pillars: NotePillar[];
  selectedPillarId: string;
  onSelectPillar: (pillarId: string) => void;
  onOpenNotesForPillar: (pillarId: string) => void;
  originalImagePath: string;
}

export const InteractiveSlideMap: React.FC<InteractiveSlideMapProps> = ({
  pillars,
  selectedPillarId,
  onSelectPillar,
  onOpenNotesForPillar,
  originalImagePath,
}) => {
  const [viewMode, setViewMode] = useState<'blueprint' | 'screenshot'>('blueprint');
  const [hoveredPillarId, setHoveredPillarId] = useState<string | null>(null);

  const getPillar = (id: string) => pillars.find((p) => p.id === id);

  const archPillar = getPillar('transformer-architecture');
  const typesPillar = getPillar('types-of-transformers');
  const pretrainPillar = getPillar('pretraining');
  const finetunePillar = getPillar('fine-tuning');
  const optimPillar = getPillar('optimization');
  const evalPillar = getPillar('evaluation');
  const deployPillar = getPillar('deployment');

  return (
    <div className="space-y-6">
      {/* Top Bar / View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Nitish Singh (CampusX)</span>
            <span aria-hidden="true">·</span>
            <span>Timestamp 35:35 / 50:14</span>
            <span aria-hidden="true">·</span>
            <span>The Builder's Perspective</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Generative AI Curriculum Map
          </h2>
        </div>

        {/* View Mode Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => setViewMode('blueprint')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'blueprint'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Interactive Blueprint</span>
          </button>
          <button
            onClick={() => setViewMode('screenshot')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'screenshot'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lecture Slide Hotspots</span>
          </button>
        </div>
      </div>

      {/* Blueprint Grid Mode (Recreating the exact layout of the video slide) */}
      {viewMode === 'blueprint' ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Click any block below to read the simple summary for that module or add your own notes while watching the lecture.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 min-h-[520px]">
            {/* Column 1: Left (Transformer Architecture & Types of Transformers) */}
            <div className="md:col-span-4 flex flex-col gap-3.5">
              {/* Green: Transformer Architecture */}
              {archPillar && (
                <div
                  onClick={() => {
                    onSelectPillar(archPillar.id);
                    onOpenNotesForPillar(archPillar.id);
                  }}
                  onMouseEnter={() => setHoveredPillarId(archPillar.id)}
                  onMouseLeave={() => setHoveredPillarId(null)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all duration-200 flex-1 flex flex-col justify-between ${
                    archPillar.colorBg
                  } ${
                    selectedPillarId === archPillar.id
                      ? 'ring-2 ring-emerald-500 shadow-md border-emerald-400'
                      : archPillar.colorBorder
                  } hover:shadow-md hover:scale-[1.01]`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        01. Foundation
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {archPillar.filename}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {archPillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                      The core design behind modern LLMs that reads sentences in parallel and understands word context.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/60">
                    <div className="flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <span>Open Notes & Add Yours</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              )}

              {/* Yellow: Types of Transformers */}
              {typesPillar && (
                <div
                  onClick={() => {
                    onSelectPillar(typesPillar.id);
                    onOpenNotesForPillar(typesPillar.id);
                  }}
                  onMouseEnter={() => setHoveredPillarId(typesPillar.id)}
                  onMouseLeave={() => setHoveredPillarId(null)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all duration-200 flex-1 flex flex-col justify-between ${
                    typesPillar.colorBg
                  } ${
                    selectedPillarId === typesPillar.id
                      ? 'ring-2 ring-amber-500 shadow-md border-amber-400'
                      : typesPillar.colorBorder
                  } hover:shadow-md hover:scale-[1.01]`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        02. Types
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {typesPillar.filename}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {typesPillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                      {typesPillar.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-800/60">
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                        Encoder Only (BERT)
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                        Decoder Only (GPT)
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                        Encoder & Decoder based (T5)
                      </li>
                    </ul>
                    <div className="mt-3 flex items-center justify-between text-xs font-medium text-amber-700 dark:text-amber-400">
                      <span>Open Notes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Column 2: Middle (Pretraining & Optimization) */}
            <div className="md:col-span-4 flex flex-col gap-3.5">
              {/* Blue: Pretraining */}
              {pretrainPillar && (
                <div
                  onClick={() => {
                    onSelectPillar(pretrainPillar.id);
                    onOpenNotesForPillar(pretrainPillar.id);
                  }}
                  onMouseEnter={() => setHoveredPillarId(pretrainPillar.id)}
                  onMouseLeave={() => setHoveredPillarId(null)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all duration-200 flex-1 flex flex-col justify-between ${
                    pretrainPillar.colorBg
                  } ${
                    selectedPillarId === pretrainPillar.id
                      ? 'ring-2 ring-sky-500 shadow-md border-sky-400'
                      : pretrainPillar.colorBorder
                  } hover:shadow-md hover:scale-[1.01]`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                        03. Pretraining
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {pretrainPillar.filename}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {pretrainPillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                      Teaching a model language from huge text datasets.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-sky-200/60 dark:border-sky-800/60">
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <li className="truncate">• Training Objectives</li>
                      <li className="truncate">• Tokenization Strategies</li>
                      <li className="truncate">• Training Strategies</li>
                      <li className="truncate">• Handling challenges</li>
                    </ul>
                    <div className="mt-3 flex items-center justify-between text-xs font-medium text-sky-700 dark:text-sky-400">
                      <span>Open Notes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              )}

              {/* Red/Coral: Optimization */}
              {optimPillar && (
                <div
                  onClick={() => {
                    onSelectPillar(optimPillar.id);
                    onOpenNotesForPillar(optimPillar.id);
                  }}
                  onMouseEnter={() => setHoveredPillarId(optimPillar.id)}
                  onMouseLeave={() => setHoveredPillarId(null)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all duration-200 flex-1 flex flex-col justify-between ${
                    optimPillar.colorBg
                  } ${
                    selectedPillarId === optimPillar.id
                      ? 'ring-2 ring-rose-500 shadow-md border-rose-400'
                      : optimPillar.colorBorder
                  } hover:shadow-md hover:scale-[1.01]`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                        05. Optimization
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {optimPillar.filename}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {optimPillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                      Making AI models faster, smaller, and cheaper to run.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-rose-200/60 dark:border-rose-800/60">
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <li className="truncate">• Training Optimization</li>
                      <li className="truncate">• Model compression</li>
                      <li className="truncate">• Optimizing Inference</li>
                    </ul>
                    <div className="mt-3 flex items-center justify-between text-xs font-medium text-rose-700 dark:text-rose-400">
                      <span>Open Notes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Column 3: Right (Fine-Tuning, Evaluation & Deployment) */}
            <div className="md:col-span-4 flex flex-col gap-3.5">
              {/* Purple: Fine-Tuning */}
              {finetunePillar && (
                <div
                  onClick={() => {
                    onSelectPillar(finetunePillar.id);
                    onOpenNotesForPillar(finetunePillar.id);
                  }}
                  onMouseEnter={() => setHoveredPillarId(finetunePillar.id)}
                  onMouseLeave={() => setHoveredPillarId(null)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all duration-200 flex-1 flex flex-col justify-between ${
                    finetunePillar.colorBg
                  } ${
                    selectedPillarId === finetunePillar.id
                      ? 'ring-2 ring-purple-500 shadow-md border-purple-400'
                      : finetunePillar.colorBorder
                  } hover:shadow-md hover:scale-[1.01]`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                        04. Fine-Tuning
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {finetunePillar.filename}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {finetunePillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                      Turning a base model into a helpful, specialized assistant.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-200/60 dark:border-purple-800/60">
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <div>• Task specific tuning</div>
                      <div>• RLHF</div>
                      <div>• Instruction tuning</div>
                      <div>• PEFT</div>
                      <div className="col-span-2">• Continual Pretraining</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs font-medium text-purple-700 dark:text-purple-400">
                      <span>Open Notes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Split: Evaluation & Deployment */}
              <div className="grid grid-cols-2 gap-3.5 flex-1">
                {/* Cyan: Evaluation */}
                {evalPillar && (
                  <div
                    onClick={() => {
                      onSelectPillar(evalPillar.id);
                      onOpenNotesForPillar(evalPillar.id);
                    }}
                    onMouseEnter={() => setHoveredPillarId(evalPillar.id)}
                    onMouseLeave={() => setHoveredPillarId(null)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                      evalPillar.colorBg
                    } ${
                      selectedPillarId === evalPillar.id
                        ? 'ring-2 ring-cyan-500 shadow-md border-cyan-400'
                        : evalPillar.colorBorder
                    } hover:shadow-md hover:scale-[1.01]`}
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                        06. Eval
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        {evalPillar.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        Testing accuracy, safety, and answer quality.
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs font-medium text-cyan-700 dark:text-cyan-400">
                      <span>Notes</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}

                {/* Warm Grey: Deployment */}
                {deployPillar && (
                  <div
                    onClick={() => {
                      onSelectPillar(deployPillar.id);
                      onOpenNotesForPillar(deployPillar.id);
                    }}
                    onMouseEnter={() => setHoveredPillarId(deployPillar.id)}
                    onMouseLeave={() => setHoveredPillarId(null)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                      deployPillar.colorBg
                    } ${
                      selectedPillarId === deployPillar.id
                        ? 'ring-2 ring-stone-500 shadow-md border-stone-400'
                        : deployPillar.colorBorder
                    } hover:shadow-md hover:scale-[1.01]`}
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-400">
                        07. Deploy
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        {deployPillar.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        Serving the live model to apps and users.
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs font-medium text-stone-700 dark:text-stone-400">
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
        /* Screenshot Hotspots Mode: Displays Nitish Singh's actual video frame with interactive overlay click areas */
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Click over any section of the YouTube lecture slide below to jump straight to easy study notes for that module:
          </p>

          <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-lg bg-black">
            <img
              src={originalImagePath}
              alt="Nitish Singh - The Builder's Perspective YouTube Lecture Slide"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain block"
            />

            {/* Interactive Hotspot Overlays */}
            {/* 1. Transformer Architecture (Top Left Green) */}
            <button
              onClick={() => {
                onSelectPillar('transformer-architecture');
                onOpenNotesForPillar('transformer-architecture');
              }}
              onMouseEnter={() => setHoveredPillarId('transformer-architecture')}
              onMouseLeave={() => setHoveredPillarId(null)}
              className="absolute left-[3.5%] top-[22%] w-[24%] h-[27%] border-2 border-dashed border-emerald-400 bg-emerald-500/20 hover:bg-emerald-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view Transformer Architecture notes"
            >
              <span className="bg-emerald-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                01. Transformer Architecture →
              </span>
            </button>

            {/* 2. Types of Transformers (Bottom Left Yellow) */}
            <button
              onClick={() => {
                onSelectPillar('types-of-transformers');
                onOpenNotesForPillar('types-of-transformers');
              }}
              onMouseEnter={() => setHoveredPillarId('types-of-transformers')}
              onMouseLeave={() => setHoveredPillarId(null)}
              className="absolute left-[3.5%] top-[50%] w-[24%] h-[40%] border-2 border-dashed border-amber-400 bg-amber-500/20 hover:bg-amber-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view Types of Transformers notes"
            >
              <span className="bg-amber-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                02. Types of Transformers →
              </span>
            </button>

            {/* 3. Pretraining (Top Center Blue) */}
            <button
              onClick={() => {
                onSelectPillar('pretraining');
                onOpenNotesForPillar('pretraining');
              }}
              onMouseEnter={() => setHoveredPillarId('pretraining')}
              onMouseLeave={() => setHoveredPillarId(null)}
              className="absolute left-[28.5%] top-[22%] w-[25.5%] h-[44%] border-2 border-dashed border-sky-400 bg-sky-500/20 hover:bg-sky-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view Pretraining notes"
            >
              <span className="bg-sky-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                03. Pretraining →
              </span>
            </button>

            {/* 4. Optimization (Bottom Center Coral) */}
            <button
              onClick={() => {
                onSelectPillar('optimization');
                onOpenNotesForPillar('optimization');
              }}
              onMouseEnter={() => setHoveredPillarId('optimization')}
              onMouseLeave={() => setHoveredPillarId(null)}
              className="absolute left-[28.5%] top-[67%] w-[25.5%] h-[24%] border-2 border-dashed border-rose-400 bg-rose-500/20 hover:bg-rose-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view Optimization notes"
            >
              <span className="bg-rose-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                05. Optimization →
              </span>
            </button>

            {/* 5. Fine-Tuning (Top Right Purple) */}
            <button
              onClick={() => {
                onSelectPillar('fine-tuning');
                onOpenNotesForPillar('fine-tuning');
              }}
              onMouseEnter={() => setHoveredPillarId('fine-tuning')}
              onMouseLeave={() => setHoveredPillarId(null)}
              className="absolute left-[54.8%] top-[22%] w-[38.5%] h-[39%] border-2 border-dashed border-purple-400 bg-purple-500/20 hover:bg-purple-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view Fine-Tuning notes"
            >
              <span className="bg-purple-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                04. Fine-Tuning →
              </span>
            </button>

            {/* 6. Evaluation (Bottom Right Cyan) */}
            <button
              onClick={() => {
                onSelectPillar('evaluation');
                onOpenNotesForPillar('evaluation');
              }}
              onMouseEnter={() => setHoveredPillarId('evaluation')}
              onMouseLeave={() => setHoveredPillarId(null)}
              className="absolute left-[54.8%] top-[62.5%] w-[18%] h-[28.5%] border-2 border-dashed border-cyan-400 bg-cyan-500/20 hover:bg-cyan-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view Evaluation notes"
            >
              <span className="bg-cyan-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                06. Evaluation →
              </span>
            </button>

            {/* 7. Deployment (Bottom Far Right Stone) */}
            <button
              onClick={() => {
                onSelectPillar('deployment');
                onOpenNotesForPillar('deployment');
              }}
              onMouseEnter={() => setHoveredPillarId('deployment')}
              onMouseLeave={() => setHoveredPillarId(null)}
              className="absolute left-[73.5%] top-[62.5%] w-[19.8%] h-[28.5%] border-2 border-dashed border-stone-300 bg-stone-500/20 hover:bg-stone-500/35 transition-colors rounded-sm flex items-start p-1.5 text-left group"
              title="Click to view Deployment notes"
            >
              <span className="bg-stone-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs group-hover:scale-105 transition-transform">
                07. Deployment →
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
