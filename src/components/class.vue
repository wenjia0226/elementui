<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>班级设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12"></el-col>
                <el-col :span="6">
                    <el-input placeholder="输入班级"  clearable>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6"></el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>

</style>