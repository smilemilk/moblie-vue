<template>
    <div class="login-wrapper container-wrapper">
        <div class="login-inner">
            <h3 class="login-title">欢迎登录!</h3>
            <div v-if="this.departList &&
            this.departList.length > 0"
                 class="sculpture-item">
                <i src=""
                   class="sculpture-item-img"
                />
                <div class="align-c">
                    <div class="sculpture-item-name"
                         @click="departPickerHandle()"
                         v-if="
                              this.departList &&
                              this.departList.length > 0"
                    >
                        {{departListCurrent}}
                        <i
                                v-if="this.departList"
                                class="icon-select-left"
                        ></i>
                    </div>
                </div>
            </div>

            <div class="item" :class="this.loginInputStatus[0] === 1 ? 'bB1' : ''">
                <div class="item-wrapper">
                    <div class="item-label">机构编码</div>
                    <input v-model="depart"
                           class="item-input"
                           max="20"
                           placeholder="请输入机构编码"/>
                    <p class="item-notice"
                       v-show="
                       this.loginRule[0] === 0 &&
                       this.loginRuleTextStatus === true">
                        不能为空</p>
                </div>
            </div>

            <div class="item" :class="this.loginInputStatus[1] === 1 ? 'bB1' : ''">
                <div class="item-wrapper">
                    <div class="item-label">账户</div>
                    <input
                            v-model="account"
                            class="item-input"
                            max="20"
                            placeholder="请输入账号"/>
                    <i class="icon-select"
                       v-if="this.accountList && this.accountList.length > 0"
                       @click="accountSelectHandle()"
                       :class="this.accountShow ? 'icon-select_toggle' : ''"
                    ></i>
                    <p class="item-notice" v-show="this.loginRule[1] === 0 && this.loginRuleTextStatus === true">
                        不能为空</p>
                </div>
            </div>

            <div class="accountHistoryList"
                 v-if="this.accountList && this.accountList.length > 0 && this.accountShow">
                <div class="accountHistoryItem"
                     v-for="(item,key) in accountList"
                     :key="key"
                     @click="accountChangeHandle(item)"
                >
                    {{item.account}}
                    <i
                            class="icon-delete"
                            @click="deleteAccountAction(item, key)"
                    ></i>
                </div>
            </div>

            <div class="item"
                 :class="this.loginInputStatus[2] === 1 ? 'bB1' : ''"
                 v-show="(this.accountList && !this.accountShow) || this.accountList.length===0">
                <div class="item-wrapper">
                    <div class="item-label">密码</div>
                    <input
                            v-model="password"
                            class="item-input"
                            max="20"
                            :type="this.passwordShow ? 'text': 'password'"
                            placeholder="请输入密码"/>
                    <i
                            class="icon-eye"
                            v-if="password"
                            @click="passwordShowHandle()"
                            :class="this.passwordShow ? 'icon-eye_open':''"
                    ></i>
                    <p
                            class="item-notice"
                            v-show="this.loginRule[2] === 0 && this.loginRuleTextStatus === true">
                        不能为空</p>
                </div>
            </div>

            <button
                    class="
                         btn
                         btn-block
                         btn-primary
                         mt14"
                    :class="loginStatus ? '': 'btn-disabled_white'"
                    v-show="(this.accountList && !this.accountShow) || this.accountList.length===0"
                    @click="loginAction()">登录
            </button>
        </div>
        <van-popup
                v-model="departPickerShow"
                position="bottom"
                :overlay="true"
        >
            <van-picker
                    v-if="this.departPickerShow"
                    :columns="departListColumns"
                    @change="onChange"
                    :item-height="34"
                    show-toolbar
                    :visible-item-count="5"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @cancel="onCancel"
                    @confirm="onConfirm"
                    value-key="value.depart">
            </van-picker>
        </van-popup>
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
        Dialog,
        Picker,
        Popup
    } from 'vant';
    import storeData from './store/index';
    import ajax from '@/api/login';
    import Cookies from 'js-cookie';
    import RSA from '@/libs/RSA';

    export default {
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
            Dialog: Dialog,
            [Picker.name]: Picker,
            Popup: Popup
        },

        data() {
            return Object.assign(storeData.call(this), {
                // departListColumns: []
            });
        },
        created() {
            this.getToken();
            console.log(localStorage.getItem('accountList'))
            this.accountList = this.accountListComputed();
            this.departList = this.departListComputed();

            if (this.departList && this.departList.length > 0) {
                this.departListCurrent = this.departList[0]['depart'];
                this.depart = this.departListCurrent;
            }

            if (this.departList) {
                let arr = [];
                this.departList.forEach(it=>{

                    arr.push(it.depart);
                });
                this.departListColumns = arr;
            }
        },
        watch: {
            'depart': function (val, old) {
                if (val) {
                    this.loginRule[0] = 1;
                    if (this.account && this.password) {
                        this.loginStatus = true;
                    } else {
                        this.loginStatus = false;
                    }
                } else {
                    this.loginRule[0] = 0;
                    this.loginStatus = false;
                }
                if (val !== old) {
                    this.loginInputStatus[0] = 1;
                    this.loginInputStatus[1] = 0;
                    this.loginInputStatus[2] = 0;
                } else {
                    this.loginInputStatus[0] = 0;
                }
            },
            'account': function (val, old) {
                if (val) {
                    this.loginRule[1] = 1;
                    if (this.account && this.password) {
                        this.loginStatus = true;
                    } else {
                        this.loginStatus = false;
                    }
                } else {
                    this.loginRule[1] = 0;
                    this.loginStatus = false;
                }
                if (val !== old) {
                    this.loginInputStatus[0] = 0;
                    this.loginInputStatus[1] = 1;
                    this.loginInputStatus[2] = 0;
                } else {
                    this.loginInputStatus[1] = 0;
                }
            },
            'password': function (val, old) {
                if (val) {
                    this.loginRule[2] = 1;
                    if (this.account && this.password) {
                        this.loginStatus = true;
                    } else {
                        this.loginStatus = false;
                    }
                } else {
                    this.loginRule[2] = 0;
                    this.loginStatus = false;
                }
                if (val !== old) {
                    this.loginInputStatus[0] = 0;
                    this.loginInputStatus[1] = 0;
                    this.loginInputStatus[2] = 1;
                } else {
                    this.loginInputStatus[2] = 0;
                }
            },
            accountList() {
                this.accountListComputed();
            },
            departList() {
                this.departListComputed();
            },
        },
        computed: {
            // 'departListColumns': ()=> {
            //     let arr = [];
            //    this.departList.forEach(it=>{
            //
            //        arr.push(it.depart);
            //    });
            //    return arr;
            // }
        },
        methods: {
            getToken() {
                ajax.getToken({
                    _: new Date().getTime()
                }).then(response => {
                    if (!response.success === true) {
                        return;
                    }
                    let res = response.data;
                    const keyPair = RSA.getKeyPair(
                        res.exponent, '', res.modulus
                    );
                    this.keyPair = keyPair;
                }).catch(() => {
                });
            },
            loginAction() {
                if (this.loginRule.join() === '1,1,1') {
                    this.loginStatus = true;
                    this.loginRuleTextStatus = false;
                    this.loginFetch();
                } else {
                    this.loginInputStatus = [0, 0, 0];
                    this.loginStatus = false;
                    this.loginRuleTextStatus = true;
                }
            },
            loginFetch() {
                ajax.login({
                    // clientMerchantId: this.departName,
                    login_name: this.account,
                    login_pwd: RSA.encryptedString(this.keyPair, this.password)
                }).then(response => {
                    if (!response.success === true) {
                        Dialog.confirm({
                            title: response.msg || '登录失败',
                            message: ''
                        }).then(() => {
                        }).catch(() => {
                        });
                        localStorage.setItem('departName_current', '');
                        localStorage.setItem('userName_current', '');
                        return;
                    }
                    localStorage.setItem('departName_current', this.depart);
                    localStorage.setItem('userName_current', this.account);
                    localStorage.setItem('accountList', JSON.stringify(this.accountListComputed()));
                    localStorage.setItem('departList', JSON.stringify(this.departListComputed()));
                    setTimeout(() => {
                        this.$router.push({
                            name: 'home'
                        });
                    }, 800);
                }).catch(() => {
                    localStorage.setItem('departName_current', '');
                    localStorage.setItem('userName_current', '');
                    Toast('未成功提交登陆');
                });
            },
            accountSelectHandle() {
                this.accountShow = !this.accountShow;
                if (this.accountList) {

                }
            },
            accountChangeHandle(item) {
                this.account = item.account;
                this.accountShow = false;
            },
            passwordShowHandle() {
                this.passwordShow = !this.passwordShow;
            },
            deleteAccountAction(item, key) {
                Dialog.confirm({
                    title: '确认删除登录账号',
                    message: item.account
                }).then(() => {
                    if (key === 0) {
                        localStorage.setItem('userName_current', '');
                    }
                    this.accountList.splice(this.accountList.findIndex(v => v === item), 1);
                    localStorage.setItem('accountList', this.accountList + '');

                    if (item === this.account) {
                        this.account = '';
                    }

                    if (this.accountList.length === 0) {
                        this.accountShow = false;
                    }
                }).catch(() => {
                    this.accountShow = true;
                });
            },
            departPickerHandle() {
                this.departPickerShow = !this.departPickerShow;
                if (this.departPickerShow) {
                    this.loginInputStatus[0] = 0;
                    this.loginInputStatus[2] = 0;
                }
            },
            onChange(picker, value, index) {
                Toast(`当前值：${value}, 当前索引：${index}`);
            },
            accountListComputed() {
                let userListOld;
                if (localStorage.getItem('accountList')) {
                    userListOld = eval(localStorage.getItem('accountList')) || [];
                } else {
                    userListOld = [];
                }
                let userList;
                if (localStorage.getItem('userName_current')) {
                    if (userListOld) {
                        userList = [{account: localStorage.getItem('userName_current') || this.accountName}].concat(userListOld.filter((it) => {
                            if (it.account !== localStorage.getItem('userName_current') || this.accountName) {
                                return it;
                            }
                        }));
                    } else {
                        userList = [{account: localStorage.getItem('userName_current') || this.accountName}];
                    }
                } else {
                    userList = userListOld;
                }
                return userList;
            },
            departListComputed() {
                let departListOld;
                if (localStorage.getItem('departList')) {
                    departListOld = eval(localStorage.getItem('departList')) || [];
                } else {
                    departListOld = [];
                }
                let departList;
                if (localStorage.getItem('departName_current')) {
                    if (departListOld) {
                        departList = [{depart: localStorage.getItem('departName_current') || this.departName}].concat(departListOld.filter((it) => {
                            if (it.depart !== localStorage.getItem('departName_current') || this.departName) {
                                return it;
                            }
                        }));
                    } else {
                        departList = [{depart: localStorage.getItem('departName_current') || this.departName}]
                    }
                } else {
                    departList = departListOld;
                }
                return departList;
            },
            onConfirm(value, index) {
                this.$toast(value, index);
            },
            onCancel() {
                this.$toast('取消');
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .login {
        &-inner {
            padding: 14px 34px;
        }
        &-wrapper {
            position: fixed;
            top: 0;
            background-image: url("../../images/login_bg@2x.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-attachment: fixed;
            z-index: -100;
            .item {
                position: relative;
                padding: 16px 0 8px;
                border-bottom: 1px solid @whiteFilter;
                &.bB1 {
                    border-bottom-color: @white;
                }
                &-label {
                    font-size: 12px;
                    line-height: 1.75;
                    color: @white;
                    margin-bottom: 4px;
                }
                &-input {
                    width: 100%;
                    border: none;
                    background-color: transparent;
                    color: @white;
                    line-height: 1.75;
                    outline: none;
                    -webkit-appearance: none;
                    &::-webkit-input-placeholder {
                        color: @whiteFilter;
                    }
                }
                &-notice {
                    position: absolute;
                    bottom: 2px;
                    right: 0;
                    color: @red;
                    font-size: @font-small;
                }
                .icon-eye {
                    position: absolute;
                    right: 3px;
                    bottom: 8px;
                    width: 26px;
                    height: 26px;
                    &_open {
                        right: 4px;
                        background-image: url("../../images/icon_eye_open@2x.png");
                    }
                }
            }
        }
        &-title {
            color: #fff;
            font-weight: 400;
            font-size: @font-largest;
        }
    }

    .sculpture-item {
        text-align: center;
        &-img {
            display: inline-block;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: none;
            background-image: url("../../images/icon_large_headSculpture@2x.png");
            background-repeat: no-repeat;
            background-position: top center;
            background-size: 100% auto;
        }
        &-name {
            display: inline-block;
            font-size: @font-smaller;
            color: @white;
            padding-left: 4px;
            margin-left: 3px;
            cursor: pointer;
            .icon-select-left {
                width: 18px;
                height: 18px;
                vertical-align: middle;
            }
        }
    }

    .accountHistoryList {
        .accountHistoryItem {
            position: relative;
            font-size: @font-largest;
            color: @white;
            line-height: 1.5;
            padding: 14px 0;
            box-sizing: border-box;
            border-bottom: 1px solid @whiteFilter;
            .icon-delete {
                position: absolute;
                top: 22px;
                right: 8px;
            }
        }
    }

    .icon-select {
        position: absolute;
        right: 2px;
        bottom: 10px;
        display: inline-block;
        width: 30px;
        height: 30px;
        background-image: url("../../images/icon_down@2x.png");
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 100% auto;
        &_toggle {
            cursor: pointer;
            transform: rotate(180deg);
            bottom: 18px;
        }
    }

    .icon-select-left {
        display: inline-block;
        width: 22px;
        height: 22px;
        background-image: url("../../images/icon_down@2x.png");
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 100% auto;
        transform: rotate(270deg);
    }

    .icon-delete {
        display: inline-block;
        width: 22px;
        height: 22px;
        background-image: url("../../images/icon_del@2x.png");
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 100% auto;
    }

    .icon-eye {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("../../images/icon_eye_close@2x.png");
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 100% auto;
    }

    .van-toast > div {
        color: @white;
    }

    /*.depart-picker-container {*/
    /*position: absolute;*/
    /*bottom: 0;*/
    /*let: 0;*/
    /*right: 0;*/
    /*width: 100%;*/
    /*}*/
</style>
