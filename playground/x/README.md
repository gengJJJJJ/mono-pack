# vue3_template

### 项目介绍

这是一个最新的vue3模板项目，内置了`ESLint`、`prettier`、`styleLint`、`unocss`、`axios`、`pinia`、`vue-router`、`simple-git-hook`、`commitLint`、`lint-staged`、`nprogress`、`ElementPlus`

项目保存时自动格式化代码与样式，提交代码前检查待提交文件是否规范

项目使用插件`unplugin-auto-import`与`unplugin-vue-components`

- 自动导入常用的使用的第三方库的 API

- 在Vue文件中自动导入的相关库或者本地的vue文件，不需要在每个文件中手动导入组件

项目已配置好axios与代理,以及pinia

### 安装依赖并启动

```sh
pnpm install
pnpm dev
```

### 打包

```sh
pnpm build
```

### test

```sh
pnpm test:unit
```

### 格式化

```sh
pnpm lint
```

### 注意

当提交代码时抛出eslint错误为

```sh
  0:0  warning  File ignored because of a matching ignore pattern. Use "--no-ignore" to disable file ignore settings or use "--no-warn-ignored" to suppress this warning
```

手动执行代码格式化命令

```sh
pnpm run lint
```
