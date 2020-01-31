<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>排座系统</el-breadcrumb-item>
            <el-breadcrumb-item>在线排座</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 卡片视图 -->
        <el-card>
             <el-row :gutter="10">
                <el-col :span="6">
                     <el-cascader :options="options" v-model="stu_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
                </el-col>
                <el-col :span="3">
                        <el-button type="primary" @click="seatQuery">座位查询</el-button>
                </el-col> 
            </el-row>
            <!-- 第一种排序方法 -->
            <table class="seat">
                <thead>
                    <tr align="center">
                        <th></th>
                        <th>第1列</th>
                        <th>第2列</th>
                        <th>第3列</th>
                        <th style="width: 64px">&nbsp;</th>
                        <th>第4列</th>
                        <th>第5列</th>
                        <th style="width: 64px">&nbsp;</th>
                        <th>第6列</th>
                        <th>第7列</th>
                        <th>第8列</th>
                    </tr>
                </thead>
                <tbody>
                     <th>第一排</th>
                    <td>
                       <a href=""> 
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                              小名
                        </a> 
                    </td>
                     <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td> 
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                     <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    
                </tbody>
            </table>
              <!-- 第二种排序方法 -->
            <table>
                <thead>
                    <tr align="center">
                        <th></th>
                        <th>第1列</th>
                        <th>第2列</th>
                        <th>第3列</th>
                        <th style="width: 64px">&nbsp;</th>
                        <th>第4列</th>
                        <th>第5列</th>
                        <th>第6列</th>
                        <th style="width: 64px">&nbsp;</th>
                        <th>第7列</th>
                        <th>第8列</th>
                        <th>第9列</th>
                    </tr>
                </thead>
                <tbody>
                     <th>第一排</th>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           小名
                        </a> 
                    </td>
                     <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td> 
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                     <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    
                </tbody>
            </table>
            <!-- 第三种排序方法 -->
            <table>
                <thead>
                    <tr align="center">
                        <th></th>
                        <th>第1列</th>
                        <th style="width: 64px">&nbsp;</th>
                        <th>第2列</th>
                        <th>第3列</th>
                        <th style="width: 64px">&nbsp;</th>
                        <th>第4列</th>
                        <th>第5列</th>
                        <th style="width: 64px">&nbsp;</th>
                        <th>第6列</th>
                        <th style="width: 64px">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <th>第一排</th>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                     <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td> <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                     <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                     <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                </tbody>
            </table>
            <!-- 第四种排序方法 -->
            <table>
                <thead>
                    <tr align="center">
                        <th></th>
                        <th>第1列</th>
                        <th>第2列</th>
                        <th style="width: 64px">&nbsp;</th>
                        <th>第3列</th>
                        <th style="width: 64px">&nbsp;</th>
                        <th>第4列</th>
                        <th style="width: 64px">&nbsp;</th>
                        <th>第5列</th>
                        <th>第6列</th>
                        <th style="width: 64px">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <th>第一排</th>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                     <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td> <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                     <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                     <td>
                       <a href="">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                </tbody>
            </table>
        </el-card>   
    </div>
</template>
<script>
import axios from 'axios'
export default {
     created() {
        this.token = window.sessionStorage.getItem('token');
        this.getOPtions();
    },
    data() {
        return {
            token: '',
              cateProps: {
               label: 'name', //看到的是哪个属性
               value: 'id', // 选中的是谁的值
               children: 'children' //哪个属性实现父子节点嵌套
            },
              options: [],
              stu_cat: [],
              schoolId: '',
              classId: '',
        }
    },
    methods: {
         //获取级联选择器中的数据
        getOPtions() {
            let param = new URLSearchParams();
            param.append('token', this.token);
            axios({
                method: 'post',
                url: '/api/cascade1',
                data: param
            }).then(this.handleGetOptionSucc.bind(this)).catch(this.handleGetOptionErr.bind(this))
        },
        handleGetOptionSucc (res) {
          
            if(res.status !==200) return this.$message.error('获取级联数据失败');
            this.options =  res.data.data;
        },
        handleGetOptionErr(err) {
            console.log(err)
        },
        //级联选择器选择变化会触发这个函数
        handleChange() {
           this.schoolId = this.stu_cat[0];
           this.classId = this.stu_cat[1];
        },
        seatQuery() {
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('classId', this.classId);
            param.append('type', 1);
            axios({
                method: 'post',
                data: param,
                url: '/api/sortList'
            }).then(this.handleGetSeatQuerySucc.bind(this)).catch(this.handleGetSeatQueryErr.bind(this))
        },
        handleGetSeatQuerySucc(res) {
            console.log(res)
            if(res.status !== 200) return this.$message.error('查询座位失败');
            
            console.log(res.data.data)
        },
        handleGetSeatQueryErr(err) {
            console.log(err)
        },
    }
    
}
</script>
<style lang="less" scope>
.el-cascade {
    width: 100%;
}
.seat a {
    display: block;
    text-align: center;
    text-decoration: none;
    color: red;
    font-weight: bold;
    line-height: 20px;
}
.seat img {
    margin: 5px 0;
}
</style>