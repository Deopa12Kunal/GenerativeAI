export interface NoteSection {
  id: string;
  pillarId: string;
  title: string;
  summary: string;
  slideBoxRef: string;
  keyConcepts: string[];
  crispSummary: {
    bulletPoints: string[];
    coreFormulaOrRule?: string;
    builderTakeaway: string;
  };
  markdownContent: string;
  interviewQuestions: { question: string; answer: string }[];
  codeSnippets?: { language: string; title: string; code: string }[];
  slideImages?: { src: string; caption: string; explanation?: string }[];
}

export interface NotePillar {
  id: string;
  perspective: 'builder' | 'user';
  title: string;
  slideBoxName: string;
  slideBoxColor: string;
  colorName: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  colorAccent: string;
  badgeBg: string;
  gridArea: string;
  filename: string;
  timestamp: string;
  description: string;
  subtopics: string[];
  sections: NoteSection[];
}

export const INITIAL_PILLARS: NotePillar[] = [
  // ==========================================
  // SLIDE 1: THE BUILDER'S PERSPECTIVE (35:35)
  // ==========================================
  {
    id: 'transformer-architecture',
    perspective: 'builder',
    title: 'Transformer Architecture',
    slideBoxName: 'Transformer Architecture',
    slideBoxColor: 'Green (Top-Left Box)',
    colorName: 'Green',
    colorBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    colorBorder: 'border-emerald-300 dark:border-emerald-800',
    colorText: 'text-emerald-900 dark:text-emerald-200',
    colorAccent: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300',
    gridArea: 'arch',
    filename: '01-transformer-architecture.md',
    timestamp: '35:35',
    description: 'The core neural network design that powers modern Generative AI and Large Language Models.',
    subtopics: [
      'Transformer Architecture Overview',
      'How Attention Helps Models Understand Context',
      'Why Transformers Replaced Older Models (RNNs)'
    ],
    sections: [
      {
        id: 'transformer-basics',
        pillarId: 'transformer-architecture',
        title: 'Transformer Architecture — The Foundation',
        slideBoxRef: "Slide 1 Box: Transformer Architecture (Green) [35:35]",
        summary: 'A simple introduction to the Transformer architecture shown as the first block in the Builder view.',
        keyConcepts: ['Transformers', 'Self-Attention', 'Parallel Processing'],
        crispSummary: {
          coreFormulaOrRule: 'Transformers read an entire sentence at once and figure out how every word relates to every other word.',
          bulletPoints: [
            'The Base Blueprint: Almost every modern LLM (like GPT, Llama, and Gemini) is built using the Transformer architecture.',
            'Attention Mechanism: Lets the model focus on the most relevant words in a sentence to understand true meaning (e.g., knowing what "it" refers to).',
            'Fast Training: Unlike older models that read one word at a time, Transformers process all words in parallel, making it possible to train on huge datasets.'
          ],
          builderTakeaway: 'If you want to build or customize AI models from scratch, understanding how a Transformer processes text is step one.'
        },
        interviewQuestions: [
          {
            question: 'In simple terms, why was the Transformer architecture such a big breakthrough?',
            answer: 'Older models read text slowly one word at a time and forgot earlier words in long paragraphs. Transformers look at all words together using Attention, making them much faster to train and far better at understanding context.'
          }
        ],
        markdownContent: `## 1. Transformer Architecture

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Green Box (Top-Left)**

### What Is It?
The **Transformer** is the foundational neural network architecture behind modern Generative AI. Before Transformers, AI models struggled with long sentences because they processed words one by one.

### Key Ideas (Easy to Remember)
* **Reads Everything Together**: Processes all words in a sentence at the same time instead of sequentially.
* **Self-Attention**: Helps the model connect related words across a sentence (for example, connecting a pronoun like *"he"* or *"it"* back to the right person or object).
* **Building Block for Everything Else**: Every other box in the Builder's roadmap—Pretraining, Fine-Tuning, Optimization—builds on top of this architecture.

> [!NOTE]
> Add your own notes below as you watch the deeper Transformer video lectures!
`
      }
    ]
  },
  {
    id: 'types-of-transformers',
    perspective: 'builder',
    title: 'Types of Transformers',
    slideBoxName: 'Types of Transformers',
    slideBoxColor: 'Yellow (Bottom-Left Box)',
    colorName: 'Yellow',
    colorBg: 'bg-amber-50 dark:bg-amber-950/40',
    colorBorder: 'border-amber-300 dark:border-amber-800',
    colorText: 'text-amber-900 dark:text-amber-200',
    colorAccent: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300',
    gridArea: 'types',
    filename: '02-types-of-transformers.md',
    timestamp: '35:35',
    description: 'The three main variations listed in the slide: Encoder Only (BERT), Decoder Only (GPT), and Encoder & Decoder based (T5).',
    subtopics: [
      'Encoder Only (BERT)',
      'Decoder Only (GPT)',
      'Encoder & Decoder based (T5)'
    ],
    sections: [
      {
        id: 'encoder-vs-decoder',
        pillarId: 'types-of-transformers',
        title: 'Types of Transformers: BERT vs GPT vs T5',
        slideBoxRef: "Slide 1 Box: Types of Transformers (Yellow) [35:35]",
        summary: 'Clear breakdown of the 3 Transformer families listed directly on the lecture slide.',
        keyConcepts: ['Encoder Only (BERT)', 'Decoder Only (GPT)', 'Encoder & Decoder based (T5)'],
        crispSummary: {
          coreFormulaOrRule: 'Encoders understand text | Decoders generate text | Encoder-Decoder converts text from one form to another.',
          bulletPoints: [
            'Encoder Only (BERT): Reads text from both left and right at the same time. Best for understanding tasks like classification, sentiment analysis, and search.',
            'Decoder Only (GPT): Generates text one word after another based on previous words. Best for chatbots, writing, and coding.',
            'Encoder & Decoder based (T5): Uses an Encoder to understand the input and a Decoder to produce a new output. Best for language translation and summarization.'
          ],
          builderTakeaway: 'Choose the Transformer type based on your goal: understanding/search (Encoder), chatting/writing (Decoder), or translating/summarizing (Encoder-Decoder).'
        },
        interviewQuestions: [
          {
            question: 'What is the main difference between BERT (Encoder-Only) and GPT (Decoder-Only)?',
            answer: 'BERT looks at the whole sentence in both directions to understand meaning (great for classification and search), while GPT reads left-to-right to predict the next word (great for generating new text).'
          }
        ],
        markdownContent: `## 2. Types of Transformers

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Yellow Box (Bottom-Left)**

The slide breaks Transformers down into **3 exact types**:

| Type (From Slide) | Example | How It Works | Best Used For |
| :--- | :--- | :--- | :--- |
| **Encoder Only** | **BERT** | Looks at all words (left & right) together to understand meaning | Text classification, sentiment analysis, search |
| **Decoder Only** | **GPT** | Looks only at past words to predict the next word | Chatbots, text generation, coding assistants |
| **Encoder & Decoder based** | **T5** | Encoder reads the input; Decoder writes a transformed output | Translation, text summarization |
`
      }
    ]
  },
  {
    id: 'pretraining',
    perspective: 'builder',
    title: 'Pretraining',
    slideBoxName: 'Pretraining',
    slideBoxColor: 'Blue (Center-Top Box)',
    colorName: 'Blue',
    colorBg: 'bg-sky-50 dark:bg-sky-950/40',
    colorBorder: 'border-sky-300 dark:border-sky-800',
    colorText: 'text-sky-900 dark:text-sky-200',
    colorAccent: 'text-sky-600 dark:text-sky-400',
    badgeBg: 'bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300',
    gridArea: 'pretrain',
    filename: '03-pretraining.md',
    timestamp: '35:35',
    description: 'Teaching a model from scratch using the 4 topics from the slide: Training Objectives, Tokenization Strategies, Training Strategies, and Handling challenges.',
    subtopics: [
      'Training Objectives',
      'Tokenization Strategies',
      'Training Strategies',
      'Handling challenges'
    ],
    sections: [
      {
        id: 'pretraining-pillars',
        pillarId: 'pretraining',
        title: 'Pretraining: The 4 Core Topics on the Slide',
        slideBoxRef: "Slide 1 Box: Pretraining (Blue) [35:35]",
        summary: 'Easy-to-follow explanation of Training Objectives, Tokenization, Training Strategies, and Challenges.',
        keyConcepts: ['Training Objectives', 'Tokenization Strategies', 'Training Strategies', 'Handling challenges'],
        crispSummary: {
          coreFormulaOrRule: 'Pretraining is where a blank model learns language, facts, and patterns by reading massive amounts of raw text.',
          bulletPoints: [
            'Training Objectives: The learning task given to the model—such as predicting the next word (GPT style) or guessing a hidden word in a sentence (BERT style).',
            'Tokenization Strategies: Splitting raw sentences into smaller pieces called "tokens" (words or sub-words) and turning them into numbers the model can process.',
            'Training Strategies: Smart ways to organize and split the massive training job across many GPUs so it finishes in weeks instead of years.',
            'Handling challenges: Solving practical problems during training such as huge compute costs, running out of memory, and unstable training runs.'
          ],
          builderTakeaway: 'Pretraining builds the general knowledge of an LLM, turning raw internet text into a smart base model.'
        },
        interviewQuestions: [
          {
            question: 'What is tokenization and why is it needed during pretraining?',
            answer: 'AI models only understand numbers, not raw letters. Tokenization breaks text into common words or word pieces ("tokens") and maps each piece to a number ID.'
          }
        ],
        markdownContent: `## 3. Pretraining

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Blue Box (Center-Top)**

Pretraining is the stage where an AI model learns language and general knowledge from massive text datasets. The slide highlights **4 key subtopics**:

1. **Training Objectives**: The rule used to teach the model (for example, *"guess the next word"* or *"fill in the missing word"*).
2. **Tokenization Strategies**: How text is broken down into smaller pieces (**tokens**) and converted into numbers before entering the model.
3. **Training Strategies**: How engineers distribute the workload across multiple GPUs/machines to train huge models efficiently.
4. **Handling challenges**: Dealing with real-world hurdles like high hardware costs, memory limits, and keeping training stable.
`
      }
    ]
  },
  {
    id: 'fine-tuning',
    perspective: 'builder',
    title: 'Fine-Tuning',
    slideBoxName: 'Fine-Tuning',
    slideBoxColor: 'Purple (Top-Right Box)',
    colorName: 'Purple',
    colorBg: 'bg-purple-50 dark:bg-purple-950/40',
    colorBorder: 'border-purple-300 dark:border-purple-800',
    colorText: 'text-purple-900 dark:text-purple-200',
    colorAccent: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300',
    gridArea: 'finetune',
    filename: '04-fine-tuning.md',
    timestamp: '35:35',
    description: 'Adapting a pretrained model using the 5 methods on the slide: Task specific tuning, Instruction tuning, Continual Pretraining, RLHF, and PEFT.',
    subtopics: [
      'Task specific tuning',
      'Instruction tuning',
      'Continual Pretraining',
      'RLHF',
      'PEFT'
    ],
    sections: [
      {
        id: 'finetuning-five-pillars',
        pillarId: 'fine-tuning',
        title: 'Fine-Tuning: All 5 Methods From the Slide',
        slideBoxRef: "Slide 1 Box: Fine-Tuning (Purple) [35:35]",
        summary: 'Simple breakdown of Task specific tuning, Instruction tuning, Continual Pretraining, RLHF, and PEFT.',
        keyConcepts: ['Task specific tuning', 'Instruction tuning', 'Continual Pretraining', 'RLHF', 'PEFT'],
        crispSummary: {
          coreFormulaOrRule: 'Pretraining gives general knowledge; Fine-Tuning shapes that knowledge into a useful, well-behaved assistant.',
          bulletPoints: [
            'Task specific tuning: Training the model on examples of one specific job (like summarizing emails or classifying reviews).',
            'Instruction tuning: Teaching a base model how to follow human instructions and respond like a helpful chat assistant.',
            'Continual Pretraining: Feeding extra specialized text (like legal or medical books) into an existing model so it learns a new domain.',
            'RLHF (Reinforcement Learning from Human Feedback): Using human ratings to reward helpful, safe, and polite answers over bad ones.',
            'PEFT (Parameter-Efficient Fine-Tuning): Updating only a tiny part of the model instead of the whole model, making fine-tuning much cheaper and faster.'
          ],
          builderTakeaway: 'A raw pretrained model just completes text; Fine-Tuning (Instruction Tuning + RLHF) turns it into something people can actually chat with.'
        },
        interviewQuestions: [
          {
            question: 'What is the difference between Instruction Tuning and RLHF?',
            answer: 'Instruction Tuning teaches the model the format of following user commands using example Q&A pairs. RLHF goes a step further by using human preferences to make answers safer, more accurate, and aligned with what people prefer.'
          },
          {
            question: 'Why is PEFT so popular?',
            answer: 'Retraining all weights of a massive LLM is very expensive. PEFT freezes most of the model and only trains a small set of new parameters, saving huge amounts of GPU memory and time.'
          }
        ],
        markdownContent: `## 4. Fine-Tuning

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Purple Box (Top-Right)**

After pretraining, a model knows a lot of text, but doesn't yet know how to be a helpful assistant. The slide lists **5 key fine-tuning concepts**:

* **Task specific tuning**: Adjusting the model to excel at one narrow job (e.g., spam detection or sentiment tagging).
* **Instruction tuning**: Training the model on Question-and-Answer examples so it learns to follow instructions.
* **Continual Pretraining**: Continuing training on domain-specific documents (like healthcare or finance) to add new domain knowledge.
* **RLHF** *(Reinforcement Learning from Human Feedback)*: Using human feedback to teach the model which answers are helpful, honest, and safe.
* **PEFT** *(Parameter-Efficient Fine-Tuning)*: Smart techniques that fine-tune only a small fraction of the model so it runs on much smaller hardware.
`
      }
    ]
  },
  {
    id: 'optimization',
    perspective: 'builder',
    title: 'Optimization',
    slideBoxName: 'Optimization',
    slideBoxColor: 'Pink/Coral (Center-Bottom Box)',
    colorName: 'Coral',
    colorBg: 'bg-rose-50 dark:bg-rose-950/40',
    colorBorder: 'border-rose-300 dark:border-rose-800',
    colorText: 'text-rose-900 dark:text-rose-200',
    colorAccent: 'text-rose-600 dark:text-rose-400',
    badgeBg: 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300',
    gridArea: 'optim',
    filename: '05-optimization.md',
    timestamp: '35:35',
    description: 'Making AI models faster, smaller, and cheaper across the 3 areas on the slide: Training Optimization, Model compression, and Optimizing Inference.',
    subtopics: [
      'Training Optimization',
      'Model compression',
      'Optimizing Inference'
    ],
    sections: [
      {
        id: 'optimization-pillars',
        pillarId: 'optimization',
        title: 'Optimization: Training, Compression & Inference',
        slideBoxRef: "Slide 1 Box: Optimization (Pink/Coral) [35:35]",
        summary: 'Clear overview of the 3 optimization buckets directly from the slide.',
        keyConcepts: ['Training Optimization', 'Model compression', 'Optimizing Inference'],
        crispSummary: {
          coreFormulaOrRule: 'Optimization makes huge AI models practical—faster to train, smaller to store, and quicker to reply.',
          bulletPoints: [
            'Training Optimization: Techniques that reduce GPU memory usage and speed up the training loop.',
            'Model compression: Shrinking the model file size (for example, storing numbers with fewer decimals—called quantization—or trimming unused connections) without hurting accuracy too much.',
            'Optimizing Inference: Speeding up how fast the finished model generates responses when real users send prompts.'
          ],
          builderTakeaway: 'Without optimization, large models are too slow and expensive to run for everyday users.'
        },
        interviewQuestions: [
          {
            question: 'Why is Model Compression important?',
            answer: 'Large models can take hundreds of gigabytes of memory. Compression shrinks them down so they cost less to host and can even run on consumer laptops or phones.'
          }
        ],
        markdownContent: `## 5. Optimization

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Pink Box (Center-Bottom)**

Large models are heavy and expensive. The slide breaks optimization down into **3 stages**:

1. **Training Optimization**: Making model training run faster and fit inside available GPU memory.
2. **Model compression**: Reducing the size of a trained model so it takes less space and runs on cheaper hardware.
3. **Optimizing Inference**: Making the live model generate replies faster and handle many users at the same time.
`
      }
    ]
  },
  {
    id: 'evaluation',
    perspective: 'builder',
    title: 'Evaluation',
    slideBoxName: 'Evaluation',
    slideBoxColor: 'Cyan (Bottom-Right Left Box)',
    colorName: 'Cyan',
    colorBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    colorBorder: 'border-cyan-300 dark:border-cyan-800',
    colorText: 'text-cyan-900 dark:text-cyan-200',
    colorAccent: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300',
    gridArea: 'eval',
    filename: '06-evaluation.md',
    timestamp: '35:35',
    description: 'Testing and measuring how accurate, safe, and helpful a model really is before releasing it.',
    subtopics: [
      'Measuring Accuracy & Reasoning',
      'Standard Benchmarks & Human Testing',
      'Checking for Hallucinations & Safety'
    ],
    sections: [
      {
        id: 'evaluation-frameworks',
        pillarId: 'evaluation',
        title: 'Evaluation — Testing Model Quality',
        slideBoxRef: "Slide 1 Box: Evaluation (Cyan) [35:35]",
        summary: 'Why and how builders test models before deploying them to users.',
        keyConcepts: ['Benchmarks', 'Human Evaluation', 'Safety Checks'],
        crispSummary: {
          coreFormulaOrRule: 'You cannot improve a model unless you have a reliable way to measure how well it performs.',
          bulletPoints: [
            'Benchmarks: Standardized test sets (like math, coding, and general knowledge quizzes) used to compare models fairly.',
            'Real-World Testing: Testing how the model performs on the actual tasks your users care about, not just exam questions.',
            'Human & AI Judging: Having humans—or a stronger AI model—grade answers for helpfulness, tone, and factual accuracy.'
          ],
          builderTakeaway: 'Always evaluate your model on real examples from your use case before trusting it in production.'
        },
        interviewQuestions: [
          {
            question: 'Why isn’t checking a single quiz score enough to evaluate an LLM?',
            answer: 'A model can memorize popular exam questions and still fail on real-world user prompts, give wrong facts (hallucinations), or use the wrong tone.'
          }
        ],
        markdownContent: `## 6. Evaluation

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Cyan Box (Bottom-Right)**

### What Is It?
**Evaluation** is how builders measure whether a model actually works well—checking its reasoning, accuracy, coding skills, and safety before deployment.

### Key Ways to Evaluate
* **Standard Benchmarks**: Giving the model standardized tests (math, coding, reading comprehension) to compare it against other models.
* **Task-Specific Checks**: Measuring accuracy on your own business tasks.
* **Human Feedback**: Having people compare answers from two models and vote on which one is better.
`
      }
    ]
  },
  {
    id: 'deployment',
    perspective: 'builder',
    title: 'Deployment',
    slideBoxName: 'Deployment',
    slideBoxColor: 'Warm Grey (Bottom-Far-Right Box)',
    colorName: 'Stone',
    colorBg: 'bg-stone-50 dark:bg-stone-900/60',
    colorBorder: 'border-stone-300 dark:border-stone-700',
    colorText: 'text-stone-900 dark:text-stone-200',
    colorAccent: 'text-stone-600 dark:text-stone-400',
    badgeBg: 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300',
    gridArea: 'deploy',
    filename: '07-deployment.md',
    timestamp: '35:35',
    description: 'Hosting the finished model on servers or local devices so users and apps can access it reliably.',
    subtopics: [
      'Hosting Models via APIs',
      'Cloud vs Local/Edge Deployment',
      'Streaming Responses & Scaling'
    ],
    sections: [
      {
        id: 'deployment-architectures',
        pillarId: 'deployment',
        title: 'Deployment — Putting the Model Live',
        slideBoxRef: "Slide 1 Box: Deployment (Warm Grey) [35:35]",
        summary: 'Moving a trained and tested model into production so real applications can use it.',
        keyConcepts: ['Model Serving', 'APIs & Streaming', 'Scaling'],
        crispSummary: {
          coreFormulaOrRule: 'Deployment turns a trained model file into a fast, reliable service that apps can call anytime.',
          bulletPoints: [
            'Serving via API: Wrapping the model in a web endpoint so apps can send prompts and receive answers.',
            'Streaming Output: Sending words back one by one as they are generated so users don’t wait for a long blank screen.',
            'Cloud vs Local: Running heavy models on cloud GPU servers, or running smaller compressed models directly on user devices.'
          ],
          builderTakeaway: 'Deployment is the final step of the Builder view—handing over a working, fast model API for Application Users to build with.'
        },
        interviewQuestions: [
          {
            question: 'Why do most AI chat apps stream responses word-by-word instead of waiting until the full answer is ready?',
            answer: 'Generating a long answer can take several seconds. Streaming shows the first words right away, making the app feel much faster to the user.'
          }
        ],
        markdownContent: `## 7. Deployment

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Warm Grey Box (Bottom-Right)**

### What Is It?
**Deployment** is the final stage of the Builder's journey—taking a trained, optimized, and evaluated model and making it live so real users and software applications can use it.

### Core Ideas
* **API Endpoint**: Exposes the model so websites and mobile apps can send requests and get responses.
* **Cloud vs On-Device**: Choosing between powerful cloud GPUs (for large models) or local devices (for privacy and offline use).
* **Reliability & Scaling**: Making sure the server stays fast even when thousands of users send prompts at the same time.
`
      }
    ]
  },

  // ==========================================
  // SLIDE 2: THE USER'S PERSPECTIVE (41:37)
  // ==========================================
  {
    id: 'basic-llm-apps',
    perspective: 'user',
    title: 'Building Basic LLM Apps',
    slideBoxName: 'Building Basic LLM Apps',
    slideBoxColor: 'Green (Full Left Column)',
    colorName: 'Green',
    colorBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    colorBorder: 'border-emerald-300 dark:border-emerald-800',
    colorText: 'text-emerald-900 dark:text-emerald-200',
    colorAccent: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300',
    gridArea: 'basic-apps',
    filename: '08-building-basic-llm-apps.md',
    timestamp: '41:37',
    description: 'The 5 essentials from the slide for starting out: Open Source vs Closed Source LLMs, Using LLM APIs, LangChain, HuggingFace, and Ollama.',
    subtopics: [
      'Open Source vs Closed Source LLMs',
      'Using LLM APIs',
      'LangChain',
      'HuggingFace',
      'Ollama'
    ],
    sections: [
      {
        id: 'llm-apps-foundations',
        pillarId: 'basic-llm-apps',
        title: 'Building Basic LLM Apps: The 5 Core Building Blocks',
        slideBoxRef: "Slide 2 Box: Building Basic LLM Apps (Green) [41:37]",
        summary: 'Easy explanation of every single item listed in the Green box of the User’s Perspective slide.',
        keyConcepts: ['Open Source vs Closed Source LLMs', 'Using LLM APIs', 'LangChain', 'HuggingFace', 'Ollama'],
        crispSummary: {
          coreFormulaOrRule: 'As a User (app developer), you don’t build the LLM from scratch—you connect existing LLMs to your app using APIs and tools.',
          bulletPoints: [
            'Open Source vs Closed Source LLMs: Closed models (like GPT, Gemini, Claude) are owned by companies and accessed via paid APIs. Open-source models (like Llama, Mistral) let you download the model and run it yourself for full privacy and control.',
            'Using LLM APIs: Sending a prompt from your code to an AI service over the internet and receiving the generated answer back.',
            'LangChain: A popular developer framework that gives you ready-made building blocks to connect LLMs with prompts, files, and external tools.',
            'HuggingFace: The go-to community website ("GitHub for AI") where you can find, test, and download open-source models and datasets.',
            'Ollama: A simple tool that lets you download and run open-source LLMs right on your own laptop—no cloud or paid API needed.'
          ],
          builderTakeaway: 'Start by calling an LLM API or running a model locally with Ollama, then use LangChain when you want to wire multiple steps together.'
        },
        interviewQuestions: [
          {
            question: 'What is the simple difference between Closed Source and Open Source LLMs?',
            answer: 'Closed Source LLMs (like ChatGPT/Gemini) run on the provider’s servers and are super easy to call via API, while Open Source LLMs can be downloaded and hosted on your own hardware for privacy and full control.'
          },
          {
            question: 'Why do beginners use Ollama?',
            answer: 'Ollama makes running open-source models like Llama on a personal computer as easy as running a single terminal command, with zero complex setup.'
          }
        ],
        markdownContent: `## 8. Building Basic LLM Apps

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Green Box (Full Left Column)**

This box shows the **5 essential tools and choices** when you start building AI applications:

1. **Open Source vs Closed Source LLMs**
   * **Closed Source** *(GPT, Gemini, Claude)*: Easy to start, top quality, accessed via API, pay per use.
   * **Open Source** *(Llama, Mistral, Gemma)*: Free to download, keeps data private on your own servers/laptop.
2. **Using LLM APIs**
   * Your code sends a prompt + API key to a provider and gets a smart text response back in JSON.
3. **LangChain**
   * A developer framework that makes it much easier to connect prompts, LLMs, documents, and tools into one workflow.
4. **HuggingFace**
   * The central hub where developers share open-source models, datasets, and demos.
5. **Ollama**
   * A lightweight tool for running open-source LLMs locally on your own computer.
`
      },
      {
        id: 'langchain-what-is-langchain',
        pillarId: 'basic-llm-apps',
        title: 'LangChain: What is LangChain & Benefits',
        slideBoxRef: "User's Perspective → LangChain (What is LangChain & Benefits)",
        summary: 'Simple definition of LangChain, what you can build with it, 5 key highlights, and the 4 core benefits directly from the lecture slides.',
        keyConcepts: ['Open Source Framework', 'Chains', 'Model Agnostic Development', 'Complete Ecosystem', 'Memory & State'],
        slideImages: [
          {
            src: '/assets/aistudio/image_80990d47.png',
            caption: 'Lecture Slide: What is LangChain (29 January 2025, 08:35)',
            explanation: 'This slide defines LangChain as a free, open-source framework with modular components ("chains") and tool integrations that make it simple to build chatbots, Q&A systems, RAG, and AI agents using any major LLM.'
          },
          {
            src: '/assets/aistudio/image_d1ee6857.png',
            caption: 'Lecture Slide: Benefits of LangChain',
            explanation: 'This slide lists the 4 core reasons developers use LangChain: connecting steps through chains, writing model-agnostic code across LLMs, getting a complete ecosystem of tools, and handling chat memory and state.'
          }
        ],
        crispSummary: {
          coreFormulaOrRule: 'LangChain gives you chains, model-agnostic code, a complete ecosystem, and memory/state handling to build LLM apps fast.',
          bulletPoints: [
            'What It Is: An open-source framework with modular components and end-to-end tools to build chatbots, Q&A systems, RAG, and autonomous agents.',
            '5 Slide Highlights: (1) Supports all major LLMs, (2) Simplifies LLM apps via chains, (3) Integrations for major tools, (4) Open source / Free / Actively developed, (5) Supports all major GenAI use cases.',
            'Benefit 1 — Concept of Chains: Link multiple steps (like prompt → LLM → output parser) into one smooth pipeline.',
            'Benefit 2 — Model Agnostic Development: Switch between different LLMs (OpenAI, Gemini, Claude, Ollama) without rewriting your app.',
            'Benefit 3 — Complete Ecosystem: Ready-made integrations for document loaders, splitters, vector databases, and external tools.',
            'Benefit 4 — Memory and State Handling: Built-in support for remembering past chat messages and tracking conversation state.'
          ],
          builderTakeaway: 'Think of LangChain as LEGO blocks ("chains") that stay model-agnostic, remember conversation state, and plug into the whole AI ecosystem.'
        },
        interviewQuestions: [
          {
            question: 'What is LangChain in simple words?',
            answer: 'LangChain is a free, open-source framework that provides ready-made components and tools ("chains") to build LLM apps like chatbots, Q&A systems, RAG, and autonomous agents.'
          },
          {
            question: 'What are the 4 main benefits of using LangChain?',
            answer: '1. Concept of chains (connecting multi-step workflows), 2. Model Agnostic Development (easy to swap LLMs), 3. Complete ecosystem (loaders, vector DBs, tools), and 4. Memory and state handling (keeping chat history and workflow state).'
          }
        ],
        markdownContent: `## What is LangChain

> 📸 **Slide Reference**: User's Perspective → **LangChain** (*29 January 2025 · 08:35*)

### Definition (From Slide)
**LangChain** is an **open source framework** that helps in **building LLM based applications**. It provides **modular components** and **end-to-end tools** that help developers **build complex AI applications**, such as:
* **Chatbots**
* **Question-answering systems**
* **Retrieval-Augmented Generation (RAG)**
* **Autonomous agents**, and more

---

### 5 Key Highlights (From Slide)
1. **Supports all the major LLMs**
2. **Simplifies developing LLM based applications** → connects steps using **chains**
3. **Integrations available for all major tools**
4. **Open source / Free / Actively developed**
5. **Supports all major GenAI use cases**

---

### Benefits of LangChain (From Slide)
1. **Concept of chains**
   * Lets you connect multiple steps (e.g., *Prompt → LLM → Output*) into one clean pipeline instead of writing messy manual code.
2. **Model Agnostic Development**
   * Your app is not locked into one provider—you can switch between GPT, Gemini, Claude, or local Ollama models with minimal changes.
3. **Complete ecosystem**
   * Gives you built-in building blocks for document loaders, text splitters, vector databases, prompts, and APIs all in one place.
4. **Memory and state handling**
   * Easily remembers previous messages and keeps track of conversation state, which is essential for chatbots and multi-step agents.
`
      },
      {
        id: 'langchain-components',
        pillarId: 'basic-llm-apps',
        title: 'LangChain: 6 Components, LangServe & LangSmith',
        slideBoxRef: "User's Perspective → LangChain (Components, Models, Indexes, Memory, Agents)",
        summary: 'All 6 LangChain components (Models, Prompts, Chains, Memory, Indexes, Agents), plus LangGraph, LangServe, and LangSmith explained simply.',
        keyConcepts: ['Models', 'Prompts', 'Chains', 'Memory', 'Indexes', 'Agents', 'LangGraph', 'LangServe', 'LangSmith'],
        slideImages: [
          {
            src: '/assets/aistudio/image_7670e8c1.png',
            caption: 'Lecture Slide: The 6 Core Components of LangChain',
            explanation: 'This diagram shows the 6 main building blocks inside LangChain: 1. Models, 2. Prompts, 3. Chains, 4. Memory, 5. Indexes, and 6. Agents.'
          },
          {
            src: '/assets/aistudio/image_1848e14a.png',
            caption: 'Lecture Slide: Models — Same Code Across OpenAI & Claude',
            explanation: 'This slide compares calling OpenAI (ChatOpenAI) vs Claude (ChatAnthropic) in LangChain—both use the exact same model.invoke(...) and result.content syntax.'
          },
          {
            src: '/assets/aistudio/image_55fcb036.png',
            caption: 'Lecture Slide: 2 Types of Models in LangChain',
            explanation: 'This slide splits Models into Language Models (text in → text out via LLMs) and Embedding Models (text in → vector out for semantic search).'
          },
          {
            src: '/assets/aistudio/image_4040dbeb.png',
            caption: 'Lecture Slide: 4 Types of Memory in LangChain',
            explanation: 'This slide shows the 4 ways LangChain stores chat history: ConversationBufferMemory (full recent transcript), ConversationBufferWindowMemory (last N chats), Summarizer-Based Memory (condensed summaries), and Custom Memory (user preferences/facts).'
          },
          {
            src: '/assets/aistudio/image_58584204.png',
            caption: 'Lecture Slide: Indexes (23 January 2025 · 10:31)',
            explanation: 'This slide shows how Indexes connect an LLM to external knowledge (like company leave policy or notice period PDFs) using a Doc Loader, Text Splitter, Vector Store, and Retrievers.'
          }
        ],
        crispSummary: {
          coreFormulaOrRule: 'LangChain gives you 6 core building blocks (Models, Prompts, Chains, Memory, Indexes, Agents), plus LangServe for API deployment and LangSmith for debugging & monitoring.',
          bulletPoints: [
            '1. Models — The core interface through which you interact with AI models (OpenAI, Claude, etc.). Divided into 2 types: Language Models (text → text) and Embedding Models (text → vector for semantic search).',
            '2. Prompts — Reusable prompt templates with placeholders so you can send clean, dynamic instructions to any model.',
            '3. Chains — Links multiple steps together into a single pipeline (e.g., Prompt → LLM → Output Parser) so the output of one step automatically becomes the input of the next.',
            '4. Memory — Stores previous chat history for chatbots using 4 types: ConversationBufferMemory, ConversationBufferWindowMemory, Summarizer-Based Memory, and Custom Memory.',
            '5. Indexes — Connects your app to external knowledge (PDFs, websites, databases) using Doc Loader, Text Splitter, Vector Store, and Retrievers.',
            '6. Agents — LLM + Code: can use external tools (Google, Python REPL), break complex tasks into simple steps, self-reflect before answering, collaborate or debate with other agents, and be built with LangGraph.',
            'LangServe & LangSmith — Two extra tools by LangChain: LangServe turns your chains into live REST APIs, and LangSmith lets you trace, debug, test, and monitor your LLM app.'
          ],
          builderTakeaway: 'Start with Models + Prompts + Chains; add Memory for chatbots, Indexes for your private data, Agents (or LangGraph) for reasoning & tools, and ship confidently with LangServe + LangSmith.'
        },
        interviewQuestions: [
          {
            question: 'What are the 2 types of Models in LangChain and how are they different?',
            answer: 'Language Models (LLMs) take text in and return text out (for chatting, summarizing, Q&A). Embedding Models take text in and return a number vector out (used for semantic search and similarity matching).'
          },
          {
            question: 'Why do we need Memory in a LangChain chatbot?',
            answer: 'Standard LLM calls do not remember previous messages. Memory saves the previous chat history and passes it along with the new question so the LLM can hold a continuous conversation.'
          },
          {
            question: 'What is the difference between LangServe and LangSmith?',
            answer: 'LangServe helps you deploy LangChain chains as REST APIs for your app or frontend, while LangSmith is used during development and production to trace, debug, evaluate, and monitor LLM responses and costs.'
          }
        ],
        markdownContent: `## Components of LangChain

![Lecture Slide: The 6 Core Components of LangChain](/assets/aistudio/image_7670e8c1.png)
*About this slide:* This diagram maps the 6 core building blocks of LangChain—**1. Models, 2. Prompts, 3. Chains, 4. Memory, 5. Indexes, and 6. Agents**—all organized around the LangChain framework.

---

### 1. Models
**Models** are the **core interface through which you interact with AI models**. Instead of learning a completely different SDK for every AI company, LangChain gives you one standard way to call them.

![Lecture Slide: Models — Same Code Across OpenAI & Claude](/assets/aistudio/image_1848e14a.png)
*About this slide:* Notice how switching from **OpenAI** (\`ChatOpenAI\`) to **Claude** (\`ChatAnthropic\`) keeps almost the exact same code—\`model.invoke(...)\` and \`result.content\` do not change.

![Lecture Slide: 2 Types of Models in LangChain](/assets/aistudio/image_55fcb036.png)
*About this slide:* Under LangChain, Models are split into **2 types**: **Language Models (LLMs)** that turn *text → text*, and **Embedding Models** that turn *text → vector* for semantic search.

* **Language Models (LLMs)**: Input is **text** → Output is **text** (used for chatbots, writing, summarizing, Q&A).
* **Embedding Models**: Input is **text** → Output is a **vector** (used for **semantic search** and finding similar documents).

---

### 2. Prompts
Prompts are the instructions you send to a Model. LangChain provides reusable **Prompt Templates** with variables (like \`{topic}\` or \`{language}\`) so you can fill in user inputs cleanly without rewriting prompts manually.

---

### 3. Chains
A **Chain** connects multiple LangChain components together in sequence so the output of one step automatically flows into the next step.
* **Example**: \`Prompt Template → Language Model → Output Parser\`
* **Why It Helps**: Instead of writing separate glue code for every step, you build one clean pipeline and run it with a single \`.invoke()\` call (and you can also connect sequential, parallel, or conditional branches).

---

### 4. Memory
We need **Memory** when we want to **design a Chatbot**.
* Normally, every time you call an LLM API, it treats your message as brand new and **forgets everything you said earlier**.
* If we want an LLM to behave like a real Chatbot, it needs to know the **previous chat history**—and that is exactly what **Memory** stores and passes back to the model.

![Lecture Slide: 4 Types of Memory in LangChain](/assets/aistudio/image_4040dbeb.png)
*About this slide:* This slide shows the 4 ways LangChain stores conversation history depending on chat length and token budget—**ConversationBufferMemory**, **ConversationBufferWindowMemory**, **Summarizer-Based Memory**, and **Custom Memory**.

* **ConversationBufferMemory**: Stores a transcript of recent messages. Great for short chats, but can grow large quickly.
* **ConversationBufferWindowMemory**: Only keeps the last **N** interactions to avoid excessive token usage.
* **Summarizer-Based Memory**: Periodically summarizes older chat segments to keep a condensed memory footprint.
* **Custom Memory**: For advanced use cases, lets you store specialized state (e.g., the user's preferences or key facts about them) in a custom memory class.

---

### 5. Indexes
**Indexes** connect your application to **external knowledge**—such as PDFs, websites, or databases (for example, your company's internal leave policy or notice period rules that ChatGPT doesn't know).

![Lecture Slide: Indexes (23 January 2025 · 10:31)](/assets/aistudio/image_58584204.png)
*About this slide:* This diagram shows why an LLM needs external knowledge (like XYZ company's leave policy and notice period) and lists the 4 parts of Indexes: **Doc Loader, Text Splitter, Vector Store, and Retrievers**.

The 4 building blocks inside Indexes:
1. **Doc Loader**: Reads files from PDFs, AWS S3, websites, or databases.
2. **Text Splitter**: Breaks big documents into smaller chunks/pages.
3. **Vector Store**: Saves the vector embeddings in a searchable database.
4. **Retrievers**: Searches the vector store and fetches the most relevant chunks for the LLM.

---

### 6. Agents
**AI Agents** are a **combination of LLM and code**. Unlike a basic chatbot that only replies with text, an Agent can think, act, and use tools:
* **External Tools**: Can access external apps like **Google Search**, **Python REPL** (running code), calculators, or APIs.
* **Task Breakdown & Reasoning**: Can reason through a goal and divide complex tasks into smaller, simpler steps.
* **Self-Reflection**: Can review and double-check its own answer before replying to the user.
* **Collaboration & Debate**: Multiple agents can collaborate on a series of tasks—and even debate with each other to reach a better answer.
* **LangGraph**: LangChain supports building advanced, stateful AI Agents and multi-agent workflows using **LangGraph** (where steps, loops, and decisions are modeled as a graph).

---

### Beyond the 6 Components: LangServe & LangSmith
Apart from the 6 core components above, LangChain also built **2 important platform tools**:

1. **LangServe**
   * Helps you **deploy** your LangChain chains/apps as **ready-to-use REST APIs** (built on FastAPI).
   * Automatically gives your chain endpoints like \`/invoke\` and \`/stream\` plus a built-in web playground so frontends or other apps can call your AI easily.
2. **LangSmith**
   * A **debugging, testing, and monitoring** platform for LLM apps.
   * Lets you trace every single step inside a chain or agent, inspect the exact prompts/responses, track token costs and latency, and test whether your app's answers stay accurate.
`
      },
      {
        id: 'how-semantic-search-works',
        pillarId: 'basic-llm-apps',
        title: 'How Semantic Search Works',
        slideBoxRef: "User's Perspective → LangChain (Slide 2: Semantic Search Workflow)",
        summary: 'Step-by-step walkthrough of how a PDF is split, converted to embeddings, searched semantically, and sent to the Brain (LLM) for the final output.',
        keyConcepts: ['Doc Loader', 'Text Splitter', 'Embeddings', 'Database', 'Semantic Search', 'System Query', 'Brain'],
        slideImages: [
          {
            src: '/assets/aistudio/image_640c5767.png',
            caption: 'Lecture Diagram: How Semantic Search Works (PDF → Embeddings → Database → Semantic Search → Brain)',
            explanation: 'This diagram shows two connected flows: the top flow uploads a PDF to AWS S3, splits it into pages (Page 1 to 1000), converts each page into Embeddings, and stores them in a Database; the bottom flow turns a User Query into an Embedding, runs Semantic Search to pull relevant pages, combines Pages + User Query into a System Query, and sends it to the Brain (LLM) for the Final Output.'
          }
        ],
        crispSummary: {
          coreFormulaOrRule: 'Split PDF into pages → convert pages into Embeddings in a Database → match User Query by meaning (Semantic Search) → send matching Pages + User Query to Brain (LLM).',
          bulletPoints: [
            '1. Upload & Load PDF: Upload your PDF to AWS S3, then read it into your app using a Doc Loader.',
            '2. Text Splitter: Break the large PDF (e.g., 1,000 pages) into smaller pieces: Page 1, Page 2, Page 3 ... Page 1000.',
            '3. Convert Pages to Embeddings: Turn every page into an Embedding (Embedding 1, Embedding 2 ... Embedding 1K)—a number form that captures meaning—and save them in a Database.',
            '4. User Query → Embedding: When a user asks a question, convert the User Query into an Embedding too.',
            '5. Semantic Search: Search the Database using the query Embedding to find the pages with the closest meaning.',
            '6. System Query → Brain → Final Output: Combine the matching Pages + User Query into a System Query, send it to the Brain (LLM), and get the Final Output.'
          ],
          builderTakeaway: 'Semantic search finds answers by meaning—not just exact word matches—and sends only the relevant pages to the LLM so it gives an accurate final answer.'
        },
        interviewQuestions: [
          {
            question: 'Why do we split a PDF into pages and create Embeddings instead of sending the whole 1,000-page PDF to the Brain (LLM)?',
            answer: 'A 1,000-page PDF is too large and slow to send every time. Splitting it into pages and storing their Embeddings lets Semantic Search quickly pull only the few matching pages for the System Query.'
          },
          {
            question: 'What goes inside the System Query sent to the Brain?',
            answer: 'The System Query combines two things: the relevant Pages retrieved from the Database via Semantic Search + the original User Query.'
          }
        ],
        markdownContent: `## How Semantic Search Works

> 📸 **Slide Reference**: User's Perspective → **LangChain** (*Semantic Search Flow Diagram*)

### Part 1: Storing Your PDF (Top Flow in Diagram)
1. **PDF → AWS S3**: Upload your PDF file to cloud storage (**AWS S3**).
2. **Doc Loader**: Loads the **PDF** from AWS S3 into your application.
3. **Text Splitter**: Splits the large PDF into smaller pages (**Page 1, Page 2, Page 3 ... Page 1000**).
4. **Embeddings**: Each page is turned into an **Embedding** (**Embedding 1, Embedding 2, Embedding 3 ... Embedding 1K**) so its meaning can be compared mathematically.
5. **Database**: All embeddings are stored inside a **Database**.

---

### Part 2: Answering a Question (Bottom Flow in Diagram)
1. **User Query → Embedding**: The user's question is converted into an **Embedding**.
2. **Semantic Search**: Compares the query Embedding against the **Database** to find the most relevant **Pages** by meaning.
3. **System Query**: Bundles the retrieved **Pages + User Query** together into a **System Query**.
4. **Brain → Final Output**: The **Brain** (the LLM) reads the System Query and produces the **Final Output**.
`
      }
    ]
  },
  {
    id: 'prompt-engineering',
    perspective: 'user',
    title: 'Prompt Engineering',
    slideBoxName: 'Prompt Engineering',
    slideBoxColor: 'Blue (Center-Top Box)',
    colorName: 'Blue',
    colorBg: 'bg-sky-50 dark:bg-sky-950/40',
    colorBorder: 'border-sky-300 dark:border-sky-800',
    colorText: 'text-sky-900 dark:text-sky-200',
    colorAccent: 'text-sky-600 dark:text-sky-400',
    badgeBg: 'bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300',
    gridArea: 'prompt-eng',
    filename: '09-prompt-engineering.md',
    timestamp: '41:37',
    description: 'Writing clear instructions and examples so the LLM gives accurate, reliable outputs without changing the model.',
    subtopics: [
      'Clear Instructions & Roles',
      'Giving Examples (Few-Shot Prompting)',
      'Step-by-Step Thinking & Output Format'
    ],
    sections: [
      {
        id: 'prompt-engineering-techniques',
        pillarId: 'prompt-engineering',
        title: 'Prompt Engineering — Asking the Right Way',
        slideBoxRef: "Slide 2 Box: Prompt Engineering (Blue) [41:37]",
        summary: 'How to guide an LLM to give better answers purely through how you write your prompt.',
        keyConcepts: ['Instructions', 'Examples (Few-Shot)', 'Step-by-Step Reasoning', 'Output Format'],
        crispSummary: {
          coreFormulaOrRule: 'Better input prompt = better output answer, with zero training or extra cost.',
          bulletPoints: [
            'Be Specific: Tell the model its role, the exact task, and who the answer is for.',
            'Show Examples (Few-Shot): Giving 2 or 3 sample input-output pairs helps the model match your exact style or format.',
            'Ask It to Think Step-by-Step: Asking the model to explain its steps before giving the final answer reduces mistakes on logic and math problems.',
            'Specify Output Format: Tell the model if you want bullet points, a table, or JSON so your app can read it easily.'
          ],
          builderTakeaway: 'Always try improving your prompt first—it is the fastest and cheapest way to fix bad LLM answers.'
        },
        interviewQuestions: [
          {
            question: 'What is Prompt Engineering in simple terms?',
            answer: 'It is the skill of designing clear inputs (instructions, context, and examples) so an LLM gives the exact quality and format of answer you need without modifying the model.'
          }
        ],
        markdownContent: `## 9. Prompt Engineering

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Blue Box (Center-Top)**

### What Is It?
**Prompt Engineering** is how you talk to an LLM to get reliable, high-quality results—without touching the model's internal code or weights.

### Simple Techniques That Work
* **Clear Role & Context**: *"You are a helpful Python tutor. Explain this simply..."*
* **Give Examples**: Show 2–3 examples of what a good output looks like before asking your real question.
* **Step-by-Step Reasoning**: Ask the model to *"think step by step"* for harder problems.
* **Define the Format**: Ask explicitly for bullet points, a markdown table, or JSON.
`
      }
    ]
  },
  {
    id: 'rag',
    perspective: 'user',
    title: 'RAG',
    slideBoxName: 'RAG',
    slideBoxColor: 'Yellow (Center-Middle Box)',
    colorName: 'Yellow',
    colorBg: 'bg-amber-50 dark:bg-amber-950/40',
    colorBorder: 'border-amber-300 dark:border-amber-800',
    colorText: 'text-amber-900 dark:text-amber-200',
    colorAccent: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300',
    gridArea: 'rag',
    filename: '10-rag-retrieval-augmented-generation.md',
    timestamp: '41:37',
    description: 'Retrieval-Augmented Generation: letting an LLM search your own documents or data before answering.',
    subtopics: [
      'Why LLMs Need Your Data (No Hallucinations)',
      'How RAG Works in 3 Simple Steps',
      'Chatting With PDFs, Docs & Databases'
    ],
    sections: [
      {
        id: 'rag-architecture',
        pillarId: 'rag',
        title: 'RAG — Giving LLMs Access to Your Data',
        slideBoxRef: "Slide 2 Box: RAG (Yellow) [41:37]",
        summary: 'A crystal-clear explanation of what RAG is and why almost every company uses it.',
        keyConcepts: ['Retrieval', 'Private Documents', 'Reducing Hallucinations'],
        crispSummary: {
          coreFormulaOrRule: 'RAG = Search your documents first, then hand the relevant paragraphs to the LLM to write the answer.',
          bulletPoints: [
            'The Problem: An LLM only knows what it learned during training—it doesn’t know your private files, company docs, or today’s news.',
            'Step 1 (Prepare & Store): Split your PDFs/docs into smaller chunks and save them in a searchable database.',
            'Step 2 (Retrieve): When a user asks a question, search the database to find the most relevant chunks.',
            'Step 3 (Generate): Send those relevant chunks + the user’s question to the LLM so it answers using real facts instead of guessing.'
          ],
          builderTakeaway: 'Think of RAG like an open-book exam for the LLM—instead of memorizing everything, it looks up the right page first.'
        },
        interviewQuestions: [
          {
            question: 'What problem does RAG solve?',
            answer: 'LLMs don’t know your private or up-to-date data and sometimes make things up (hallucinate). RAG feeds real, up-to-date source text into the prompt so the model gives grounded answers.'
          }
        ],
        markdownContent: `## 10. RAG (Retrieval-Augmented Generation)

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Yellow Box (Center-Middle)**

### What Is RAG?
Normally, an LLM only knows public information from when it was trained. **RAG** lets an LLM answer questions using **your own documents** (PDFs, notes, company wikis, databases).

### How It Works (Like an Open-Book Exam)
1. **Store**: Break your documents into smaller sections and store them so they can be searched by meaning.
2. **Retrieve**: When a user asks a question, find the top matching sections from your documents.
3. **Generate**: Give those matching sections to the LLM and say: *"Using this information, answer the user's question."*

### Why It's So Popular
* **Up-to-date**: Just add new files—no need to retrain the model.
* **Accurate**: Greatly reduces guessing (hallucinations) because the model has the source right in front of it.
`
      }
    ]
  },
  {
    id: 'fine-tuning-user',
    perspective: 'user',
    title: 'Fine Tuning',
    slideBoxName: 'Fine Tuning',
    slideBoxColor: 'Pink/Coral (Center-Bottom Box)',
    colorName: 'Coral',
    colorBg: 'bg-rose-50 dark:bg-rose-950/40',
    colorBorder: 'border-rose-300 dark:border-rose-800',
    colorText: 'text-rose-900 dark:text-rose-200',
    colorAccent: 'text-rose-600 dark:text-rose-400',
    badgeBg: 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300',
    gridArea: 'ft-user',
    filename: '11-fine-tuning-user-perspective.md',
    timestamp: '41:37',
    description: 'Customizing an existing model on your own examples when prompting and RAG aren’t enough.',
    subtopics: [
      'Teaching Style, Tone & Behavior',
      'Prompting vs RAG vs Fine Tuning',
      'Using Your Own Example Dataset'
    ],
    sections: [
      {
        id: 'user-finetuning-guide',
        pillarId: 'fine-tuning-user',
        title: 'Fine Tuning (User Perspective) — When & Why to Customize',
        slideBoxRef: "Slide 2 Box: Fine Tuning (Pink/Coral) [41:37]",
        summary: 'How application builders use Fine Tuning, and when to choose it over Prompt Engineering or RAG.',
        keyConcepts: ['Custom Behavior', 'RAG vs Fine Tuning', 'Example Data'],
        crispSummary: {
          coreFormulaOrRule: 'Use RAG to give the model new facts; use Fine Tuning to teach the model a new style, tone, or skill.',
          bulletPoints: [
            'What It Means for Users: Taking an existing open-source or API model and training it a little more on your own sample questions and ideal answers.',
            'When to Use It: Best when you want the model to always reply in a very specific tone, structure, or specialized domain language.',
            'Not Always First Choice: Because fine-tuning takes data preparation and compute, most developers try Prompt Engineering first, then RAG, and only Fine-Tune if still needed.'
          ],
          builderTakeaway: 'Start simple: Prompt Engineering → RAG → Fine Tuning.'
        },
        interviewQuestions: [
          {
            question: 'When should a developer choose RAG instead of Fine Tuning?',
            answer: 'Choose RAG when the model needs access to changing facts or private documents. Choose Fine Tuning when you want to change how the model behaves, writes, or formats its answers.'
          }
        ],
        markdownContent: `## 11. Fine Tuning (User Perspective)

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Pink Box (Center-Bottom)**

### What Is It?
As a User (app developer), **Fine Tuning** means taking a ready-made model and teaching it with your own examples so it consistently responds the way your product needs.

### Simple Rule of Thumb: RAG vs Fine Tuning
| If you want the AI to... | Use... |
| :--- | :--- |
| Know **new or private facts** (like company PDFs) | **RAG** |
| Follow a **specific writing style, tone, or strict format** | **Fine Tuning** |
| Handle simple tasks with good instructions | **Prompt Engineering** |
`
      }
    ]
  },
  {
    id: 'agents',
    perspective: 'user',
    title: 'Agents',
    slideBoxName: 'Agents',
    slideBoxColor: 'Purple (Top-Right Large Box)',
    colorName: 'Purple',
    colorBg: 'bg-purple-50 dark:bg-purple-950/40',
    colorBorder: 'border-purple-300 dark:border-purple-800',
    colorText: 'text-purple-900 dark:text-purple-200',
    colorAccent: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300',
    gridArea: 'agents',
    filename: '12-autonomous-agents.md',
    timestamp: '41:37',
    description: 'AI systems that don’t just talk—they can plan steps, use tools (search, APIs, code), and take actions to finish a goal.',
    subtopics: [
      'Chatbot vs AI Agent',
      'Using Tools (Search, Calculators, APIs)',
      'Planning & Multi-Step Tasks'
    ],
    sections: [
      {
        id: 'agents-architecture',
        pillarId: 'agents',
        title: 'Agents — AI That Can Plan & Take Action',
        slideBoxRef: "Slide 2 Box: Agents (Purple) [41:37]",
        summary: 'Easy explanation of what AI Agents are and how they differ from basic chatbots.',
        keyConcepts: ['Planning', 'Tool Use', 'Autonomous Loop'],
        crispSummary: {
          coreFormulaOrRule: 'Chatbot = answers questions | Agent = plans steps, uses tools, checks results, and finishes tasks.',
          bulletPoints: [
            'More Than Text: A regular LLM only outputs text. An Agent has access to tools (like web search, a calculator, email, or a database) and decides when to use them.',
            'Step-by-Step Loop: The Agent thinks about the goal, picks a tool, sees the tool’s result, and repeats until the task is complete.',
            'Memory: Agents can remember past steps and user preferences across a multi-step task.'
          ],
          builderTakeaway: 'Notice how large the Agents box is on the slide—Agents are one of the biggest areas in modern GenAI app development.'
        },
        interviewQuestions: [
          {
            question: 'What turns a regular LLM chatbot into an AI Agent?',
            answer: 'Giving the LLM the ability to reason through a plan, call external tools (like APIs, search, or code), observe the result, and decide the next step on its own.'
          }
        ],
        markdownContent: `## 12. Agents

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Purple Box (Top-Right)**

### What Is an AI Agent?
A standard chatbot answers one prompt at a time. An **AI Agent** is given a goal and can figure out the steps needed to complete it—using external tools along the way.

### How an Agent Works
1. **Think**: Understands the user's goal and breaks it into steps.
2. **Act (Use Tools)**: Calls a tool—such as searching the web, querying a database, or running Python code.
3. **Observe**: Reads the result from that tool and decides if more steps are needed before giving the final answer.
`
      }
    ]
  },
  {
    id: 'llmops',
    perspective: 'user',
    title: 'LLMOps',
    slideBoxName: 'LLMOps',
    slideBoxColor: 'Cyan (Bottom-Right Left Box)',
    colorName: 'Cyan',
    colorBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    colorBorder: 'border-cyan-300 dark:border-cyan-800',
    colorText: 'text-cyan-900 dark:text-cyan-200',
    colorAccent: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300',
    gridArea: 'llmops',
    filename: '13-llmops-observability.md',
    timestamp: '41:37',
    description: 'Managing and monitoring your LLM app once real users are using it—tracking cost, speed, prompts, and answer quality.',
    subtopics: [
      'Monitoring Logs & Prompts',
      'Tracking Cost & Response Speed',
      'Updating & Testing Prompts Safely'
    ],
    sections: [
      {
        id: 'llmops-practices',
        pillarId: 'llmops',
        title: 'LLMOps — Running LLM Apps Smoothly in Production',
        slideBoxRef: "Slide 2 Box: LLMOps (Cyan) [41:37]",
        summary: 'Simple explanation of what LLMOps means and why real-world apps need it.',
        keyConcepts: ['Monitoring', 'Cost & Speed', 'Prompt Versioning'],
        crispSummary: {
          coreFormulaOrRule: 'Just like DevOps keeps normal software healthy, LLMOps keeps AI apps accurate, fast, and within budget.',
          bulletPoints: [
            'Tracking & Logs: Seeing the exact prompts sent by users, what the LLM answered, and where errors happened.',
            'Cost & Speed Control: Watching how many tokens you spend and making sure replies don’t become too slow.',
            'Prompt Management: Testing changes to your prompts carefully before pushing them to all live users.'
          ],
          builderTakeaway: 'Building a demo takes an afternoon; LLMOps is what keeps the app reliable when thousands of people use it.'
        },
        interviewQuestions: [
          {
            question: 'Why do we need LLMOps if we already have normal DevOps?',
            answer: 'Unlike normal code that returns the same output every time, LLMs can be unpredictable, cost money per token, and vary in quality. LLMOps helps track prompt outputs, quality, and API costs.'
          }
        ],
        markdownContent: `## 13. LLMOps

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Cyan Box (Bottom-Right)**

### What Is LLMOps?
**LLMOps** (Large Language Model Operations) covers all the practices and tools used to keep an AI app running smoothly after you launch it to real users.

### What It Helps You Do
* **Monitor & Debug**: Log every prompt and response so you can see why a wrong answer happened.
* **Watch Costs & Latency**: Track API spending and how fast users get their answers.
* **Measure Quality**: Keep checking that answers stay accurate as you update prompts or switch models.
`
      }
    ]
  },
  {
    id: 'miscellaneous',
    perspective: 'user',
    title: 'Miscellaneous',
    slideBoxName: 'Miscellaneous',
    slideBoxColor: 'Warm Grey (Bottom-Far-Right Box)',
    colorName: 'Stone',
    colorBg: 'bg-stone-50 dark:bg-stone-900/60',
    colorBorder: 'border-stone-300 dark:border-stone-700',
    colorText: 'text-stone-900 dark:text-stone-200',
    colorAccent: 'text-stone-600 dark:text-stone-400',
    badgeBg: 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300',
    gridArea: 'misc',
    filename: '14-miscellaneous-guardrails-multimodal.md',
    timestamp: '41:37',
    description: 'Extra real-world topics every AI app builder runs into: safety guardrails, working with images/audio (multimodal), and data privacy.',
    subtopics: [
      'Safety Guardrails & Filtering',
      'Multimodal AI (Images, Audio, Video)',
      'Data Privacy & Model Licenses'
    ],
    sections: [
      {
        id: 'misc-topics',
        pillarId: 'miscellaneous',
        title: 'Miscellaneous — Safety, Multimodal & Best Practices',
        slideBoxRef: "Slide 2 Box: Miscellaneous (Warm Grey) [41:37]",
        summary: 'Important extra topics beyond core prompting, RAG, and agents.',
        keyConcepts: ['Guardrails', 'Multimodal', 'Privacy & Licensing'],
        crispSummary: {
          coreFormulaOrRule: 'Great AI apps don’t just work well—they also stay safe, respect privacy, and go beyond plain text.',
          bulletPoints: [
            'Safety Guardrails: Checking user inputs and AI outputs so the app doesn’t share harmful content or leak sensitive information.',
            'Multimodal Features: Working with more than just text—understanding uploaded images, voice audio, or video.',
            'Privacy & Licensing: Knowing what data you are allowed to send to external APIs and checking model licenses before commercial launch.'
          ],
          builderTakeaway: 'Keep this section as your catch-all space for security, multimodal, and extra tips from later lectures.'
        },
        interviewQuestions: [
          {
            question: 'What are Guardrails in an LLM app?',
            answer: 'Safety checks placed before and after the LLM call to block unsafe prompts, prevent off-topic answers, or hide sensitive user details.'
          }
        ],
        markdownContent: `## 14. Miscellaneous

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Warm Grey Box (Bottom-Right)**

### Extra Topics to Keep on Your Radar
* **Guardrails**: Filters that keep AI conversations safe, polite, and on-topic.
* **Multimodal AI**: Using models that can read images, listen to audio, or generate visuals alongside text.
* **Privacy & Licensing**: Making sure user data is handled safely and open-source model rules are respected.
`
      }
    ]
  }
];

export const REPO_METADATA = {
  repoName: 'genai-builders-hub',
  description: 'Simple, slide-anchored Digital Notes for Generative AI covering both The Builder\'s Perspective (35:35) and The User\'s Perspective (41:37)',
  author: 'karandeo913',
  lectureTitle: "Generative AI: The Builder's Perspective & The User's Perspective",
  instructor: 'Nitish Singh (CampusX)',
  slide1ImagePath: '/assets/aistudio/image_29aad15b.png',
  slide2ImagePath: '/assets/aistudio/image_4c380213.png',
  totalChapters: 14,
};

export function generateFullReadme(): string {
  return `# 🧠 Generative AI: Study Notes (Builder & User Perspectives)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Curriculum](https://img.shields.io/badge/Curriculum-14%20Modules-brightgreen.svg)](#curriculum-overview)

> Clean, easy-to-understand study notes directly following the two roadmap slides from **Nitish Singh (CampusX)**:
> 1. **Part 1: The Builder's Perspective** (Timestamp \`35:35 / 50:14\`)
> 2. **Part 2: The User's Perspective** (Timestamp \`41:37 / 50:14\`)

---

## 🗺️ Slide 1: The Builder's Perspective (Timestamp 35:35)

\`\`\`
┌─────────────────────────────────┬─────────────────────────────────┬─────────────────────────────────┐
│ 1. Transformer Architecture     │ 3. Pretraining                  │ 4. Fine-Tuning                  │
│                                 │  • Training Objectives          │  • Task specific tuning         │
│                                 │  • Tokenization Strategies      │  • Instruction tuning           │
│                                 │  • Training Strategies          │  • Continual Pretraining        │
├─────────────────────────────────┤  • Handling challenges          │  • RLHF                         │
│ 2. Types of Transformers        ├─────────────────────────────────┤  • PEFT                         │
│  • Encoder Only (BERT)          │ 5. Optimization                 ├────────────────┬────────────────┤
│  • Decoder Only (GPT)           │  • Training Optimization        │ 6. Evaluation  │ 7. Deployment  │
│  • Encoder & Decoder based (T5) │  • Model compression            │                │                │
│                                 │  • Optimizing Inference         │                │                │
└─────────────────────────────────┴─────────────────────────────────┴────────────────┴────────────────┘
\`\`\`

---

## 🗺️ Slide 2: The User's Perspective (Timestamp 41:37)

\`\`\`
┌─────────────────────────────────┬─────────────────────────────────┬─────────────────────────────────┐
│ 8. Building Basic LLM Apps      │ 9. Prompt Engineering           │ 12. Agents                      │
│  • Open Source vs Closed Source │                                 │                                 │
│    LLMs                         ├─────────────────────────────────┤                                 │
│  • Using LLM APIs               │ 10. RAG                         │                                 │
│  • LangChain                    │                                 ├────────────────┬────────────────┤
│  • HuggingFace                  ├─────────────────────────────────┤ 13. LLMOps     │ 14. Misc       │
│  • Ollama                       │ 11. Fine Tuning                 │                │                │
└─────────────────────────────────┴─────────────────────────────────┴────────────────┴────────────────┘
\`\`\`

---

## 📚 Notes Index

### Part 1: The Builder's Perspective
* [\`01-transformer-architecture.md\`](./01-transformer-architecture.md)
* [\`02-types-of-transformers.md\`](./02-types-of-transformers.md)
* [\`03-pretraining.md\`](./03-pretraining.md)
* [\`04-fine-tuning.md\`](./04-fine-tuning.md)
* [\`05-optimization.md\`](./05-optimization.md)
* [\`06-evaluation.md\`](./06-evaluation.md)
* [\`07-deployment.md\`](./07-deployment.md)

### Part 2: The User's Perspective
* [\`08-building-basic-llm-apps.md\`](./08-building-basic-llm-apps.md)
* [\`09-prompt-engineering.md\`](./09-prompt-engineering.md)
* [\`10-rag-retrieval-augmented-generation.md\`](./10-rag-retrieval-augmented-generation.md)
* [\`11-fine-tuning-user-perspective.md\`](./11-fine-tuning-user-perspective.md)
* [\`12-autonomous-agents.md\`](./12-autonomous-agents.md)
* [\`13-llmops-observability.md\`](./13-llmops-observability.md)
* [\`14-miscellaneous-guardrails-multimodal.md\`](./14-miscellaneous-guardrails-multimodal.md)
`;
}
