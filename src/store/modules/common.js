import ajax from '@/api/user';

const common = {
    state: {
        managerFetching: false, // 权限接口查询状态
        managerStatus: undefined
    },
    mutations: {

    },
    actions: {
        async managerInfo() {
            await ajax.merchantId({}).then((response) => {
                this.state.managerFetching = true;
                this.state.managerStatus = response;
            }).catch(() => {
                this.state.managerFetching = false;
            });
        }
    }
};

export default common;
