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
                <el-col :span="2">
                     <div class="schoolSet">学校班级选择：</div>
                </el-col>
                <el-col :span="4">
                     <el-cascader :options="options" v-model="stu_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
                </el-col>
                 <el-col :span="2">
                     <div class="schoolSet">排座方式选择：</div>
                </el-col>
                <el-col :span="3">
                    <el-select v-model="value" placeholder="请选择排座方式" @focus="handleTypeChange(value)" clearable>
                    <el-option v-for="item in typeoptions" :key="item.value"  :label="item.label"  :value="item.value" >
                    </el-option>
                </el-select>
                </el-col>
                <el-col :span="2">
                     <div class="schoolSet">排座周期：</div>
                </el-col>
                <el-col :span="3">
                    <el-select v-model="time" @change="changeTime"  clearable>
                    <el-option v-for="item in timeoptions" :key="item.value"  :label="item.label"  :value="item.value" >
                    </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                        <el-button type="primary" @click="seatQuery">在线排座</el-button>
                </el-col>
            </el-row>
            <el-row class="row " style=" font-size: 20px;font-weight: bold; margin: 20px 0 10px 0 " v-if="!this.studentList.length">
              <el-col :span="6">方式一:</el-col>
              <el-col :span="6">方式二:</el-col>
              <el-col :span="6">方式三:</el-col>
              <el-col :span="6">方式四:</el-col>
            </el-row>
            <el-row class="row" style="font-size: 20px"  v-if="!this.studentList.length">
              <el-col :span="6">8列排布</el-col>
              <el-col :span="6">9列排布</el-col>
              <el-col :span="6">6列排布</el-col>
              <el-col :span="6">6列排布</el-col>
            </el-row>
            <el-row style="margin: 20px 0px" v-if="!this.studentList.length">
              <el-col :span="6">
                    <el-image  style="min-height: 200px":src="style1.url" :title="style1.title" fit="fit"></el-image>
              </el-col>
              <el-col :span="6">
                    <el-image  style="min-height: 200px":src="style2.url" :title="style2.title" fit="fit"></el-image>
              </el-col>
             <el-col :span="6">
                   <el-image  style="min-height: 200px":src="style3.url" :title="style3.title" fit="fit"></el-image>
             </el-col>
              <el-col :span="6">
                    <el-image  style="min-height: 200px":src="style4.url" :title="style4.title" fit="fit"></el-image>
              </el-col>
            </el-row>
            <!-- 第一种排序方法 -->
            <table class="seat" v-if="this.value == 1">
                <thead>
                    <tr align="center"  v-show="this.studentList.length">
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
            <table class="seat" v-else-if="this.value == 2">
                <thead>
                    <tr align="center"  v-show="this.studentList.length">
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
            <table class="seat" v-else-if="this.value == 3">
                <thead>
                    <tr align="center"  v-show="this.studentList.length">
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
                <thead>
                    <tr align="center" v-show="this.studentList.length">
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
        this.getOPtions();
    },
    data() {
        return {
          showTu: false,
          style1: {url:require('../../assets/image/1.jpg'), title: '方式一', id: 1},
          style2: {url:require('../../assets/image/2.jpg'), title: '方式二', id: 2},
          style3: {url:require('../../assets/image/3.jpg'), title: '方式三', id: 3},
          style4: {url:require('../../assets/image/4.jpg'), title: '方式四', id: 4}
          ,
          typeoptions: [{
          value: 1,
          label: '方式一'
        }, {
          value: 2,
          label: '方式二'
        }, {
          value: 3,
          label: '方式三'
        }, {
          value: 4,
          label: '方式四'
        }],
        timeoptions:[{
          value: 7,
          label: '一星期'
        }, {
          value: 14,
          label: '两星期'
        }, {
          value: 30,
          label: '一个月'
        }, {
          value: 90,
          label: '三个月'
        }],
        value: '',
        time: '',
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
                url: '/cascade1',
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
        handleChange(value) {
           this.schoolId = this.stu_cat[0];
           this.classId = this.stu_cat[1];
        },
        seatQuery() {
            let param = new URLSearchParams();
            if(!this.token) {
                return this.$router.push('/login');
            }else if(!this.classId) {
                 return this.$message.error('请选择学校班级');
            }else if(!this.value) {
                return this.$message.error('请选择排座方式');
            }else if(!this.time) {
                return this.$message.error('请选择排座周期');
            }else{
                param.append('token', this.token);
                param.append('classId', this.classId);
                param.append('type', this.value);
                param.append('time', this.time * 86400);
                axios({
                    method: 'post',
                    data: param,
                    url: '/sortList'
                }).then(this.handleGetSeatQuerySucc.bind(this)).catch(this.handleGetSeatQueryErr.bind(this))
            }
        },
        handleGetSeatQuerySucc(res) {
            if(res.status !== 200) return this.$message.error('查询座位失败');
            if(res.data.data.length == 0) return this.$message.error('请先添加学生');
            this.studentList =res.data.data;
            // window.sessionStorage.setItem('classId', this.classId); //存入缓存，向座位查询页面传递班级id
            // window.sessionStorage.setItem('schoolId', this.schoolId);
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
                url: '/studentRecord',
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
        //排座类型
        handleTypeChange(value) {
          console.log(value)
          this.showTu = true;
            window.sessionStorage.setItem('type', value)
            this.studentList = [];
        },
        //排座周期
        changeTime(time) {

        }
    }

}
</script>
<style lang="less" scope>
.row {
  vertical-align: bottom;
  line-height: 30px;
  height: 30px;
  text-align: center;
}
.schoolSet {
    line-height: 40px;
    text-align: center;
}
.el-cascader {
    width: 100% !important;
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
