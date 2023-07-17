<script setup lang="ts">
import { useCounterStore } from '@/store/counter'
const counterStore = useCounterStore()
</script>

<template>
  <div>helloworld:{{ counterStore.count }}</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
