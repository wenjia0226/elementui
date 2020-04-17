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
                    <td v-for="(item2) in item.slice(1,2)" :key="item2.studentId"  @click="showRecordEditDialog(item2.studentId)" >
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                    <td v-for="(item2) in item.slice(2,3)" :key="item2.studentId"  @click="showRecordEditDialog(item2.studentId)">
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
                    <td v-for="(item2) in item.slice(3,4)" :key="item2.studentId"  @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                     <td v-for="(item2) in item.slice(4,5)" :key="item2.studentId"  @click="showRecordEditDialog(item2.studentId)">
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
                     <td v-for="(item2) in item.slice(5,6)" :key="item2.studentId"  @click="showRecordEditDialog(item2.studentId)">
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
                   <td v-for="item2 in item.slice(0,1)" :key="item2.studentId"   @click="showRecordEditDialog(item2.studentId)">
                      <a href="#">
                          <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                          <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                          <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                           <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                          <br>
                             {{item2.studentName}}
                       </a>
                    </td>
                    <td v-for="item2 in item.slice(1,2)" :key="item2.studentId"  @click="showRecordEditDialog(item2.studentId)">
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
                    <td v-for="item2 in item.slice(2,3)" :key="item2.studentId"  @click="showRecordEditDialog(item2.studentId)">
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
                    <td v-for="item2 in item.slice(3,4)" :key="item2.studentId"  @click="showRecordEditDialog(item2.studentId)">
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
                    <td v-for="item2 in item.slice(4,5)" :key="item2.studentId"  @click="showRecordEditDialog(item2.studentId)">
                       <a href="#">
                           <img src="../../assets/image/girl.png"  width="100px" alt="" v-if="item2.gender == 1 && item2.correct == 0">
                           <img src="../../assets/image/weargirl.png"  width="100px" alt="" v-else-if="item2.gender == 1 && item2.correct == 1">
                           <img src="../../assets/image/boy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 0">
                            <img src="../../assets/image/wearboy.png"  width="100px" alt="" v-else-if="item2.gender == 0 && item2.correct == 1">
                           <br>
                              {{item2.studentName}}
                        </a>
                    </td>
                      <td v-for="item2 in item.slice(5,6)" :key="item2.studentId"  @click="showRecordEditDialog(item2.studentId)">
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
        <el-dialog title="学生信息" :visible.sync="editRecordDialogVisible"  width="30%">
            <el-form :model="editRecordForm" ref="recordEditFormRef" label-width="120px">
            <!-- <el-form-item label="所属学校班级" prop="">
                <el-cascader :options="options" v-model="editRecordForm.record_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
            </el-form-item> -->
            <el-form-item label="姓名" >
                <el-input v-model="editRecordForm.studentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="所属学校" >
                <el-input v-model="editRecordForm.schoolName"  disabled></el-input>
            </el-form-item>
            <el-form-item label="所属班级" >
                <el-input v-model="editRecordForm.classesName" disabled></el-input>
            </el-form-item>
            <el-form-item label="左眼曲率">
                <el-input  v-model="editRecordForm.curvatureLeft" disabled></el-input>
            </el-form-item>
             <el-form-item label="右眼曲率">
                <el-input  v-model="editRecordForm.curvatureRight" disabled></el-input>
            </el-form-item>
             <el-form-item label="左眼矫正视力">
                <el-input v-model="editRecordForm.cvaLeft" disabled></el-input>
            </el-form-item>
             <el-form-item label="右眼矫正视力">
                <el-input  v-model="editRecordForm.cvaRight" disabled></el-input>
            </el-form-item>
             <el-form-item label="左眼屈光度">
                <el-input v-model="editRecordForm.diopterLeft" disabled></el-input>
            </el-form-item>
             <el-form-item label="右眼屈光度">
                <el-input v-model="editRecordForm.diopterRight" disabled></el-input>
            </el-form-item>
             <el-form-item label="左眼眼轴长度">
                <el-input v-model="editRecordForm.eyeAxisLengthLeft" disabled></el-input>
            </el-form-item>
            <el-form-item label="右眼眼轴长度">
                <el-input v-model.number="editRecordForm.eyeAxisLengthRight	" disabled></el-input>
            </el-form-item>
            <el-form-item label="左眼裸眼视力">
                <el-input v-model="editRecordForm.visionLeft" disabled></el-input>
            </el-form-item>
             <el-form-item label="右眼裸眼视力">
                <el-input v-model="editRecordForm.visionRight" disabled></el-input>
            </el-form-item>
        </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button  type="primary" @click="editRecordDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
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
          res ? res = res.data: '';
          this.editRecordForm = res.data;
          this.editRecordDialogVisible = true;
      },
      handleEditRecordErr(err) {
          console.log(err)
      },
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
  transition: all 0.3s;
}
</style>
