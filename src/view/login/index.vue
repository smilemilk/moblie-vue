<template>
    <div class="login-wrapper container-wrapper">
        <div class="login-inner">
            <h3 class="login-title">欢迎登录!</h3>

            <div class="item">
                <div class="item-label">机构编码</div>
                <input class="item-input" placeholder="请输入机构编码"/>
            </div>

            <div class="item">
                <div class="item-label">账户</div>
                <input class="item-input" placeholder="请输入机构编码"/>
            </div>

            <div class="item">
                <div class="item-label">密码</div>
                <input class="item-input" placeholder="请输入机构编码"/>
            </div>

            <button class="btn btn-block btn-primary btn-disabled mt14">登录</button>
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
        GoodsActionMiniBtn
    } from 'vant';

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
            [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
        },

        data() {
            return {

            };
        },

        methods: {
            sorry() {
                Toast('暂无后续逻辑~');
                this.$router.push('incomeList');
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
            position:fixed;
            top:0;
            background-image: url("../../images/login_bg@2x.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-attachment: fixed;
            z-index:-100;
            .item {
                padding: 16px 0 8px;
                border-bottom: 1px solid @whiteFilter;
                &-label {
                    font-size: 12px;
                    line-height: 1.75;
                    color: @whiteFilter;;
                    margin-bottom: 4px;
                }
                &-input {
                    border: none;
                    background-color: transparent;
                    color: @white;
                    lin-height: 1.75;
                    &::-webkit-input-placeholder {
                        color: @whiteFilter;
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
</style>
