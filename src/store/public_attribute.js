const state = {
    login_status: true
}
const getters = {
    login_status: state => {
        return state.login_status
    }
}
const mutations = {
    change_login_status: (state, status) => (state.login_status = status)
}
const actions = {
    changeAnsyc_login_status(context,status) {
        context.commit('change_login_status',status)
    }
}

export default {
    state,getters,mutations,actions
}