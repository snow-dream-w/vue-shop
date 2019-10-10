import Vue from 'vue'
import Vuex from 'vuex'
import public_attribute from './store/public_attribute'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    public_attribute
  }
})
// /**数据 */
// state,
// /**计算属性 */
// getters,
// /**更改属性函数 */
// mutations,
// actions