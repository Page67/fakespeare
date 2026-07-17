# Workspace Rules — 无限猴子打字机

MkDocs 工作日志站点：`mkdocs.yml` → `docs/` → `overrides/home.html`。

---

## 1. 图片管理（强制）

- **存放位置**：每篇博文的图片必须放在该博文同目录下的 `pics/<博文文件名>/` 子文件夹中。
  同时适用于 `docs/blog/posts/` 和 `docs/project/posts/`。
- **命名规则**：按 Markdown 中出现顺序命名为 `image-1.png`、`image-2.png`…，每个子文件夹独立编号。
- **引用路径**：`![说明文字](pics/<博文文件名>/image-N.png)`
- **禁止**：不要把图片直接放在 `posts/` 根目录；不要跨博文复用图片。

### 添加图片时自动执行

1. 确定当前 `.md` 文件名（不含扩展名）。
2. 在 `pics/` 下创建 `<博文文件名>/` 子文件夹（如果不存在）。
3. 扫描该子文件夹中 `image-*.png`，取最大编号 +1 作为新编号。
4. 将图片重命名为 `image-N.png` 并移入子文件夹。
5. 在 Markdown 中插入 `![说明文字](pics/<博文文件名>/image-N.png)`。

---

## 2. Git 提交

- 修改后检查 `git status`，确认只含预期变更。
- **用户未明确提出时，不要执行  `git add` `git commit` `git push`。**

