<template>
    <div>

        <!-- 卡片视图 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12"></el-col>
                <el-col :span="6">
                    <el-input placeholder="输入学校名称"  clearable v-model="query" clearable @clear="searchClass">
                        <el-button slot="append" icon="el-icon-search" @click="searchClass"></el-button>
                    </el-input>
                </el-col>
            </el-row>
             <!-- 班级列表 -->
            <el-table border  :data="classList.slice((currentPage-1) * pageSize, currentPage * pageSize)" stripe style="width: 100%"  v-show="!this.searchClassList.length">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="所属学校" prop="schoolName"></el-table-column>
              <el-table-column label="班级名称" prop="className"></el-table-column>
              <el-table-column label="容纳人数" prop="volume"></el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showClassSurvey(scope.row)">查看视力概况</el-button>
                  </template>
              </el-table-column>
            </el-table>
            <!-- 搜索班级 -->
            <el-table border  :data="this.searchClassList" stripe style="width: 100%" v-show="this.searchClassList.length">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="所属学校" prop="schoolName"></el-table-column>
              <el-table-column label="班级名称" prop="className"></el-table-column>
              <el-table-column label="容纳人数" prop="volume"></el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showClassSurvey(scope.row)" >查看视力概况</el-button>
                  </template>
              </el-table-column>
            </el-table>

            <!-- 分页功能 -->
            <el-pagination
                v-show="!this.searchClassList.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="classList.length">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import axios from 'axios'
export default {
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getClassList();
        this.getSchoolList();
    },
    data() {
        var valiNumberPass1 = (rule, value, callback) => {//包含小数的数字
            let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/g;
            if (value === '') {
                callback(new Error('请输入内容'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入数字'));
            } else {
                callback();
            }
        };
        return {
            token: '',
            addClassVisible: false,
            editVisible: false,
            school: [],
            value: '',
            schoolId: '',
            labelNum1: 1,
            labelNum2: 0,
            query: '',
            searchClassList: [],

            cateProps: {
                label: 'name', //看到的是哪个属性
                value: 'id', // 选中的是谁的值
                children: 'children' //哪个属性实现父子节点嵌套
            },
            classList: [],
            currentPage: 1,
            pageSize: 5,
            total: 0,
            selectedOptions: [],

        }
    },
    methods: {
      showClassSurvey(row) {
         window.sessionStorage.setItem('className' , row.className);
         window.sessionStorage.setItem('cscholName', row.schoolName);
         let id = row.id;
         let routeUrl = this.$router.resolve({
                  path: "/classSurvey/"+ id,
             });
             window.open(routeUrl .href, '_blank');
      },
      //搜索
      searchClass() {
        if(this.query == "") {
           this.getClassList();
           this.searchClassList = [];
           return;
        }
          let param = new URLSearchParams();
          param.append('token', this.token);
          param.append('name', this.query);
          axios({
              method: "post",
              url: '/lightspace/queryClasses',
              data: param
          }).then(this.handleQuerySucc.bind(this))
          .catch(this.handleQueryErr.bind(this))
      },
     handleQuerySucc(res) {
       if(res.data.status === 10204) {
           this.$message.error(res.data.msg);
           this.$router.push('/login');
       } else if(res.data.status == 10210) {
           this.$message.error(res.data.msg);
           this.getClassList();
           this.searchClassList = [];
        }else if(res.data.status == 200) {
           this.$message.success('搜索成功');
           this.searchClassList = res.data.data;
         }
     },
      handleQueryErr(err) {
          console.log(err)
      },
      //关闭按钮
        handleClose() {
         this.addClassVisible = false;
         this.$refs.addClassRef.resetFields();
         this.addClassForm.description = ''
        },

        addClass() {
            this.addClassVisible = true
        },
        //获取班级列表
        getClassList () {
            let param2 = new URLSearchParams();
            param2.append('token' ,this.token);
            axios({
                method: 'post',
                data: param2,
                url: '/lightspace/classesList'
            }).then(this.handleGetClassSucc.bind(this))
            .catch(this.handleGetClassErr.bind(this)
            )
        },
        handleGetClassSucc(res) {
            if(res.status !== 200) return this.$message.error('获取班级列表失败');
            this.classList = res.data.data;
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
               } else if(res.data.status == 200) {
                 this.classList = res.data.data;
                 this.classList.forEach((item, index) => {
                   if(item.experiment == '1') {
                     item.experiment = '是'
                   }else{
                      item.experiment = '否'
                   }
                 })
              }
        },
        handleGetClassErr(err) {
            console.log(err)
        },
        //分页
        //监听pageSize改变事件
        handleSizeChange(newSize) {
            this.pageSize = newSize
            this.getClassList();
        },
        //监听页码值改变事件
        handleCurrentChange(val) {
           this.currentPage = val;
        },
        // 添加班级
        sumitClass() {
            this.$refs.addClassRef.validate((valid) => {
                if(!valid)  return this.$message.error('验证失败');
                var param = new URLSearchParams();
                param.append('token', this.token);
                param.append('schoolId',this.schoolId);
                param.append('className',this.addClassForm.className);
                param.append('roomLength',this.addClassForm.roomLength);
                param.append('roomWidth',this.addClassForm.roomWidth);
                param.append('volume',this.addClassForm.volume);
                param.append('bbLength', this.addClassForm.bbLength);
                param.append('description',this.addClassForm.description);
                param.append('experiment',this.addClassForm.experiment);
                axios({
                    method: 'post',
                    data: param,
                    url:'/lightspace/addClasses'
                }).then(this.handleAddClassSucc.bind(this))
                .catch(this.handleAddClassErr.bind(this))
            })
        },
         handleChange(item) {
           this.schoolId = item;
        },
        handleAddClassSucc(res) {
           if(res.data.status == 10204) {
               this.$message.error(res.data.msg);
               this.$router.push('/login');
            }else if(res.data.status == 10207)  {
               this.$message.error(res.data.msg);
                this.addClassForm.className = '';
            }else if(res.data.status == 200) {
              this.$message.success('添加班级成功')
              this.addClassVisible = false;
              this.$refs.addClassRef.resetFields();
              this.addClassForm.description = '';
              this.getClassList();
            }
        },
        handleAddClassErr(err) {
            console.log(err)
        },
        resetAddClass() {
            this.$refs.addClassRef.resetFields();
        },
        //点击展示编辑页面
        showClassEditDialog (id) {
            let param = new URLSearchParams();
            param.append('id', id);
            param.append('token',this.token)
            axios({
                method: 'post',
                url: '/lightspace/editClasses',
                data: param
            }).then(this.handleEditClassSucc.bind(this))
            .catch(this.handleEditclassErr.bind(this))
        },
        handleEditClassSucc(res) {
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
              this.editClassForm = res.data.data;
              this.selectedOptions = res.data.data.schoolId;
              this.editVisible = true;
            }


        },
        handleEditclassErr(err) {
            console.log(err)
        },
        //修改保存
        editClassInfo() {
            this.$refs.editClassRef.validate((valid) => {
                if(!valid)  return;
                let param = new URLSearchParams();
                param.append('token', this.token);
                param.append('schoolId',this.schoolId);
                param.append('className',this.editClassForm.className);
                param.append('roomLength',this.editClassForm.roomLength);
                param.append('roomWidth',this.editClassForm.roomWidth);
                param.append('volume',this.editClassForm.volume);
                param.append('bbLength', this.editClassForm.bbLength);
                param.append('description',this.editClassForm.description);
                param.append('experiment',this.editClassForm.experiment);
                param.append('id', this.editClassForm.id)
                axios({
                    method: 'post',
                    url: '/lightspace/saveClasses',
                    data: param
                }).then(this.handleEditSaveClassSucc.bind(this))
                .catch(this.handleEditSaveClassErr.bind(this))
                })
        },
         handleEditSaveClassSucc(res) {
             if(res.data.status === 10204) {
                 this.$message.error(res.data.msg);
                 this.$router.push('/login');
             } else if(res.data.status == 200) {
                //发起修改用户信息的数据请求
                 this.classlList = res.data.data;
                //隐藏编辑框
                this.editVisible = false;
                //提示修改成功
                this.$message.success('更新班级信息成功');
                this.getClassList();
             }

        },
        handleEditSaveClassErr(err) {
            console.log(err)
        },
         //监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editClassRef.resetFields()
        },
        // 获取学校列表
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
              this.school = res.data.data;
          }
        },
        handleGetSchoolErr(err) {
            console.log(err)
        },
        //删除班级
        async removeClassById(id) {
        const confirmResult = await this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
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
            url: '/lightspace/deleteClasses',
            data: param
        }).then(this.handleDeleteClassSucc.bind(this))
        .catch(this.handleDeleteClassErr.bind(this))
        },
        handleDeleteClassSucc(res) {
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
          } else if(res.data.status == 200) {
             this.$message.success('删除班级成功');
             this.classList = res.data.data;
             const totalPage = Math.ceil(this.classList.length / this.pageSize) // 总页数
             this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
             this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
          }
        },
        handleDeleteClassErr(err) {
            console.log(err)
        }
    }

}
</script>
<style lang="less" scoped>

</style>
