<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>排座系统</el-breadcrumb-item>
            <el-breadcrumb-item>座位查询</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 卡片视图 -->
        <el-card>
             <el-row :gutter="10">
                <el-col :span="4">
                     <el-cascader :options="options" v-model="stu_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
                </el-col>
                <el-col :span="3">
                        <el-button type="primary" @click="getSeatList">座位查询</el-button>
                </el-col>
            </el-row>
            <!-- 排座结果列表 -->
            <el-table  v-if= "classRecordList.length" :data="classRecordList.slice((currentPage-1) * pageSize, currentPage * pageSize)"   stripe style="width: 100%"   row-key="id" row-click="handleRow">

               <el-table-column type="index"></el-table-column>
               <el-table-column label="排列次数" prop="name"></el-table-column>

                <el-table-column  label="排列方式" prop="type"  class="red"></el-table-column>
                <el-table-column label="是否过期" prop="endTime"></el-table-column>
                 <el-table-column label="查看">
                    <template slot-scope="scope">
                        <el-button type="primary" size="middle"   @click="showSeat(scope.row.id, scope.row.type)">排座表</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页功能 -->
            <el-pagination
                v-if="classRecordList.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="classRecordList.length">
            </el-pagination>
            <!-- 第一种排序方法-->
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
        this.getOPtions();
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
            classRecordList: [], // 班级列表
            currentPage: 1,
            pageSize: 5,
            total: 0,
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
                url: '/sortList'
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
        //获取座位列表
        getSeatList() {
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('classId', this.classId);
            axios({
                method: 'post',
                url: '/classSorts',
                data: param
            }).then(this.handleGetClassReorcdSucc.bind(this))
            .catch(this.handleGetClassRecordErr.bind(this))
        },
        handleGetClassReorcdSucc(res) {


            if(res.status !== 200) return;
            if(res.data.data) {
                this.classRecordList = res.data.data;
                this.classRecordList.forEach((item, index) => {
                    if(item.type == 1) {
                        item.type = '方式一'
                    }else if(item.type == 2) {
                        item.type = '方式二'
                    }else if(item.type == 3) {
                        item.type = '方式三'
                    }else {
                        item.type = '方式四'
                    }
                })
                this.classRecordList.forEach((item, index) => {
                    let end = item.endTime;
                    let myDate = new Date(end).getTime();
                    let now = new Date().getTime();
                    if(myDate > now ) {
                        item.endTime = '未过期'
                    }else {
                          item.endTime = '过期'
                    }
                })


            }
        },
        handleGetClassRecordErr(err) {
            console.log(err)
        },
          //监听pageSize改变事件
        handleSizeChange(newSize) {
            this.pageSize = newSize
            this.getSchoolList();
        },
        //监听页码值改变事件
        handleCurrentChange(val) {
           this.currentPage = val;
        },
        showSeat(id ,type) {
            window.sessionStorage.setItem('tabletype', type)
            this.$router.push('/detailSeat/'+id)
        }
        }



}
</script>
<style lang="less" scope>
    .red {
        color: red;
        font-size: 24px;
    }
.el-cascader {
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
.classList {
    line-height: 40px;
    border: 1px solid #eee;
    text-align: center;
}
.classTitle {
    line-height: 40px;
    font-size: 30px;
    text-align: center;
    border: 1px solid #eee;
    margin-top: 20px;
}
</style>
