// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import axios from 'axios'
Vue.use(ElementUI);
// //挂载原型属性
// Vue.prototype.$http = axios
// //配置请求的根路径
// axios.defaults.baseURL ="http://192.168.2.201:8080/lightspace/";


//通过axios请求拦截器添加token，保证拥有获取数据的权限
// axios.interceptors.request.use((config) => {
//   //为请求头对象，添加token
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
