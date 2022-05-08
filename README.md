# recite-helper

A tool help you recite things（帮你背东西的工具）

## 项目使用说明

### 直接添加内容

在 `src/assets/data.ts` 中添加要背诵的内容

里面是数组，一行代表一个题目

`\n` 表示分割题目，题目会以 `\n` 进行划分。如果 `\n` 划分后发现为空，或者以 `no-question` 结尾，则会重新生成题目。

如果以 `no-newline` 开头，则在显示答案时这行会跟着上一行，不会换行

### 内容添加脚本

运行 `npm run generate`，之后可以在控制台输入内容以渲染出符合 `data` 结构的内容，然后复制进去即可。

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```
