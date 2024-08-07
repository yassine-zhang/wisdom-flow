<template>
  <div class="min-h-screen">
    <!-- menu -->
    <div class="menu-demo flex justify-between bg-[var(--color-bg-2)]">
      <div
        class="flex-none my-4 mx-[14px] h-8 rounded-sm cursor-pointer flex items-center"
      >
        <span
          style="color: rgb(var(--arcoblue-6))"
          class="font-['AliMaMaFangYuanCF-Regular'] text-xl font-bold"
          >知慧flow</span
        >
      </div>
      <div class="flex-1 flex items-center justify-end">
        <ul
          class="h-full flex-1 flex items-center justify-end sm:hidden text-[var(--color-text-2)]"
        >
          <li class="box-border py-5 h-full">
            <a
              @click="enterFlowCenter"
              class="h-full flex items-center px-2 text-[var(--color-text-2)] hover:bg-[var(--color-fill-2)] decoration-none"
              >进入flow中心</a
            >
          </li>
          <li class="box-border py-5 h-full">
            <a
              class="h-full flex items-center px-2 text-[var(--color-text-2)] hover:bg-[var(--color-fill-2)] decoration-none"
              target="_self"
              href="#"
              >会员定价</a
            >
          </li>
        </ul>
        <a-menu class="lt-sm:w-auto" mode="horizontal">
          <a-menu-item class="lt-sm:hidden" key="1"
            ><a @click="enterFlowCenter">进入flow中心</a></a-menu-item
          >
          <a-menu-item class="lt-sm:hidden" key="2">会员定价</a-menu-item>
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
    </div>
    <a-alert class="w-100%" type="info"
      >知慧flow项目处于初步开发阶段，一切演示功能不代表最终成品！</a-alert
    >
    <div class="lt-md:px-4 px-8">
      <!-- hero -->
      <div class="flex flex-col items-center mt-1/16">
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
        <RouterLink v-if="!hasLogined" to="/user/register">
          <button class="button-8 mt-12 mb-4 scale-120" role="button">
            免费注册
          </button></RouterLink
        >
        <RouterLink v-if="!hasLogined" to="/user/login">
          <p class="hover:underline cursor-pointer text-[var(--color-text-2)]">
            已经有账号？点此登录
          </p>
        </RouterLink>
        <a v-if="hasLogined" @click="enterFlowCenter"
          ><button class="button-8 mt-12 mb-4 scale-120" role="button">
            进入flow中心
          </button></a
        >

        <img
          src="@/assets/images/device-demo.png"
          alt="device-demo"
          class="my-5 lt-md:w-100% w-85%"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { toggleTheme, themeValue } from "@/utils/global/theme";
import { RouterLink, useRouter } from "vue-router";

import { Message } from "@arco-design/web-vue";
import checkUserAuthentication from "@/utils/global/checkUserAuthentication";

const toggleThemeValue = ref(false);
watch(themeValue, (newVal) => {
  toggleThemeValue.value = newVal;
});

const router = useRouter();

function enterFlowCenter() {
  checkUserAuthentication(
    () => router.push("/uvu"),
    () => {
      router.push("/user/login");
      Message.error("检测到您还未登录，请先登录！");
    },
  );
}

const hasLogined = ref(false);
onMounted(() => {
  toggleThemeValue.value = themeValue.value;
  checkUserAuthentication(() => (hasLogined.value = true));
});
</script>
<style scoped>
/* menu */
.arco-menu-item > a,
button > a {
  width: 100%;
  height: 100%;
  display: inline-block;
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
  background-clip: text;
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
