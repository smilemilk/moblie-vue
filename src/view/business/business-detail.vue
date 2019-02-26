<template>
    <div class="business_detail-wrapper container-wrapper">
        <div class="business_detail-container">
            <div class="detail-item">
                <div class="detail-item-name">{{businessInfo.account}}</div>
                <div class="detail-item-title mt10">{{businessInfo.amount}}</div>
                <div class="detail-item-tip mt2">{{businessInfo.status}}</div>
            </div>
            <div class="detail-cells plr16">
                <div class="detail-cell">
                    <label class="detail-cell-label">000</label>
                    <span class="detail-cell-span">0000</span>
                </div>
            </div>
        </div>

        <div class="mt30 plr16">
            <button
                    class="
                         btn
                         btn-block
                         btn-primary
                         "
                    @click="loginAction()">确定
            </button>
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

        },
        methods: {}
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .business_detail-container {
        background-color: @white;
    }

    .detail-item {
        padding: 16px 0;
        &-name,
        &-title,
        &-tip {
            text-align: center;
            line-height: 1.5;
        }
        &-name {
            color: @text-color;
            font-size: @font-normal;
        }
        &-title {
            color: @text-color;
            font-size: @font-largest;
        }
        &-tip {
            color: @text-color-light;
            font-size: @font-normal;
        }
    }

    .detail {
        &-cells {

        }
        &-cell {
            position: relative;
            padding-bottom: 8px;
            box-sizing: border-box;
            &-label,
            &-span {
                display: inline-block;
                font-size: @font-normal;
                line-height: 1.25;
            }
            &-label {
                color: @text-color-normal;
            }
            &-span {
                color: @text-color;
                position: absolute;
                right: 0;
            }
        }
    }
</style>
