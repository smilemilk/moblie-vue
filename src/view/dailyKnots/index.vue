<template>
    <div    :class="dailyList && dailyList.length > 0 ? '' : 'white'"
            class="dailyKnots-wrapper container-wrapper">

        <div class="date-choose-box">
            <div class="date-choose-pre">上一天</div>
            <div class="date-choose-current">{{dateSearch}}</div>
            <div class="date-choose-next">下一天</div>
        </div>

        <div v-if="dailyList && dailyList.length > 0">
            <div class="interval-item">
                实收（元）：￥1221.00
            </div>

            <div class="set-form cell-group">
                <div class="cell cell_hover">
                    <div class="cell-inner cell-inner-lr">
                        <label>全部收银员</label>
                        <i class="cell-right-arrow">
                        </i>
                    </div>
                </div>
            </div>

            <div class="set-form cell-group mt10">
                <div class="cell cell_small">
                    <div class="cell-inner cell-inner-lr">
                        <label class="span_light">门店</label>
                        <div class="cell-right">富阳喜脉健康</div>
                    </div>
                </div>
                <div class="cell cell_small">
                    <div class="cell-inner cell-inner-lr">
                        <label class="span_light">门店</label>
                        <div class="cell-right">富阳喜脉健康</div>
                    </div>
                </div>
            </div>
            <div class="set-form cell-group mt10">
                <div class="cell cell_small">
                    <div class="cell-inner cell-inner-lr">
                        <label class="span_light">门店</label>
                        <div class="cell-right">富阳喜脉健康</div>
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

</style>
