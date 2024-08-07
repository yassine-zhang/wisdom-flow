import axios from "@/utils/global/axios";

/**
 * 检查用户身份验证
 *
 * @param callback 验证成功回调函数
 * @param errorCallback 验证失败回调函数
 */
export default function checkUserAuthentication(
  callback?: Function,
  errorCallback?: Function,
) {
  axios
    .request({
      method: "get",
      url: "/user/verifyLogin",
    })
    .then(() => callback?.())
    .catch(() => errorCallback?.());
}
