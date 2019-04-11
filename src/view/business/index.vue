<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                left-arrow
                :z-index="999"
                @click-left="navBackClick"
        />
        <div class="dailyKnots-wrapper container-wrapper white" style="overflow: auto">
            <div class="panel-item flex-content flex-content-align flex-content-spaceBetween">
                <div class="panel-item-select"
                     @click="orderStatusToggleHandle()"
                     :class="[orderStatusShow ? 'panel-item-select_down':'',
                     orderStatusActive ? 'active' : ''
                     ]"
                >{{orderStatusText}}
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
                     v-if="this.orderList && this.orderList.length>0 &&
                      this.queryOrder.orderStatus.length == 0">
                    <div class="font-xs-l">实收&nbsp;<span v-if="this.orderSumAmount.total">￥{{orderSumAmount.total|$_filters_moneyFormat_fen}}</span>
                        <span class="ml20">收入&nbsp;<span v-if="this.orderSumAmount.in">￥{{orderSumAmount.in|$_filters_moneyFormat_fen}}</span></span>
                    </div>
                    <div class="font-xs-l flex-content flex-content-end">退款&nbsp;<span v-if="this.orderSumAmount.out">￥{{orderSumAmount.out|$_filters_moneyFormat_fen}}</span>
                    </div>
                </div>
            </div>

            <div class="set-form cell-group"
                 v-if="this.orderList && this.orderList.length>0"
            >
                <van-pull-refresh
                        v-model="isLoading"
                        @refresh="onRefresh">
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            @load="onLoad"
                            :finished-text="loadingText"
                            :offset="offset"
                    >
                        <div class="cell"
                             v-for="(item, key) in this.orderList"
                             :key="key"
                             @click="orderDetailAction(item.tradeOrderNo || '', item.tradeType || '')"
                        >
                            <div class="cell-inner flex-content flex-content-spaceBetween"
                                 style="min-height: 102px;"
                            >
                                <div class="flex-content flex-content-top">
                                    <i class="icon-payType mr10"
                                       :class="item.payType === 'wx' ? 'icon-payType_wx' :
                               item.payType === 'alipay' ? 'icon-payType_alipay' :
                                item.payType === 'wm' ? 'icon-payType_wm' :'icon-payType_wm'"
                                    ></i>
                                    <div>
                                        <div class="font-n-d">{{item.tradeOrderName}}</div>
                                        <div class="font-s-d mt10 text-ellipsis" v-if="item.payType">
                                            {{item.payType=== 'alipay'? '支付宝': item.payType=== 'wx'? '微信':
                                            item.payType===
                                            'wm'?
                                            '微脉':''}}订单号:<span
                                                v-if="item.tradeThirdNo">{{item.tradeThirdNo}}</span>
                                        </div>
                                        <div class="font-s-d text-ellipsis mb6"
                                             :class="!item.payType || (item.payType!== 'alipay' && item.payType!== 'wx') ? 'mt10' : ''"
                                        >
                                            支付流水号:<span v-if="item.tradeOrderNo">{{item.tradeOrderNo}}</span>
                                        </div>
                                        <div class="time" v-if="item.createTime">
                                            {{item.createTime|$_filters_parseTime_hour}}
                                        </div>
                                    </div>
                                </div>

                                <div class="cell-right">
                                    <div class="font-l-d"
                                         style="position: absolute; top: 16px; right: 0;">
                                    <span v-if="((item.tradeAmount+'').indexOf('+')) <= -1 &&
                                     ((item.tradeAmount+'').indexOf('-') <= -1 && item.status !== '订单关闭' && item.status !== '待支付' && item.status !== '交易失败')">
                                        {{item.tradeType|$_filters_moneyMark}}
                                    </span>
                                        {{item.tradeAmount|$_filters_moneyFormat_fen}}
                                    </div>
                                    <div class="font-s-b mt4 align-r"
                                         style="position: absolute; bottom: 16px; right: 0;"
                                         :class="(item.status === '订单关闭' || item.status === '交易失败') ? 'gray' : item.status === '待支付' ? 'orange' : ''"
                                    >{{item.status}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-list>
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
        Popup,
        PullRefresh,
        List
    } from 'vant';
    import storeData from './store/index';
    import ajax from '@/api/business';
    import moment from 'moment';
    import {payFundStatus} from '@/filters/status';
    import {orderStatus, refundStatus} from './filters';

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
            [PullRefresh.name]: PullRefresh,
            [List.name]: List,
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
                orderStatusText: '全部',
                orderStatusActive: false,

                total: 0,
                isLoading: false, //控制下拉刷新的加载动画
                loading: false, //控制上拉加载的加载动画
                finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
                loadingText: '加载中…',
                offset: 20
            });
        },
        created() {

            // 详情退回到首页 按日期查询
            if (this.$route.query && this.$route.query.date) {
                this.dateSearch = new Date(this.$route.query.date.slice(0, 4), this.$route.query.date.slice(4, 6) * 1 - 1, this.$route.query.date.slice(6, 8));
            } else {
                this.dateSearch = new Date();
            }

            if (this.$route.query && this.$route.query.orderStatusStr) {
                this.orderSelected = this.$route.query.orderStatusStr;
            }

            this.minDate = new Date(2019, 0, 1);
            this.maxDate = new Date();
            this.queryOrder = {
                ...this.queryOrder,
                page: 1,

                startDate:
                moment(this.dateSearch).format("YYYYMMDD") + '000000',
                endDate:
                moment(this.dateSearch).format("YYYYMMDD") + "235959"
            };
            this.getOrderSumAmount();
            this.init();
        },
        methods: {
            //下拉刷新
            onRefresh() {
                let self = this;
                setTimeout(() => {
                    self.total = 0;
                    self.queryOrder.page = 0;
                    self.init(); //加载数据
                }, 500);
            },
            init() {
                let self = this;

                self.queryOrder.page = 1;
                self.orderList = [];
                self.total = 0;

                Promise.all([self.getOrderList(self)]).then(
                    (results) => {
                        if (results[0]) {
                            if (results[0].length < 20) {
                                self.loadingText = '';
                            }
                            self.isLoading = false; //关闭下拉刷新效果
                        }
                    }
                ).catch((e) => {
                });
            },
            onLoad() {
                let self = this;
                self.queryOrder.page = self.queryOrder.page + 1;
                Promise.all([self.getOrderList(self)]).then(
                    (results) => {
                        if (results[0]) {
                            if (self.queryOrder.page*20 > self.total) {
                                self.loading = false; //关闭下拉刷新效果
                                self.finished = true;

                                this.loadingText = '没有更多数据';
                                return;
                            }
                        }
                        // 加载状态结束 手动结束上次的加载
                        this.loading = false;
                    }
                ).catch((e) => {
                });
                this.loadingText = '下拉展示更多';
            },

            getOrderList(self) {
                if (self) {
                    return new Promise((resolve, reject) => {
                        ajax.getTrade(self.queryOrder).then(response => {

                            if (!response.success === true) {
                                self.orderList = [];
                                self.total = 0;
                                return reject({});
                            } else {
                                let lists = [];

                                if (!response.data.items) {
                                    self.loading = false; //关闭下拉刷新效果
                                    self.finished = true;

                                    this.loadingText = '没有更多数据';
                                    return;
                                }
                                response.data.items.forEach(it => {
                                    if ((it.tradeType === '1' || it.tradeType === 1)
                                        && it.refundStatus.length > 0 && it.tradeOrderStatus !== '8' && it.refundStatus !== '0') {
                                        it.tradeOrderStatus = '-1'; // 有退款的处理 支付单
                                    }

                                    let item = {
                                        ...it,
                                        payType: payFundStatus(it.payType),
                                        status: it.tradeType === '1' || it.tradeType === 1 ? orderStatus(it.tradeOrderStatus) :
                                            it.tradeType === '0' || it.tradeType === 0 ? refundStatus(it.refundStatus) : ''
                                    };
                                    lists.push(item);
                                });

                                self.orderList = self.orderList.concat(lists);
                                self.total = response.data.totalCount;
                                return resolve(
                                    lists
                                );
                            }
                        }).catch(() => {
                            self.orderList = [];
                            self.total = 0;
                            return reject({});
                        });
                    });
                } else {
                    return new Promise((resolve, reject) => {
                        ajax.getTrade(this.queryOrder).then(response => {

                            if (!response.success === true) {
                                this.orderList = [];
                                this.total = 0;
                                return resolve(
                                    this.orderList
                                );
                            } else {
                                let lists = [];

                                response.data.items.forEach(it => {
                                    if ((it.tradeType === '1' || it.tradeType === 1) && (it.refundStatus.length > 0 && it.refundStatus !== '0')) {
                                        it.tradeOrderStatus = '-1'; // 有退款的处理 支付单
                                    }

                                    let item = {
                                        ...it,
                                        payType: payFundStatus(it.payType),
                                        status: it.tradeType === '1' || it.tradeType === 1 ? orderStatus(it.tradeOrderStatus) :
                                            it.tradeType === '0' || it.tradeType === 0 ? refundStatus(it.refundStatus) : ''
                                    };
                                    lists.push(item);
                                });
                                this.orderList = this.orderList.concat(lists);
                                this.total = response.data.totalCount;
                                return resolve(
                                    lists
                                );
                            }
                        }).catch(() => {
                            this.orderList = [];
                            this.total = 0;
                            return reject({});
                        });
                    });
                }
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

                const orderText = {
                    'all': '全部',
                    'success': '交易成功',
                    'close': '订单关闭',
                    'wait': '待支付',
                    'refund': '退款'
                };

                this.orderStatusText = orderText[this.orderSelected];
                this.orderStatusActive = true;
                this.queryOrder = {
                    ...this.queryOrder,
                    orderStatus: orderStatus[this.orderSelected],
                    page: 1
                };
                this.orderStatusShow = false;

                this.orderList = [];
                this.total = 0;

                this.init();
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
                            tradeType: tradeType,
                            // date: moment(this.dateSearch).format("YYYYMMDD"),
                            // orderStatusStr: this.orderSelected
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

                this.queryOrder = {
                    ...this.queryOrder,
                    page: 1,
                    startDate:
                    moment(this.dateSearch).format("YYYYMMDD") + '000000',
                    endDate:
                    moment(this.dateSearch).format("YYYYMMDD") + "235959"
                };

                this.init();

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
    }

    .icon-search {
        vertical-align: middle;
    }

</style>
