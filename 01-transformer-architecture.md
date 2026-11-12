# Transformer Architecture (01-transformer-architecture.md)

> Reference: YouTube Lecture "Generative AI: The Builder's Perspective" by Nitish Singh (CampusX, Timestamp 35:35)
> Slide Box: Transformer Architecture (Green (Top-Left Box))

## Table of Contents
* Attention Mechanism & Scaled Dot-Product
* MHA vs MQA vs GQA (Grouped-Query Attention)
* Positional Encodings (Sinusoidal, RoPE, ALiBi)
* Feed-Forward Networks (SwiGLU)
* Normalization (Pre-LN & RMSNorm)

---

## Core Architecture: Attention, RoPE & RMSNorm

## 1. Transformer Architecture

> 📸 **Slide Reference**: YouTube Lecture *The Builder's Perspective* (35:35 / 50:14) | **Box 1: Transformer Architecture (Green)**

### Crisp Overview
Modern LLMs (LLaMA 3, Mistral, Gemma, GPT-4) use an optimized Transformer stack centered on **Grouped-Query Attention (GQA)**, **Rotary Position Embeddings (RoPE)**, and **RMSNorm**.

---

### Core Mathematical Formulations

1. **Scaled Dot-Product Attention**:
   $$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$
   * $\frac{1}{\sqrt{d_k}}$ preserves unit variance to prevent softmax gradient saturation.

2. **Rotary Position Embedding (RoPE)**:
   $$\langle R_\Theta^m q, R_\Theta^n k \rangle = g(q, k, m - n)$$
   * Injects relative position into Query-Key dot products via 2D rotation matrices.

3. **RMSNorm (Root Mean Square Normalization)**:
   $$\bar{a}_i = \frac{a_i}{\text{RMS}(a)} g_i, \quad \text{RMS}(a) = \sqrt{\frac{1}{d} \sum_{i=1}^d a_i^2 + \epsilon}$$
   * Skips mean computation, delivering faster GPU kernel execution than LayerNorm.

---

### Attention Variants Comparison (The Inference KV Tradeoff)

| Variant | Query Heads | Key/Value Heads | KV Cache Size | Benchmark Quality |
| :--- | :--- | :--- | :--- | :--- |
| **MHA** | $H$ | $H$ | $100\%$ (baseline) | $100\%$ (Standard) |
| **MQA** | $H$ | $1$ | $1/H$ (~$12.5\%$) | Slight drop |
| **GQA** | $H$ | $G$ ($G \ll H$) | $G/H$ (~$25\%$) | Near-MHA parity |

> [!TIP]
> **Builder Rule**: GQA is the industry standard for 7B–70B models, cutting inference memory bandwidth bottlenecks by up to 8x.


### Key Technical Interview Q&A
#### Q1: Why scale dot products by 1 / sqrt(d_k) in Self-Attention?
**Answer:** As head dimension d_k grows, dot-product variance equals d_k. Unscaled values push softmax into saturated regions with near-zero gradients. Scaling maintains unit variance.

#### Q2: What is the concrete advantage of Grouped-Query Attention (GQA)?
**Answer:** Reduces KV cache memory footprint by 4x to 8x during inference while maintaining parity in model benchmark quality with full Multi-Head Attention.


