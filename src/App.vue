<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import variables from '@/styles/variables.module.scss'
console.log(variables.bgColor)

import { useCounterStore } from '@/store/counter'
const counterStore = useCounterStore()
console.log(import.meta.env.VITE_APP_TITLE)
</script>

<template>
  <div>
    <el-button type="success" @click="counterStore.increment"><i-ep-SuccessFilled />Success</el-button>
    <el-button type="info"><svg-icon icon-class="bug" />SVG 本地图标</el-button>
    <!-- <div class="box">{{ counterStore.count }}</div> -->
    <HelloWorld />
  </div>
</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.box {
  width: 100px;
  height: 100px;
  background-color: $bg-color;
}
</style>
