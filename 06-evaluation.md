# Evaluation (06-evaluation.md)

> Reference: YouTube Lecture "Generative AI: The Builder's Perspective" by Nitish Singh (CampusX, Timestamp 35:35)
> Slide Box: Evaluation (Cyan (Right-Bottom Left Box))

## Table of Contents
* Academic Benchmarks (MMLU, GSM8K, HumanEval)
* Automated NLP Metrics (Perplexity, BLEU, ROUGE)
* LLM-as-a-Judge & Rubric Evaluation
* Chatbot Arena (LMSYS) & Elo Rating

---

## Evaluation: Academic Benchmarks, Arena Elo & LLM-as-a-Judge

## 6. Evaluation

> 📸 **Slide Reference**: YouTube Lecture *The Builder's Perspective* (35:35 / 50:14) | **Box 6: Evaluation (Cyan)**

### Benchmark Matrix

| Benchmark | Target Capability | Metric |
| :--- | :--- | :--- |
| **MMLU** | General World Knowledge (STEM, Humanities) | 5-shot Multiple Choice Accuracy |
| **GSM8K** | Grade School Multi-Step Math Reasoning | Exact Match Accuracy |
| **HumanEval** | Python Code Synthesis | pass@1, pass@10 unit test execution |
| **SWE-bench** | End-to-end GitHub Issue resolution | % of automated test suites resolved |
| **Chatbot Arena** | Human conversation preference | Bradley-Terry Elo Rating |

---

### LLM-as-a-Judge Best Practices
1. **Swap Positions**: Run both (Model A, Model B) and (Model B, Model A) to neutralize position bias.
2. **Explicit Scoring Rubric**: Score 1–5 across concrete criteria (Accuracy, Tone, Formatting, Safety).
3. **Reference Answers**: Provide gold-standard ground truth for the judge to compare against.


### Key Technical Interview Q&A
#### Q1: What are the three main biases of LLM-as-a-Judge and how do you mitigate them?
**Answer:** 1) Position Bias (prefers first option): Evaluate twice with swapped order. 2) Verbosity Bias (favors longer answers): Explicit rubric instructions penalizing fluff. 3) Self-Enhancement Bias (favors same model family): Use multi-model judge panels.


