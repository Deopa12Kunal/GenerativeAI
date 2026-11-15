# Deployment (07-deployment.md)

> **Lecture Series**: Generative AI (Nitish Singh / CampusX)
> **Perspective**: The Builder's Perspective (Timestamp 35:35 / 50:14)
> **Slide Box**: Deployment (Warm Grey (Bottom-Far-Right Box))

## Topics From the Slide
* Hosting Models via APIs
* Cloud vs Local/Edge Deployment
* Streaming Responses & Scaling

---

## Quick Summary

**Core Idea:** Deployment turns a trained model file into a fast, reliable service that apps can call anytime.

* Serving via API: Wrapping the model in a web endpoint so apps can send prompts and receive answers.
* Streaming Output: Sending words back one by one as they are generated so users don’t wait for a long blank screen.
* Cloud vs Local: Running heavy models on cloud GPU servers, or running smaller compressed models directly on user devices.

> **Easy Takeaway:** Deployment is the final step of the Builder view—handing over a working, fast model API for Application Users to build with.

---

## 7. Deployment

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Warm Grey Box (Bottom-Right)**

### What Is It?
**Deployment** is the final stage of the Builder's journey—taking a trained, optimized, and evaluated model and making it live so real users and software applications can use it.

### Core Ideas
* **API Endpoint**: Exposes the model so websites and mobile apps can send requests and get responses.
* **Cloud vs On-Device**: Choosing between powerful cloud GPUs (for large models) or local devices (for privacy and offline use).
* **Reliability & Scaling**: Making sure the server stays fast even when thousands of users send prompts at the same time.


---

## Self-Check Questions

### Q1: Why do most AI chat apps stream responses word-by-word instead of waiting until the full answer is ready?
**Answer:** Generating a long answer can take several seconds. Streaming shows the first words right away, making the app feel much faster to the user.
