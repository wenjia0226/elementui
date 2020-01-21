<template>
    <div>
          <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>账号管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="输入账号"  clearable>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addAcounctDialogVisible = true">新增账号</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
    export default {
     data() {
         return {
             addAcounctDialogVisible: false
         }
     }
}
</script>
<style lang="less" scoped>

</style>