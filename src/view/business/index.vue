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
                >筛选</div>
                <div>搜索</div>
            </div>
            <div class="panel-downContainer" v-if="orderStatusShow">
                <ul class="panel-downBody">
                    <li
                            v-for="(item,key) in orderStatusList"
                            :key="item.key"
                            :style="key === 5 ? {visibility: 'hidden'} : {}"
                            :class="orderSelected ? 'active' :''"
                            @click="orderStatusChooseHandle(item.key)"
                            class="panel-downBody-item flex-content flex-content-align flex-content-justify"
                    >{{item.value}}</li>
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
                <div class="cell">
                    <div class="cell-inner flex-content flex-content-spaceBetween">
                        <div class="flex-content flex-content-top">
                            <i class="icon-payType icon-payType_alipay mr10"></i>
                            <div>
                                <div class="font-n-d">富阳喜脉健康</div>
                                <div class="font-s-d mt10">
                                    富阳喜脉健康
                                </div>
                                <div class="font-s-d">
                                    富阳喜脉健康
                                </div>
                                <div class="time">9999</div>
                            </div>

                        </div>

                        <div class="cell-right">
                            <div class="font-l-d">99999</div>
                            <div class="font-s-b mt4 align-r">有退款</div>
                        </div>
                    </div>
                </div>
                <div class="cell">
                    <div class="cell-inner cell-inner-lr">
                        <label>门店</label>
                        <div class="cell-right">富阳喜脉健康</div>
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
                countDownNum: null,
                orderStatusShow: false
            });
        },
        created() {
            this.dateSearch = new Date();
            this.getOrderList();
        },
        methods: {
            getOrderList() {
                ajax.getTradeList({
                    orderStatus: '', // 0 待支付，2 成功，8 订单关闭， 10 退款
                    startDate: moment(this.dateSearch).format("YYYYMMDD")+'000000',
                    endDate: moment(this.dateSearch).format("YYYYMMDD")+"235959",
                    tradeOrderNo: '',
                    payOrderType: 'xxsk'
                }).then(response => {
                    if (!response.success === true) {
                        this.orderList = [];
                        Dialog.confirm({
                            title: response.msg || '退出失败',
                            message: ''
                        }).then(() => {
                        }).catch(() => {
                        });
                        return;
                    } else {
                        setTimeout(() => {
                            this.$router.push({
                                name: 'login'
                            });
                        }, 800);
                    }
                }).catch(() => {
                    this.orderList = [];
                });
            },
            orderStatusAction() {

            },
            orderStatusToggleHandle() {
               this.orderStatusShow = !this.orderStatusShow;
            },
            orderStatusChooseHandle(key) {

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

    .order-none-container {

    }
</style>
