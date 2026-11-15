# Pretraining (03-pretraining.md)

> **Lecture Series**: Generative AI (Nitish Singh / CampusX)
> **Perspective**: The Builder's Perspective (Timestamp 35:35 / 50:14)
> **Slide Box**: Pretraining (Blue (Center-Top Box))

## Topics From the Slide
* Training Objectives
* Tokenization Strategies
* Training Strategies
* Handling challenges

---

## Quick Summary

**Core Idea:** Pretraining is where a blank model learns language, facts, and patterns by reading massive amounts of raw text.

* Training Objectives: The learning task given to the model—such as predicting the next word (GPT style) or guessing a hidden word in a sentence (BERT style).
* Tokenization Strategies: Splitting raw sentences into smaller pieces called "tokens" (words or sub-words) and turning them into numbers the model can process.
* Training Strategies: Smart ways to organize and split the massive training job across many GPUs so it finishes in weeks instead of years.
* Handling challenges: Solving practical problems during training such as huge compute costs, running out of memory, and unstable training runs.

> **Easy Takeaway:** Pretraining builds the general knowledge of an LLM, turning raw internet text into a smart base model.

---

## 3. Pretraining

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Blue Box (Center-Top)**

Pretraining is the stage where an AI model learns language and general knowledge from massive text datasets. The slide highlights **4 key subtopics**:

1. **Training Objectives**: The rule used to teach the model (for example, *"guess the next word"* or *"fill in the missing word"*).
2. **Tokenization Strategies**: How text is broken down into smaller pieces (**tokens**) and converted into numbers before entering the model.
3. **Training Strategies**: How engineers distribute the workload across multiple GPUs/machines to train huge models efficiently.
4. **Handling challenges**: Dealing with real-world hurdles like high hardware costs, memory limits, and keeping training stable.


---

## Self-Check Questions

### Q1: What is tokenization and why is it needed during pretraining?
**Answer:** AI models only understand numbers, not raw letters. Tokenization breaks text into common words or word pieces ("tokens") and maps each piece to a number ID.
