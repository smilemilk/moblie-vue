<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                :left-arrow="false"
                :z-index="999"
        />
        <div class="cashier_failure-wrapper container-wrapper">
            <div class="prompt">
                <div class="prompt-label">{{promptLabel}}</div>
            </div>

            <div class="prompt-label-detail mt20">
                1.订单撤销失败，可继续进行收款，该笔订单仍然有效，若用户付款成功，会自动退还支付账户。
            </div>
            <div class="prompt-label-detail">
                2.该订单5分钟后自动失效或点击查看订单去订单详情手动取消。
            </div>

            <button
                    class="
                         btn
                         btn-block
                         btn-primary
                         mt35"
                    @click="againAction()"
            >重新收款
            </button>
            <button
                    class="
                         btn
                         btn-block
                         btn-ghost
                         mt20"
                    @click="cancelAction()"
            >撤销订单
            </button>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                promptLabel: '撤销失败'
            }
        },
        created() {

        },
        watch: {},
        methods: {
            againAction() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'cashier',
                        query: ''
                    });
                }, 800);
            },
            cancelAction() {

            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .cashier {
        &_failure-wrapper {
            padding: 16px;
            background-color: @white;
            .prompt {
                margin-top: 4px;
                position: relative;
                width: 100%;
                height: 168px;
                &:after {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    content: '';
                    display: inline-block;
                    width: 292px;
                    height: 169px;
                    background-image: url("../../images/fail_bg@2x.png");
                    background-repeat: no-repeat;
                    background-position: top center;
                    background-size: 100% auto;
                    z-index: 30;
                }
                &-label {
                    position: absolute;
                    bottom: 22px;
                    left: 50%;
                    transform: translateX(-50%);
                    text-align: center;
                    font-size: @font-largest;
                    color: @text-color;
                    line-height: 1;
                    z-index: 900;
                }
            }
        }
    }

</style>
