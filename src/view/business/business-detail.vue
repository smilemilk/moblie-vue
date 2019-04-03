<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                left-arrow
                :z-index="999"
                @click-left="navBackClick"
        />
        <div class="business_detail-wrapper container-wrapper">
            <div class="business_detail-container">
                <div class="detail-item">
                    <div class="detail-item-name">{{businessInfo.tradeOrderName}}</div>
                    <div class="detail-item-title mt10">{{businessInfo.tradeType|$_filters_moneyMark}}{{businessInfo.tradeAmount | $_filters_moneyFormat_fen}}</div>
                    <div class="detail-item-tip mt2">{{businessInfo.tradeStatusText}}</div>
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
                            <span class="detail-cell-span">{{businessInfo.payType || '-'}}</span>
                        </div>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">微信订单号</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span">{{businessInfo.tradeThirdNo || '-'}}</span>
                        </div>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">支付流水号</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span">{{businessInfo.tradeOrderNo || '-'}}</span>
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
                            <span class="detail-cell-span" v-else>'-'</span>
                        </div>
                    </div>
                    <div class="detail-cell" v-if="businessInfo.remark">
                        <label class="detail-cell-label">备注</label>
                        <div class="detail-cell-right">
                            <span class="detail-cell-span">
                                <span
                                        style="text-align: justify;
                                               display: inline-block;
                                               overflow-wrap: break-word;"
                                >{{businessInfo.remark}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="overdraw-item plr16 ptb10"
                     v-if="queryOrderType === 'pay' && overdrawStatus"
                >
                    已超过30天可退款时间，不可退款
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
                        v-if="refundShow"
                        @click="refundAction()">退款
                </button>
                <button
                        class="
                         btn
                         btn-block
                         btn-ghost
                         mb16
                         "
                        v-if="cancelShow"
                        @click="cancelAction()">撤销订单
                </button>
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
    import {orderStatus, refundStatus} from '@/filters/status';

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
                    remark: ''
                },
                // orderStatus: '',
                refundShow: false,
                cancelShow: false,
                overdrawStatus: false, // 是否超时30天
            });
        },
        created() {
            this.queryOrder.orderNo = this.$route.query.tradeOrderNo;
            this.queryOrderType = this.$route.query.tradeType === '1' ? 'pay' : this.$route.query.tradeType === '0' ? 'refund' : '';
            this.getOrderDetail();
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
                            remark: response.data.paySubmitRemark || '',
                            tradeStatusText: orderStatus(response.data.payOrderStatus)
                        };

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
                            operatorName: response.data.operName || '',
                            createTime: response.data.createTime || '',
                            remark: response.data.paySubmitRemark || ''
                        };
                    }
                }).catch(() => {
                    this.businessInfo = {};
                });
            },
            // getOrderDetail() {
            //     ajax.getOrderDetail(this.queryOrder).then(response => {
            //         if (!response.success === true) {
            //             this.businessInfo = {};
            //             return;
            //         } else {
            //             this.businessInfo = response.data.items;
            //         }
            //     }).catch(() => {
            //         this.businessInfo = {};
            //     });
            // },

            refundAction() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'businessRefund',
                        query: {
                            tradeOrderNo: this.$route.query.tradeOrderNo
                        }
                    });
                }, 800);
            },
            cancelAction() {
                ajax.cancel({payOrderNo: this.queryOrder.orderNo}).then(response => {
                    if (!response.success === true) {
                        this.$toast(response.data.msg || '撤销订单失败');
                        return;
                    } else {

                    }
                }).catch(() => {
                    this.$toast('撤销订单失败');
                });
            },
            ensureAction() {

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
