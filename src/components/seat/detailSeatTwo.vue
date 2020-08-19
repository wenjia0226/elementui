<template>
  <div style="position: relative">
    <div class="bg2"  v-if="remind" @click="changeState"></div>
    <div class="remindBox" v-if="remind">
     <div class="imgRemBox"></div>
         <div class="imgTitle">有绿色框的学生视力在这排有问题，老师可以自行调学生位置,希望您在拖动学生的过程中在红色框内
         选择学生将要移动定位的位置，以便更科学的实现排座。</div>
         <div class="imgTitle">  您可以拖拽调整学生位置,拖拽完成后请按左上角保存按钮,保存此次调整结果，否则将不会保存此次拖拽效果。</div>
        <el-button type="primary" @click="changeState">我知道了</el-button>
    </div>
    <div class="titleWrap">
      <!-- <div class="title">
        您可以拖拽调整学生位置,拖拽完成后请按右上角保存按钮,保存此次调整结果，否则将不会保存此次拖拽效果。
      </div> -->
      <div class="btnWrap" v-if="this.sortType == 2">
        <el-button type="primary" @click="saveResult">保存拖拽效果</el-button>
      </div>
      <div class="btnWrap" v-if="this.sortType == 1">
        <el-button type="primary" @click="saveResult">保存微调</el-button>
      </div>
    </div>
    <div class="mianWrap">
      <div class="imgWrap">
        <img src="../../assets/image/bg3.png">
      </div>
     <!--  sortType 为2 打乱排座 -->
     <div class="innerWrap" v-if="sortType == 2">
     <!-- 方式一 -->
      <div class="outerBox" :class="{'bor': chooseStr.indexOf(item1.num) !== -1}" v-for="(item1, index) in reversePai"  v-if="type == 6" >
       <div class="titlePai">第{{item1.num}} 排</div>
       <div class="item" :class="{'mr20':item.mr, 'nopass': item1.vison  > item.avgRecord}"
           v-if="item1.num == totalPai"
           v-for="(item, index2) in divList.slice((item1.num- 1) * 6)"
           draggable="true"
           @dragstart="handleDragStart($event, item)"
           @dragenter="handleDragEnter($event, item)"
           @dragover.prevent="handleDragover($event, item)"
           @drop="handleDrop($event, item)"
           @dragend="handleDragEnd($event, item)">
           <div  @click="showRecordEditDialog(item.studentId)">
             <img  class="i2" :src="girl" width="120px" alt=""   @click="showRecordEditDialog(item.studentId)" v-if="item.gender == 1 && item.correct == 0">
             <img class="i2" :src="weargirl"   width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 1 && item.correct == 1">
             <img class="i2" :src="boy"  width="120px" alt=""  @click="showRecordEditDialog(item.studentId)" v-else-if="item.gender == 0 && item.correct == 0">
             <img class="i2" :src="wearboy"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 0 && item.correct == 1">
             <img class="i2" :src="kong"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 2">
               <div class="name">
                 {{item.studentName}} {{item.avgRecord}}
               </div>
            </div>
            <div class="addBtn" @click="addMargin">
              <img  src="../../assets/image/jia.png"  v-if="!item.showMr"  :data-index="index2 +1">
              <img src="../../assets/image/jian.png" v-if="item.showMr"   :data-index="index2 +1">
            </div>
         </div>
       <div class="item" :class="{'mr20':item.mr, 'nopass': item1.vison  > item.avgRecord }"
        v-if="item1.num !== totalPai"
        v-for="(item) in divList.slice((item1.num -1) * 6, item1.num * 6)" :key="item.id" draggable="true"
         @dragstart="handleDragStart($event, item)"
         @dragenter="handleDragEnter($event, item)"
         @dragover.prevent="handleDragover($event, item)"
         @drop="handleDrop($event, item)"
         @dragend="handleDragEnd($event, item)">
         <div  @click="showRecordEditDialog(item.studentId)">
           <img  class="i2" :src="girl"  width="120px" v-if="item.gender == 1 && item.correct == 0">
           <img class="i2" :src="weargirl"    width="120px" v-else-if="item.gender == 1 && item.correct == 1">
           <img class="i2" :src="boy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
           <img class="i2" :src="wearboy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
           <img class="i2" :src="kong"   width="120px" alt="" v-else-if="item.gender == 2">
           <div class="name">
               {{item.studentName}} {{item.avgRecord}}
           </div>
        </div>
       </div>
     </div>
     <!-- 方式二 -->
      <div class="outerBox" :class="{'bor': chooseStr.indexOf(item1.num) !== -1 }" v-for="(item1, index) in reversePai"  v-if="type == 7">
        <div class="titlePai">第{{item1.num}} 排</div>
        <div class="item" :class="{'mr20':item.mr, 'nopass': item1.vison  > item.avgRecord}"
         v-if="item1.num == totalPai"
           v-for="(item, index2) in divList.slice((item1.num- 1) * 7)" draggable="true"
            @dragstart="handleDragStart($event, item)"
            @dragenter="handleDragEnter($event, item)"
            @dragover.prevent="handleDragover($event, item)"
            @drop="handleDrop($event, item)"
            @dragend="handleDragEnd($event, item)">
            <div  @click="showRecordEditDialog(item.studentId)">
              <img  class="i2" :src="girl" width="120px" alt=""   @click="showRecordEditDialog(item.studentId)" v-if="item.gender == 1 && item.correct == 0">
              <img class="i2" :src="weargirl"   width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 1 && item.correct == 1">
              <img class="i2" :src="boy"  width="120px" alt=""  @click="showRecordEditDialog(item.studentId)" v-else-if="item.gender == 0 && item.correct == 0">
              <img class="i2" :src="wearboy"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 0 && item.correct == 1">
              <img class="i2" :src="kong"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 2">
                <div class="name">
                  {{item.studentName}} {{item.avgRecord}}
                </div>
             </div>
             <div class="addBtn" @click="addMargin">
               <img  src="../../assets/image/jia.png"  v-if="!item.showMr"  :data-index="index2 +1">
               <img src="../../assets/image/jian.png" v-if="item.showMr"   :data-index="index2 +1">
             </div>
          </div>
        <div class="item" :class="{'mr20':item.mr, 'nopass': item1.vison  > item.avgRecord}"
        v-if="item1.num!== totalPai"
        v-for="(item) in divList.slice((item1.num -1) * 7, item1.num *7)" :key="item.id"
         draggable="true"
          @dragstart="handleDragStart($event, item)"
          @dragenter="handleDragEnter($event, item)"
          @dragover.prevent="handleDragover($event, item)"
          @drop="handleDrop($event, item)"
          @dragend="handleDragEnd($event, item)">
          <div  @click="showRecordEditDialog(item.studentId)">
            <img  class="i2" :src="girl"  width="120px" v-if="item.gender == 1 && item.correct == 0">
            <img class="i2" :src="weargirl"    width="120px" v-else-if="item.gender == 1 && item.correct == 1">
            <img class="i2" :src="boy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="i2" :src="wearboy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
            <img class="i2" :src="kong"   width="120px" alt="" v-else-if="item.gender == 2">
            <div class="name">
                {{item.studentName}} {{item.avgRecord}}
            </div>
         </div>
        </div>
      </div>
     <!-- 方式三-->
      <div class="outerBox" :class="{'bor': chooseStr.indexOf(item1.num) !== -1 }" v-for="(item1, index) in reversePai"  v-if="type == 8">
         <div class="titlePai">第{{item1.num}}排</div>
         <div class="item" :class="{'mr20':item.mr,'nopass': item1.vison  > item.avgRecord}"
              v-if="item1.num == totalPai"
              v-for="(item, index2) in divList.slice((item1.num- 1) * 8)" draggable="true"
             @dragstart="handleDragStart($event, item)"
             @dragenter="handleDragEnter($event, item)"
             @dragover.prevent="handleDragover($event, item)"
             @drop="handleDrop($event, item)"
             @dragend="handleDragEnd($event, item)">
             <div  @click="showRecordEditDialog(item.studentId)">
               <img  class="i2" :src="girl" width="120px" alt=""   @click="showRecordEditDialog(item.studentId)" v-if="item.gender == 1 && item.correct == 0">
               <img class="i2" :src="weargirl"   width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 1 && item.correct == 1">
               <img class="i2" :src="boy"  width="120px" alt=""  @click="showRecordEditDialog(item.studentId)" v-else-if="item.gender == 0 && item.correct == 0">
               <img class="i2" :src="wearboy"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 0 && item.correct == 1">
               <img class="i2" :src="kong"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 2">
                 <div class="name">
                   {{item.studentName}} {{item.avgRecord}}
                 </div>
              </div>
              <div class="addBtn" @click="addMargin">
                <img  src="../../assets/image/jia.png"  v-if="!item.showMr"  :data-index="index2 +1">
                <img src="../../assets/image/jian.png" v-if="item.showMr"   :data-index="index2 +1">
              </div>
           </div>
         <div class="item" :class="{'mr20':item.mr,'nopass': item1.vison  > item.avgRecord}"
         v-if="item1.num !== totalPai"
         v-for="(item) in divList.slice((item1.num -1) * 8, item1.num *8)" :key="item.id" draggable="true"
           @dragstart="handleDragStart($event, item)"
           @dragenter="handleDragEnter($event, item)"
           @dragover.prevent="handleDragover($event, item)"
           @drop="handleDrop($event, item)"
           @dragend="handleDragEnd($event, item)">
           <div  @click="showRecordEditDialog(item.studentId)">
              <img  class="i2" :src="girl"  width="120px" v-if="item.gender == 1 && item.correct == 0">
              <img class="i2" :src="weargirl"    width="120px" v-else-if="item.gender == 1 && item.correct == 1">
              <img class="i2" :src="boy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
              <img class="i2" :src="wearboy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
              <img class="i2" :src="kong"   width="120px" alt="" v-else-if="item.gender == 2">
              <div class="name">
                  {{item.studentName}} {{item.avgRecord}}
              </div>
           </div>
         </div>
       </div>
      <!-- 方式四 -->
      <div class="outerBox" :class="{'bor': chooseStr.indexOf(item1.num) !== -1 }"
       v-for="(item1, index) in reversePai"  v-if="type == 9">
        <div class="titlePai">第{{item1.num}}排</div>
        <div class="item" :class="{'mr20':item.mr,'nopass': item1.vison  > item.avgRecord}"
        v-if="item1.num == totalPai"
        v-for="(item, index2) in divList.slice((item1.num- 1) * 9)" draggable="true"
             @dragstart="handleDragStart($event, item)"
             @dragenter="handleDragEnter($event, item)"
             @dragover.prevent="handleDragover($event, item)"
             @drop="handleDrop($event, item)"
             @dragend="handleDragEnd($event, item)">
              <div  @click="showRecordEditDialog(item.studentId)">
                <img  class="i2" :src="girl" width="120px" alt=""   @click="showRecordEditDialog(item.studentId)" v-if="item.gender == 1 && item.correct == 0">
                <img class="i2" :src="weargirl"   width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 1 && item.correct == 1">
                <img class="i2" :src="boy"  width="120px" alt=""  @click="showRecordEditDialog(item.studentId)" v-else-if="item.gender == 0 && item.correct == 0">
                <img class="i2" :src="wearboy"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 0 && item.correct == 1">
                <img class="i2" :src="kong"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 2">
                  <div class="name">
                    {{item.studentName}} {{item.avgRecord}}
                  </div>
               </div>
               <div class="addBtn" @click="addMargin">
                 <img  src="../../assets/image/jia.png"  v-if="!item.showMr"  :data-index="index2 +1">
                 <img src="../../assets/image/jian.png" v-if="item.showMr"   :data-index="index2 +1">
               </div>
           </div>
         <div class="item" :class="{'mr20':item.mr,'nopass': item1.vison  > item.avgRecord}"
          v-if="item1.num !== totalPai"
          v-for="(item) in divList.slice((item1.num -1) * 9, item1.num *9)" :key="item.id" draggable="true"
           @dragstart="handleDragStart($event, item)"
           @dragenter="handleDragEnter($event, item)"
           @dragover.prevent="handleDragover($event, item)"
           @drop="handleDrop($event, item)"
           @dragend="handleDragEnd($event, item)">
           <div @click="showRecordEditDialog(item.studentId)">
              <img  class="i2" :src="girl"  width="120px" v-if="item.gender == 1 && item.correct == 0">
              <img class="i2" :src="weargirl"    width="120px" v-else-if="item.gender == 1 && item.correct == 1">
              <img class="i2" :src="boy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
              <img class="i2" :src="wearboy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
              <img class="i2" :src="kong"   width="120px" alt="" v-else-if="item.gender == 2">
              <div class="name">
                  {{item.studentName}} {{item.avgRecord}}
              </div>
           </div>
         </div>
      </div>
     </div>
     <!-- sortType 为1 可以调整位置 不能拆分列 -->
     <div v-if="this.sortType == 1">
       <!-- 方式一 -->
        <div class="outerBox" v-for="(item1, index) in reversePai"  v-if="type == 6" >
         <div class="titlePai">第{{item1.num}} 排</div>
         <div class="item" :class="{'mr20':item.mr, 'nopass': item1.vison  > item.avgRecord}"
             v-if="item1.num == totalPai"
             v-for="(item, index2) in divList.slice((item1.num- 1) * 6)"
             draggable="true"
             @dragstart="handleDragStart($event, item)"
             @dragenter="handleDragEnter($event, item)"
             @dragover.prevent="handleDragover($event, item)"
             @drop="handleDrop($event, item)"
             @dragend="handleDragEnd($event, item)">
             <div  @click="showRecordEditDialog(item.studentId)">
               <img  class="i2" :src="girl" width="120px" alt=""   @click="showRecordEditDialog(item.studentId)" v-if="item.gender == 1 && item.correct == 0">
               <img class="i2" :src="weargirl"   width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 1 && item.correct == 1">
               <img class="i2" :src="boy"  width="120px" alt=""  @click="showRecordEditDialog(item.studentId)" v-else-if="item.gender == 0 && item.correct == 0">
               <img class="i2" :src="wearboy"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 0 && item.correct == 1">
               <img class="i2" :src="kong"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 2">
                 <div class="name">
                   {{item.studentName}} {{item.avgRecord}}
                 </div>
              </div>
             <!-- <div class="addBtn" @click="addMargin">
                <img  src="../../assets/image/jia.png"  v-if="!item.showMr"  :data-index="index2 +1">
                <img src="../../assets/image/jian.png" v-if="item.showMr"   :data-index="index2 +1">
              </div> -->
           </div>
         <div class="item" :class="{'mr20':item.mr, 'nopass': item1.vison  > item.avgRecord }"
          v-if="item1.num !== totalPai"
          v-for="(item) in divList.slice((item1.num -1) * 6, item1.num * 6)" :key="item.id" draggable="true"
           @dragstart="handleDragStart($event, item)"
           @dragenter="handleDragEnter($event, item)"
           @dragover.prevent="handleDragover($event, item)"
           @drop="handleDrop($event, item)"
           @dragend="handleDragEnd($event, item)">
           <div  @click="showRecordEditDialog(item.studentId)">
             <img  class="i2" :src="girl"  width="120px" v-if="item.gender == 1 && item.correct == 0">
             <img class="i2" :src="weargirl"    width="120px" v-else-if="item.gender == 1 && item.correct == 1">
             <img class="i2" :src="boy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
             <img class="i2" :src="wearboy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
             <img class="i2" :src="kong"   width="120px" alt="" v-else-if="item.gender == 2">
             <div class="name">
                 {{item.studentName}} {{item.avgRecord}}
             </div>
          </div>
         </div>
       </div>
       <!-- 方式二 -->
        <div class="outerBox"  v-for="(item1, index) in reversePai"  v-if="type == 7">
          <div class="titlePai">第{{item1.num}} 排</div>
          <div class="item" :class="{'mr20':item.mr, 'nopass': item1.vison  > item.avgRecord}"
           v-if="item1.num == totalPai"
             v-for="(item, index2) in divList.slice((item1.num- 1) * 7)" draggable="true"
              @dragstart="handleDragStart($event, item)"
              @dragenter="handleDragEnter($event, item)"
              @dragover.prevent="handleDragover($event, item)"
              @drop="handleDrop($event, item)"
              @dragend="handleDragEnd($event, item)">
              <div  @click="showRecordEditDialog(item.studentId)">
                <img  class="i2" :src="girl" width="120px" alt=""   @click="showRecordEditDialog(item.studentId)" v-if="item.gender == 1 && item.correct == 0">
                <img class="i2" :src="weargirl"   width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 1 && item.correct == 1">
                <img class="i2" :src="boy"  width="120px" alt=""  @click="showRecordEditDialog(item.studentId)" v-else-if="item.gender == 0 && item.correct == 0">
                <img class="i2" :src="wearboy"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 0 && item.correct == 1">
                <img class="i2" :src="kong"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 2">
                  <div class="name">
                    {{item.studentName}} {{item.avgRecord}}
                  </div>
               </div>
              <!-- <div class="addBtn" @click="addMargin">
                 <img  src="../../assets/image/jia.png"  v-if="!item.showMr"  :data-index="index2 +1">
                 <img src="../../assets/image/jian.png" v-if="item.showMr"   :data-index="index2 +1">
               </div> -->
            </div>
          <div class="item" :class="{'mr20':item.mr, 'nopass': item1.vison  > item.avgRecord}"
          v-if="item1.num!== totalPai"
          v-for="(item) in divList.slice((item1.num -1) * 7, item1.num *7)" :key="item.id"
           draggable="true"
            @dragstart="handleDragStart($event, item)"
            @dragenter="handleDragEnter($event, item)"
            @dragover.prevent="handleDragover($event, item)"
            @drop="handleDrop($event, item)"
            @dragend="handleDragEnd($event, item)">
            <div  @click="showRecordEditDialog(item.studentId)">
              <img  class="i2" :src="girl"  width="120px" v-if="item.gender == 1 && item.correct == 0">
              <img class="i2" :src="weargirl"    width="120px" v-else-if="item.gender == 1 && item.correct == 1">
              <img class="i2" :src="boy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
              <img class="i2" :src="wearboy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
              <img class="i2" :src="kong"   width="120px" alt="" v-else-if="item.gender == 2">
              <div class="name">
                  {{item.studentName}} {{item.avgRecord}}
              </div>
           </div>
          </div>
        </div>
       <!-- 方式三-->
        <div class="outerBox" v-for="(item1, index) in reversePai"  v-if="type == 8">
           <div class="titlePai">第{{item1.num}}排</div>
           <div class="item" :class="{'mr20':item.mr,'nopass': item1.vison  > item.avgRecord}"
                v-if="item1.num == totalPai"
                v-for="(item, index2) in divList.slice((item1.num- 1) * 8)" draggable="true"
               @dragstart="handleDragStart($event, item)"
               @dragenter="handleDragEnter($event, item)"
               @dragover.prevent="handleDragover($event, item)"
               @drop="handleDrop($event, item)"
               @dragend="handleDragEnd($event, item)">
               <div  @click="showRecordEditDialog(item.studentId)">
                 <img  class="i2" :src="girl" width="120px" alt=""   @click="showRecordEditDialog(item.studentId)" v-if="item.gender == 1 && item.correct == 0">
                 <img class="i2" :src="weargirl"   width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 1 && item.correct == 1">
                 <img class="i2" :src="boy"  width="120px" alt=""  @click="showRecordEditDialog(item.studentId)" v-else-if="item.gender == 0 && item.correct == 0">
                 <img class="i2" :src="wearboy"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 0 && item.correct == 1">
                 <img class="i2" :src="kong"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 2">
                   <div class="name">
                     {{item.studentName}} {{item.avgRecord}}
                   </div>
                </div>
               <!-- <div class="addBtn" @click="addMargin">
                  <img  src="../../assets/image/jia.png"  v-if="!item.showMr"  :data-index="index2 +1">
                  <img src="../../assets/image/jian.png" v-if="item.showMr"   :data-index="index2 +1">
                </div> -->
             </div>
           <div class="item" :class="{'mr20':item.mr,'nopass': item1.vison  > item.avgRecord}"
           v-if="item1.num !== totalPai"
           v-for="(item) in divList.slice((item1.num -1) * 8, item1.num *8)" :key="item.id" draggable="true"
             @dragstart="handleDragStart($event, item)"
             @dragenter="handleDragEnter($event, item)"
             @dragover.prevent="handleDragover($event, item)"
             @drop="handleDrop($event, item)"
             @dragend="handleDragEnd($event, item)">
             <div  @click="showRecordEditDialog(item.studentId)">
                <img  class="i2" :src="girl"  width="120px" v-if="item.gender == 1 && item.correct == 0">
                <img class="i2" :src="weargirl"    width="120px" v-else-if="item.gender == 1 && item.correct == 1">
                <img class="i2" :src="boy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
                <img class="i2" :src="wearboy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
                <img class="i2" :src="kong"   width="120px" alt="" v-else-if="item.gender == 2">
                <div class="name">
                    {{item.studentName}} {{item.avgRecord}}
                </div>
             </div>
           </div>
         </div>
        <!-- 方式四 -->
        <div class="outerBox" v-for="(item1, index) in reversePai"  v-if="type == 9">
          <div class="titlePai">第{{item1.num}}排</div>
          <div class="item" :class="{'mr20':item.mr,'nopass': item1.vison  > item.avgRecord}"
          v-if="item1.num == totalPai"
          v-for="(item, index2) in divList.slice((item1.num- 1) * 9)" draggable="true"
               @dragstart="handleDragStart($event, item)"
               @dragenter="handleDragEnter($event, item)"
               @dragover.prevent="handleDragover($event, item)"
               @drop="handleDrop($event, item)"
               @dragend="handleDragEnd($event, item)">
                <div  @click="showRecordEditDialog(item.studentId)">
                  <img  class="i2" :src="girl" width="120px" alt=""   @click="showRecordEditDialog(item.studentId)" v-if="item.gender == 1 && item.correct == 0">
                  <img class="i2" :src="weargirl"   width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 1 && item.correct == 1">
                  <img class="i2" :src="boy"  width="120px" alt=""  @click="showRecordEditDialog(item.studentId)" v-else-if="item.gender == 0 && item.correct == 0">
                  <img class="i2" :src="wearboy"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 0 && item.correct == 1">
                  <img class="i2" :src="kong"  width="120px"   @click="showRecordEditDialog(item.studentId)" alt="" v-else-if="item.gender == 2">
                    <div class="name">
                      {{item.studentName}} {{item.avgRecord}}
                    </div>
                 </div>
                 <!-- <div class="addBtn" @click="addMargin">
                   <img  src="../../assets/image/jia.png"  v-if="!item.showMr"  :data-index="index2 +1">
                   <img src="../../assets/image/jian.png" v-if="item.showMr"   :data-index="index2 +1">
                 </div> -->
             </div>
           <div class="item" :class="{'mr20':item.mr,'nopass': item1.vison  > item.avgRecord}"
            v-if="item1.num !== totalPai"
            v-for="(item) in divList.slice((item1.num -1) * 9, item1.num *9)" :key="item.id" draggable="true"
             @dragstart="handleDragStart($event, item)"
             @dragenter="handleDragEnter($event, item)"
             @dragover.prevent="handleDragover($event, item)"
             @drop="handleDrop($event, item)"
             @dragend="handleDragEnd($event, item)">
             <div @click="showRecordEditDialog(item.studentId)">
                <img  class="i2" :src="girl"  width="120px" v-if="item.gender == 1 && item.correct == 0">
                <img class="i2" :src="weargirl"    width="120px" v-else-if="item.gender == 1 && item.correct == 1">
                <img class="i2" :src="boy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
                <img class="i2" :src="wearboy"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
                <img class="i2" :src="kong"   width="120px" alt="" v-else-if="item.gender == 2">
                <div class="name">
                    {{item.studentName}} {{item.avgRecord}}
                </div>
             </div>
           </div>
        </div>
       </div>

     <div class="jtWrap">
     <img src="../../assets/image/jiangtai.png">
   </div>
  </div>
  <el-dialog title="学生信息" :visible.sync="editRecordDialogVisible" >
    <el-form :model="editRecordForm" ref="recordEditFormRef" label-width="120px" >
      <el-form-item label="姓名">
          <el-input v-model="editRecordForm.studentName" disabled></el-input>
      </el-form-item>
      <el-form-item label="所属学校" >
          <el-input v-model="editRecordForm.schoolName"  disabled></el-input>
      </el-form-item>
      <el-form-item label="所属班级" >
          <el-input v-model="editRecordForm.classesName" disabled></el-input>
      </el-form-item>
      <el-form-item label="左眼裸眼视力">
          <el-input v-model="editRecordForm.visionLeft" disabled></el-input>
      </el-form-item>
       <el-form-item label="右眼裸眼视力">
          <el-input v-model="editRecordForm.visionRight" disabled></el-input>
      </el-form-item>
      <el-form-item label="左眼矫正视力">
          <el-input v-model="editRecordForm.cvaLeft" disabled></el-input>
      </el-form-item>
       <el-form-item label="右眼矫正视力">
          <el-input  v-model="editRecordForm.cvaRight" disabled></el-input>
      </el-form-item>
      <el-form-item label="身高">
          <el-input v-model="editRecordForm.height" disabled></el-input>
      </el-form-item>
      <el-form-item label="左眼曲率">
          <el-input  v-model="editRecordForm.curvatureLeft" disabled></el-input>
      </el-form-item>
       <el-form-item label="右眼曲率">
          <el-input  v-model="editRecordForm.curvatureRight" disabled></el-input>
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
       this.sortType = this.$route.query.sortType;
       for(let i = 0; i < this.type; i++) {
         this.showArr.push(false)
       }
       this.getSeatTable();
     },
    data() {
      return {
            girl: require("../../assets/image/girl.png"),
            weargirl: require("../../assets/image/weargirl.png"),
            boy: require("../../assets/image/boy.png"),
            wearboy: require("../../assets/image/wearboy.png"),
            kong: require("../../assets/image/kong.png"),
        	  divList: [],
        		dragging: null,
            hasDistance: false,
            totalPai: 0,
            reversePai: [],
            visonArr: [0.5,0.6,0.7,0.8,0.9,1.0],
            remind: true,
            t: 0,
            mrShow: false,
            showArr: [],
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
              classesName:''
          },
          floorNum: 0,
          topNum: 0,
          chooseStr: '',
      }
    },
    methods:{
      //编辑出现编辑页面
      showRecordEditDialog(id) {
       if(id) {
         // this.$refs.box.scrollTop = this.scrollTop;
          let param = new URLSearchParams();
          param.append('id', id);
          param.append('token',this.token)
          axios({
              method: 'post',
              url: '/lightspace/studentRecord',
              data: param
          }).then(this.handleEditRecordSucc.bind(this))
          .catch(this.handleEditRecordErr.bind(this))
          }
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
      addMargin(e) {
        let t = Number(e.target.dataset.index);
        let temDivList = this.divList;
        let num = (this.totalPai - 1) * this.type;
        let ar = temDivList.slice(num);
         for(let j = 0; j < ar.length; j++) {
           if(j == (t-1)) {
             ar[j].showMr = !ar[j].showMr
           }
         }
         let myShow = ar[t -1];
         temDivList.splice(num, (num + Number(this.type)),...ar );
            if(this.type == 6) {    //方式一
              for(let i = 0; i < temDivList.length; i++) {
                if(i % 6 == t) {
                  this.$forceUpdate();
                 this.$set(temDivList[i-1], 'mr', ar[t-1].showMr)
                }
              }
            }else if(this.type == 7) {    //方式二
              for(let i = 0; i < temDivList.length; i++) {
                if(i % 7 == t) {
                  this.$forceUpdate();
                 this.$set(temDivList[i-1], 'mr',  ar[t-1].showMr )
                }
              }
            }
            else if(this.type == 8) {    //方式三
              for(let i = 0; i < temDivList.length; i++) {
                if(i % 8 == t) {
                  this.$forceUpdate();
                 this.$set(temDivList[i-1], 'mr',  ar[t-1].showMr )
                }
              }
            }else if(this.type == 9) {    //方式四
              for(let i = 0; i < temDivList.length; i++) {
                if(i % 9 == t) {
                  this.$forceUpdate();
                  this.$set(temDivList[i-1], 'mr',  ar[t-1].showMr )
                }
              }
            }

            this.divList = temDivList;
      },
      changeState() {
        let that = this;
        that.remind = false;
      },
      saveResult() {
        let  sortStu = this.divList;
        let sortArr = [];
        let mrArr = [];
        sortStu.forEach((item, index) => {
          if(!item.studentId) { // 如果是空位存储的 studnetId 为0
            item.studentId = 'm' + index;
          }
          sortArr.push(item.studentId.toString())
        })
        sortStu.forEach((item, index) => {
           if(item.mr)  {
             mrArr.push("1")
          }else {
            mrArr.push("0")
          }
        })
        let param = new FormData();
        param.append('token', this.token);
        param.append('classId', this.classId);
        param.append('sort',sortArr);
        param.append('mr',mrArr)
        param.append('type', this.type);

        axios({
              method: 'post',
              data: param,
              url: '/lightspace/saveSort'
          }).then((res) => {
            //console.log(res)
            if(res.data.status == 200) {
                this.$message({
                  message: '恭喜你,修改座位保存成功',
                  type: 'success'
                });
            }
          }).catch((err) => {
            console.log(err)
          })
      },
      handleDragStart(e, item) {
        this.dragging = item;
        if(this.sortType == 2) {
           this.selectedSeat();
        }

      },
      // 当被鼠标拖动的对象进入其容器范围内时触发此事件
      handleDragEnter(e) {
        // 为需要移动的元素设置dragstart事件
        e.dataTransfer.effectAllowed = 'move'
      },
      // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
      handleDragover(e) {
        // 首先把div变成可以放置的元素，即重写dragenter/dragover
        // 在dragenter中针对放置目标来设置!
        e.dataTransfer.dropEffect = 'move'
      },
      // 当放置被拖元素时
      handleDrop(e, item) {
        this.topNum = 0;
        this.floorNum = 0;
        this.chooseStr = '';
        // 拖拽完成去除边框
        e.dataTransfer.dropEffect = 'move'
        if(item === this.dragging){
          return
        }
        const newItems = [...this.divList]
        const from = newItems.indexOf(this.dragging)
        const to = newItems.indexOf(item)
        newItems[from] = item;
        // 交换彼此的mr
        let toMr = this.dragging.mr;
        let fromMr = item.mr;
        this.dragging.mr = fromMr;
        item.mr = toMr;
        newItems[to] = this.dragging;
        this.divList = newItems;
      },
      // 完成元素拖动后触发
      handleDragEnd() {
        this.dragging = null
      },
      getSeatTable() {
        let param = new URLSearchParams();
         if(this.sortType == 1) {
           param.append('token', this.token);
           param.append('classId', this.classId);
           axios({
                 method: 'post',
                 data: param,
                 url: '/lightspace/adjustSort'
             }).then(this.handleAdjustSucc.bind(this)).catch((err) => {console.log(err)})
         }else if(this.sortType == 2) {
           param.append('token', this.token);
           param.append('classId', this.classId);
           param.append('time', this.time * 86400);
           param.append('type', this.type);
           axios({
                 method: 'post',
                 data: param,
                 url: '/lightspace/sortList'
             }).then(this.handleGetSeatQuerySucc.bind(this)).catch((err) => {console.log(err)})

         }
      },
      handleAdjustSucc(res) {
        if(res.data.status == 200) {
          this.divList = res.data.data;
          // this.divList.forEach((item, index) => {
          //   item.mr = false
          // })
          // let showArr = this.showArr;
          // let temDiv = this.divList;
          // let num = (this.totalPai - 1) * this.type;
          // let ar = temDiv.slice(num);
          // for(let j = 0; j < ar.length; j++) {
          //   ar[j].showMr = false;
          // }
          this.changeBelongs()
        }
      },
      handleGetSeatQuerySucc(res) {
         console.log(res.data.data, 'seat')
        if(res.data.status !== 200) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
        } else if(res.data.status == 200) {
           if(res.data.data.length == 0) return this.$message.error('请先添加学生');
           this.divList =res.data.data.data;
           this.id = res.data.data.id;
           this.sort_group = res.data.data.sort_group;
           this.divList.forEach((item, index) => {
             item.mr = false
           })
           let showArr = this.showArr;
           let temDiv = this.divList;
           let num = (this.totalPai - 1) * this.type;
           let ar = temDiv.slice(num);
           for(let j = 0; j < ar.length; j++) {
             ar[j].showMr = false;
           }
           this.id = res.data.data.id;
           this.changeBelongs()
        } else if(res.data.status =10216) {
           this.$message.error(res.data.msg);
        }
     },
      selectedSeat() {
        let chooseStu = this.dragging;
        let group = this.sort_group;
        let selectGroup = 0;
        let reduce = 0;
        let sum = 0;
        let chooseStr = '';
        for(let i = 0; i < group.length; i++) {
          for(let j = 0; j < group[i].length; j++) {
            if(group[i][j].studentId == chooseStu.studentId) {
              selectGroup = i;
            }
          }
        }
        for(let k = 0; k <= selectGroup; k++) {
          sum += group[k].length
        }
        for(let z = 0; z < selectGroup;z++) {
           reduce += group[z].length;
        }
        // console.log(sum ,reduce)
        this.topNum = Math.ceil(sum / this.type);
        this.floorNum = Math.ceil(reduce / this.type);
        //console.log( this.topNum, this.floorNum)
       for(let b = this.floorNum; b <= this.topNum; b++) {
          chooseStr += b;
       }
       this.chooseStr = chooseStr;
       //console.log(this.chooseStr, 99)
      },
      getReversePai() {
        let totalNum = [];
        let vison = 0.5;
        for(let t = 0; t < this.totalPai; t++) {
          if(t == 0) {
            vison = 0.5
          }else if(t == 1) {
            vison = 0.6
          }else if(t == 2) {
            vison = 0.7
          }else if(t == 3) {
            vison = 0.8
          }else if(t == 4) {
            vison =  0.9
          }else  {
            vison =  1
          }
           totalNum.push({
             num: t + 1,
             vison: vison
           })
        }
        let change = totalNum.reverse();
        this.reversePai = totalNum;
      },
      changeBelongs() {
        this.reversePai = []; //先清空循环
        let visonArr= [0.5,0.6,0.7,0.8,0.9,1.0];
        let newArr = [];
       this.totalPai = Math.ceil(this.divList.length / this.type);
       let total = this.totalPai;
       let com = this.visonArr.length;
       if(com < total) {
         for(let k = com; k < total; k++) {
           this.visonArr.push(1.0);
           visonArr.push(1.0)
         }
       }
      let t = this.totalPai * this.type - this.divList.length;
      for(let i = 0; i < t; i++) {
         this.divList.push({
            studentName: '',
            gender: 2,
            mr: false
         })
       }
       this.getReversePai();
    }
  }
}
</script>
<style lang="less">
  .titlePai {
    width: 80px;
  }
  .bor {
    border: 1px solid red;
  }
  .nopass {
    border: 2px solid green;
  }
  .addBtn {
    position: absolute;
    top: 0;
    right: -20px;
    width: 20px;
    height: 20px;
  }
  .addBtn > img {
    width: 100%;
    height: 100%;
  }
 .imgRemBox {
    width: 100%;
    height: 400px;
    background-size: 100% 100%;
    background-image: url("../../assets/image/tuozhuai.gif");
  }
 .imgRemBox > img {
    width: 100%;
    height: 100%;
 }
 .imgTitle {
    font-size: 18px;
    line-height: 30px;
    text-align: left;
    margin: 10px 0;
  }
 .remindBox {
    width: 800px;
    position: absolute;
    left: 50%;
    top:10%;
    margin-left: -400px;
    margin-top: -100px;
    z-index: 99;
    background: #fff;
    text-align: center;
    padding: 30px;
  }
 .mianWrap {
      background: #8f8879;
      padding: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
   }
   .innerWrap {
     padding: 50rpx;
     margin: 0 auto;
   }
 .outerBox {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-weight: bold;
    box-sizing: border-box;
  }
.item {
	display: inline-block;
	margin-left: 20px;
	margin-bottom: 20px;
  position: relative;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.name {
  position: absolute;
  bottom: 24%;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 16px;
  color:#000000;
  font-weight: bold;
}
.mr20 {
  margin-right: 60px;
}
.titleWrap {
  margin: 20px ;
  display: flex;
  align-items: center;
}
.title {
  font-size: 30px;
  font-weight: bold;
  line-height: 40px;
  margin: 0 50px;
}
.i2 {
  pointer-events: none;
  display: inline-block;
}
.imgWrap {
  width: 80%;
  margin: 20px;
}
.imgWrap > img {
  width: 100%;
  height: 100%;
}
.jtWrap {
  width: 60%;
  margin: 30px;
}
.jtWrap > img {
  width: 100%;
  height: 100%;
}
.bg2 {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 10;
  -moz-opacity: 0.7;
  opacity: 0.70;
  filter: alpha(opacity=70);
}
</style>
