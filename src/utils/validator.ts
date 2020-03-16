
const validator = {
  isEmpty(value: any): boolean {
    if(value !==0 && !value ) {
      return true
    }
    return false
  },
  isPhoneNum(value: any): boolean {
    return /^[1][3-9][0-9]{9}$/.test(value)
  },

  isEamil(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  },

  isAlphabets(str: string): boolean { // 大小写字母检查
    return /^[A-Za-z]+$/.test(str)
  }
}
export default validator