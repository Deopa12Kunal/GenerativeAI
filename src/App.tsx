import { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { INITIAL_PILLARS, NotePillar, NoteSection, generateFullReadme, REPO_METADATA } from './data/notesData';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { InteractiveSlideMap } from './components/InteractiveSlideMap';
import { UserPerspectiveView } from './components/UserPerspectiveView';
import { NotesViewer } from './components/NotesViewer';
import { SlideUploaderAndAnalyzer } from './components/SlideUploaderAndAnalyzer';
import { FlashcardsModal } from './components/FlashcardsModal';
import { GitHubExportModal } from './components/GitHubExportModal';
import { AskGeminiDrawer } from './components/AskGeminiDrawer';
import {
  Download,
  FolderGit2,
  BookOpen,
  Sparkles,
  ExternalLink,
  CheckCircle,
  HelpCircle,
  PlaySquare,
  Bot
} from 'lucide-react';

const STORAGE_KEY = 'genai-study-pillars-v4';

function mergeSavedPillars(saved: NotePillar[]): NotePillar[] {
  return INITIAL_PILLARS.map((initialPillar) => {
    const existing = saved.find((p) => p.id === initialPillar.id);
    if (!existing) return initialPillar;

    const mergedSections = initialPillar.sections.map((initSec) => {
      const savedSec = existing.sections.find((s) => s.id === initSec.id);
      if (!savedSec) return initSec;
      // Preserve user's personal lecture notes if added
      const personalIdx = savedSec.markdownContent.indexOf('### My Lecture Notes');
      if (personalIdx !== -1) {
        const personalPart = savedSec.markdownContent.slice(personalIdx);
        return {
          ...initSec,
          markdownContent: initSec.markdownContent.trimEnd() + '\n\n---\n\n' + personalPart,
        };
      }
      return initSec;
    });

    // Keep any extra user-uploaded slide sections that are not in INITIAL_PILLARS
    const extraSections = existing.sections.filter(
      (s) => !initialPillar.sections.some((initSec) => initSec.id === s.id)
    );

    return {
      ...initialPillar,
      sections: [...mergedSections, ...extraSections],
    };
  });
}

export default function App() {
  const [pillars, setPillars] = useState<NotePillar[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('genai-study-pillars-v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return mergeSavedPillars(parsed);
      }
    } catch {}
    return INITIAL_PILLARS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pillars));
    } catch {}
  }, [pillars]);

  const [selectedPillarId, setSelectedPillarId] = useState<string>('transformer-architecture');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'landing' | 'roadmap' | 'user-view' | 'notes' | 'analyzer' | 'flashcards'>('landing');

  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isAskAIDrawerOpen, setIsAskAIDrawerOpen] = useState<boolean>(false);
  const [askAIContext, setAskAIContext] = useState<{ topic: string; context: string }>({
    topic: 'Transformer Architecture',
    context: '',
  });

  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Separate pillars by perspective
  const builderPillars = pillars.filter((p) => p.perspective === 'builder');
  const userPillars = pillars.filter((p) => p.perspective === 'user');

  // Update markdown for a section
  const handleUpdatePillarMarkdown = (pillarId: string, sectionId: string, newContent: string) => {
    setPillars((prev) =>
      prev.map((pillar) => {
        if (pillar.id !== pillarId) return pillar;
        return {
          ...pillar,
          sections: pillar.sections.map((sec) =>
            sec.id === sectionId ? { ...sec, markdownContent: newContent } : sec
          ),
        };
      })
    );
  };

  // Append new note from newly uploaded slide
  const handleAppendMarkdownToPillar = (pillarId: string, title: string, markdown: string) => {
    setPillars((prev) =>
      prev.map((pillar) => {
        if (pillar.id !== pillarId) return pillar;
        const newSection: NoteSection = {
          id: `sec-${Date.now()}`,
          pillarId,
          title,
          slideBoxRef: `Slide Reference: ${pillar.slideBoxName}`,
          summary: `Extracted from lecture slide screenshot`,
          keyConcepts: ['Slide Analysis', 'Gemini Extraction'],
          crispSummary: {
            bulletPoints: [
              `Extracted concepts for ${title}`,
              `Synthesized from uploaded video slide screenshot`,
            ],
            builderTakeaway: `Review and commit these notes to your GitHub repository.`,
          },
          markdownContent: markdown,
          interviewQuestions: [],
        };
        return {
          ...pillar,
          sections: [...pillar.sections, newSection],
        };
      })
    );
    showToast(`Appended new section to ${pillarId} notes!`);
  };

  // Open AI Assistant drawer for current note
  const handleOpenAskAI = (topic: string, context: string) => {
    setAskAIContext({ topic, context });
    setIsAskAIDrawerOpen(true);
  };

  // Append AI explanation directly into the active note
  const handleAppendAIAnswer = (text: string) => {
    const activePillar = pillars.find((p) => p.id === selectedPillarId) || pillars[0];
    const activeSec = activePillar.sections[0];
    if (activeSec) {
      handleUpdatePillarMarkdown(
        activePillar.id,
        activeSec.id,
        activeSec.markdownContent + text
      );
      showToast('Explanation appended to note!');
    }
  };

  // Download entire GitHub repository as a ZIP file using JSZip
  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      const zip = new JSZip();

      // Fetch full codebase files from server
      const codeRes = await fetch('/api/project-codebase-files').catch(() => null);
      if (codeRes && codeRes.ok) {
        const data = await codeRes.json();
        const codebaseFiles: { path: string; content: string; encoding?: 'utf-8' | 'base64' }[] = data.files || [];
        codebaseFiles.forEach((file) => {
          zip.file(
            file.path,
            file.content,
            file.encoding === 'base64' ? { base64: true } : undefined
          );
        });
      }

      // Ensure README and all 14 live notes are up to date in the zip
      zip.file('notes/README.md', generateFullReadme());

      pillars.forEach((pillar) => {
        const fullContent = `# ${pillar.title} (${pillar.filename})

> Reference: YouTube Lecture Series by Nitish Singh (CampusX)
> Perspective: ${pillar.perspective === 'builder' ? "The Builder's Perspective (35:35)" : "The User's Perspective (41:37)"}
> Slide Box: ${pillar.slideBoxName} (${pillar.slideBoxColor})

## Table of Contents
${pillar.subtopics.map((st) => `* ${st}`).join('\n')}

---

${pillar.sections
  .map(
    (sec) => `## ${sec.title}

${
  sec.slideImages && sec.slideImages.length > 0
    ? sec.slideImages
        .map(
          (img) =>
            `![${img.caption}](../public${img.src})\n${
              img.explanation ? `*About this slide:* ${img.explanation}\n` : ''
            }`
        )
        .join('\n')
    : ''
}${sec.markdownContent}

${
  sec.interviewQuestions.length > 0
    ? `### Self-Check Questions
${sec.interviewQuestions
  .map((iq, i) => `#### Q${i + 1}: ${iq.question}\n**Answer:** ${iq.answer}\n`)
  .join('\n')}`
    : ''
}
`
  )
  .join('\n\n---\n\n')}
`;
        zip.file(`notes/${pillar.filename}`, fullContent);
      });

      // Generate blob
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'genai-complete-study-hub.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);

      showToast('Downloaded complete codebase (.zip) successfully!');
    } catch (err: any) {
      console.error('Error generating zip:', err);
      showToast('Failed to create zip file.');
    } finally {
      setIsDownloadingZip(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 dark:border-slate-300 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onDownloadZip={handleDownloadZip}
        isDownloadingZip={isDownloadingZip}
      />

      {/* Context Sub-Strip (when inside interior tabs) */}
      {activeTab !== 'landing' && (
        <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('landing')}
                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
              >
                <span>← Home</span>
              </button>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
                  <PlaySquare className="w-3.5 h-3.5" />
                  Nitish Singh
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {activeTab === 'user-view'
                    ? "Part 2: The User's Perspective (41:37)"
                    : "Part 1: The Builder's Perspective (35:35)"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab(activeTab === 'user-view' ? 'roadmap' : 'user-view')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-500" />
                <span>
                  Switch to {activeTab === 'user-view' ? "Builder's View (35:35)" : "User's View (41:37)"}
                </span>
              </button>
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors shadow-xs"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Push to GitHub</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'landing' && (
          <LandingPage
            pillars={pillars}
            onExploreNotes={(pillarId, sectionId) => {
              if (pillarId) setSelectedPillarId(pillarId);
              setSelectedSectionId(sectionId || '');
              setActiveTab('notes');
            }}
            onOpenUploader={() => setActiveTab('analyzer')}
            onOpenFlashcards={() => setActiveTab('flashcards')}
            onOpenExportModal={() => setIsExportModalOpen(true)}
            onNavigateToPerspective={(view) => setActiveTab(view)}
          />
        )}

        {activeTab === 'roadmap' && (
          <InteractiveSlideMap
            pillars={builderPillars}
            selectedPillarId={selectedPillarId}
            onSelectPillar={(id) => setSelectedPillarId(id)}
            onOpenNotesForPillar={(id) => {
              setSelectedPillarId(id);
              setSelectedSectionId('');
              setActiveTab('notes');
            }}
            originalImagePath={REPO_METADATA.slide1ImagePath}
          />
        )}

        {activeTab === 'user-view' && (
          <UserPerspectiveView
            userPillars={userPillars}
            selectedPillarId={selectedPillarId}
            onSelectPillar={(id) => setSelectedPillarId(id)}
            onOpenNotesForPillar={(id, secId) => {
              setSelectedPillarId(id);
              setSelectedSectionId(secId || '');
              setActiveTab('notes');
            }}
            slideImagePath={REPO_METADATA.slide2ImagePath}
          />
        )}

        {activeTab === 'notes' && (
          <NotesViewer
            pillars={pillars}
            activePillarId={selectedPillarId}
            initialSectionId={selectedSectionId}
            setActivePillarId={(id) => {
              setSelectedPillarId(id);
              setSelectedSectionId('');
            }}
            onOpenAskAI={handleOpenAskAI}
            onUpdatePillarMarkdown={handleUpdatePillarMarkdown}
            onNavigateToSlide={() => {
              const currentPillar = pillars.find((p) => p.id === selectedPillarId);
              if (currentPillar?.perspective === 'user') {
                setActiveTab('user-view');
              } else {
                setActiveTab('roadmap');
              }
            }}
          />
        )}

        {activeTab === 'analyzer' && (
          <SlideUploaderAndAnalyzer
            pillars={pillars}
            onAppendMarkdownToPillar={handleAppendMarkdownToPillar}
            originalImagePath={REPO_METADATA.slide1ImagePath}
          />
        )}

        {activeTab === 'flashcards' && <FlashcardsModal pillars={pillars} />}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              GenAI Builder Study Hub
            </span>
            <span aria-hidden="true">·</span>
            <span>Slide 1 (35:35) & Slide 2 (41:37)</span>
            <span aria-hidden="true">·</span>
            <span>CampusX Lecture Series</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('landing')}
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Builder's View (35:35)
            </button>
            <button
              onClick={() => setActiveTab('user-view')}
              className="hover:text-slate-900 dark:hover:text-white"
            >
              User's View (41:37)
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Notes Index
            </button>
            <button
              onClick={handleDownloadZip}
              className="hover:text-slate-900 dark:hover:text-white font-medium"
            >
              Download Codebase (.zip)
            </button>
          </div>
        </div>
      </footer>

      {/* GitHub Export Modal (Full Codebase or Notes Only) */}
      <GitHubExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        pillars={pillars}
        onDownloadZip={handleDownloadZip}
        isDownloadingZip={isDownloadingZip}
      />

      {/* Ask Gemini Tutor Drawer */}
      <AskGeminiDrawer
        isOpen={isAskAIDrawerOpen}
        onClose={() => setIsAskAIDrawerOpen(false)}
        currentTopic={askAIContext.topic}
        noteContext={askAIContext.context}
        onAppendAnswerToNote={handleAppendAIAnswer}
      />
    </div>
  );
}
