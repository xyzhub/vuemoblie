// 封装本地存储工具

// 存
export function setItem (key, val) {
  if (typeof val === 'object') {
    localStorage.setItem(key, JSON.stringify(val))
  } else {
    localStorage.setItem(key, val)
  }
}

// 取
export function getItem (key) {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 删除

export function removeItem (key) {
  localStorage.removeItem(key)
}
