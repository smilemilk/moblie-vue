<template>
    <div>
        <van-nav-bar
                class="bar-wrapper"
                :title="this.$route.meta.title"
                left-arrow
                :z-index="999"
                @click-left="navBackClick"
        />
        <div class="set-wrapper container-wrapper">
            <div class="set-sculpture">
                <i class="set-sculpture-img"></i>
                <div class="set-sculpture-name">{{userRealName}}</div>
            </div>
            <div class="set-form cell-group">
                <div class="cell">
                    <div class="cell-inner cell-inner-lr">
                        <label>门店</label>
                        <div class="cell-right">{{merchantNickName}}</div>
                    </div>
                </div>
                <div class="cell">
                    <div class="cell-inner cell-inner-lr">
                        <label>收银机编号</label>
                        <div class="cell-right">001</div>
                    </div>
                </div>
                <div class="cell">
                    <div class="cell-inner cell-inner-lr">
                        <label>打印小票</label>
                        <div class="cell-right printSwitch" @click="printTouchHandle()">
                            <van-switch
                                    v-model="printChecked"
                                    disabled
                                    size="22px"
                                    inactive-color="#d9d9d9"
                            />
                        </div>
                    </div>
                </div>
                <div class="cell">
                    <div class="cell-inner cell-inner-lr">
                        <label>当前版本</label>
                        <div class="cell-right">V1.1.0</div>
                    </div>
                </div>
            </div>

            <div class="set-form cell-group mt16">
                <div class="cell cell_hover" @click="modifyPasswordAction()">
                    <div class="cell-inner cell-inner-lr">
                        <label>修改密码</label>
                        <i class="cell-right-arrow">
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Switch,
        Toast
    } from 'vant';
    import storeData from './store/index';
    import ajaxUser from '@/api/user';

    export default {
        components: {
            [Switch.name]: Switch,
        },
        data() {
            return storeData.call(this);
        },
        created() {
            this.userInfo();
            this.merchantInfo();
        },
        watch: {},
        methods: {
            merchantId() {
                return new Promise((resolve, reject) => {
                    ajaxUser.merchantId({
                        isQueryAll: false
                    }).then(response => {
                        if (!response.success === true) {
                            Toast(response.msg || '获取用户信息异常');
                            return reject({});
                        } else {
                            if (response.data && response.data.userId) {
                                return resolve(
                                    response.data.userId
                                );
                            } else {
                                return reject({});
                            }
                        }
                    }).catch(() => {
                        Toast('请求异常');
                        return reject({});
                    });
                });
            },
            userInfo() {
                Promise.all([this.merchantId()]).then((results) => {
                    ajaxUser.userDetail({
                        userId: results
                    }).then(response => {
                        if (!response.success === true) {
                            return;
                        } else {
                            if (response.data && response.data.list) {
                                this.userRealName = response.data.list[0].userRealName || '';
                                this.userName = response.data.list[0].userName || '';
                            }
                        }
                    }).catch(() => {
                    });
                }).catch((e) => {
                });
            },
            merchantInfo() {
                ajaxUser.merchantUser({}).then(response => {
                    if (!response.success === true) {
                        return;
                    } else {
                        if (response.data && response.data) {
                            this.merchantNickName = response.data.merchantNickName || '';
                        }
                    }
                }).catch(() => {
                });
            },
            modifyPasswordAction() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'passwordModify',
                        query: ''
                    });
                }, 800);
            },
            printTouchHandle() {
                Toast('暂不支持打印小票');
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

    .set {
        &-sculpture {
            background-color: @main-theme-color;
            padding-top: 30px;
            padding-bottom: 20px;
            text-align: center;
            &-img {
                display: inline-block;
                width: 46px;
                height: 46px;
                background-image: url("../../images/icon_large_headSculptureLight@2x.png");
                background-repeat: no-repeat;
                background-position: top center;
                background-size: 100% auto;
            }
            &-name {
                margin-top: 10px;
                font-size: @font-larger;
                color: @white;
                text-align: center;
                line-height: 1.5;
            }
        }
    }

    .printSwitch {
        position: absolute;
        right: 0;
        top: 13px;
    }

</style>
