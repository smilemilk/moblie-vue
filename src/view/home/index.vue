<template>
    <div class="home-wrapper container-wrapper">
        <div class="home-header">
            <p class="home-header-title"></p>
            <div class="user-info">
                <div class="user-info-sculpture"></div>
                <div class="user-info-detail">
                    <div class="user-info-detail_l text-ellipsis"><span v-if="userRealName" class="font-weight_800">{{userRealName}}</span><span v-else>用户:</span></div>
                    <div class="user-info-detail_s text-ellipsis">门店:<span v-if="merchantNickName">{{merchantNickName}}</span></div>
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
                    <div class="recharge-item-container">
                        <i :class="item.key"
                           class="recharge-item-img"></i>
                        <p>{{item.label}}</p>
                    </div>
                </li>
            </ul>
        </div>

        <van-dialog
                v-model="dialogShow"
                show-cancel-button
                :lazy-render="false"
                :beforeClose="beforeClose"
                @confirm="loginOutAction()"
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
    import ajaxUser from '@/api/user';
    import ajax from '@/api/login';

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
            this.userInfo();
            this.merchantInfo();
        },
        methods: {
            merchantId() {
                return new Promise((resolve, reject) => {
                    ajaxUser.merchantId({
                        // isQueryAll: false
                    }).then(response => {
                        if (!response.success === true) {
                            Toast(response.msg || '获取用户信息异常');
                            return reject({});
                        } else {
                            if (response.data && response.data.userId) {
                                return resolve(
                                    response.data.userId
                                );
                            } else {
                                return reject({});
                            }
                        }
                    }).catch(() => {
                        return reject({});
                    });
                });
            },
            userInfo() {
                Promise.all([this.merchantId()]).then((results) => {
                    if (results && results.length > 0) {
                        ajaxUser.userDetail({
                            userId: results[0]
                        }).then(response => {
                            if (!response.success === true) {
                                return;
                            } else {
                                if (response.data && response.data.list) {
                                    this.userRealName = response.data.list[0].userRealName || '';
                                    this.userName = response.data.list[0].userName || '';
                                }
                            }
                        }).catch(() => {
                        });
                    }
                }).catch((e) => {
                });
            },
            merchantInfo() {
                ajaxUser.merchantUser({}).then(response => {
                    if (!response.success === true) {
                        return;
                    } else {
                        if (response.data && response.data) {
                            this.merchantNickName = response.data.merchantNickName || '';
                        }
                    }
                }).catch(() => {
                });
            },
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
            loginOutAction() {
                ajax.loginOut({}).then(response => {
                    if (!response.success === true) {
                        Dialog.confirm({
                            title: response.msg || '退出失败',
                            message: ''
                        }).then(() => {
                        }).catch(() => {
                        });
                        return;
                    } else {
                        if (localStorage.getItem('userName_current')) {
                            localStorage.setItem('userName_current', '');
                        }
                        if (localStorage.getItem('departName_current')) {
                            localStorage.setItem('departName_current', '');
                        }

                        setTimeout(() => {
                            this.$router.push({
                                name: 'login'
                            });
                        }, 800);
                    }
                }).catch(() => {
                });
            }
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
                        width: 175px;
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
                    line-height: 1.75;
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
                    background-position: center center;
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
                background-position: center center;
                background-size: 100% auto;
                z-index: 1000;
                &:before {
                    content: '收款';
                    display: inline-block;
                    font-size: @font-hugest;
                    font-weight: bolder;
                    color: @white;
                    position: absolute;
                    left: 57%;
                    top: 49%;
                    transform: translate(-50%, -50%);
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
                    font-weight: @font-weight_500 !important;
                    padding: 25px 0;
                    box-sizing: border-box;
                    &:nth-child(2n+1) {
                        text-align: left;
                        .recharge-item-container {
                            margin-left: 15px;
                            box-sizing: border-box;
                        }
                    }
                    &:nth-child(2n) {
                        text-align: right;
                        .recharge-item-container {
                            margin-right: 15px;
                            box-sizing: border-box;
                        }
                    }
                    &-container {
                        display: inline-block;
                        width: 56%;
                        text-align: center;
                        p {
                            font-weight: @font-weight_500;
                            text-align: center;
                        }
                    }
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

    @media screen and (max-width: 374px) {
        .home-entrance .recharge-item-img {
            width: 3rem;
            height: 3rem;
        }
        .home-entrance .recharge-item-container p{
            font-size: 15px;
        }
    }

    @media screen and (max-width: 352px) {
        .home-entrance .recharge-btn {
            width: 300px;
            height: 96px;
        }

        .home-header .c-info-sub {
            top: -18px;
        }
    }
</style>
