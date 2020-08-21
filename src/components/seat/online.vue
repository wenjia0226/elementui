<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>排座系统</el-breadcrumb-item>
            <el-breadcrumb-item>在线排座</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 卡片视图 -->
        <el-card>
            <el-row :gutter="10">
                <el-col :span="3">
                  <div class="schoolSet" v-if="this.identity == 1 || this.identity == 2">学校班级选择：</div>
                </el-col>
                 <!-- <cascade></cascade> -->
                <el-col :span="5">
                 <el-cascader :options="options" v-model="stu_cat" :props="cateProps"
                 @change="handleChange" clearable></el-cascader>
                </el-col>

               <!-- <el-col :span="3" v-if="this.identity == 3" style="height: 100%;">
                  <div style="height: 40px;line-height: 40px">班级: {{className}}</div>
                </el-col> -->
                 <el-col :span="2">
                    <div class="schoolSet">列数选择：</div>
                </el-col>
                <el-col :span="2" >
                  <el-select v-model="value" placeholder="请选择"  @focus="handleTypeChange(value)" clearable>
                    <el-option v-for="item in typeoptions" :key="item.value"   :label="item.label"  :value="item.value" >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="2">
                     <div class="schoolSet">排座周期：</div>
                </el-col>
                 <el-col :span="2">
                    <el-select v-model="time" @change="changeTime"  clearable>
                    <el-option v-for="item in timeoptions" :key="item.value"  :label="item.label"  :value="item.value" >
                    </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="seatQuery(1)">近期微调</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary"  @click="seatQuery(2)">打乱重拍</el-button>
                </el-col>
            </el-row>
            <el-row class="row " style=" font-size: 20px;font-weight: bold; margin: 20px 0 10px 0 " v-if="!this.studentList.length">
              <el-col :span="6">方式一:</el-col>
              <el-col :span="6">方式二:</el-col>
              <el-col :span="6">方式三:</el-col>
              <el-col :span="6">方式四:</el-col>
            </el-row>
            <el-row class="row" style="font-size: 20px"  v-if="!this.studentList.length">
              <el-col :span="6">6列排布</el-col>
              <el-col :span="6">7列排布</el-col>
              <el-col :span="6">8列排布</el-col>
              <el-col :span="6">9列排布</el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
import axios from 'axios'
import Cascade from '../../pageCom/cascade.vue'
export default {
     created() {
        this.token = window.sessionStorage.getItem('token');
        this.getOPtions();
        let user = window.sessionStorage.getItem('token');
        this.identity = user.split('-') [1];
        this.fondId = user.split('-')[2];
    },
    components: {
      Cascade
    },
    data() {
        return {
          showTu: false,
          style1: {url:require('../../assets/image/1.jpg'), title: '方式一', id: 1},
          style2: {url:require('../../assets/image/2.jpg'), title: '方式二', id: 2},
          style3: {url:require('../../assets/image/3.jpg'), title: '方式三', id: 3},
          style4: {url:require('../../assets/image/4.jpg'), title: '方式四', id: 4}
          ,
         typeoptions: [{
          value: 6,
          label: '6列'
        }, {
          value: 7,
          label: '7列'
        }, {
          value: 8,
          label: '8列'
        }, {
          value: 9,
          label: '9列'
        },
        ],
        timeoptions:[{
          value: 7,
          label: '一星期'
        }, {
          value: 14,
          label: '两星期'
        }, {
          value: 30,
          label: '一个月'
        }, {
          value: 90,
          label: '三个月'
        }],
        value: '',
        time: '',
        token: '',
        type: '',
        className: '',
            cateProps: {
            label: 'name', //看到的是哪个属性
            value: 'id', // 选中的是谁的值
            children: 'children' //哪个属性实现父子节点嵌套
        },
            options: [],
            stu_cat: [],
            schoolId: '',
            classId: '',
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
            classesName:''
        },
        }
    },
    methods: {
         //获取级联选择器中的数据
        getOPtions() {
            let param = new URLSearchParams();
            param.append('token', this.token);
            axios({
                method: 'post',
                url: '/lightspace/cascade1',
                data: param
            }).then(this.handleGetOptionSucc.bind(this)).catch(this.handleGetOptionErr.bind(this))
        },
        handleGetOptionSucc (res) {
            let that = this;
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
                this.options = res.data.data;
                if(this.identity == 1) {  // admin

                 }else if(this.identity == 2) {   //2 校长
                    let selectedOption = this.options;
                    let filterOption = selectedOption.filter((item, index) => {
                       if(item.id == Number(that.fondId)) {
                        return item
                      }
                    })
                 this.options = filterOption;
                }else if(this.identity == 3) {   // 教师
                  this.options.forEach((item) => {
                    item.children.forEach((secondItem) => {
                      if(secondItem.id == this.fondId) {
                        this.stu_cat[0]= item.id;
                        this.stu_cat[1] = secondItem.id;
                        this.schoolId = item.id;
                        this.classId = secondItem.id;
                         this.options = [];
                         item.disabled = true;
                         this.options.push(item)
                      }
                    })
                  })
                }
            }
        },
        handleGetOptionErr(err) {
            console.log(err)
        },
        //级联选择器选择变化会触发这个函数
        handleChange(value) {
           this.schoolId = this.stu_cat[0];
           this.classId = this.stu_cat[1];
        },
        seatQuery(num) {
         if( num == 2) { //打乱重拍
            let param = new URLSearchParams();
            if(!this.token) {
                return this.$router.push('/login');
            }else if(!this.classId) {
                 return this.$message.error('请选择学校和班级');
            }else if(!this.value) {
                return this.$message.error('请选择排座列数');
            }else if(!this.time) {
                return this.$message.error('请选择排座周期');
            }else{
              let routeUrl = this.$router.resolve({
                path: '/detailSeatTwo',
                query: {
                  classId: this.classId,
                  type: this.value,
                  time: this.time,
                  sortType: num
                }
               });
               window.open(routeUrl.href, '_blank');
              }
             }else if(num ==1) {  //近期微调
               let param = new URLSearchParams();
               if(!this.token) {
                   return this.$router.push('/login');
               }else if(!this.classId) {
                    return this.$message.error('请选择学校和班级');
               }else if(!this.value) {
                   return this.$message.error('请选择排座列数');
               }else if(!this.time) {
                   return this.$message.error('请选择排座周期');
               }else{
                 let param = new FormData();
                 param.append('token', this.token);
                 param.append('classId', this.classId);
                 param.append('type', this.value);
                 axios({
                     method: 'post',
                     url: '/lightspace/chkSort',
                     data: param
                 }).then((res) => {

                   if(res.data.status == 200) {
                    let routeUrl = this.$router.resolve({
                      path: '/detailSeatTwo',
                      query: {
                        classId: this.classId,
                        type: this.value,
                        sortType: num,
                        time: this.time,

                      }
                     });
                     window.open(routeUrl.href, '_blank');
                   }else if(res.data.status == 10238) {
                      this.$message({
                         message: res.data.msg,
                         type: 'warning'
                       });
                   }else if(res.data.status == 10239) {
                     this.$message({
                        message: res.data.msg,
                        type: 'warning'
                      });
                   }
                 }).catch((err) => {
                   console.log(err)
                 })

                 }
             }
            },
        //排座类型
        handleTypeChange(value) {
          this.showTu = true;
          window.sessionStorage.setItem('type', value)
          this.studentList = [];
        },
        //排座周期
        changeTime(time) {
        }
    }

}
</script>
<style lang="less" scope>
.row {
  vertical-align: bottom;
  line-height: 30px;
  height: 30px;
  text-align: center;
}
.schoolSet {
    line-height: 40px;
    text-align: center;
}
.el-cascader {
    width: 100% !important;
}
.seat td   a {
  display: block;
  color: #000;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
}
.seat img {
    margin: 5px 0;
}
.el-input.is-disabled .el-input__inner {
    background: #fff;
    text-align: center;
    font-weight: bold;
}
</style>
