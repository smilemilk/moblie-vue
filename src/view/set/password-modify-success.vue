<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                :left-arrow="false"
                :z-index="999"
        />
        <div class="set_password-wrapper container-wrapper">

            <div class="prompt-item">
                <i class="prompt-img success"></i>
                <div class="prompt-label">{{promptLabel}}</div>
            </div>

            <button
                    class="
                         btn
                         btn-block
                         btn-primary
                         mt27"
                    @click="completeAction()"
            >完成
            </button>
        </div>
    </div>
</template>

<script>
    import storeData from './store/password-modify-success';

    export default {
        data() {
            return storeData.call(this);
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
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .set {
        &_password-wrapper {
            padding: 16px;
            background-color: @white;
            .item {
                position: relative;
                padding: 16px 0 8px;
                border-bottom: 1px solid @border-color-dark;
                &.bB1 {
                    border-bottom-color: @text-color-normal;
                }
                &-input {
                    width: 100%;
                    border: none;
                    background-color: transparent;
                    color: @text-color;
                    font-size: @font-large;
                    line-height: 1.75;
                    outline: none;
                    -webkit-appearance: none;
                    &::-webkit-input-placeholder {
                        color: @text-color-light;
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
    }

</style>
