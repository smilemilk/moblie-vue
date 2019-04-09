<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                :z-index="999"
        />
        <div class="refundResult-wrapper container-wrapper">
            <div class="prompt"
                 :class="resultStatus ? 'prompt_'+resultStatus : ''"
            >
                <i class="icon"></i>

                <div v-if="isChecking">等待结果...</div>
                <div class="prompt-label" v-else>{{promptLabel[resultStatus]}}</div>

                <div class="prompt-tip" v-if="resultStatus==='0'">{{msg}}</div>
            </div>

            <button
                    class="
                         btn
                         btn-block
                         btn-primary
                         "
                    :class="[
                    resultStatus==='0' ? 'mt10' : 'mt35',
                    isChecking==true ? 'btn-disabled' : ''
                    ]"
                    :disabled="isChecking"
                    @click="completeAction(resultStatus)"
            >完成
            </button>
        </div>
    </div>
</template>

<script>
    import ajax from '@/api/business';

    export default {
        name: 'businessRefundResult',
        data() {
            return {
                resultStatus: '',
                promptLabel: {
                    '0': '退款失败',
                    '1': '退款成功'
                },
                refundOrderNo: '',
                msg: '',
                queryCount: 0,
                isChecking: true
            }
        },
        created() {
            this.refundOrderNo = this.$route.query.refundOrderNo;
            this.resultStatus = this.$route.query.resultStatus || '';
            if (this.resultStatus === '0') {
                this.msg = this.$route.query.msg || '';
            }
            this.refundInterval();
        },
        watch: {},
        methods: {
            getRefundDetail(_count, self) {

                // WaitRefund("1", "待退款"),
                // RefundPass("2", "退款成功"),
                // RefundFail("3", "退款失败"),
                // RefundPartPass("4", "退款部分成功")

                ajax.getRefund({refundOrderNo: self.refundOrderNo}).then(response => {
                    if (!response.success === true) {
                        self.businessInfo = {};
                        return;
                    } else {

                        if (response.data.payOrderStatus === '2' ||
                            response.data.payOrderStatus === '3' ||
                            response.data.payOrderStatus === '4') {
                            _count = 0;
                            self.queryCount = 0;
                            self.isChecking =false;

                            if (response.data.payOrderStatus === '2' ||
                                response.data.payOrderStatus === '4') {
                                self.resultStatus = '1';
                            }

                            if (response.data.payOrderStatus === '3' ) {
                                self.resultStatus = '0';
                                self.msg = response.msg || '';
                            }
                            clearInterval(self.refundInterval);
                        }

                        if (response.data.payOrderStatus === '1') {
                        }

                        if (self.resultStatus === '0') {
                            self.primaryNo = response.data.payOrderNo;
                        }
                    }
                }).catch(() => {
                    self.businessInfo = {};
                });
            },
            refundInterval() {
                let self = this;
                let _count = self.queryCount;
                self.refundInterval = window.setInterval(() => {
                    _count++;

                    if (_count > 20) {
                        _count = 0;
                        window.clearInterval(self.refundInterval);
                        return;
                    }
                    this.getRefundDetail(_count, self);
                }, 1000);
            },
            completeAction(resultStatus) {
                setTimeout(() => {
                    this.$router.push({
                        name: 'businessDetail',
                        query: {
                            tradeOrderNo: this.$route.query.refundOrderNo,
                            tradeType: '0',
                            resultStatus: resultStatus,
                            resultForm: '1'
                        }
                    });
                }, 800);
            },
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .refundResult {
        &-wrapper {
            padding: 16px;
            background-color: @white;
            .prompt {
                margin-top: 48px;
                width: 100%;
                height: 168px;
                text-align: center;
                .icon {
                    display: inline-block;
                    width: 80px;
                    height: 87px;
                    background-repeat: no-repeat;
                    background-position: top center;
                    z-index: 30;
                }
                &.prompt_0 {
                    .icon {
                        background-image: url("../../images/icon_fail.png");
                        background-size: 100% auto;
                    }
                }
                &.prompt_1 {
                    .icon {
                        background-image: url("../../images/icon_succeed.png");
                        background-size: 100% auto;
                    }
                }
                &-label {
                    margin-top: 15px;
                    margin-bottom: 10px;
                    text-align: center;
                    font-size: @font-largest;
                    color: @text-color;
                    line-height: 1;
                    z-index: 900;
                }
                &-tip {
                    margin-top: 0;
                    margin-bottom: 0;
                    text-align: center;
                    font-size: @font-normal;
                    color: @text-color-light;
                    line-height: 1;
                }
            }
        }
    }

</style>
