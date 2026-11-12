# 🧠 Generative AI: The Builder's Perspective — Crisp Study Notes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Curriculum](https://img.shields.io/badge/Curriculum-7%20Pillars-brightgreen.svg)](#curriculum-overview)
[![Topic](https://img.shields.io/badge/AI-Generative%20AI%20%26%20LLMs-blue.svg)](#)
[![Format](https://img.shields.io/badge/Format-GitHub%20Markdown-orange.svg)](#)

> Short, crisp, and technically verified digital notes synthesized directly from the YouTube lecture **"Generative AI: The Builder's Perspective"** (Timestamp `35:35 / 50:14`) by **Nitish Singh (CampusX)**.

---

## 🗺️ Slide Blueprint: The 7 Builder Pillars

Reference from lecture slide screenshot:

```
┌─────────────────────────────────┬─────────────────────────────────┬─────────────────────────────────┐
│ 1. Transformer Architecture     │ 3. Pretraining                  │ 5. Fine-Tuning                  │
│  • Self-Attention (Q, K, V)     │  • Training Objectives (CLM/MLM)│  • Task specific tuning         │
│  • MHA vs MQA vs GQA            │  • Tokenization Strategies (BPE)│  • Instruction tuning (SFT)     │
│  • Positional (RoPE / ALiBi)    │  • Training Strategies (3D)     │  • Continual Pretraining        │
│  • RMSNorm & SwiGLU             │  • Handling challenges          │  • RLHF (PPO) vs DPO            │
├─────────────────────────────────┼─────────────────────────────────│  • PEFT (LoRA & QLoRA)          │
│ 2. Types of Transformers        │ 4. Optimization                 ├─────────────────────────────────┤
│  • Encoder Only (BERT)          │  • Training Optimization        │ 6. Evaluation                   │
│  • Decoder Only (GPT)           │  • Model compression            │  • Benchmarks (MMLU, GSM8K)     │
│  • Encoder & Decoder based (T5) │  • Optimizing Inference         │  • LLM-as-a-Judge               │
│                                 │                                 ├─────────────────────────────────┤
│                                 │                                 │ 7. Deployment                   │
│                                 │                                 │  • Serving (vLLM, TGI, Ollama)  │
│                                 │                                 │  • Latency (TTFT vs ITL)        │
│                                 │                                 │  • Streaming (SSE) & Guardrails │
└─────────────────────────────────┴─────────────────────────────────┴─────────────────────────────────┘
```

---

## 📚 Notes Index & Quick Links

| File | Slide Box & Color | Core Focus |
| :--- | :--- | :--- |
| [`01-transformer-architecture.md`](./01-transformer-architecture.md) | **Transformer Architecture** (Green) | Scaled Dot-Product, GQA, RoPE, RMSNorm, SwiGLU |
| [`02-types-of-transformers.md`](./02-types-of-transformers.md) | **Types of Transformers** (Yellow) | Encoder (BERT) vs Decoder (GPT) vs Seq2Seq (T5) |
| [`03-pretraining.md`](./03-pretraining.md) | **Pretraining** (Blue) | Objectives (CLM), BPE, 3D Parallelism, Loss spikes |
| [`04-fine-tuning.md`](./04-fine-tuning.md) | **Fine-Tuning** (Purple) | SFT, LoRA math, QLoRA NF4, RLHF vs DPO |
| [`05-optimization.md`](./05-optimization.md) | **Optimization** (Pink/Coral) | FlashAttention SRAM tiling, KV Cache, PagedAttention |
| [`06-evaluation.md`](./06-evaluation.md) | **Evaluation** (Cyan) | MMLU, GSM8K, Arena Elo, LLM-as-a-Judge |
| [`07-deployment.md`](./07-deployment.md) | **Deployment** (Warm Grey) | TTFT/ITL SLAs, vLLM continuous batching, Guardrails |

---

## ⚡ Quick Builder Cheat Sheet

1. **Attention**: Always use Grouped-Query Attention (GQA) for models $\ge 7\text{B}$ to save $4\times$ to $8\times$ KV cache VRAM.
2. **Architecture**: Pre-LN + RoPE + RMSNorm + SwiGLU is the gold standard.
3. **Pretraining Precision**: Always train in **BF16**, never FP16.
4. **Fine-Tuning**: Freeze base model and use QLoRA (NF4, rank 16, alpha 32) on all projection layers.
5. **Serving**: Deploy with vLLM PagedAttention and continuous batching to eliminate memory fragmentation.

---

## 🚀 Push to GitHub Commands

```bash
git init
git add .
git commit -m "feat: add crisp Generative AI notes from YouTube lecture"
git branch -M main
git remote add origin https://github.com/<YOUR_USER>/genai-builders-notes.git
git push -u origin main
```

---

## 📺 Lecture Reference
* **Video**: *Generative AI: The Builder's Perspective* (Timestamp `35:35 / 50:14`)
* **Instructor**: Nitish Singh ([CampusX](https://www.youtube.com/@campusx-official))
