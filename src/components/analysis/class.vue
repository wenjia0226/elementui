<template>
    <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据分析</el-breadcrumb-item>
      <el-breadcrumb-item>班级概况</el-breadcrumb-item>
    </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card class="box-card">
            <el-row :gutter="20">
             <el-col :span="2" v-if="this.identity == 1">
                <div class="schoolSet">学校选择：</div>
             </el-col>
             <el-col :span="6" v-if="this.identity == 1">
               <el-autocomplete
                width="100%"
                class="inline-input"
                v-model="schoolSelected"
                clearable
                :fetch-suggestions="querySearchSchool"
                placeholder="请输入学校名称"
                @select="handleSelectSchool"
                @change="handleSchoolChange"
                ></el-autocomplete>
               </el-col>
               <el-col :span="2" v-if="this.identity ==  2 || this.identity ==  1 ">
                  <div class="schoolSet">班级选择：</div>
               </el-col>
               <el-col :span="4" v-if="this.identity ==  2 || this.identity ==  1 " >
                 <el-autocomplete
                  class="inline-input"
                  v-model="className"
                  clearable
                  :fetch-suggestions="querySearchClass"
                  placeholder="请输入班级名称"
                  @select="handleSelectClass"
                  ></el-autocomplete>
                </el-col>
                <el-col :span="2" v-if="this.identity ==  2 || this.identity ==  1 ">
                 <el-button type="primary" @click="getRecodRight">查询</el-button>
                </el-col>
            </el-row>
             <!-- 班级列表 -->
            <el-table border :data="content"  stripe style="width: 100%" >
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
             v-show="!this.searchResult"
             background
             :current-page="this.number"
             @current-change="handleCurrentChange"
             layout="prev, pager, next"
             :page-size ="this.size"
             :total="this.totalElements">
           </el-pagination>
        </el-card>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    created() {
       this.token = window.sessionStorage.getItem('token');
      let user = window.sessionStorage.getItem('token');
      this.identity = user.split('-') [1];
      this.fondId = user.split('-')[2];
       if(this.identity == 1) {  // admin
         this.getSchoolList();
         this.type == '';
       }else if(this.identity == 2) {   //2 校长
         this.type = 'school';
         this.getClassList(this.fondId);
      }else if(this.identity == 3) {   // 教师
        this.type = "class";
        this.getChangePageResult(this.type, this.fondId);
      }
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
            state1: '',
            schoolList: [],
            token: '',
            schoolId: '',
            classId: '',
            schoolSelected: '', // 搜索绑定
            className: '',
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
            pageSize: 5,
            size: 10,
            total:0,
            content: [],
            schoolId: '',
            classId: '',
            schoolSelected: '', // 搜索绑定
            className: '',
            totalElements: 0,
            number: 1,
            searchResult: false,
            searchPage: 1,  //搜索页
            token: '',
            page: '' // 点击切换页面

        }
    },
    methods: {
      handleSchoolChange(val) {
        this.schoolId =  val.id;
      },
      handleSelectSchool(item) {
        this.schoolId = item.id;
        this.classId = '';
        this.className = '';
        this.student = '';
        this.studentId = '';
        this.getClassList(item.id);
      },
      handleSelectClass(item) {
        this.classId = item.id;
        this.student = '';
        this.studentId = '';
      },
      // 学校选择
      querySearchSchool(queryString, cb) {
        var schoolList = this.schoolList;
        var results = queryString ? schoolList.filter(this.createFilter(queryString)) : schoolList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (schoolList) => {
          return (schoolList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }
      },
      // 班级选择
      querySearchClass(queryString, cb) {
        var classesList = this.classesList;
        var results = queryString ? classesList.filter(this.createFilter(queryString)) : classesList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (classesList) => {
          return (classesList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }
      },
      //获取学校列表
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
         // console.log(res)
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
           } else if(res.data.status == 200) {
             this.schoolList = res.data.data;
             let options = res.data.data;
             options.forEach((item, index) => {
               this.school.push({
                 value: item.id,
                 label: item.name
               })
             })
          }
      },
      handleGetSchoolErr(error) {
         console.log(error)
      },

      //获取班级列表
      getClassList(id) {
        let param = new FormData();
        param.append('token', this.token);
        param.append('schoolId', id);
        axios({
          method: 'post',
          url: '/lightspace/queryClassesBySchool',
          data: param
        }).then(this.handleGetSearchSucc.bind(this)).catch(this.handleGetSearchErr.bind(this))
      },
      handleGetSearchSucc(res) {
        if(res.data.status == 200) {
          this.classesList = res.data.data;
          this.classesList.forEach((item) => {
           item.value = item.className
          })
        }
      },
      handleGetSearchErr(err) {
        console.log(err)
      },
		//点击页码
		changePage() {
		  if(this.type == 'school') {   //如果校长搜索
		    if(this.className) {
		      this.getChangePageResult('class', this.classId); //校长查询学生
		    }else {
		      this.getClassList(this.type, 1)
		    }
		  }else if(this.type == 'class') {  //如果老师搜索
		    if(this.student) {
		       this.getChangePageResult('student', this.studentId)
		    }else {

		    }
		  }else {
		  //如果管理员搜索
		    if(this.schoolSelected && this.className) {

		      this.getChangePageResult('class', this.classId); //校长查询学生
		    }else if(this.schoolSelected&& this.className == '') {

		      this.getChangePageResult('school', this.schoolId); //校长查询班级
		    }else if(this.schoolSelected == ''&& this.className) {
		      this.$notify({
		        title: '警告',
		        duration: 1000,
		        message: '请先选择学校',
		        type: 'warning'
		      });
		    }
		    else {
		       this.getClassList(this.type, 1)
		    }
		  }
		},
		// 搜索 校级管理员
		getChangePageResult(type,id) {
		  let param = new FormData();
		  param.append('type', type.toString());
		  param.append('id', id);
		  param.append('token', this.token);
		  param.append('page', this.page);
		  axios({
		    method: 'post',
		    data: param,
		    url: '/lightspace/queryClassInStatistics'
		  }).then(this.handleGetRecordDirSucc.bind(this)).catch(this.handlgGetRecordDirErr.bind(this))
		},
		handleGetRecordDirSucc(res) {
      console.log(res)
		  if(res.data.status == 200) {
		    res ? res= res.data.data: '';
		    this.content = res.content;
		    this.totalElements = res.totalElements;
		    this.size = res.size;
		    this.number = res.number + 1;
		    if(this.content.length) {
		      this.content.forEach((item) => {
		        item.lastTime = item.date + '\xa0\xa0' + item.time
		      })
		    }
		  }else if(res.data.status == 10211) {
		    this.$notify({
		      title: '警告',
		      duration: 1000,
		      message: res.data.msg,
		      type: 'warning'
		    });
		  }
		},
      handlgGetRecordDirErr(err) {
        console.log(err)
      },
      //搜索
      getRecodRight() {
        if(this.type == 'school') {   //如果校长搜索
          if(this.className) {
            this.searchPage = 1;
            this.getRecordDirect('class', this.classId); //校长查询学生
          }else {
            this.getClassList(this.type, 1)
            this.searchResult = false;
          }
        }else if(this.type == 'class') {  //如果老师搜索
          if(this.student) {
             this.getRecordDirect('student', this.studentId)
          }else {
            // this.getStudentList(this.type, 1);
          }
        }else {
        //如果管理员搜索
          if(this.schoolSelected && this.className) {
             this.searchPage = 1;
            this.getRecordDirect('class', this.classId); //校长查询学生
          }else if(this.schoolSelected&& this.className == '') {
            this.searchPage = 1;
            this.getRecordDirect('school', this.schoolId); //校长查询班级
          }else if(this.schoolSelected == ''&& this.className) {
            this.$notify({
              title: '警告',
              duration: 1000,
              message: '请先选择学校',
              type: 'warning'
            });
          }
          else {
             this.getClassList(this.type, 1)
          }
        }
      },
      // 搜索 校级管理员
      getRecordDirect(type,id) {
        let param = new FormData();
        param.append('type', type.toString());
        param.append('id', id);
        param.append('token', this.token);
        param.append('page', this.searchPage);
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/queryClassInStatistics'
        }).then(this.handleGetRecordDirSucc.bind(this)).catch(this.handlgGetRecordDirErr.bind(this))
      },
      handleGetRecordDirSucc(res) {
        // console.log(res)
        if(res.data.status == 200) {
          res ? res= res.data.data: '';
          this.content = res.content;
          this.totalElements = res.totalElements;
          this.size = res.size;
          this.number = res.number + 1;
          if(this.content.length) {
            this.content.forEach((item) => {
              item.lastTime = item.date + '\xa0\xa0' + item.time
            })
          }
        }else if(res.data.status == 10211) {
          this.$notify({
            title: '警告',
            duration: 1000,
            message: res.data.msg,
            type: 'warning'
          });
        }
      },
        handlgGetRecordDirErr(err) {
          console.log(err)
        },

       handleSelect(item) {
         this.getClassListBySchoolId(item.id);
      },
      getClassListBySchoolId(id) {
        let param = new URLSearchParams();
        param.append('token', this.token);
        param.append('schoolId', id);
        axios({
          method: "post",
          url: '/lightspace/queryClassesBySchool',
          data: param
        }).then(this.getClassBySchoolSucc.bind(this)).catch(this.getClassBySchoolErr.bind(this))
      },
      getClassBySchoolSucc(res) {
        if(res.status == 200) {
          if(res.data.data.length > 0) {
            this.classList = res.data.data;
          }else {
            this.$message.error('请先添加班级');
            // this.getClassList();
          }

        }
      },
      getClassBySchoolErr(err) {
        console.log(err)
      },
      showClassSurvey(row) {
        window.sessionStorage.setItem('className' , row.className);
        window.sessionStorage.setItem('cschoolName', row.schoolName);
        let id = row.id;
        let routeUrl = this.$router.resolve({
                path: "/classSurvey/"+ id,
        });
         window.open(routeUrl .href, '_blank');
      },
     //  //搜索
     //   searchClass() {
     //  //   if(this.query == "") {
     //  //      this.getClassList();
     //  //      this.searchClassList = [];
     //  //      return;
     //  //   }
     //      let param = new URLSearchParams();
     //      param.append('token', this.token);
     //      param.append('name', this.query);
     //      axios({
     //          method: "post",
     //          url: '/lightspace/queryClasses',
     //          data: param
     //      }).then(this.handleQuerySucc.bind(this))
     //      .catch(this.handleQueryErr.bind(this))
     //  },
     // handleQuerySucc(res) {
     //   if(res.data.status === 10204) {
     //       this.$message.error(res.data.msg);
     //       this.$router.push('/login');
     //   } else if(res.data.status == 10210) {
     //       this.$message.error(res.data.msg);
     //       // this.getClassList();
     //       this.searchClassList = [];
     //    }else if(res.data.status == 200) {
     //       this.$message.success('搜索成功');
     //       this.searchClassList = res.data.data;
     //     }
     // },
     //  handleQueryErr(err) {
     //      console.log(err)
     //  },
      //关闭按钮
        handleClose() {
         this.addClassVisible = false;
         this.$refs.addClassRef.resetFields();
         this.addClassForm.description = ''
        },

        addClass() {
            this.addClassVisible = true
        },

        //分页
        //监听pageSize改变事件
        handleSizeChange(newSize) {
            this.pageSize = newSize
            // this.getClassList();
        },
        //监听页码值改变事件
        handleCurrentChange(val) {
           this.currentPage = val;
           this.page = val;
           this.changePage();

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
              this.getClassList(this.type, this.searchPage);
            }
        },
        handleAddClassErr(err) {
            console.log(err)
        },
        resetAddClass() {
            this.$refs.addClassRef.resetFields();
        },
        // //点击展示编辑页面
        // showClassEditDialog (id) {
        //     let param = new URLSearchParams();
        //     param.append('id', id);
        //     param.append('token',this.token)
        //     axios({
        //         method: 'post',
        //         url: '/lightspace/editClasses',
        //         data: param
        //     }).then(this.handleEditClassSucc.bind(this))
        //     .catch(this.handleEditclassErr.bind(this))
        // },
        // handleEditClassSucc(res) {
        //     if(res.data.status === 10204) {
        //         this.$message.error(res.data.msg);
        //         this.$router.push('/login');
        //     } else if(res.data.status == 200) {
        //       this.editClassForm = res.data.data;
        //       this.selectedOptions = res.data.data.schoolId;
        //       this.editVisible = true;
        //     }


        // },
        // handleEditclassErr(err) {
        //     console.log(err)
        // },
        // //修改保存
        // editClassInfo() {
        //     this.$refs.editClassRef.validate((valid) => {
        //         if(!valid)  return;
        //         let param = new URLSearchParams();
        //         param.append('token', this.token);
        //         param.append('schoolId',this.schoolId);
        //         param.append('className',this.editClassForm.className);
        //         param.append('roomLength',this.editClassForm.roomLength);
        //         param.append('roomWidth',this.editClassForm.roomWidth);
        //         param.append('volume',this.editClassForm.volume);
        //         param.append('bbLength', this.editClassForm.bbLength);
        //         param.append('description',this.editClassForm.description);
        //         param.append('experiment',this.editClassForm.experiment);
        //         param.append('id', this.editClassForm.id)
        //         axios({
        //             method: 'post',
        //             url: '/lightspace/saveClasses',
        //             data: param
        //         }).then(this.handleEditSaveClassSucc.bind(this))
        //         .catch(this.handleEditSaveClassErr.bind(this))
        //         })
        // },
        //  handleEditSaveClassSucc(res) {
        //      if(res.data.status === 10204) {
        //          this.$message.error(res.data.msg);
        //          this.$router.push('/login');
        //      } else if(res.data.status == 200) {
        //         //发起修改用户信息的数据请求
        //          this.classlList = res.data.data;
        //         //隐藏编辑框
        //         this.editVisible = false;
        //         //提示修改成功
        //         this.$message.success('更新班级信息成功');
        //         // this.getClassList();
        //      }

        // },
        // handleEditSaveClassErr(err) {
        //     console.log(err)
        // },
         //监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editClassRef.resetFields()
        },
        // //删除班级
        // async removeClassById(id) {
        // const confirmResult = await this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
        // confirmButtonText: '确定',
        // cancelButtonText: '取消',
        // type: 'warning'
        // }).catch(err => err)
        // if(confirmResult !== 'confirm') {
        //     return this.$message.info('已经取消删除')
        // }
        // let param = new URLSearchParams();
        // param.append('token', this.token);
        // param.append('id', id)
        // axios({
        //     method: 'post',
        //     url: '/lightspace/deleteClasses',
        //     data: param
        // }).then(this.handleDeleteClassSucc.bind(this))
        // .catch(this.handleDeleteClassErr.bind(this))
        // },
        // handleDeleteClassSucc(res) {
        //   if(res.data.status === 10204) {
        //       this.$message.error(res.data.msg);
        //       this.$router.push('/login');
        //   } else if(res.data.status == 200) {
        //      this.$message.success('删除班级成功');
        //      this.classList = res.data.data;
        //      const totalPage = Math.ceil(this.classList.length / this.pageSize) // 总页数
        //      this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
        //      this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
        //   }
        // },
        // handleDeleteClassErr(err) {
        //     console.log(err)
        // }
    }

}
</script>
<style lang="less" scoped>

</style>
