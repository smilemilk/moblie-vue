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
                <div class="date-select-box"
                     @click="dateChangeAction()">
                    <span>{{this.dateSearch|$_filters_parseDate}}</span>
                    <i class="icon-triangle-dark ml5"></i>
                </div>
                <div class=""
                     v-if="this.orderList && this.orderList.length>0 && this.queryOrder.orderStatus.length == 0">
                    <div class="font-xs-l">实收 <span v-if="this.orderSumAmount.total">￥{{orderSumAmount.total|$_filters_moneyFormat_fen}}</span>
                        <span class="ml20">收入 <span v-if="this.orderSumAmount.in">￥{{orderSumAmount.in|$_filters_moneyFormat_fen}}</span></span>
                    </div>
                    <div class="font-xs-l flex-content flex-content-end">退款 <span v-if="this.orderSumAmount.out">￥{{orderSumAmount.out|$_filters_moneyFormat_fen}}</span>
                    </div>
                </div>
            </div>

            <div class="set-form cell-group"
                 v-if="this.orderList && this.orderList.length>0">
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
                    <div class="font-l-d align-c mt14">还没有交易记录哦！</div>
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
                        type="date"
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
        Popup
    } from 'vant';
    import storeData from './store/index';
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
                queryOrder: {
                    orderStatus: '', // 0 待支付，2 成功，8 订单关闭， 10 退款
                    startDate: '',
                    endDate: '',
                    tradeOrderNo: '',
                    payOrderType: 'xxsk',
                    limit: 20,
                    page: 1
                },
                orderStatusShow: false,
                orderObject: {
                    '0': '待支付',
                    '2': '交易成功',
                    '8': '订单关闭',
                    '10': '有退款'
                },
                orderSumAmount: {
                    total: '',
                    in: '',
                    out: ''
                },
                dateTimePickerStatus: false,
                minDate: '',
                maxDate: '',
                isLoading: false
            });
        },
        created() {
            this.dateSearch = new Date();
            this.minDate = new Date(2019, 0, 1);
            this.maxDate = new Date();
            this.queryOrder = {
                ...this.queryOrder,
                page: 1,

                startDate:
                // '20190310000000',
                moment(this.dateSearch).format("YYYYMMDD") + '000000',
                endDate:
                // '20190310235959'
                moment(this.dateSearch).format("YYYYMMDD") + "235959"
            };
            this.getOrderList();
            this.getOrderSumAmount();
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
                ajax.getTrade(this.queryOrder).then(response => {
                    if (!response.success === true) {
                        this.orderList = [];
                        return;
                    } else {
                        response.data.items.map(it => {
                            if (it.payType) {
                                // it.tradeType = orderObject[it.tradeType];
                                it.payType = payFundStatus(it.payType);
                                return it;
                            }
                        });
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
                        if (response.data) {
                            this.orderSumAmount = {
                                ...this.orderSumAmount,
                                total: response.data.tradeTotalAmount + '' || '',
                                out: response.data.tradeOutAmount + '' || '',
                                in: response.data.tradeInAmount + '' || ''
                            }
                        }
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
                this.orderStatusShow = false;
                this.getOrderList();
            },
            orderStatusToggleHandle() {
                this.orderStatusShow = !this.orderStatusShow;
            },
            orderStatusChooseHandle(key) {
                this.orderSelected = key;
            },
            orderHistoryAction() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'businessSearch'
                    });
                }, 800);
            },
            orderDetailAction(no, tradeType) {
                setTimeout(() => {
                    this.$router.push({
                        name: 'businessDetail',
                        query: {
                            tradeOrderNo: no,
                            tradeType: tradeType
                        }
                    });
                }, 800);
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
                // this.dailyList = {};
                // this.pieAmount_fund = [];
                // this.pieCount_fund = [];
                this.queryOrder.page = 1;
                this.getOrderList();
                if (this.queryOrder.orderStatus.length == 0) {
                    this.getOrderSumAmount();
                }
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
