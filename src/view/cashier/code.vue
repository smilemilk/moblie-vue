<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                left-arrow
                :z-index="999"
                @click-left="navBackClick"
        />
        <div class="cashier-wrapper container-wrapper">
            <div class="plr16 pt16">
                <div class="card ">
                    <div class="flex-content flex-content-align plr16 mb12"
                         :class="this.countDownCount ? 'flex-content-spaceBetween': 'flex-content-justify'">
                        <div class="cashier-account">收款金额：<strong
                                v-if="this.amount">￥{{amount|$_filters_moneyFormat_noComma}}</strong></div>
                        <div class="countDown" v-show="this.countDownCount">倒计时：<strong
                                class="danger">{{countDownCount}}s</strong></div>
                    </div>
                    <div class="danger align-c font-n-l"
                         v-if="!this.countDownCount && (this.breakOffStatus !== false)">二维码已失效，支付结果查询中…</div>
                    <div class="cashier-code-container">
                        <div ref="code" id="code" class="flex-content flex-content-justify"></div>
                        <div class="mt10 font-s-l">收款成功以POS收银机实际到账为准</div>
                    </div>
                </div>
            </div>

            <div class="payType-box">
                <div class="cashier-tip"><i class="icon-redPacket"></i>温馨提示：使用微脉APP扫码支付可使用优惠券哦</div>
                <ul class="payType-box-container">
                    <li class="payType-item">
                        <i class="icon-payKind icon-payKind_alipay"></i>
                        <div class="font-s-l">支付宝</div>
                    </li>
                    <li class="payType-item">
                        <i class="icon-payKind icon-payKind_wechat"></i>
                        <div class="font-s-l">微信</div>
                    </li>
                    <li class="payType-item">
                        <i class="icon-payKind icon-payKind_wm"></i>
                        <div class="font-s-l">微脉</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Tag,
        Col,
        Icon,
        Cell,
        CellGroup,
        Swipe,
        Toast,
        SwipeItem,
        GoodsAction,
        GoodsActionBigBtn,
        GoodsActionMiniBtn,
        Dialog
    } from 'vant';
    import storeData from './store/index';
    import QRCode from 'qrcodejs2';
    import ajax from '@/api/cashier';

    export default {
        components: {
            [Tag.name]: Tag,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [GoodsAction.name]: GoodsAction,
            [GoodsActionBigBtn.name]: GoodsActionBigBtn,
            [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
            QRCode: QRCode,
            Dialog: Dialog
        },
        data() {
            return Object.assign(storeData.call(this), {
                amount: undefined,
                buildingTime: 60,
                payOrderNo: '',
                countDownInterval: undefined,
                countDownCount: 0,
                queryOrderInterval: undefined,
                queryOrderCount: 0,
                orderOverStatus: false,
                breakOffStatus: false
            });
        },
        created() {
            if (this.$route && this.$route.query) {
                this.codeUrl = this.$route.query;
                this.payOrderNo = this.$route.query.payOrderNo || '';
                this.amount = this.$route.query.amount || '';
                if (Object.keys(this.codeUrl).length === 0) {
                    this.failCodeBuild();
                } else {
                    this.codeBuilding();
                    this.countDown();
                    this.queryOrder();
                }
            }
            this.$nextTick(function () {
                this.codeCanvas();
            });
        },
        methods: {
            codeBuilding() {
                Toast.loading({
                    mask: true,
                    message: '正在创建二维码订单…',
                    duration: 0,
                    className: 'buildingToast'
                });
            },
            codeCanvas() {
                let code = new QRCode('code', {
                    width: 235,  // 设置宽度
                    height: 235, // 设置高度
                    text: this.codeUrl.code || ''
                });
                if (this.codeUrl.code) {
                    Toast.clear();
                }
            },
            countDown() {
                let self= this;
                self.countDownCount = 180;
                self.countDownInterval = window.setInterval(() => {
                    self.countDownCount--;
                    if (self.countDownCount > 0 || self.countDownCount === -2) {
                    } else {
                        self.countDownCount = 0;
                        if (self.countDownCount === 0) {
                            self.orderOverStatus = true;
                            if (self.codeUrl.code) {
                                Toast.clear();
                            }
                        }
                        self.orderOverTimeAction(self.orderOverStatus);
                        window.clearInterval(self.countDownInterval);
                    }
                }, 1000);
            },
            queryOrder() {
                let self = this;
                let _count = self.queryOrderCount;

                    self.queryOrderInterval = window.setInterval(() => {
                        _count++;

                        if (_count > 5*30) { // 有效时间 5分钟，5分钟后 同一笔订单失效
                            _count = 0;
                            window.clearInterval(self.queryOrderInterval);
                        }
                        queryOrderFetch(_count);
                    }, 2000); // 2s查询一次 收款结果

                function queryOrderFetch(_count) {
                    ajax.queryOrder({
                        payOrderNo: self.payOrderNo
                    }).then(response => {
                        if (!response.success === true) {
                            Toast(response.msg || '收款状态查询失败');
                            return;
                        } else {
                            if (response.data) {
                                if (response.data.payOrderStatus) {

                                    // 0", "待支付",
                                    // "2", "支付成功",
                                    // "3", "支付失败",
                                    // "4", "支付部分成功",
                                    // "5", "转入退款",
                                    // "8", "手动取消",
                                    // "9", "废单，重复调用等方式导致废单"

                                    let payOrderStatus = response.data.payOrderStatus;
                                    if (payOrderStatus === '0' || payOrderStatus === '8') {
                                        // _count = 0;
                                        console.log(_count)
                                        // clearInterval(self.queryOrderInterval);
                                    }

                                    // 2 表示支付成功
                                    if (payOrderStatus === '2') {
                                        _count = 0;
                                        clearInterval(self.queryOrderInterval);
                                        window.clearInterval(self.countDownInterval);
                                        setTimeout(() => {
                                            self.$router.push({
                                                name: 'cashierSuccess'
                                            });
                                        }, 800);
                                    }
                                }
                            } else {
                                Toast(response.msg || '收款状态查询失败');
                                return;
                            }
                        }
                    }).catch(() => {
                        Toast('收款状态查询失败');
                        return;
                    });
                }
            },
            orderOverTimeAction(status) {
                if (status === true) {
                    this.orderOverStatus = true;

                    Dialog.confirm({
                        title: '收款已超时',
                        message: '是否撤销此次交易?',
                        showCancelButton: true,
                        confirmButtonText: '是',
                        cancelButtonText: '否'
                    }).then(() => {
                        Toast.clear();
                        this.breakOffStatus = true;
                        setTimeout(() => {
                            this.$router.push({
                                name: 'cashier',
                                query: ''
                            });
                        }, 800);
                        this.queryOrderCount = undefined;
                        window.clearInterval(this.countDownInterval);
                        window.clearInterval(this.queryOrderInterval);
                    }).catch(() => {
                        Toast.clear();
                        // this.countDown();
                    });
                }
            },
            failCodeBuild() {
                Dialog.confirm({
                    title: '创建二维码订单失败',
                    message: '',
                    showCancelButton: false,
                }).then(() => {
                    window.clearInterval(this.countDownInterval);
                    window.clearInterval(this.queryOrderInterval);

                }).catch(() => {
                    window.clearInterval(this.countDownInterval);
                    window.clearInterval(this.queryOrderInterval);
                });
            },
            navBackClick() {
                if (this.countDownCount) {
                    Dialog.confirm({
                        title: '是否撤销此次交易',
                        message: '',
                        showCancelButton: true,
                        confirmButtonText: '是',
                        cancelButtonText: '否'
                    }).then(() => {
                        Promise.all([this.cancelFetch()]).then((results) => {
                            if (results && results.length > 0) {
                                if (results[0]) {
                                    // 0", "待支付",
                                    // "2", "支付成功",
                                    // "3", "支付失败",
                                    // "4", "支付部分成功",
                                    // "5", "转入退款",
                                    // "8", "手动取消",
                                    // "9", "废单，重复调用等方式导致废单"

                                    if (results[0].success) {
                                        this.orderOverStatus = false;
                                        this.countDownCount = undefined;

                                        window.clearInterval(this.countDownInterval);
                                        window.clearInterval(this.queryOrderInterval);

                                        setTimeout(() => {
                                            this.$router.push({
                                                name: 'cashier'
                                            });
                                        }, 800);
                                    }
                                }
                            }
                        });
                    }).catch(() => {
                    });

                } else {
                    this.countDownCount = undefined;
                    this.queryOrderCount = 0;

                    window.clearInterval(this.countDownInterval);
                    window.clearInterval(this.queryOrderInterval);
                    setTimeout(() => {
                        this.$router.push({
                            name: 'cashier'
                        });
                    }, 800);
                }
            },
            cancelFetch() {
                return new Promise((resolve, reject) => {
                    ajax.cancelOrder({
                        payOrderNo: this.payOrderNo
                    }).then(response => {
                        if (!response.success === true) {
                            if (response.errorNo == '103039') {
                                this.countDownCount = undefined;
                                this.queryOrderCount = 0;

                                window.clearInterval(this.countDownInterval);
                                window.clearInterval(this.queryOrderInterval);
                                setTimeout(() => {
                                    this.$router.push({
                                        name: 'cashier'
                                    });
                                }, 800);
                            } else {
                                Dialog.confirm({
                                    title: '撤销订单提交失败,是否返回收款页',
                                    message: '',
                                    showCancelButton: true,
                                    confirmButtonText: '是',
                                    cancelButtonText: '否'
                                }).then(() => {
                                    this.countDownCount = undefined;
                                    this.queryOrderCount = 0;

                                    window.clearInterval(this.countDownInterval);
                                    window.clearInterval(this.queryOrderInterval);
                                    setTimeout(() => {
                                        this.$router.push({
                                            name: 'cashier'
                                        });
                                    }, 800);
                                }).catch(() => {
                                });
                                return;
                            }
                        } else {
                            if (response.data) {
                              return resolve(response);
                            } else {
                                Toast(response.msg || '撤销订单提交失败');
                                return reject({});
                            }
                        }
                    }).catch(() => {
                        Toast('撤销订单提交失败');
                        return reject({});
                    });
                })

            }
        },
        beforeDestroy() {
            window.clearInterval(this.countDownInterval);
            window.clearInterval(this.queryOrderInterval);
            Toast.clear();
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .cashier {
        &-wrapper {
            .card {
                padding: 16px 0 18px;
            }
            .icon-redPacket {
                display: inline-block;
                width: 29px;
                height: 29px;
                vertical-align: middle;
                margin-right: 6px;
                background-image: url("../../images/icon_redPacket@2x.png");
                background-repeat: no-repeat;
                background-position: top center;
                background-size: 100% auto;
            }
            .payType-box {
                padding-top: 13px;
                text-align: center;
                &-container {
                    margin-top: 14px;
                    display: inline-block;
                }
                .payType-item {
                    display: inline-block;
                    margin-left: 10vw;
                    margin-right: 10vw;
                    .font-s-l {
                        margin-top: 2px;
                    }
                }
            }
        }
        &-account {
            color: @text-color;
            font-size: @font-large;
            line-height: 1.5;
            text-align: center;
            strong {
                font-size: @font-huge;
                color: @text-color-dark;
                font-weight: @font-weight_800;
            }
        }
        &-tip {
            width: 100%;
            background-color: @yellow;
            color: @redLight;
            font-size: @font-smaller;
            line-height: 1.5;
            padding: 7px 14px 7px 12px;
        }
        &-code-container {
            padding-left: 45px;
            padding-right: 45px;
            text-align: center;
            margin-top: 17px;
            img {
                display: inline-block;
                width: 100%;
            }
        }
    }

    .countDown {
        color: @text-color;
        font-size: @font-small;
        strong {
            display: inline-block;
            text-align: right;
            width: 30px;
        }
    }

    @media screen and (max-width: 374px) {
        .cashier-tip[data-v-6b7a064c] {
            font-size: 10px;
            padding-left:0;
            padding-right:0;
        }
    }
</style>
