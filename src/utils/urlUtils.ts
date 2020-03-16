//获取query参数
export function getQstr(name: string) {
  let reg = new RegExp("" + name + "=([^&]+?)(#|&|$)");
  let url = window.location.href;
  let index = url.indexOf('?');
  let r = url.substr(index).match(reg);
  if (r !== null){
    return decodeURIComponent(r[1]);
  } 
  return null;
}

export function removeQstr(name: string, str=window.location.href) {
  let reg1 = new RegExp('' + name + '=(.*?)&')
  let reg2 = new RegExp('[&?]?' + name + '=(.*?)#')
  let url = str
  if(url.match(reg1) !== null) { // 匹配&结尾的则去除字段包含＆
    return url.replace(reg1, '');
  }else if(url.match(reg2) !== null) { // 匹配#结尾的则去除字段包含#
    return url.replace(reg2, '#');
  }
  return url
}

export function param2Obj(url: string) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}