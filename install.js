module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    // Clone crispz-qwen-edit into the local app/ folder
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/mikecastrodemaria/crispz-qwen-edit app"
        ]
      }
    },
    // Install crispz-qwen-edit dependencies (core + extras) in a dedicated venv
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r requirements.txt",
          "uv pip install -r requirements-extra.txt"
        ]
      }
    },
    // Install PyTorch (CUDA cu128 on NVIDIA / ROCm / MPS / CPU) cross-platform
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app"
        }
      }
    },
    // Verify the installed diffusers really exposes the Qwen-Image pipelines.
    // Without them the app imports fine and only fails at the first render, which
    // is a confusing place to discover a dependency problem.
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "python -c \"from diffusers import QwenImagePipeline, QwenImageInpaintPipeline; print('Qwen-Image pipelines OK')\""
        ]
      }
    },
    // Deduplicate the venv to save disk space
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    }
  ]
}
