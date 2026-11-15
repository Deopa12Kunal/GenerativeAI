import React from 'react';
import { Download, Github } from 'lucide-react';

interface HeaderProps {
  activeTab: 'landing' | 'roadmap' | 'user-view' | 'notes' | 'analyzer' | 'flashcards';
  setActiveTab: (tab: 'landing' | 'roadmap' | 'user-view' | 'notes' | 'analyzer' | 'flashcards') => void;
  onOpenExportModal: () => void;
  onDownloadZip: () => void;
  isDownloadingZip: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExportModal,
  onDownloadZip,
  isDownloadingZip,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('landing');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-indigo-600 rounded-sm"></span>
          GenAI Study Hub
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('landing')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors py-1 ${
              activeTab === 'landing'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors py-1 ${
              activeTab === 'roadmap'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
            title="Slide 1: The Builder's Perspective (35:35)"
          >
            Builder's View (35:35)
          </button>
          <button
            onClick={() => setActiveTab('user-view')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors py-1 ${
              activeTab === 'user-view'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
            title="Slide 2: The User's Perspective (41:37)"
          >
            User's View (41:37)
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors py-1 ${
              activeTab === 'notes'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
          >
            All Notes
          </button>
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors py-1 ${
              activeTab === 'analyzer'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
          >
            Upload Slide
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors py-1 ${
              activeTab === 'flashcards'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
          >
            Flashcards
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenExportModal}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 border border-slate-300 dark:border-slate-700"
            title="Push Full App Code or Notes directly to GitHub"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Push to GitHub</span>
          </button>
          <button
            onClick={onDownloadZip}
            disabled={isDownloadingZip}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloadingZip ? 'Archiving...' : 'Download .zip'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
