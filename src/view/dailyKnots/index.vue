<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                left-arrow
                :z-index="999"
                @click-left="navBackClick"
        />
        <div :class="dailyList && dailyList.length > 0 ? '' : 'white'"
             class="dailyKnots-wrapper container-wrapper">

            <div class="date-choose-box">
                <div class="date-choose-pre"
                     @click="dateChooseAction('pre')"
                ><i class="icon-left"></i>上一天
                </div>
                <div class="date-choose-current"
                     @click="dateChangeAction()"
                >
                    <i class="icon-calendar"></i>
                    {{dateSearch|$_filters_parseDate}}
                </div>
                <div class="date-choose-next"
                     @click="dateChooseAction('next')"
                >下一天<i class="icon-right"></i></div>
            </div>

            <div class="set-form cell-group" v-if="this.userShow && this.userList.length > 0">
                <div class="cell cell_hover">
                    <div class="cell-inner cell-inner-lr" @click="userPickerAction()">
                        <label>全部收银员</label>
                        <i class="cell-right-arrow">
                        </i>
                    </div>
                </div>
            </div>

            <div v-if="dailyList && Object.keys(dailyList).length > 0">
                <div class="interval-item">
                    实收（元）：{{dailyList.buyerAmount | $_filters_moneyFormat_fen}}
                </div>

                <div class="set-form cell-group mt10">
                    <div class="cell cell_small">
                        <div class="cell-inner cell-inner-lr">
                            <label class="span_light">支付宝(实收)</label>
                            <div class="cell-right">{{dailyList.alipayAmount | $_filters_moneyFormat_fen}}</div>
                        </div>
                    </div>
                    <div class="cell cell_small">
                        <div class="cell-inner cell-inner-lr">
                            <label class="span_light">微信</label>
                            <div class="cell-right">{{dailyList.wxAmount | $_filters_moneyFormat_fen}}</div>
                        </div>
                    </div>
                    <div class="cell cell_small">
                        <div class="cell-inner cell-inner-lr">
                            <label class="span_light">优惠金额</label>
                            <div class="cell-right">{{dailyList.discountAmount | $_filters_moneyFormat_fen}}</div>
                        </div>
                    </div>
                    <div class="cell cell_small">
                        <div class="cell-inner cell-inner-lr">
                            <label class="span_light">退款</label>
                            <div class="cell-right">{{dailyList.refundAmount | $_filters_moneyFormat_fen}}</div>
                        </div>
                    </div>
                    <div class="cell cell_small">
                        <div class="cell-inner cell-inner-lr">
                            <label class="span_light">交易笔数</label>
                            <div class="cell-right">{{dailyList.tradeNums}}</div>
                        </div>
                    </div>
                    <div class="cell cell_small">
                        <div class="cell-inner cell-inner-lr">
                            <label class="span_light">支付笔数</label>
                            <div class="cell-right">{{dailyList.payNums}}</div>
                        </div>
                    </div>
                    <div class="cell cell_small">
                        <div class="cell-inner cell-inner-lr">
                            <label class="span_light">退款笔数</label>
                            <div class="cell-right">{{dailyList.refundNums}}</div>
                        </div>
                    </div>
                </div>

            </div>

            <div v-else>
                <div class="prompt-item prompt_small">
                    <i class="prompt-img noneFound"></i>
                    <div class="prompt-label">{{promptLabel}}</div>
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
                        @change="dateTimeChangeAction()"
                        @cancel="dateTimeCancelAction()"
                        @confirm="dateTimeConfirmAction(dateSearch)"
                />
            </van-popup>


            <van-popup
                    v-model="userPickerShow"
                    position="bottom"
                    :overlay="true"
            >
                <van-picker
                        ref="departpicker"
                        v-if="this.userPickerShow"
                        :columns="userListColumns"
                        @change="onUserChange"
                        :item-height="34"
                        show-toolbar
                        :visible-item-count="5"
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        @cancel="onUserCancel"
                        @confirm="onUserConfirm">
                </van-picker>
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
        Picker,
        Popup
    } from 'vant';
    import storeData from './store/index';
    import moment from 'moment';
    import ajax from '@/api/dailyKnots';
    import ajaxUser from '@/api/user';

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
            [Picker.name]: Picker,
            Popup: Popup
        },

        data() {
            return Object.assign(storeData.call(this), {
                userList: [], // 用户列表,
                userPickerShow: false,
                userListColumns: [],
                userShow: false
            });
        },
        created() {
            this.dateSearch = new Date();
            this.minDate = new Date(2019, 0, 1);
            this.maxDate = new Date();
            this.getDailyOrder();
        },
        methods: {
            dateChooseAction(status) {
                const filter = {
                    'pre': 1,
                    'next': -1
                };

                let dateLast;

                dateLast = moment(this.dateSearch).format("YYYY-MM-DD");

                if (status === 'pre' && dateLast === '2019-01-01') {
                    Toast('不能早于2019年01月01日');
                    return;
                } else if (status === 'next' && dateLast === moment(new Date()).format("YYYY-MM-DD")) {
                    Toast('不能选择今天之后的日期');
                    return;
                } else {
                    this.dateSearch = moment(dateLast).subtract(filter[status], 'days').format("YYYY-MM-DD");
                    this.getDailyOrder();
                }
                console.log(this.dateSearch)
            },
            merchantId() {
                return new Promise((resolve, reject) => {
                    ajaxUser.merchantId({
                        // isQueryAll: true
                    }).then(response => {
                        if (!response.success === true) {
                            Toast(response.msg || '获取用户信息异常');
                            return reject({});
                        } else {
                            if (response.data && response.data.isMerchant) {

                                return resolve(
                                    response.data
                                );
                            } else {
                                return reject({});
                            }
                        }
                    }).catch(() => {
                        return reject({});
                    });
                })
            },
            getDailyOrder() {
                Promise.all([this.merchantId()]).then((results) => {
                    if (results && results.length > 0) {
                        if (results[0]) {
                            if (results[0].isMerchant === true) {
                                this.userShow = true;
                                this.userList = results[0].merchantUsers;

                                if (this.userList) {
                                    let arr = [];
                                    this.userList.forEach(it => {
                                        arr.push(it.userRealName);
                                    });
                                    this.userListColumns = arr;
                                }
                            } else {
                                this.userShow = false;
                            }
                        }

                        this.dailyOrderFetch();
                    }
                });
            },
            dailyOrderFetch() {
                ajax.queryDailyList({
                    startTime: moment(this.dateSearch).format("YYYYMMDD") + '000000',
                    endTime: moment(this.dateSearch).format("YYYYMMDD") + "235959",
                    operId: '', // 根据条件传
                    payOrderType: 'xxsk'
                }).then(response => {
                    if (!response.success === true) {
                        Toast(response.msg ? response.msg : '日结请求失败');
                        return;
                    } else {
                       if (response.data) {
                           if ((response.data.refundNums === 0) &&
                               (response.data.tradeNums === 0)
                           ) {
                               this.dailyList = {};
                           } else {
                               this.dailyList = response.data;
                           }
                       }
                    }
                }).catch(() => {
                    return;
                });
            },
            dateChangeAction() {
                this.dateTimePickerStatus = true;
            },
            dateTimeChangeAction(picker) {
                console.log(this)
            },
            dateTimeCancelAction() {
                this.dateTimePickerStatus = false;
            },
            dateTimeConfirmAction(values) {
                this.dateSearch = values;
                this.dateTimePickerStatus = false;
                this.getDailyOrder();
            },
            userPickerAction() {
                this.userPickerShow = true;
            },
            onUserChange() {

            },
            onUserCancel() {
                this.userPickerShow = false;
            },
            onUserConfirm() {
                this.userPickerShow = false;
            },
            navBackClick() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'home'
                    });
                }, 800);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

</style>
