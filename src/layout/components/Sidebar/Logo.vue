<script lang="ts" setup>
import { useSettingsStore } from '@/store/modules/settings'

const settingsStore = useSettingsStore()

defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})

const logo = ref(new URL(`../../../assets/logo.png`, import.meta.url).href)
</script>

<template>
  <div class="sidebar-header bg-gray-800 dark:bg-[var(--el-bg-color-overlay)]">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="header-box" to="/">
        <img v-if="settingsStore.sidebarLogo" :src="logo" class="header-logo" />
        <span v-else class="header-title">vue3-element-admin</span>
      </router-link>

      <router-link v-else key="expand" class="header-box" to="/">
        <img v-if="settingsStore.sidebarLogo" :src="logo" class="header-logo" />
        <span class="header-title">vue3-element-admin</span>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
// https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}

.sidebarLogoFade-leave-active,
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-header {
  .header-box {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .header-logo {
      width: 20px;
    }
    .header-title {
      color: #fff;
      font-size: 14px;
      margin-left: 6px;
      font-weight: bold;
    }
  }
}
</style>
