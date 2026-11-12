# Pretraining (03-pretraining.md)

> Reference: YouTube Lecture "Generative AI: The Builder's Perspective" by Nitish Singh (CampusX, Timestamp 35:35)
> Slide Box: Pretraining (Blue (Center-Top Box))

## Table of Contents
* Training Objectives (CLM, MLM)
* Tokenization Strategies (BPE, Byte Fallback)
* Training Strategies (DDP, FSDP, 3D Parallelism)
* Handling Challenges (Loss Spikes, BF16 vs FP16)

---

## Pretraining: Objectives, Tokenization, Distributed Scale & Stability

## 3. Pretraining

> 📸 **Slide Reference**: YouTube Lecture *The Builder's Perspective* (35:35 / 50:14) | **Box 3: Pretraining (Blue)**

### The 4 Pretraining Pillars from Slide

```
┌─────────────────────────────────────────────────────────────┐
│ Pretraining                                                 │
│  • Training Objectives                                      │
│  • Tokenization Strategies                                  │
│  • Training Strategies                                      │
│  • Handling challenges                                      │
└─────────────────────────────────────────────────────────────┘
```

---

### 1. Training Objectives
* **Causal Language Modeling (CLM)**:
  $$\mathcal{L}_{\text{CLM}} = - \sum_{t=1}^T \log P(w_t \mid w_1, w_2, \dots, w_{t-1})$$
* Cross-entropy loss computed across vocabulary for every token position in parallel.

---

### 2. Tokenization Strategies
* **Byte-level BPE**: Uses UTF-8 bytes as base units.
* **Vocab Expansion**: LLaMA 3 expanded vocab from 32K to **128K tokens**, reducing sequence length by ~15% for multilingual text and code.

---

### 3. Training Strategies (3D Distributed Parallelism)
* **Tensor Parallelism (TP)**: Splits individual linear layers across GPUs in one node (via NVLink).
* **Pipeline Parallelism (PP)**: Partitions sequential layers across different nodes.
* **FSDP / ZeRO-3**: Shards parameters, gradients, and optimizer states across all ranks.

---

### 4. Handling Challenges
* **Loss Spikes**: Caused by bad web data batches or attention logit explosions. Fixed by **QK-Norm** and gradient clipping.
* **Precision**: Always prefer **BF16** over FP16 to eliminate gradient underflow.


### Key Technical Interview Q&A
#### Q1: Why do LLMs use BF16 instead of FP16 during pretraining?
**Answer:** BF16 has an 8-bit exponent (matching FP32) compared to FP16 5-bit exponent. This prevents gradient underflow and overflow during large matrix multiplications without requiring delicate loss scaling.

#### Q2: What are the three ZeRO stages in DeepSpeed / FSDP?
**Answer:** ZeRO-1 shards optimizer states (4x VRAM savings). ZeRO-2 shards optimizer states + gradients (8x savings). ZeRO-3 shards optimizer states + gradients + model parameters across all GPUs.


