import React, { useState } from 'react';
import { NotePillar, generateFullReadme } from '../data/notesData';
import {
  X,
  Github,
  Download,
  Copy,
  Check,
  Terminal,
  FolderGit2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Key,
  FileCode2,
  BookOpen,
  GitCommit
} from 'lucide-react';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  pillars: NotePillar[];
  onDownloadZip: () => void;
  isDownloadingZip: boolean;
}

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({
  isOpen,
  onClose,
  pillars,
  onDownloadZip,
  isDownloadingZip,
}) => {
  const [activeTab, setActiveTab] = useState<'direct' | 'terminal' | 'zip'>('direct');
  const [pushScope, setPushScope] = useState<'full-codebase' | 'notes-only'>('full-codebase');

  // Direct push form state
  const [githubUsername, setGithubUsername] = useState('karandeo913');
  const [repoName, setRepoName] = useState('genai-builders-notes');
  const [patToken, setPatToken] = useState('');
  const [branch, setBranch] = useState('main');
  const [commitMessage, setCommitMessage] = useState(
    'docs(genai): update GenAI study hub, LangChain & Semantic Search notes'
  );

  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<string | null>(null);
  const [pushError, setPushError] = useState<string | null>(null);
  const [pushSuccessResult, setPushSuccessResult] = useState<{
    repoUrl: string;
    commitUrl?: string;
    commitMessage?: string;
    pushedCount: number;
    pushedFiles: string[];
    branch?: string;
  } | null>(null);

  // Terminal copy states
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const gitUrl = `https://github.com/${githubUsername.trim() || 'username'}/${repoName.trim() || 'repo'}.git`;
  const effectiveCommitMessage =
    commitMessage.trim() || 'docs(genai): update GenAI study notes and codebase';

  // Build notes-only array
  const prepareNotesOnlyFiles = (includeNotesPrefix = true) => {
    const files: { path: string; content: string; encoding?: 'utf-8' | 'base64' }[] = [];
    const prefix = includeNotesPrefix ? 'notes/' : '';

    // 1. README.md
    files.push({
      path: `${prefix}README.md`,
      content: generateFullReadme(),
      encoding: 'utf-8',
    });

    // 2. All 14 module files (7 Builder's + 7 User's)
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
            `![${img.caption}](${includeNotesPrefix ? '../public' : 'public'}${img.src})\n${
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
      files.push({
        path: `${prefix}${pillar.filename}`,
        content: fullContent,
        encoding: 'utf-8',
      });
    });

    // 3. .gitignore (only for standalone notes-only repo)
    if (!includeNotesPrefix) {
      files.push({
        path: '.gitignore',
        content: `# Python & Checkpoints
__pycache__/
*.pt
*.safetensors
.venv/
.env
.DS_Store
`,
        encoding: 'utf-8',
      });
    }

    return files;
  };

  const handleDirectPush = async (e: React.FormEvent) => {
    e.preventDefault();
    setPushError(null);
    setPushSuccessResult(null);

    if (!githubUsername.trim() || !repoName.trim()) {
      setPushError('Please provide your GitHub username and repository name.');
      return;
    }

    if (!patToken.trim()) {
      setPushError('Please provide a GitHub Personal Access Token (PAT) with repo access.');
      return;
    }

    try {
      setIsPushing(true);
      setPushStatus('Preparing files to push...');

      let filesToPush: { path: string; content: string; encoding?: 'utf-8' | 'base64' }[] = [];

      if (pushScope === 'full-codebase') {
        setPushStatus('Fetching project codebase files (React + Express + Tailwind + Images + Notes)...');
        const codeRes = await fetch('/api/project-codebase-files');
        if (!codeRes.ok) {
          throw new Error('Failed to gather project codebase files.');
        }
        const codeData = await codeRes.json();
        filesToPush = codeData.files || [];

        // Sync live React notes (including any personal notes added in UI) into notes/
        const noteFiles = prepareNotesOnlyFiles(true);
        noteFiles.forEach((nf) => {
          const existingIdx = filesToPush.findIndex((f) => f.path === nf.path);
          if (existingIdx >= 0) {
            filesToPush[existingIdx] = nf;
          } else {
            filesToPush.push(nf);
          }
        });
      } else {
        filesToPush = prepareNotesOnlyFiles(false);
      }

      setPushStatus(`Creating 1 commit with ${filesToPush.length} files on ${githubUsername}/${repoName} (${branch})...`);

      const res = await fetch('/api/github/direct-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: githubUsername.trim(),
          repo: repoName.trim(),
          token: patToken.trim(),
          branch: branch.trim() || 'main',
          commitMessage: effectiveCommitMessage,
          files: filesToPush,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to push to GitHub.');
      }

      setPushSuccessResult(data);
      setPushStatus(null);
    } catch (err: any) {
      console.error(err);
      setPushError(err.message || 'An error occurred during push.');
      setPushStatus(null);
    } finally {
      setIsPushing(false);
    }
  };

  const copyToClipboard = (text: string, stepId: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Push Code & Notes to GitHub
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Push your entire web app codebase so you can add more pages later, or push notes only.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('direct')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'direct'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Direct Push</span>
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'terminal'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal Git</span>
            </button>
            <button
              onClick={() => setActiveTab('zip')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'zip'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* TAB 1: DIRECT PUSH FORM */}
          {activeTab === 'direct' && (
            <div className="space-y-4">
              {pushSuccessResult ? (
                /* Success Card */
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                    Successfully Pushed to GitHub!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed max-w-md mx-auto">
                    All {pushSuccessResult.pushedCount} files were committed to branch{' '}
                    <code className="font-mono font-bold">{pushSuccessResult.branch || 'main'}</code> in one commit.
                  </p>
                  {pushSuccessResult.commitMessage && (
                    <div className="max-w-md mx-auto px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-900/70 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-900 dark:text-emerald-200 break-words">
                      Commit: "{pushSuccessResult.commitMessage}"
                    </div>
                  )}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={pushSuccessResult.commitUrl || pushSuccessResult.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                    >
                      <span>{pushSuccessResult.commitUrl ? 'View Commit on GitHub' : 'Open Repository on GitHub'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setPushSuccessResult(null)}
                      className="px-3 py-2 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400"
                    >
                      Push Again
                    </button>
                  </div>
                </div>
              ) : (
                /* Input Form */
                <form onSubmit={handleDirectPush} className="space-y-4">
                  {/* Scope Selector: Full Codebase vs Notes Only */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      What would you like to push to GitHub?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPushScope('full-codebase')}
                        className={`p-3 rounded-xl border text-left transition-colors flex items-start gap-2.5 ${
                          pushScope === 'full-codebase'
                            ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 text-slate-900 dark:text-white ring-1 ring-indigo-500'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <FileCode2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block text-slate-900 dark:text-white">
                            Full App Codebase (Recommended)
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                            React + Tailwind + Express + Landing Page + Notes. Ready to clone and add more pages.
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPushScope('notes-only')}
                        className={`p-3 rounded-xl border text-left transition-colors flex items-start gap-2.5 ${
                          pushScope === 'notes-only'
                            ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 text-slate-900 dark:text-white ring-1 ring-indigo-500'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block text-slate-900 dark:text-white">
                            Markdown Notes Only
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                            Only the 14 `.md` module files (Builder & User views), README.md, and .gitignore.
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {pushError && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{pushError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        GitHub Username / Org:
                      </label>
                      <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        placeholder="e.g. karandeo913"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Existing Repository Name:
                      </label>
                      <input
                        type="text"
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                        placeholder="e.g. genai-builders-notes"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-amber-500" />
                        <span>GitHub Personal Access Token (PAT):</span>
                      </label>
                      <a
                        href="https://github.com/settings/tokens/new?scopes=repo&description=GenAI+Notes+Builder"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                      >
                        <span>Generate Token (1-click)</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <input
                      type="password"
                      value={patToken}
                      onChange={(e) => setPatToken(e.target.value)}
                      placeholder="ghp_... or github_pat_..."
                      required
                      className="w-full px-3 py-2 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="text-[10px] text-slate-400">
                      Requires <code>repo</code> scope (or fine-grained Repository Permissions: Contents &rarr; Read and Write). Never stored; used strictly for this commit.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                        <GitCommit className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Commit Message:</span>
                      </label>
                      <input
                        type="text"
                        value={commitMessage}
                        onChange={(e) => setCommitMessage(e.target.value)}
                        placeholder="e.g. feat: add LangChain and Semantic Search notes"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Target Branch:
                      </label>
                      <input
                        type="text"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="main"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPushing}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Github className="w-4 h-4" />
                    <span>
                      {isPushing
                        ? (pushStatus || 'Pushing to GitHub...')
                        : `Push ${pushScope === 'full-codebase' ? 'Full Codebase' : 'Notes'} to ${githubUsername}/${repoName}`}
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: TERMINAL COMMANDS */}
          {activeTab === 'terminal' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                To push the code from your local machine using terminal:
              </p>

              <div className="space-y-2.5">
                {/* Step 1 */}
                <div className="p-3 rounded-lg bg-slate-900 text-slate-100 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block"># 1. Initialize git & add all code/pages</span>
                    <div className="text-emerald-400">git init && git add .</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('git init && git add .', 1)}
                    className="p-1 rounded text-slate-300 hover:text-white"
                  >
                    {copiedStep === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Step 2 */}
                <div className="p-3 rounded-lg bg-slate-900 text-slate-100 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block"># 2. Commit</span>
                    <div className="text-emerald-400">git commit -m "{effectiveCommitMessage.replace(/"/g, '\\"')}"</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`git commit -m "${effectiveCommitMessage.replace(/"/g, '\\"')}"`, 2)}
                    className="p-1 rounded text-slate-300 hover:text-white"
                  >
                    {copiedStep === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Step 3 */}
                <div className="p-3 rounded-lg bg-slate-900 text-slate-100 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block"># 3. Link remote & push</span>
                    <div className="text-emerald-400">
                      git branch -M main && git remote add origin {gitUrl} && git push -u origin main
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `git branch -M main && git remote add origin ${gitUrl} && git push -u origin main`,
                        3
                      )
                    }
                    className="p-1 rounded text-slate-300 hover:text-white"
                  >
                    {copiedStep === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DOWNLOAD ZIP */}
          {activeTab === 'zip' && (
            <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                  Offline Archive
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Download the full app codebase, slide images, and all 14 markdown notes in a single zip archive.
                </p>
              </div>
              <button
                onClick={onDownloadZip}
                disabled={isDownloadingZip}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0 disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isDownloadingZip ? 'Creating ZIP...' : 'Download .zip'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            GitHub REST API Direct Commit Enabled
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
