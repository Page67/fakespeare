---
title: GLRule 改写
date: 2026-07-10
categories:
  - 项目细部
tags:
  - projects
  - histmap
  - Agent
---

# Agent Global Rules 改写

## 前情提要

1. 背景

使用Agent辅助编程进行项目开发时，撰写 Global Rules（全局规则） 和 Project Rules（项目规则） 供给AI参考，可以更有效地推进项目顺利进行。

2. 初次交流

作者在项目开发中途先手写了一版规则，然后让AI结合26年初很有名的Andrej Karpathy给出的AI编程建议对该规则进行修改完善。AI第一次为我生成了3个全局规则文件和6个项目规则文件……考虑到规则文件是Agent要频繁默认读取的，沟通后最终形成3个全局规则和2个项目规则文件。

![和柴鸡的对话1](image-5.png)
![和柴鸡的对话2-Karpathy](image-8.png)
![柴鸡GLRules建议](image-6.png)
![柴鸡PJRules建议](image-7.png)
![和柴鸡的对话3-简化规则文件](image-9.png)

3. 存疑

经过一段时间的开发后，尤其是观察Agent的具体思考过程后，作者发现若干问题，比如：

- Plan重复做
- Rule里有一些属于Skills、workflow或其他具体操作范畴的内容
- 长期后遗忘
- 3个全局规则文件稍显冗余

遂改之。

## 改写结果

改写后变为一个文件7条规则。重点包括：

- 英文操作，中文回答。
- Clarify before implementation.
- Plan -> Act -> Verify 工作节奏
- 未经允许不要随意更改文件和系统设置
- 多Agent不要同时修改同一个文件夹/文件。
