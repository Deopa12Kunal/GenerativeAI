# Fine-Tuning (04-fine-tuning.md)

> **Lecture Series**: Generative AI (Nitish Singh / CampusX)
> **Perspective**: The Builder's Perspective (Timestamp 35:35 / 50:14)
> **Slide Box**: Fine-Tuning (Purple (Top-Right Box))

## Topics From the Slide
* Task specific tuning
* Instruction tuning
* Continual Pretraining
* RLHF
* PEFT

---

## Quick Summary

**Core Idea:** Pretraining gives general knowledge; Fine-Tuning shapes that knowledge into a useful, well-behaved assistant.

* Task specific tuning: Training the model on examples of one specific job (like summarizing emails or classifying reviews).
* Instruction tuning: Teaching a base model how to follow human instructions and respond like a helpful chat assistant.
* Continual Pretraining: Feeding extra specialized text (like legal or medical books) into an existing model so it learns a new domain.
* RLHF (Reinforcement Learning from Human Feedback): Using human ratings to reward helpful, safe, and polite answers over bad ones.
* PEFT (Parameter-Efficient Fine-Tuning): Updating only a tiny part of the model instead of the whole model, making fine-tuning much cheaper and faster.

> **Easy Takeaway:** A raw pretrained model just completes text; Fine-Tuning (Instruction Tuning + RLHF) turns it into something people can actually chat with.

---

## 4. Fine-Tuning

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Purple Box (Top-Right)**

After pretraining, a model knows a lot of text, but doesn't yet know how to be a helpful assistant. The slide lists **5 key fine-tuning concepts**:

* **Task specific tuning**: Adjusting the model to excel at one narrow job (e.g., spam detection or sentiment tagging).
* **Instruction tuning**: Training the model on Question-and-Answer examples so it learns to follow instructions.
* **Continual Pretraining**: Continuing training on domain-specific documents (like healthcare or finance) to add new domain knowledge.
* **RLHF** *(Reinforcement Learning from Human Feedback)*: Using human feedback to teach the model which answers are helpful, honest, and safe.
* **PEFT** *(Parameter-Efficient Fine-Tuning)*: Smart techniques that fine-tune only a small fraction of the model so it runs on much smaller hardware.


---

## Self-Check Questions

### Q1: What is the difference between Instruction Tuning and RLHF?
**Answer:** Instruction Tuning teaches the model the format of following user commands using example Q&A pairs. RLHF goes a step further by using human preferences to make answers safer, more accurate, and aligned with what people prefer.

### Q2: Why is PEFT so popular?
**Answer:** Retraining all weights of a massive LLM is very expensive. PEFT freezes most of the model and only trains a small set of new parameters, saving huge amounts of GPU memory and time.
