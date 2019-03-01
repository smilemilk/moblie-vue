<template>
    <div class="cashier-wrapper container-wrapper">
        <div class="cashier-inner">

            <div class="item pb3" :class="this.loginInputStatus[0] === 1 ? 'bB1' : ''">
                <div class="item-label">输入金额（元）</div>

                <div class="cashier-input">
                    <div class="flex-content flex-content-spaceBetween flex-content-align">
                        <div class="cashier-input-unit mr10">￥</div>
                        <input v-model="amount"
                               class="item-input amount-input"
                               placeholder="0.00"/>
                    </div>
                    <p class="item-notice"
                       v-show="this.loginRule[0] === 0 &&
                   this.loginRuleTextStatus === true">不能为空</p>
                </div>
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
                     :class="this.loginInputStatus[1] === 1 ? 'bB1' : ''"
                     v-else
                >
                    <input v-model="remark"
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
        GoodsActionMiniBtn,
    } from 'vant';
    import storeData from './store/index';
    import ajax from '@/api/cashier';

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
        watch: {
            'amount': function (val, old) {
                if (val) {
                    this.loginRule[0] = 1;
                    if (this.remark) {
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
                } else {
                    this.loginInputStatus[0] = 0;
                }
            },
            'remark': function (old, val) {
                if (val) {
                    this.loginRule[1] = 1;
                } else {
                    this.loginRule[1] = 0;
                }
                if (val !== old) {
                    this.loginInputStatus[0] = 0;
                    this.loginInputStatus[1] = 1;
                } else {
                    this.loginInputStatus[1] = 0;
                }
            }
        },
        methods: {
            loginAction() {
                if ((this.loginRule.join() === '1,1') || (this.loginRule.join() === '1,0')) {
                    this.loginStatus = true;
                    this.loginRuleTextStatus = false;
                    let fetchLoading = Toast.loading({
                        mask: true,
                        message: '请等待...'
                    });
                    this.createOrderFetch(fetchLoading);
                } else {
                    this.loginStatus = false;
                    this.loginRuleTextStatus = true;
                }
            },
            createOrderFetch(fetchLoading) {
                ajax.createOrder({
                    orderId: (Math.floor(Math.random() * 900) + 100) + '' + (new Date()).valueOf(),
                    payOrderType: 'xxsk',
                    payAmount: this.amount * 100,
                    remark: this.remark,
                    deadTime: 5 // 五分钟
                }).then(response => {
                    fetchLoading.clear();
                    if (!response.success === true) {
                        Toast(response.msg || '收款创建失败');
                        return;
                    } else {
                        if (response.data) {
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'cashierCode',
                                    query: {code: response.data}
                                });
                            }, 800);
                        } else {
                            Toast(response.msg || '收款创建失败');
                            return;
                        }
                    }
                }).catch(() => {
                    fetchLoading.clear();
                    Toast(response.msg || '收款创建失败');
                    return;
                });
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
                    color: @text-color;
                    line-height: 1.25;
                    font-size: @font-normal;
                    caret-color: @main-theme-color;
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
            .amount-input {
                position: relative;
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

    .cashier-input {
        &-unit {
            font-size: @font-hugeMore;
            color: @text-color;
        }
        .amount-input {
            font-size: 36px;
        }
    }
</style>
