---
name: mac-automation-and-github
description: >-
  Use this skill to autonomously execute macOS system tasks, control local files,
  run Git operations, configure SSH/credentials, publish repositories to GitHub,
  and open browsers or Finder folders directly on the user's Mac.
---

# macOS Automation & GitHub Deployment Skill

This skill equips the Antigravity agent with automated workflows for controlling macOS operations, Git version control, and GitHub deployments.

## 🛠️ Core Capabilities

### 1. Automatic Git Repository Initialization & Commit
When files are created or modified:
- Check Git status with `git status`.
- Stage all changes with `git add .`.
- Create clean semantic commit messages: `git commit -m "feat: <description>"`.

### 2. GitHub Remote Deployment Workflow
To publish a local repository to GitHub:
1. Verify Git remote configuration: `git remote -v`.
2. If remote does not exist:
   ```bash
   git remote add origin https://github.com/<username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. If token or credential helper is needed, configure:
   ```bash
   git config --global credential.helper osxkeychain
   ```

### 3. macOS System & App Launch Automation
- Open websites or HTML files in default browser:
  ```bash
  open <path-to-file.html>
  ```
- Reveal folders in macOS Finder:
  ```bash
  open <path-to-directory>
  ```
- Open specific applications:
  ```bash
  open -a "<Application Name>" <path>
  ```

## 📋 Best Practices
- Always execute operations with appropriate error handling.
- When pushing to GitHub, automatically check the current branch and upstream tracking.
