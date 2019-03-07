export default function () {
    return {
        orderStatusList: [
            {value: '全部', key: 'all'},
            {value: '交易成功', key: 'success'},
            {value: '订单关闭', key: 'close'},
            {value: '待支付', key: 'wait'},
            {value: '退款', key: 'refund'}
        ],
        dateSearch: '',
        orderList: []
    }
}
