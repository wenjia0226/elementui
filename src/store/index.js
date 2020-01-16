import Vue from 'vue'
import Vuex from 'vuex'
import mine from './modules/mine'
Vue.use(Vuex);
//创建vuex实例
const store = new Vuex.Store({
    modules: {
        mine
    }
})
export default store