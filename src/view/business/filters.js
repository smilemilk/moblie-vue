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
    } else if (value === '3' || value === 3) {
        item = '交易失败';
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
    } else if (value === '3' || value === 3) {
        item = '交易失败';
    } else {
        item = '';
    }
    return item;
}

export function orderDetailStatus(value, refund) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0' || value === 0) {
        item = '待支付';
    } else if (value === '3' || value === 3) {
        item = '交易失败';
    } else if (value === '8' || value === 8) {
        item = '订单关闭';
    } else if (value === '2' || value === 2) {

        if (refund !== '0' && refund !== 0) {
            item = '有退款';
        } else {
            item = '交易成功';
        }
    } else {
        item = '';
    }
    return item;
}

export function refundPrimaryStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0' || value === 0) {
        item = '待退款';
    } else if (value === '1' || value === 1) {
        item = '交易成功';
    } else if (value === '2' || value === 2) {
        item = '交易成功';
    } else if (value === '3' || value === 3) {
        item = '交易失败';
    } else {
        item = '';
    }
    return item;
}

export function refundDetailStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0' || value === 0) {
        item = '待退款';
    } else if (value === '1' || value === 1) {
        item = '交易成功';
    } else if (value === '2' || value === 2) {
        item = '交易成功';
    } else if (value === '3' || value === 3) {
        item = '交易失败';
    } else {
        item = '';
    }
    return item;
}
