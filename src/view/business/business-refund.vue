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

                <refund-opera
                        :limitAmount="limitAmount"
                        ref="refund"
                        @submit="submitFetch"
                ></refund-opera>

                <div class="title-division">订单信息</div>
                <div class="detail-cells">
                    <div class="detail-cell" v-if="businessInfo.discountAmount">
                        <label class="detail-cell-label">优惠金额（元）</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span">{{businessInfo.discountAmount | $_filters_moneyFormat_fen}}</span>
                        </div>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">支付方式</label>
                        <span class="detail-cell-span">{{businessInfo.payType=== 'alipay'? '支付宝': businessInfo.payType=== 'wx'? '微信': businessInfo.payType===
                            'wm'?
                            '微脉':'-'}}</span>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">{{businessInfo.payType=== 'alipay'? '支付宝': businessInfo.payType=== 'wx'? '微信': businessInfo.payType===
                            'wm'?
                            '微脉':''}}订单号</label>
                        <span class="detail-cell-span">{{businessInfo.tradeThirdNo || '-'}}</span>
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
            </div>

            <div class="refund-btn-fixed">
                <div class="refund-btn-wrapper">
                    <button
                            class="
                            refund-btn-cancel
                            btn
                         "
                            @click="navBackClick()"
                          >取消
                    </button>
                    <button
                            class="
                         btn
                         refund-btn-ensure
                         "
                            @click="refundSubmit()">确定退款
                    </button>
                </div>
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
    import storeData from './store/business-detail';
    import ajax from '@/api/business';
    import RefundOpera from './business-refund/refund';
    import {payFundStatus} from '@/filters/status';

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
            RefundOpera,
            Dialog
        },

        data() {
            return Object.assign(storeData.call(this), {
                queryOrder: {
                    payOrderNo: ''
                },
                businessInfo: {
                    discountAmount: '',
                    payType: '', // 支付方式
                    tradeOrderName: '',
                    tradeAmount: '',
                    tradeOrderNo: '',
                    operatorName: '',
                    createTime: '',
                    remark: ''
                },
                limitAmount: this.$route.query.amount+'' || '',
            });
        },
        created() {
            this.queryOrder.payOrderNo = this.$route.query.tradeOrderNo;
            this.getOrderDetail();
        },
        methods: {
            getOrderDetail() {
                ajax.getPay(this.queryOrder).then(response => {
                    if (!response.success === true) {
                        this.businessInfo = {};
                        return;
                    } else {
                        this.businessInfo = {
                            ...this.businessInfo,
                            discountAmount: response.data.discountAmount || '',
                            tradeAmount: response.data.buyerPayAmount || '',
                            tradeOrderNo: response.data.payOrderNo || '',
                            operatorName: response.data.operName || '',
                            createTime: response.data.createTime || '',
                            remark: response.data.paySubmitRemark || '',
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

                    }
                }).catch(() => {
                    this.businessInfo = {};
                });
            },
            refundSubmit() {
                if ((this.$refs.refund.amount*100 < 1) || this.$refs.refund.amount == '.') {
                    Toast('退款金额大于0');
                    return;
                } else {
                    Dialog.confirm({
                        title: '确认对该笔交易进行退款?',
                        message: ''
                    }).then(() => {
                        this.$refs.refund.$emit('getValue'); // 触发退款组件事件
                    }).catch(() => {
                    });
                }
            },

            submitFetch(res) {

                let fetchLoading = Toast.loading({
                    mask: true,
                    message: '退款请求中...'
                });
                ajax.refund({
                    payOrderNo: this.queryOrder.payOrderNo,
                    refundAmount: res.amount*100,
                    refundId: (Math.floor(Math.random()*10000000000000000+1))+'',
                    remark: res.remark
                }).then(response => {
                    fetchLoading.clear();
                    let refundStatus;
                    let msg;
                    if (!response.success === true) {
                        refundStatus ='0';
                        msg='退款请求失败';

                        this.$toast(response.msg || msg);
                        return;
                    } else {
                        if (response.data.refundOrderStatus === '3' ||
                            response.data.refundOrderStatus === 3) {
                            refundStatus ='0';
                            msg=response.data.errorMessage;
                        }
                    }

                    setTimeout(() => {
                        this.$router.push({
                            name: 'businessRefundResult',
                            query: {
                                tradeOrderNo: this.$route.query.tradeOrderNo,
                                refundOrderNo: response.data.refundOrderNo,
                                resultStatus: refundStatus,
                                msg: msg
                            }
                        });
                    }, 800);

                }).catch(() => {
                    Toast('退款失败');
                    fetchLoading.clear();
                });
            },
            ensureAction() {

            },
            navBackClick() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'businessDetail',
                        query: {
                            tradeOrderNo: this.$route.query.tradeOrderNo,
                            tradeType: this.$route.query.tradeType
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

    .title-division {
        display:flex;
        align-items: center;
        font-size: @font-normal;
        color: @text-color;
        height: 36px;
        padding-left: 16px;
        box-sizing: border-box;
        background-color: @background-grayer-color;
    }
    .detail-cells {
        border-bottom: 1px solid @border-color;
        padding-bottom: 0;
    }
    .detail-cell {
        padding: 16px;
        border-bottom: 1px solid @border-color;
        &-label {
            min-width: 86px;
        }
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

    .refund-btn{
        &-fixed {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
        }
        &-wrapper {
            width: 100%;
            height: 44px;
            overflow: hidden;
            box-sizing: border-box;
            display: flex;
        }
        &-cancel {
            width:114px;
            height: 44px;
            color: @main-theme-color;
            font-size: @font-large;
            background-color: @white;
            border: none;
            border-radius: 0;
        }
        &-ensure {
            height: 44px;
            color: @white;
            font-size: @font-large;
            background-color: @main-theme-color;
            border: none;
            border-radius: 0;
            flex: 1;
        }
    }
</style>
