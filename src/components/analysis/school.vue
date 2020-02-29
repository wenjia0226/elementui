<template>
    <div>
        <!-- 卡片视图 -->
        <el-card>
             <el-row :gutter="20">
                 <el-col :span="6">
                    <el-input placeholder="输入学校名称" v-model="query" clearable @clear="querySchool">
                        <el-button slot="append" icon="el-icon-search" @click="querySchool"></el-button>
                     </el-input>
                 </el-col>

             </el-row>
            <!-- 学校列表 -->
            <el-table :data="this.schoolList.slice((currentPage-1) * pageSize, currentPage * pageSize)" border  stripe style="width: 100%" v-show="!this.searchSchoolList.length" >
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学校名称" prop="name"></el-table-column>
                <el-table-column label="学校地址" prop="address"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="middle" icon="el-icon-edit"  @click="getSchoolSurvey(scope.row)" >查看视力概况</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <!-- 搜索 -->
           <el-row v-show="this.searchSchoolList.length">
             <el-col>搜索结果</el-col>
            </el-row>
            <el-table :data="this.searchSchoolList" border  stripe style="width: 100%" v-show="this.searchSchoolList.length">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学校名称" prop="name"></el-table-column>
                <el-table-column label="学校地址" prop="address"></el-table-column>
               <el-table-column label="操作">
                   <template slot-scope="scope">
                       <el-button type="primary" size="middle" icon="el-icon-edit"  @click="getSchoolSurvey(scope.row)" >查看视力概况</el-button>
                   </template>
               </el-table-column>
            </el-table>
            <!-- 分页功能 -->
            <el-pagination
                v-show="!this.searchSchoolList.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="schoolList.length">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'school',
    data () {
       return{
           token: '',
           query: '',
           currentPage: 1,
           pageSize: 5,
           total: 0,
           state1: '',
           schoolList: [],
           editDialogVisible: false,
           addDialogVisible: false, //控制对话框的显示隐藏
         
          
           searchSchoolList:[]
       }
    },
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getSchoolList();
    },

    methods:{
      //查看学校视力概况
      getSchoolSurvey(row) {
        window.sessionStorage.setItem('schoolName', row.name);
        let id = row.id;
         let routeUrl = this.$router.resolve({
                  path: "/schoolSurvey/"+ id,
                  // query: {id:id}
             });
             window.open(routeUrl .href, '_blank');
      },
      //关闭按钮
        handleClose() {
         this.addDialogVisible = false;
         this.$refs.schoolFormRef.resetFields();
        },
        getSchoolList() {
            let param = new URLSearchParams();
             param.append('token', this.token);
             axios({
                 method: 'post',
                 url: '/lightspace/schoolList',
                 data: param
             }).then(this.handleGetSchoolSucc.bind(this))
               .catch(this.handleGetSchoolErr.bind(this))
        },
        handleGetSchoolSucc(res) {
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
             } else if(res.data.status == 200) {
               this.schoolList = res.data.data;
            }
        },
        handleGetSchoolErr(error) {
           console.log(error)
        },
        //搜索
        querySchool() {
          if(this.query == "") {
             this.getSchoolList();
             this.searchSchoolList = [];
             return;
          }
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('name', this.query);
            axios({
                method: "post",
                url: '/lightspace/querySchool',
                data: param
            }).then(this.handleQuerySucc.bind(this))
            .catch(this.handleQueryErr.bind(this))
        },
        handleQuerySucc(res) {
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
             } else if(res.data.status == 10208) {
              this.$message.error(res.data.msg);
              this.getSchoolList();
              this.searchSchoolList = [];
           }else if(res.status == 200) {
              this.$message.success('搜索成功');
              this.searchSchoolList = res.data.data;
            }
        },
        handleQueryErr(err) {
            console.log(err)
        },
        //提交表单
        submitSchool() {
           this.$refs.schoolFormRef.validate((valid) => {
               if(!valid) return;
               let param = new URLSearchParams();
               param.append('name', this.addSchoolForm.name);
               param.append('address', this.addSchoolForm.address);
               param.append('token', this.token);
               axios({
                   method: 'post',
                   url: '/lightspace/addSchool',
                   data: param
               }).then(this.handleAddSchoolSucc.bind(this))
               .catch(this.handleAddSchoolErr.bind(this))
           })
        },
        handleAddSchoolSucc(res) {
          console.log(res);
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
             } else if(res.data.status == 10206) {
               this.$message.error(res.data.msg);
              this.addSchoolForm.name = '';
            }else if(res.status == 200){
              this.addDialogVisible = false;
              this.$message.success('添加学校成功');
              this.$refs.schoolFormRef.resetFields();
              this.getSchoolList();
            }


        },
        handleAddSchoolErr(err) {
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
        //点击展示编辑页面
        showEditDialog (id) {
            this.editDialogVisible = true;
           let param = new URLSearchParams();
            param.append('id', id);
            param.append('token',this.token)
            axios({
                method: 'post',
                url: '/lightspace/editSchool',
                data: param
            }).then(this.handleEditSchoolSucc.bind(this))
            .catch(this.handleEditSchoolErr.bind(this))
        },
        handleEditSchoolSucc(res) {
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
               } else if(res.data.status == 200) {
                this.editSchoolForm = res.data.data;
              }

        },
        handleEditSchoolErr(err) {
            console.log(err)
        },
        //监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editSchoolRef.resetFields()
        },
        //修改保存
        editSchoolInfo() {
            this.$refs.editSchoolRef.validate((valid) => {
                if(!valid)  return;
                let param = new URLSearchParams();
                param.append('token', this.token);
                param.append('name', this.editSchoolForm.name);
                param.append('address', this.editSchoolForm.address);
                param.append('id', this.editSchoolForm.id)
                axios({
                    method: 'post',
                    url: '/lightspace/saveSchool',
                    data: param
                }).then(this.handleEditSaveSchoolSucc.bind(this))
                .catch(this.handleEditSaveSchoolErr.bind(this))
                })
        },
         handleEditSaveSchoolSucc(res) {
             if(res.data.status === 10204) {
                 this.$message.error(res.data.msg);
                 this.$router.push('/login');
                }else if(res.data.status == 200) {
                  //发起修改用户信息的数据请求
                   this.schoolList = res.data.data;
                  //隐藏编辑框
                  this.editDialogVisible = false;
                  //提示修改成功
                  this.$message.success('更新学校信息成功');
                }

        },
        handleEditSaveSchoolErr(err) {
            console.log(err)
        },
        //根据id删除学校
        async removeSchoolById(id) {
            const confirmResult = await this.$confirm('此操作将永久删除该学校, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err => err)
            if(confirmResult !== 'confirm') {
                return this.$message.info('已经取消删除')
            }
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('id', id)
            axios({
                method: 'post',
                url: '/lightspace/deleteSchool',
                data: param
            }).then(this.handleDeleteShoolSucc.bind(this))
            .catch(this.handleDeleteSchoolErr.bind(this))
            },
            handleDeleteShoolSucc(res) {
                if(res.data.status === 10204) {
                    this.$message.error(res.data.msg);
                    this.$router.push('/login');
                } else if(res.data.status == 200) {
                  this.$message.success('删除学校成功');
                  this.schoolList = res.data.data;
                  const totalPage = Math.ceil(this.schoolList.length / this.pageSize) // 总页数
                  this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
                  this.currentPage = this.currentPage < 1 ? 1 : this.currentPage;
                }

            },
            handleDeleteSchoolErr(err) {
                console.log(err)
            }
    }
}
</script>
<style lang="less" scoped>
.el-card{

}
</style>
