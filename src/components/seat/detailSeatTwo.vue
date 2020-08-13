<template>
  <div style="position: relative">
    <div class="bg2"  v-if="remind" @click="changeState"></div>
    <div class="remindBox" v-if="remind">
      <div class="imgRemBox"></div>
         <div class="imgTitle">  您可以拖拽调整学生位置,拖拽完成后请按左上角保存按钮,保存此次调整结果，否则将不会保存此次拖拽效果。</div>
        <el-button type="primary" @click="changeState">我知道了</el-button>
    </div>
    <div class="titleWrap">
      <!-- <div class="title">
        您可以拖拽调整学生位置,拖拽完成后请按右上角保存按钮,保存此次调整结果，否则将不会保存此次拖拽效果。
      </div> -->
      <div class="btnWrap">
        <el-button type="primary" @click="saveResult">保存拖拽效果</el-button>
      </div>
    </div>
    <div class="mianWrap">
      <div class="imgWrap">
        <img src="../../assets/image/bg3.png">
      </div>
    <div class="innerWrap">
     <!-- 方式一 -->
    <div class="outerBox" :class="{'bor': item1 == (topNum || floorNum)}" v-for="(item1, index) in reversePai"  v-if="type == 6" >
       <div>第{{item1}} 排</div>
       <div class="item" :class="{'mr20':item.mr}" v-if="item1 == totalPai" v-for="(item, index2) in divList.slice((item1- 1) * 6)"  draggable="true"
           @click="showRecordEditDialog(item.studentId)"
           @dragstart="handleDragStart($event, item)"
           @dragenter="handleDragEnter($event, item)"
           @dragover.prevent="handleDragover($event, item)"
           @drop="handleDrop($event, item)"
           @dragend="handleDragEnd($event, item)">
              <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
              <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
              <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
              <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
              <img class="img" src="../../assets/image/kong.png"  width="120px" alt="" v-else-if="item.gender == 2">
              <div class="name">
                 {{item.studentName}}
              </div>
              <div class="addBtn">
                <img src="../../assets/image/jia.png" @click="addMargin"  :data-index="index2 +1">
              <!--  <img src="../../assets/image/jian.png" v-if="mrShow"  @click="reduceMargin"  :data-index="index2 +1"> -->
              </div>
         </div>
       <div class="item" :class="{'mr20':item.mr}" v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1 -1) * 6, item1 * 6)" :key="item.id" draggable="true"
         @click="showRecordEditDialog(item.studentId)"
         @dragstart="handleDragStart($event, item)"
         @dragenter="handleDragEnter($event, item)"
         @dragover.prevent="handleDragover($event, item)"
         @drop="handleDrop($event, item)"
         @dragend="handleDragEnd($event, item)">
            <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
            <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
            <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
            <img class="img" src="../../assets/image/kong.png"  width="120px" alt="" v-else-if="item.gender == 2">
            <div class="name">
               {{item.studentName}}
            </div>
       </div>
     </div>
      <!-- 方式二 -->
    <div class="outerBox" v-for="(item1, index) in reversePai"  v-if="type == 7">
      <div>第{{item1}} 排</div>
      <div class="item" :class="{'mr20':item.mr}" v-if="item1 == totalPai" v-for="(item, index2) in divList.slice((item1- 1) * 7)" draggable="true"
          @click="showRecordEditDialog(item.studentId)"
          @dragstart="handleDragStart($event, item)"
          @dragenter="handleDragEnter($event, item)"
          @dragover.prevent="handleDragover($event, item)"
          @drop="handleDrop($event, item)"
          @dragend="handleDragEnd($event, item)">
             <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
             <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
             <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
             <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
             <img class="img" src="../../assets/image/kong.png"  width="120px" alt="" v-else-if="item.gender == 2">
             <div class="name">
                {{item.studentName}}
             </div>
             <div class="addBtn">
               <img src="../../assets/image/jia.png"  @click="addMargin" :data-index="index2 +1">
             </div>
        </div>
      <div class="item" :class="{'mr20':item.mr}" v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1 -1) * 7, item1 *7)" :key="item.id" draggable="true"
        @click="showRecordEditDialog(item.studentId)"
        @dragstart="handleDragStart($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragover.prevent="handleDragover($event, item)"
        @drop="handleDrop($event, item)"
        @dragend="handleDragEnd($event, item)">
           <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
           <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
           <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
           <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
            <img class="img" src="../../assets/image/kong.png"  width="120px" alt="" v-else-if="item.gender == 2">
           <div class="name">
              {{item.studentName}}
           </div>
      </div>
    </div>
    <!-- 方式三-->
    <div class="outerBox" v-for="(item1, index) in reversePai"  v-if="type == 8">
       <div>第{{item1}} 排</div>
       <div class="item" :class="{'mr20':item.mr}" v-if="item1 == totalPai" v-for="(item, index2) in divList.slice((item1- 1) * 8)" draggable="true"
           @click="showRecordEditDialog(item.studentId)"
           @dragstart="handleDragStart($event, item)"
           @dragenter="handleDragEnter($event, item)"
           @dragover.prevent="handleDragover($event, item)"
           @drop="handleDrop($event, item)"
           @dragend="handleDragEnd($event, item)">
              <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
              <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
              <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
              <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
              <img class="img" src="../../assets/image/kong.png"  width="120px" alt="" v-else-if="item.gender == 2">
              <div class="name">
                 {{item.studentName}}
              </div>
              <div class="addBtn">
                <img src="../../assets/image/jia.png"  @click="addMargin" :data-index="index2 +1">
              </div>
         </div>
       <div class="item" :class="{'mr20':item.mr}" v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1 -1) * 8, item1 *8)" :key="item.id" draggable="true"
         @click="showRecordEditDialog(item.studentId)"
         @dragstart="handleDragStart($event, item)"
         @dragenter="handleDragEnter($event, item)"
         @dragover.prevent="handleDragover($event, item)"
         @drop="handleDrop($event, item)"
         @dragend="handleDragEnd($event, item)">
            <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
            <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
            <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
            <img class="img" src="../../assets/image/kong.png"  width="120px" alt="" v-else-if="item.gender == 2">
            <div class="name">
               {{item.studentName}}
            </div>
       </div>
     </div>
    <!-- 方式四 -->
    <div class="outerBox" v-for="(item1, index) in reversePai"  v-if="type == 9">
      <div>第{{item1}} 排</div>
      <div class="item" :class="{'mr20':item.mr}" v-if="item1 == totalPai" v-for="(item, index2) in divList.slice((item1- 1) * 9)" draggable="true"
           @click="showRecordEditDialog(item.studentId)"
           @dragstart="handleDragStart($event, item)"
           @dragenter="handleDragEnter($event, item)"
           @dragover.prevent="handleDragover($event, item)"
           @drop="handleDrop($event, item)"
           @dragend="handleDragEnd($event, item)">
              <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
              <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
              <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
              <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
              <img class="img" src="../../assets/image/kong.png"  width="120px" alt="" v-else-if="item.gender == 2">
              <div class="name">
                 {{item.studentName}}
              </div>
              <div class="addBtn">
                <img src="../../assets/image/jia.png"  @click="addMargin" :data-index="index2 +1">
              </div>
         </div>
       <div class="item" :class="{'mr20':item.mr}" v-if="item1 !== totalPai" v-for="(item) in divList.slice((item1 -1) * 9, item1 *9)" :key="item.id" draggable="true"
         @click="showRecordEditDialog(item.studentId)"
         @dragstart="handleDragStart($event, item)"
         @dragenter="handleDragEnter($event, item)"
         @dragover.prevent="handleDragover($event, item)"
         @drop="handleDrop($event, item)"
         @dragend="handleDragEnd($event, item)">
            <img  class="img" src="../../assets/image/girl.png"  width="120px" alt="" v-if="item.gender == 1 && item.correct == 0">
            <img class="img" src="../../assets/image/weargirl.png"  width="120px" alt="" v-else-if="item.gender == 1 && item.correct == 1">
            <img class="img" src="../../assets/image/boy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 0">
            <img class="img" src="../../assets/image/wearboy.png"  width="120px" alt="" v-else-if="item.gender == 0 && item.correct == 1">
            <img class="img" src="../../assets/image/kong.png"  width="120px" alt="" v-else-if="item.gender == 2">
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
          <el-form-item label="坐高">
              <el-input v-model="editRecordForm.sittingHeight" disabled></el-input>
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
       this.getSeatTable();
     },
    data() {
      return {
        	  divList: [],
        		dragging: null,
            hasDistance: false,
            totalPai: 0,
            reversePai: [],
            remind: true,
            t: 0,
            mrShow: false,
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
          topNum: 0
      }
    },
    methods:{
      //编辑出现编辑页面
      showRecordEditDialog(id) {
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
      reduceMargin(e) {
        this.mrShow = false;
        let t = Number(e.target.dataset.index);
        this.mrShow = !this.mrShow;
        let temDivList = this.divList;
        if(this.type == 6) {    //方式一
          for(let i = 0; i < temDivList.length; i++) {
            if(i % 6 == t) {
              this.$forceUpdate();
             this.$set(temDivList[i-1], 'mr', this.mrShow )
            }
          }
        }else if(this.type == 7) {    //方式二
          for(let i = 0; i < temDivList.length; i++) {
            if(i % 7 == t) {
              this.$forceUpdate();
             this.$set(temDivList[i-1], 'mr', this.mrShow )
            }
          }
        }
        else if(this.type == 8) {    //方式三
          for(let i = 0; i < temDivList.length; i++) {
            if(i % 8 == t) {
              this.$forceUpdate();
             this.$set(temDivList[i-1], 'mr', this.mrShow )
            }
          }
        }else if(this.type == 9) {    //方式四
          for(let i = 0; i < temDivList.length; i++) {
            if(i % 9 == t) {
              this.$forceUpdate();
              this.$set(temDivList[i-1], 'mr', this.mrShow )
            }
          }
        }
        this.divList = temDivList;
      },
      addMargin(e) {
           this.mrShow = true;
            let t = Number(e.target.dataset.index);
            let temDivList = this.divList;
            if(this.type == 6) {    //方式一
              for(let i = 0; i < temDivList.length; i++) {
                if(i % 6 == t) {
                  this.$forceUpdate();
                 this.$set(temDivList[i-1], 'mr', this.mrShow )
                }
              }
            }else if(this.type == 7) {    //方式二
              for(let i = 0; i < temDivList.length; i++) {
                if(i % 7 == t) {
                  this.$forceUpdate();
                 this.$set(temDivList[i-1], 'mr', this.mrShow )
                }
              }
            }
            else if(this.type == 8) {    //方式三
              for(let i = 0; i < temDivList.length; i++) {
                if(i % 8 == t) {
                  this.$forceUpdate();
                 this.$set(temDivList[i-1], 'mr', this.mrShow )
                }
              }
            }else if(this.type == 9) {    //方式四
              for(let i = 0; i < temDivList.length; i++) {
                if(i % 9 == t) {
                  this.$forceUpdate();
                  this.$set(temDivList[i-1], 'mr', this.mrShow )
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
        console.log(sortStu)
        sortStu.forEach((item, index) => {
          if(!item.studentId) { // 如果是空位存储的 studnetId 为0
            item.studentId = 'm' + index;
          }
          console.log(sortArr, 888)
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
        param.append('id', this.id);
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
        this.selectedSeat();
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
        newItems[from] = item;
        // 交换彼此的mr
        let toMr = this.dragging.mr;
        let fromMr = item.mr;
        this.dragging.mr = fromMr;
        item.mr = toMr;
        newItems[to] = this.dragging;
        this.divList = newItems;
        this.topNum = 0;
        this.floorNum = 0;
      },
      // 完成元素拖动后触发
      handleDragEnd() {
        this.dragging = null
      },
      getSeatTable() {
        let param = new URLSearchParams();
         param.append('token', this.token);
         param.append('classId', this.classId);
         param.append('time', this.time * 86400);
         param.append('type', this.type);
         axios({
             method: 'post',
             data: param,
             url: '/lightspace/sortList'
         }).then(this.handleGetSeatQuerySucc.bind(this)).catch(this.handleGetSeatQueryErr.bind(this))
       },
     handleGetSeatQuerySucc(res) {
       console.log(res)
        if(res.data.status === 10204) {
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
           this.id = res.data.data.id;
           this.changeBelongs()
        } else if(res.data.status =10216) {
           this.$message.error(res.data.msg);
        }
     },
    handleGetSeatQueryErr(err) {
         console.log(err)
    },
    selectedSeat() {
      let chooseStu = this.dragging;
      let group = this.sort_group;
      let selectGroup = 0;
      let reduce = 0;
      let sum = 0;
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
      console.log(Math.ceil(sum / this.type), Math.floor(reduce / this.type))
      this.topNum = Math.ceil(sum / this.type);
      this.floorNum = Math.floor(reduce / this.type);

    },
    changeBelongs() {
      this.reversePai = []; //先清空循环
      // this.divList.forEach((item, index) => {
      //   item.mr = false;
      // })
     if(this.type == 6) {
       this.totalPai = Math.ceil(this.divList.length / 6);
       let t = this.totalPai * 6 - this.divList.length;
       for(let i = 0; i < t; i++) {
         this.divList.push({
            studentName: '',
            gender: 2,
            mr: false
         })
       }
       for(let t = 0; t< this.totalPai; t++) {
          let num = this.totalPai - t;
          this.reversePai.push(num)
        }
     }else if(this.type == 7) {
       this.totalPai = Math.ceil(this.divList.length / 7);
       let t = this.totalPai * 7 - this.divList.length;
       for(let i = 0; i < t; i++) {
         this.divList.push({
            studentName: '',
            gender: 2,
            mr: false
         })
       }
       for(let t = 0; t< this.totalPai; t++) {
          let num = this.totalPai - t;
          this.reversePai.push(num)
        }
     }else if(this.type == 8) {
       this.totalPai = Math.ceil(this.divList.length / 8);
       let t = this.totalPai * 8 - this.divList.length;
       for(let i = 0; i < t; i++) {
         this.divList.push({
            studentName: '',
            gender: 2,
            mr: false
         })
       }
       for(let t = 0; t< this.totalPai; t++) {
          let num = this.totalPai - t;
          this.reversePai.push(num)
        }
     }else if(this.type == 9) {
       this.totalPai = Math.ceil(this.divList.length / 9);
       let t = this.totalPai * 9 - this.divList.length;
       for(let i = 0; i < t; i++) {
         this.divList.push({
            studentName: '',
            gender: 2,
            mr: false
         })
       }
       for(let t = 0; t< this.totalPai; t++) {
          let num = this.totalPai - t;
          this.reversePai.push(num)
        }
     }
   }
  }
}
</script>
<style lang="less">
  .bor {
    border: 1px solid red;
  }
  .addBtn {
    position: absolute;
    right: -20px;
    top: 0;
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
    font-size: 20px;
    font-weight: bold;
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
