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
                <el-col :span="6">
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
               <el-table-column label="排座时间" prop="date"></el-table-column>
                 <el-table-column label="查看">
                    <template slot-scope="scope">
                        <el-button type="primary" size="middle" @click="showSeat(scope.row.id,scope.row.type)">排座表</el-button>
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
       </el-card>
    </div>
</template>
<script>
import axios from 'axios'
export default {
     created() {
        this.token = window.sessionStorage.getItem('token');
        this.getOPtions();
        // this.getTableList();
        let user = window.sessionStorage.getItem('token');
        this.identity = user.split('-') [1];
        this.fondId = user.split('-')[2];

    },
    data() {
        return {
            token: '',
            classId: '',
            type: '',
            identity: '',
            fondId: '',
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
      getTableList() {
        if(window.sessionStorage.getItem('classId')) {
          this.classId= window.sessionStorage.getItem('classId');
          this.schoolId = window.sessionStorage.getItem('schoolId');
          this.stu_cat[0] = Number(this.schoolId);
          this.stu_cat[1] = Number(this.classId);
          this.getSeatList();
        }

      },
         //获取级联选择器中的数据
        getOPtions() {
            let param = new URLSearchParams();
            param.append('token', this.token);
            axios({
                method: 'post',
                url: '/lightspace/cascade1',
                data: param
            }).then(this.handleGetOptionSucc.bind(this)).catch(this.handleGetOptionErr.bind(this))
        },
        handleGetOptionSucc (res) {
          let that = this;
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
          } else if(res.data.status == 200) {
              this.options =  res.data.data;
              if(this.identity == 1) {  // admin

               }else if(this.identity == 2) {   //2 校长
                  let selectedOption = this.options;
                  let filterOption = selectedOption.filter((item, index) => {
                     if(item.id == Number(that.fondId)) {
                      return item
                    }
                  })
               this.options = filterOption;
              }else if(this.identity == 3) {   // 教师
                this.options.forEach((item) => {
                  item.children.forEach((secondItem) => {
                    if(secondItem.id == this.fondId) {
                      this.stu_cat[0]= item.id;
                      this.stu_cat[1] = secondItem.id;
                      this.schoolId = item.id;
                      this.classId = secondItem.id;
                       this.options = [];
                       item.disabled = true;
                       this.options.push(item)
                    }
                  })
                })
              }
          }
        },
        handleGetOptionErr(err) {
            console.log(err)
        },
        //级联选择器选择变化会触发这个函数
        handleChange(item) {
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
                url: '/lightspace/sortList'
            }).then(this.handleGetSeatQuerySucc.bind(this)).catch(this.handleGetSeatQueryErr.bind(this))
        },
        handleGetSeatQuerySucc(res) {
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
               this.studentList =res.data.data;
            }
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
                url: '/lightspace/studentRecord',
                data: param
            }).then(this.handleEditRecordSucc.bind(this))
            .catch(this.handleEditRecordErr.bind(this))
            },
        handleEditRecordSucc(res) {
            if(res.status !== 200) return;
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
               this.editRecordForm = res.data.data;
               this.editRecordDialogVisible = true;
            }
        },
        handleEditRecordErr(err) {
            console.log(err)
        },
        //获取座位列表
        getSeatList() {
          if(this.classId) {
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('classId', this.classId);
            axios({
                method: 'post',
                url: '/lightspace/classSorts',
                data: param
            }).then(this.handleGetClassReorcdSucc.bind(this))
            .catch(this.handleGetClassRecordErr.bind(this))
            }else {
             this.$message({
                message: '请先选择学校班级',
                type: 'warning'
              });
            }
        },
        handleGetClassReorcdSucc(res) {
           if(res.data.status === 10204) {
               this.$message.error(res.data.msg);
               this.$router.push('/login');
           } else if(res.data.status == 200) {
              if(res.data.data.length) {
                  this.classRecordList = res.data.data;

              //     this.classRecordList.forEach((item, index) => {
              //      if(item.type == 1) {
              //             item.type = '方式一'
              //         }else if(item.type == 2) {
              //             item.type = '方式二'
              //         }else if(item.type == 3) {
              //             item.type = '方式三'
              //         }else {
              //             item.type = '方式四'
              //         }
              //     })
               }else {
                  this.$message({
                     message: '你好，没有查到该班级座位表，请先去排座',
                     type: 'warning'
                   });
                   this.classRecordList = [];
               }
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
        showSeat(id, type) {
            let routeUrl = this.$router.resolve({
              path: '/detailSeat',
              query: {
                id:  id,
                type: type
              }
             });
            window.open(routeUrl .href, '_blank');
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
