<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
                <el-form-item prop="username">
                    <el-input  v-model="loginForm.loginname" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                    <el-button type="info" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'login',
    created() {
        this.getMenuList()
    },
    data() {
        return {
            //登录表单的数据绑定对象
            loginForm: {
                loginname: '',
                password: ''
            },
            loginFormRules: {
                loginname: [
                    {required: true,  message: '请输入姓名', trigger: 'blur'}
                ],
                password: [
                     {required: true,  message: '请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        resetForm(formName) {
            this.$refs.loginFormRef.resetFields()
        },
        submitForm() {
            this.$refs.loginFormRef.validate( async(valid) => {
                //预验证
                if(!valid) return;
                //如果验证成功，发起登录请求
               let param = new URLSearchParams();
               param.append('loginname', this.loginForm.loginname);
               param.append('password', this.loginForm.password);
                axios({
                    method: 'post',
                    url: '/api/login',
                    data: param
                 }).then((res) => {
                      if(res.status !== 200) 
                        return this.$message.error('登录失败');
                        this.$message.success('登录成功');
                        //将token 存到sessionStorage
                        console.log(res.data)
                        window.sessionStorage.setItem('token', res.data.data.token)
                        this.$router.push('/home')
                 })
            })
        },
        //获取所有的菜单
        getMenuList() {

        }
    }
    
    
}
</script>
<style lang="less" scoped>
.login_container {
     position: absolute;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     background-color: #2b4b6b;
}
.login_box {
    width: 450px;
    height: 350px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #333;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
.btns {
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
</style>