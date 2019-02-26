<template>
    <div class="home-wrapper container-wrapper">
        <div class="home-header">
            <p class="home-header-title">喜脉健康</p>
            <div class="user-info">
                <img scr="../../images/headSculpture@2x.png" alt=""/>
                <div class="user-info-detail">
                    <div class="user-info-detail_l">禄白</div>
                    <div class="user-info-detail_s">门店:</div>
                </div>
                <sub class="user-info-sub">收银机编号001</sub>
            </div>
        </div>
        <div class="home-entrance">
            <div class="recharge-btn"></div>
            <ul class="recharge-list">
                <li
                        v-for="(item,key) in rechargeEntranceList"
                        :key="key"
                        :data-a="item.key"
                        class="recharge-item"
                >
                    <img :class="item.key" class="recharge-item-img"/>
                    <p>{{item.label}}</p>
                </li>
            </ul>
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

    .home {
        &-wrapper {
            background-color: #fff;
        }
        &-header {
            height: 181px;
            background-color: @main-theme-dark;
            &-title {
                font-size: @font-huge;
                color: @white;
                text-align: center;
                line-height: 1.5;
                padding-top: 18px;
            }
            .user-info {
                position: relative;
                &-detail {
                    padding-left: 40px;
                    &_l {
                        font-size: @font-larger;
                        color: #fff;
                        font-weight: @font-weight_500;
                        line-height: 1.75;
                    }
                    &_s {
                        font-size: @font-normal;
                        color: #fff;
                        font-weight: @font-weight_400;
                        line-height: 1.75;
                        margin: 3px 0 0;
                    }
                }
                &-sub {
                    position: absolute;
                    top: 5px;
                    right: 15px;
                    background-color: @background-blue-dark;
                    padding: 2px 6px;
                    border-radius: 15px;
                    line-height: 1.5;
                    color: @text-color-grayBlue;
                    font-size: @font-smallest;
                }
            }
        }
        &-entrance {
            position: relative;
            .recharge-btn {
                position: absolute;
                top: -36px;
                left: 50%;
                transform: translate(-50%, 0);
                width: 328px;
                height: 90px;
                background-image: url("../../images/recharge_btn@2x.png");
                background-repeat: no-repeat;
                background-size: 100% auto;
                z-index: 1000;
                &:before {
                    content: '收款';
                    display: inline-block;
                    font-size: @font-hugest;
                    font-weight: bolder;
                    color: @white;
                    position: absolute;
                    left: 168px;
                    top: 20px;
                }
            }
            .recharge {
                &-list {
                    padding: 90px 45px 45px;
                    overflow: hidden;
                    .recharge-item {
                        &:nth-child(2n+1) {
                            border-right: 1px solid @border-color-light;
                        }
                        &:nth-child(1),
                        &:nth-child(2) {
                            border-bottom: 1px solid @border-color-light;
                        }
                    }
                }
                &-list:after {
                    clear: both;
                }
                &-item {
                    width: 50%;
                    box-sizing: border-box;
                    display: inline-block;
                    float: left;
                    color: @text-color;
                    font-size: @font-large;
                    text-align: center;
                    font-weight: @font-weight_500 !important;
                    text-align: center;
                    padding: 25px;
                    &-img {
                        display: inline-block;
                        width: 50px;
                        height: 50px;
                        border: none;
                        border-radius: 0;
                        background-repeat: no-repeat;
                        background-position: center center;
                        &.search {
                            background-image: url("../../images/icon_search@2x.png");
                            background-size: 100% auto;
                        }
                        &.dailyKnots {
                            background-image: url("../../images/icon_dailyKnots@2x.png");
                            background-size: 100% auto;
                        }
                        &.set {
                            background-image: url("../../images/icon_set@2x.png");
                            background-size: 100% auto;
                        }
                        &.loginOut {
                            background-image: url("../../images/icon_loginOut@2x.png");
                            background-size: 100% auto;
                        }
                    }
                }
            }
        }
    }
</style>
