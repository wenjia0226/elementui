<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form ref="form" :modal="loginForm" class="login_form">
                <el-form-item>
                    <el-input  v-modal="username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-modal="password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" >登录</el-button>
                    <el-button type="info">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login',
    loginForm: {
        username:  '',
        password: ''
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