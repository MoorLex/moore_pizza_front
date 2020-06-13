export const Storage = {
  get (key) {
    let value
    if (window && window.localStorage) {
      const sv = window.localStorage.getItem(key)
      value = sv ? JSON.parse(sv) : undefined
    }
    return value
  },
  set (key, value) {
    if (window && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  },
  remove (key) {
    if (window && window.localStorage) {
      window.localStorage.removeItem(key)
    }
  }
}
