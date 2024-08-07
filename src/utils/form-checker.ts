import { type Reactive } from "vue";

/**
 * 判断表单是否为空
 *
 * @param form 表单对象，类型为 Reactive<any>
 * @returns 如果表单不为空，则返回 true；否则返回 false
 *
 * 假设“为空”仅指字符串字段为空字符串。
 * 对于布尔字段，可以选择性地包含它们作为检查的一部分，但在这个例子中，仅考虑字符串。
 */
export function isFormNotEmpty(form: Reactive<any>) {
  // 假设“为空”仅指字符串字段为空字符串
  // 对于布尔字段，我们可以选择性地包含它们作为检查的一部分，但在这个例子中，我们仅考虑字符串
  return Object.values(form).every((value) => {
    // 如果值是字符串，则检查它是否为空字符串
    // 如果不是字符串，则默认它不是“空”的（这取决于你的具体需求）
    return Boolean(value);
  });
}
