<template>
    <div class="cashier-wrapper container-wrapper p16">
        <div class="card">
            <div class="cashier-account">收款金额：<strong>￥1000.00</strong></div>
            <div class="cashier-tip mt14"><i class="icon-redPacket"></i>温馨提示：使用微脉APP扫码支付可使用优惠券哦</div>
            <div class="cashier-code-container">
                <div ref="code" id="code"></div>
                <div class="mt10 font-s-l">收款成功以POS收银机实际到账为准</div>
            </div>
        </div>
        <div class="payType-box">
            <ul class="payType-box-container">
                <li class="payType-item">
                    <i class="icon-payKind icon-payKind_alipay"></i>
                    <div class="font-s-l">支付宝</div>
                </li>
                <li class="payType-item">
                    <i class="icon-payKind icon-payKind_wechat"></i>
                    <div class="font-s-l">微信</div>
                </li>
                <li class="payType-item">
                    <i class="icon-payKind icon-payKind_wm"></i>
                    <div class="font-s-l">微脉</div>
                </li>
            </ul>
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
    import storeData from './store/index';
    import QRCode from 'qrcodejs2';

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
            QRCode: QRCode
        },

        data() {
            return storeData.call(this);
        },
        created() {
            if (this.$route && this.$route.query) {
                this.codeUrl = this.$route.query;
            }
            this.$nextTick(function () {
                this.codeCanvas();
            });
        },
        methods: {
            codeCanvas() {
                let code = new QRCode('code', {
                    width: 235,  // 设置宽度
                    height: 235, // 设置高度
                    text: this.codeUrl.code || ''
                })
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .cashier {
        &-wrapper {
            .card {
                padding: 16px 0 18px;
            }
            .icon-redPacket {
                display: inline-block;
                width: 29px;
                height: 29px;
                vertical-align: middle;
                margin-right: 6px;
                background-image: url("../../images/icon_redPacket@2x.png");
                background-repeat: no-repeat;
                background-position: top center;
                background-size: 100% auto;
            }
            .payType-box {
                padding-top: 22px;
                text-align: center;
                &-container {
                    display: inline-block;
                }
                .payType-item {
                    display: inline-block;
                    margin-left: 10vw;
                    margin-right: 10vw;
                    .font-s-l {
                        margin-top: 2px;
                    }
                }
            }
        }
        &-account {
            color: @text-color;
            font-size: @font-large;
            line-height: 1.5;
            text-align: center;
            strong {
                font-size: @font-huge;
                color: @text-color-dark;
                font-weight: @font-weight_800;
            }
        }
        &-tip {
            width: 100%;
            background-color: @yellow;
            color: @redLight;
            font-size: @font-smaller;
            line-height: 1.5;
            padding: 7px 14px 7px 12px;
        }
        &-code-container {
            padding-left: 45px;
            padding-right: 45px;
            text-align: center;
            margin-top: 30px;
            img {
                display: inline-block;
                width: 100%;
            }
        }
    }
</style>
