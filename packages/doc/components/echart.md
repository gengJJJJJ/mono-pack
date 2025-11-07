### 使用
```html
<script setup lang="ts">
import { ref } from 'vue'
const options = ref<any>({
	xAxis: {
		type: 'category',
		data: []
	},
	color: ['#5470c6'],
	yAxis: {
		type: 'value'
	},
	series: [
		{
			data: [],
			type: 'line'
		}
	]
})
setTimeout(() => {
	options.value = {
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
	}
}, 3000)
</script>
<template>
	<div style="width: 200px; height: 300px">
		<ECharts :options="options"></ECharts>
	</div>
</template>
<style lang="scss" scoped></style>

```