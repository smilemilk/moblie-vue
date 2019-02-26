<template>
    <div class="error-wrapper container-wrapper">
        <p class="error-tip">无网络链接</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {}
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

    .error {
        &-wrapper {
            background-color: @background-gray-color;
            position: fixed;
            top: 0;
            left: 0;
        }
        &-tip {
            background-color: transparent;
            color: @text-color-light;
            text-align: center;
            font-size: @font-largest;
            margin-top: 19px;
        }
    }
</style>

