# Pretraining (03-pretraining.md)

> Reference: YouTube Lecture "Generative AI: The Builder's Perspective" by Nitish Singh (CampusX, Timestamp 35:35)
> Slide Box: Pretraining (Blue (Center-Top Box))

## Table of Contents
* Training Objectives
* Tokenization Strategies
* Training Strategies
* Handling challenges

---

## Pretraining: The 4 Core Topics on the Slide

## 3. Pretraining

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Blue Box (Center-Top)**

Pretraining is the stage where an AI model learns language and general knowledge from massive text datasets. The slide highlights **4 key subtopics**:

1. **Training Objectives**: The rule used to teach the model (for example, *"guess the next word"* or *"fill in the missing word"*).
2. **Tokenization Strategies**: How text is broken down into smaller pieces (**tokens**) and converted into numbers before entering the model.
3. **Training Strategies**: How engineers distribute the workload across multiple GPUs/machines to train huge models efficiently.
4. **Handling challenges**: Dealing with real-world hurdles like high hardware costs, memory limits, and keeping training stable.


### Key Technical Interview Q&A
#### Q1: What is tokenization and why is it needed during pretraining?
**Answer:** AI models only understand numbers, not raw letters. Tokenization breaks text into common words or word pieces ("tokens") and maps each piece to a number ID.


