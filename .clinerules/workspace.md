# Workspace Rules — 无限猴子打字机

本规则适用于 `d:/Codes/DevLog/MkDocs` 工作区，Cline 在处理本项目的任何任务时都必须遵守。

---

## 1. 项目类型

这是一个基于 **Material for MkDocs** 搭建的个人工作日志/项目记录站点。

- 站点配置：`mkdocs.yml`
- 文档源文件：`docs/`
- 自定义首页模板：`overrides/home.html`
- 自定义样式：`docs/stylesheets/extra.css`

---

## 2. 博文图片管理规则（强制）

### 2.1 存储位置

每篇博文用到的图片必须存放在该博文同目录下的 `pics/<博文文件名>/` 子文件夹中。

同时适用于 `docs/blog/posts/` 和 `docs/project/posts/` 两个目录。

```
docs/project/posts/
├── 2026-07-13-HKMCTW.md
└── pics/
    └── 2026-07-13-HKMCTW/
        ├── image-1.png
        ├── image-2.png
        └── image-3.png
```

- `<博文文件名>` 指 `.md` 文件的完整名称（不含扩展名）。
- **禁止**将图片直接放在 `posts/` 根目录下。
- 没有图片的博文，其对应子文件夹可以留空，但仍建议预先创建。

### 2.2 命名规则

图片按 Markdown 文件中的**出现顺序**重新编号：

```
image-1.png
image-2.png
image-3.png
...
```

- 编号从 `1` 开始，连续递增。
- 每个子文件夹内的编号独立计算。
- 不保留原始文件名中的数字或描述信息。

### 2.3 Markdown 引用路径

博文中引用图片时，必须使用相对路径：

```markdown
![说明文字](pics/<博文文件名>/image-N.png)
```

例如：

```markdown
![香港古迹官网](pics/2026-07-13-HKMCTW/image-3.png)
```

---

## 3. Cline 自动执行流程

当用户要求在某篇博文中添加图片，或检测到 Markdown 中需要插入图片时，Cline 必须按以下步骤自动执行：

1. **确定博文文件名**：从当前编辑的 `.md` 文件获取文件名（不含 `.md`）。
2. **创建子文件夹**：在该博文同目录下的 `pics/` 下创建 `<博文文件名>/` 子文件夹（如果不存在）。
3. **扫描已有图片**：列出该子文件夹下所有 `image-*.png` 文件，找出当前最大编号。
4. **分配新编号**：新图片编号为 `max + 1`。
5. **重命名并移动图片**：将用户提供的图片文件重命名为 `image-N.png`，并移入该子文件夹。
6. **更新 Markdown**：在博文中插入 `![说明文字](pics/<博文文件名>/image-N.png)`。
7. **禁止行为**：
   - 不要将图片放在 `posts/` 根目录。
   - 不要使用 `image.png`、`image-12.png` 等非连续编号命名。
- 不要跨博文复用图片文件（每篇博文独立管理）。

---

## 4. Git 提交规范

- 修改完成后，主动检查 `git status`，确认只包含预期变更。
- 使用 `git add` 和 `git commit` 提交更改。
- **用户未明确说推送时，不要执行 `git push`。**
- 如果用户要求推送，使用 `git push origin HEAD`。

---

## 5. 新建博文时的默认操作

当用户要求创建一篇新博文时，Cline 应同时：

1. 在 `docs/blog/posts/` 或 `docs/project/posts/` 下创建 Markdown 文件。
2. 在对应 `posts/pics/` 下创建 `<博文文件名>/` 子文件夹（即使暂时无图）。
3. 在 Markdown 文件头部添加标准 frontmatter：

```yaml
---
title: 标题
date: YYYY-MM-DD
categories:
  - 项目细部
tags:
  - projects
---
```

---

## 6. 通用工作纪律

- 中文回答，英文代码/文件名/命令。
- 实施前先确认方案，非平凡任务遵循 Plan → Act → Verify 节奏。
- 只修改与任务相关的文件和行。
- 修改完成后主动运行 `mkdocs build --clean` 或 `mkdocs serve` 验证（如环境允许）。
- 提交前检查 `git status`，避免误删图片或构建产物。
