# Agents (12-autonomous-agents.md)

> **Lecture Series**: Generative AI (Nitish Singh / CampusX)
> **Perspective**: The User's Perspective (Timestamp 41:37 / 50:14)
> **Slide Box**: Agents (Purple (Top-Right Large Box))

## Topics From the Slide
* Chatbot vs AI Agent
* Using Tools (Search, Calculators, APIs)
* Planning & Multi-Step Tasks

---

## Quick Summary

**Core Idea:** Chatbot = answers questions | Agent = plans steps, uses tools, checks results, and finishes tasks.

* More Than Text: A regular LLM only outputs text. An Agent has access to tools (like web search, a calculator, email, or a database) and decides when to use them.
* Step-by-Step Loop: The Agent thinks about the goal, picks a tool, sees the tool’s result, and repeats until the task is complete.
* Memory: Agents can remember past steps and user preferences across a multi-step task.

> **Easy Takeaway:** Notice how large the Agents box is on the slide—Agents are one of the biggest areas in modern GenAI app development.

---

## 12. Agents

> 📸 **Slide Reference**: *The User's Perspective* (41:37 / 50:14) · **Purple Box (Top-Right)**

### What Is an AI Agent?
A standard chatbot answers one prompt at a time. An **AI Agent** is given a goal and can figure out the steps needed to complete it—using external tools along the way.

### How an Agent Works
1. **Think**: Understands the user's goal and breaks it into steps.
2. **Act (Use Tools)**: Calls a tool—such as searching the web, querying a database, or running Python code.
3. **Observe**: Reads the result from that tool and decides if more steps are needed before giving the final answer.


---

## Self-Check Questions

### Q1: What turns a regular LLM chatbot into an AI Agent?
**Answer:** Giving the LLM the ability to reason through a plan, call external tools (like APIs, search, or code), observe the result, and decide the next step on its own.
