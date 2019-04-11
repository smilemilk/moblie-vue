<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                left-arrow
                :z-index="999"
                @click-left="navBackClick"
        />
        <div class="business_detail-wrapper container-wrapper" style="overflow-y: auto;">
            <div class="business_detail-container">
                <div class="detail-item">
                    <div class="detail-item-name">{{businessInfo.tradeOrderName}}</div>
                    <div class="detail-item-title mt10"
                    >
                        <span
                                v-if="((businessInfo.tradeAmount+'').indexOf('+')) <= -1 &&
                        ((businessInfo.tradeAmount+'').indexOf('-') <= -1 && businessInfo.tradeStatusText !== '订单关闭' && businessInfo.tradeStatusText !== '待支付')"
                        >{{businessInfo.tradeType|$_filters_moneyMark}}</span>
                        {{businessInfo.tradeAmount |
                        $_filters_moneyFormat_fen}}
                    </div>
                    <div class="detail-item-tip mt2"
                         :class="businessInfo.tradeStatusText === '待支付' ? 'orange' : ''"
                    >{{businessInfo.tradeStatusText}}</div>
                </div>
                <div class="detail-cells plr16">
                    <div class="detail-cell">
                        <label class="detail-cell-label">交易类型</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span">{{businessInfo.tradeType==='1' ? '消费' : businessInfo.tradeType==='0' ? '退款' : ''}}</span>
                        </div>
                    </div>
                    <div class="detail-cell" v-if="businessInfo.discountAmount">
                        <label class="detail-cell-label">优惠金额（元）</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span">{{businessInfo.discountAmount | $_filters_moneyFormat_fen}}</span>
                        </div>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">支付方式</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span">{{businessInfo.payType=== 'alipay' ? '支付宝': businessInfo.payType=== 'wx'? '微信': businessInfo.payType===
                            'wm'?
                            '微脉':'-'}}</span>
                        </div>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">
                            {{businessInfo.payType=== 'alipay' ? '支付宝': businessInfo.payType=== 'wx'? '微信':
                            businessInfo.payType===
                            'wm'?
                            '微脉':''}}订单号</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span">{{businessInfo.tradeThirdNo || '-'}}</span>
                        </div>
                    </div>
                    <div class="detail-cell media">
                        <label class="detail-cell-label">支付流水号</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span" v-if="businessInfo.tradeOrderNo &&
                                  businessInfo.tradeOrderNo.length > 30">
                                <span class="detail-cell-span-text"
                                >{{businessInfo.tradeOrderNo}}</span>
                            </span>
                            <span class="detail-cell-span" v-else>
                                {{businessInfo.tradeOrderNo || '-'}}</span>
                        </div>
                    </div>
                    <div class="detail-cell media" v-if="queryOrderType === 'refund'">
                        <label class="detail-cell-label">退款流水号</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span" v-if="businessInfo.refundOrderNo &&
                                  businessInfo.refundOrderNo.length > 30">
                                <span class="detail-cell-span-text"
                                >{{businessInfo.refundOrderNo}}</span>
                            </span>
                            <span class="detail-cell-span" v-else>
                                {{businessInfo.refundOrderNo || '-'}}</span>
                        </div>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">操作人</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span">{{businessInfo.operatorName || '-'}}</span>
                        </div>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">创建时间</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span" v-if="businessInfo.createTime">{{businessInfo.createTime|$_filters_parseTime}}</span>
                            <span class="detail-cell-span" v-else>-</span>
                        </div>
                    </div>
                    <div class="detail-cell media" v-if="businessInfo.remark">
                        <label class="detail-cell-label">备注</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span" v-if="businessInfo.remark.length > 30">
                                <span class="detail-cell-span-text"
                                >{{businessInfo.remark}}</span>
                            </span>
                            <span class="detail-cell-span" v-else>
                                {{businessInfo.remark}}</span>
                        </div>
                    </div>
                </div>
                <div class="overdraw-item plr16 ptb10"
                     v-if="queryOrderType === 'pay' && overdrawStatus"
                >
                    已超过30天可退款时间，不可退款
                </div>
                <div class="overdraw-item plr16 ptb10 align-c"
                     v-if="queryOrderType === 'refund'"
                     style="cursor: pointer;"
                >
                    <span class="info cursor"
                          @click="primaryOrderAction()"
                          v-if="queryOrderType === 'refund'"
                    >查看原订单</span>
                </div>
            </div>

            <div class="mt30 plr16">
                <button
                        class="
                         btn
                         btn-block
                         btn-ghost
                         mb16
                         "
                        :class="isRefundStatus && operLimitStatus ? '' : 'btn-disabled'"
                        v-if="refundShow"
                        :disabled="!isRefundStatus && operLimitStatus"
                        @click="refundAction()">退款
                </button>
                <!--<button-->
                        <!--class="-->
                         <!--btn-->
                         <!--btn-block-->
                         <!--btn-ghost-->
                         <!--mb16-->
                         <!--"-->
                        <!--v-if="cancelShow"-->
                        <!--@click="cancelAction()">撤销订单-->
                <!--</button>-->
                <button
                        class="
                         btn
                         btn-block
                         btn-primary
                         "
                        @click="ensureAction()">确定
                </button>
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
        GoodsActionMiniBtn
    } from 'vant';
    import storeData from './store/business-detail';
    import ajax from '@/api/business';
    import moment from 'moment';
    import {payFundStatus} from '@/filters/status';
    import {refundDetailStatus, refundPrimaryStatus, orderDetailStatus} from './filters';

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
            Toast
        },

        data() {
            return Object.assign(storeData.call(this), {
                queryOrder: {
                    orderNo: ''
                },
                queryOrderType: '',
                businessInfo: {
                    tradeStatusText: '', // 展示状态
                    tradeOrderName: '',
                    tradeAmount: '',
                    tradeType: this.$route.query.tradeType,
                    discountAmount: '',
                    tradeOrderNo: '',
                    operatorName: '',
                    createTime: '',
                    remark: '',
                    tradeThirdNo: ''
                },
                refundShow: false,
                isRefundStatus: false, // 是否具有退款 可以属性
                // cancelShow: false,

                operLimitStatus: false, // 判断是管理员还是非，并且是不是本人操作， oneDay i can not code，i want eat， 改变为了活着去工作
                overdrawStatus: false, // 是否超时30天,
                // resultForm: false, // 是否从退款状态页 来的
                resultStatus: undefined, // 从退款状态页来的， 退款的成败状态
                primaryNo: '', // resultForm,resultStatus基础上下个操作
            });
        },
        created() {
            this.queryOrder.orderNo = this.$route.query.tradeOrderNo;
            this.queryOrderType = this.$route.query.tradeType === '1' ? 'pay' :
                this.$route.query.tradeType === '0' ? 'refund' : '';

            if (this.queryOrder.orderNo && this.queryOrderType) {
                this.getOrderDetail();
            }

            // this.resultForm = this.$route.query.resultForm || false;
            // if (this.$route.query.resultForm) {
                this.resultStatus = this.$route.query.resultStatus;
            // }
        },
        watch: {
            '$route'() {
                if (this.$route.path.indexOf('businessDetail') > -1 && this.$route.query.back) {
                    this.getPayDetail();
                }
            }
        },
        methods: {
            getOrderDetail() {

                if (this.queryOrderType === 'pay') {
                    this.getPayDetail();
                }

                if (this.queryOrderType === 'refund') {
                    this.getRefundDetail();
                }
            },

            getPayDetail() {
                ajax.getPay({payOrderNo: this.queryOrder.orderNo}).then(response => {
                    if (!response.success === true) {
                        this.businessInfo = {};
                        return;
                    } else {
                        this.businessInfo = {
                            ...this.businessInfo,
                            tradeOrderName: response.data.payOrderName || '',
                            tradeAmount: response.data.buyerPayAmount || '',
                            discountAmount: response.data.discountAmount || '',
                            tradeOrderNo: response.data.payOrderNo || '',
                            operatorName: response.data.operName || '',
                            createTime: response.data.createTime || '',
                            remark: response.data.merchantRemark || '',
                            tradeStatusText: orderDetailStatus(response.data.payOrderStatus, response.data.refundStatus),
                        };

                        if (response.data.items) {
                            for (let i in response.data.items) {
                                if (response.data.items[i].payType) {
                                    this.businessInfo.payType = payFundStatus(response.data.items[i].payType);
                                    this.businessInfo.tradeThirdNo = response.data.items[i].settleNo;
                                    break;
                                }
                            }
                        }

                        if (response.data.payOrderStatus === '2' ||
                            response.data.payOrderStatus === 2) { //支付成功
                            this.refundShow = true;

                            if (
                                response.data.refundStatus === "" || response.data.refundStatus === null ||
                                response.data.refundStatus === "0" || response.data.refundStatus === 0
                            ) {
                                this.isRefundStatus = true;
                            } else {
                                this.isRefundStatus = false;
                            }

                            // 管理员和非管理员 以及是否是本人
                            this.$store.dispatch('managerInfo', this).then(() => {
                                if (this.$store.state.managerFetching === true) {
                                    const data = this.$store.state.managerStatus;

                                    if (data.success) {
                                        if (data.data.isMerchant === true) {
                                            this.operLimitStatus = true;
                                        } else {
                                            if (response.data.operId === data.data.userId) {
                                                this.operLimitStatus = true;
                                            } else {
                                                this.operLimitStatus = false;
                                            }
                                        }
                                    }
                                } else {
                                    Toast('获取操作权限接口失败');
                                    return;
                                }
                            }).catch((err) => {
                                Toast('获取操作权限接口失败');
                                console.log(err);
                            });

                        } else {
                            this.refundShow = false;
                        }

                        // 是否超过30天的逻辑
                        if (response.data.createTime) {
                            const thirtydaystime = moment(response.data.createTime).valueOf() + 30 * 24 * 60 * 60 * 1000;
                            const currentTime = moment(new Date()).valueOf();

                            if (thirtydaystime < currentTime) {
                                this.overdrawStatus = true;
                            } else {
                                this.overdrawStatus = false;
                            }
                        }

                        // 撤销操作的逻辑
                        // if (response.data.payOrderStatus === '0' ||
                        //     response.data.payOrderStatus === 0) {
                        //     this.cancelShow = true;
                        // } else {
                        //     this.cancelShow = false;
                        // }
                    }
                }).catch(() => {
                    this.businessInfo = {};
                });
            },
            getRefundDetail() {
                ajax.getRefund({refundOrderNo: this.queryOrder.orderNo}).then(response => {
                    if (!response.success === true) {
                        this.businessInfo = {};
                        return;
                    } else {
                        this.businessInfo = {
                            ...this.businessInfo,
                            tradeOrderName: response.data.payOrderName || '',
                            tradeAmount: response.data.buyerPayAmount || '',
                            discountAmount: response.data.discountAmount || '',
                            tradeOrderNo: response.data.payOrderNo || '',
                            operatorName: response.data.operName || '',
                            createTime: response.data.createTime || '',
                            remark: response.data.merchantRemark || '',
                            tradeStatusText: refundPrimaryStatus(response.data.payOrderStatus),
                            payType: payFundStatus(response.data.payType),
                            refundOrderNo: response.data.refundOrderNo || ''
                        };


                        if (!response.data.refundOrderNo) {
                            this.businessInfo.refundOrderNo = this.queryOrder.orderNo;
                        }

                        if (this.resultStatus) {
                            this.businessInfo.tradeStatusText = refundDetailStatus(response.data.payOrderStatus);
                        }

                        if (response.data.items) {
                            for (let i in response.data.items) {
                                if (response.data.items[i].payType) {
                                    this.businessInfo.payType = payFundStatus(response.data.items[i].payType);
                                    this.businessInfo.tradeThirdNo = response.data.items[i].settleNo;
                                    break;
                                }
                            }
                        }

                        // if (this.resultForm && this.resultStatus === '1') {
                            this.primaryNo = response.data.payOrderNo;
                        // }
                    }
                }).catch(() => {
                    this.businessInfo = {};
                });
            },
            refundAction() {
                if (this.operLimitStatus == false) {
                    Toast('非本人订单，无法退款');
                    return;
                }
                setTimeout(() => {

                    let self = this;
                    self.$router.push({
                        name: 'businessRefund',
                        query: {
                            tradeOrderNo: this.$route.query.tradeOrderNo,
                            amount: this.businessInfo.tradeAmount,
                            tradeType: this.$route.query.tradeType
                        }
                    });
                }, 800);
            },
            // cancelAction() {
            //     ajax.cancel({payOrderNo: this.queryOrder.orderNo}).then(response => {
            //         if (!response.success === true) {
            //             this.$toast(response.data.msg || '撤销订单失败');
            //             return;
            //         } else {
            //
            //         }
            //     }).catch(() => {
            //         this.$toast('撤销订单失败');
            //     });
            // },
            ensureAction() {
                this.navBackClick();
            },
            primaryOrderAction() {
                this.queryOrderType = '';
                this.resultStatus = undefined;
                this.businessInfo =  {
                    ...this.businessInfo,
                    tradeStatusText: '', // 展示状态
                        tradeOrderName: '',
                        tradeAmount: '',
                        tradeType: '',
                        discountAmount: '',
                        tradeOrderNo: '',
                        operatorName: '',
                        createTime: '',
                        remark: '',
                        tradeThirdNo: ''
                };
                setTimeout(() => {
                    this.$router.push({
                        name: 'businessDetail',
                        query: {
                            tradeOrderNo: this.primaryNo,
                            tradeType: '1',
                            back: 'back'
                        }
                    });
                    this.queryOrder.orderNo = this.primaryNo;
                }, 800);
            },
            navBackClick() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'business',
                        query: {
                            date: this.$route.query.date,
                            orderStatusStr: this.$route.query.orderStatusStr
                        }
                    });
                }, 800);
            },
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .business_detail-container {
        background-color: @white;
    }

    .detail-item {
        padding: 16px 0;
        &-name,
        &-title,
        &-tip {
            text-align: center;
            line-height: 1.5;
        }
        &-name {
            color: @text-color;
            font-size: @font-normal;
        }
        &-title {
            color: @text-color;
            font-size: @font-largest;
        }
        &-tip {
            color: @text-color-light;
            font-size: @font-normal;
        }
    }

    .overdraw-item {
        font-size: @font-normal;
        color: @text-color;
        border-top: 1px solid @border-color;
    }
</style>
