<template>
  <div>
    <el-col :span = "2">学校选择：</el-col>
    <el-col :span="4">
     <el-select v-model="value" placeholder="请选择"  @change="handleSchoolChange" clearable>
       <el-option v-for="item in schoolList"  :key="item.value"   :label="item.label"  :value="item.value" >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span = "2">班级选择：</el-col>
    <el-col :span="3">
     <el-select v-model="value" placeholder="请选择" clearable>
       <el-option v-for="item in classList" :key="item.value"   :label="item.label"  :value="item.value" >
        </el-option>
      </el-select>
    </el-col>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
     name: 'cascade',
     created() {
         this.token = window.sessionStorage.getItem('token');
         let user = window.sessionStorage.getItem('token');
         this.identity = user.split('-') [1];
         this.fondId = user.split('-')[2];
         this.getSchoolList();
     },
     data() {
       return {
         identity: '',
         schoolList: [],
         classList: [],
         token: '',
         value: ''
       }
     },
     methods:{
       handleSchoolChange(item) {
         console.log(item)
       },
       // 获取学校列表
        getSchoolList() {
          let param = new URLSearchParams();
           param.append('token', this.token);
           axios({
               method: 'post',
               url: '/lightspace/schoolList',
               data: param
           }).then(this.handleGetSchoolSucc.bind(this))
             .catch((err) => {console.log(err)})
        },
        handleGetSchoolSucc(res) {
          let that = this;
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
          } else if(res.data.status == 200) {
            let schoolList = res.data.data;
            let newArr = [];
            schoolList.forEach((item, index) => {
              newArr.push({
                label: item.name,
                value: item.id
              })
            })
              this.schoolList = newArr;
              let selectedOption = this.schoolList;

              if(this.identity == 2) {
                let filterOption = selectedOption.filter((item, index) => {
                   if(item.id == Number(that.fondId)) {
                    return item
                  }
                })
               this.schoolId = filterOption[0].id;
               this.school =  filterOption[0].id;
               this.schoolList = filterOption;
              }
          }
        }
     }
  }
</script>
<style>

</style>
