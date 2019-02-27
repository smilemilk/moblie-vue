<template>
    <div class="error-wrapper container-wrapper plr16">
        <div class="prompt-item prompt_small">
            <i class="prompt-img networkError"></i>
            <div class="prompt-label span_light">无网络链接</div>
        </div>

        <button
                class="
                         btn
                         btn-block
                         btn-primary
                         "
                @click="backAction()"
        >重新连接
        </button>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {
            backAction() {
                setTimeout(() => {
                    this.$router.push({
                        name: 'login',
                        query: ''
                    });
                }, 800);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";
.prompt{
    &_small {
        padding-top: 14vh;
    }
}

</style>

