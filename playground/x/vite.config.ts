import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import path from 'path'
import postCssPxToRem from 'postcss-pxtorem'
import Unocss from 'unocss/vite'
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
		Unocss(),
		Components({
			deep: true, //搜索子目录
			resolvers: [
				ElementPlusResolver({importStyle: 'css'}) //Element Plus按需加载
			],
			dirs: ['src/components'], //按需加载的文件夹
			dts: 'src/types/components.d.ts'
		}),
		AutoImport({
			resolvers: [ElementPlusResolver()],
			imports: ['vue', 'vue-router', 'pinia'], //自动引入vue的ref、toRefs、onmounted等，无需在页面中再次引入
			dts: 'src/types/auto-import.d.ts' // 路径下自动生成文件夹存放全局指令
		}),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
			// 指定symbolId格式
			symbolId: 'icon-[name]'
		})
	],
	server: {
		port: 3000,
		open: true,
		proxy: {
			'/api': {
				target: 'https://xxx/xx/xxx',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	css: {
		postcss: {
			plugins: [
				postCssPxToRem({
					rootValue: 192, // 设计稿宽度
					propList: ['*'], // 默认转换所有属性
					selectorBlackList: ['.hairline'], // 或使用正则 /^body$/
					minPixelValue: 2 // 小于 2px 的不转换
				})
			]
		}
	}
})
