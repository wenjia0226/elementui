<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>生成报表</el-breadcrumb-item>
        <el-breadcrumb-item>学校报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="10">
        <el-col :span="2">
             <div class="schoolSet">学校选择：</div>
        </el-col>
        <el-col :span="4" v-if="this.identity == 1">
         <el-select v-model="school" placeholder="请选择"  @change="handleChange">
             <el-option
               v-for="item in schoolList"
               :key="item.value"
               :label="item.value"
               :value="item.id">
             </el-option>
           </el-select>
        </el-col>
          <el-col :span="4" v-if="this.identity == 2">
           <el-select v-model="school" placeholder="请选择">
               <el-option
                 v-for="item in schoolList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
          </el-col>
          <el-col :span="4">
             <el-button type="primary" @click="getCode">下载学校报告</el-button>
          </el-col>
        </el-row>
     </el-card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    created() {
      this.token = window.sessionStorage.getItem('token');
      let user = window.sessionStorage.getItem('token');
      this.identity = user.split('-') [1];
      this.fondId = user.split('-')[2];
      this.getSchoolList();


    },
    data() {
      return {
        token: '',
        schoolId: '',
        schoolList: [],
        cateProps: {
            label: 'name', //看到的是哪个属性
            value: 'id', // 选中的是谁的值
            children: 'children' //哪个属性实现父子节点嵌套
        },
        identity: '',
        fondId: '',
        school: ''
      }
    },
    methods: {
      // 获取学校列表
      async getSchoolList() {
          let param = new URLSearchParams();
           param.append('token', this.token);
           axios({
               method: 'post',
               url: '/lightspace/schoolList',
               data: param
           }).then(this.handleGetSchoolSucc.bind(this))
             .catch(this.handleGetSchoolErr.bind(this))
      },
      handleGetSchoolSucc(res) {
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
        } else if(res.data.status == 200) {
            this.schoolList = res.data.data;
            if(this.identity == 2) {
              this.schoolId = this.fondId;
              let schoolInfo = this.schoolList.filter((item) => {
                if(item.id == this.fondId) return item;
              })
              schoolInfo[0].disabled = true;
              this.schoolList = [];
              this.schoolList = schoolInfo;
              this.school = schoolInfo[0].name;
           
            }
        }
      },
      handleGetSchoolErr(err) {
          console.log(err)
      },
     handleChange(item) {
       this.schoolId = item;
     },
     getCode() {
      this.loading = this.$loading({
         lock: true,
         text: '生成中,请耐心等候...',
         spinner: 'el-icon-loading',
         background: 'rgba(0, 0, 0, 0.7)'
       });
       let param= new FormData();
       param.append('token', this.token);
       param.append('id',this.schoolId);
       param.append('type', 'school');
       axios({
         method: 'post',
         url: '/lightspace/downReport',
         data: param
       }).then(this.handleGetCodeSucc.bind(this)).catch(this.handleGetCodeErr.bind(this))
    },
    handleGetCodeSucc(res) {
      // console.log(res)
      if(res.data.status == 200) {
        const downloadElement = document.createElement('a'); // 创建a标签
        downloadElement.href = 'https://www.guangliangkongjian.com/download/报表文件.docx';
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        this.loading.close();
        this.school = '';
      }
    },
    handleGetCodeErr(err) {
      console.log(err)
    }
   }
  }
</script>

<style>
  .el-cascader {
    width: 100%;
  }
</style>
