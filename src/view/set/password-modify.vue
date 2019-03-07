<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                left-arrow
                :z-index="999"
                @click-left="navBackClick"
        />
        <div class="set_password-wrapper container-wrapper">

            <div class="item" :class="this.submitInputStatus[0] === 1 ? 'bB1' : ''">
                <input v-model="password.old"
                       class="item-input"
                       :type="this.oldShow ? 'text': 'password'"
                       placeholder="请输入原密码"/>
                <i class="icon-eye"
                   v-if="password.old"
                   @click="showHandle('old')"
                   :class="this.oldShow ? 'icon-eye_open':''"></i>
                <p class="item-notice" v-show="this.submitRule[0] === 0 && this.submitRuleTextStatus === true">不能为空</p>
            </div>

            <div class="item mt16" :class="this.submitInputStatus[1] === 1 ? 'bB1' : ''">
                <input v-model="password.new"
                       class="item-input"
                       :type="this.newShow ? 'text': 'password'"
                       placeholder="请输入新的登录密码"/>
                <i class="icon-eye"
                   v-if="password.new"
                   @click="showHandle('new')"
                   :class="this.newShow ? 'icon-eye_open':''"
                ></i>
                <p class="item-notice" v-show="this.submitRule[1] === 0 && this.submitRuleTextStatus === true">不能为空</p>
            </div>

            <div class="item mt16" :class="this.submitInputStatus[2] === 1 ? 'bB1' : ''">
                <input v-model="password.again"
                       class="item-input"
                       :type="this.againShow ? 'text': 'password'"
                       placeholder="请再次输入新的登录密码"/>
                <i class="icon-eye"
                   v-if="password.again"
                   @click="showHandle('again')"
                   :class="this.againShow ? 'icon-eye_open':''"
                ></i>
                <p class="item-notice" v-show="this.submitRule[2] === 0 && this.submitRuleTextStatus === true">不能为空</p>
            </div>

            <button
                    class="
                         btn
                         btn-block
                         btn-primary
                         mt27"
                    @click="submitAction()"
            >提交
            </button>
        </div>
    </div>
</template>

<script>
    import storeData from './store/password-modify';
    import ajax from '@/api/set';
    import {
        Toast,
    } from 'vant';

    export default {
        data() {
            return Object.assign(storeData.call(this), {
                oldShow: false,
                newShow: false,
                againShow: false
            });
        },
        created() {

        },
        watch: {
            'password.old': function (val, old) {
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
            'password.new': function (val, old) {
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
            'password.again': function (val, old) {
                if (val) {
                    this.submitRule[2] = 1;
                    if (this.password.old && this.password.new) {
                        this.submitStatus = true;
                    } else {
                        this.submitStatus = false;
                    }

                    if (this.password.new.length === 0) {
                        this.password.again = '';
                        Toast('请先填写新的登录密码');
                        return;
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
            showHandle(item) {
                this[item+'Show'] = !this[item+'Show'];
            },
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
                if (this.password.new !== this.password.again) {
                    Toast('新密码和确认密码不一致，请确定');
                    return;
                }

                ajax.modPassword({
                    oldPwd: this.password.old,
                    newPwd: this.password.new
                }).then(response => {
                    if (!response.success === true) {
                        Dialog.confirm({
                            title: response.msg || '修改密码失败',
                            message: ''
                        }).then(() => {
                        }).catch(() => {
                        });
                        return;
                    } else {
                        if (response.data.success) {
                            if (this.userName) {
                                localStorage.setItem('userNameLast', this.userName);
                            } else {
                                localStorage.setItem('userNameLast', '');
                            }
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'login'
                                });
                            }, 800);
                        } else {
                            Toast(response.msg || '修改密码失败');
                        }
                    }
                }).catch(() => {
                });
            },
            navBackClick() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'set'
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
                    border-bottom-color: @main-theme-color;
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
                    caret-color: @main-theme-color;
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
                .icon-eye {
                    position: absolute;
                    right: 3px;
                    bottom: 12px;
                }
            }
            .icon-eye {
                display: inline-block;
                width: 20px;
                height: 20px;
                background-image: url("../../images/icon_eye_close_dark@2x.png");
                background-repeat: no-repeat;
                background-position: top center;
                background-size: 100% auto;
                &_open {
                    background-image: url("../../images/icon_eye_open_dark@2x.png");
                    background-size: 100% auto;
                }
            }
        }
    }

</style>
