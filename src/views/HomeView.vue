<template>
  <div
    class="menu-demo flex bg-[var(--color-bg-2)] border-0 border-b border-solid border-[var(--color-border-2)]"
  >
    <div
      class="flex-none my-5 mx-[14px] w-20 h-8 rounded-sm cursor-pointer bg-[var(--color-fill-2)]"
    ></div>
    <a-menu
      class="flex-initial"
      :collapsed-width="360"
      mode="horizontal"
      breakpoint="sm"
      :default-selected-keys="[]"
    >
      <a-menu-item key="1">进入知慧流中心</a-menu-item>
      <a-menu-item key="2">会员定价</a-menu-item>
      <a-menu-item key="3">帮助中心</a-menu-item>
      <a-menu-item key="4">发表建议</a-menu-item>
      <a-menu-item
        key="5"
        disabled
        class="hidden md:inline-block cursor-default ml-1 px-0"
      >
        <a-divider direction="vertical" />
      </a-menu-item>
      <a-menu-item key="6" class="ml-0 p-1 theme-switch">
        <a-switch
          v-model="toggleThemeValue"
          size="medium"
          @click="toggleTheme()"
        >
          <template #checked-icon>
            <div class="flex items-center justify-center">
              <Icon icon="ph:moon-fill" />
            </div>
          </template>
          <template #unchecked-icon>
            <div class="flex items-center justify-center">
              <Icon icon="tabler:sun-filled" width="16px" height="16px" />
            </div>
          </template>
        </a-switch>
      </a-menu-item>
    </a-menu>
  </div>

  <div class="flex flex-col items-center mt-1/16 px-4">
    <div
      class="font-bold leading-tight text-[var(--color-text-1)] text-5xl text-center"
    >
      知识“慧”聚成河<span class="lt-sm:hidden ___">，</span
      ><br class="lt-sm:inline hidden" /><span class="gradient-text"
        >意义自然浮现</span
      >
    </div>
    <div
      class="leading-none mt-8 leading-snug text-[var(--color-text-1)] text-xl text-center"
    >
      记录高价值知识笔记，<br class="lt-sm:inline hidden" />
      在巩固自身的同时，获得一笔收入
    </div>
    <button class="button-8 mt-12 mb-2 scale-120" role="button">
      免费注册
    </button>
    <p class="hover:underline cursor-pointer text-[var(--color-text-2)]">
      已经有账号？点此登录
    </p>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import {
  unMountedThemeEventListener,
  applyTheme,
  toggleTheme,
  themeValue,
} from "@/utils/global/theme";
import {
  applyWindowSize,
  unMountedWinSizeEventListener,
} from "@/utils/global/window-size";

const toggleThemeValue = ref(false);
watch(themeValue, (newVal) => {
  toggleThemeValue.value = newVal;
});

onMounted(() => {
  applyTheme();
  applyWindowSize();
});

onUnmounted(() => {
  unMountedThemeEventListener();
  unMountedWinSizeEventListener();
});
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
}

.gradient-text {
  font-size: 48px;
  font-weight: bold;
  background-image: radial-gradient(
    circle 248px at center,
    #16d9e3 0%,
    #30c7ec 47%,
    #46aef7 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* CSS */
.button-8 {
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #39739d;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans",
    sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 10px 1.2rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.button-8:hover,
.button-8:focus {
  background-color: #b3d3ea;
  color: #2c5777;
}

.button-8:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
}

.button-8:active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}
</style>
