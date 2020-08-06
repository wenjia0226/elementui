<template>
  <div>
    <div class="mianWrap">
      <div class="imgWrap">
        <img src="../../assets/image/bg3.png">
      </div>
    <div class="innerWrap">
     <!-- 方式一 -->
    <div class="outerBox" v-for="item1 in reversePai" v-if="type == 1">
       <!-- 最后一排 -->
      <div class="item" :class="{mr20: item.mr}" v-if="item1 == totalPai" v-for="(item) in divList.slice((item1 -1) *8)" :key="item.id">
         <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
         <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
         <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
          <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
         <div class="name">
            {{item.studentName}}
         </div>
      </div>
     <div class="item" :class="{mr20: item.mr}"  v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1 -1) * 8, item1 *8)" :key="item.id">
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
      <div class="item" :class="{mr20: item.mr}" v-if="item1 == totalPai" v-for="(item) in divList.slice((item1 -1) * 9)" :key="item.id">
         <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
         <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
         <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
          <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
         <div class="name">
            {{item.studentName}}
         </div>
       </div>
      <div class="item" :class="{mr20: item.mr}" v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1 -1) * 9, item1 *9)" :key="item.id">
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
      <div class="item" :class="{mr20: item.mr}"  v-if="item1 == totalPai" v-for="(item) in divList.slice((item1- 1) * 6)" :key="item.id">
           <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
           <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
           <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
           <div class="name">
              {{item.studentName}}
           </div>
      </div>
      <div class="item" :class="{mr20: item.mr}"  v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1- 1) * 6, item1 *6)" :key="item.id">
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
      <div class="item" :class="{mr20: item.mr}" v-if="item1 == totalPai" v-for="(item) in divList.slice((item1 -1) * 6)" :key="item.id">
           <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
           <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
           <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
           <div class="name">
              {{item.studentName}}
           </div>
      </div>
      <div class="item" :class="{mr20: item.mr}" v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1 -1) * 6, item1 *6)" :key="item.id">
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
   <div class="jtWrap">
     <img src="../../assets/image/jiangtai.png">
   </div>
  </div>
 </div>
</template>
<script>
import axios from 'axios'
export default {
   created() {
       this.token = window.sessionStorage.getItem('token');
       this.id = this.$router.history.current.query.id;
       this.type = this.$router.history.current.query.type;
       this.getSeatTable();
       console.log(this.type)
     },
    data() {
      return {
        	  divList: [],
        		dragging: null,
            hasDistance: false,
            totalPai: 0,
            reversePai: [],
      }
    },
    methods:{
      getSeatTable() {
        let param = new URLSearchParams();
         param.append('token', this.token);
         param.append('sortId', this.id);
         axios({
             method: 'post',
             data: param,
             url: '/lightspace/showSort'
         }).then(this.handleGetSeatQuerySucc.bind(this)).catch(this.handleGetSeatQueryErr.bind(this))
       },
      handleGetSeatQuerySucc(res) {
       console.log(res)
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
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 30px;
  font-weight: bold;
  line-height: 40px;
  margin: 0 50px;
}
.img {
  pointer-events: none;
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
</style>
