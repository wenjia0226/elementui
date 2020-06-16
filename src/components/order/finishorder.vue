<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>未付款订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <el-table :data="orderList" border stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="商品名称" prop="productName"></el-table-column>
      <el-table-column label="商品数量" prop="number"></el-table-column>
      <el-table-column label="商品规格" prop="specificationName"></el-table-column>
      <el-table-column label="邮寄方式" prop="delivrytype"></el-table-column>
	   <el-table-column label="运单号" prop="deliverynumber"></el-table-column>
      <el-table-column label="收货人姓名" prop="contacts"></el-table-column>
      <el-table-column label="收货人地址" prop="address"></el-table-column>
      <el-table-column label="联系电话" prop="phone"></el-table-column>
      <el-table-column label="订单状态" prop="status" style="color: red"></el-table-column>
      <el-table-column label="订单生成时间" prop="gentime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
           <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeRecordById(scope.row.id)"></el-button>
        </template>
    </el-table-column>
      </el-table>
      <el-pagination
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
          this.getOrderList(1);
      },
      data() {
       return {
         token: '',
         orderList: [],
         size: 10,
         totalElements: 0,
         totalPages: 0,
         number: 1
       }
      },
      methods: {
        //删除记录
        async removeRecordById(id) {
            const confirmResult = await this.$confirm('此操作将永久删除该订单记录, 是否继续?', '提示', {
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
                url: '/lightspace/deleteOrder',
                data: param
            }).then(this.handleDeleteRecordSucc.bind(this))
            .catch(this.handleDeleteRecordErr.bind(this))
        },
        handleDeleteRecordSucc(res) {
          // console.log(res)
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
          } else if(res.data.status == 200) {
             this.$message.success('删除记录成功');
             this.getOrderList(1);
          }
        },
        handleDeleteRecordErr(err) {
            console.log(err)
        },
        handleCurrentChange(val) {
           this.getOrderList(val)
        },
        //获取列表
        getOrderList(page) {
          let param = new URLSearchParams();
          param.append('token' ,this.token);
          param.append('page', page);
          param.append('type', 3);
          axios({
              method: 'post',
              data: param,
              url: '/lightspace/orderList'
          }).then((res) => {
            console.log(res)
            if(res.data.status == 200) {
              this.orderList = res.data.data.content;
              this.size = res.data.data.size;
              this.totalElements = res.data.data.totalElements;
              this.totalPages = res.data.data.totalPages;
              this.number = res.data.data.number + 1;
            }
          }).catch((err) => {
            console.log(err)
          })
        }
    },

  }
</script>
<style>
</style>
