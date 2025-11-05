import * as echarts from 'echarts/core'

// 图表类型 (Charts)
import {LineChart, BarChart, PieChart} from 'echarts/charts'

// 组件 (Components)
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	LegendComponent
} from 'echarts/components'

// 渲染器
import {
	CanvasRenderer
	// SVGRenderer
} from 'echarts/renderers'

// 注册所有模块
echarts.use([
	// 图表
	LineChart,
	BarChart,
	PieChart,

	// 组件
	TitleComponent,
	TooltipComponent,
	GridComponent,
	LegendComponent,

	// 渲染器
	CanvasRenderer
])

export default echarts

// 类型
export type {EChartsOption, ECharts, ECElementEvent} from 'echarts'
