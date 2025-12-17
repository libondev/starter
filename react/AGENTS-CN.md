# AGENTS-CN.md - AI 助手指南

本文档为 AI 助手在本项目工作时提供指导规范，请仔细遵循以确保代码质量、一致性和安全性。

## 项目概览

### 技术栈
- React 19 + TypeScript + Vite
- Zustand + Immer (状态管理)
- React Router v7 (路由)
- Alova v3 (API请求)
- Tailwind CSS v4 (样式)
- Vitest + Testing Library (测试)
- OxLint + OxFmt (代码规范)
- pnpm (包管理器)

### 目录结构
```
src/
├── apis/           # API 接口定义
├── components/     # 通用组件
├── hooks/          # 自定义 hooks
├── icons/          # 图标组件
├── layouts/        # 页面布局
├── pages/          # 页面组件
├── routes/         # 路由配置
├── stores/         # Zustand 状态管理
├── styles/         # 全局样式
└── utils/          # 工具函数
```

### 命名规范
- 文件: kebab-case (use-mobile.ts)
- 组件: PascalCase (TodoList.tsx)
- Hooks: usecamelCase (useTodoStore)
- 常量: UPPER_SNAKE_CASE
- 接口: PascalCase (TodoItem)

## Git 提交规范

### 格式
<类型>(<范围>): <主题>

<正文>

<页脚>

### 类型
- feat: 新功能
- fix: 修复 bug
- docs: 文档变更
- style: 格式化 (无功能变更)
- refactor: 重构
- perf: 性能优化
- test: 测试相关
- chore: 构建/配置
- revert: 回退提交

### 规则
- 主题: 最大 50 字符, 祈使语气, 不以句号结尾
- 正文: 可选, 每行 72 字符
- 页脚: Fixes #123, BREAKING CHANGE: ...

### 示例
feat(api): 添加用户认证
使用 Alova 实现 JWT。
Fixes #45

fix(modal): 修复背景点击问题
BREAKING CHANGE: onClose 现在接收事件对象

## 开发命令
pnpm dev, pnpm build, pnpm test, pnpm lint, pnpm lint:fix, pnpm format

## 核心模块
- **use-fetch.ts**: Alova 封装, useGet/usePost 等
- **use-todo-store.ts**: Zustand 模式, Immer 更新

## 安全与性能
- ❌ 无硬编码凭证
- ❌ 无敏感客户端数据
- ✅ 使用 useCallback/useMemo
- ✅ 组件纯净, 副作用在 hooks 中

## AI 助手规范
1. 读取前使用 find_path 确认路径
2. 优先使用 edit_file 而非重写
3. 先规划架构, 先定义类型
4. 不确定时询问用户
5. 大修改前先展示计划
6. 复杂任务分步骤执行

## 常见场景
**添加页面**: 创建 src/pages → routes → store (如需) → API → 类型 → lint → 测试
**更新状态**: 打开 store → 用 Immer → 严格类型 → 更新测试
**API 变更**: 更新 apis → 类型 → store → 组件 → 测试

**最后更新**: 2024-12-19
**版本**: 1.0.0
