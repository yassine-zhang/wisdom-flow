import { type FieldRule } from "@arco-design/web-vue";
import { reactive } from "vue";

const form = reactive({
  username: "",
  password: "",
  isRead: false,
});
const rules: Record<string, FieldRule | FieldRule[]> = {
  username: {
    required: true,
    message: "无效内容，请输入邮箱或+86CN手机号 :(",
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
          if (value.length < 8 || value.length > 16) {
            cb("密码长度为8-16位 :(");
          }
          if (!/\d/.test(value)) cb("密码必须包含数字");
          if (!/[a-z]/.test(value)) cb("密码必须包含小写字母");
        }
        resolve(value);
      });
    },
  },
  isRead: {
    required: true,
  },
};

export { form, rules };
