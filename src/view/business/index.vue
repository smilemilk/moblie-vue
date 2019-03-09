<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                left-arrow
                :z-index="999"
                @click-left="navBackClick"
        />
        <div class="dailyKnots-wrapper container-wrapper white">
            <div class="panel-item flex-content flex-content-align flex-content-spaceBetween">
                <div class="panel-item-select"
                     @click="orderStatusToggleHandle()"
                     :class="orderStatusShow ? 'panel-item-select_down':''"
                >筛选
                </div>
                <div @click="orderHistoryAction()"
                     class=""
                >
                    <i class="icon-search"></i>
                    搜索
                </div>
            </div>
            <div class="panel-downContainer" v-if="orderStatusShow">
                <ul class="panel-downBody">
                    <li
                            v-for="(item,key) in orderStatusList"
                            :key="item.key"
                            :style="key === 5 ? {visibility: 'hidden'} : {}"
                            :class="item.key === orderSelected ? 'active' :''"
                            @click="orderStatusChooseHandle(item.key)"
                            class="panel-downBody-item flex-content flex-content-align flex-content-justify"
                    >{{item.value}}
                    </li>
                </ul>
                <button
                        class="
                         btn
                         btn-block
                         btn-primary
                         mt10"
                        @click="orderStatusAction()"
                >确定
                </button>
            </div>
            <div class="interval-item flex-content flex-content-align flex-content-spaceBetween">
                <div class="date-select-box">
                    <span>{{this.dateSearch|$_filters_parseDate}}</span>
                    <i class="icon-triangle-dark ml5"></i>
                </div>
                <div class=""
                     v-if="this.orderList && this.orderList.length>0">
                    <div class="font-xs-l">实收 ￥980.80 <span class="ml20">收入 ￥19920.00</span></div>
                    <div class="font-xs-l flex-content flex-content-end">退款 ￥2000.00</div>
                </div>
            </div>

            <div class="set-form cell-group" v-if="this.orderList && this.orderList.length>0">
                <div class="cell" v-for="(item, key) in this.orderList" :key="key">
                    <div class="cell-inner flex-content flex-content-spaceBetween">
                        <div class="flex-content flex-content-top">
                            <i class="icon-payType icon-payType_alipay mr10"></i>
                            {{item.payType}}
                            <div>
                                <div class="font-n-d">{{item.tradeOrderName}}</div>
                                <div class="font-s-d mt10">
                                    {{item.tradeThirdNo}}
                                </div>
                                <div class="font-s-d">
                                    {{item.radeOrderNo}}
                                </div>
                                <div class="time">{{item.tradeTime}}</div>
                            </div>

                        </div>

                        <div class="cell-right">
                            <div class="font-l-d">{{item.tradeAmount}}</div>
                            <div class="font-s-b mt4 align-r">{{item.tradeType}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                    v-else
                    class="order-none-container"
            >
                <div class="prompt-item prompt_small">
                    <i class="prompt-img noneFound"></i>
                    <div class="font-l-d align-c mt14">还没有交易记录哦！</div>
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
    import storeData from './store/index';
    import ajax from '@/api/business';
    import moment from 'moment';

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
                    limit: 20,
                    page: 1
                },
                orderStatusShow: false
            });
        },
        created() {
            this.dateSearch = new Date();
            this.queryOrder = {
                ...this.queryOrder,
                startDate: moment(this.dateSearch).format("YYYYMMDD") + '000000',
                endDate: moment(this.dateSearch).format("YYYYMMDD") + "235959"
            };
            this.getOrderList();
            this.getOrderSumAmount();
        },
        methods: {
            getOrderList() {
                ajax.getTrade(this.queryOrder).then(response => {
                    if (!response.success === true) {
                        this.orderList = [];
                        return;
                    } else {
                        this.orderList = response.data.items;
                    }
                }).catch(() => {
                    this.orderList = [];
                });
            },
            getOrderSumAmount() {
                ajax.getTradeSumAmount({
                    startDate: this.queryOrder.startDate,
                    endDate: this.queryOrder.endDate,
                    orderStatus: '', // 0 待支付，2 成功，8 订单关闭， 10 退款
                    tradeOrderNo: '',
                    payOrderType: 'xxsk',
                }).then(response => {
                    if (!response.success === true) {

                    } else {

                    }
                }).catch(() => {
                });
            },
            orderStatusAction() {


                const orderStatus = {
                    'all': '',
                    'success': '2',
                    'close': '8',
                    'wait': '0',
                    'refund': '10'
                };

                this.queryOrder = {
                    ...this.queryOrder,
                    orderStatus: orderStatus[this.orderSelected],
                    page: 1
                };
                this.getOrderList();
            },
            orderStatusToggleHandle() {
                this.orderStatusShow = !this.orderStatusShow;
            },
            orderStatusChooseHandle(key) {
                console.log(key)
                this.orderSelected = key;
            },
            orderHistoryAction() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'businessSearch'
                    });
                }, 800);
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

    .time {
        color: @text-color-light;
        font-size: @font-smaller;
        line-height: 1.5;
        margin-top: 6px;
    }

    .icon-search {
        vertical-align: middle;
    }
</style>
