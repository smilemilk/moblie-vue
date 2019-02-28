<template>
    <div class="dailyKnots-wrapper container-wrapper">

        <div class="interval-item">
            <div class="date-select-box">{{this.dateSearch|$_filters_parseDate}}</div>
            <div class="">
                <div class="font-xs-l">实收 ￥980.80 <span class="ml20">收入 ￥19920.00</span></div>
                <div class="font-xs-l">退款 ￥2000.00</div>
            </div>
        </div>

        <div class="set-form cell-group">
            <div class="cell">
                <div class="cell-inner cell-inner-lr">
                    <label>门店</label>
                    <div class="cell-right">富阳喜脉健康</div>
                </div>
            </div>
            <div class="cell">
                <div class="cell-inner cell-inner-lr">
                    <label>门店</label>
                    <div class="cell-right">富阳喜脉健康</div>
                </div>
            </div>
        </div>
        <div class="set-form cell-group mt10">
            <div class="cell">
                <div class="cell-inner cell-inner-lr">
                    <label>门店</label>
                    <div class="cell-right">富阳喜脉健康</div>
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
            return storeData.call(this);
        },
        created() {
            this.dateSearch = new Date();
            this.getOrderList();
        },
        methods: {
            getOrderList() {
                ajax.getTradeList({
                    startDate: moment(this.dateSearch).format("YYYYMMDD"),
                    endDate: moment(this.dateSearch).format("YYYYMMDD"),
                    tradeOrderNo: ''
                }).then(response => {
                    if (!response.success === true) {
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
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .date-choose-box {
        padding: 20px 16px;
        background-color: @main-theme-color;
        overflow: hidden;
        [class*='date-choose-'] {
            display: inline-block;
            color: @white;
            font-size: 14px;
            line-height: 1.5;
        }
    }

    .interval-item {
        padding: 10px 16px;
        color: @text-color;
        font-size: @font-normal;
        line-height: 1.5;
        box-sizing: border-box;
    }
</style>
