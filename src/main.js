import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css';

//导入全局组件
import PersonAvatar from '@/components/PersonAvatar.vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false;
Vue.use(ElementUI);

//图片预览组件 https://www.npmjs.com/package/vue2-preview
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

//挂载地址,仅测试用，打包前设为空
Vue.prototype.target_IP = "http://localhost:3000"

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