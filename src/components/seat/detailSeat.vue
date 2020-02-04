<template>
<el-card>
     <!-- 第一种排序方法 -->
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
</template>
<script>
export default {
    data() {
        return {
            studentList: [],
            type: 1
        }
        
    }
}
</script>
<style lang="less" scoped>

</style>