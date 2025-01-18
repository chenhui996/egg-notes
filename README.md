# 开发文档

- redis
- Suspense、loading
- use client
- rsc 骨架
- link 预获取
- await params

- Server Action
  - 从 formData 中获取提交的数据
  - 使用 zod 进行数据校验
  - 使用 revalidate 更新数据缓存
  - 返回合适的信息
- 定义表单的代码要注意：
  - useActionState
    - 替代 react-dom 的 useFormState 和 useFormStatus
  - 特殊数据使用隐藏 input 提交

## 启动项目

- 启动 redis（本地要安装 redis）

```bash
redis-server
```

- 安装依赖

```bash
npm install
```

- 启动项目

```bash
// 开发环境
npm run dev

// 生产环境
npm start
```
