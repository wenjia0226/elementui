<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>生成报表</el-breadcrumb-item>
        <el-breadcrumb-item>年级报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="10">
        <el-col :span="2">
             <div class="schoolSet">学校选择：</div>
        </el-col>
          <el-col :span="4">
               <el-cascader  :options="schoolList" :props ="cateProps"   v-model="school" @change="handleChange">
               </el-cascader>
          </el-col>
          <el-col :span="2">
               <div class="schoolSet">年级选择：</div>
          </el-col>
          <el-col :span="4">
             <el-select v-model="value" placeholder="请选择"  @change="getChange">
                <el-option

                  v-for="item in options"
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
      this.getSchoolList();
    },
    data() {
      return {
        token: '',
        school: '',
        schoolId: '',
        schoolList: [],
        cateProps: {
            label: 'name', //看到的是哪个属性
            value: 'id', // 选中的是谁的值
            children: 'children' //哪个属性实现父子节点嵌套
        },
         options: [{
          value: 1,
          label: '一年级'
        }, {
          value: 2,
          label: '二年级'
        }, {
          value: 3,
          label: '三年级'
        }, {
          value: 4,
          label: '四年级'
        }, {
          value: 5,
          label: '五年级'
        },{
          value: 6,
          label: '六年级'
        }],
        value: '',
        gradeId: ''
      }
    },
    methods: {
      getChange(val) {
        this.gradeId = val;
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
             .catch(this.handleGetSchoolErr.bind(this))
      },
      handleGetSchoolSucc(res) {
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
        } else if(res.data.status == 200) {
            this.schoolList = res.data.data;
        }
      },
      handleGetSchoolErr(err) {
          console.log(err)
      },
     handleChange(item) {
        this.schoolId = item[0];
     },
     getCode() {
       if(this.school == '') {
          this.$message({
           message: '请先选择学校',
            type: 'warning'
         });
         return;
       }
       if(this.value == '') {
         this.$message({
           message: '请先选择年级',
             type: 'warning'
         });
         return;
       }
      this.loading = this.$loading({
         lock: true,
         text: '生成中,请耐心等候...',
         spinner: 'el-icon-loading',
         background: 'rgba(0, 0, 0, 0.7)'
       });
       let param= new FormData();
       param.append('token', this.token);
       param.append('id',this.schoolId);
       param.append('type', 'grade');
       param.append('grade', this.gradeId)
       axios({
         method: 'post',
         url: '/lightspace/downReport',
         data: param
       }).then(this.handleGetCodeSucc.bind(this)).catch(this.handleGetCodeErr.bind(this))
    },
    handleGetCodeSucc(res) {
      if(res.data.status == 200) {
        const downloadElement = document.createElement('a'); // 创建a标签
        downloadElement.href = 'https://www.guangliangkongjian.com/download/报表文件.docx';
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        this.loading.close();
        this.value = '';
        this.school = '';
      }else if(res.data.status == 10225){
        this.loading.close();
        this.$message({
          message: res.data.msg,
            type: 'warning'
        });
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
