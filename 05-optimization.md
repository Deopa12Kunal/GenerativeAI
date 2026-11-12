# Optimization (05-optimization.md)

> Reference: YouTube Lecture "Generative AI: The Builder's Perspective" by Nitish Singh (CampusX, Timestamp 35:35)
> Slide Box: Optimization (Pink/Coral (Center-Bottom Box))

## Table of Contents
* Training Optimization (FlashAttention, Gradient Checkpointing)
* Model compression (AWQ, GPTQ, GGUF, Pruning)
* Optimizing Inference (KV Caching, PagedAttention, vLLM)

---

## Optimization: Training, Compression & Inference Systems

## 5. Optimization

> 📸 **Slide Reference**: YouTube Lecture *The Builder's Perspective* (35:35 / 50:14) | **Box 4: Optimization (Pink/Coral)**

### The 3 Optimization Pillars from Slide

```
┌─────────────────────────────────────────────────────────────┐
│ Optimization                                                │
│  • Training Optimization                                    │
│  • Model compression                                        │
│  • Optimizing Inference                                     │
└─────────────────────────────────────────────────────────────┘
```

---

### 1. Training Optimization
* **FlashAttention (Dao et al.)**:
  * Traditional attention materializes $N \times N$ matrix in GPU High-Bandwidth Memory (HBM) ($O(N^2)$ memory IO).
  * FlashAttention splits matrices into blocks that fit in fast on-chip SRAM, computing online softmax without storing intermediate attention weights.
* **Gradient Checkpointing**: Discards activations during forward pass, recomputing during backward pass to save ~60% VRAM at the cost of ~25% extra compute.

---

### 2. Model Compression
| Format | Bits | Target Hardware | Calibration |
| :--- | :--- | :--- | :--- |
| **GGUF** | 2–8 bit | CPU, Apple Silicon (Metal) | Optional |
| **AWQ** | 4 bit | NVIDIA GPUs (vLLM, TGI) | 128 samples |
| **GPTQ** | 4 bit | NVIDIA GPUs | Hessian-based |
| **FP8** | 8 bit | NVIDIA H100 / Blackwell | Native Hardware |

---

### 3. Optimizing Inference
* **KV Cache Footprint Formula**:
  $$\text{Memory (bytes)} = 2 \times 2 \times N_{\text{layers}} \times N_{\text{kv\_heads}} \times d_{\text{head}} \times L_{\text{seq}} \times B$$
* **PagedAttention (vLLM)**: Solves memory fragmentation by chunking KV caches into fixed-size virtual blocks.


### Key Technical Interview Q&A
#### Q1: Why is LLM generation memory-bandwidth bound rather than compute-bound?
**Answer:** For batch size 1, every newly generated token requires streaming all model weights (e.g., 14GB for 7B FP16) from HBM into SRAM just to perform matrix-vector multiplication. The GPU tensor cores sit idle waiting for memory transfer.

#### Q2: What is PagedAttention in vLLM?
**Answer:** An algorithm inspired by OS virtual memory that allocates KV cache in non-contiguous physical memory blocks. It cuts memory waste from 60-80% down to under 4%, enabling 2-4x higher concurrency.


