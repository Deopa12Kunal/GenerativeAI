# Types of Transformers (02-types-of-transformers.md)

> Reference: YouTube Lecture "Generative AI: The Builder's Perspective" by Nitish Singh (CampusX, Timestamp 35:35)
> Slide Box: Types of Transformers (Yellow (Bottom-Left Box))

## Table of Contents
* Encoder Only (BERT, RoBERTa)
* Decoder Only (GPT, LLaMA, Mistral)
* Encoder & Decoder based (T5, BART)
* Attention Masking Differences
* Architectural Decision Matrix

---

## Architectural Archetypes: BERT vs GPT vs T5

## 2. Types of Transformers

> 📸 **Slide Reference**: YouTube Lecture *The Builder's Perspective* (35:35 / 50:14) | **Box 2: Types of Transformers (Yellow)**

### The Three Archetypes (Directly From Slide)

```
┌─────────────────────────────────────────────────────────────┐
│ Types of Transformers                                       │
│  1. Encoder Only (BERT)          -> Bidirectional Context   │
│  2. Decoder Only (GPT)           -> Autoregressive Causal   │
│  3. Encoder & Decoder based (T5) -> Sequence-to-Sequence    │
└─────────────────────────────────────────────────────────────┘
```

---

### Decision Matrix for Builders

| Metric | Encoder-Only (BERT) | Decoder-Only (GPT/LLaMA) | Encoder-Decoder (T5) |
| :--- | :--- | :--- | :--- |
| **Attention Mask** | Full Bidirectional | Causal (Lower-Triangular) | Enc: Bidirectional, Dec: Causal + Cross |
| **Pretraining Objective**| Masked LM (15% tokens masked) | Causal LM (Next-Token Prediction) | Span Corruption / Denoising |
| **Best Used For** | Embeddings, RAG Rerankers, NER | Chat, Code, Reasoning, Agents | Translation, Summarization |
| **Inference Mode** | Single forward pass | Autoregressive token-by-token | Two-stage forward pass |

> [!NOTE]
> **Key Insight**: Decoder-only architectures won generative AI because scaling next-token prediction on internet-scale text produces zero-shot reasoning.


### Key Technical Interview Q&A
#### Q1: Why did Decoder-Only models triumph over Encoder-Decoder models for general AI?
**Answer:** Decoder-only models have a simpler pretraining loop (next-token prediction), zero weight asymmetry, superior in-context few-shot learning, and significantly simpler KV-caching during high-throughput inference.

#### Q2: When should an engineer still use BERT or DeBERTa?
**Answer:** For semantic search (vector database embeddings), text classification, and cross-encoder rerankers where output is a dense vector or class label rather than generated text.


