export function Validation () {
  let errors = {}

  this.error = (key, message) => {
    if (!errors[key]) {
      errors[key] = []
    }
    errors[key].push(message)
  }

  this.checkMail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (form, rules) => new Promise((resolve, reject) => {
    errors = {}

    Object.keys(form).map((key) => {
      if (rules[key]) {
        rules[key].split('|').map((rule) => {
          if (rule === 'required' && !form[key]) {
            this.error(key, `${key} is required`)
          }
          if (rule === 'email' && !this.checkMail(form[key])) {
            this.error(key, `${key} is not email`)
          }
          if (rule.includes('max') && rule.split(':')[1] < form[key]) {
            this.error(key, `${key} max length is ${rule.split(':')[1]}`)
          }
          if (rule.includes('min') && rule.split(':')[1] > form[key]) {
            this.error(key, `${key} min length is ${rule.split(':')[1]}`)
          }
        })
      }
    })

    if (Object.keys(errors).length > 0) {
      reject(errors)
    } else {
      resolve()
    }
  })
}

export default new Validation()
