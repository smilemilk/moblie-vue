<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        created() {
            this.userStatus();
        },
        methods: {
            userStatus() {

                if (this.$route) {
                    if (this.$route.name !== 'login') {
                        let _this = this;
                        setInterval(function () {
                            _this.userFetch();
                        }, 60000);
                    } else {
                    }
                }
            },
            userFetch() {
                this.$store.dispatch('userInfo', this).then(() => {
                    if (this.$store.state.userFetching === true) {
                        const data = this.$store.state.userInfo;

                        if (data !== null && data !== '' && data !== {} && data.data !== {}) {
                            if (data.data && data.data.timeout) {
                                // 超时
                                if (localStorage.getItem('userName_current')) {
                                    localStorage.setItem('userName_current', '');
                                }
                                if (localStorage.getItem('departName_current')) {
                                    localStorage.setItem('departName_current', '');
                                }

                                this.$router.push({
                                    name: 'login'
                                });
                            } else {
                            }
                        } else {
                            // 没有data
                            if (localStorage.getItem('userName_current')) {
                                localStorage.setItem('userName_current', '');
                            }
                            if (localStorage.getItem('departName_current')) {
                                localStorage.setItem('departName_current', '');
                            }

                            this.$router.push({
                                name: 'login'
                            });
                        }
                    } else {
                        //接口不通
                        if (localStorage.getItem('userName_current')) {
                            localStorage.setItem('userName_current', '');
                        }
                        if (localStorage.getItem('departName_current')) {
                            localStorage.setItem('departName_current', '');
                        }

                        this.$router.push({
                            name: 'login'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    // if (localStorage.getItem('userName_current')) {
                    //     localStorage.setItem('userName_current', '');
                    // }
                    // if (localStorage.getItem('departName_current')) {
                    //     localStorage.setItem('departName_current', '');
                    // }
                    //
                    // this.$router.push({
                    //     name: 'login'
                    // });
                });
            },
        }
    }
</script>

<style>

</style>
