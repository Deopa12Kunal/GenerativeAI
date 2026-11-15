import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

// Helper function to recursively read codebase files
function getDirectoryFiles(dir: string, baseDir: string = dir): { path: string; content: string }[] {
  let results: { path: string; content: string }[] = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.aistudio' || file.startsWith('.')) {
        if (file !== '.gitignore' && file !== '.env.example') continue;
      }
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getDirectoryFiles(filePath, baseDir));
      } else {
        if (file.match(/\.(tsx?|jsx?|json|css|html|md|example|gitignore|sh)$/)) {
          try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const relPath = path.relative(baseDir, filePath).replace(/\\/g, '/');
            results.push({ path: relPath, content });
          } catch (e) {}
        }
      }
    }
  } catch (e) {
    console.error('Error walking directory:', e);
  }
  return results;
}

// Initialize Google GenAI client (Server-Side only)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint to fetch entire codebase files for GitHub full-repo push
app.get('/api/project-codebase-files', (_req, res) => {
  try {
    const files = getDirectoryFiles(__dirname, __dirname);
    res.json({ files, count: files.length });
  } catch (error: any) {
    console.error('Error gathering codebase files:', error);
    res.status(500).json({ error: error?.message || 'Failed to gather codebase files.' });
  }
});

// Analyze YouTube video slide screenshot and extract structured GitHub-ready Markdown
app.post('/api/analyze-slide', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/png', userContext = '', chapterTitle = '' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image base64 data is required.' });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const systemPrompt = `You are helping a student build clean, easy-to-understand study notes from YouTube Generative AI lecture slides (Nitish Singh / CampusX).
CRITICAL RULES:
1. Image as Prime Source: Extract ONLY the headings, boxes, diagrams, and terms actually shown in the uploaded slide screenshot. Do NOT invent or dump advanced unrelated jargon that is not on the slide.
2. Easy to Understand: Write in plain, beginner-friendly English so someone learning alongside the video can immediately understand each point. Avoid dense mathematical equations or heavy research jargon unless explicitly written on the slide.
3. Short & Crisp: Use short bullet points, simple explanations (1–2 sentences each), and clean GitHub Markdown tables where helpful.
4. Ready for Expansion: Leave room for the student to add their own takeaways while watching the rest of the video.`;

    const promptText = `Analyze this YouTube lecture slide screenshot${chapterTitle ? ` for the topic "${chapterTitle}"` : ''}.
${userContext ? `Student context: "${userContext}"` : ''}
Use the slide image as your primary source. Explain each item visible on the slide in simple, relevant, easy-to-understand GitHub Markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          { text: promptText },
        ],
      },
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const markdown = response.text || '';
    res.json({ markdown });
  } catch (error: any) {
    console.error('Error in /api/analyze-slide:', error);
    res.status(500).json({
      error: error?.message || 'Failed to analyze slide with Gemini.',
    });
  }
});

// Interactive AI Tutor / Note Query Assistant
app.post('/api/ask-gemini', async (req, res) => {
  try {
    const { question, currentTopic, noteContext } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const systemInstruction = `You are a friendly, clear Generative AI tutor helping a student build study notes while watching YouTube lectures.
Explain concepts in simple, plain English with short bullet points and everyday analogies. Avoid overwhelming the learner with complex math or unnecessary jargon unless they specifically ask for it.`;

    const prompt = `Context:
Current Topic: ${currentTopic || 'Generative AI'}
Current Study Note:
${noteContext ? noteContext.slice(0, 3000) : 'General Generative AI questions'}

Student Question:
${question}

Provide a short, clear, easy-to-understand explanation in GitHub Markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    res.json({ answer: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ask-gemini:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate response.',
    });
  }
});

// Direct GitHub Push Endpoint using GitHub REST API
app.post('/api/github/direct-push', async (req, res) => {
  try {
    const { owner, repo, token, branch = 'main', files = [] } = req.body;

    if (!owner || !repo || !token) {
      return res.status(400).json({
        error: 'Missing required parameters: owner, repo, and GitHub Personal Access Token (PAT).',
      });
    }

    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: 'No files provided to push.' });
    }

    const cleanToken = token.trim();
    const cleanOwner = owner.trim();
    const cleanRepo = repo.trim();

    // 1. Verify repo accessibility
    const repoCheckRes = await fetch(`https://api.github.com/repos/${cleanOwner}/${cleanRepo}`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'GenAI-Builder-Notes',
      },
    });

    if (!repoCheckRes.ok) {
      const err = await repoCheckRes.json().catch(() => ({}));
      if (repoCheckRes.status === 401) {
        return res.status(401).json({
          error: 'Invalid GitHub Personal Access Token. Please verify token permissions.',
        });
      }
      if (repoCheckRes.status === 404) {
        return res.status(404).json({
          error: `Repository "${cleanOwner}/${cleanRepo}" not found. Ensure the repository exists and your token has "repo" (or Read & Write) access.`,
        });
      }
      return res.status(repoCheckRes.status).json({
        error: err.message || `GitHub API error: ${repoCheckRes.statusText}`,
      });
    }

    const pushedFiles: string[] = [];

    // 2. Push each file sequentially
    for (const file of files) {
      const filePath = file.path;
      const fileContent = file.content;
      const base64Content = Buffer.from(fileContent, 'utf-8').toString('base64');

      // Check if file already exists in repo to obtain its sha
      let existingSha: string | undefined = undefined;
      try {
        const getFileRes = await fetch(
          `https://api.github.com/repos/${cleanOwner}/${cleanRepo}/contents/${filePath}?ref=${branch}`,
          {
            headers: {
              Authorization: `Bearer ${cleanToken}`,
              Accept: 'application/vnd.github.v3+json',
              'User-Agent': 'GenAI-Builder-Notes',
            },
          }
        );
        if (getFileRes.ok) {
          const fileData = await getFileRes.json();
          existingSha = fileData.sha;
        }
      } catch (e) {
        // file doesn't exist yet, proceed with create
      }

      const putBody: any = {
        message: `docs(genai): add/update ${filePath} from Builder's Perspective notes`,
        content: base64Content,
        branch,
      };

      if (existingSha) {
        putBody.sha = existingSha;
      }

      const putRes = await fetch(
        `https://api.github.com/repos/${cleanOwner}/${cleanRepo}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'GenAI-Builder-Notes',
          },
          body: JSON.stringify(putBody),
        }
      );

      if (!putRes.ok) {
        const putErr = await putRes.json().catch(() => ({}));
        throw new Error(`Failed to push ${filePath}: ${putErr.message || putRes.statusText}`);
      }

      pushedFiles.push(filePath);
    }

    res.json({
      success: true,
      repoUrl: `https://github.com/${cleanOwner}/${cleanRepo}`,
      branch,
      pushedCount: pushedFiles.length,
      pushedFiles,
    });
  } catch (error: any) {
    console.error('Error in /api/github/direct-push:', error);
    res.status(500).json({
      error: error?.message || 'Failed to push files to GitHub.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

startServer();
