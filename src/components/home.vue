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
        <el-container v-if="!showModal">
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
					<i :class="iconObj[item.id]"></i>
				   <!-- <i :class="el-icon-my-export"></i> -->
					<span>{{item.authName}}</span>
					</template>
					<!-- 二级菜单 -->
					<el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
						<template slot="title">
							<!-- <i class="el-icon-menu"></i> -->
							<image src="/image/icon/base.png"></image>
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
    <el-container v-show="showModal &&(this.identity == 1  || this.identity == 2) " >
      <el-main class="mainBox">
         <el-row>
          <el-col :span="24" class="welcome">欢迎{{loginName}}登陆</el-col>
        </el-row>
        <el-row style="margin: 40rpx 0">
         <el-col :span="24" class="titleWrap">儿童青少年近视“人工干预|智能防控”管理系统</el-col>
        </el-row>
        <el-row :gutter="20" class="bottomWrap">
          <el-col :span="8" style="text-align: center">
            <img src="../assets/image/zhineng.jpg" @click="gotoZhi" class="imgWrap" alt="">
          </el-col>
          <el-col :span="8" style="text-align: center">
            <img src="../assets/image/base.jpg"  @click="gotoBase" class="imgWrap" alt="">
          </el-col>
           <el-col :span="8" style="text-align: center">
           <img src="../assets/image/jiance.jpg" @click="gotojiance" class="imgWrap" alt="">
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 20px 0" >
          <el-col :span="8" style="text-align: center">
             <img src="../assets/image/shili.jpg"   @click="gotoShili" class="imgWrap" alt="">
          </el-col>
           <el-col :span="8" style="text-align: center">
          <img src="../assets/image/baobiao.jpg" @click="gotoSchoolreport" class="imgWrap" alt="">
          </el-col>
        </el-row>
       </el-main>
    </el-container>
    <el-container v-show="showModal &&(this.identity == 3) " >
      <el-main class="mainBox">
         <el-row>
          <el-col :span="24" class="welcome">欢迎{{loginName}}登陆</el-col>
        </el-row>
        <el-row style="margin: 40rpx 0">
         <el-col :span="24" class="titleWrap">儿童青少年近视“人工干预|智能防控”管理系统</el-col>
        </el-row>
        <el-row :gutter="20" class="bottomWrap">
          <el-col :span="8" style="text-align: center">
            <img src="../assets/image/zhineng.jpg" @click="gotoZhi" class="imgWrap" alt="">
          </el-col>
           <el-col :span="8" style="text-align: center">
           <img src="../assets/image/jiance.jpg" @click="gotojiance" class="imgWrap" alt="">
          </el-col>
          <el-col :span="8" style="text-align: center">
             <img src="../assets/image/shili.jpg"   @click="gotoClassShili" class="imgWrap" alt="">
          </el-col>
        </el-row>
      <!--  <el-row :gutter="20" style="margin: 20px 0" >
           <el-col :span="8" style="text-align: center">
          <img src="../assets/image/baobiao.jpg" @click="gotoClassReport" class="imgWrap" alt="">
          </el-col>
        </el-row> -->
       </el-main>
    </el-container>
   </el-container>
</template>
<script>
import axios from 'axios'
import router from '../router/index'
    export default {
        data() {
            return {
              token: '',
              loginName: '',
                showModal: '',
                menuList: [] ,//左侧菜单的获取,
                activePath: '', //被激活的链接地址
                token: '',
                iconObj: {
                  '1': 'common base',
                  '5':'common report',
                  '6': 'common seat',
                  '9':'common user',
                  '12': 'common analysis',
                  '22': 'common template',
                  '26': 'common code',
                  '30': 'common shop',
                  '36':'common  grenarationReport',
                  '41': 'common orderManage',
                  '46': 'common backManage',
                  '50': 'common record',
                  '53': 'common config'
                },
                secondIconObj: {
                  '2': '',
                  '3': '',
                  '4': '',
                  '19':'',
                  '21': '',
                  '25': '', //基础数据
                  '33': '',
                  '34': '',
                  '35': '', //检测记录
                  '7': '',
                  '8': '',
                  '10': '',
                  '11': '',
                  '16': '',
                  '20': '', //用户管理
                  '14': '',
                  '17': '',
                  '18': '',//数据分析
                  '23': '',
                  '24': '', // 模板管理
                  '27': '',
                  '28': '',
                  '29': '', //生成二维码
                }
            }
        },
        created() {
            this.getMenuList();
            this.showModal = window.sessionStorage.getItem('showModal');
            this.activePath = window.sessionStorage.getItem('activePath')
            this.loginName = window.sessionStorage.getItem('loginName');
            let user = window.sessionStorage.getItem('token');
            this.identity = user.split('-') [1];
        },
        methods: {
          gotoBase() {
            this.showModal = false;
            window.sessionStorage.setItem('showModal', this.showModal);
            this.activePath = '/schoolsetting';
            router.push('/schoolsetting')
          },
          gotojiance(){
            this.showModal = false;
            window.sessionStorage.setItem('showModal', this.showModal);
            this.activePath = '/screeningsetting';
            router.push('/screeningsetting')
          },
          gotoZhi() {
            this.showModal = false;
            window.sessionStorage.setItem('showModal', this.showModal);
            this.activePath = '/online';
            router.push('/online')
          },
          gotoShili() {
           this.showModal = false;
            window.sessionStorage.setItem('showModal', this.showModal);
            this.activePath = '/schoolStatistics';
            router.push('/schoolStatistics')
          },
          gotoClassShili() {
            this.showModal = false;
              window.sessionStorage.setItem('showModal', this.showModal);
              this.activePath = '/classStatistics';
              router.push('/classStatistics')
          },
          gotoZhineng() {
            this.showModal = false;
             window.sessionStorage.setItem('showModal', this.showModal);
             this.activePath = '/online';
             router.push('/online')
          },
          gotoSchoolreport() {
            this.showModal = false;
            window.sessionStorage.setItem('showModal', this.showModal);
            this.activePath = '/schoolreport';
            router.push('/schoolreport')
          },
          gotoClassReport() {
            this.showModal = true;
            window.sessionStorage.setItem('showModal', this.showModal);
            this.activePath = '/classreport';
            router.push('/classreport')
          },
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
                  this.$router.push('/login');
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
.base{
    background: url('../assets/image/icon/base.png') center no-repeat;
    background-size: contain;
}
.report {
  background: url('../assets/image/icon/report.png') center no-repeat;
  background-size: contain;
}
.seat {
  background: url('../assets/image/icon/seat.png') center no-repeat;
  background-size: contain;
}
.user {
  background: url('../assets/image/icon/user.png') center no-repeat;
  background-size: contain;
}
.analysis {
  background: url('../assets/image/icon/analysis.png') center no-repeat;
  background-size: contain;
}
.template {
  background: url('../assets/image/icon/template.png') center no-repeat;
  background-size: contain;
  }
  .code {
    background: url('../assets/image/icon/code.png') center no-repeat;
    background-size: contain;
  }
  .shop {
    background: url('../assets/image/icon/shop.png') center no-repeat;
    background-size: contain;
  }
  .grenarationReport {
    background: url('../assets/image/icon/reportManage.png') center no-repeat;
    background-size: contain;
  }
  .orderManage {
    background: url('../assets/image/icon/orderManage.png') center no-repeat;
    background-size: contain;
  }
  .backManage {
    background: url('../assets/image/icon/backManage.png') center no-repeat;
    background-size: contain;
  }
  .record {
    background: url('../assets/image/icon/record.png') center no-repeat;
    background-size: contain;
  }
  .config {
    background: url('../assets/image/icon/config.png') center no-repeat;
    background-size: contain;
  }
.common:before{
    content: "替";
    font-size: 16px;
    visibility: hidden;
    width: 20px;
    height: 20rpx;
}
//如果直接使用字体图片
//直接在before属性设置对应的content就行
.common{
    font-size: 16px;
}
.common:before{
    content: "\e611";
}
.imgWrap {
  width: 60%;
  height: calc(50%);
  margin: 0 auto;
  position: relative;
}
.textWrap {
  position: absolute;
  color: red;
  font-size: 40px;
  font-weight: bold;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.welcome {
  text-align: center;
  font-size: 40px;
  color: #fff;
  margin: 20px 0;
}
.titleWrap {
   text-align: center;
  font-size: 34px;
  color: #fff;
  margin: 20px 0;
}
.mainBox {
  background: url('../assets/image/bglogin.png') center no-repeat !important;
  background-size: cover;
  display: flex;
  flex-direction: column;
  }
  .bottomWrap {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
