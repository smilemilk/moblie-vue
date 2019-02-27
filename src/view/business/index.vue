<template>
    <div class="dailyKnots-wrapper container-wrapper">

        <div class="date-choose-box">
            <div class="date-choose-pre">上一天</div>
            <div class="date-choose-current">{{dateSearch}}</div>
            <div class="date-choose-next">下一天</div>
        </div>

        <div class="interval-item">
            收入（元）：￥1221.00
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
        },
        methods: {}
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
