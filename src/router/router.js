import Vue from 'vue'
import Router from 'vue-router'

//公共组件
const LoginRegister = () => import('@/components/LoginRegister.vue')
//一级路由
const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')
const NotFound = () => import('@/views/NotFound.vue')
const Cart = () => import('@/views/Cart/Cart.vue')
const PersonMain = () => import('@/views/Person/PersonMain.vue')
const GoodsDetail = () => import('@/views/Goods/GoodsDetail.vue')
const ChooseAddress = () => import('@/views/Order/ChooseAddress.vue')
const OrderDetail = () => import('@/views/Order/OrderDetail.vue')
const PayOrder = () => import('@/views/Order/PayOrder.vue')

//二级路由
const Order = () => import('@/views/Person/Order.vue')
const Edit = () => import('@/views/Person/Edit.vue')
const Address = () => import('@/views/Person/Address.vue')
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   redirect: '/person/address'
    // },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/person',
      name: 'person',
      component: PersonMain,
      redirect:'/person/order',
      //二级路由
      children :[
        {
          path: 'order',
          name: 'order',
          component: Order
        },
        {
          path: 'edit',
          name: 'edit',
          component: Edit
        },
        {
          path: 'address',
          name: 'address',
          component: Address
        }
      ]
    },
    {
      path: '/login_register/:id',
      namr: 'login_register',
      component: LoginRegister
    },
    {
      path: '/goods/:id',
      name: 'goods',
      component: GoodsDetail
    },
    {
      path: '/choose_address',
      name: 'choose_address',
      component: ChooseAddress
    },
    {
      path: '/order_detail/:id',
      name: 'order_detail',
      component: OrderDetail
    },
    {
      path: '/pay_order',
      name: 'pay_order',
      component: PayOrder
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
