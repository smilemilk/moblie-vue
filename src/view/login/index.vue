<template>
    <div class="login-wrapper container-wrapper">
        <div class="login-inner">
            <h3 class="login-title">欢迎登录!</h3>

            <div v-if="departName" class="sculpture-item">
                <i src=""
                   class="sculpture-item-img"
                />
                <div class="sculpture-item-name">
                    {{departName}}
                    <i
                            v-if="this.departList && this.departList.length > 1"
                            class="icon-select-left"
                    ></i>
                </div>
            </div>

            <div class="item" :class="this.loginInputStatus[0] === 1 ? 'bB1' : ''">
                <div class="item-wrapper">
                    <div class="item-label">机构编码</div>
                    <input v-model="depart"
                           class="item-input"
                           placeholder="请输入机构编码"/>
                    <p class="item-notice" v-show="this.loginRule[0] === 0 && this.loginRuleTextStatus === true">
                        不能为空</p>
                </div>
            </div>

            <div class="item" :class="this.loginInputStatus[1] === 1 ? 'bB1' : ''">
                <div class="item-wrapper">
                    <div class="item-label">账户</div>
                    <input
                            v-model="account"
                            class="item-input"
                            placeholder="请输入账号"/>
                    <i class="icon-select"
                       v-if="accountList"
                       @click="accountSelectHandle()"
                       :class="this.accountShow ? 'icon-select_toggle' : ''"
                    ></i>
                    <p class="item-notice" v-show="this.loginRule[1] === 0 && this.loginRuleTextStatus === true">
                        不能为空</p>
                </div>
            </div>

            <div class="accountHistoryList"
                 v-if="this.accountList && this.accountShow">
                <div class="accountHistoryItem"
                     v-for="(item,key) in accountList" :key="key">
                    {{item}}
                    <i
                            class="icon-delete"
                            @click="deleteAccountAction(item, key)"
                    ></i>
                </div>
            </div>

            <div class="item"
                 :class="this.loginInputStatus[2] === 1 ? 'bB1' : ''"
                 v-show="this.accountList && !this.accountShow">
                <div class="item-wrapper">
                    <div class="item-label">密码</div>
                    <input
                            v-model="password"
                            class="item-input"
                            :type="this.passwordShow ? 'text': 'password'"
                            placeholder="请输入密码"/>
                    <i
                            class="icon-eye"
                            v-if="password"
                            @click="passwordShowHandle()"
                            :class="this.passwordShow ? 'icon-eye_open':''"
                    ></i>
                    <p
                            class="item-notice"
                            v-show="this.loginRule[2] === 0 && this.loginRuleTextStatus === true">
                        不能为空</p>
                </div>
            </div>

            <button
                    class="
                         btn
                         btn-block
                         btn-primary
                         mt14"
                    :class="loginStatus ? '': 'btn-disabled_white'"
                    v-show="this.accountList && !this.accountShow"
                    @click="loginAction()">登录
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
            localStorage.setItem('departCurrentName', 'shabi');
            localStorage.setItem('departCurrentList', "daizi, llllll");
            localStorage.setItem('account', 'shabi');
            localStorage.setItem('accountList', "daizi, llllll");
            if (localStorage.getItem('departCurrentName')) {
                this.departName = localStorage.getItem('departCurrentName');
            }
            if (localStorage.getItem('departCurrentList')) {
                let departListPrimary = localStorage.getItem('departCurrentList').split(",");

                if (this.departName) {

                }
                console.log(departListPrimary)
                this.departList = departListPrimary;
            }

            let accountList = localStorage.getItem('accountList').split(",");
            this.accountList = accountList;
        },
        watch: {
            'depart': function (old, val) {
                if (val) {
                    this.loginRule[0] = 1;
                    if (this.account && this.password) {
                        this.loginStatus = true;
                    } else {
                        this.loginStatus = false;
                    }
                } else {
                    this.loginRule[0] = 0;
                    this.loginStatus = false;
                }
                if (val !== old) {
                    this.loginInputStatus[0] = 1;
                    this.loginInputStatus[1] = 0;
                    this.loginInputStatus[2] = 0;
                } else {
                    this.loginInputStatus[0] = 0;
                }
            },
            'account': function (old, val) {
                if (val) {
                    this.loginRule[1] = 1;
                    if (this.account && this.password) {
                        this.loginStatus = true;
                    } else {
                        this.loginStatus = false;
                    }
                } else {
                    this.loginRule[1] = 0;
                    this.loginStatus = false;
                }
                if (val !== old) {
                    this.loginInputStatus[0] = 0;
                    this.loginInputStatus[1] = 1;
                    this.loginInputStatus[2] = 0;
                } else {
                    this.loginInputStatus[1] = 0;
                }
            },
            'password': function (old, val) {
                if (val) {
                    this.loginRule[2] = 1;
                    if (this.account && this.password) {
                        this.loginStatus = true;
                    } else {
                        this.loginStatus = false;
                    }
                } else {
                    this.loginRule[2] = 0;
                    this.loginStatus = false;
                }
                if (val !== old) {
                    this.loginInputStatus[0] = 0;
                    this.loginInputStatus[1] = 0;
                    this.loginInputStatus[2] = 1;
                } else {
                    this.loginInputStatus[2] = 0;
                }
            },
        },
        methods: {
            loginAction() {
                if (this.loginRule.join() === '1,1,1') {
                    this.loginStatus = true;
                    this.loginRuleTextStatus = false;
                    this.loginFetch();
                } else {
                    this.loginStatus = false;
                    this.loginRuleTextStatus = true;
                }
            },
            loginFetch() {
                localStorage.setItem('departCurrentName', 'shabi');
            },
            accountSelectHandle() {
                this.accountShow = !this.accountShow;
                if (this.accountList) {

                }
            },
            passwordShowHandle() {
                this.passwordShow = !this.passwordShow;
            },
            deleteAccountAction(item, key) {
                console.log(item)
            },
            sorry() {
                Toast('暂无后续逻辑~');
                this.$router.push('incomeList');
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .login {
        &-inner {
            padding: 14px 34px;
        }
        &-wrapper {
            position: fixed;
            top: 0;
            background-image: url("../../images/login_bg@2x.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-attachment: fixed;
            z-index: -100;
            .item {
                position: relative;
                padding: 16px 0 8px;
                border-bottom: 1px solid @whiteFilter;
                &.bB1 {
                    border-bottom-color: @white;
                }
                &-label {
                    font-size: 12px;
                    line-height: 1.75;
                    color: @white;
                    margin-bottom: 4px;
                }
                &-input {
                    border: none;
                    background-color: transparent;
                    color: @white;
                    line-height: 1.75;
                    outline: none;
                    -webkit-appearance: none;
                    &::-webkit-input-placeholder {
                        color: @whiteFilter;
                    }
                }
                &-notice {
                    position: absolute;
                    bottom: -1px;
                    right: 0;
                    color: @red;
                    font-size: @font-small;
                }
                .icon-eye {
                    position: absolute;
                    right: 3px;
                    bottom: 8px;
                    width: 26px;
                    height: 26px;
                    &_open {
                        right: 4px;
                        background-image: url("../../images/icon_eye_open@2x.png");
                    }
                }
            }
        }
        &-title {
            color: #fff;
            font-weight: 400;
            font-size: @font-largest;
        }
    }

    .sculpture-item {
        text-align: center;
        &-img {
            display: inline-block;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: none;
            background-image: url("../../images/icon_large_headSculpture@2x.png");
            background-repeat: no-repeat;
            background-position: top center;
            background-size: 100% auto;
        }
        &-name {
            font-size: @font-smaller;
            color: @white;
            padding-left:4px;
            text-align: center;
            margin-left: 3px;
            .icon-select-left {
                width: 10px;
                height: 10px;
            }
        }
    }

    .accountHistoryList {
        .accountHistoryItem {
            position: relative;
            font-size: @font-largest;
            color: @white;
            line-height: 1.5;
            padding: 14px 0;
            box-sizing: border-box;
            border-bottom: 1px solid @whiteFilter;
            .icon-delete {
                position: absolute;
                top: 22px;
                right: 8px;
            }
        }
    }

    .icon-select {
        position: absolute;
        right: 8px;
        bottom: 14px;
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url("../../images/icon_down@2x.png");
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 100% auto;
        &_toggle {
            transform: rotate(180deg);
            bottom: 18px;
        }
    }
    .icon-select-left {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url("../../images/icon_down@2x.png");
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 100% auto;
        transform: rotate(270deg);
    }
    .icon-delete {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url("../../images/icon_del@2x.png");
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 100% auto;
    }
    .icon-eye {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url("../../images/icon_eye_close@2x.png");
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 100% auto;
    }
</style>
