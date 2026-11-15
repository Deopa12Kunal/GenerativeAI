import React, { useState } from 'react';
import { NotePillar } from '../data/notesData';
import { ArrowLeft, ArrowRight, RotateCw, CheckCircle, HelpCircle } from 'lucide-react';

interface Flashcard {
  pillarTitle: string;
  question: string;
  answer: string;
  formulaOrCode?: string;
}

interface FlashcardsModalProps {
  pillars: NotePillar[];
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({ pillars }) => {
  // Aggregate all questions from all pillars into a comprehensive flashcard deck
  const allCards: Flashcard[] = pillars.flatMap((pillar) =>
    pillar.sections.flatMap((section) =>
      section.interviewQuestions.map((iq) => ({
        pillarTitle: pillar.title,
        question: iq.question,
        answer: iq.answer,
      }))
    )
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterPillar, setFilterPillar] = useState<string>('all');

  const filteredCards =
    filterPillar === 'all'
      ? allCards
      : allCards.filter((c) => c.pillarTitle.toLowerCase() === filterPillar.toLowerCase());

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            GenAI Study Flashcards
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Quick self-check questions based directly on the Builder and User lecture slides.
          </p>
        </div>

        {/* Filter by pillar */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 dark:text-slate-400">Topic:</label>
          <select
            value={filterPillar}
            onChange={(e) => {
              setFilterPillar(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="text-xs p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden"
          >
            <option value="all">All 14 Topics ({allCards.length})</option>
            {pillars.map((p) => (
              <option key={p.id} value={p.title}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 dark:bg-slate-900 rounded-xl">
          <p className="text-xs text-slate-500">No cards found for this category.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {currentCard.pillarTitle}
            </span>
          </div>

          {/* Flashcard Box */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[300px] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <span className="uppercase font-bold tracking-wider">
                  {isFlipped ? '💡 Builder Answer' : '❓ Technical Question'}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <RotateCw className="w-3 h-3" />
                  Click card to flip
                </span>
              </div>

              {!isFlipped ? (
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {currentCard.question}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {currentCard.answer}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{isFlipped ? 'Great work! Try another' : 'Think of the formula / trade-off'}</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">Flip card →</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Show Question' : 'Show Answer'}</span>
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
            >
              <span>Next Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
