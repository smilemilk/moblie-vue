<template>
    <div class="set-wrapper container-wrapper">
        <div class="set-sculpture">

        </div>
        <div class="set-form cell-group">
            <div class="cell">
                <div class="cell-inner cell-inner-lr">
                    <label>门店</label>
                    <div class="cell-right">富阳喜脉健康</div>
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
            <div class="cell">
                <div class="cell-inner cell-inner-lr">
                    <label>修改密码</label>
                    <div class="cell-right">富阳喜脉健康</div>
                </div>
            </div>
        </div>

        <button
                class="
                         btn
                         btn-block
                         btn-default
                         btn-radius-none
                         btn-large
                         mt16"
               >退出登录
        </button>
    </div>
</template>

<script>
    import storeData from './store/index';

    export default {
        data() {
            return storeData.call(this);
        },
        created() {

        },
        watch: {},
        methods: {}
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .set {
        &-sculpture {
            background-color: @main-theme-color;
            height: 136px;
        }

    }

</style>
