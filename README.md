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
- upload：
  - 上传 .md 文件，识别。
- migration:
  - Prisma schema 同步数据库的过程，就被称之为 migration。每次迁移，都会生成一个迁移文件，存放在 prisma/migrations下
- Introspection:
  - 从数据库推导出 Prisma schema 的过程就叫做 Introspection，中文译为“内省”，指通过检查数据库的结构和元数据来了解数据库本身的特性和信息。

## 启动项目(开发中，暂时失效)

<!-- - 启动 redis（本地要安装 redis）

```bash
redis-server
```

- 服务端接口：strapi + mysql

- 安装依赖

```bash
npm install
```

- 启动项目

```bash
# 开发环境
npm run dev

# 生产环境
npm run build
npm run start
``` -->
