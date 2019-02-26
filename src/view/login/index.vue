<template>
    <div class="login-wrapper container-wrapper">
        <div class="login-inner">
            <h3 class="login-title">欢迎登录!</h3>

            <div v-if="departName" class="sculpture-item">
                <img src=""
                     class="sculpture-item-img"
                />
                <div class="sculpture-item-name">{{departName}}</div>
            </div>

            <div class="item" :class="this.loginInputStatus[0] === 1 ? 'bB1' : ''">
                <div class="item-label">机构编码</div>
                <input v-model="depart"
                       class="item-input"
                       placeholder="请输入机构编码"/>
                <p class="item-notice" v-show="this.loginRule[0] === 0 && this.loginRuleTextStatus === true">不能为空</p>
            </div>

            <div class="item" :class="this.loginInputStatus[1] === 1 ? 'bB1' : ''">
                <div class="item-label">账户</div>
                <input
                        v-model="name"
                        class="item-input"
                        placeholder="请输入账号"/>
                <p class="item-notice" v-show="this.loginRule[1] === 0 && this.loginRuleTextStatus === true">不能为空</p>
            </div>

            <div class="item" :class="this.loginInputStatus[2] === 1 ? 'bB1' : ''">
                <div class="item-label">密码</div>
                <input
                        v-model="password"
                        class="item-input"
                        placeholder="请输入密码"/>
                <p class="item-notice" v-show="this.loginRule[2] === 0 && this.loginRuleTextStatus === true">不能为空</p>
            </div>

            <button
                    class="
                         btn
                         btn-block
                         btn-primary
                         mt14"
                    :class="loginStatus ? '': 'btn-disabled'"
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
            if (localStorage.getItem('departCurrentName')) {
                this.departName = localStorage.getItem('departCurrentName');
            }
        },
        watch: {
            'depart': function (old, val) {
                if (val) {
                    this.loginRule[0] = 1;
                    if (this.name && this.password) {
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
            'name': function (old, val) {
                if (val) {
                    this.loginRule[1] = 1;
                    if (this.name && this.password) {
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
                    if (this.name && this.password) {
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
                    lin-height: 1.75;
                    &::-webkit-input-placeholder {
                        color: @whiteFilter;
                    }
                }
                &-notice {
                    position: absolute;
                    bottom: 8px;
                    right: 0;
                    color: @red;
                    font-size: @font-small;
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
            background-color: red;
            border-radius: 50%;
            border: none;
        }
        &-name {
            font-size: @font-smaller;
            color: @white;
            text-align: center;
        }
    }
</style>
