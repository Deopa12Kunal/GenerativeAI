# Fine-Tuning (04-fine-tuning.md)

> Reference: YouTube Lecture "Generative AI: The Builder's Perspective" by Nitish Singh (CampusX, Timestamp 35:35)
> Slide Box: Fine-Tuning (Purple (Top-Right Box))

## Table of Contents
* Task specific tuning
* Instruction tuning (SFT)
* Continual Pretraining
* RLHF (Reward Modeling & PPO) vs DPO
* PEFT (LoRA & QLoRA)

---

## Post-Training: Task Tuning, SFT, Continual Pretraining, RLHF & PEFT

## 4. Fine-Tuning (Post-Training)

> 📸 **Slide Reference**: YouTube Lecture *The Builder's Perspective* (35:35 / 50:14) | **Box 5: Fine-Tuning (Purple)**

### The 5 Post-Training Pillars from Slide

```
┌─────────────────────────────────────────────────────────────┐
│ Fine-Tuning                                                 │
│  • Task specific tuning             • RLHF                  │
│  • Instruction tuning               • PEFT                  │
│  • Continual Pretraining                                    │
└─────────────────────────────────────────────────────────────┘
```

---

### 1. Task Specific Tuning vs Instruction Tuning (SFT)
* **Task Specific**: Full parameter tuning for one task (e.g. classification). Prone to catastrophic forgetting.
* **Instruction Tuning (SFT)**: Formatting datasets with system instructions, user queries, and assistant responses.

---

### 2. Continual Pretraining
* Running next-token prediction on specialized corpora (e.g., 50B tokens of legal or medical text).
* Uses learning rates ~10% of base pretraining LR to prevent knowledge erasure.

---

### 3. RLHF vs DPO
* **RLHF (PPO)**: Actor $\to$ Critic $\to$ Reward Model $\to$ Reference Model (4 models in VRAM).
* **DPO (Direct Preference Optimization)**:
  $$\mathcal{L}_{\text{DPO}}(\pi_\theta) = -\mathbb{E}_{(x, y_w, y_l)} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)} \right) \right]$$

---

### 4. PEFT (LoRA & QLoRA)
* **LoRA**: $h = W_0 x + \frac{\alpha}{r} (B \cdot A) x$
* **QLoRA Pillars**:
  1. **NF4 (NormalFloat4)**: Information-theoretically optimal 4-bit data type for zero-mean normal weights.
  2. **Double Quantization**: Quantizes quantization constants, saving 0.37 bits/param.
  3. **Paged Optimizers**: Prevents OOM memory spikes during gradient checkpointing.


### Key Technical Interview Q&A
#### Q1: What is the mathematical formulation of LoRA and why does it save memory?
**Answer:** W = W0 + (alpha / r) * (B * A), where A is (r x k) and B is (d x r) with r << d. Optimizer states (Adam momentum + variance) are only tracked for the tiny adapter matrices, reducing trainable parameters and optimizer memory by >90%.

#### Q2: How does DPO improve upon traditional RLHF (PPO)?
**Answer:** DPO analytically derives policy loss directly from preference pairs (chosen vs rejected) without needing to train or maintain a separate Reward Model or run reinforcement learning rollouts.


