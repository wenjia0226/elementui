import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
//创建vuex实例
const store = new Vuex.Store({
    state: {
       schoolList: [1,2,3]
    },
    mutations:{
        changeSchoolList(state, schoolList) {
            state.schoolList = schoolList
            console.log(state.schoolList, 'state')
        }
    }
})
export default store