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
            <div class="panel-item_search panel-item flex-content flex-content-align flex-content-spaceBetween pr0">
                <div class="flex-content flex-content-align panel-item_searchInput">
                    <i class="icon-search"></i>
                    <input v-model="keySearch"
                           class="searchInput"
                           placeholder="请输入相关信息"/>
                </div>
                <div
                        @click="orderRecordAction()"
                        class="panel-item_searchBtn"
                >搜索
                </div>
            </div>
            <div class="interval-item flex-content flex-content-align flex-content-spaceBetween">
                <div class="date-select-box">
                    <span>{{this.dateSearch|$_filters_parseDate}}</span>
                    <i class="icon-triangle-dark ml5"></i>
                </div>
            </div>

            <div ><samp class="date-item">{{this.dateSearch|$_filters_parseDate}}</samp></div>

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
                    <div class="font-l-d align-c mt14">未查询到本月该订单</div>
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
    import storeData from './store/business-search';
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
                keySearch: ''
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
                    startDate: moment(this.dateSearch).format("YYYYMMDD") + '000000',
                    endDate: moment(this.dateSearch).format("YYYYMMDD") + "235959",
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
            orderRecordAction() {
                if (this.keySearch.trim().length > 4) {

                } else {
                    Toast("至少5位的查询条件");
                }
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

    .time {
        color: @text-color-light;
        font-size: @font-smaller;
        line-height: 1.5;
        margin-top: 6px;
    }

    .order-none-container {

    }

    .panel-item_search {
        .searchInput {
            font-size: @font-normal;
            color: @text-color;
            &::-webkit-input-placeholder {
                color: @text-color-grayer;
            }
        }
        &Btn {
            padding: 5px 16px;
            color: @main-theme-color;
            cursor: pointer;
        }
    }

    .date-item {
        color: @text-color;
        font-size: @font-small;
        border-radius: 15px;
        padding: 3px 8px;
        background-color: @background-grayDark-color;
    }
</style>
