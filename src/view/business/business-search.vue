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
                           maxlength="30"
                           placeholder="请输入相关信息"/>
                </div>
                <div
                        @click="orderRecordAction()"
                        class="panel-item_searchBtn"
                >搜索
                </div>
            </div>
            <div class="interval-item flex-content flex-content-align flex-content-spaceBetween">
                <div class="date-select-box"
                     @click="dateChangeAction()"
                >
                    <span>{{this.dateSearch|$_filters_parseMonth}}</span>
                    <i class="icon-triangle-dark ml5"></i>
                </div>
            </div>

            <div v-if="this.orderList && this.orderList.length>0"
                 class="date-item-wrapper"
            >
                <samp class="date-item">{{this.dateSearch|$_filters_parseDate}}</samp>
            </div>

            <div class="set-form cell-group" v-if="this.orderList && this.orderList.length>0">
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <div class="cell"
                         v-for="(item, key) in this.orderList"
                         :key="key"
                         @click="orderDetailAction(item.tradeOrderNo || '', item.tradeType || '')"
                    >
                        <div class="cell-inner flex-content flex-content-spaceBetween">
                            <div class="flex-content flex-content-top">
                                <i class="icon-payType mr10"
                                   :class="item.payType === 'wx' ? 'icon-payType_wx' :
                               item.payType === 'alipay' ? 'icon-payType_alipay' :
                                item.payType === 'wm' ? 'icon-payType_wm' :''"
                                ></i>
                                <div>
                                    <div class="font-n-d">{{item.tradeOrderName}}</div>
                                    <div class="font-s-d mt10 text-ellipsis">
                                        {{item.payType=== 'alipay'? '支付宝': item.payType=== 'wx'? '微信': item.payType===
                                        'wm'?
                                        '微脉':''}}订单号:<span
                                            v-if="item.tradeThirdNo">{{item.tradeThirdNo}}</span>
                                    </div>
                                    <div class="font-s-d text-ellipsis">
                                        支付流水号:<span v-if="item.tradeOrderNo">{{item.tradeOrderNo}}</span>
                                    </div>
                                    <div class="time" v-if="item.tradeTime">{{item.tradeTime|$_filters_parseTime_hour}}
                                    </div>
                                </div>
                            </div>

                            <div class="cell-right">
                                <div class="font-l-d">{{item.tradeAmount|$_filters_moneyFormat_fen}}</div>
                                <div class="font-s-b mt4 align-r">{{item.tradeType}}</div>
                            </div>
                        </div>
                    </div>
                </van-pull-refresh>
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

            <van-popup
                    v-model="dateTimePickerStatus"
                    position="bottom"
                    :overlay="true"
            >
                <van-datetime-picker
                        v-model="dateSearch"
                        v-if="dateTimePickerStatus"
                        type="year-month"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :item-height="34"
                        @change="dateTimeChangeAction"
                        @cancel="dateTimeCancelAction"
                        @confirm="dateTimeConfirmAction"
                />
            </van-popup>

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
        DatetimePicker,
        Popup,
    } from 'vant';
    import storeData from './store/business-search';
    import ajax from '@/api/business';
    import moment from 'moment';
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
            DatetimePicker: DatetimePicker,
            Popup: Popup,
        },

        data() {
            return Object.assign(storeData.call(this), {
                keySearch: '',
                dateTimePickerStatus: false,
                minDate: '',
                maxDate: '',
                queryOrder: {
                    orderStatus: '', // 0 待支付，2 成功，8 订单关闭， 10 退款
                    startDate: '',
                    endDate: '',
                    tradeOrderNo: '',
                    payOrderType: 'xxsk',
                    limit: 20,
                    page: 1
                },
                isLoading: false
            });
        },
        created() {
            this.dateSearch = new Date(moment(new Date()).format("YYYYMMDD").slice(0,4), moment(new Date()).format("YYYYMMDD").slice(4,6)*1-1);
            this.minDate = new Date(2019, 0);
            this.maxDate = new Date();
        },
        methods: {
            onRefresh() {
                setTimeout(() => {
                    this.queryOrder.page++;
                    this.getOrderList();
                    this.$toast('刷新成功');
                    this.isLoading = false;
                }, 500);
            },
            getOrderList() {
                this.queryOrder = {
                    ...this.queryOrder,
                    page: 1,
                    tradeOrderNo: this.keySearch,
                    startDate:
                    moment(this.dateSearch).format("YYYYMM") + '01000000',
                    endDate:
                    moment(this.dateSearch).format("YYYYMM") + new Date(moment(this.dateSearch).format("YYYYMM").slice(0,4), moment(this.dateSearch).format("YYYYMM").slice(4,6), 0).getDate()+ "235959"
                };

                if (this.queryOrder.tradeOrderNo.length > 4) {
                    ajax.getTrade(this.queryOrder).then(response => {
                        if (!response.success === true) {
                            this.orderList = [];
                            return;
                        } else {
                            let list = [];
                            response.data.items.forEach(it => {
                                let item = {
                                    payType: payFundStatus(it.payType),
                                    timeFormat: it.tradeTime ? moment(it.tradeTime).format("YYYYMMDD") : '',
                                    refundStatus: it.refundStatus,
                                    tradeAmount: it.tradeAmount,
                                    tradeOrderName: it.tradeOrderName,
                                    tradeOrderNo: it.tradeOrderNo,
                                    tradeOrderStatus: it.tradeOrderStatus,
                                    tradeThirdNo: it.tradeThirdNo,
                                    tradeTime: it.tradeTime,
                                    tradeType: it.tradeType
                                };
                                list.push(item);
                            });
                            this.orderList = list;
                            console.log(this.orderList)
                        }
                    }).catch(() => {
                        this.orderList = [];
                    });
                }
            },
            orderStatusAction() {

            },
            orderRecordAction() {
                if (this.keySearch.trim().length > 4) {
                    // var toast = Toast.loading({
                    //     duration: 0,       // 持续展示 toast
                    //     forbidClick: true, // 禁用背景点击
                    //     loadingType: 'spinner',
                    //     message: '加载中...'
                    // });
                    //
                    // setTimeout(function(){
                    //     toast = '';
                    // }, 4000)
                    this.getOrderList();

                } else {
                    Toast("至少5位的查询条件");
                }
            },
            dateChangeAction() {
                this.dateTimePickerStatus = true;
            },
            dateTimeChangeAction(picker) {

            },
            dateTimeCancelAction() {
                this.dateTimePickerStatus = false;
            },
            dateTimeConfirmAction(values) {
                this.dateSearch = values;
                this.dateTimePickerStatus = false;


                if (this.keySearch.trim().length > 4) {

                    this.queryOrder = {
                        ...this.queryOrder,
                        page: 1,
                        tradeOrderNo: this.keySearch,
                        startDate:
                        moment(this.dateSearch).format("YYYYMM") + '01000000',
                        endDate:
                        moment(this.dateSearch).format("YYYYMM") + new Date(moment(this.dateSearch).format("YYYYMM").slice(0,4), moment(this.dateSearch).format("YYYYMM").slice(4,6), 0).getDate()+ "235959"
                    };
                    this.getOrderList();
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
        &Input {
            width: 100%;
        }
        .searchInput {
            width: 100%;
            border: none;
            font-size: @font-normal;
            color: @text-color;
            &::-webkit-input-placeholder {
                color: @text-color-grayer;
            }
        }
        &Btn {
            padding: 4px 16px;
            color: @main-theme-color;
            cursor: pointer;
            min-width: 64px;
            font-size: @font-large;
        }
    }

    .date-item {
        color: @text-color;
        font-size: @font-small;
        border-radius: 15px;
        padding: 3px 8px;
        background-color: @background-grayDark-color;
        &-wrapper {
            padding: 10px 0 10px 15px;
            background-color: @background-grayer-color;
        }
    }
</style>
