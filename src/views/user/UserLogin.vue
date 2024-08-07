<template>
  <div class="min-h-90vh flex flex-col">
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
          :rules="rules"
          layout="vertical"
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
          <a-form-item field="password">
            <template #label>
              密码 <a class="decoration-underline cursor-pointer">忘记密码？</a>
            </template>
            <a-input-password
              v-model="form.password"
              placeholder="输入您的密码"
            />
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
                >登录</a-button
              >
              <RouterLink to="/user/register"
                ><a-button type="secondary">注册</a-button></RouterLink
              >
            </a-space>
          </a-form-item>
        </a-form>
        <a-divider
          class="text-[var(--color-text-3)]"
          type="dashed"
          orientation="center"
          >其他登录方式</a-divider
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
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
//引入相关样式
import "@vue-office/docx/lib/v3/index.css";
import { onMounted } from "vue";
import { form, rules } from "@/validators/login";

import { isFormNotEmpty } from "@/utils/form-checker";
import axios from "@/utils/global/axios";

import checkUserAuthentication from "@/utils/global/checkUserAuthentication";

const router = useRouter();

const formRef = ref();
const handleSubmit = (data: {
  values: Record<string, any>;
  errors: Record<string, ValidatedError> | undefined;
}) => {
  if (data.errors) return;
  if (isFormNotEmpty(data.values)) {
    axios
      .request({
        method: "post",
        url: "/user/login",
        data: {
          username: form.username,
          password: form.password,
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        Notification.success({
          title: "登录成功",
          content: "登录成功，祝您使用愉快！" + new Date().toLocaleString(),
        });
        router.push("/uvu");
      })
      .catch((err) => {
        Message.error(err.response.data.message);
      });
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
  Message.error(`第三方快捷登录功能暂未开放{${type.toString()}}`);
};

onMounted(() => {
  // 当屏幕宽度小于767.9时设置modelAutoWidth为92%
  if (window.innerWidth < 768) {
    modelAutoWidth.value = "92%";
  }

  checkUserAuthentication(() => router.push("/uvu"));
});
</script>
