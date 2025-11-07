# fitChartSize

根据视口宽度适配图表字体尺寸，用于实现图表的响应式字体大小。

## 示例

```ts
// 基础用法 - 使用默认设计宽度 1920
const fontSize = fitChartSize(14); // 根据当前视口宽度自动计算适配的字体大小

// 在图表配置中使用
const chartOptions = {
  textStyle: {
    fontSize: fitChartSize(14) // 自适应字体大小
  },
  title: {
    textStyle: {
      fontSize: fitChartSize(18) // 标题自适应字体大小
    }
  }
};

// 自定义设计宽度
const customSize = fitChartSize(16, 1440); // 基于 1440 设计宽度计算

// 在 ECharts 中使用
const option = {
  title: {
    text: '销售数据',
    textStyle: {
      fontSize: fitChartSize(20)
    }
  },
  xAxis: {
    axisLabel: {
      fontSize: fitChartSize(12)
    }
  },
  yAxis: {
    axisLabel: {
      fontSize: fitChartSize(12)
    }
  }
};
```

## 参数

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| size | 原始字体尺寸 | `number` | - | - |
| defaultWidth | 默认设计宽度（用于计算缩放比例） | `number` | - | `1920` |

## 返回值

`number`: 适配后的字体尺寸（保留三位小数）

## 算法说明

1. **获取视口宽度**: 优先使用 `window.innerWidth`，降级到 `document.documentElement.clientWidth` 和 `document.body.clientWidth`
2. **计算缩放比例**: `当前视口宽度 / 默认设计宽度`
3. **应用缩放**: `原始尺寸 × 缩放比例`
4. **精度控制**: 使用 `Math.round(x * 1000) / 1000` 保留三位小数，避免浮点运算误差

## 使用场景

- **ECharts 图表**: 自适应不同屏幕尺寸的字体大小
- **数据可视化**: 确保图表文字在不同设备上保持合适的可读性
- **响应式设计**: 与图表容器的响应式布局配合使用
- **移动端适配**: 在小屏幕上自动缩小字体，大屏幕上放大字体

> ⚠️ 注意：该函数依赖浏览器环境，无法在服务端渲染（SSR）环境中使用。在 SSR 场景下建议使用条件渲染或提供默认值。函数会自动处理视口宽度不可用的情况（如服务端环境），此时返回原始尺寸。