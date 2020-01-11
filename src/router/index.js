import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login',component: Login},
    {path: '/home', component: Home}
  ]
})
//挂载路由守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径 from 代表从哪个路径而来 next表示放行
  if(to.path ==='/login')  return next();
  const tokenStr = sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();  // 存在token 直接放行
})
export default router;
