const state = {
    carInfo: []
}
const getters = {
    get_select_goods: state => {
        return state.carInfo
    }
}
const mutations = {
    change_select_goods: (state, carInfo) => (state.carInfo = carInfo)
}
const actions = {
    changeAnsyc_select_goods(context,carInfo) {
        context.commit('change_select_goods',carInfo)
    }
}

export default {
    state,getters,mutations,actions
}