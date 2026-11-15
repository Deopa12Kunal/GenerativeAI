# Optimization (05-optimization.md)

> **Lecture Series**: Generative AI (Nitish Singh / CampusX)
> **Perspective**: The Builder's Perspective (Timestamp 35:35 / 50:14)
> **Slide Box**: Optimization (Pink/Coral (Center-Bottom Box))

## Topics From the Slide
* Training Optimization
* Model compression
* Optimizing Inference

---

## Quick Summary

**Core Idea:** Optimization makes huge AI models practical—faster to train, smaller to store, and quicker to reply.

* Training Optimization: Techniques that reduce GPU memory usage and speed up the training loop.
* Model compression: Shrinking the model file size (for example, storing numbers with fewer decimals—called quantization—or trimming unused connections) without hurting accuracy too much.
* Optimizing Inference: Speeding up how fast the finished model generates responses when real users send prompts.

> **Easy Takeaway:** Without optimization, large models are too slow and expensive to run for everyday users.

---

## 5. Optimization

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Pink Box (Center-Bottom)**

Large models are heavy and expensive. The slide breaks optimization down into **3 stages**:

1. **Training Optimization**: Making model training run faster and fit inside available GPU memory.
2. **Model compression**: Reducing the size of a trained model so it takes less space and runs on cheaper hardware.
3. **Optimizing Inference**: Making the live model generate replies faster and handle many users at the same time.


---

## Self-Check Questions

### Q1: Why is Model Compression important?
**Answer:** Large models can take hundreds of gigabytes of memory. Compression shrinks them down so they cost less to host and can even run on consumer laptops or phones.
