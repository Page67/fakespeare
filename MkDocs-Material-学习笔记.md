# Material for MkDocs 学习笔记

> 本笔记基于官方文档 (https://squidfunk.github.io/mkdocs-material/) 整理，供 agent 后续操作参考。
> 整理时间：2026-07-12

---

## 目录

1. [项目现状分析](#1-项目现状分析)
2. [颜色配置](#2-颜色配置)
3. [字体配置](#3-字体配置)
4. [语言配置](#4-语言配置)
5. [Logo 与图标](#5-logo-与图标)
6. [导航配置](#6-导航配置)
7. [博客配置](#7-博客配置)
8. [标签配置](#8-标签配置)
9. [页眉配置](#9-页眉配置)
10. [页脚配置](#10-页脚配置)
11. [Git 仓库集成](#11-git-仓库集成)
12. [Markdown 扩展](#12-markdown-扩展)
13. [常用自定义模式](#13-常用自定义模式)
14. [快速参考卡](#14-快速参考卡)

---

## 1. 项目现状分析

### 当前文件结构

```
d:\Codes\DevLog\MkDocs\
├── mkdocs.yml              # 主配置文件
├── authors.yml             # 作者信息
├── docs/
│   ├── index.md            # 首页（使用自定义 home.html 模板）
│   ├── blog/
│   │   ├── index.md        # 博客首页
│   │   └── posts/
│   │       ├── 2026-06-16-hello.md
│   │       └── 2026-06-24-name.md
│   ├── project/
│   │   ├── index.md        # 项目讲解首页
│   │   └── posts/
│   │       ├── 2026-07-09-intro.md
│   │       ├── 2026-07-10-glrulerewrite.md
│   │       ├── 2026-07-11-bndry.md
│   │       ├── 2026-07-12-GISimport.md
│   │       └── 2026-07-13-taiwan.md
│   └── stylesheets/
│       └── extra.css       # 自定义样式（Hero 横幅）
├── overrides/
│   └── home.html           # 自定义首页模板
└── site/                   # 构建输出（勿手动修改）
```

### 当前 mkdocs.yml 配置要点

| 配置项 | 当前值 | 说明 |
|--------|--------|------|
| `site_name` | 无限猴子打字机 | 站点名称 |
| `site_description` | 编程项目记录与技术分享 | 站点描述 |
| `site_author` | uki | 作者 |
| `theme.name` | material | Material 主题 |
| `theme.language` | zh | 中文 |
| `theme.custom_dir` | overrides | 自定义模板目录 |
| `palette` | default/slate 双模式 | 亮暗切换，primary/accent 均为 blue |
| `features` | navigation.tabs, navigation.top, search.suggest, content.code.copy | 已启用功能 |
| `plugins` | search, blog | 已启用插件 |
| `extra_css` | stylesheets/extra.css | Hero 横幅样式 |

### 待改进项

- [ ] `project/` 下有 5 篇文章但 `nav` 中只指向 `project/index.md`，未启用 projects 插件
- [ ] 未配置 `site_url`（影响 SEO、社交卡片、RSS）
- [ ] 未配置 `repo_url` / `repo_name`（无 GitHub 仓库链接）
- [ ] 未配置社交链接（`extra.social`）
- [ ] 未配置字体（使用默认 Roboto）
- [ ] 未配置 Logo 和 favicon
- [ ] 未启用 `navigation.footer`（页脚上下页导航）
- [ ] 未启用 `navigation.sections`（侧边栏分组）
- [ ] 未启用 `content.code.annotate`（代码注释）
- [ ] Markdown 扩展较少，未启用 admonition、content tabs、grids 等常用扩展

---

## 2. 颜色配置

### 颜色方案（Color Scheme）

两种内置方案：`default`（亮色）和 `slate`（暗色）。

```yaml
theme:
  palette:
    scheme: default  # 或 slate
```

### 主色（Primary Color）

用于页眉、侧边栏、文本链接等。默认 `indigo`。

```yaml
theme:
  palette:
    primary: indigo
```

**可用主色（20 种）：**

`red` · `pink` · `purple` · `deep purple` · `indigo` · `blue` · `light blue` · `cyan` · `teal` · `green` · `light green` · `lime` · `yellow` · `amber` · `orange` · `deep orange` · `brown` · `grey` · `blue grey` · `black` · `white`

### 强调色（Accent Color）

用于可交互元素（悬停链接、按钮、滚动条）。默认 `indigo`。

```yaml
theme:
  palette:
    accent: indigo
```

**可用强调色（16 种）：** 同主色但不含 `brown` · `grey` · `blue grey` · `black` · `white`

### 亮暗模式切换

```yaml
theme:
  palette:
    - scheme: default
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-7  # 亮色图标
        name: 切换至暗色模式
    - scheme: slate
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-4  # 暗色图标
        name: 切换至亮色模式
```

### 自定义颜色（CSS 变量）

在 `docs/stylesheets/extra.css` 中覆盖：

```css
:root {
  --md-primary-fg-color:        #ff0000;
  --md-primary-fg-color--light: #ff5555;
  --md-primary-fg-color--dark:  #cc0000;
  --md-primary-bg-color:        #ffffff;
  --md-primary-bg-color--light: #ffffff;
}

/* 暗色模式 */
[data-md-color-scheme="slate"] {
  --md-primary-fg-color:        #1a1a1a;
  --md-default-bg-color:        #1e1e1e;
}
```

**常用 CSS 变量：**

| 变量名 | 用途 |
|--------|------|
| `--md-primary-fg-color` | 主色前景 |
| `--md-primary-bg-color` | 主色背景 |
| `--md-accent-fg-color` | 强调色 |
| `--md-default-bg-color` | 页面背景 |
| `--md-default-fg-color` | 页面文字 |
| `--md-code-bg-color` | 代码块背景 |
| `--md-code-fg-color` | 代码块文字 |

---

## 3. 字体配置

### 正文字体

默认 `Roboto`，可设为任何 Google Font：

```yaml
theme:
  font:
    text: Roboto
```

> 字体以 300、400、*400i* 和 **700** 字重加载。

### 等宽字体

默认 `Roboto Mono`，用于代码块：

```yaml
theme:
  font:
    code: Roboto Mono
```

### 禁用 Google Fonts 加载

```yaml
theme:
  font: false
```

### 自定义字体

在 `docs/stylesheets/extra.css` 中定义：

```css
@font-face {
  font-family: "MyFont";
  src: url("../assets/MyFont.woff2") format("woff2");
}

:root {
  --md-text-font: "MyFont";    /* 正文字体 */
  --md-code-font: "MyCodeFont"; /* 等宽字体 */
}
```

> **注意**：始终通过 CSS 变量定义字体，不要直接用 `font-family`，否则会禁用系统字体回退。

### 中文字体推荐

```yaml
theme:
  font:
    text: Noto Sans SC
    code: JetBrains Mono
```

---

## 4. 语言配置

### 站点语言

```yaml
theme:
  language: zh  # 中文
```

**常用语言代码：** `zh`（中文）、`en`（英文）、`ja`（日语）、`ko`（韩语）、`fr`（法语）、`de`（德语）

### 多语言站点

需要使用 `mkdocs-static-i18n` 插件，通过不同子目录或文件后缀管理多语言内容。

---

## 5. Logo 与图标

### Logo

**使用图片**（放在 `docs/` 下）：

```yaml
theme:
  logo: assets/logo.png
```

**使用内置图标**（8,000+ 可选）：

```yaml
theme:
  icon:
    logo: material/library
```

### Favicon

```yaml
theme:
  favicon: images/favicon.png
```

### 自定义 Logo 跳转链接

```yaml
extra:
  homepage: https://example.com
```

### 可自定义的站点图标

```yaml
theme:
  icon:
    previous: fontawesome/solid/angle-left
    next: fontawesome/solid/angle-right
```

| 图标键 | 用途 |
|--------|------|
| `logo` | 站点 Logo |
| `menu` | 打开菜单 |
| `search` | 搜索 |
| `top` | 返回顶部 |
| `edit` | 编辑页面 |
| `view` | 查看源码 |
| `repo` | 仓库图标 |
| `previous` / `next` | 上下页 |

### 自定义图标覆盖

在 `overrides/` 目录下创建对应路径，例如：

```
overrides/.icons/        # 自定义图标目录
overrides/.icons/fontawesome/brands/my-icon.svg
```

---

## 6. 导航配置

### 基本导航

```yaml
nav:
  - 首页: index.md
  - 工作日志:
      - blog/index.md
      - 文章1: blog/posts/post1.md
      - 文章2: blog/posts/post2.md
  - 项目讲解:
      - project/index.md
      - 项目1: project/posts/project1.md
```

> **注意**：如果使用 blog 插件，`nav` 中只需添加博客索引页，不需要列出每篇文章。

### 导航功能特性

```yaml
theme:
  features:
    - navigation.tabs        # 顶部标签式导航
    - navigation.tabs.sticky  # 滚动时标签固定在顶部
    - navigation.sections    # 侧边栏分组显示
    - navigation.expand      # 默认展开所有侧边栏分组
    - navigation.top         # 返回顶部按钮
    - navigation.footer      # 页脚上下页导航
    - navigation.indexes     # 章节索引页
    - search.suggest         # 搜索建议
    - search.highlight       # 搜索结果高亮
    - content.code.copy      # 代码复制按钮
    - content.code.annotate  # 代码注释
    - content.tabs.link      # 内容标签页联动
    - header.autohide        # 滚动时自动隐藏页眉
    - announce.dismiss       # 公告栏可关闭
```

### 章节索引页（navigation.indexes）

配合 `navigation.sections` 使用，可将某个页面设为分组的索引页：

```yaml
nav:
  - Blog:
      - blog/index.md       # ← 索引页（注意缩进，与子项同级）
      - blog/posts/post1.md
```

```yaml
theme:
  features:
    - navigation.indexes
```

---

## 7. 博客配置

### 基本配置

```yaml
plugins:
  - blog
```

### 博客目录结构

```
docs/
├── blog/
│   ├── index.md          # 博客首页（必需）
│   └── posts/
│       ├── 2026-06-16-hello.md
│       └── 2026-06-24-name.md
```

### 文章元数据（Front Matter）

```yaml
---
title: 文章标题
date: 2026-06-16
categories:
  - 环境搭建
tags:
  - mkdocs
  - 教程
authors:
  - uki
draft: false              # 设为 true 则不发布
slug: my-post-slug        # 自定义 URL slug（可选）
---
```

### 博客插件高级配置

```yaml
plugins:
  - blog:
      blog_dir: blog              # 博客目录（默认 blog）
      post_dir: "{blog}/posts"    # 文章目录
      post_date_format: "yyyy-MM-dd"  # 日期格式
      post_url_format: "{date}/{slug}" # URL 格式
      categories: true            # 启用分类
      categories_name: 分类       # 分类页名称
      categories_url_format: "category/{slug}"
      archive: true               # 启用归档
      archive_name: 归档
      archive_url_format: "archive/{date}"
      pagination: true            # 启用分页
      pagination_per_page: 10     # 每页文章数
```

### RSS 订阅

```bash
pip install mkdocs-rss-plugin
```

```yaml
plugins:
  - rss:
      match_path: blog/posts/.*
      date_from_meta:
        as_creation: date
      categories:
        - categories
        - tags
```

### 作者配置（authors.yml）

```yaml
uki:
  name: uki
  description: 码农日志作者
  avatar: https://example.com/avatar.png  # 可选
  url: https://example.com               # 可选
```

---

## 8. 标签配置

### 启用标签插件

```yaml
plugins:
  - tags
```

### 在文章中添加标签

```yaml
---
tags:
  - mkdocs
  - 教程
---
```

### 标签列表页

创建 `docs/tags.md`：

```markdown
---
tags:
  - mkdocs
  - 教程
---
```

或在 `mkdocs.yml` 中配置：

```yaml
plugins:
  - tags:
      tags_file: tags.md  # 标签索引页
```

### 标签插件配置项

```yaml
plugins:
  - tags:
      tags_file: tags.md           # 标签索引页路径
      tags_url_format: "tag/{slug}" # 标签 URL 格式
```

---

## 9. 页眉配置

### 自动隐藏

```yaml
theme:
  features:
    - header.autohide
```

### 公告栏

在 `overrides/` 中创建模板覆盖 `announce` 块：

```html
{% extends "base.html" %}

{% block announce %}
  <span>📢 公告内容写在这里</span>
{% endblock %}
```

### 公告栏可关闭

```yaml
theme:
  features:
    - announce.dismiss
```

---

## 10. 页脚配置

### 页脚上下页导航

```yaml
theme:
  features:
    - navigation.footer
```

### 社交链接

```yaml
extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/Page67
      name: GitHub
    - icon: fontawesome/brands/x-twitter
      link: https://x.com/username
    - icon: fontawesome/solid/envelope
      link: mailto:email@example.com
```

### 版权声明

```yaml
extra:
  copyright: © 2026 uki
```

### 自定义页脚

覆盖 `overrides/main.html` 中的 `footer` 块：

```html
{% extends "base.html" %}

{% block footer %}
  <footer class="md-footer">
    <!-- 自定义页脚内容 -->
  </footer>
{% endblock %}
```

---

## 11. Git 仓库集成

### 基本配置

```yaml
repo_url: https://github.com/Page67/fakespeare
repo_name: Page67/fakespeare
```

### 编辑链接

```yaml
repo_url: https://github.com/Page67/fakespeare
edit_uri: edit/main/docs/    # 编辑链接路径
```

> `edit_uri` 是相对于 `repo_url` 的路径。`edit/main/docs/` 表示点击编辑按钮会跳转到 GitHub 上 `main` 分支的 `docs/` 目录。

### 显示仓库统计

```yaml
theme:
  features:
    - repo.count        # 显示 star 数
```

### 修订日期

需要 `mkdocs-git-revision-date-localized-plugin`：

```bash
pip install mkdocs-git-revision-date-localized-plugin
```

```yaml
plugins:
  - git-revision-date-localized:
      enable_creation_date: true
      type: date
```

---

## 12. Markdown 扩展

### 当前已启用

```yaml
markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.superfences
  - toc:
      permalink: true
```

### 推荐补充启用的扩展

```yaml
markdown_extensions:
  # 代码高亮
  - pymdownx.highlight:
      anchor_linenums: true
      line_spans: __span
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.superfences

  # 提示框（Admonition）
  - admonition
  - pymdownx.details

  # 内容标签页
  - pymdownx.tabbed:
      alternate_style: true

  # 目录
  - toc:
      permalink: true

  # 表格、列表、删除线等
  - tables
  - def_list
  - attr_list
  - md_in_html
  - pymdownx.tasklist:
      custom_checkbox: true

  # 表情符号和图标
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg

  # 网格、卡片
  - pymdownx.superfences  # 已包含

  # 键盘按键
  - pymdownx.keys

  # 标记/高亮
  - pymdownx.mark
  - pymdownx.tilde
```

### 常用 Markdown 语法示例

**提示框（Admonition）：**

```markdown
!!! note "备注"
    这是一个备注提示框。

!!! warning "警告"
    这是一个警告提示框。

??? tip "可折叠提示"
    点击展开的内容。
```

**内容标签页：**

```markdown
=== "Tab 1"
    内容 1

=== "Tab 2"
    内容 2
```

**代码注释：**

```yaml
theme:
  features:
    - content.code.annotate
```

```python
def hello():  # (1)!
    print("Hello")  # (2)!
```

1. 定义函数
2. 打印输出

---

## 13. 常用自定义模式

### 自定义首页 Hero 横幅（当前项目已使用）

**`overrides/home.html`：**

```html
{% extends "base.html" %}

{% block tabs %}
  {{ super() }}
  <section class="cl-hero">
    <div class="cl-hero__inner md-grid md-typeset">
      <div class="cl-hero__content">
        <h1>大标题</h1>
        <p>{{ config.site_description }}</p>
        <a href="{{ 'blog/' | url }}" class="md-button md-button--primary">主按钮</a>
        <a href="{{ 'project/' | url }}" class="md-button">次按钮</a>
      </div>
    </div>
  </section>
{% endblock %}
```

**`docs/index.md` 的 Front Matter：**

```yaml
---
template: home.html
hide:
  - navigation
  - toc
---
```

### 模板覆盖可用块

| 块名 | 用途 |
|------|------|
| `tabs` | 导航栏区域 |
| `announce` | 公告栏 |
| `header` | 页眉 |
| `footer` | 页脚 |
| `content` | 主内容区 |
| `scripts` | 底部脚本 |

### Jinja2 模板变量

| 变量 | 说明 |
|------|------|
| `config.site_name` | 站点名 |
| `config.site_description` | 站点描述 |
| `config.site_author` | 作者 |
| `config.site_url` | 站点 URL |
| `page.title` | 当前页标题 |
| `page.url` | 当前页 URL |
| `nav` | 导航对象 |

---

## 14. 快速参考卡

### 完整 mkdocs.yml 模板（推荐配置）

```yaml
site_name: 无限猴子打字机
site_description: 编程项目记录与技术分享
site_author: uki
site_url: https://page67.github.io/fakespeare/

repo_url: https://github.com/Page67/fakespeare
repo_name: Page67/fakespeare
edit_uri: edit/main/docs/

theme:
  name: material
  language: zh
  custom_dir: overrides
  logo: assets/logo.png              # 可选
  favicon: images/favicon.png        # 可选
  font:
    text: Noto Sans SC               # 中文字体推荐
    code: JetBrains Mono
  palette:
    - scheme: default
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-7
        name: 切换至暗色模式
    - scheme: slate
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-4
        name: 切换至亮色模式
  features:
    - navigation.tabs
    - navigation.tabs.sticky
    - navigation.sections
    - navigation.top
    - navigation.footer
    - navigation.indexes
    - search.suggest
    - search.highlight
    - content.code.copy
    - content.code.annotate
    - header.autohide

extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/Page67
      name: GitHub
  homepage: https://page67.github.io/fakespeare/

extra_css:
  - stylesheets/extra.css

plugins:
  - search
  - blog
  - tags:
      tags_file: tags.md

markdown_extensions:
  - admonition
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
  - toc:
      permalink: true
  - attr_list
  - md_in_html
  - def_list
  - tables

nav:
  - 首页: index.md
  - 工作日志: blog/index.md
  - 项目讲解: project/index.md
  - 标签: tags.md
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `mkdocs serve` | 启动本地预览（默认 127.0.0.1:8000） |
| `mkdocs serve --dev-addr 127.0.0.1:8000` | 指定地址端口 |
| `mkdocs build` | 构建静态站点到 `site/` |
| `mkdocs build --clean` | 构建前清理 `site/` |
| `mkdocs new [dir]` | 创建新项目 |
| `pip install mkdocs-material` | 安装 Material 主题 |
| `pip install mkdocs-material=="9.*"` | 锁定大版本安装 |

### 官方文档索引

| 主题 | URL |
|------|-----|
| Getting Started | https://squidfunk.github.io/mkdocs-material/getting-started/ |
| Changing the colors | https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/ |
| Changing the fonts | https://squidfunk.github.io/mkdocs-material/setup/changing-the-fonts/ |
| Changing the language | https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/ |
| Changing the logo and icons | https://squidfunk.github.io/mkdocs-material/setup/changing-the-logo-and-icons/ |
| Setting up navigation | https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/ |
| Setting up a blog | https://squidfunk.github.io/mkdocs-material/setup/setting-up-a-blog/ |
| Setting up tags | https://squidfunk.github.io/mkdocs-material/setup/setting-up-tags/ |
| Setting up the header | https://squidfunk.github.io/mkdocs-material/setup/setting-up-the-header/ |
| Setting up the footer | https://squidfunk.github.io/mkdocs-material/setup/setting-up-the-footer/ |
| Adding a git repository | https://squidfunk.github.io/mkdocs-material/setup/adding-a-git-repository/ |
| Reference (Admonitions, Code blocks, etc.) | https://squidfunk.github.io/mkdocs-material/reference/ |
| Plugins | https://squidfunk.github.io/mkdocs-material/plugins/ |

---

## 附：Agent 操作注意事项

1. **修改 `mkdocs.yml` 后**：`mkdocs serve` 会自动检测变化并重建，无需重启
2. **修改 `overrides/` 模板后**：需要手动刷新浏览器页面
3. **修改 `extra.css` 后**：自动热重载
4. **`site/` 目录**：是构建输出，不要手动修改，`.gitignore` 应忽略
5. **中文搜索**：需要 `jieba` 分词支持（已安装）
6. **blog 插件的 nav**：只需添加 `blog/index.md`，文章会自动列出
7. **projects 插件**：如果要让 `project/` 也像 blog 一样自动列出文章，可启用 `projects` 插件
8. **图片路径**：Markdown 中使用相对路径，如 `![描述](image.png)`，图片与文章同目录