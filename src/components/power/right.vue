<template>
    <div>
          <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限分配</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
             <el-row :gutter="20">
                 <el-col :span="6">
                     <el-input placeholder="输入角色名称"  clearable>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                     </el-input>
                 </el-col>
                 <el-col :span="6">
                        <el-button type="primary" @click="addRoleDialogVisible = true">添加角色</el-button>
                 </el-col>
             </el-row>
            <!-- 学校列表 -->
            <el-table  border  stripe style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学校名称" prop="name"></el-table-column>
                <el-table-column label="学校地址" prop="address"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="middle" icon="el-icon-edit"></el-button>
                        <el-button type="danger"  size="middle" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
   data() {
       return {
           addRoleDialogVisible: false
       }
   } 
}
</script>
<style lang="less" scoped>

</style>