# RAG (10-rag-retrieval-augmented-generation.md)

> Reference: YouTube Lecture Series by Nitish Singh (CampusX)
> Perspective: The User's Perspective (41:37)
> Slide Box: RAG (Yellow (Center-Middle Box))

## Table of Contents
* Why LLMs Need Your Data (No Hallucinations)
* How RAG Works in 3 Simple Steps
* Chatting With PDFs, Docs & Databases

---

## RAG — Giving LLMs Access to Your Data

## 10. RAG (Retrieval-Augmented Generation)

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Yellow Box (Center-Middle)**

### What Is RAG?
Normally, an LLM only knows public information from when it was trained. **RAG** lets an LLM answer questions using **your own documents** (PDFs, notes, company wikis, databases).

### How It Works (Like an Open-Book Exam)
1. **Store**: Break your documents into smaller sections and store them so they can be searched by meaning.
2. **Retrieve**: When a user asks a question, find the top matching sections from your documents.
3. **Generate**: Give those matching sections to the LLM and say: *"Using this information, answer the user's question."*

### Why It's So Popular
* **Up-to-date**: Just add new files—no need to retrain the model.
* **Accurate**: Greatly reduces guessing (hallucinations) because the model has the source right in front of it.


### Self-Check Questions
#### Q1: What problem does RAG solve?
**Answer:** LLMs don’t know your private or up-to-date data and sometimes make things up (hallucinate). RAG feeds real, up-to-date source text into the prompt so the model gives grounded answers.


