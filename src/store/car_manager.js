const state = {
    carInfo: [],
    busNum: 0
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
    get_goods_total: state => {
        return state.busNum
    }
}
const mutations = {
    change_select_goods: (state, carInfo) => (state.carInfo = carInfo),
    change_car_num: (state, num) => (state.busNum += num)
}
const actions = {
    changeAnsyc_select_goods(context,carInfo) {
        context.commit('change_select_goods',carInfo)
    },
    changeAnsyc_car_num(context,num) {
        context.commit('change_car_num',num)
    }
}

export default {
    state,getters,mutations,actions
}