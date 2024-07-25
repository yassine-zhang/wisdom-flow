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
          ref="formRef"
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
              @click="handleClick"
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

    <!-- 用户协议弹出窗口 -->
    <a-modal
      v-model:visible="visible"
      @ok="handleOk"
      hide-cancel
      :width="modelAutoWidth"
    >
      <template #title> 登录须知 </template>
      <div>
        <vue-office-docx
          :src="docx"
          class="h-65vh w-full"
          @rendered="renderedHandler"
          @error="errorHandler"
        />
      </div>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import {
  type ValidatedError,
  Message,
  Notification,
} from "@arco-design/web-vue";
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";

//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
//引入相关样式
import "@vue-office/docx/lib/v3/index.css";

const form = reactive({
  username: "",
  password: "",
  isRead: false,
});
const formRef = ref();
const handleSubmit = (data: {
  values: Record<string, any>;
  errors: Record<string, ValidatedError> | undefined;
}) => {
  if (data.errors) return;
  Message.success("太棒了，你中举了！");
  Notification.warning(
    "恭喜成功登录账号，若您还未阅读用户服务协议，请留意查看！",
  );
};

const visible = ref(false);
const modelAutoWidth = ref("70%");

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};

const docx = ref(
  "https://oss.itcox.cn/wisdom-flow/%E7%9F%A5%E6%85%A7flow%E7%94%A8%E6%88%B7%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.docx",
);
const renderedHandler = () => {
  console.log("渲染完成");
};
const errorHandler = () => {
  console.log("渲染失败");
};
</script>
