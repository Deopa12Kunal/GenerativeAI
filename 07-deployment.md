# Deployment (07-deployment.md)

> Reference: YouTube Lecture "Generative AI: The Builder's Perspective" by Nitish Singh (CampusX, Timestamp 35:35)
> Slide Box: Deployment (Warm Grey/Stone (Right-Bottom Right Box))

## Table of Contents
* Serving Frameworks (vLLM, TGI, Triton, Ollama)
* Edge vs Cloud Deployment
* API Design & Server-Sent Events (SSE) Streaming
* Observability (TTFT vs ITL) & Safety Guardrails

---

## Deployment: Serving Engines, Streaming & Latency SLA

## 7. Deployment

> 📸 **Slide Reference**: YouTube Lecture *The Builder's Perspective* (35:35 / 50:14) | **Box 7: Deployment (Warm Grey)**

### Latency Anatomy: Prefill vs Decode

```
User Prompt -> [1. Prefill Phase (Compute-Bound)] -> First Token -> [2. Decode Phase (Bandwidth-Bound)] -> Output Tokens
                └── TTFT (Time to First Token) ──┘                  └── ITL (Inter-Token Latency) ────┘
```

---

### Serving Stack Comparison

| Engine | Best For | Continuous Batching | Quantization Support |
| :--- | :--- | :--- | :--- |
| **vLLM** | High-throughput Cloud GPUs | Yes (PagedAttention) | AWQ, GPTQ, FP8, INT4 |
| **TGI** | Hugging Face ecosystem | Yes | AWQ, GPTQ, BitsAndBytes |
| **Ollama / llama.cpp** | Local edge (Mac M1/M2/M3, Laptop) | Basic | GGUF (2-8 bit) |
| **Triton** | Heterogeneous enterprise stacks | Yes | TensorRT-LLM, ONNX, vLLM |

---

### Guardrails Checklist
* **Input Stage**: Detect prompt injections, jailbreaks, PII scrubbing.
* **In-Flight Stage**: Streaming moderation (drop connection if safety threshold breached).
* **Output Stage**: Structured JSON schema adherence validation.


### Key Technical Interview Q&A
#### Q1: What is Continuous Batching (In-Flight Batching)?
**Answer:** Instead of waiting for all sequences in a batch to finish generation, continuous batching evicts completed requests at each token iteration and immediately inserts new requests, boosting GPU utilization by 3-5x.


