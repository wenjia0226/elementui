import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import Welcome from '@/components/welcome'
import School from '@/components/base/school'
import Class from '@/components/base/class'
import Student from '@/components/base/student'
import Teacher from '@/components/base/teacher'
import Report from '@/components/base/report'
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
import screeningtemp from '@/components/template/screen.vue'
import wordtemp from '@/components/template/wordtemp.vue'
import studentCode from '@/components/code/studentCode.vue'
import classCode from '@/components/code/classCode.vue'
import schoolCode from '@/components/code/schoolCode.vue'
import Record from'@/components/record/record'
import Screeningsetting from '@/components/record/screeningsetting'
import screeningwearsetting from '@/components/record/screeningwearsetting'
import productsetting from '@/components/product/productsetting'
import personRecord  from '@/components/personRecord/personRecord'
import personRecordWear from '@/components/personRecord/personRecordWear'
import specificationssetting from '@/components/specification/specificationssetting'
import schoolreport from '@/components/report/school'
import classreport from '@/components/report/class'
import gradereport from '@/components/report/grade'
import rotationpic  from '@/components/rotationpic/rotationpic'
import neworder from '@/components/order/neworder'
import successorder from '@/components/order/successorder'
import waitorder from '@/components/order/waitorder'
import finishorder from '@/components/order/finishorder'

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
  {path: '/personRecord/:id', component: personRecord},
  {path: '/personRecordWear/:id', component: personRecordWear},
    {
      path: '/home',
      component: Home,
      redirect: '/schoolsetting',
      children: [
        {path: '/welcome', component: Welcome},
        {path: '/schoolsetting', component: School},
        {path: '/classsetting', component: Class},
        {path: '/studentList', component: Student},
        {path: '/teachersetting', component: Teacher},
        {path: '/report', component: Report},
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
        {path: '/screeningtemp', component: screeningtemp},
        {path: '/wordtemp', component: wordtemp},
        {path: '/schoolCode', component: schoolCode},
        {path: '/classCode', component: classCode},
        {path: '/studentcode', component: studentCode},
        {path: '/recordsetting', component: Record},
        {path: '/Screeningsetting', component: Screeningsetting},
        {path: '/screeningwearsetting', component: screeningwearsetting},
        {path: '/productsetting', component: productsetting},
        {path: '/specificationssetting', component: specificationssetting},
        {path: '/schoolreport', component: schoolreport},
        {path: '/classreport', component: classreport},
        {path: '/gradereport', component: gradereport},
        {path: '/rotationpic', component: rotationpic},
        {path: '/neworder', component: neworder},
        {path: '/successorder', component: successorder},
        {path: '/waitorder', component: waitorder},
        {path: '/finishorder', component: finishorder}
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
