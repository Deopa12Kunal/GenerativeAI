# Building Basic LLM Apps (08-building-basic-llm-apps.md)

> **Lecture Series**: Generative AI (Nitish Singh / CampusX)
> **Perspective**: The User's Perspective (Timestamp 41:37 / 50:14)
> **Slide Box**: Building Basic LLM Apps (Green (Full Left Column))

## Topics From the Slide
* Open Source vs Closed Source LLMs
* Using LLM APIs
* LangChain
* HuggingFace
* Ollama

---

## Quick Summary

**Core Idea:** As a User (app developer), you don’t build the LLM from scratch—you connect existing LLMs to your app using APIs and tools.

* Open Source vs Closed Source LLMs: Closed models (like GPT, Gemini, Claude) are owned by companies and accessed via paid APIs. Open-source models (like Llama, Mistral) let you download the model and run it yourself for full privacy and control.
* Using LLM APIs: Sending a prompt from your code to an AI service over the internet and receiving the generated answer back.
* LangChain: A popular developer framework that gives you ready-made building blocks to connect LLMs with prompts, files, and external tools.
* HuggingFace: The go-to community website ("GitHub for AI") where you can find, test, and download open-source models and datasets.
* Ollama: A simple tool that lets you download and run open-source LLMs right on your own laptop—no cloud or paid API needed.

> **Easy Takeaway:** Start by calling an LLM API or running a model locally with Ollama, then use LangChain when you want to wire multiple steps together.

---

## 8. Building Basic LLM Apps

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Green Box (Full Left Column)**

This box shows the **5 essential tools and choices** when you start building AI applications:

1. **Open Source vs Closed Source LLMs**
   * **Closed Source** *(GPT, Gemini, Claude)*: Easy to start, top quality, accessed via API, pay per use.
   * **Open Source** *(Llama, Mistral, Gemma)*: Free to download, keeps data private on your own servers/laptop.
2. **Using LLM APIs**
   * Your code sends a prompt + API key to a provider and gets a smart text response back in JSON.
3. **LangChain**
   * A developer framework that makes it much easier to connect prompts, LLMs, documents, and tools into one workflow.
4. **HuggingFace**
   * The central hub where developers share open-source models, datasets, and demos.
5. **Ollama**
   * A lightweight tool for running open-source LLMs locally on your own computer.


---

## Self-Check Questions

### Q1: What is the simple difference between Closed Source and Open Source LLMs?
**Answer:** Closed Source LLMs (like ChatGPT/Gemini) run on the provider’s servers and are super easy to call via API, while Open Source LLMs can be downloaded and hosted on your own hardware for privacy and full control.

### Q2: Why do beginners use Ollama?
**Answer:** Ollama makes running open-source models like Llama on a personal computer as easy as running a single terminal command, with zero complex setup.
