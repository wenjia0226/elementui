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
        <el-table :data="screenTempList" border  stripe style="width: 100%"   @row-click="chooseone">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="模板名称" prop="name"></el-table-column>
          <el-table-column label="模板副标题" prop="first"></el-table-column>
          <el-table-column label="温馨提示" prop="remark"></el-table-column>
          <el-table-column label="模板携带路径 url" prop="url"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                 <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
              </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
               <el-button type="success" size="mini" round icon="el-icon-circle-check" v-if="scope.row.selected == 1">使用中</el-button>
               <el-button type="primary" size="mini" round icon="el-icon-circle-close" v-if="scope.row.selected == 0">未使用</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column label="选择模板">
              <template slot-scope="scope">
                <el-radio  v-model="radio" label="1" v-if="scope.row.selected == 1">使用模板 {{scope.row.selected}}</el-radio>
                <el-radio  v-model="radio"  label="0" v-else="scope.row.selected == 0">未使用模板</el-radio>
              </template>
          </el-table-column> -->
        </el-table>
      </el-card>
      <el-dialog title="修改模板" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
          <el-form :model="editScreenForm" :rules="editScreenRules" ref="editScreenRef" label-width="100px">
              <el-form-item label="模板名称" prop="name">
                  <el-input v-model="editScreenForm.name"></el-input>
              </el-form-item>
              <el-form-item label="模板副标题" prop="first">
                  <el-input v-model="editScreenForm.first"></el-input>
              </el-form-item>
              <el-form-item label="温馨提示" prop="remark">
                  <el-input v-model="editScreenForm.remark"></el-input>
              </el-form-item>
              <el-form-item label="携带路径" prop="url">
                  <el-input v-model="editScreenForm.url"></el-input>
              </el-form-item>
              <el-form-item label="是否使用" prop="selected">
                <el-radio v-model="editScreenForm.selected" :label="1">是</el-radio>
                <el-radio v-model="editScreenForm.selected" :label="0">否</el-radio>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button @click="editScreenInfo">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>
<script>
  import axios from 'axios'
  export default {
    created() {
      this.token = window.sessionStorage.getItem('token');
      this.getscreenTempList();
    },
    data() {
      return {
        token: '',
        radio: '',
        id: '',
        screenTempList: [],
        editDialogVisible: false,
        editScreenForm: {
            name: '',
            first:'',
            remark: '',
            url: '',
            selected: ''
        },
        editScreenRules: {
             name: [{required: true, message: '模板名称', trigger: 'blur' }],
             first: [{required: true, message: '模板副标题', trigger: 'blur' }],
             remark: [{required: true, message: '温馨提示', trigger: 'blur' }],
             url: [{required: false, message: '携带路径', trigger: 'blur' }],
             selected:[{required: true, message: '选择模板', trigger: 'blur' }]
        }
      }
    },
    methods: {
      chooseone(row){
        this.radio = row.id
      },
      getscreenTempList() {
        let param = new FormData();
        param.append('token', this.token);
        param.append('type', 'word');
        axios({
          method: 'post',
          url: '/lightspace/msgTempList',
          data: param
        }).then(this.handleGetScreenTemSucc.bind(this))
        .catch(this.handleGEetScreenTemErr.bind(this))
      },
      handleGetScreenTemSucc(res) {
        if(res.data.status == 200) {
          this.screenTempList = res.data.data;
        }
      },
      handleGEetScreenTemErr(err) {
        console.log(err)
      },
      showEditDialog(id) {
        this.editDialogVisible = true;
        this.id = id;
        let param = new FormData();
        param.append('id', id);
        param.append('token',this.token)
        axios({
            method: 'post',
            url: '/lightspace/editMsgTemp',
            data: param
        }).then(this.handleEditScreenSucc.bind(this))
        .catch(this.handleEditScreenErr.bind(this))
        },
        handleEditScreenSucc(res) {
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
             } else if(res.data.status == 200) {
              this.editScreenForm = res.data.data;
            }
        },
        handleEditScreenErr(err) {
            console.log(err)
        },
      //监听修改用户对话框的关闭事件
      editDialogClosed() {
          this.$refs.editScreenRef.resetFields()
      },
      //修改保存
      editScreenInfo() {
        this.$refs.editScreenRef.validate((valid) => {
        if(!valid)  return;
        let param = new FormData();
        param.append('token', this.token);
        param.append('id', this.id);
        param.append('name', this.editScreenForm.name);
        param.append('first', this.editScreenForm.first);
        param.append('remark', this.editScreenForm.remark);
        param.append('url', this.editScreenForm.url);
        param.append('selected', this.editScreenForm.selected)

        axios({
            method: 'post',
            url: '/lightspace/saveMsgTemp',
            data: param
        }).then(this.handleEditSaveScreenSucc.bind(this))
        .catch(this.handleEditSaveScreenErr.bind(this))
        })
      },
       handleEditSaveScreenSucc(res) {
       if(res.data.status === 10204) {
           this.$message.error(res.data.msg);
           this.$router.push('/login');
          }else if(res.data.status == 200) {
            //发起修改用户信息的数据请求
             this.screenList = res.data.data;
            //隐藏编辑框
            this.editDialogVisible = false;
            //提示修改成功
            this.$message.success('更新模板信息成功');
            this.getscreenTempList()
          }
      },
      handleEditSaveScreenErr(err) {
         console.log(err)
      },
    }
  }
</script>

<style>
</style>
