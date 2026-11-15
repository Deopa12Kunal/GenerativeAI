import React, { useState, useRef } from 'react';
import { NotePillar } from '../data/notesData';
import {
  UploadCloud,
  Sparkles,
  Image as ImageIcon,
  Check,
  Copy,
  PlusCircle,
  FileText,
  AlertCircle,
  Clock,
  Layers
} from 'lucide-react';

interface SlideItem {
  id: string;
  title: string;
  timestamp: string;
  previewUrl: string;
  base64Data?: string;
  pillarId: string;
  generatedMarkdown?: string;
  isInitial?: boolean;
}

interface SlideUploaderAndAnalyzerProps {
  pillars: NotePillar[];
  onAppendMarkdownToPillar: (pillarId: string, title: string, markdown: string) => void;
  originalImagePath: string;
}

export const SlideUploaderAndAnalyzer: React.FC<SlideUploaderAndAnalyzerProps> = ({
  pillars,
  onAppendMarkdownToPillar,
  originalImagePath,
}) => {
  const [slides, setSlides] = useState<SlideItem[]>([
    {
      id: 'slide-initial-02',
      title: "Slide 2: The User's Perspective - App Ecosystem",
      timestamp: '41:37 / 50:14',
      previewUrl: '/assets/aistudio/image_4c380213.png',
      pillarId: 'basic-llm-apps',
      isInitial: true,
      generatedMarkdown: `## Lecture Slide: The User's Perspective (Timestamp 41:37)

### Modules Shown on the Slide
1. **Building Basic LLM Apps**: Open Source vs Closed Source LLMs, Using LLM APIs, LangChain, HuggingFace, Ollama.
2. **Prompt Engineering**: Writing clear instructions and examples to guide LLM replies.
3. **RAG**: Letting an LLM search your own documents before answering.
4. **Fine Tuning**: Customizing a model on your own examples for style or format.
5. **Agents**: AI systems that can plan steps and use external tools.
6. **LLMOps**: Monitoring cost, speed, and quality in live apps.
7. **Miscellaneous**: Extra topics like safety guardrails, images/audio, and privacy.`,
    },
    {
      id: 'slide-initial-01',
      title: "Slide 1: The Builder's Perspective - Model Architecture",
      timestamp: '35:35 / 50:14',
      previewUrl: originalImagePath,
      pillarId: 'transformer-architecture',
      isInitial: true,
      generatedMarkdown: `## Lecture Slide: The Builder's Perspective (Timestamp 35:35)

### Modules Shown on the Slide
1. **Transformer Architecture**: The core neural network architecture behind modern LLMs.
2. **Types of Transformers**: Encoder Only (BERT), Decoder Only (GPT), Encoder & Decoder based (T5).
3. **Pretraining**: Training Objectives, Tokenization Strategies, Training Strategies, Handling challenges.
4. **Fine-Tuning**: Task specific tuning, Instruction tuning, Continual Pretraining, RLHF, PEFT.
5. **Optimization**: Training Optimization, Model compression, Optimizing Inference.
6. **Evaluation**: Testing model accuracy, helpfulness, and safety.
7. **Deployment**: Hosting the finished model so users and apps can access it.`,
    },
  ]);

  const [selectedSlideId, setSelectedSlideId] = useState<string>('slide-initial-01');
  const [selectedPillarId, setSelectedPillarId] = useState<string>('transformer-architecture');
  const [customSlideTitle, setCustomSlideTitle] = useState<string>('');
  const [userNotesContext, setUserNotesContext] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSlide = slides.find((s) => s.id === selectedSlideId) || slides[0];

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const newSlide: SlideItem = {
        id: `slide-${Date.now()}`,
        title: customSlideTitle.trim() || `Lecture Slide #${slides.length + 1}`,
        timestamp: 'New Screenshot',
        previewUrl: base64,
        base64Data: base64,
        pillarId: selectedPillarId,
      };

      setSlides((prev) => [newSlide, ...prev]);
      setSelectedSlideId(newSlide.id);
      setCustomSlideTitle('');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) handleFileUpload(file);
        break;
      }
    }
  };

  const handleAnalyzeSlide = async () => {
    if (!currentSlide) return;

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      let imageBase64ToSend = currentSlide.base64Data;

      // If it's the initial slide stored at originalImagePath, fetch and convert to base64
      if (!imageBase64ToSend && currentSlide.previewUrl) {
        const resp = await fetch(currentSlide.previewUrl);
        const blob = await resp.blob();
        imageBase64ToSend = await new Promise((resolve) => {
          const r = new FileReader();
          r.onloadend = () => resolve(r.result as string);
          r.readAsDataURL(blob);
        });
      }

      const matchingPillar = pillars.find((p) => p.id === currentSlide.pillarId);

      const res = await fetch('/api/analyze-slide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageBase64ToSend,
          mimeType: 'image/png',
          chapterTitle: matchingPillar?.title || 'Generative AI',
          userContext: userNotesContext,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to analyze slide with Gemini.');
      }

      const data = await res.json();
      const generated = data.markdown || '';

      // Update slide with generated notes
      setSlides((prev) =>
        prev.map((s) => (s.id === currentSlide.id ? { ...s, generatedMarkdown: generated } : s))
      );

      setSuccessToast('Notes generated successfully with Gemini!');
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error communicating with the Gemini API.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAppendToRepo = () => {
    if (!currentSlide.generatedMarkdown) return;
    onAppendMarkdownToPillar(
      currentSlide.pillarId,
      currentSlide.title,
      currentSlide.generatedMarkdown
    );
    setSuccessToast(`Saved and appended to ${currentSlide.pillarId} notes!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleCopyMarkdown = () => {
    if (!currentSlide.generatedMarkdown) return;
    navigator.clipboard.writeText(currentSlide.generatedMarkdown);
    setSuccessToast('Markdown copied to clipboard!');
    setTimeout(() => setSuccessToast(null), 2000);
  };

  return (
    <div className="space-y-6" onPaste={handlePaste}>
      {/* Header and Instructions */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Upload Next Lecture Slides & AI Note Extractor
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          Share subsequent screenshots from your YouTube video. Gemini will extract the architecture, formulas, and concepts and generate structured GitHub Markdown to expand your repository.
        </p>
      </div>

      {/* Main Grid: Upload & Slides Gallery on Left, Preview & Extracted Notes on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload Box + Slide Selector */}
        <div className="lg:col-span-5 space-y-4">
          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20'
                : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-900'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              accept="image/*"
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-full">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                Drop new YouTube slide screenshot here
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                or click to browse from device (or press Ctrl+V to paste)
              </p>
            </div>
          </div>

          {/* Form to attach to Pillar */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Assign to Curriculum Pillar:
            </label>
            <select
              value={selectedPillarId}
              onChange={(e) => {
                setSelectedPillarId(e.target.value);
                if (currentSlide) {
                  setSlides((prev) =>
                    prev.map((s) => (s.id === currentSlide.id ? { ...s, pillarId: e.target.value } : s))
                  );
                }
              }}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              {pillars.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.filename})
                </option>
              ))}
            </select>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Optional Notes / Video Context (e.g., instructor remarks):
              </label>
              <textarea
                value={userNotesContext}
                onChange={(e) => setUserNotesContext(e.target.value)}
                placeholder="e.g. In this slide Nitish explains why QLoRA uses NF4 instead of standard FP4..."
                rows={2}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handleAnalyzeSlide}
              disabled={isAnalyzing}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAnalyzing ? 'Extracting Notes with Gemini...' : 'Analyze Slide & Generate Notes'}</span>
            </button>
          </div>

          {/* Slide History Thumbnail List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                Lecture Slides ({slides.length})
              </span>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {slides.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSlideId(s.id)}
                  className={`cursor-pointer p-2 rounded-xl border flex items-center gap-3 transition-colors ${
                    selectedSlideId === s.id
                      ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={s.previewUrl}
                    alt={s.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-10 object-cover rounded border border-slate-200 dark:border-slate-800 bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {s.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                      <span>{s.timestamp}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{s.pillarId.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Slide Preview & Generated Notes */}
        <div className="lg:col-span-7 space-y-4">
          {/* Notification Alerts */}
          {errorMessage && (
            <div className="p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successToast && (
            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          {/* Current Slide Display */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-black overflow-hidden shadow-xs">
            <img
              src={currentSlide.previewUrl}
              alt={currentSlide.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[340px] object-contain mx-auto block"
            />
          </div>

          {/* Generated Markdown Output */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Extracted GitHub Markdown
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {currentSlide.title}
                </h3>
              </div>

              {currentSlide.generatedMarkdown && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyMarkdown}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy .md</span>
                  </button>
                  <button
                    onClick={handleAppendToRepo}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Append to Notes</span>
                  </button>
                </div>
              )}
            </div>

            {currentSlide.generatedMarkdown ? (
              <div className="space-y-3">
                <textarea
                  value={currentSlide.generatedMarkdown}
                  onChange={(e) => {
                    const updated = e.target.value;
                    setSlides((prev) =>
                      prev.map((s) => (s.id === currentSlide.id ? { ...s, generatedMarkdown: updated } : s))
                    );
                  }}
                  rows={14}
                  className="w-full p-4 font-mono text-xs leading-relaxed rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-950 text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  You can edit the extracted markdown above before appending it to your repository notes.
                </p>
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40">
                <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  No notes generated for this slide yet.
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Click the "Analyze Slide & Generate Notes" button above to run Gemini extraction.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
