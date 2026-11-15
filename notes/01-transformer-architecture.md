# Transformer Architecture (01-transformer-architecture.md)

> Reference: YouTube Lecture Series by Nitish Singh (CampusX)
> Perspective: The Builder's Perspective (35:35)
> Slide Box: Transformer Architecture (Green (Top-Left Box))

## Table of Contents
* Transformer Architecture Overview
* How Attention Helps Models Understand Context
* Why Transformers Replaced Older Models (RNNs)

---

## Transformer Architecture — The Foundation

## 1. Transformer Architecture

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Green Box (Top-Left)**

### What Is It?
The **Transformer** is the foundational neural network architecture behind modern Generative AI. Before Transformers, AI models struggled with long sentences because they processed words one by one.

### Key Ideas (Easy to Remember)
* **Reads Everything Together**: Processes all words in a sentence at the same time instead of sequentially.
* **Self-Attention**: Helps the model connect related words across a sentence (for example, connecting a pronoun like *"he"* or *"it"* back to the right person or object).
* **Building Block for Everything Else**: Every other box in the Builder's roadmap—Pretraining, Fine-Tuning, Optimization—builds on top of this architecture.

> [!NOTE]
> Add your own notes below as you watch the deeper Transformer video lectures!


### Self-Check Questions
#### Q1: In simple terms, why was the Transformer architecture such a big breakthrough?
**Answer:** Older models read text slowly one word at a time and forgot earlier words in long paragraphs. Transformers look at all words together using Attention, making them much faster to train and far better at understanding context.


