
import { getQstr } from './urlUtils'
/**
 * Created by toony on 2017/8/13.
 */
/**
 *  获取本地储存内容(sessionStorage和localStorage)
 * @param storageName String (需要获取的名字)
 * @param type String (获取类型： session或者local)
 */
const storeType = 'local'
const getStorage = function (storageName: string, type = storeType) {
  if(type === 'session'){
    if(sessionStorage.getItem(storageName)){
      if(/{|\[/.test(<string>sessionStorage.getItem(storageName))) {
        return JSON.parse(<string>sessionStorage.getItem(storageName))
      } else return sessionStorage.getItem(storageName)
    }else {
      return false
    }
  }else {
    if(localStorage.getItem(storageName)){
      if (/{|\[/.test(<string>localStorage.getItem(storageName))){
        return JSON.parse(<string>localStorage.getItem(storageName))
      } else return localStorage.getItem(storageName)
    }else {
      return false
    }
  }
}

/**
 *  储存到本地储存
 * @param storageName String (本地储存名称)
 * @param params Object (需要储存的数据)
 * @param type String (储存类型 session或者local)
 */
const setStorage = function (storageName: string, params: any, type = storeType) {
  let str:any
  // 判断params是否为字符串
  if(Object.prototype.toString.call(params) === "[object String]"){
    str = params
  }else {
    str = JSON.stringify(params)
  }
  if(type === 'session'){
    sessionStorage.setItem(storageName, str)
  }else {
    localStorage.setItem(storageName, str)
  }
}

const removeStorage = function (storageName: string, type=storeType) {
  if(type === 'session') {
    sessionStorage.removeItem(storageName)
  }else {
    localStorage.removeItem(storageName)
  }
}
export { getStorage, setStorage, removeStorage }
