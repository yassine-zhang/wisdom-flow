<template>
  <div
    class="flex bg-[var(--color-bg-2)] border-0 border-b border-solid border-[var(--color-border-2)]"
  >
    <RouterLink
      class="flex justify-center items-center my-5 mx-[14px] w-20 h-8 text-[var(--color-text-1)] menu-text hover:decoration-none"
      to="/"
    >
      <Icon icon="tabler:chevron-left" class="menu-text" />返回
    </RouterLink>
  </div>
  <RouterView />
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";
</script>
