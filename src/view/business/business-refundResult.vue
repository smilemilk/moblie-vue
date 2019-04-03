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
                <div class="prompt-label">{{promptLabel[resultStatus]}}</div>
                <div class="prompt-tip" v-if="resultStatus==='0'">{{msg}}</div>
            </div>

            <button
                    class="
                         btn
                         btn-block
                         btn-primary
                         "
                    :class="resultStatus==='0' ? 'mt10' : 'mt35'"
                    @click="completeAction(resultStatus)"
            >完成
            </button>
        </div>
    </div>
</template>

<script>
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
                msg: ''
            }
        },
        created() {
            this.refundOrderNo = this.$route.query.refundOrderNo;
            this.resultStatus = this.$route.query.resultStatus || '';
            if(this.resultStatus==='0') {
                this.msg = this.$route.query.msg || '';
            }
        },
        watch: {},
        methods: {
            completeAction(resultStatus) {
                // if (resultStatus === '0') {
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
                // } else {
                //
                // }
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
