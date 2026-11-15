import React, { useState, useEffect } from 'react';
import { NotePillar, NoteSection } from '../data/notesData';
import {
  Copy,
  Check,
  Download,
  FileCode,
  FileText,
  Search,
  Zap,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  Info
} from 'lucide-react';

interface NotesViewerProps {
  pillars: NotePillar[];
  activePillarId: string;
  initialSectionId?: string;
  setActivePillarId: (pillarId: string) => void;
  onOpenAskAI: (topic: string, context: string) => void;
  onUpdatePillarMarkdown: (pillarId: string, sectionId: string, newContent: string) => void;
  onNavigateToSlide: () => void;
}

export const NotesViewer: React.FC<NotesViewerProps> = ({
  pillars,
  activePillarId,
  initialSectionId,
  setActivePillarId,
  onOpenAskAI,
  onUpdatePillarMarkdown,
  onNavigateToSlide,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(initialSectionId || '');
  const [viewFormat, setViewFormat] = useState<'crisp' | 'rendered' | 'raw'>('crisp');
  const [perspectiveFilter, setPerspectiveFilter] = useState<'all' | 'builder' | 'user'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedNote, setCopiedNote] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [quickNoteInput, setQuickNoteInput] = useState('');
  const [quickNoteSaved, setQuickNoteSaved] = useState(false);

  const currentPillar = pillars.find((p) => p.id === activePillarId) || pillars[0];

  useEffect(() => {
    if (initialSectionId && currentPillar.sections.some((s) => s.id === initialSectionId)) {
      setActiveSectionId(initialSectionId);
    } else if (!currentPillar.sections.some((s) => s.id === activeSectionId)) {
      setActiveSectionId(currentPillar.sections[0]?.id || '');
    }
  }, [activePillarId, initialSectionId, currentPillar.sections]);

  const currentSection =
    currentPillar.sections.find((s) => s.id === activeSectionId) || currentPillar.sections[0];

  const handleAddQuickNote = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickNoteInput.trim();
    if (!trimmed) return;

    const hasPersonalHeading = currentSection.markdownContent.includes('### My Lecture Notes');
    const addition = hasPersonalHeading
      ? `\n* ${trimmed}`
      : `\n\n---\n\n### My Lecture Notes\n* ${trimmed}`;

    onUpdatePillarMarkdown(
      currentPillar.id,
      currentSection.id,
      currentSection.markdownContent + addition
    );
    setQuickNoteInput('');
    setQuickNoteSaved(true);
    setTimeout(() => setQuickNoteSaved(false), 2000);
  };

  const handleCopyNote = () => {
    let textToCopy = '';
    const timestamp = currentPillar.perspective === 'user' ? '41:37' : '35:35';
    const lectureTitle =
      currentPillar.perspective === 'user'
        ? "Generative AI - The User's Perspective (CampusX / Nitish Singh)"
        : "Generative AI - The Builder's Perspective (CampusX / Nitish Singh)";

    if (viewFormat === 'crisp') {
      textToCopy = `# ${currentPillar.title} — Crisp Study Notes
Reference: Slide ${currentPillar.slideBoxName} (${currentPillar.slideBoxColor}) | Timestamp ${timestamp}

${currentSection.crispSummary.coreFormulaOrRule ? `### Core Formula / Rule:\n\`${currentSection.crispSummary.coreFormulaOrRule}\`\n\n` : ''}
### Key Takeaways:
${currentSection.crispSummary.bulletPoints.map((bp) => `* ${bp}`).join('\n')}

**${currentPillar.perspective === 'user' ? 'Engineering' : 'Builder'} Takeaway:** ${currentSection.crispSummary.builderTakeaway}
`;
    } else {
      textToCopy = `# ${currentPillar.title} (${currentPillar.filename})

> Lecture: ${lectureTitle} (Timestamp ${timestamp} / 50:14)
> Slide Box: ${currentPillar.slideBoxName} (${currentPillar.slideBoxColor})

${currentSection.markdownContent}

---

### Key Interview Prep & Conceptual Questions
${currentSection.interviewQuestions
  .map(
    (iq, idx) =>
      `#### Q${idx + 1}: ${iq.question}\n**Answer:** ${iq.answer}\n`
  )
  .join('\n')}
`;
    }
    navigator.clipboard.writeText(textToCopy);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const handleDownloadSingleMd = () => {
    const allSectionsMd = currentPillar.sections
      .map((sec) => {
        const imgs =
          sec.slideImages && sec.slideImages.length > 0
            ? sec.slideImages
                .map(
                  (img) =>
                    `![${img.caption}](../public${img.src})\n${
                      img.explanation ? `*About this slide:* ${img.explanation}\n` : ''
                    }`
                )
                .join('\n')
            : '';
        return `${imgs}${sec.markdownContent}`;
      })
      .join('\n\n---\n\n');
    const content = `# ${currentPillar.title}\n\n${allSectionsMd}`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentPillar.filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const toggleQuestion = (qIndex: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qIndex]: !prev[qIndex],
    }));
  };

  // Helper to render markdown cleanly
  const renderFormattedMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeBuffer: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const flushTable = (key: string) => {
      if (tableRows.length > 0) {
        const headerRow = tableRows[0];
        const dataRows = tableRows.slice(1).filter((r) => !r.every((c) => c.match(/^:?-+:?$/)));

        elements.push(
          <div key={`table-${key}`} className="my-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                <tr>
                  {headerRow.map((col, idx) => (
                    <th key={idx} className="p-2.5">
                      {col.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5">
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    const flushCode = (key: string) => {
      if (codeBuffer.length > 0) {
        const rawCode = codeBuffer.join('\n');
        const codeId = `code-${key}`;
        elements.push(
          <div key={codeId} className="my-4 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs">
              <span className="font-mono text-slate-400">{codeLanguage || 'python'}</span>
              <button
                onClick={() => handleCopyCode(codeId, rawCode)}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {copiedCodeId === codeId ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-emerald-300 dark:text-emerald-300">
              <code>{rawCode}</code>
            </pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCode(`line-${i}`);
        } else {
          flushTable(`pre-code-${i}`);
          inCodeBlock = true;
          codeLanguage = line.replace('```', '').trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      // Tables
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        inTable = true;
        const cells = line
          .trim()
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim());
        tableRows.push(cells);
        continue;
      } else if (inTable) {
        flushTable(`table-end-${i}`);
      }

      // GitHub Callouts
      if (line.startsWith('> [!NOTE]') || line.startsWith('> [!TIP]') || line.startsWith('> [!IMPORTANT]')) {
        const type = line.includes('NOTE') ? 'NOTE' : line.includes('TIP') ? 'TIP' : 'IMPORTANT';
        const calloutLines: string[] = [];
        let j = i + 1;
        while (j < lines.length && lines[j].startsWith('>')) {
          calloutLines.push(lines[j].replace(/^>\s?/, ''));
          j++;
        }
        i = j - 1;

        elements.push(
          <div
            key={`callout-${i}`}
            className={`my-3 p-3.5 rounded-xl border ${
              type === 'TIP'
                ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200'
                : 'border-sky-300 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-1">
              {type === 'TIP' ? '💡 Builder Tip' : '📘 Note'}
            </div>
            <div className="text-xs leading-relaxed space-y-1">
              {calloutLines.map((cl, clIdx) => (
                <p key={clIdx}>{cl}</p>
              ))}
            </div>
          </div>
        );
        continue;
      }

      // Headings
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${i}`} className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-5 mb-2">
            {line.replace('## ', '')}
          </h2>
        );
        continue;
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mt-4 mb-1.5">
            {line.replace('### ', '')}
          </h3>
        );
        continue;
      }

      // Bullet lists
      if (line.startsWith('* ') || line.startsWith('- ')) {
        elements.push(
          <li key={`li-${i}`} className="text-xs text-slate-700 dark:text-slate-300 ml-4 list-disc my-1">
            {line.replace(/^(\*|-)\s+/, '')}
          </li>
        );
        continue;
      }

      // Blockquotes / Slide references
      if (line.startsWith('> 📸')) {
        elements.push(
          <div key={`slide-ref-${i}`} className="p-2.5 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs font-medium text-indigo-900 dark:text-indigo-200 flex items-center justify-between my-2">
            <span>{line.replace(/^>\s*/, '')}</span>
            <button
              onClick={onNavigateToSlide}
              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View Slide</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        );
        continue;
      }

      // Plain paragraphs
      if (line.trim().length > 0) {
        elements.push(
          <p key={`p-${i}`} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed my-1.5">
            {line}
          </p>
        );
      }
    }

    if (inCodeBlock) flushCode('final-code');
    if (inTable) flushTable('final-table');

    return elements;
  };

  const builderCount = pillars.filter((p) => p.perspective === 'builder').length;
  const userCount = pillars.filter((p) => p.perspective === 'user').length;

  const filteredPillars = pillars.filter((p) => {
    if (perspectiveFilter === 'builder' && p.perspective !== 'builder') return false;
    if (perspectiveFilter === 'user' && p.perspective !== 'user') return false;

    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.subtopics.some((st) => st.toLowerCase().includes(query)) ||
      p.sections.some((sec) => sec.title.toLowerCase().includes(query)) ||
      p.filename.toLowerCase().includes(query)
    );
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[650px]">
      {/* Sidebar: Navigation Chapters matching Slide */}
      <div className="lg:col-span-4 space-y-3.5">
        {/* Perspective Filter Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setPerspectiveFilter('all')}
            className={`py-1.5 rounded-lg transition-colors text-center ${
              perspectiveFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All ({pillars.length})
          </button>
          <button
            onClick={() => setPerspectiveFilter('builder')}
            className={`py-1.5 rounded-lg transition-colors text-center ${
              perspectiveFilter === 'builder'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Builder ({builderCount})
          </button>
          <button
            onClick={() => setPerspectiveFilter('user')}
            className={`py-1.5 rounded-lg transition-colors text-center ${
              perspectiveFilter === 'user'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            User ({userCount})
          </button>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topics: LangChain, Semantic Search, RAG..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Chapters list */}
        <div className="space-y-1.5 overflow-y-auto max-h-[600px] pr-1">
          {filteredPillars.map((pillar, idx) => {
            const isSelected = pillar.id === activePillarId;
            return (
              <div
                key={pillar.id}
                className={`w-full rounded-xl border transition-all duration-150 ${
                  isSelected
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 shadow-xs'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <button
                  onClick={() => {
                    setActivePillarId(pillar.id);
                    setActiveSectionId(pillar.sections[0]?.id || '');
                  }}
                  className="w-full text-left p-3 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                      {pillar.perspective === 'user' ? 'User Box' : 'Builder Box'} 0{(idx % 7) + 1} ({pillar.colorName})
                    </span>
                    <span className="font-mono text-slate-400 text-[10px]">
                      {pillar.filename}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">
                    {pillar.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {pillar.subtopics.join(' · ')}
                  </div>
                </button>

                {pillar.sections.length > 1 && (
                  <div className="px-3 pb-2.5 pt-1 border-t border-slate-200/70 dark:border-slate-800/70 space-y-1">
                    {pillar.sections.map((sec, sIdx) => {
                      const isSecActive = isSelected && sec.id === currentSection.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => {
                            setActivePillarId(pillar.id);
                            setActiveSectionId(sec.id);
                          }}
                          className={`w-full text-left px-2 py-1 rounded-md text-[11px] font-medium transition-colors flex items-center justify-between ${
                            isSecActive
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="truncate">{sIdx + 1}. {sec.title}</span>
                          <span className="ml-1 shrink-0">→</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-8 space-y-4">
        {/* Note Controls Header */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {currentPillar.filename}
              </span>
              <span aria-hidden="true">·</span>
              <button
                onClick={onNavigateToSlide}
                className="hover:underline text-slate-600 dark:text-slate-300 flex items-center gap-1 font-sans"
              >
                <span>
                  {currentPillar.perspective === 'user'
                    ? "The User's Perspective (41:37)"
                    : "The Builder's Perspective (35:35)"}
                </span>
                <ExternalLink className="w-3 h-3 text-indigo-500" />
              </button>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {currentPillar.title}
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* View format segmented switch */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                onClick={() => setViewFormat('crisp')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  viewFormat === 'crisp'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Short, easy-to-understand overview"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Easy Summary</span>
              </button>
              <button
                onClick={() => setViewFormat('rendered')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  viewFormat === 'rendered'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Full formatted notes including your additions"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Full Notes</span>
              </button>
              <button
                onClick={() => setViewFormat('raw')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  viewFormat === 'raw'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Edit Raw Markdown directly"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Edit .md</span>
              </button>
            </div>

            <button
              onClick={handleCopyNote}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-300 dark:border-slate-700"
              title="Copy to clipboard"
            >
              {copiedNote ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadSingleMd}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300 dark:border-slate-700"
              title="Download single markdown file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.md</span>
            </button>

            <button
              onClick={() => onOpenAskAI(currentPillar.title, currentSection.markdownContent)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              title="Ask Gemini simple follow-up questions"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>
          </div>
        </div>

        {/* Section Switcher Tabs when a module has multiple topic notes */}
        {currentPillar.sections.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {currentPillar.sections.map((sec, sIdx) => {
              const isActive = sec.id === currentSection.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {sIdx + 1}. {sec.title}
                </button>
              );
            })}
          </div>
        )}

        {/* Easy Summary Mode */}
        {viewFormat === 'crisp' && (
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5">
            {/* Slide Reference Bar */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  📸 Slide Location:
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  {currentSection.slideBoxRef || `${currentPillar.slideBoxName} (${currentPillar.slideBoxColor})`}
                </span>
              </div>
              <button
                onClick={onNavigateToSlide}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View Slide Hotspot</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Embedded Reference Slide Images (if attached to this section) */}
            {currentSection.slideImages && currentSection.slideImages.length > 0 && (
              <div className="space-y-3">
                {currentSection.slideImages.map((img, idx) => (
                  <figure
                    key={idx}
                    className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[420px] object-contain mx-auto block"
                    />
                    <figcaption className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {img.caption}
                      </div>
                      {img.explanation && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {img.explanation}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            {/* Core Idea Box */}
            {currentSection.crispSummary.coreFormulaOrRule && (
              <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block mb-1">
                  Core Idea (In One Line)
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {currentSection.crispSummary.coreFormulaOrRule}
                </p>
              </div>
            )}

            {/* Simple Bullet Points from Slide */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                What This Module Covers (From Slide)
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {currentSection.crispSummary.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Study Takeaway Box */}
            <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-xs">
              <span className="font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider text-[11px] block mb-1">
                💡 Easy Takeaway
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {currentSection.crispSummary.builderTakeaway}
              </p>
            </div>

            {/* Quick Add Your Own YouTube Study Note */}
            <form
              onSubmit={handleAddQuickNote}
              className="p-4 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  ✍️ Add Your Own Note While Watching YouTube
                </label>
                <button
                  type="button"
                  onClick={() => setViewFormat('raw')}
                  className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Open Full .md Editor →
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={quickNoteInput}
                  onChange={(e) => setQuickNoteInput(e.target.value)}
                  placeholder={`Type a note for ${currentPillar.title} (saved into ${currentPillar.filename})...`}
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!quickNoteInput.trim()}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors shrink-0"
                >
                  {quickNoteSaved ? 'Added to Notes!' : 'Add Note'}
                </button>
              </div>
              {currentSection.markdownContent.includes('### My Lecture Notes') && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <div className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                    Your Added Notes:
                  </div>
                  <div className="space-y-1">
                    {currentSection.markdownContent
                      .split('### My Lecture Notes')[1]
                      ?.trim()
                      .split('\n')
                      .filter(Boolean)
                      .map((line, i) => (
                        <div key={i} className="text-xs">
                          {line}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Full Rendered Markdown Preview */}
        {viewFormat === 'rendered' && (
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
            {currentSection.slideImages && currentSection.slideImages.length > 0 && (
              <div className="space-y-3">
                {currentSection.slideImages.map((img, idx) => (
                  <figure
                    key={idx}
                    className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[420px] object-contain mx-auto block"
                    />
                    <figcaption className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {img.caption}
                      </div>
                      {img.explanation && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {img.explanation}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            <div className="prose prose-slate dark:prose-invert max-w-none">
              {renderFormattedMarkdown(currentSection.markdownContent)}
            </div>

            {/* Code Snippets */}
            {currentSection.codeSnippets && currentSection.codeSnippets.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Implementation Code
                </h4>
                {currentSection.codeSnippets.map((snippet, sIdx) => {
                  const sId = `snippet-${sIdx}`;
                  return (
                    <div
                      key={sIdx}
                      className="rounded-xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-xs"
                    >
                      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-xs">
                        <span className="font-semibold text-slate-300">{snippet.title}</span>
                        <button
                          onClick={() => handleCopyCode(sId, snippet.code)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
                        >
                          {copiedCodeId === sId ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Copy</span>
                        </button>
                      </div>
                      <pre className="p-3 overflow-x-auto text-xs font-mono leading-relaxed text-indigo-300">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Interview Questions */}
            {currentSection.interviewQuestions && currentSection.interviewQuestions.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Interview Questions
                </h4>
                {currentSection.interviewQuestions.map((iq, qIdx) => {
                  const qKey = `${currentSection.id}-${qIdx}`;
                  const isExpanded = expandedQuestions[qKey] ?? true;
                  return (
                    <div
                      key={qIdx}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(qKey)}
                        className="w-full text-left p-3 flex items-center justify-between gap-3 text-xs font-semibold text-slate-900 dark:text-white"
                      >
                        <span>Q{qIdx + 1}: {iq.question}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-3 pb-3 pt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/30">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">Answer: </span>
                          {iq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Raw Markdown Editor */}
        {viewFormat === 'raw' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Direct GitHub Markdown file editor ({currentPillar.filename}).</span>
              <span className="font-mono">{currentSection.markdownContent.length} chars</span>
            </div>
            <textarea
              value={currentSection.markdownContent}
              onChange={(e) =>
                onUpdatePillarMarkdown(currentPillar.id, currentSection.id, e.target.value)
              }
              rows={22}
              className="w-full p-4 font-mono text-xs leading-relaxed rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-900 text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-inner"
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
