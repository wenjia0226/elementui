<template>
    <div>
        <el-button type="primary" @click="back">返回</el-button>
        <el-card>
              <!-- 第一种排序方法 -->
            <table class="seat" v-if="this.type == '方式一'"> 
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
            <table class="seat" v-else-if="this.type == '方式二'">
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
            <table class="seat" v-else-if="this.type == '方式三'">
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
    </div>
</template>
<script>
import axios from 'axios'
export default {
   created() {
       this.token = window.sessionStorage.getItem('token');
       this.type = window.sessionStorage.getItem('tabletype');
       this.id = this.$router.history.current.params.id;
       this.getSeatTable();
       
   },
    data() {
        return {
            id: '',
            token: '',
            studentList: []
        }
    },
    methods:{
        getSeatTable() {
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('sortId', this.id);
            axios({
                method: 'post',
                url: "/api/showSort",
                data: param
            }).then(this.handleGetSeatTableSucc.bind(this)).catch(this.hanadleGetSeatTableErr.bind(this))
        },
        handleGetSeatTableSucc(res) {
            if(res.status !== 200) return ;
              this.studentList = res.data.data;
              this.type = window.sessionStorage.getItem('tabletype');
        },
        hanadleGetSeatTableErr(err) {
            console.log(err)
        },
        back() {
            this.$router.back(-1);
        }
    }
}
</script>
<style lang="less">

</style>
