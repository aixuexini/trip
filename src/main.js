import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import MintUI from 'mint-ui'

//导入样式文件
import 'mint-ui/lib/style.min.css'
//将mint-ui注册为插件
Vue.use(MintUI)
//配置基础路径
axios.defaults.baseURL = 'http://127.0.0.1:3030/'
Vue.prototype.axios=axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
