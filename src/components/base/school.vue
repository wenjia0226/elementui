<template>
    <div>
       <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础数据</el-breadcrumb-item>
            <el-breadcrumb-item>学校设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
             <el-row :gutter="20">
                 <el-col :span="6">
                    <el-input placeholder="输入学校名称" v-model="query" clearable @clear="querySchool">
                        <el-button slot="append" icon="el-icon-search" @click="querySchool"></el-button>
                     </el-input>
                  </el-col>
                 <el-col :span="6">
                        <el-button type="primary" @click="addDialogVisible = true">添加学校</el-button>
                 </el-col>
             </el-row>
            <!-- 学校列表 -->
            <el-table :data="this.schoolList.slice((currentPage-1) * pageSize, currentPage * pageSize)" border  stripe style="width: 100%" v-show="!this.searchSchoolList.length" >
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学校名称" prop="name"></el-table-column>
                <el-table-column label="区" prop="regionName"></el-table-column>
                <el-table-column label="学校地址" prop="address"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
                        <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeSchoolById(scope.row.id)"></el-button>
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
                        <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
                        <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeSchoolById(scope.row.id)"></el-button>
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
        <!-- 添加学校对话框 -->
        <el-dialog title="添加学校" :visible.sync="addDialogVisible" width="50%" :before-close="handleClose">
           <!-- 添加学校 -->
           <el-form :model="addSchoolForm" :rules="addSchoolRules" ref="schoolFormRef" label-width="100px">
            <el-form-item label="选择省" :label-width="'100px'" prop="province">
               <el-select v-model="addSchoolForm.province" placeholder="请选择省" @change="getShengId">
                 <el-option v-for="item in sheng" :key="item.value" :label="item.label" :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="选择市" :label-width="'100px'" prop="city">
                <el-select v-model="addSchoolForm.city" placeholder="请选择省" @change="getCityId">
                  <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择区" :label-width="'100px'" prop="area">
                 <el-select v-model="addSchoolForm.area" placeholder="请选择区" @change="getAreaId">
                   <el-option v-for="item in area" :key="item.value" :label="item.label" :value="item.value">
                   </el-option>
                 </el-select>
               </el-form-item>
             <el-form-item label="学校名称" prop="name">
                    <el-input v-model="addSchoolForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="学校地址" prop="address">
                    <el-input v-model="addSchoolForm.address" clearable></el-input>
                </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submitSchool" >确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog title="修改学校" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editSchoolForm" :rules="editSchoolRules" ref="editSchoolRef" label-width="100px">
                <el-form-item label="学校名称" prop="name">
                    <el-input v-model="editSchoolForm.name"></el-input>
                </el-form-item>
                <el-form-item label="学校地址" prop="address">
                    <el-input v-model="editSchoolForm.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSchoolInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
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
           addSchoolForm: {
               num: '',
               name: '',
               address: '',
               province: '',
               city: '',
               area: ''
           },
           addSchoolRules: {
               province: [{required: true, message:'请选择省', trigger: 'blur'}],
               city: [{required: true, message:'请选择市', trigger:'blur'}],
               area: [{required: true, message:'请选择区', trigger: 'blur'}],
               name: [{required: true, message:'请输入学校名称', trigger: 'blur' }],
               address: [{required: true, message: '请输入具体地址', trigger: 'blur' }],
           },
           editSchoolForm: {
               name: '',
               address:'',
               id: ''
           },
           editSchoolRules: {
                name: [{required: true, message: '请输入学校名称', trigger: 'blur' }],
                address: [{required: true, message: '请输入具体地址', trigger: 'blur' }],
           },
           searchSchoolList:[],
            sheng: [],
            city: [],
            area: [],
            shengId: '',
            cityId: '',
            areaId: ''
       }
    },
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getSchoolList();
        this.getSheng();
    },

    methods:{
		getSheng() {
			let param = new URLSearchParams();
			 param.append('token', this.token);
			 param.append('type', 1);
			 axios({
			     method: 'post',
			     url: '/lightspace/findRegion',
			     data: param
			 }).then((res) => {
         let sheng = res.data.data;
         sheng.forEach((item) => {
           this.sheng.push({
             value: item.id,
             label: item.name
           })
         })
			 })
			 .catch((err) => {console.log(err)})
		},
    getShengId(val) {
       this.shengId = val;
       this.addSchoolForm.province = val;
       this.addSchoolForm.city = '';
       this.addSchoolForm.area = '';
       this.city = [];
       this.getCity();
    },
    getCity() {
      let param = new URLSearchParams();
       param.append('pId', this.shengId);
       param.append('type', 2);
       axios({
           method: 'post',
           url: '/lightspace/findRegion',
           data: param
       }).then((res) => {
         let city = res.data.data;
         city.forEach((item) => {
           this.city.push({
             value: item.id,
             label: item.name
           })
         })
       })
       .catch((err) => {console.log(err)})
    },
    getCityId(val) {
       this.cityId = val;
       this.addSchoolForm.city = val;
       this.area = [];
       this.addSchoolForm.area =  '';
       this.getArea();
    },
    getArea() {
      let param = new URLSearchParams();
       param.append('pId', this.cityId);
       param.append('type', 2);
       axios({
           method: 'post',
           url: '/lightspace/findRegion',
           data: param
       }).then((res) => {
         let area = res.data.data;
         area.forEach((item) => {
           this.area.push({
             value: item.id,
             label: item.name
           })
         })
       })
       .catch((err) => {console.log(err)})
    },
    getAreaId(val) {
      this.areaId = val;
      this.addSchoolForm.area = val;
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
             param.append('regionId', this.areaId);
             axios({
                 method: 'post',
                 url: '/lightspace/addSchool',
                 data: param
             }).then(this.handleAddSchoolSucc.bind(this))
             .catch(this.handleAddSchoolErr.bind(this))
         })
      },
      handleAddSchoolSucc(res) {
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
            console.log(res)
            this.schoolList = res.data.data;
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
        // console.log(res.data.data)
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
