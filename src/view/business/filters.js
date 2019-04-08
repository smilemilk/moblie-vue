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
    } else if (value === '8' || value === 8) {
        item = '订单关闭';
    } else if (value === '-1') {
        item = '有退款';
    } else {
        item = '';
    }
    return item;
}

export function refundStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '1' || value === 1) {
        item = '';
    } else if (value === '2' || value === 2) {
        item = '';
    } else {
        item = '';
    }
    return item;
}
