<template>
    <div class="cashier-wrapper container-wrapper p16">
        <div class="card">
            <div class="cashier-account">收款金额：<strong>￥1000.00</strong></div>
            <div class="cashier-tip"><i class="icon-redPacket"></i>温馨提示：使用微脉APP扫码支付可使用优惠券哦</div>
            <div class="cashier-code-container">
                <img src="" alt="二维码"/>
            </div>
        </div>
        <div>
            <ul>
                <li>

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
        &-wrapper {
            .card {
                padding: 16px 0 30px;
            }
            .icon-redPacket {
                display: inline-block;
                width: 14px;
                height: 14px;
                background-image: url("../../images/icon_redPacket@2x.png");
                background-repeat: no-repeat;
                background-position: top center;
                background-size: 100% auto;
            }
        }
        &-account {
            color: @text-color;
            font-size: @font-large;
            line-height: 1.5;
            text-align: center;
            strong {
                font-size: @font-huge;
                color: @text-color-dark;
                font-weight: @font-weight_800;
            }
        }
        &-tip {
            width: 100%;
            background-color: @yellow;
            color: @redLight;
            font-size: @font-smaller;
            line-height: 1.5;
            padding: 13px 14px 13px 12px;
        }
        &-code-container {
            padding-left: 45px;
            padding-right: 45px;
            text-align: center;
            margin-top: 30px;
            img {
                display: inline-block;
                width: 100%;
            }
        }
    }
</style>
