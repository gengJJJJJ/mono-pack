<script setup lang="ts">
// import {pageData} from '@/api/home'
import {useCounterStoreRefs} from '@/stores/counter'
import { useResponsiveRem } from '@mono-pack/composables';

const counterStore = useCounterStoreRefs()
const { remScale} = useResponsiveRem(1920);

console.log(counterStore.count.value)
function handleClick() {
	counterStore.increment()
	console.log(counterStore.count.value)
}
onMounted(() => {
	// pageData()
})
</script>

<template>
	<div class="app mr-20px bg-red">欢迎</div>
	<el-button @click="handleClick">增加</el-button>
  <div>{{ remScale }}</div>


</template>

<style scoped>
.app {
}
</style>
