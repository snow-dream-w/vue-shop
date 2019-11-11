import Vue from 'vue'
import Vuex from 'vuex'
import public_attribute from './store/public_attribute'
import car_manager from './store/car_manager'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    public_attribute,
    car_manager
  }
})
// /**数据 */
// state,
// /**计算属性 */
// getters,
// /**更改属性函数 */
// mutations,
// actions