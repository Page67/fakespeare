# -*- coding: utf-8 -*-
"""MkDocs hooks：构建时为每页注入最后修改时间（meta.mtime，YYYY-MM-DD），
供首页「最近更新」按最后修改日期倒序排列并显示。

优先取 git 最后提交日期（CI 检出后文件 mtime 全是构建时刻，不可用；
需要 actions/checkout 配 fetch-depth: 0 拉全量历史），
文件尚未提交过（本地新稿）时回落到文件 mtime。
"""
import os
import subprocess
from datetime import datetime


def _git_last_commit_date(path):
    """文件最后一次提交的日期（%cs = YYYY-MM-DD），无提交记录或出错返回 None。"""
    try:
        out = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", path],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=10,
        )
    except (OSError, subprocess.SubprocessError):
        return None
    date = out.stdout.strip()
    return date if out.returncode == 0 and date else None


def on_nav(nav, config, files):
    """渲染开始前遍历所有文件，把最后修改日期写进对应 Page 的 meta。"""
    for f in files:
        page = getattr(f, "page", None)
        if page is not None and f.abs_src_path.endswith(".md"):
            date = _git_last_commit_date(f.abs_src_path)
            if date is None:
                ts = os.path.getmtime(f.abs_src_path)
                date = datetime.fromtimestamp(ts).strftime("%Y-%m-%d")
            page.meta["mtime"] = date
    return nav
