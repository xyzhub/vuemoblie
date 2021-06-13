import dayjs from 'dayjs'
// 导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入语言包
import 'dayjs/locale/zh-cn'
// dayjs安装相对时间插件
dayjs.extend(relativeTime)
// 全局使用语言包
dayjs.locale('zh-cn')
// 处理相对函数
export function getRelativeTime (val) {
  return dayjs().to(dayjs(val))
}
// 测试过滤器
export function testStr (val) {
  return '$' + val
}

// 文字高亮
export function textActive (val, str) {
  const reg = new RegExp(str, 'ig')
  // 替换字符串
  return val.replace(reg, `<span style='color:red;'>${str}</span>`)
}
