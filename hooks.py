# -*- coding: utf-8 -*-
"""MkDocs hooks：构建时为每页注入文件最后修改时间（meta.mtime，YYYY-MM-DD），
供首页「最近更新」按最后修改日期倒序排列并显示。"""
import os
from datetime import datetime


def on_nav(nav, config, files):
    """渲染开始前遍历所有文件，把 src 文件的 mtime 写进对应 Page 的 meta。"""
    for f in files:
        page = getattr(f, "page", None)
        if page is not None and f.abs_src_path.endswith(".md"):
            ts = os.path.getmtime(f.abs_src_path)
            page.meta["mtime"] = datetime.fromtimestamp(ts).strftime("%Y-%m-%d")
    return nav
