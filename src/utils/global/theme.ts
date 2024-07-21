import { ref } from "vue";
const themeValue = ref(false);

/**
 * 从localStorage中获取主题，或者根据系统主题偏好判断
 *
 * @param enabledSystemTheme 是否启用系统主题检测，默认为false
 * @returns 返回布尔值，表示是否使用深色主题（true为深色，false为亮色）
 */
const getThemeFromLocalStorage = (enabledSystemTheme: boolean = false) => {
  // 尝试从localStorage中获取主题
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    // 如果localStorage中有主题，则返回它
    return storedTheme === "dark" ? true : false; // 或者直接返回 storedTheme
  } else {
    // 如果没有在localStorage中存储主题，则检测系统主题
    // 注意：这种方法可能不是所有浏览器都支持
    if (
      enabledSystemTheme &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // 如果浏览器支持并且用户偏好深色主题，则返回true
      return true;
    } else {
      // 否则返回false，表示亮色主题
      return false;
    }
  }
};

/**
 * 将主题信息保存到localStorage中
 *
 * @param theme 主题信息，可以是字符串类型或布尔类型
 * 如果为字符串类型，表示具体的主题名称
 * 如果为布尔类型，true表示深色主题，false表示浅色主题
 * 如果为null或undefined，则从localStorage中移除主题信息
 */
const setThemeToLocalStorage = (theme: string | boolean) => {
  if (theme) {
    localStorage.setItem("theme", theme.toString());
  } else {
    localStorage.removeItem("theme");
  }
};

/**
 * 恢复为浅色主题
 *
 * @param storage 是否将主题设置保存到本地存储，默认为true
 * @returns 无返回值
 */
const restoreLightTheme = (storage: boolean = true) => {
  document.body.removeAttribute("arco-theme");
  // toggleThemeValue.value = false;
  themeValue.value = false;
  if (storage) setThemeToLocalStorage(false);
};

/**
 * 设置黑色主题
 *
 * @param storage 是否将主题设置保存到本地存储，默认为true
 */
const setBlackTheme = (storage: boolean = true) => {
  document.body.setAttribute("arco-theme", "dark");
  // toggleThemeValue.value = true;
  themeValue.value = true;
  if (storage) setThemeToLocalStorage("dark");
};

/**
 * 切换主题
 *
 * @returns 无返回值
 */
const toggleTheme = () => {
  const hasArcoTheme = document.body.hasAttribute("arco-theme");
  const isDarkTheme = getThemeFromLocalStorage(false);

  if (hasArcoTheme || isDarkTheme) {
    // 恢复亮色主题
    restoreLightTheme();
  } else {
    // 设置为暗黑主题
    setBlackTheme();
  }
};

/**
 * 处理系统主题变化
 *
 * @param mql MediaQueryList 对象，用于检测CSS媒体查询的匹配状态
 */
const handleSystemThemeChange = (mql: MediaQueryList) => {
  if (mql.matches) {
    // 如果匹配深色主题，执行相关操作
    console.log("深色主题已启用");
    setBlackTheme(false);
  } else {
    // 如果不匹配深色主题（即亮色主题），执行相关操作
    console.log("亮色主题已启用");
    restoreLightTheme(false);
  }
};

// 使用matchMedia来检测系统主题
const mql = window.matchMedia("(prefers-color-scheme: dark)");
/**
 * 处理事件监听器
 *
 * 使用matchMedia来检测系统主题，并在主题改变时触发处理函数
 */
const mountedEventListener = () => {
  // 监听主题改变事件
  mql.addEventListener("change", () => handleSystemThemeChange(mql));
};

/**
 * 卸载监听系统主题变化的回调函数
 *
 * 当组件卸载时，移除监听媒体查询对象(mql)的'change'事件，
 * 该事件用于处理系统主题变化。
 */
const unMountedThemeEventListener = () => {
  mql.removeEventListener("change", () => handleSystemThemeChange(mql));
};

/**
 * 应用主题样式
 *
 * 根据从本地存储中获取的主题设置，应用相应的主题样式。
 * 如果获取到的主题是"dark"，则应用黑色主题样式。
 */
const applyTheme = () => {
  const isDarkTheme = getThemeFromLocalStorage(true);
  if (isDarkTheme) setBlackTheme(false);

  mountedEventListener();
};

export {
  toggleTheme,
  applyTheme,
  mountedEventListener,
  unMountedThemeEventListener,
  themeValue,
};
