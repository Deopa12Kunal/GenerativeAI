# Types of Transformers (02-types-of-transformers.md)

> **Lecture Series**: Generative AI (Nitish Singh / CampusX)
> **Perspective**: The Builder's Perspective (Timestamp 35:35 / 50:14)
> **Slide Box**: Types of Transformers (Yellow (Bottom-Left Box))

## Topics From the Slide
* Encoder Only (BERT)
* Decoder Only (GPT)
* Encoder & Decoder based (T5)

---

## Quick Summary

**Core Idea:** Encoders understand text | Decoders generate text | Encoder-Decoder converts text from one form to another.

* Encoder Only (BERT): Reads text from both left and right at the same time. Best for understanding tasks like classification, sentiment analysis, and search.
* Decoder Only (GPT): Generates text one word after another based on previous words. Best for chatbots, writing, and coding.
* Encoder & Decoder based (T5): Uses an Encoder to understand the input and a Decoder to produce a new output. Best for language translation and summarization.

> **Easy Takeaway:** Choose the Transformer type based on your goal: understanding/search (Encoder), chatting/writing (Decoder), or translating/summarizing (Encoder-Decoder).

---

## 2. Types of Transformers

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Yellow Box (Bottom-Left)**

The slide breaks Transformers down into **3 exact types**:

| Type (From Slide) | Example | How It Works | Best Used For |
| :--- | :--- | :--- | :--- |
| **Encoder Only** | **BERT** | Looks at all words (left & right) together to understand meaning | Text classification, sentiment analysis, search |
| **Decoder Only** | **GPT** | Looks only at past words to predict the next word | Chatbots, text generation, coding assistants |
| **Encoder & Decoder based** | **T5** | Encoder reads the input; Decoder writes a transformed output | Translation, text summarization |


---

## Self-Check Questions

### Q1: What is the main difference between BERT (Encoder-Only) and GPT (Decoder-Only)?
**Answer:** BERT looks at the whole sentence in both directions to understand meaning (great for classification and search), while GPT reads left-to-right to predict the next word (great for generating new text).
