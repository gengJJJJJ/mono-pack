### 安装
```shell
    pnpm add  vite-plugin-svg-icons
```
### 注册
```ts
// main.ts
import 'virtual:svg-icons-register'

// vite.config.ts
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig({
    plugins: [
        createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
			// 指定symbolId格式
			symbolId: 'icon-[name]'
		})
    ]
})
```
### 使用
```ts
<template>
    <SvgIcon icon-name="bell"></SvgIcon> // 假设存在 src/assets/svg/bell.svg
</template>
```