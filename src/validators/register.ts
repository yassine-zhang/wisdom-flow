import { type FieldRule } from "@arco-design/web-vue";
import { reactive } from "vue";

const form = reactive({
  username: "",
  password: "",
  twoPassword: "",
  verifyCode: "",
  isRead: false,
});
const rules: Record<string, FieldRule | FieldRule[]> = {
  username: {
    required: true,
    message: "只允许输入+86手机号或邮箱地址",
    validator: (value, cb) => {
      return new Promise((resolve) => {
        if (value) {
          if (
            !/^1[3-9]\d{9}$/.test(value) &&
            !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
          ) {
            cb("Please enter a valid phone number or email address");
          }
        }
        resolve(value);
      });
    },
  },
  password: {
    required: true,
    validator: (value, cb) => {
      return new Promise((resolve) => {
        if (value) {
          if (value.length < 8) {
            cb("密码不能小于8位");
          }
          if (!/\d/.test(value)) cb("密码必须包含数字");
          if (!/[a-z]/.test(value)) cb("密码必须包含小写字母");
        }
        resolve(value);
      });
    },
  },
  twoPassword: {
    required: true,
    validator: (value, cb) => {
      return new Promise((resolve) => {
        if (value && value !== form.password) cb("两次输入的密码不一致");
        resolve(value);
      });
    },
  },
  verifyCode: {
    required: true,
    validator: (value, cb) => {
      return new Promise((resolve) => {
        if (value && value.length !== 6) cb("验证码长度为6位");
        resolve(value);
      });
    },
  },
};

export { form, rules };
