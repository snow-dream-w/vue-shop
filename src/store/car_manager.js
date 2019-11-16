const state = {
    carInfo: []
}
const getters = {
    get_goods_total: state => {
        let total = 0
        state.carInfo.forEach(element => {
            if(element.goodsId.discount.status === 1){
                total += element.num * element.goodsId.price * element.goodsId.discount.percent
            } else {
                total += element.num * element.goodsId.price
            }
        });
        return total
    },
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