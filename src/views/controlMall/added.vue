<template>
  <div class="trainlist">
    <Row>
      <div class="header" ref="header">
        <div class="title">
          <span>添加课程</span>
        </div>
        <div class="export-btn">
          <Button type="primary" icon="md-add" @click="goBack">返回</Button>
        </div>
      </div>
      <Divider style="margin:10px 0" />
    </Row>
    <div class="phoneMode">
      <div class="mode">
        <div class="header">
          <img src="">
          <p>课程详情</p>
        </div>
        <div class="carousel">
          <div v-swiper:mySwiper="swiperOptions">
            <div class="swiper-wrapper">
              <div class="swiper-slide" :key="banner" v-for="banner in carouseList">
                <img :src="banner">
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="formPanel">
      <Form>
        <FormItem label="课程名">
          <Input
            v-model="addForm.name"
            @input="inputName"
            placeholder="请输入课程名"
            style="width: 260px"/>
        </FormItem>

        <FormItem label="年级">
          <Select v-model="gradeValue" style="width:200px">
            <Option 
            v-for="item in gradeList" 
            :value="item.value" 
            :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="科目">
          <Select v-model="subjectValue" style="width:200px">
            <Option 
            v-for="item in subjectList" 
            :value="item.value" 
            :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="原价">
          <Input
            type="number"
            :clearable="true"
            v-model="addForm.originPrice"
            @input="inputOriginPrice"
            placeholder="请输入原价"
            style="width: 200px"/>
        </FormItem>

        <FormItem label="优惠价">
          <Input
            type="number"
            :clearable="true"
            v-model="addForm.discountPrice"
            @input="inputDiscountPrice"
            placeholder="请输入原价"
            style="width: 200px"/>
        </FormItem>

        <FormItem label="课程人数">
          <Input
            type="number"
            :clearable="true"
            v-model="addForm.capacity"
            @input="inputCapacity"
            placeholder="请输入最大上课人数"
            style="width: 200px"/>
        </FormItem>

        <FormItem label="上课时间说明">
          <Input
            :clearable="true"
            v-model="addForm.classTime"
            @input="inputClassTime"
            placeholder="请输入上课时间说明"
            style="width: 200px"/>
        </FormItem>

        <FormItem label="简介">
          <Input
            type="textarea"
            :clearable="true"
            v-model="addForm.intro"
            @input="inputIntro"
            placeholder="请输入简介"
            style="width: 200px"/>
        </FormItem>

        <FormItem label="学习目标">
          <Input
            type="text"
            :clearable="true"
            v-model="addForm.learnObject"
            @input="inputLearnObject"
            placeholder="请输入学习目标"
            style="width: 200px"/>
        </FormItem>

        <FormItem label="课程轮播图">
              <div class="demo-upload-list" v-for="item in carouseList">
                <template v-if="item !== ''">
                  <img :src="item">
                  <Icon type="ios-close-circle" @click="carouselRemove(item)" />
                </template>
              </div>
              <Upload
                ref="upload"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="carouselUpload"
                multiple
                type="drag"
                action=""
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
          
            <!-- <Modal title="View Image" v-model="visible">
                <img :src="" v-if="visible" style="width: 100%">
            </Modal> -->
          </FormItem>

        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">创建</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { Debounce ,Throttle } from "../../libs/util";
import { uploadPic } from "../../libs/ali-oss";
import {
  getGradeList,
  getSubjectList,
  getCourseList,
  getCourseDetails,
  addCourse,
  getOrgLectures,
  getReportList,
  getImgList,
  addImg,
  editImg,
  delImg,
  getOutlineList,
  addOutline,
  editOutline
} from "@/api";
export default {
    data(){
        return{
          // 新增 表单
          addForm: {
            name:'',
            orgId:null,
            gradeId:null,
            subjectId:null,
            originPrice:null,
            discountPrice:null,
            capacity:null,
            classTime:'',
            intro:'',
            learnObject:''
          },
          gradeList: [
                    {
                        value: 'yinianji',
                        label: '一年级',
                        gradeId:0
                    },
                    {
                        value: 'ernianji',
                        label: '二年级',
                        gradeId:2
                    },
                    {
                        value: 'sannianji',
                        label: '三年级',
                        gradeId:3
                    },
                ],
          subjectList:[
                    {
                        value: 'yuwen',
                        label: '语文',
                        subjectId:0
                    },
                    {
                        value: 'shuxue',
                        label: '数学',
                        subjectId:2
                    },
                    {
                        value: 'yingyu',
                        label: '英语',
                        subjectId:3
                    },
          ],
          gradeValue:'',
          subjectValue:'',
          carouseList:[],

        //   上传图片相关
        imgName: '',
        visible: false,
        uploadList: [
        ],




        // 手机模拟器
        // swiper轮播图
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          // Some Swiper option/callback...
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
          autoplay: 3000,
          loop: true
        }
      }
    },
    created() {

    },
    mounted(){

    },
    mounted() {
      console.log('Current Swiper instance object', this.mySwiper)
      this.mySwiper.slideTo(3, 1000, false)
    },
    methods:{
        // 关闭并返回
        goBack(){
            let type = '';
            let route = this.$parent.$route;
            console.log(route);
            this.$Modal.confirm({
                title: "确认返回",
                content: "您尚未提交，确认要离开?",
                onOk: () => {
                this.$parent.closeTag(route);
                this.$router.go(-1);
                }
            });
        },

        // 输入相关
        inputName:Debounce(e=>{
          console.log(e);
        },400),

        inputOriginPrice:Debounce(e=>{
          console.log(e);
        },400),

        inputDiscountPrice:Debounce(e=>{
          console.log(e);
        },400),

        capacity:Debounce(e=>{
          console.log(e);
        },400),

        classTime:Debounce(e=>{
          console.log(e);
        },400),

        inputCapacity:Debounce(e=>{
          console.log(e);
        },400),

        inputIntro:Debounce(e=>{
          console.log(e);
        },400),

        inputClassTime:Debounce(e=>{
          console.log(e);
        },400),

        inputLearnObject:Debounce(e=>{
          console.log(e);
        },400),


        // 上传图片相关
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
            file.url = '';
            file.name = '';
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
      
        // 轮播图 上传
        carouselUpload (file) {
          console.log(file);
            let path = 'data/course/';
            let imgList = this.carouseList;
            uploadPic(file,path).then(res=>{
              console.log(res);
              if(res.name !==''){
               let newImg = 'https://file.zahooedu.com/'+res.name;
               imgList.push(newImg);
              }
              this.carouseList = imgList;
              console.log(this.carouseList);
            });
        },

        carouselRemove(e){ 
            let list = this.carouseList;
            let index = list.indexOf(e);
            if(index!=-1)
            list.splice(index,1);
            this.carouseList = list;
        },

        // 详情图片 上传
        particularsUpload (file) {
          console.log(file);
            let path = 'data/course/';
            let imgList = this.carouseList;
            uploadPic(file,path).then(res=>{
              console.log(res);
              if(res.name !==''){
               let newImg = 'https://file.zahooedu.com/'+res.name;
               imgList.push(newImg);
              }
              this.carouseList = imgList;
              console.log(this.carouseList);
            });
        },

        // 提交
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
            if (valid) {
              this.$Message.success('Success!');
            } else {
             this.$Message.error('Fail!');
            }
          })
        },
        handleReset (name) {
          this.$refs[name].resetFields();
      }
    }
}
</script>

<style lang="scss" scoped>
    .trainlist {
        padding: 16px;
        .header {
            display: flex;
            justify-content: space-between;
            padding: 0 6px;
            .title {
            color: #2d8cf0;
            font-weight: bold;
            line-height: 32px;
            }
        }
    }

    .formPanel{
      width: 60%;
      margin-left: 420px;
      height: 100%;
      position: relative;
      float: left;
    }

    // 手机模拟器样式
    .phoneMode{
      width: 375px;
      height: 650px;
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: 4px 0 8px rgba($color: #000000, $alpha: 0.3);
        .header{
          width: 100%;
          height: 40px;
          position: relative;
          float: left;
          background: #fff;

          p{
            text-align: center;
            position: relative;
            float: left;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            font-weight: 500;
            color: #0e0e0e;
          }
        }

        .carousel{
          height: 205px;
          width: 100%;
          overflow: hidden;
          position: relative;
          float: left;

          .demo-carousel{
            background-size: cover;
            width: 100%;
            height: 205px;

            img{
              object-fit: cover;
              width: 100%;
              height: 205px;
            }
          }
        }

        .swiper-slide{
          width: 100%;
          height: 205px;

          img{
              object-fit: cover;
              width: 100%;
              height: 205px;
            }
        }
    }


    // 表单样式
      .demo-upload-list{
        width: 58px;
        height: 58px;
        position: relative;
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
          img{
            width: 58px;
            height: 58px;
            object-fit: cover;
            position: relative;
            float: left;
          }

        .ivu-icon{
          position: absolute;
          right: -7px;
          top: -7px;
          color: red;
          font-size: 16px;
        }
      }
 
</style>