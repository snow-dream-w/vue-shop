import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css';

//导入全局组件
import PersonAvatar from '@/components/Person/PersonAvatar.vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

// 配置axios基础地址
axios.defaults.baseURL = "http://localhost:3000";
axios.interceptors.request.use((config) => {
  config.withCredentials = true
  return config
}, (error) => {
  return Promise.reject(error)
})
Vue.use(VueAxios, axios)

Vue.config.productionTip = false;
Vue.use(ElementUI);

//图片预览组件 https://www.npmjs.com/package/vue2-preview
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

import { Menu, MenuGroup, Icon, MenuItem, RadioGroup, Radio } from 'iview';
//iview组件
Vue.component('Menu', Menu);
Vue.component('MenuGroup', MenuGroup);
Vue.component('Icon', Icon);
Vue.component('MenuItem', MenuItem);
Vue.component('RadioGroup', RadioGroup);
Vue.component('Radio', Radio);

Vue.component('PersonAvatar', PersonAvatar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//测试分支
//测试分支2
//测试分支4