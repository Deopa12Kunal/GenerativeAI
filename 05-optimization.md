# Optimization (05-optimization.md)

> Reference: YouTube Lecture "Generative AI: The Builder's Perspective" by Nitish Singh (CampusX, Timestamp 35:35)
> Slide Box: Optimization (Pink/Coral (Center-Bottom Box))

## Table of Contents
* Training Optimization
* Model compression
* Optimizing Inference

---

## Optimization: Training, Compression & Inference

## 5. Optimization

> 📸 **Slide Reference**: *The Builder's Perspective* (35:35 / 50:14) · **Pink Box (Center-Bottom)**

Large models are heavy and expensive. The slide breaks optimization down into **3 stages**:

1. **Training Optimization**: Making model training run faster and fit inside available GPU memory.
2. **Model compression**: Reducing the size of a trained model so it takes less space and runs on cheaper hardware.
3. **Optimizing Inference**: Making the live model generate replies faster and handle many users at the same time.


### Key Technical Interview Q&A
#### Q1: Why is Model Compression important?
**Answer:** Large models can take hundreds of gigabytes of memory. Compression shrinks them down so they cost less to host and can even run on consumer laptops or phones.


