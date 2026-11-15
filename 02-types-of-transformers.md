# Types of Transformers (02-types-of-transformers.md)

> Reference: YouTube Lecture "Generative AI: The Builder's Perspective" by Nitish Singh (CampusX, Timestamp 35:35)
> Slide Box: Types of Transformers (Yellow (Bottom-Left Box))

## Table of Contents
* Encoder Only (BERT)
* Decoder Only (GPT)
* Encoder & Decoder based (T5)

---

## Types of Transformers: BERT vs GPT vs T5

## 2. Types of Transformers

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Yellow Box (Bottom-Left)**

The slide breaks Transformers down into **3 exact types**:

| Type (From Slide) | Example | How It Works | Best Used For |
| :--- | :--- | :--- | :--- |
| **Encoder Only** | **BERT** | Looks at all words (left & right) together to understand meaning | Text classification, sentiment analysis, search |
| **Decoder Only** | **GPT** | Looks only at past words to predict the next word | Chatbots, text generation, coding assistants |
| **Encoder & Decoder based** | **T5** | Encoder reads the input; Decoder writes a transformed output | Translation, text summarization |


### Key Technical Interview Q&A
#### Q1: What is the main difference between BERT (Encoder-Only) and GPT (Decoder-Only)?
**Answer:** BERT looks at the whole sentence in both directions to understand meaning (great for classification and search), while GPT reads left-to-right to predict the next word (great for generating new text).


