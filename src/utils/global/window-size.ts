import { ref } from "vue";
import { Message } from "@arco-design/web-vue";

const isWindowTooSmall = ref(false);

/**
 * 检查窗口大小是否小于指定阈值
 *
 * @description 如果窗口的宽度小于640或高度小于400，则视为窗口过小，并执行相应处理
 * @returns 无返回值
 *
 * @example
 * 可以在页面加载或窗口大小变化时调用此函数来检查窗口大小
 */
const checkWindowSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  // 假设我们定义屏幕窗口过小的阈值为 600x400
  if (width < 639.9 || height < 400) {
    // 在这里调用你的函数，例如 handleWindowTooSmall()
    if (!isWindowTooSmall.value) handleWindowTooSmall();
    isWindowTooSmall.value = true;
  } else {
    isWindowTooSmall.value = false;
  }
};

/**
 * 处理窗口过小的逻辑
 *
 * @returns 无返回值
 */
const handleWindowTooSmall = () => {
  // 在这里处理窗口过小的逻辑
  Message.info("为了您更好的体验，请使用宽屏设备浏览");
};

const applyWindowSize = () => {
  window.addEventListener("resize", checkWindowSize);
  checkWindowSize(); // 初始检查
};

const unMountedWinSizeEventListener = () => {
  window.removeEventListener("resize", checkWindowSize);
};

export { applyWindowSize, unMountedWinSizeEventListener };
