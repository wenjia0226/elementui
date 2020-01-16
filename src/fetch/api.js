import axios from 'axios'

export function fetch(url, param) {
    return new Promise((reslove, reject) => {
        axios.post(url, param).
        then( response => { reslove(response.data)})
        .catch((error) => {console.log(error); reject(error)})
    })
}
var token = window.sessionStorage.getItem('token');
export default {
    //获取我的后台数据
    mineBaseMsgApi() {
        let param2 = new URLSearchParams();
        
        param2.append('token',token);
        return fetch('/api/schoolList', param2)
    },
    editSchool(id) {
        console.log(id)
        let param = new URLSearchParams();
        param.append('id', id);
        param.append('token',token)

    }
}