<template>
    <div>
        <div class="cashier-wrapper container-wrapper">
            <div class="cashier-inner">

                <div class="item pb3"
                     :class="this.loginInputStatus[0] === 1 ? 'bB1' : ''"
                >
                    <div class="item-label">输入金额（元）</div>

                    <div class="cashier-input">
                        <div class="flex-content flex-content-align">
                            <div class="cashier-input-unit mr4">￥</div>
                            <input v-model="this.amount"
                                   @touchstart.native.stop="keyboardShow = true"
                                   @focus="keyFocus()"
                                   class="item-input amount-input"
                                   :class="cursorStatus ? 'cursor' : ''"
                                   maxlength="9"
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
                    <div class="item pt0"
                         :class="this.loginInputStatus[1] === 1 ? 'bB1' : ''"
                         v-else
                    >
                        <input v-model="remark"
                               class="item-input"
                               style="width: 100%;"
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
                        :class="this.btnStatus ? '' :'btn-disabled'"
                        @click="submitAction()">确定
                </button>
            </div>
            <van-number-keyboard
                    :show="keyboardShow"
                    extra-key="."
                    close-button-text="完成"
                    @blur="keyboardShow = false"
                    @input="onInput"
                    @delete="onDelete"
            />

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
        NumberKeyboard,
        NavBar
    } from 'vant';
    import storeData from './store/index';
    import ajax from '@/api/cashier';
    import {getBLen} from '@/validate/common';

    export default {
        name: 'RefundOpera',
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
            NumberKeyboard: NumberKeyboard,
            NavBar: NavBar
        },

        data() {
            return Object.assign(storeData.call(this), {
                keyboardShow: true,
                btnStatus: false,
                cursorStatus: false
            });
        },
        created() {
            if (this.keyboardShow == true && this.amount.length == 0) {
                this.cursorStatus = true;
            }
        },
        watch: {
            'amount': function (val, old) {
                if (val) {
                    if (val) {
                        this.cursorStatus = false;
                    } else {
                        this.cursorStatus = true;
                    }
                    this.loginRule[0] = 1;
                    if (val*1 > 0) {
                        this.btnStatus = true;
                    } else {
                        this.btnStatus = false;
                    }
                    if (this.remark) {
                        this.loginStatus = true;
                    } else {
                        this.loginStatus = false;
                    }

                    if (Math.floor(val*1) > 100000) {
                        this.btnStatus = false;
                        Toast('可输入的最大金额为100,000');
                        this.amount=old;
                        return;
                    }
                } else {
                    this.btnStatus = false;
                    this.loginRule[0] = 0;
                    this.btnStatus = false;
                }
                if (val !== old) {
                    this.loginInputStatus[0] = 1;
                    this.loginInputStatus[1] = 0;
                } else {
                    this.loginInputStatus[0] = 0;
                }
            },
            'remark': function (val, old) {
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
                if (getBLen(val + '') > 100) {
                    this.remark = old;
                    Toast('备注在100个字符之内');
                    return;
                }
            }
        },
        methods: {
            submitAction() {
                if (this.btnStatus === false) {

                    if (!this.amount) {
                        Toast('请输入收款金额');
                    }

                    if (Math.floor(this.amount) > 100000) {
                        Toast('可输入的最大金额为100,000');
                    }
                    return;
                }
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
                    payAmount: parseFloat(this.amount * 100).toFixed(0),
                    remark: this.remark,
                    deadTime: 5 // 五分钟
                }).then(response => {
                    fetchLoading.clear();
                    if (!response.success === true) {
                        Toast(response.msg || '收款创建失败');
                        return;
                    } else {
                        if (response.data) {
                            let payOrderNo = response.data.match(/payOrderNo=(\S*)/)[1];
                            let query = {
                                amount: this.amount,
                                payOrderNo: payOrderNo || '',
                                code: response.data || ''
                            };
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'cashierCode',
                                    query: query
                                });
                            }, 800);
                        } else {
                            Toast(response.msg || '收款创建失败');
                            return;
                        }
                    }
                }).catch(() => {
                    fetchLoading.clear();
                    Toast('收款创建失败');
                    return;
                });
            },
            remarkToggleHandle() {
                this.remarkShow = true;
            },
            onInput(value) {
                if (value === '.') {
                    if ((this.amount + '').indexOf('.') > -1) {
                        return;
                    }
                }
                if (value === '0' || value === 0) {
                    if (this.amount + '' === '0') {
                        return;
                    }
                }

                if (this.amount + '' === '0') {
                    if (value !== '.') {
                        return;
                    }
                }


                if ((this.amount + '').indexOf('.') > -1) {
                    if ((this.amount + '').split(".")[1].length > 1) {
                        return;
                    }
                }

                this.amount = this.amount + (value + '');
            },
            onDelete() {
                if ((this.amount + '').length > 0) {
                    this.amount = this.amount.substring(0, this.amount.length - 1);
                    if (this.amount) {
                        this.cursorStatus = false;
                    } else {
                        this.cursorStatus = true;
                    }
                }
            },
            keyFocus() {
                this.keyboardShow = true;
                document.activeElement.blur();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../style/formation.less";

    .cashier {
        &-inner {
            padding: 0 16px 14px 18px;
            background-color: @white;
        }
        &-wrapper {
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
                    padding-left: 0;
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
                border-left: none;
                &.cursor {
                    border-left: 1px solid @main-theme-color;
                }
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
