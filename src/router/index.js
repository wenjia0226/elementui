import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import Welcome from '@/components/welcome'
import School from '@/components/base/school'
import Class from '@/components/base/class'
import Student from '@/components/base/student'
import Record from '@/components/base/record'
import Teacher from '@/components/base/teacher'
import Cooparation from '@/components/base/cooparation'
import Right from '@/components/power/right'
import Role from '@/components/power/role'
import Account from '@/components/power/account'
import parentsrtting from '@/components/power/parentsrtting'
import Seat from '@/components/seat/seatinquiry'
import Online from '@/components/seat/online'
import detailSeat from '@/components/seat/detailSeat'
import detailSeatTwo from '@/components/seat/detailSeatTwo'
import SchoolAnalysis  from '@/components/analysis/school.vue'
import ClassAnalysis  from '@/components/analysis/class.vue'
import PersonAnalysis  from '@/components/analysis/person.vue'
import schoolSurvey  from '@/components/survey/schoolSurvey'
import classSurvey  from '@/components/survey/classSurvey'
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}
const router = new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login',component: Login},
	{path: '/schoolSurvey/:id',component: schoolSurvey},
	{path: '/classSurvey/:id',component: classSurvey},
  {path: '/detailSeat/:id',component: detailSeat},
  {path: '/detailSeatTwo/',component: detailSeatTwo},
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
        {path: '/teachersetting', component: Teacher},
        {path: '/partnershipsetting', component: Cooparation},
        {path: '/permission', component: Right},
        {path: '/role', component: Role},
        {path: '/account', component: Account},
        {path: '/parentsrtting', component: parentsrtting},
        {path: '/seatinquiry', component: Seat, },
        {path: '/online', component: Online },
        // {path: '/detailSeat/:id',component: detailSeat},
        {path: '/schoolStatistics', component: SchoolAnalysis},
        {path: '/classStatistics', component: ClassAnalysis},
        {path: '/personal', component: PersonAnalysis},
        // meta:{keepAlive: true}
      ]
    },

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
