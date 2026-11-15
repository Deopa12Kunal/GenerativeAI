import React, { useState } from 'react';
import { X, Send, Sparkles, PlusCircle, Check, Copy } from 'lucide-react';

interface AskGeminiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic: string;
  noteContext: string;
  onAppendAnswerToNote: (answer: string) => void;
}

export const AskGeminiDrawer: React.FC<AskGeminiDrawerProps> = ({
  isOpen,
  onClose,
  currentTopic,
  noteContext,
  onAppendAnswerToNote,
}) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [appended, setAppended] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    `Explain the mathematical intuition behind ${currentTopic}`,
    `Provide a minimal PyTorch implementation for this`,
    `What are the most common interview traps on this topic?`,
    `Compare performance, VRAM footprint, and hardware requirements`,
  ];

  const handleAsk = async (queryToAsk?: string) => {
    const q = queryToAsk || question;
    if (!q.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const res = await fetch('/api/ask-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          currentTopic,
          noteContext,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch explanation from Gemini.');
      }

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err: any) {
      setError(err.message || 'Error occurred while asking Gemini.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!answer) return;
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAppend = () => {
    if (!answer) return;
    onAppendAnswerToNote(`\n\n### Deep-Dive: ${question || 'Builder Insight'}\n\n${answer}`);
    setAppended(true);
    setTimeout(() => setAppended(false), 2500);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-600 text-white rounded-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              AI Study Companion
            </h3>
            <p className="text-[10px] text-slate-500 truncate max-w-[220px]">
              Module: {currentTopic}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Quick Prompts */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Quick Prompts
          </span>
          <div className="space-y-1">
            {quickQuestions.map((qq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuestion(qq);
                  handleAsk(qq);
                }}
                className="w-full text-left p-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 transition-colors truncate"
              >
                {qq}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {/* Answer Display */}
        {answer && (
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/20 dark:bg-slate-950 space-y-3">
            <div className="flex items-center justify-between border-b border-indigo-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                Gemini Explanation
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="p-1 rounded text-slate-500 hover:text-slate-700 dark:hover:text-white"
                  title="Copy explanation"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleAppend}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-600 text-white hover:bg-emerald-700 font-medium"
                >
                  {appended ? <Check className="w-3 h-3" /> : <PlusCircle className="w-3 h-3" />}
                  <span>{appended ? 'Appended!' : 'Append to Note'}</span>
                </button>
              </div>
            </div>
            <div className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
              {answer}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="p-6 text-center text-xs text-slate-500">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-spin mx-auto mb-2" />
            <span>Consulting Gemini for builder depth...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`Ask about ${currentTopic}...`}
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
