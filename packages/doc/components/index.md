### 安装
```shell
    pnpm add @gengjjjjj/component
```
### 使用示例
- 按需引入
```ts
<script setup lang="ts">
import { ECharts } from '@gengjjjjj/component'

const options = ref<any>({
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	color: ['#5470c6'],
	yAxis: {
		type: 'value'
	},
	series: [
		{
			data: [150, 230, 224, 218, 135, 147, 260],
			type: 'line'
		}
	]
})
</script>
<template>
    <div style="width: 200px; height: 300px">
		<ECharts :options="options"></ECharts>
    </div>
</template>
```
- 全局引入
```ts
// main.ts
import {createApp} from 'vue'
import App from './App.vue'
import monoComponent from '@gengjjjjj/component'
import '@gengjjjjj/component/dist/index.css'
const app = createApp(App)
app.use(monoComponent)
app.mount('#app')
// App.vue
<script setup lang="ts">

const options = ref<any>({
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	color: ['#5470c6'],
	yAxis: {
		type: 'value'
	},
	series: [
		{
			data: [150, 230, 224, 218, 135, 147, 260],
			type: 'line'
		}
	]
})
</script>
<template>
    <div style="width: 200px; height: 300px">
		<ECharts :options="options"></ECharts>
    </div>
</template>
```