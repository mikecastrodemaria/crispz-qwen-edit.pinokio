# crispz-qwen-edit.pinokio

1-click [Pinokio](https://pinokio.computer) launcher for
**[crispz-qwen-edit](https://github.com/mikecastrodemaria/crispz-qwen-edit)** — a
**Qwen-Image** studio with **instruction-based image editing** (Qwen-Image-Edit-2509),
Fooocus-style, 100% local. Fork of crispz-studio.

## What it does

Installs and launches crispz-qwen-edit in one click:

- **Install** — clones `mikecastrodemaria/crispz-qwen-edit` into `app/`, creates a venv,
  installs PyTorch (CUDA cu128 on NVIDIA / ROCm / MPS / CPU) + the project requirements.
- **Start** — runs `python app.py` and opens the Gradio Web UI.
- **Update** — `git pull` (force) on the launcher and on the app, refreshes deps,
  reasserts the correct torch build.
- **Reset** — removes `app/` (and its venv) to reinstall from scratch.

## Two models, one studio

- **Base — Qwen-Image** (`Qwen/Qwen-Image`): text-to-image + img2img/inpaint, powering the
  whole studio (txt2img, ESRGAN+Qwen refine upscale, reframe/outpaint, styles, Face Swap).
- **Edit tab — Qwen-Image-Edit-2509** (`Qwen/Qwen-Image-Edit-2509`): instruction-based
  editing — give one or more input images + a prompt ("change the background", "remove
  this object"). Loaded as a separate model the first time you use the Edit tab.

Both are **public** Hugging Face repos (no token needed). They download on first use and
are cached afterwards (large: ~20 GB each).

## Requirements

- [Pinokio](https://pinokio.computer) installed.
- An NVIDIA GPU is strongly recommended. Qwen-Image is ~20B, so **CPU offload is enabled
  by default** (`default_cpu_offload: model` in `config.txt`) to fit consumer VRAM; on
  low-VRAM cards try `sequential`. CPU/AMD/Apple are supported by the torch installer but
  will be slow.

## Notes on Qwen

- The "guidance" slider maps to **true CFG** (`true_cfg_scale`, ~3–5, default 4.0), which
  also enables the negative prompt. The distilled `guidance_scale` is fixed at 1.0.
  ~30 steps by default (50 for max quality).
- The Edit tab preserves the input image dimensions (width/height sliders are ignored
  there). Use the 2509 model for multi-image references.

## Optional: Face Swap & Ollama

- **Face Swap** needs extra deps + an inswapper model — see the app's
  `requirements-faceswap.txt` and README (not installed by default).
- **Describe / Improve / Vision Mix** need a local [Ollama](https://ollama.com) with a
  vision model (e.g. `llava`, `qwen-vl`).

## Notes

- `app/`, `env/` and `logs/` are gitignored (created at install time).
- Local user config (`config.txt`) and models stay inside `app/` and are not tracked by
  this launcher repo.
