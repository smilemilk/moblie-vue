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

            <div class="mt30">
                <div class="refund-btn-wrapper">
                    <button
                            class="
                            refund-btn-cancel
                         btn
                         "
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
                    orderStatus: '', // 0 待支付，2 成功，8 订单关闭， 10 退款
                    startDate: '',
                    endDate: '',
                    tradeOrderNo: '',
                    payOrderType: 'xxsk',
                    limit: 1,
                    page: 1
                },
                businessInfo: {

                }
            });
        },
        created() {
            this.queryOrder.tradeOrderNo = this.$route.query.tradeOrderNo;
            this.queryOrder.startDate = this.$route.query.date+'000000';
            this.queryOrder.endDate = this.$route.query.date+'235959';
            // this.getOrderDetail();
        },
        methods: {
            getOrderDetail() {
                ajax.getTrade(this.queryOrder).then(response => {
                    if (!response.success === true) {
                        this.businessInfo = {};
                        return;
                    } else {
                        this.businessInfo = response.data.items[0];
                    }
                }).catch(() => {
                    this.businessInfo = {};
                });
            },
            refundSubmit() {
                ajax.refund({
                    payOrderNo: 'test22019031191860393927901185881',
                    refundAmount: 1,
                    refundId: Math.floor(Math.random()*10000000000000000+1),
                    remark: '3'
                }).then(response => {
                    if (!response.success === true) {
                        this.businessInfo = {};
                        return;
                    } else {
                        this.businessInfo = response.data.items[0];
                    }
                }).catch(() => {
                    this.businessInfo = {};
                });
            },
            ensureAction() {

            },
            navBackClick() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'home'
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

    .refund-btn{
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
