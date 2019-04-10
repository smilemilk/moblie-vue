<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                left-arrow
                :z-index="999"
                @click-left="navBackClick"
        />
        <div class="dailyKnots-wrapper container-wrapper white" style="overflow-y: auto;">
            <div class="panel-item_search panel-item flex-content flex-content-align flex-content-spaceBetween pr0">
                <div class="flex-content flex-content-align panel-item_searchInput">
                    <i class="icon-search"></i>
                    <input v-model="keySearch"
                           class="searchInput"
                           maxlength="30"
                           placeholder="请输入订单号或支付流水号查询"/>
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
                    <span>{{dateSearch|$_filters_parseMonth}}</span>
                    <i class="icon-triangle-dark ml5"></i>
                </div>
            </div>

            <div class="set-form cell-group"
                 v-if="orderList && orderList.length>0">
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
                        <div
                                v-if="orderList && orderList.length>0"
                                v-for="(item, key) in orderList"
                                :key="key"
                        >
                            <div
                                 class="date-item-wrapper"
                                 v-if="item.date"
                            >
                                <samp class="date-item">
                                    {{item.date|$_filters_parseDate}}</samp>
                            </div>

                            <div class="cell"
                                 v-if="item.lists && item.lists.length > 0"
                                 v-for="(list, key) in item.lists"
                                 :key="key"
                                 @click="orderDetailAction(list.tradeOrderNo || '', list.tradeType || '')"
                            >
                                <div class="cell-inner flex-content flex-content-spaceBetween"
                                     style="min-height: 102px;"
                                >
                                    <div class="flex-content flex-content-top">
                                        <i class="icon-payType mr10"
                                           :class="list.payType === 'wx' ? 'icon-payType_wx' :
                        list.payType === 'alipay' ? 'icon-payType_alipay' :
                        list.payType === 'wm' ? 'icon-payType_wm' :'icon-payType_wm'"
                                        ></i>
                                        <div>
                                            <div class="font-n-d">{{list.tradeOrderName}}</div>
                                            <div class="font-s-d mt10 text-ellipsis">
                                                {{list.payType=== 'alipay'? '支付宝': list.payType=== 'wx'? '微信':
                                                list.payType===
                                                'wm'?
                                                '微脉':''}}订单号:
                                                <span
                                                        v-if="list.tradeThirdNo"
                                                        v-html="list.tradeThirdNoStr"
                                                >
                        </span>
                                            </div>
                                            <div class="font-s-d text-ellipsis mb6">
                                                支付流水号:<span v-if="list.tradeOrderNo"
                                                            v-html="list.tradeOrderNoStr">
                        </span>
                                            </div>
                                            <div class="time" v-if="list.createTime">
                                                {{list.createTime|$_filters_parseTime_hour}}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="cell-right">
                                        <div class="font-l-d"
                                             style="position: absolute; top: 16px; right: 0;">
                        <span v-if="((list.tradeAmount+'').indexOf('+')) <= -1 &&
                        ((list.tradeAmount+'').indexOf('-') <= -1 && item.status !== '订单关闭' && item.status !== '待支付')">
                        {{list.tradeType|$_filters_moneyMark}}
                        </span>
                                            {{list.tradeAmount|$_filters_moneyFormat_fen}}
                                        </div>
                                        <div class="font-s-b mt4 align-r"
                                             style="position: absolute; bottom: 16px; right: 0;"
                                             :class="list.status === '订单关闭' ? 'gray' : list.status === '待支付' ? 'orange' : ''"
                                        >{{list.status}}
                                        </div>
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
        PullRefresh,
        List
    } from 'vant';
    import storeData from './store/business-search';
    import ajax from '@/api/business';
    import moment from 'moment';
    import {parseTime} from '@/filters/index';
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

                total: 0,
                isLoading: false, //控制下拉刷新的加载动画
                loading: false, //控制上拉加载的加载动画
                finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
                loadingText: '加载中…',
                offset: 20,

                orderListPrimary: []
            });
        },
        created() {
            this.dateSearch = new Date(moment(new Date()).format("YYYYMMDD").slice(0, 4), moment(new Date()).format("YYYYMMDD").slice(4, 6) * 1 - 1);
            this.minDate = new Date(2019, 0);
            this.maxDate = new Date();
        },
        methods: {
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
                self.total = 0;
                self.orderList = [];
                self.orderListPrimary = [];

                Promise.all([self.getOrderList(self)]).then(
                    (results) => {
                        if (results[0]) {
                            if (results[0].length < 20) {
                                self.loadingText = '';
                                self.loading = false; //关闭下拉刷新效果
                            }
                            self.isLoading = false; //关闭下拉刷新效果
                        }
                        // 加载状态结束 手动结束上次的加载
                        this.loading = false;
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
                            if (this.queryOrder.page * 20 > self.total) {
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
                this.queryOrder = {
                    ...this.queryOrder,
                    tradeOrderNo: this.keySearch,
                    startDate:
                    moment(this.dateSearch).format("YYYYMM") + '01000000',
                    endDate:
                    moment(this.dateSearch).format("YYYYMM") + new Date(moment(this.dateSearch).format("YYYYMM").slice(0, 4), moment(this.dateSearch).format("YYYYMM").slice(4, 6), 0).getDate() + "235959"
                };

                if (this.queryOrder.tradeOrderNo.length > 4) {

                    if (self) {
                        return new Promise((resolve, reject) => {
                            ajax.getTrade(self.queryOrder).then(response => {

                                if (!response.success === true) {
                                    self.orderList = [];

                                    self.orderListPrimary = [];
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

                                        let reg = new RegExp(this.keySearch, 'g');

                                        let item = {
                                            ...it,
                                            payType: payFundStatus(it.payType),
                                            status: it.tradeType === '1' || it.tradeType === 1 ? orderStatus(it.tradeOrderStatus) :
                                                it.tradeType === '0' || it.tradeType === 0 ? refundStatus(it.refundStatus) : '',
                                            date: parseTime(it.createTime, '{y}-{m}-{d}'),
                                            tradeThirdNoStr: it.tradeThirdNo.replace(reg, '<span class="orange">' + this.keySearch + '</span>'),
                                            tradeOrderNoStr: it.tradeOrderNo.replace(reg, '<span class="orange">' + this.keySearch + '</span>')
                                        };
                                        lists.push(item);
                                    });

                                    self.orderListPrimary = self.orderListPrimary.concat(lists);
                                    const arrayPrimary = self.orderListPrimary;
                                    let listFormat = {};
                                    for (let i in arrayPrimary) {
                                        let item = arrayPrimary[i];
                                        if (listFormat[item['date']]) {
                                            listFormat[item['date']].push(item);
                                        } else {
                                            listFormat[item['date']] = [item];
                                        }
                                    }

                                    let arrayFormat = [];

                                    if (listFormat) {
                                        for (let i in listFormat) {
                                            let item = {};
                                            item['date'] = i;
                                            item['lists'] = listFormat[i];
                                            arrayFormat.push(item);
                                        }
                                    }

                                    self.orderList = arrayFormat;

                                    self.total = response.data.totalCount;
                                    return resolve(
                                        self.orderList
                                    );
                                }
                            }).catch(() => {
                                self.orderList = [];
                                self.orderListPrimary = [];
                                self.total = 0;
                                return resolve(
                                    this.orderList
                                );
                            });
                        });
                    } else {
                        return new Promise((resolve, reject) => {
                            ajax.getTrade(this.queryOrder).then(response => {

                                if (!response.success === true) {
                                    this.orderList = [];
                                    this.orderListPrimary = [];
                                    this.total = 0;
                                    return resolve(
                                        this.orderList
                                    );
                                } else {
                                    let lists = [];
                                    response.data.items.forEach(it => {
                                        if ((it.tradeType === '1' || it.tradeType === 1) && it.refundStatus.length > 0 && it.refundStatus !== '0') {
                                            it.tradeOrderStatus = '-1'; // 有退款的处理 支付单
                                        }

                                        let reg = new RegExp(this.keySearch, 'g');

                                        let item = {
                                            ...it,
                                            payType: payFundStatus(it.payType),
                                            status: it.tradeType === '1' || it.tradeType === 1 ? orderStatus(it.tradeOrderStatus) :
                                                it.tradeType === '0' || it.tradeType === 0 ? refundStatus(it.refundStatus) : '',
                                            date: parseTime(it.createTime, '{y}-{m}-{d}'),
                                            tradeThirdNoStr: it.tradeThirdNo.replace(reg, '<span class="orange">' + this.keySearch + '</span>'),
                                            tradeOrderNoStr: it.tradeOrderNo.replace(reg, '<span class="orange">' + this.keySearch + '</span>')
                                        };
                                        lists.push(item);
                                    });

                                    if (this.queryOrder.page == 1) {
                                        this.orderListPrimary = [];
                                        this.orderList = [];
                                    }

                                    console.log(this.orderListPrimary)
                                    console.log(lists)

                                    this.orderListPrimary = this.orderListPrimary.concat(lists);
                                    const arrayPrimary = this.orderListPrimary;
                                    let listFormat = {};
                                    for (let i in arrayPrimary) {
                                        let item = arrayPrimary[i];
                                        if (listFormat[item['date']]) {
                                            listFormat[item['date']].push(item);
                                        } else {
                                            listFormat[item['date']] = [item];
                                        }
                                    }

                                    let arrayFormat = [];

                                    if (listFormat) {
                                        for (let i in listFormat) {
                                            let item = {};
                                            item['date'] = i;
                                            item['lists'] = listFormat[i];
                                            arrayFormat.push(item);
                                        }
                                    }

                                    console.log(listFormat)
                                    console.log(arrayFormat)

                                    this.orderList = arrayFormat;

                                    this.total = response.data.totalCount;
                                    return resolve(
                                        this.orderList
                                    );
                                }
                            }).catch(() => {
                                this.orderList = [];
                                this.orderListPrimary = [];
                                this.total = 0;
                                return resolve(
                                    this.orderList
                                );
                            });
                        });
                    }
                }
            },
            orderStatusAction() {

            },
            orderRecordAction() {
                if (this.keySearch.trim().length > 4) {
                    this.init();
                } else {
                    Toast("至少5位的查询条件");
                }
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

                if (this.keySearch.trim().length > 4) {

                    this.queryOrder = {
                        ...this.queryOrder,
                        page: 1,
                        tradeOrderNo: this.keySearch,
                        startDate:
                        moment(this.dateSearch).format("YYYYMM") + '01000000',
                        endDate:
                        moment(this.dateSearch).format("YYYYMM") + new Date(moment(this.dateSearch).format("YYYYMM").slice(0, 4), moment(this.dateSearch).format("YYYYMM").slice(4, 6), 0).getDate() + "235959"
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
            caret-color: @main-theme-color;
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
