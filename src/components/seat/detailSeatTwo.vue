<template>
  <div class="mianWrap">
    <div class="innerWrap">
     <!-- 方式一 -->
    <div class="outerBox" v-for="item1 in reversePai" v-if="type == 1">
       <!-- 最后一排 -->
      <div class="item" :class="{mr20: item.mr}" v-if="item1 == totalPai" v-for="(item) in divList.slice((item1 -1) *8)" :key="item.id" draggable="true"
          @dragstart="handleDragStart($event, item)"
          @dragenter="handleDragEnter($event, item)"
          @dragover.prevent="handleDragover($event, item)"
          @drop="handleDrop($event, item)"
          @dragend="handleDragEnd($event, item)">
         <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
         <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
         <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
          <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
         <div class="name">
            {{item.studentName}} {{item1}}
         </div>
      </div>
     <div class="item" :class="{mr20: item.mr}"  v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1 -1) * 8, item1 *8)" :key="item.id" draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragover.prevent="handleDragover($event, item)"
        @drop="handleDrop($event, item)"
        @dragend="handleDragEnd($event, item)">
           <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
           <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
           <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
           <div class="name">
              {{item.studentName}}
           </div>
      </div>
    </div>
      <!-- 方式二 -->
   <div class="outerBox" v-for="(item1, index) in reversePai"  v-if="type == 2">
      <div class="item" :class="{mr20: item.mr}" v-if="item1 == totalPai" v-for="(item) in divList.slice((item1 -1) * 9)" :key="item.id" draggable="true"
          @dragstart="handleDragStart($event, item)"
          @dragenter="handleDragEnter($event, item)"
          @dragover.prevent="handleDragover($event, item)"
          @drop="handleDrop($event, item)"
          @dragend="handleDragEnd($event, item)">
             <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
             <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
             <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
              <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
             <div class="name">
                {{item.studentName}}
             </div>
        </div>

      <div class="item" :class="{mr20: item.mr}" v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1 -1) * 9, item1 *9)" :key="item.id" draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragover.prevent="handleDragover($event, item)"
        @drop="handleDrop($event, item)"
        @dragend="handleDragEnd($event, item)">
           <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
           <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
           <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
           <div class="name">
              {{item.studentName}}
           </div>
      </div>
    </div>
    <!-- 方式三-->
   <div class="outerBox" v-for="(item1, index) in reversePai"  v-if="type == 3">
      <div class="item" :class="{mr20: item.mr}"  v-if="item1 == totalPai" v-for="(item) in divList.slice((item1- 1) * 6)" :key="item.id" draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragover.prevent="handleDragover($event, item)"
        @drop="handleDrop($event, item)"
        @dragend="handleDragEnd($event, item)">
           <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
           <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
           <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
           <div class="name">
              {{item.studentName}}
           </div>
      </div>
      <div class="item" :class="{mr20: item.mr}"  v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1- 1) * 6, item1 *6)" :key="item.id" draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragover.prevent="handleDragover($event, item)"
        @drop="handleDrop($event, item)"
        @dragend="handleDragEnd($event, item)">
           <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
           <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
           <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
           <div class="name">
              {{item.studentName}}
           </div>
      </div>
    </div>
    <!-- 方式四 -->
   <div class="outerBox" v-for="(item1, index) in reversePai"  v-if="type == 4">
      <div class="item" :class="{mr20: item.mr}" v-if="item1 == totalPai" v-for="(item) in divList.slice((item1 -1) * 6)" :key="item.id" draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragover.prevent="handleDragover($event, item)"
        @drop="handleDrop($event, item)"
        @dragend="handleDragEnd($event, item)">
           <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
           <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
           <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
           <div class="name">
              {{item.studentName}}
           </div>
      </div>
      <div class="item" :class="{mr20: item.mr}" v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1 -1) * 6, item1 *6)" :key="item.id" draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragover.prevent="handleDragover($event, item)"
        @drop="handleDrop($event, item)"
        @dragend="handleDragEnd($event, item)">
           <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
           <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
           <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
           <div class="name">
              {{item.studentName}}
           </div>
      </div>
    </div>
   </div>
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
        	  divList: [],
        		dragging: null,
            hasDistance: false,
            totalPai: 0,
            reversePai: []
      }
    },
    methods:{
        handleDragStart(e, item) {
            this.dragging = item
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
            e.dataTransfer.dropEffect = 'move'
            if(item === this.dragging){
              return
            }
            const newItems = [...this.divList]
            const from = newItems.indexOf(this.dragging)
            const to = newItems.indexOf(item)
            newItems[from] = item
            newItems[to] = this.dragging
            this.divList = newItems;
            this.changeBelongs();
          },
          // 完成元素拖动后触发
          handleDragEnd() {
            this.dragging = null
          },
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

            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
               if(res.data.data.length == 0) return this.$message.error('请先添加学生');
               this.divList =res.data.data;
              this.changeBelongs()
            } else if(res.data.status =10216) {
               this.$message.error(res.data.msg);
            }


         },
         handleGetSeatQueryErr(err) {
             console.log(err)
         },
         // 移动完位置后修改修改属性
         changeBelongs() {
           this.reversePai = []; //先清空循环
           let temDivList = this.divList;
            temDivList.forEach((item, index) => {
              item.mr = false
            })
           if(this.type == 1) { // 方式一
              this.totalPai = Math.ceil(this.divList.length / 8);
          for(let t = 0; t< this.totalPai; t++) {
                let num = this.totalPai - t;
                this.reversePai.push(num)
              }
             for(let i = 0; i< temDivList.length; i++) {
               if(i % 8 == 0) {
                temDivList[i + 2].mr = true;
                temDivList[i + 4].mr = true;
               }
             }
           }else if(this.type == 2) {    //方式二
              this.totalPai = Math.ceil(this.divList.length / 9);
             for(let t = 0; t< this.totalPai; t++) {
                   let num = this.totalPai - t;
                   this.reversePai.push(num)
                 }
             for(let i = 0; i< temDivList.length; i++) {
               if(i % 9 == 0) {
                temDivList[i + 2].mr = true;
                temDivList[i + 5].mr = true;
               }
             }
           }else if(this.type == 3) {  //方式三
              this.totalPai = Math.ceil(this.divList.length / 6);
             for(let t = 0; t< this.totalPai; t++) {
                   let num = this.totalPai - t;
                   this.reversePai.push(num)
                 }
             for(let i = 0; i< temDivList.length; i++) {
               if(i % 6 == 0) {
                temDivList[i].mr = true;
                temDivList[i + 2].mr = true;
                temDivList[i + 4].mr = true;
               }
             }
           }else if(this.type == 4) {  //方式四
              this.totalPai = Math.ceil(this.divList.length / 6);
              for(let t = 0; t< this.totalPai; t++) {
                    let num = this.totalPai - t;
                    this.reversePai.push(num)
                  }
             for(let i = 0; i< temDivList.length; i++) {
               if(i % 6 == 0) {
                temDivList[i + 1].mr = true;
                temDivList[i + 2].mr = true;
                temDivList[i + 3].mr = true;
               }
             }
           }
           this.divList = temDivList;
         }
    }
    }
</script>
<style lang="less">
  .mianWrap {
      background: #8f8879;
      padding: 100px;
      display: flex;
      justify-content: center;
   }
   .innerWrap {
     padding: 50rpx;
     margin: 0 auto;
   }
  .outerBox {
    display: flex;
    flex-wrap: wrap;
  }
.item {
	display: inline-block;
	margin-left: 20px;
	margin-bottom: 20px;
  position: relative;
	// width: 200px;
	// height: 200px;

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
</style>
