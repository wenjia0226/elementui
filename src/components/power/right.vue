<template>
    <div>
          <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <!-- 权限列表 -->
            <el-table :data="rgihtList" border  stripe style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
               
            </el-table>
        </el-card>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getrightList();       
    },
   data() {
       return {
           addRoleDialogVisible: false,
           rgihtList: []
       }
   },
   methods: {
    getrightList() {
        let param = new URLSearchParams();
             param.append('token', this.token);
             axios({
                 method: 'post',
                 url: '/api/rightList',
                 data: param
             }).then(this.handleGetRightSucc.bind(this))
               .catch(this.handleGetRightErr.bind(this))
        },
    handleGetRightSucc(res) {
        if(res.status !== 200) return this.$message.error('获取权限列表失败');
        this.rgihtList = res.data.data;
        
    },
    handleGetRightErr(error) {
        console.log(error)
    }, 
   }
  
}
</script>
<style lang="less" scoped>

</style>