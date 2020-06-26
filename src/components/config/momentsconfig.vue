<template>
  <div>
    <!-- 面包屑导航区域 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>配置管理</el-breadcrumb-item>
         <el-breadcrumb-item>爱眼答题配置</el-breadcrumb-item>
     </el-breadcrumb>
     <el-card>
       <el-col :span="6">
              <el-button type="primary" @click="editDati">修改答题</el-button>
       </el-col>
     </el-card>
     <!-- 修改用户对话框 -->
     <el-dialog title="修改教师信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
         <el-form :model="editTeacherForm" :rules="editTeacherRules" ref="editTeacherRef" label-width="100px">
             <el-form-item label="姓名" prop="name">
                 <el-input v-model="editTeacherForm.name"></el-input>
             </el-form-item>
             <el-form-item label="所属学校班级" prop='tea_cat'>
                 <el-cascader :options="options" v-model="editTeacherForm.tea_cat" :props="cateProps" @change="handleEditChange" clearable></el-cascader>
             </el-form-item>
            <!-- <el-form-item label="学校名称" prop="schoolName">
                 <el-input v-model="editTeacherForm.schoolName"></el-input>
             </el-form-item>
             <el-form-item label="班级" prop="className">
                 <el-input v-model="editTeacherForm.className"></el-input>
             </el-form-item> -->
             <el-form-item label="电话" prop="phone">
                 <el-input v-model="editTeacherForm.phone"></el-input>
             </el-form-item>
             <el-form-item label="密码" prop="password">
                 <el-input v-model="editTeacherForm.password"></el-input>
             </el-form-item>
         </el-form>
         <span slot="footer" class="dialog-footer">
             <el-button @click="editDialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="editTeacherInfo">确 定</el-button>
         </span>
     </el-dialog>
 </div>
</template>

<script>
  export default{
    data() {
      return {
        editDialogVisible: false
      }
    },
    methods: {
      editDati() {
        this.editDialogVisible = true;
        let param = new URLSearchParams();
        param.append('name', this.addTeacherForm.name);
        param.append('token', this.token);
        axios({
            method: 'post',
            url: '/lightspace/editAnswerConfig',
            data: param
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
</style>
