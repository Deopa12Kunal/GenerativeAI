# Deployment (07-deployment.md)

> Reference: YouTube Lecture Series by Nitish Singh (CampusX)
> Perspective: The Builder's Perspective (35:35)
> Slide Box: Deployment (Warm Grey (Bottom-Far-Right Box))

## Table of Contents
* Hosting Models via APIs
* Cloud vs Local/Edge Deployment
* Streaming Responses & Scaling

---

## Deployment — Putting the Model Live

## 7. Deployment

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Warm Grey Box (Bottom-Right)**

### What Is It?
**Deployment** is the final stage of the Builder's journey—taking a trained, optimized, and evaluated model and making it live so real users and software applications can use it.

### Core Ideas
* **API Endpoint**: Exposes the model so websites and mobile apps can send requests and get responses.
* **Cloud vs On-Device**: Choosing between powerful cloud GPUs (for large models) or local devices (for privacy and offline use).
* **Reliability & Scaling**: Making sure the server stays fast even when thousands of users send prompts at the same time.


### Self-Check Questions
#### Q1: Why do most AI chat apps stream responses word-by-word instead of waiting until the full answer is ready?
**Answer:** Generating a long answer can take several seconds. Streaming shows the first words right away, making the app feel much faster to the user.


