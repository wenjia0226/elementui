import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import Welcome from '@/components/welcome'
import School from '@/components/school'
import Class from '@/components/class'
import Student from '@/components/student'
import Record from '@/components/record'
import Right from '@/components/power/right'
import Role from '@/components/power/role'
import Account from '@/components/power/account'
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}
const router = new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login',component: Login},
    {
      path: '/home', 
      component: Home,
      redirect: '/schoolsetting',
      children: [
        {path: '/welcome', component: Welcome},
        {path: '/schoolsetting', component: School},
        {path: '/classsetting', component: Class},
        {path: '/studentList', component: Student},
        {path: '/testrecord', component: Record},
        {path: '/permission', component: Right},
        {path: '/role', component: Role},
        {path: '/account', component: Account}
      ]
    }
  ]
})
//挂载路由守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径 from 代表从哪个路径而来 next表示放行
//   if(to.path ==='/login')  return next();
//   const tokenStr = sessionStorage.getItem('token');
//   if(!tokenStr) return next('/login');
//   next();  // 存在token 直接放行
// })
export default router;
