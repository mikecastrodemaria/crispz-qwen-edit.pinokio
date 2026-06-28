module.exports = {
  run: [
    // Force-update the launcher repo to exactly match its origin (main)
    {
      method: "shell.run",
      params: {
        message: [
          "git fetch origin",
          "git reset --hard origin/main"
        ]
      }
    },
    // Force-update crispz-qwen-edit (app) to exactly match its origin (main)
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "git fetch origin",
          "git reset --hard origin/main"
        ]
      }
    },
    // Refresh dependencies (in case requirements changed).
    // Note: this can pull a generic torch wheel that overrides the CUDA build,
    // so torch.js is re-run right after to restore the correct, consistent torch.
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
    // Reassert the correct torch build (CUDA cu128 / ROCm / MPS / CPU) so that
    // updating dependencies never leaves a mismatched torch (WinError 127).
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app"
        }
      }
    }
  ]
}
