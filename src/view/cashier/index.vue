<template>
    <div class="cashier-wrapper container-wrapper">
        <div class="cashier-inner">

            <div class="item" :class="this.loginInputStatus[0] === 1 ? 'bB1' : ''">
                <div class="item-label">输入金额（元）</div>
                <input v-model="depart"
                       class="item-input account-input"
                       placeholder="请输入机构编码"/>
                <p class="item-notice" v-show="this.loginRule[0] === 0 && this.loginRuleTextStatus === true">不能为空</p>
            </div>
            <div class="font-n-l mt10">请仔细确认输入金额是否与商品价格一致</div>
            <div class="mt20">
                <div v-if="!remarkShow">
                    <span
                            @click="remarkToggleHandle()"
                            class="font-n-b"
                    >添加备注</span>
                </div>
                <div class="item"
                     :class="this.loginInputStatus[0] === 1 ? 'bB1' : ''"
                     v-else
                >
                    <input v-model="depart"
                           class="item-input"
                           placeholder="请输入收款备注"/>
                </div>
            </div>
        </div>
        <div class="plr16">
            <button
                    class="
                         btn
                         btn-block
                         btn-primary
                         mt14"
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
            sorry() {
                Toast('暂无后续逻辑~');
                this.$router.push('incomeList');
            },
            remarkToggleHandle() {
                this.remarkShow = true;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .cashier {
        &-inner {
            padding: 14px 16px 14px 18px;
            background-color: @white;
        }
        &-wrapper {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            .item {
                position: relative;
                padding: 16px 0 8px;
                border-bottom: 1px solid @border-color-dark;
                &.bB1 {
                    border-bottom-color: @main-theme-color;
                }
                &-label {
                    font-size: 12px;
                    line-height: 1.75;
                    color: @text-color-normal;
                    margin-bottom: 4px;
                }
                &-input {
                    border: none;
                    background-color: transparent;
                    color: @main-theme-color;
                    line-height: 1.75;
                    &::-webkit-input-placeholder {
                        color: @border-color-dark;
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
            .account-input {
                position: relative;
                padding-left: 42px;
                &:before {
                    position: absolute;
                    top: 0;
                    left: 0;
                    content: '￥';
                    display: inline-block;
                    color: @text-color;
                    font-size: @font-hugeMore;
                }
            }
        }
        &-title {
            color: #fff;
            font-weight: 400;
            font-size: @font-largest;
        }
    }
</style>
