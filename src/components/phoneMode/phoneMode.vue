<template>

  <div class="phoneMode">
    <div class="scroll_panel">

      <div class="mode">
        <img
          class="mode_header"
          src="../../assets/mode/mode_header.jpg"
        >
        <div class="header">
          <img src="">
          <p>课程详情</p>
        </div>
        <!-- 轮播图 -->
        <div class="carousel">
          <div v-swiper:mySwiper="swiperOptions">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                :key="banner"
                v-for="banner in carouseList"
              >
                <img :src="banner">
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <!-- 价格 -->
        <div class="price_panel" :class="{underRevision:focus==2}">
          <p class="price">￥<span>{{addForm.discountPrice?addForm.discountPrice:addForm.originPrice?addForm.originPrice:'0'}}</span></p>
          <p v-if="addForm.discountPrice" class="originPrice"> 原价￥{{addForm.originPrice?addForm.originPrice:''}} </p>
          <p>/{{addForm.lessons?addForm.lessons:'0'}}节课时</p>
          <p style="float:right;">剩余{{addForm.capacity?addForm.capacity:'0'}}个名额</p>
        </div>
        <!-- 标题 -->
        <div class="title_panel" :class="{underRevision:focus==1}">
          <p>{{addForm.name?addForm.name:'请输入课程名'}}</p>
        </div>
        <!-- 时间 -->
        <div class="time_panel">
          <img src="../../assets/mode/clock_icon.jpg">
          <p>{{allOutlineList.realBeginDate}} - {{allOutlineList.realEndDate}}</p>
          <p>{{allOutlineList.beginTime}} - {{allOutlineList.endTime}}</p>
        </div>
        <div class="name_panel">
          <p>{{addForm.orgName?addForm.orgName:'请选择培训机构'}}</p>
        </div>
        <!-- 地址 -->
        <div
          class="time_panel"
          style="margin-top:2px;margin-bottom:9px;"
        >
          <img src="../../assets/mode/site_icon.jpg">
          <p>{{addForm.site?addForm.site:'培训机构所在地址'}}</p>
        </div>
      </div>

      <div class="mode">
        <div class="title_text">
          <p>授课老师</p>
        </div>
        <div class="teacherPanel" :class="{underRevision2:focus==3}">
            <img :src="teacherUrl" v-if="teacherUrl !==''">
            <img src="../../assets/mode/teacher.png" v-else>
            <p class="name">{{addForm.lecturerName?addForm.lecturerName:'老师名字'}}</p>
            <p>授课</p>
        </div>
      </div>

      <div class="mode">
        <div class="title_text">
          <p>课程信息</p>
        </div>

        <div class="messagePanel">
            <div :class="{underRevision:focus==4}">
              <h5>课程简介</h5> 
              <p>{{addForm.intro?addForm.intro:'请输入课程简介'}}</p>
            </div>
            <div :class="{underRevision:focus==5}">
              <h5>学习目标 </h5>
              <p>{{addForm.learnObject?addForm.learnObject:'请输入学习目标'}}</p>
            </div>
        </div>
      </div>

      <div class="mode">
        <div class="title_text" style="margin-bottom:9px">
          <p>课程大纲<span> {{outlineList?outlineList.length:'0'}}讲</span></p>
        </div>

        <div class="outlinePanel" v-show="outlineList.length !==0" v-for="(item,index) in outlineList" :key="index">
            <p class="label">第{{index + 1}}讲</p>
            <p class="title">{{item.content}}</p>
            <p class="time">{{allOutlineList.beginTime}} - {{allOutlineList.endTime}}</p>
            <p class="time teacher">授课老师:  {{addForm.lecturerName?addForm.lecturerName:'老师名字'}}</p>
        </div>
      </div>

      <div class="mode">
        <div class="title_text">
          <p>课程评价</p>
        </div>

        <div class="comment_panel">

          <p>暂无评价</p>
        </div>
      </div>

      <div class="mode">
        <div class="title_text">
          <p>课程详情</p>
        </div>

        <div class="particulars" :class="{underRevision3:focus==8}" v-html="addForm.editorContent">
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  props: {
    carouseList: {
      tyepe: Array,
    },
    addForm:{
      type: Object,
      default () {
        return {}
      }
    },
    allOutlineList:{
      type: Object,
      default () {
        return {}
      }
    },
    outlineList:{
      type: Array,
      default () {
        return {}
      }
    },
    teacherUrl:{
      type: String,
      default () {
        return {}
      }
    },
    focus:{
      type:Number,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      // 手机模拟器
      // swiper轮播图
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        // Some Swiper option/callback...
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay: 3000,
        loop: true,
      },
    };
  },

  components: {},

  methods: {},

  mounted() {
    console.log("Current Swiper instance object", this.mySwiper);
    this.mySwiper.slideTo(3, 1000, false);
  },
};
</script>

<style lang="scss" scoped>
.phoneMode {
  width: 340px;
  height: 100%;
  overflow: hidden;
  position: absolute;
  padding: 0 0 0 0;
  box-sizing: border-box;
  transform: translateY(0);
  box-shadow: 4px 0 8px rgba($color: #000000, $alpha: 0.3);
  background: #f7f8fa;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/

  .scroll_panel {
    width: 354px;
    height: 100%;
    padding-right: 14px;
    position: relative;
    float: left;
    overflow: hidden;
    overflow-y: scroll;
  }

  .mode {
    position: relative;
    float: left;
    width: 340px;
    margin-bottom: 12px;
    background: #fff;
    padding: 0 20px;
  }

  .mode_header {
    width: 100%;
    object-fit: cover;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 7777;
  }

  .header {
    width: 100%;
    height: 30px;
    position: fixed;
    top: 26px;
    left: 0;
    width: 100%;
    right: 0;
    background: #fff;
    z-index: 7777;

    p {
      text-align: center;
      position: relative;
      float: left;
      width: 100%;
      height: 30px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 550;
      color: #0e0e0e;
    }
  }

  .carousel {
    height: 205px;
    width: 340px;
    margin-left: -20px;
    margin-right: -20px;
    overflow: hidden;
    position: relative;
    float: left;
    margin-top: 54px;

    .demo-carousel {
      background-size: cover;
      width: 100%;
      height: 205px;

      img {
        object-fit: cover;
        width: 100%;
        height: 205px;
      }
    }
  }

  .swiper-slide {
    width: 100%;
    height: 205px;

    img {
      object-fit: cover;
      width: 100%;
      height: 205px;
    }
  }

  .price_panel {
    height: 52px;
    position: relative;
    float: left;
    width: 100%;

    p {
      font-size: 15px;
      display: inline-block;
      position: relative;
      float: left;
      line-height: 56px;
      color: #888888;

      span {
        line-height: 52px;
        font-size: 20px;
        font-weight: 550;
        color: #fa455e;
      }
    }

    p:nth-child(4) {
      float: right;
      color: #717171;
      font-size: 11px;
    }

    .originPrice{
      font-size: 12px;
      color:#FFAAB6;
      text-decoration:line-through;
    }

    .price {
      color: #fa455e;
    }
  }

  .title_panel {
    position: relative;
    float: left;
    width: 100%;
    font-weight: 550;

    p {
      font-size: 17px;
      color: #080808;
      line-height: 18px;
      width: 100%;
      position: relative;
      float: left;
    }
  }

  .time_panel {
    margin-top: 10px;
    width: 100%;
    position: relative;
    float: left;

    img {
      position: absolute;
      left: -2px;
      top: 50%;
      transform: translateY(-50%);
      width: 13px;
      height: 13px;
    }

    p {
      line-height: 20px;
      font-size: 10px;
      color: #818181;
      padding: 0 0 0 15px;
      position: relative;
      float: left;
    }
  }

  .name_panel {
    position: relative;
    float: left;
    width: 100%;
    font-weight: 500;

    p {
      line-height: 24px;
      font-size: 14px;
      float: left;
      width: 100%;
      position: relative;
      color: #252525;
    }
  }

  .mode {
    .title_text {
      width: 100%;
      position: relative;
      float: left;

      p {
        font-size: 16px;
        width: 100%;
        position: relative;
        float: left;
        height: 42px;
        line-height: 42px;
        color: #0c0c0c;
        font-weight: 550;

        span{
            font-size: 10px;
            color: #808080;
        }
      }
    }
  }

  .mode{
      .teacherPanel{
          padding: 12px 58px 23px 58px;
          position: relative;
          float: left;
          width: 100%;
        
        img{
            width: 45px;
            height: 45px;
            position: absolute;
            left: 0;
            top: 5px;
            border-radius: 50%;
            object-fit: cover;
        }

        p{
            line-height: 18px;
            position: relative;
            float: left;
            width: 100%;
            color: #808080;
            font-size: 12px;
        }

        .name{
            font-size: 14px;
            color: #252525;
        }
      }

      .messagePanel{
          position: relative;
          width: 100%;
          padding-bottom: 16px;
          float: left;

          div{
            padding-left: 70px;
            position: relative;
            width: 100%;
            height: 30px;
          }

          h5{
            left: 0;
            top: 0;
            color: #252525;
            position: absolute;
            width: 70px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
          }

          p{
              line-height: 30px;
              height: 30px;
              position: relative;
              float: left;
              width: 100%;
              color: #808080;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
          }
      }

      .outlinePanel{
          position: relative;
          float: left;
          padding-left: 60px;
          width: 100%;
          padding-bottom: 16px;

          .label{
              font-size: 14px;
              position: absolute;
              left: 0;
              top: 0;
              width: 60px;
              line-height: 15px;
              color: #808080;
              font-weight: 550;
          }

          .title{
              position: relative;
              width: 100%;
              float: left;
              margin-bottom: 3px;
              color: #414141;
              line-height: 18px;
              font-size: 13px;
              font-weight: 550;
          }

          .time{
              display: inline-block;
              position: relative;
              float: left;
              font-size: 12px;
              color: #808080;
          }

          .teacher{
              float: right;
              padding-left: 15px;
          }

          .teacher::after{
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              height: 9px;
              transform: translateY(-50%);
              width: 1px;
              background: #808080;
          }
      }

      .comment_panel{
          position: relative;
          float: left;
          width: 100%;

          /deep/ img{
              max-width: 100%;
              height: auto;
              position: relative;
              float: left;
              display: block;
          }

          /deep/ p{
            position: relative;
            float: left;
            display: block;
            width: 100%;
            height: 36px;
            font-size: 14px;
            text-align: center;
            line-height: 36px;
            color: #808080;
          }
      }

      .particulars{
          position: relative;
          float: left;
          width: 100%;
          min-height: 100px;

          /deep/ img{
              max-width: 100%;
              height: auto;
              position: relative;
              float: left;
              display: block;
          }
      }
  }
}

.scroll_panel::after {
  content: "";
  width: 14px;
  height: 650px;
  right: -14px;
  top: 0;
  bottom: 0;
  z-index: 77;
  background: #ffffff;
  position: absolute;
}

.demo-upload-list {
  width: 58px;
  height: 58px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;

  img {
    width: 58px;
    height: 58px;
    object-fit: cover;
    position: relative;
    float: left;
  }

  .ivu-icon {
    position: absolute;
    right: -7px;
    top: -7px;
    color: red;
    font-size: 16px;
  }
}


.underRevision::after{
  width: 340px;
  height: 36px;
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;
  position: absolute;
  border-radius: 5px;
  border: 2px solid #0074E7;
  box-shadow: 0 0 2px rgba($color: #0074E7, $alpha: 0.95);
  content: '';
}

.underRevision2::after{
  width: 340px;
  height: 74px;
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;
  position: absolute;
  border-radius: 5px;
  border: 2px solid #0074E7;
  box-shadow: 0 0 2px rgba($color: #0074E7, $alpha: 0.95);
  content: '';
}

.underRevision3::after{
  width: 340px;
  height: 104%;
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;
  position: absolute;
  border-radius: 5px;
  border: 2px solid #0074E7;
  box-shadow: 0 0 2px rgba($color: #0074E7, $alpha: 0.95);
  content: '';
}
</style>