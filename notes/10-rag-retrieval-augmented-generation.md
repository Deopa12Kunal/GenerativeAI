# RAG (10-rag-retrieval-augmented-generation.md)

> **Lecture Series**: Generative AI (Nitish Singh / CampusX)
> **Perspective**: The User's Perspective (Timestamp 41:37 / 50:14)
> **Slide Box**: RAG (Yellow (Center-Middle Box))

## Topics From the Slide
* Why LLMs Need Your Data (No Hallucinations)
* How RAG Works in 3 Simple Steps
* Chatting With PDFs, Docs & Databases

---

## Quick Summary

**Core Idea:** RAG = Search your documents first, then hand the relevant paragraphs to the LLM to write the answer.

* The Problem: An LLM only knows what it learned during training—it doesn’t know your private files, company docs, or today’s news.
* Step 1 (Prepare & Store): Split your PDFs/docs into smaller chunks and save them in a searchable database.
* Step 2 (Retrieve): When a user asks a question, search the database to find the most relevant chunks.
* Step 3 (Generate): Send those relevant chunks + the user’s question to the LLM so it answers using real facts instead of guessing.

> **Easy Takeaway:** Think of RAG like an open-book exam for the LLM—instead of memorizing everything, it looks up the right page first.

---

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


---

## Self-Check Questions

### Q1: What problem does RAG solve?
**Answer:** LLMs don’t know your private or up-to-date data and sometimes make things up (hallucinate). RAG feeds real, up-to-date source text into the prompt so the model gives grounded answers.
