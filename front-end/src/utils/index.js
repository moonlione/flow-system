
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function dateFormat(time, type) {
    let date = new Date(time);
    let year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    let str=year + "-" + month + "-" + day + " 00:00:00"
    if(type===0){
        str=month + "/" + day
    }
    if(type===1){
        str= year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
    }
    return str
}
export function  transType(str) {
    let s = '';
    switch (str) {
        case 'black':
            s = '黑名单';
            break;
        case 'white':
            s = '白名单';
            break;
        case 'vip':
            s = 'vip';
            break;
        case 'normal':
            s = '普通';
            break;
        default:
            s = '未知';
            break;
    }
    return s;
}
export function day30Before(){
    //获取三十天前日期
    let lw = new Date( new Date() - 1000 * 60 * 60 * 24 * 30);//最后一个数字30可改，30天的意思
    let lastY = lw.getFullYear();
    let lastM = lw.getMonth()+1;
    let lastD = lw.getDate();
    // 拼接
    return  lastY+"-"+(lastM<10 ? "0" + lastM : lastM)+"-"+(lastD<10 ? "0"+ lastD : lastD)+" 00:00:00"
}
export function checkPersonDate(f_time, s_time) {
    let is_new = true;
    if (this.dateFormat(f_time, true) !== this.dateFormat(s_time, true)) {
        is_new = false;
    }
    return is_new
}
export function getDeviceRealPixel(pixel_val) {
  const doc_size = document.documentElement.clientWidth
  const rem_base = 1920
  return doc_size / rem_base * pixel_val
}
