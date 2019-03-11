// 合法uri
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

// 小写字母
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str)
}

// 大写字母
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
}

// 大小写字母
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
}

// 非小于0的数值可小数
export function validaDouble(str) {
    const reg = /^[0-9]\d*(\.\d+)?$/;
    return reg.test(str);
}

// 数字和字母
export function validaNumberCharacter(str) {
    const reg = /^[a-zA-Z0-9]+$/;
    return reg.test(str);
}

// 正整数
export function validaInt(str) {
    const reg = /^\d+$/;
    return reg.test(str);
}

export function validaPlus(str) {
    const reg=/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    return reg.test(str);
}

// 手机
export function validaMobile(str) {
    const reg = /^1[34578]\d{9}$/;
    return reg.test(str);
}


