# 无限猴子打字机

> 编程项目记录与技术分享 —— 基于 Material for MkDocs 搭建的个人工作日志站点。

## 项目简介

本站点用于记录项目开发进度、踩坑经历和技术分享，使用 [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) 搭建，部署在 GitHub Pages。

- **仓库**：https://github.com/Page67/fakespeare
- **作者**：uki

## 目录结构

```
MkDocs/
├── mkdocs.yml                  # MkDocs 主配置文件
├── authors.yml                 # 作者信息
├── .gitignore                  # Git 忽略规则
├── README.md                   # 本文件
├── MkDocs-Material-学习笔记.md  # Material 主题配置参考笔记
│
├── docs/                       # 文档源文件
│   ├── index.md                # 首页（自定义 Hero 横幅）
│   ├── blog/                   # 工作日志
│   │   ├── index.md
│   │   └── posts/
│   │       ├── 2026-06-16-hello.md       # 搭建 MkDocs 工作日志
│   │       └── 2026-06-24-name.md        # 更名记录
│   ├── project/                # 项目讲解
│   │   ├── index.md
│   │   └── posts/
│   │       ├── 2026-07-09-intro.md       # 项目简介
│   │       ├── 2026-07-10-glrulerewrite.md
│   │       ├── 2026-07-11-bndry.md
│   │       ├── 2026-07-12-GISimport.md
│   │       └── 2026-07-13-taiwan.md
│   └── stylesheets/
│       └── extra.css           # 自定义样式（Hero 横幅）
│
├── overrides/                  # 主题模板覆盖
│   └── home.html               # 自定义首页模板
│
└── pics/                       # 截图素材
```

## 当前配置状态

| 配置项 | 状态 | 说明 |
|--------|------|------|
| 站点名称 | ✅ | 无限猴子打字机 |
| 主题 | ✅ | Material for MkDocs |
| 语言 | ✅ | 中文 (zh) |
| 亮暗模式 | ✅ | default / slate 双模式切换 |
| 主色/强调色 | ✅ | blue / blue |
| 首页 Hero 横幅 | ✅ | 自定义模板 + CSS |
| 顶部标签导航 | ✅ | `navigation.tabs` |
| 回到顶部 | ✅ | `navigation.top` |
| 搜索建议 | ✅ | `search.suggest` |
| 代码复制 | ✅ | `content.code.copy` |
| 博客插件 | ✅ | `blog` |
| 代码高亮 | ✅ | `pymdownx.highlight` + `superfences` |
| 目录永久链接 | ✅ | `toc.permalink` |
| `.gitignore` | ✅ | 排除 `site/` 构建输出 |

## 已完成工作

1. **站点搭建** — 使用 Material for MkDocs 创建站点，配置中文语言、蓝色主题、亮暗模式切换
2. **首页定制** — 自定义 `home.html` 模板实现 Hero 横幅，含大标题、副标题、两个跳转按钮
3. **内容结构** — 建立工作日志（2 篇）和项目讲解（5 篇）两大板块
4. **站点更名** — 从默认名称改为"无限猴子打字机"，GitHub 仓库改为 fakespeare
5. **学习笔记** — 整理 `MkDocs-Material-学习笔记.md`，涵盖颜色、字体、导航、博客、标签等 14 个章节的配置参考
6. **Git 规范** — 创建 `.gitignore`，排除 `site/` 构建输出和临时文件

## 下一步计划

### 主题外观
- [ ] 调整配色方案（primary / accent）
- [ ] 配置中文字体（如 Noto Sans SC）
- [ ] 添加 Logo 和 favicon
- [ ] 优化 Hero 横幅样式

### 导航与功能
- [ ] 配置 `site_url`（影响 SEO、社交卡片）
- [ ] 添加 `repo_url` / `repo_name`（GitHub 仓库链接）
- [ ] 启用 `navigation.footer`（页脚上下页导航）
- [ ] 启用 `navigation.sections`（侧边栏分组）
- [ ] 启用 `navigation.indexes`（章节索引页）
- [ ] 启用 `search.highlight`（搜索结果高亮）
- [ ] 启用 `content.code.annotate`（代码注释）

### 内容增强
- [ ] 为 `project/` 启用 projects 插件或手动管理文章列表
- [ ] 启用 tags 插件，添加标签索引页
- [ ] 补充 Markdown 扩展（admonition、content tabs、emoji 等）
- [ ] 添加社交链接（`extra.social`）
- [ ] 考虑添加 RSS 订阅

### 部署
- [ ] 配置 GitHub Pages 自动部署（GitHub Actions）
- [ ] 确认 `site_url` 与实际部署地址一致

## 本地预览

```bash
# 启动本地预览服务器（默认 http://127.0.0.1:8000）
mkdocs serve

# 构建静态站点到 site/
mkdocs build --clean
```

## 参考文档

- [Material for MkDocs 官方文档](https://squidfunk.github.io/mkdocs-material/)
- [项目内学习笔记](MkDocs-Material-学习笔记.md)