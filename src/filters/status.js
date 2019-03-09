export function orderStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0' || value === 0) {
        item = '待支付';
    } else if (value === '2' || value === 2) {
        item = '支付成功';
    } else if (value === '3' || value === 3) {
        item = '支付失败';
    } else if (value === '4' || value === 4) {
        item = '支付部分成功';
    } else if (value === '5' || value === 5) {
        item = '转入退款';
    } else if (value === '8' || value === 8) {
        item = '手动取消';
    } else if (value === '9' || value === 9) {
        item = '废单，重复调用等方式导致废单';
    } else {
        item = '';
    }
    return item;
}
