const state = {
    login_status: true,
    goods_type: ''
}
const getters = {
    login_status: state => {
        return state.login_status
    },
    goods_type: state => {
        return state.goods_type
    }
}
const mutations = {
    change_login_status: (state, status) => (state.login_status = status),
    change_goods_type: (state, status) => (state.goods_type = status)
}
const actions = {
    changeAnsyc_login_status(context,status) {
        context.commit('change_login_status',status)
    },
    changeAnsyc_goods_type(context,status) {
        context.commit('change_goods_type',status)
    }
}

export default {
    state,getters,mutations,actions
}