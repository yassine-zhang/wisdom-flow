<template>
  <div class="min-h-90vh flex flex-col">
    <!-- 账号注册模块 -->
    <div class="flex-1 flex items-center justify-center">
      <a-card
        class="w-399px max-w-[calc(100%-32px)]"
        hoverable
        title="注册账号"
      >
        <a-form
          :model="form"
          layout="vertical"
          :rules="rules"
          scroll-to-first-error
          :wrapper-col-props="{ span: 24, offset: 0 }"
          @submit="handleSubmit"
        >
          <a-form-item field="username" label="账号">
            <a-input
              v-model="form.username"
              placeholder="请输入您的手机号或邮箱"
            />
          </a-form-item>
          <a-form-item field="password" label="密码">
            <a-input-password
              v-model="form.password"
              placeholder="输入您的密码"
            />
          </a-form-item>
          <a-form-item field="twoPassword" label="重复密码">
            <a-input-password
              v-model="form.twoPassword"
              placeholder="再次输入您的密码"
            />
          </a-form-item>
          <a-form-item field="verifyCode" label="验证码">
            <a-verification-code v-model="form.verifyCode" class="mr-4" />
            <a-button type="outline">获取验证码</a-button>
          </a-form-item>
          <a-form-item class="mb-0" field="isRead" hide-asterisk>
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
                >注册</a-button
              >
              <RouterLink to="/user/login"
                ><a-button type="secondary">登录</a-button></RouterLink
              >
            </a-space>
          </a-form-item>
        </a-form>
        <a-divider
          class="text-[var(--color-text-3)]"
          type="dashed"
          orientation="center"
          >其他注册方式</a-divider
        >
        <a-space class="flex items-center justify-center gap-3.5">
          <div
            @click="thirdPartyLogin(ThirdPartyEnum.QQ)"
            class="flex gap-0.5 items-center transition-colors cursor-pointer rounded-2px hover:bg-[var(--color-fill-2)] px-3 py-1"
          >
            <Icon icon="mingcute:qq-fill" width="18px" height="18px" /> QQ
          </div>
          <div
            @click="thirdPartyLogin(ThirdPartyEnum.Wechat)"
            class="flex gap-1 items-center transition-colors cursor-pointer rounded-2px hover:bg-[var(--color-fill-2)] px-3 py-1"
          >
            <Icon icon="mingcute:wechat-fill" width="18px" height="18px" /> 微信
          </div>
        </a-space>
      </a-card>
    </div>

    <!-- 用户协议弹出窗口 -->
    <a-modal
      v-model:visible="visible"
      @ok="handleOk"
      hide-cancel
      :width="modelAutoWidth"
    >
      <template #title> 注册须知 </template>
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
import type { ValidatedError } from "@arco-design/web-vue";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { Icon } from "@iconify/vue";

//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
//引入相关样式
import "@vue-office/docx/lib/v3/index.css";

import { form, rules } from "@/validators/register";
import { isFormNotEmpty } from "@/utils/form-checker";

import { useRouter } from "vue-router";
import checkUserAuthentication from "@/utils/global/checkUserAuthentication";

const router = useRouter();

const handleSubmit = (data: {
  values: Record<string, any>;
  errors: Record<string, ValidatedError> | undefined;
}) => {
  if (data.errors) return;
  if (isFormNotEmpty(data.values)) {
    router.push("/uvu");
  } else {
    if (!form.isRead) {
      Message.warning("请阅读并同意用户协议");
      return;
    }
    Message.error("内容不能为空:(");
  }
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

enum ThirdPartyEnum {
  QQ,
  Wechat,
}
const thirdPartyLogin = (type: ThirdPartyEnum) => {
  Message.error(`第三方快捷注册功能暂未开放{${type.toString()}}`);
};

onMounted(() => {
  // 当屏幕宽度小于767.9时设置modelAutoWidth为92%
  if (window.innerWidth < 768) {
    modelAutoWidth.value = "92%";
  }

  checkUserAuthentication(() => router.push("/uvu"));
});
</script>
