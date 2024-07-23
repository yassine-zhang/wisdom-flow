<template>
  <div class="min-h-screen flex flex-col">
    <!-- 登录账号模块 -->
    <div class="flex-1 flex items-center justify-center">
      <a-card
        class="w-399px max-w-[calc(100%-32px)]"
        hoverable
        title="登录账号"
      >
        <a-form
          :model="form"
          layout="vertical"
          scroll-to-first-error
          :wrapper-col-props="{ span: 24, offset: 0 }"
          @submit="handleSubmit"
        >
          <a-form-item field="username" label="账号" required>
            <a-input
              v-model="form.username"
              placeholder="请输入您的手机号或邮箱"
            />
          </a-form-item>
          <a-form-item field="password" required>
            <template #label>
              密码 <a class="decoration-underline cursor-pointer">忘记密码？</a>
            </template>
            <a-input-password
              v-model="form.password"
              placeholder="输入您的密码"
            />
          </a-form-item>
          <a-form-item class="mb-0" field="isRead">
            <a-checkbox v-model="form.isRead"> 我已阅读并同意 </a-checkbox>
            <a
              class="mx-1 cursor-pointer hover:decoration-none"
              style="color: rgb(var(--arcoblue-6))"
              >《知慧flow用户服务协议》</a
            >
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button class="flex-1" type="primary" html-type="submit"
                >登录</a-button
              >
              <RouterLink to="/user/register"
                ><a-button type="secondary">注册</a-button></RouterLink
              >
            </a-space>
          </a-form-item>
        </a-form>
        <a-divider orientation="left">社交账号</a-divider>
        <a-space> </a-space>
      </a-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { RouterLink } from "vue-router";

const form = reactive({
  username: "",
  password: "",
  isRead: false,
});
const handleSubmit = (data) => {
  console.log(data);
};
</script>
