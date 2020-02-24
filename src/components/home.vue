<template>
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/image/logo2.png" alt="" style="width:200px;height: auto;overflow:hidden">
                <span>光量空间后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体区 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                 <!-- 菜单区域 -->
                <el-menu
                background-color="#333744"
                text-color="#fff"
                active-text-color="#409eff"
                :default-active = 'activePath'
                router
                :unique-opened= true>
                <!-- 一级菜单 -->
                <el-submenu :index="'/' +item.id"  v-for="item in menuList" :key="item.id" >
                    <!-- 一级菜单模板 -->
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.authName}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{subItem.authName}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>

                </el-menu>
            </el-aside>
            <!-- 右侧主体区 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import axios from 'axios'
    export default {
        data() {
            return {
                menuList: [] ,//左侧菜单的获取,
                activePath: '', //被激活的链接地址
                token: ''
            }
        },
        created() {
            this.getMenuList();
            this.activePath = window.sessionStorage.getItem('activePath')

        },
        methods: {
            logout () {
                window.sessionStorage.clear();
                this.$router.push('/login')
            },
            getMenuList() {
                //获取所都菜单
                 this.token = window.sessionStorage.getItem('token');
                if(this.token) {
                    let listparam = new URLSearchParams();
                    listparam.append('token', this.token);
                    axios({
                        method: 'post',
                        url: '/lightspace/menuList',
                        data: listparam
                    }).then(this.handleGetMenuListSucc.bind(this)).catch(this.handleGetMenuListErr.bind(this))
               }
            },
            handleGetMenuListSucc (res){ 
              if(res.data.status === 10204) {
                  this.$message.error(res.data.msg);
                  this.$router.push('/lightspace/login');
              } else if(res.data.status == 200) {
                 this.menuList = res.data.data;
              }

            },
            handleGetMenuListErr(err) {
                console.log(err)

            },
            //保存链接的激活状态
            saveNavState(activePath) {
                window.sessionStorage.setItem('activePath', activePath)
                this.activePath = activePath;
            }
        }
    }
</script>
<style lang="less" scoped>
.home-container {
    height: 100%;
}
.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    >div {
        display: flex;
        align-items: center;
        >span {
            margin-left: 15px;
        }
    }

}
.el-aside {
    background-color: #333744;
    .el-menu {
        border-right: none;
    }
}
.el-main {
    background-color: #eaedf1;
}
</style>
