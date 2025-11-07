<script setup lang="ts">
import 'element-plus/es/components/pagination/style/css'
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
}, 1000)
const total = ref(1000)
const currentPage = ref(1)
const pageSize = ref(10)
onMounted(async() => {

})

</script>

<template>
	<div class="text">欢迎</div>
  <div class="box"></div>
  <div style="width: 600px;height: 100px;">
    <Pagination :currentPage :total :pageSize></Pagination>
  </div>
  <div>
    <SvgIcon icon-name="bell"></SvgIcon>
  </div>
  <div class="chart-box">
		<ECharts :options="options"></ECharts>
	</div>

</template>

<style scoped>
.chart-box {
  width: 400px;
  height: 500px;
}
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
}
.text {
  font-size: 24px;
  color: #333;
}
a,
form,
div,
span {
  font-size: 12px;
}
</style>
