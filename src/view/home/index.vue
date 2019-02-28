<template>
    <div class="home-wrapper container-wrapper">
        <div class="home-header">
            <p class="home-header-title"></p>
            <div class="user-info">
                <div class="user-info-sculpture"></div>
                <div class="user-info-detail">
                    <div class="user-info-detail_l">禄白</div>
                    <div class="user-info-detail_s">门店:</div>
                </div>
                <sub class="user-info-sub">收银机编号001</sub>
            </div>
        </div>
        <div class="home-entrance">
            <div class="recharge-btn" @click="entranceAction({key:'cashier'})"></div>
            <ul class="recharge-list">
                <li
                        v-for="(item,key) in rechargeEntranceList"
                        :key="key"
                        :data-a="item.key"
                        class="recharge-item"
                        @click="entranceAction(item)"
                >
                    <i :class="item.key"
                       class="recharge-item-img"></i>
                    <p>{{item.label}}</p>
                </li>
            </ul>
        </div>

        <van-dialog
                v-model="dialogShow"
                show-cancel-button
                :lazy-render="false"
                :before-close="beforeClose"
        >
            <div class="dialog-text">
                确认退出登录？
            </div>
        </van-dialog>
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
        Dialog
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
            [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
            Dialog: Dialog
        },

        data() {
            return storeData.call(this);
        },
        created() {

        },
        methods: {
            entranceAction(item) {
                if (item.key) {
                    if (item.key === 'loginOut') {
                       this.dialogShow = true;
                    } else {
                        setTimeout(() => {
                            const routerName = {
                                'cashier': 'cashier',
                                'search': 'business',
                                'dailyKnots': 'daily',
                                'set': 'set',
                                'loginOut': 'loginOut'
                            };
                            this.$router.push({
                                name: routerName[item.key],
                                query: ''
                            });
                        }, 800);
                    }
                }
            },
            beforeClose(action, done) {
                if (action === 'confirm') {
                    setTimeout(done, 1000);
                } else {
                    done();
                }
            },
        }
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
                    margin-top: 24px;
                    padding-left: 86px;
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
                &-sculpture {
                    position: absolute;
                    left: 16px;
                    top: 6px;
                    width: 46px;
                    height: 46px;
                    background-image: url("../../images/icon_large_headSculpture@2x.png");
                    background-repeat: no-repeat;
                    background-position: top center;
                    background-size: 100% auto;
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
                width: 352px;
                height: 96px;
                background-image: url("../../images/recharge_btn@2x.png");
                background-repeat: no-repeat;
                background-position: top center;
                background-size: 100% auto;
                z-index: 1000;
                &:before {
                    content: '收款';
                    display: inline-block;
                    font-size: @font-hugest;
                    font-weight: bolder;
                    color: @white;
                    position: absolute;
                    left: 174px;
                    top: 24px;
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
                        width: 60px;
                        height: 60px;
                        border: none;
                        border-radius: 0;
                        background-repeat: no-repeat;
                        background-position: center center;
                        &.search {
                            background-image: url("../../images/icon_search@2x.png");
                            background-size: 100% auto;
                        }
                        &.dailyKnots {
                            background-image: url("../../images/icon_dailyKnotes@2x.png");
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

    @media screen and (max-width: 352px) {
        .home-entrance .recharge-btn {
            width: 300px;
            height: 96px;
            &:before {
                left: 146px;
                top: 16px;
            }
        }
    }
</style>
