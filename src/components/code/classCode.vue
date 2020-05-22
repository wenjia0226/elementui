<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>生成二维码</el-breadcrumb-item>
        <el-breadcrumb-item>生成班级二维码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="10">
        <el-col :span="3">
             <div class="schoolSet">学校班级选择：</div>
        </el-col>
          <el-col :span="4">
               <el-cascader  :options="options" v-model="stu_cat" :props="cateProps" @change="handleChange" width="100%"></el-cascader>
          </el-col>
          <el-col :span="4">
             <el-button type="primary" @click="getCode">下载二维码</el-button>
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
      this.getOPtions();
    },
    data() {
      return {
        token: '',
        state1: '',
        stu_cat: [],
        options: [],
        classId: '',
        schoolId: '',
        cateProps: {
        label: 'name', //看到的是哪个属性
        value: 'id', // 选中的是谁的值
        children: 'children' //哪个属性实现父子节点嵌套
        },
        loading: {}
      }
    },
    methods: {
      //获取级联选择器中的数据
      getOPtions() {
          let param = new URLSearchParams();
          param.append('token', this.token);
          axios({
              method: 'post',
              url: '/lightspace/cascade1',
              data: param
          }).then(this.handleGetOptionSucc.bind(this)).catch(this.handleGetOptionErr.bind(this))
      },
      handleGetOptionSucc (res) {
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
          } else if(res.data.status == 200) {
             this.options =  res.data.data;
          }
      },
      handleGetOptionErr(err) {
          console.log(err)
      },
      handleChange() {
        this.state1 = ''; //如果改变学校班级，学生姓名自动清空
         this.schoolId = this.stu_cat[0];
         this.classId = this.stu_cat[1];
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
       param.append('id',this.classId);
       param.append('type', 'class');
       axios({
         method: 'post',
         url: '/lightspace/download',
         data: param
       }).then(this.handleGetCodeSucc.bind(this)).catch(this.handleGetCodeErr.bind(this))
    },
    handleGetCodeSucc(res) {
      if(res.data.status == 200) {

        const downloadElement = document.createElement('a'); // 创建a标签
         downloadElement.href = res.data.data;
        document.body.appendChild(downloadElement);
        downloadElement.click();

        document.body.removeChild(downloadElement);
        this.loading.close();
        this.stu_cat = '';

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
