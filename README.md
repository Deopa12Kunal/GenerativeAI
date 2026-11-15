# 🧠 Generative AI: Study Notes (Builder & User Perspectives)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Curriculum](https://img.shields.io/badge/Curriculum-14%20Modules-brightgreen.svg)](#curriculum-overview)

> Clean, easy-to-understand study notes directly following the two roadmap slides from **Nitish Singh (CampusX)**:
> 1. **Part 1: The Builder's Perspective** (Timestamp `35:35 / 50:14`)
> 2. **Part 2: The User's Perspective** (Timestamp `41:37 / 50:14`)

---

## 🗺️ Slide 1: The Builder's Perspective (Timestamp 35:35)

```
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
```

---

## 🗺️ Slide 2: The User's Perspective (Timestamp 41:37)

```
┌─────────────────────────────────┬─────────────────────────────────┬─────────────────────────────────┐
│ 8. Building Basic LLM Apps      │ 9. Prompt Engineering           │ 12. Agents                      │
│  • Open Source vs Closed Source │                                 │                                 │
│    LLMs                         ├─────────────────────────────────┤                                 │
│  • Using LLM APIs               │ 10. RAG                         │                                 │
│  • LangChain                    │                                 ├────────────────┬────────────────┤
│  • HuggingFace                  ├─────────────────────────────────┤ 13. LLMOps     │ 14. Misc       │
│  • Ollama                       │ 11. Fine Tuning                 │                │                │
└─────────────────────────────────┴─────────────────────────────────┴────────────────┴────────────────┘
```

---

## 📚 Notes Index

### Part 1: The Builder's Perspective
* [`01-transformer-architecture.md`](./01-transformer-architecture.md)
* [`02-types-of-transformers.md`](./02-types-of-transformers.md)
* [`03-pretraining.md`](./03-pretraining.md)
* [`04-fine-tuning.md`](./04-fine-tuning.md)
* [`05-optimization.md`](./05-optimization.md)
* [`06-evaluation.md`](./06-evaluation.md)
* [`07-deployment.md`](./07-deployment.md)

### Part 2: The User's Perspective
* [`08-building-basic-llm-apps.md`](./08-building-basic-llm-apps.md)
* [`09-prompt-engineering.md`](./09-prompt-engineering.md)
* [`10-rag-retrieval-augmented-generation.md`](./10-rag-retrieval-augmented-generation.md)
* [`11-fine-tuning-user-perspective.md`](./11-fine-tuning-user-perspective.md)
* [`12-autonomous-agents.md`](./12-autonomous-agents.md)
* [`13-llmops-observability.md`](./13-llmops-observability.md)
* [`14-miscellaneous-guardrails-multimodal.md`](./14-miscellaneous-guardrails-multimodal.md)
