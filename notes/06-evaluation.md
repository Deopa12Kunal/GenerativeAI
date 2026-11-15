# Evaluation (06-evaluation.md)

> **Lecture Series**: Generative AI (Nitish Singh / CampusX)
> **Perspective**: The Builder's Perspective (Timestamp 35:35 / 50:14)
> **Slide Box**: Evaluation (Cyan (Bottom-Right Left Box))

## Topics From the Slide
* Measuring Accuracy & Reasoning
* Standard Benchmarks & Human Testing
* Checking for Hallucinations & Safety

---

## Quick Summary

**Core Idea:** You cannot improve a model unless you have a reliable way to measure how well it performs.

* Benchmarks: Standardized test sets (like math, coding, and general knowledge quizzes) used to compare models fairly.
* Real-World Testing: Testing how the model performs on the actual tasks your users care about, not just exam questions.
* Human & AI Judging: Having humans—or a stronger AI model—grade answers for helpfulness, tone, and factual accuracy.

> **Easy Takeaway:** Always evaluate your model on real examples from your use case before trusting it in production.

---

## 6. Evaluation

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Cyan Box (Bottom-Right)**

### What Is It?
**Evaluation** is how builders measure whether a model actually works well—checking its reasoning, accuracy, coding skills, and safety before deployment.

### Key Ways to Evaluate
* **Standard Benchmarks**: Giving the model standardized tests (math, coding, reading comprehension) to compare it against other models.
* **Task-Specific Checks**: Measuring accuracy on your own business tasks.
* **Human Feedback**: Having people compare answers from two models and vote on which one is better.


---

## Self-Check Questions

### Q1: Why isn’t checking a single quiz score enough to evaluate an LLM?
**Answer:** A model can memorize popular exam questions and still fail on real-world user prompts, give wrong facts (hallucinations), or use the wrong tone.
