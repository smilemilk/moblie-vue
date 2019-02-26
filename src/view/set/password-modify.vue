<template>
    <div class="set_password-wrapper container-wrapper">

        <div class="item" :class="this.submitInputStatus[0] === 1 ? 'bB1' : ''">
            <input v-model="password.old"
                   class="item-input"
                   placeholder="请输入原密码"/>
            <p class="item-notice" v-show="this.submitRule[0] === 0 && this.submitRuleTextStatus === true">不能为空</p>
        </div>

        <div class="item mt16" :class="this.submitInputStatus[1] === 1 ? 'bB1' : ''">
            <input v-model="password.new"
                   class="item-input"
                   placeholder="请输入新的登录密码"/>
            <p class="item-notice" v-show="this.submitRule[1] === 0 && this.submitRuleTextStatus === true">不能为空</p>
        </div>

        <div class="item mt16" :class="this.submitInputStatus[2] === 1 ? 'bB1' : ''">
            <input v-model="password.again"
                   class="item-input"
                   placeholder="请再次输入新的登录密码"/>
            <p class="item-notice" v-show="this.submitRule[2] === 0 && this.submitRuleTextStatus === true">不能为空</p>
        </div>

        <button
                class="
                         btn
                         btn-block
                         btn-primary
                         mt27"
                :class="submitStatus ? '': 'btn-disabled'"
                @click="submitAction()"
        >提交
        </button>
    </div>
</template>

<script>
    import storeData from './store/password-modify';

    export default {
        data() {
            return storeData.call(this);
        },
        created() {

        },
        watch: {
            'old': function (old, val) {
                if (val) {
                    this.submitRule[0] = 1;
                    if (this.password.new && this.password.again) {
                        this.submitStatus = true;
                    } else {
                        this.submitStatus = false;
                    }
                } else {
                    this.submitRule[0] = 0;
                    this.submitStatus = false;
                }
                if (val !== old) {
                    this.submitInputStatus[0] = 1;
                    this.submitInputStatus[1] = 0;
                    this.submitInputStatus[2] = 0;
                } else {
                    this.submitInputStatus[0] = 0;
                }
            },
            'new': function (old, val) {
                if (val) {
                    this.submitRule[1] = 1;
                    if (this.password.old && this.password.again) {
                        this.submitStatus = true;
                    } else {
                        this.submitStatus = false;
                    }
                } else {
                    this.submitRule[1] = 0;
                    this.submitStatus = false;
                }
                if (val !== old) {
                    this.submitInputStatus[0] = 0;
                    this.submitInputStatus[1] = 1;
                    this.submitInputStatus[2] = 0;
                } else {
                    this.submitInputStatus[1] = 0;
                }
            },
            'again': function (old, val) {
                if (val) {
                    this.submitRule[2] = 1;
                    if (this.password.old && this.password.new) {
                        this.submitStatus = true;
                    } else {
                        this.submitStatus = false;
                    }
                } else {
                    this.submitRule[2] = 0;
                    this.submitStatus = false;
                }
                if (val !== old) {
                    this.submitInputStatus[0] = 0;
                    this.submitInputStatus[1] = 0;
                    this.submitInputStatus[2] = 1;
                } else {
                    this.submitInputStatus[2] = 0;
                }
            }
        },
        methods: {
            submitAction() {
                if (this.submitRule.join() === '1,1,1') {
                    this.submitStatus = true;
                    this.submitRuleTextStatus = false;
                    this.submitFetch();
                } else {
                    this.submitStatus = false;
                    this.submitRuleTextStatus = true;
                }
            },
            submitFetch() {
            },
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
