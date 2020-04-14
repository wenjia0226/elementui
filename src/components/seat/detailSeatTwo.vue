<template>
    <div class="main">
       <!-- <el-button type="primary" @click="back" class="mb">返回</el-button> -->
        <el-card style="background:#8D8779">
          <div class="header demo-image__lazy">
            <el-image src="https://www.guangliangkongjian.com/images/title.jpg" fit="cover"></el-image>
          </div>
              <!-- 第一种排序方法 -->
            <table class="seat" v-if="this.type == 1">
                <tbody v-for="(item, index) in studentList" :key="index">
                    <td  v-for="(item2) in item.slice(0,1)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                     <td  v-for="(item2) in item.slice(1,2)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                   <td  v-for="(item2) in item.slice(2,3)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                    <td class="gd">&nbsp;</td>
                    <td  v-for="(item2) in item.slice(3,4)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    <td  v-for="(item2) in item.slice(4,5)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                    <td class="gd">&nbsp;</td>
                    <td  v-for="(item2) in item.slice(5,6)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                     <td  v-for="(item2) in item.slice(6,7)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                   <td  v-for="(item2) in item.slice(7,8)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                </tbody>
            </table>
              <!-- 第二种排序方法 -->
            <table class="seat" v-else-if="this.type == 2">
                <tbody v-for="(item, index) in studentList" :key="index">
                    <td v-for="(item2) in item.slice(0,1)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                     <td v-for="(item2) in item.slice(1,2)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                   <td v-for="(item2) in item.slice(2,3)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                   <td class="gd">&nbsp;</td>
                    <td v-for="(item2) in item.slice(3,4)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                      <a href="#">
                          <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                          <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                          <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                           <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                          <br>
                             {{item2.studentName}}
                       </a>
                    </td>
                     <td v-for="(item2) in item.slice(4,5)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                   <td v-for="(item2) in item.slice(5,6)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                      <a href="#">
                          <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                          <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                          <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                           <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                          <br>
                             {{item2.studentName}}
                       </a>
                    </td>
                   <td class="gd">&nbsp;</td>
                    <td v-for="(item2) in item.slice(6,7)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                     <td v-for="(item2) in item.slice(7,8)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                   <td v-for="(item2) in item.slice(8,9)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                </tbody>
            </table>
           <!--第三种排序方法 -->
            <table class="seat" v-else-if="this.type == 3">
                <tbody v-for="(item, index) in studentList" :key="index">
                    <td v-for="item2 in item.slice(0,1)" :key="item2.studentId" @click="showRecordEditDialog(item2.studentId)">
                        <a href="#">
                            <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                            <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                            <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                             <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                            <br>
                               {{item2.studentName}}
                         </a>
                    </td>
                    <td class="gd">&nbsp;</td>
                    <td v-for="(item2) in item.slice(1,2)" :key="item2.studentId" >
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                    <td v-for="(item2) in item.slice(2,3)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                    <td class="gd">&nbsp;</td>
                    <td v-for="(item2) in item.slice(3,4)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                     <td v-for="(item2) in item.slice(4,5)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                    <td class="gd">&nbsp;</td>
                     <td v-for="(item2) in item.slice(5,6)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                </tbody>
            </table>
            <!-- 第四种排序方法-->
            <table class="seat" v-else>
                <tbody v-for="(item, index) in studentList" :key="index">
                   <td v-for="item2 in item.slice(0,1)" :key="item2.studentId" >
                      <a href="#">
                          <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                          <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                          <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                           <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                          <br>
                             {{item2.studentName}}
                       </a>
                    </td>
                    <td v-for="item2 in item.slice(1,2)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                    <td class="gd">&nbsp;</td>
                    <td v-for="item2 in item.slice(2,3)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                     <td class="gd">&nbsp;</td>
                    <td v-for="item2 in item.slice(3,4)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                    <td class="gd">&nbsp;</td>
                    <td v-for="item2 in item.slice(4,5)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                      <td v-for="item2 in item.slice(5,6)" :key="item2.studentId">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
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
       this.classId = this.$route.query.classId;
       this.time = this.$route.query.time;
       this.type = this.$route.query.type;
       this.getSeatTable();
   },
    data() {
      return {
        id: '',
        token: '',
        type: '',
        classId: '',
        time: '',
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
        classesName:'',
        studentList: []
			},
        }
    },
    methods:{
		//编辑出现编辑页面
    getSeatTable() {
      let param = new URLSearchParams();
       param.append('token', this.token);
       param.append('classId', this.classId);
       param.append('type', this.type);
       param.append('time', this.time * 86400);
       axios({
           method: 'post',
           data: param,
           url: '/lightspace/sortList'
       }).then(this.handleGetSeatQuerySucc.bind(this)).catch(this.handleGetSeatQueryErr.bind(this))
     },
       handleGetSeatQuerySucc(res) {
         // console.log(res)
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
          } else if(res.data.status == 200) {
             if(res.data.data.length == 0) return this.$message.error('请先添加学生');
             this.studentList =res.data.data;
          } else if(res.data.status =10216) {
             this.$message.error(res.data.msg);
          }
       },
       handleGetSeatQueryErr(err) {
           console.log(err)
       },
    }
}
</script>
<style lang="less">
.mb {
  margin: 10px 0 20px 0;
}
.main {
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  justify-content: center;
  align-items: center;
}
.header {
  width: 100%;
  text-align: center;
  padding: 50px;
  box-sizing: border-box;
}
.center {
  flex: 1;
  width: 100%;
}
.seat td   a {
  display: block;
  color: #000;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
}
.gd {
  width: 100px;
}
td:hover  a img{
  transform: scale(1.2);
}
td:hover a img{
  transition: all 0.3s;
}
</style>
