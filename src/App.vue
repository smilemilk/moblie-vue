<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
      created() {
          this.userStatus();
      },
      methods: {
          userStatus() {
              let _this = this;
              setInterval(function () {
                  _this.userFetch();
              }, 60000);
          },
          userFetch () {
              this.$store.dispatch('userInfo', this).then(() => {
                  if (this.$store.state.userFetching === true) {
                      const data = this.$store.state.userInfo;

                      if (data !== null && data !== '' && data !== {} && data.data !== {}) {
                          if (data.data && data.data.timeout) {

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
                      }
                  } else {
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
              }).catch(() => {

              });
          },
      }
  }
</script>

<style>

</style>
