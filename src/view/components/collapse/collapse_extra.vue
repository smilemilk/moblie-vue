<template>
    <div    :extra-status-mounted="extraStatus"
            class="collapse-item collapse-item-fixed">
        <div class="flex-content flex-content-align collapse-top" :class="extraStatus ? 'collapse-top-active' : ''">
            全部<i @click="extraAction">关闭</i>
        </div>
        <div class="collapse-extend" v-if="extraStatus">
            <van-row type="flex">
                <van-col span="6">
                    <div class="extra-box flex-content flex-content-align flex-content-justify">
                        kkkk
                    </div>
                </van-col>
                <van-col span="6">
                    <div class="extra-box flex-content flex-content-align flex-content-justify">
                        kkkk
                    </div>
                </van-col>
                <van-col span="6">
                    <div class="extra-box flex-content flex-content-align flex-content-justify">
                        kkkk
                    </div>
                </van-col>
                <van-col span="6">
                    <div class="extra-box flex-content flex-content-align flex-content-justify">
                        kkk
                    </div>
                </van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="6">
                    <div class="extra-box flex-content flex-content-align flex-content-justify">
                        kkkk
                    </div>
                </van-col>
                <van-col span="6">
                    <div class="extra-box flex-content flex-content-align flex-content-justify">
                        kkkk
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import {Row, Col} from 'vant';

    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
        },
        props: {
            extraStatusChild: {
                type: Boolean
            }
        },
        data() {
            return {
                extraStatus: undefined
            }
        },
        methods: {
            extraAction() {
                this.extraStatus = this.extraStatusChild;
                this.extraStatus = !this.extraStatus;
                this.$emit('spot', this.extraStatus);
            }
        }
    }
</script>

<style lang="less" scoped>
    .extra-box {
        height: 60px;
    }
</style>
