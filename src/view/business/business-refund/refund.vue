<template>
    <div>
        <div class="">
            <div class="refund-inner">

                <div class="item pb3"
                     :class="this.refundInputStatus[0] === 1 ? 'bB1' : ''"
                >
                    <div class="item-label">退款金额（元）</div>

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
                           v-show="refundRule[0] === 0 &&
                               refundRuleTextStatus === true">不能为空</p>
                    </div>
                </div>
                <div class="mt10">
                    <div v-if="!remarkShow">
                    <span
                            @click="remarkToggleHandle()"
                            class="font-n-b"
                    >添加退款备注</span>
                    </div>
                    <div class="item pt0"
                         :class="this.refundInputStatus[1] === 1 ? 'bB1' : ''"
                         v-else
                    >
                        <input v-model="remark"
                               class="item-input remark"
                               style="width: 100%;"
                               placeholder="请输入退款备注"/>
                    </div>
                </div>
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
        props: {
            limitAmount: {
                type: String,
                default: ''
            }
        },
        data() {
            return Object.assign(storeData.call(this), {
                keyboardShow: true,
                // btnStatus: false, // 符不符合提交标准
                cursorStatus: false,
            });
        },
        created() {
            console.log(this.limitAmount);
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
                    this.refundRule[0] = 1;
                    if (val * 1 > 0) {
                        this.btnStatus = true;
                    } else {
                        this.btnStatus = false;
                    }
                    if (this.remark) {
                        this.refundStatus = true;
                    } else {
                        this.refundStatus = false;
                    }

                    if (val * 100 > this.limitAmount * 1) {
                        this.btnStatus = false;
                        Toast('输入的金额大于最大退款额');
                        this.amount = old;
                        return;
                    }

                    if (Math.floor(val * 1) > 100000) {
                        this.btnStatus = false;
                        Toast('可输入的最大金额为100,000');
                        this.amount = old;
                        return;
                    }
                } else {
                    this.btnStatus = false;
                    this.refundRule[0] = 0;
                    this.btnStatus = false;
                }
                if (val !== old) {
                    this.refundInputStatus[0] = 1;
                    this.refundInputStatus[1] = 0;
                } else {
                    this.refundInputStatus[0] = 0;
                }
            },
            'remark': function (val, old) {
                if (val) {
                    this.refundRule[1] = 1;
                } else {
                    this.refundRule[1] = 0;
                }
                if (val !== old) {
                    this.refundInputStatus[0] = 0;
                    this.refundInputStatus[1] = 1;
                } else {
                    this.refundInputStatus[1] = 0;
                }
                if (getBLen(val + '') > 100) {
                    this.remark = old;
                    Toast('备注在100个字符之内');
                    return;
                }
            }
        },
        mounted() {
            this.$on('getValue', () => {
                this.submitAction();
            })
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
                if ((this.refundRule.join() === '1,1') || (this.refundRule.join() === '1,0')) {
                    this.refundStatus = true;
                    this.refundRuleTextStatus = false;
                    // let fetchLoading = Toast.loading({
                    //     mask: true,
                    //     message: '请等待...'
                    // });
                    // this.createOrderFetch(fetchLoading);
                    this.$emit('submit', {
                        amount: this.amount,
                        remark: this.remark
                    });
                } else {
                    this.refundStatus = false;
                    this.refundRuleTextStatus = true;
                }
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

    .refund {
        &-inner {
            padding: 10px 16px;
            background-color: @white;
            .item {
                position: relative;
                border-bottom: 1px solid @border-color-dark;
                &.bB1 {
                    border-bottom-color: @main-theme-color;
                }
                &-label {
                    font-size: @font-normal;
                    line-height: 1.25;
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
                    &.remark {
                        line-height: 1.75;
                    }
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
                    border-radius: 0;
                }
                &:before {
                    position: absolute;
                    top: 0;
                    left: 0;
                    content: '￥';
                    display: inline-block;
                    color: @text-color;
                    font-size: @font-hugest;
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
