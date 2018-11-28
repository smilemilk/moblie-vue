<template>
    <div>
        <div class="collapse-item collapse-item-fixed">
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
                    <van-col span="6">
                        <div class="extra-box flex-content flex-content-align flex-content-justify">
                            kkk
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="extra-box flex-content flex-content-align flex-content-justify">
                            kkk
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="wallet-list">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
            >
                <div class="cell-item cell-item-gray">
                    <p class="cell-label">哈哈哈哈哈哈哈哈哈</p>
                    <time class="cell-label-light">哈哈哈哈</time>
                </div>
                <van-cell v-for="item in list" :key="item.id">
                    <section class="cell-item-normal">
                        <div class="flex-content">
                            <strong class="flex-left cell-name">{{item.title}}</strong>
                            <code class="flex-right danger font-larger font-weight_800">+{{item.title}}</code>
                        </div>
                        <p class="cell-label">哈哈哈哈哈哈哈哈哈</p>
                        <time class="cell-label-light">哈哈哈哈</time>
                    </section>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<script>
    import {List, Row, Col, Icon, Cell, CellGroup} from 'vant';

    export default {
        components: {
            [List.name]: List,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup
        },
        data() {
            return {
                loading: false,
                finished: false,
                list: [
                    'kkk', 'lll'
                ],
                extraStatus: true
            };
        },
        methods: {
            onLoad() {
                setTimeout(() => {
                    this.list = [{'title': 'llll', 'key': this.list.length}]
                    for (let i = 0; i < 10; i++) {
                        this.list.push({'title': this.list.length + 1, 'key': this.list.length + 1});
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 40) {
                        this.finished = true;
                    }
                }, 500);
            },
            extraAction() {
                console.log(this.extraStatus)
                this.extraStatus = !this.extraStatus;
            }
        }
    };
</script>

<style lang="less">

    .wallet-list {
        background-color: @white;
    }

    .extra-box {
        height: 60px;
    }
</style>
