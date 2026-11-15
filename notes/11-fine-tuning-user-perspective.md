# Fine Tuning (11-fine-tuning-user-perspective.md)

> **Lecture Series**: Generative AI (Nitish Singh / CampusX)
> **Perspective**: The User's Perspective (Timestamp 41:37 / 50:14)
> **Slide Box**: Fine Tuning (Pink/Coral (Center-Bottom Box))

## Topics From the Slide
* Teaching Style, Tone & Behavior
* Prompting vs RAG vs Fine Tuning
* Using Your Own Example Dataset

---

## Quick Summary

**Core Idea:** Use RAG to give the model new facts; use Fine Tuning to teach the model a new style, tone, or skill.

* What It Means for Users: Taking an existing open-source or API model and training it a little more on your own sample questions and ideal answers.
* When to Use It: Best when you want the model to always reply in a very specific tone, structure, or specialized domain language.
* Not Always First Choice: Because fine-tuning takes data preparation and compute, most developers try Prompt Engineering first, then RAG, and only Fine-Tune if still needed.

> **Easy Takeaway:** Start simple: Prompt Engineering → RAG → Fine Tuning.

---

## 11. Fine Tuning (User Perspective)

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Pink Box (Center-Bottom)**

### What Is It?
As a User (app developer), **Fine Tuning** means taking a ready-made model and teaching it with your own examples so it consistently responds the way your product needs.

### Simple Rule of Thumb: RAG vs Fine Tuning
| If you want the AI to... | Use... |
| :--- | :--- |
| Know **new or private facts** (like company PDFs) | **RAG** |
| Follow a **specific writing style, tone, or strict format** | **Fine Tuning** |
| Handle simple tasks with good instructions | **Prompt Engineering** |


---

## Self-Check Questions

### Q1: When should a developer choose RAG instead of Fine Tuning?
**Answer:** Choose RAG when the model needs access to changing facts or private documents. Choose Fine Tuning when you want to change how the model behaves, writes, or formats its answers.
