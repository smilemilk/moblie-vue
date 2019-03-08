<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                left-arrow
                :z-index="999"
                @click-left="navBackClick"
        />
        <div class="cashier_failure-wrapper container-wrapper">
            <div class="prompt">
                <div class="prompt-label">{{promptLabel}}</div>
            </div>

            <button
                    class="
                         btn
                         btn-block
                         btn-primary
                         mt35"
                    @click="completeAction()"
            >重新收款
            </button>
            <button
                    class="
                         btn
                         btn-block
                         btn-ghost
                         mt20"
                    @click="completeAction()"
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
            completeAction() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'login',
                        query: ''
                    });
                }, 800);
            },
            navBackClick() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'home'
                    });
                }, 800);
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
