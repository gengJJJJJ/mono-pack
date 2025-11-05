<script setup lang="ts">
import {ref, watch, nextTick, onMounted, onUnmounted,shallowRef} from 'vue'
import type {EChartsOption} from '.'
import echarts from '.'

interface Props {
	width?: string // 宽度
	height?: string // 高度
	options?: EChartsOption // 配置项
	theme?: string | object // 主题
	lazy?: boolean // 懒加载
	notMerge?: boolean // 是否合并配置项
	loading?: boolean // 是否显示加载中
	loadingOptions?: Record<string, any> // 加载中的配置项
	renderer?: 'canvas' | 'svg' // 渲染器
	devicePixelRatio?: number // 设备像素比
}

const props = withDefaults(defineProps<Props>(), {
	width: '100%',
	height: '100%',
	options: () => ({}),
	theme: undefined,
	lazy: false,
	notMerge: false,
	loading: false,
	loadingOptions: () => ({}),
	renderer: 'canvas',
	devicePixelRatio: window.devicePixelRatio || 1
})

const emit = defineEmits<{
	(e: 'chartInstance', instance: ReturnType<typeof echarts.init>): void // 暴露实例给父组件
	(e: 'click', params: any): void // 点击事件
	(e: 'legendselectchanged', params: any): void // 图例选择事件
}>()

const chartRef = ref<HTMLElement | null>(null) // 容器
const chartInstance = shallowRef<ReturnType<typeof echarts.init> | null>(null) // 图表实例
let resizeObserver: ResizeObserver | null = null // 监听尺寸变化
let pendingResize: number | null = null // 防抖 ID

onMounted(() => {
	nextTick(() => {
		initChart()
	})
})
onUnmounted(() => {
	if (resizeObserver && chartRef.value) {
		resizeObserver.unobserve(chartRef.value)
	}
	resizeObserver = null

	if (chartInstance.value) {
		chartInstance.value.dispose()
		chartInstance.value = null
	}

	if (pendingResize !== null) {
		cancelAnimationFrame(pendingResize)
		pendingResize = null
	}
})
watch(
	() => props.options,
	newVal => {
		if (!props.lazy && newVal) {
			drawOption(newVal)
		}
	},
	{deep: true}
)
const drawOption = (options: EChartsOption = props.options) => {
	if (!chartInstance.value) return
	if (!options || Object.keys(options).length === 0) {
		chartInstance.value.clear()
		if (props.loading) {
			chartInstance.value.showLoading({
				text: '',
				color: '#409eff',
				textColor: '#000',
				maskColor: 'rgba(255, 255, 255, .95)',
				zlevel: 0,
				lineWidth: 2,
				...props.loadingOptions
			})
		}
	} else {
		chartInstance.value.hideLoading()
		chartInstance.value.setOption(options, {
			notMerge: props.notMerge,
			replaceMerge: ['series', 'xAxis', 'yAxis', 'grid']
		})
	}
}
const initChart = () => {
	if (!chartRef.value) return
	// 销毁旧实例
	if (chartInstance.value) {
		chartInstance.value.dispose()
	}
	const {theme, renderer, devicePixelRatio} = props
	chartInstance.value = echarts.init(chartRef.value, theme, {
		renderer,
		devicePixelRatio
	})
	// 绑定事件
	chartInstance.value.on('click', params => {
		emit('click', params)
	})
	chartInstance.value.on('legendselectchanged', params => {
		emit('legendselectchanged', params)
	})
	// 暴露实例给父组件
	emit('chartInstance', chartInstance.value)
	// 初始绘制
	if (!props.lazy && props.options) {
		drawOption(props.options)
	}
	// 监听尺寸变化
	resizeObserver = new ResizeObserver(() => {
		if (pendingResize !== null) cancelAnimationFrame(pendingResize)
		pendingResize = requestAnimationFrame(() => {
			chartInstance.value?.resize({
				animation: {duration: 300}
			})
			pendingResize = null
		})
	})
	resizeObserver.observe(chartRef.value)
}
const resize = () => {
	chartInstance.value?.resize()
}
defineExpose({
	chartInstance,
	drawOption,
	resize,
	initChart
})
</script>
<template>
	<div ref="chartRef" :style="{width, height}" class="echarts-container" />
</template>
<style lang="scss" scoped>
.echarts-container {
	/* 防止字体继承干扰 */

	font-family: inherit;
	transition: all 0.3s;
}
</style>
