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
                    <div class="detail-item-title mt10">{{businessInfo.tradeAmount | $_filters_moneyFormat_fen}}</div>
                    <div class="detail-item-tip mt2">{{businessInfo.tradeType+''}}</div>
                </div>
                <div class="detail-cells plr16">
                    <div class="detail-cell">
                        <label class="detail-cell-label">交易类型</label>
                        <span class="detail-cell-span">{{businessInfo.tradeType}}</span>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">优惠金额（元）</label>
                        <span class="detail-cell-span">{{businessInfo.tradeType}}x</span>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">支付方式</label>
                        <span class="detail-cell-span">{{businessInfo.payType}}</span>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">微信订单号</label>
                        <span class="detail-cell-span">{{businessInfo.tradeThirdNo}}</span>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">支付流水号</label>
                        <span class="detail-cell-span">{{businessInfo.tradeOrderNo}}</span>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">操作人</label>
                        <span class="detail-cell-span">{{businessInfo.tradeOrderNo}}x</span>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">创建时间</label>
                        <span class="detail-cell-span">0000</span>
                    </div>
                    <div class="detail-cell">
                        <label class="detail-cell-label">备注</label>
                        <span class="detail-cell-span">0000</span>
                    </div>
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
                        @click="refundAction()">退款
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
            [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
        },

        data() {
            return Object.assign(storeData.call(this), {
                queryOrder: {
                    orderNo: '',
                    queryOrderType: '',
                },
            });
        },
        created() {
            this.queryOrder.orderNo = this.$route.query.tradeOrderNo;
            this.queryOrder.queryOrderType = this.$route.query.tradeType === '1' ? 'pay' :this.$route.query.tradeType === '0' ? 'refund' : '';
            this.getOrderDetail();
        },
        methods: {
            getOrderDetail() {
                ajax.getOrderDetail(this.queryOrder).then(response => {
                    if (!response.success === true) {
                        this.businessInfo = {};
                        return;
                    } else {
                        this.businessInfo = response.data.items;
                    }
                }).catch(() => {
                    this.businessInfo = {};
                });
            },
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
            ensureAction() {

            },
            navBackClick() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'business'
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

    .detail {
        &-cells {

        }
        &-cell {
            position: relative;
            padding-bottom: 8px;
            box-sizing: border-box;
            &-label,
            &-span {
                display: inline-block;
                font-size: @font-normal;
                line-height: 1.25;
            }
            &-label {
                color: @text-color-normal;
            }
            &-span {
                color: @text-color;
                position: absolute;
                right: 0;
            }
        }
    }
</style>
