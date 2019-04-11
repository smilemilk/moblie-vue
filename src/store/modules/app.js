import ajax from '@/api/login';

const app = {
    state: {
        userFetching: false, // getUser 接口查询状态
        userInfo: {}, // getUser 接口返回的数据
        allowBack: undefined
    },
    mutations: {

    },
    actions: {
        async userInfo() {
            await ajax.getUser({}).then((response) => {
                this.state.userFetching = true;
                this.state.userInfo = response;
            }).catch(() => {
                this.state.userFetching = false;
            });
        }
    }
};

export default app;
