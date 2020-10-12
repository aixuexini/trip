import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Header from '../components/Header.vue'
import city from '../components/city.vue'
import Login from '../components/Login.vue'
import Search from '../components/search.vue'
import Reg from '../components/reg.vue'
import Forget from '../components/forget.vue'
import updatePwd from '../components/updatePwd.vue'
import personInfo from '../components/personInfo.vue'
import personal from '../components/personal.vue'
import List from '../components/List.vue'
import detail from '../components/detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/reg',
    name: 'Reg',
    component: Reg
  },
  {
    path:'/updatePwd',
    name:"updateUpwd",
    component:updatePwd
  },
  {
    path:"/personInfo",
    name:"personInfo",
    component:personInfo
  },
  {
    path:"/personal",
    name:"personal",
    component:personal
  },
  {
    path:"/header",
    name:"Header",
    component:Header
  },
  {
    path:"/forget",
    name:"Forget",
    component:Forget
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/city',
    name: 'city',
    component: city
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path:"/detail",
    name:"detail",
    component:detail
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
