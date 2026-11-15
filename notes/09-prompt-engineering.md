# Prompt Engineering (09-prompt-engineering.md)

> **Lecture Series**: Generative AI (Nitish Singh / CampusX)
> **Perspective**: The User's Perspective (Timestamp 41:37 / 50:14)
> **Slide Box**: Prompt Engineering (Blue (Center-Top Box))

## Topics From the Slide
* Clear Instructions & Roles
* Giving Examples (Few-Shot Prompting)
* Step-by-Step Thinking & Output Format

---

## Quick Summary

**Core Idea:** Better input prompt = better output answer, with zero training or extra cost.

* Be Specific: Tell the model its role, the exact task, and who the answer is for.
* Show Examples (Few-Shot): Giving 2 or 3 sample input-output pairs helps the model match your exact style or format.
* Ask It to Think Step-by-Step: Asking the model to explain its steps before giving the final answer reduces mistakes on logic and math problems.
* Specify Output Format: Tell the model if you want bullet points, a table, or JSON so your app can read it easily.

> **Easy Takeaway:** Always try improving your prompt first—it is the fastest and cheapest way to fix bad LLM answers.

---

## 9. Prompt Engineering

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Blue Box (Center-Top)**

### What Is It?
**Prompt Engineering** is how you talk to an LLM to get reliable, high-quality results—without touching the model's internal code or weights.

### Simple Techniques That Work
* **Clear Role & Context**: *"You are a helpful Python tutor. Explain this simply..."*
* **Give Examples**: Show 2–3 examples of what a good output looks like before asking your real question.
* **Step-by-Step Reasoning**: Ask the model to *"think step by step"* for harder problems.
* **Define the Format**: Ask explicitly for bullet points, a markdown table, or JSON.


---

## Self-Check Questions

### Q1: What is Prompt Engineering in simple terms?
**Answer:** It is the skill of designing clear inputs (instructions, context, and examples) so an LLM gives the exact quality and format of answer you need without modifying the model.
