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
                <!-- <el-col :span="6">
                     <el-cascader :options="options" v-model="stu_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
                </el-col>
                <el-col :span="3">
                        <el-button type="primary" @click="seatQuery">座位查询</el-button>
                </el-col>  -->
            </el-row>
            <!-- 第一种排序方法 -->
            <table class="seat" v-if="this.type == 1"> 
                <thead v-show="this.studentList.length">
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
                <tbody v-for="(item, index) in studentList" :key="index">
                     <th>第{{index+1}}排</th>
                    <td  v-for="(item2) in item.slice(0,1)" :key="item2.studentId">
                       <a href="#"> 
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                              {{item2.studentName}}
                        </a> 
                    </td>
                     <td  v-for="(item2) in item.slice(1,2)" :key="item2.studentId">
                       <a href="#"> 
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                              {{item2.studentName}}
                        </a> 
                    </td>
                   <td  v-for="(item2) in item.slice(2,3)" :key="item2.studentId">
                       <a href="#"> 
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                              {{item2.studentName}}
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                    <td  v-for="(item2) in item.slice(3,4)" :key="item2.studentId">
                       <a href="#"> 
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                              {{item2.studentName}}
                        </a> 
                    </td>
                    <td  v-for="(item2) in item.slice(4,5)" :key="item2.studentId">
                       <a href="#"> 
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                              {{item2.studentName}}
                        </a> 
                    </td>
                    <td>&nbsp;</td> 
                    <td  v-for="(item2) in item.slice(5,6)" :key="item2.studentId">
                       <a href="#"> 
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                              {{item2.studentName}}
                        </a> 
                    </td>
                     <td  v-for="(item2) in item.slice(6,7)" :key="item2.studentId">
                       <a href="#"> 
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                              {{item2.studentName}}
                        </a> 
                    </td>
                   <td  v-for="(item2) in item.slice(7,8)" :key="item2.studentId">
                       <a href="#"> 
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                              {{item2.studentName}}
                        </a> 
                    </td>
                    
                </tbody>
            </table>
              <!-- 第二种排序方法 -->
            <table class="seat" v-else-if="this.type == 2">
                <thead v-show="this.studentList.length">
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
                <tbody v-for="(item, index) in studentList" :key="index">
                     <th>第{{index + 1}}排</th>
                    <td v-for="(item2) in item.slice(0,1)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                     <td v-for="(item2) in item.slice(1,2)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                   <td v-for="(item2) in item.slice(2,3)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                    <td v-for="(item2) in item.slice(3,4)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                     <td v-for="(item2) in item.slice(4,5)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                   <td v-for="(item2) in item.slice(5,6)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                    <td>&nbsp;</td> 
                    <td v-for="(item2) in item.slice(6,7)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                     <td v-for="(item2) in item.slice(7,8)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                   <td v-for="(item2) in item.slice(8,9)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                    
                </tbody>
            </table>
           <!--第三种排序方法 -->
            <table class="seat" v-else-if="this.type == 3">
                <thead v-show="this.studentList.length">
                    <tr align="center" >
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
                <tbody v-for="(item, index) in studentList" :key="index">
                    <th>第{{index + 1}}排</th>
                    <td v-for="item2 in item.slice(0,1)" :key="item2.studentId"> 
                        <a href="#"   @click="showRecordEditDialog(item2.studentId)">
                        <img src="../../assets/image/e12.png"  width="64px" alt="">
                            <br>
                        {{item2.studentName}}
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                    <td v-for="(item2) in item.slice(1,2)" :key="item2.studentId">
                       <a href="#" @click="showRecordEditDialog(item2.studentId)"> 
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                    <td v-for="(item2) in item.slice(2,3)" :key="item2.studentId">
                       <a href="#" @click="showRecordEditDialog(item2.studentId)">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                    <td>&nbsp;</td> 
                    <td v-for="(item2) in item.slice(3,4)" :key="item2.studentId">
                       <a href="#" @click="showRecordEditDialog(item2.studentId)">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                     <td v-for="(item2) in item.slice(4,5)" :key="item2.studentId">
                       <a href="#" @click="showRecordEditDialog(item2.studentId)">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                     <td v-for="(item2) in item.slice(5,6)" :key="item2.studentId">
                       <a href="#" @click="showRecordEditDialog(item2.studentId)">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                           <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                </tbody>
            </table>
            <!-- 第四种排序方法-->
            <table class="seat" v-else>
                <thead v-show="this.studentList.length">
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
                <tbody v-for="(item, index) in studentList" :key="index">
                    <th>第{{index + 1}}排</th>
                   <td v-for="item2 in item.slice(0,1)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                            <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                    <td v-for="item2 in item.slice(1,2)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                            <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                    <td v-for="item2 in item.slice(2,3)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                            <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                     <td>&nbsp;</td>
                    <td v-for="item2 in item.slice(3,4)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                            <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                    <td v-for="item2 in item.slice(4,5)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                            <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                      <td v-for="item2 in item.slice(5,6)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/e12.png"  width="64px" alt="">
                            <br>
                           {{item2.studentName}}
                        </a> 
                    </td>
                    <td>&nbsp;</td>
                </tbody>
            </table>
        </el-card>
        <!-- 点击打开弹框    -->
         <!-- 修改记录 -->
             <el-dialog title="学生信息" :visible.sync="editRecordDialogVisible"  width="30%">
                <el-form :model="editRecordForm" ref="recordEditFormRef" label-width="120px">
                    <!-- <el-form-item label="所属学校班级" prop="">
                        <el-cascader :options="options" v-model="editRecordForm.record_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
                    </el-form-item> -->
                    <el-form-item label="姓名" >
                        <el-input v-model="editRecordForm.studentName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所属学校" >
                        <el-input v-model="editRecordForm.schoolName"  disabled></el-input>
                    </el-form-item> 
                    <el-form-item label="所属班级" >
                        <el-input v-model="editRecordForm.classesName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="左眼曲率">
                        <el-input  v-model="editRecordForm.curvatureLeft" disabled></el-input>
                    </el-form-item>
                     <el-form-item label="右眼曲率">
                        <el-input  v-model="editRecordForm.curvatureRight" disabled></el-input>
                    </el-form-item>
                     <el-form-item label="左眼矫正视力">
                        <el-input v-model="editRecordForm.cvaLeft" disabled></el-input>
                    </el-form-item>
                     <el-form-item label="右眼矫正视力">
                        <el-input  v-model="editRecordForm.cvaRight" disabled></el-input>
                    </el-form-item>
                     <el-form-item label="左眼屈光度">
                        <el-input v-model="editRecordForm.diopterLeft" disabled></el-input>
                    </el-form-item>
                     <el-form-item label="右眼屈光度">
                        <el-input v-model="editRecordForm.diopterRight" disabled></el-input>
                    </el-form-item>
                     <el-form-item label="左眼眼轴长度">
                        <el-input v-model="editRecordForm.eyeAxisLengthLeft" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="右眼眼轴长度">
                        <el-input v-model.number="editRecordForm.eyeAxisLengthRight	" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="左眼裸眼视力">
                        <el-input v-model="editRecordForm.visionLeft" disabled></el-input>
                    </el-form-item>
                     <el-form-item label="右眼裸眼视力">
                        <el-input v-model="editRecordForm.visionRight" disabled></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button  type="primary" @click="editRecordDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
     created() {
        this.token = window.sessionStorage.getItem('token');
        this.classId = window.sessionStorage.getItem('classId');
        this.type= window.sessionStorage.getItem('type');
        this.getOPtions();
        this.seatQuery();
    },
    data() {
        return {
            token: '',
            classId: '',
            type: '',
            cateProps: {
            label: 'name', //看到的是哪个属性
            value: 'id', // 选中的是谁的值
            children: 'children' //哪个属性实现父子节点嵌套
            },
              options: [],
              stu_cat: [],
              schoolId: '',
              studentList: [],
              editRecordDialogVisible: false,
              editRecordForm: {
                curvatureLeft: '',
                curvatureRight: '',
                cvaLeft: '',
                cvaRight: '',
                diopterLeft: '',
                diopterRight: '',
                eyeAxisLengthLeft: '',
                eyeAxisLengthRight: '',
                visionLeft: '',
                visionLeft: '',
                record_cat: '',
                studentName: '',
                schoolName:'',
                classesName:''
            },
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
            param.append('type', this.type);
            axios({
                method: 'post',
                data: param,
                url: '/api/sortList'
            }).then(this.handleGetSeatQuerySucc.bind(this)).catch(this.handleGetSeatQueryErr.bind(this))
        },
        handleGetSeatQuerySucc(res) {
            if(res.status !== 200) return this.$message.error('查询座位失败');  
            this.studentList =res.data.data;
        },
        handleGetSeatQueryErr(err) {
            console.log(err)
        },
          //编辑出现编辑页面
        showRecordEditDialog(id) {
            let param = new URLSearchParams();
            param.append('id', id);
            param.append('token',this.token)
            axios({
                method: 'post',
                url: '/api/studentRecord',
                data: param
            }).then(this.handleEditRecordSucc.bind(this))
            .catch(this.handleEditRecordErr.bind(this))
            },
            handleEditRecordSucc(res) {
                if(res.status !== 200) return;
                res ? res = res.data: '';
                this.editRecordForm = res.data;
                this.editRecordDialogVisible = true;
            },
            handleEditRecordErr(err) {
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
.el-input.is-disabled .el-input__inner {
    background: #fff;
    text-align: center;
    font-weight: bold;
}
</style>