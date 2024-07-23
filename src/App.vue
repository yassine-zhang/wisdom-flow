<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { RouterView } from "vue-router";
import {
  applyWindowSize,
  unMountedWinSizeEventListener,
} from "@/utils/global/window-size";
import { applyTheme } from "./utils/global/theme";
import Footer from "@/components/GlobalFooter.vue";

onMounted(() => {
  applyTheme();
  applyWindowSize();
});

onUnmounted(() => {
  unMountedWinSizeEventListener();
});
</script>

<template>
  <RouterView />
  <Footer />
</template>
