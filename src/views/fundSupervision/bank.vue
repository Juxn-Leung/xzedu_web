<template>
  <div class="trainlist">
    <div
      class="content"
      :style="`height:${tableHeight}px;`"
    >
      <div
        v-if="id==0"
        class="header"
      >
        <img src="../../assets/bank/js_logo.png">
        <p>建设银行 建融汇学</p>
      </div>
      <div
        v-if="id==1"
        class="header"
      >
        <img src="../../assets/bank/gs_logo.png">
        <p>工商银行 教育云<a>培</a></p>
      </div>
      <div
        v-if="id==2"
        class="header"
      >
        <img src="../../assets/bank/zx_logo.png">
        <p>中信银行 校园管家</p>
      </div>

      <div
        v-if="id==2"
        class="hint"
      >
        <p>“校园管家”是中信银行为校园客户量身定制的在线缴费工具，缴费场景包括各类学杂费、生活费等，学校无需开发、上线快、操作便捷。</p>
      </div>


      <div class="label" v-if="id==1">
        <p>服务详情</p>
      </div>

      <div
        class="car2"
        v-if="id==1"
      >
        <p>面向幼儿园、中小学、社会教育提供学生管理、课程管理、考试报名等行业功能，及学费缴纳、资金对账等金融服务；并与行业领先的第三方服务公司合作丰富信息发布、考勤管理、即时通讯等综合服务的“银校通”；面向行业协会、考试认证等机构的“考试云”产品。</p>
      </div>

      <div class="label" v-if="id==1">
        <p>服务介绍</p>
      </div>

      <div
        class="car2"
        v-if="id==1"
      >
        <p>“教育云”是工商银行为各类学校、教育培训机构提供的高效收费管理服务平台，系统功能涵盖学生信息管理、学籍管理、收费信息管理、参数管理等内容。</p>
      </div>

      <div class="label" v-if="id==1">
        <p>服务优势</p>
      </div>

      <div
        class="car"
        v-if="id==1"
      >
        <template v-for="item in carList2">
          <div class="demo">
            <img :src="item.icon">
            <p>{{item.title}}</p>
            <h5>{{item.cont}}</h5>
          </div>
        </template>
      </div>

      <div class="label" v-if="id!==1">
        <p>功能介绍</p>
      </div>

      <div
        class="car"
        v-if="id==2"
      >
        <template v-for="item in carList">
          <div class="demo">
            <img :src="item.icon">
            <p>{{item.title}}</p>
            <h5>{{item.cont}}</h5>
          </div>
        </template>
      </div>

      <div
        class="car2"
        v-if="id==0"
      >
        <p>在建融慧学板块下创新教育培训机构资金监管平台，开发接口与教体局对接，满足教体局对全市教育培训机构学费收缴的监管需求，同时，为培训机构提供线上课程发布、费用收缴等综合金融服务。</p>
      </div>

      <div class="btn">
        <p>申请开通</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Debounce, Throttle } from "../../libs/util";

import {} from "@/api";
export default {
  components: {},
  data() {
    return {
      carList: [
        {
          icon: require("../../assets/bank/yewu_icon.png"),
          title: "业务开通",
          cont:
            "学校在我行提供资料开通业务，指定收取缴费的账户，我行提供校园管家系统账户和密码;",
        },
        {
          icon: require("../../assets/bank/daoru_icon.png"),
          title: "缴费明细导入",
          cont:
            "学校将要收费的明细导入校园管家系统，支持指定金额和非固定金额缴费;",
        },
        {
          icon: require("../../assets/bank/jiaofei_icon.png"),
          title: "支持多入口完成缴费",
          cont:
            "系统短信通知学生家长缴费，学生家长在学校公众号、我行微信银行等途径中查询到自己的缴费信息，完成在线缴费。缴费可支持微信支付、中信借贷记卡、银联云闪付;",
        },
        {
          icon: require("../../assets/bank/zhangdan_icon.png"),
          title: "对账清晰",
          cont: "学校可以随时在线查看，导出当前的缴费明细报表。",
        },
      ],

      carList2: [
        {
          icon: require("../../assets/bank/xuexiao_icon.png"),
          title: "学校",
          cont:
            "免费上线，无需额外开发投入专属平台，享受丰富系统功能自动对账，减轻校方财务压力缴费便捷，线上线下多渠道缴费",
        },
        {
          icon: require("../../assets/bank/xuesheng_icon.png"),
          title: "学生和家长",
          cont:
            "告别现金，免除排队缴费烦恼支持使用他行账户进行缴费单笔最高五万，便捷缴费流程支持全行线上线下缴费渠道",
        },
        {
          icon: require("../../assets/bank/yidian_icon.png"),
          title: "一点对接",
          cont:
            "服务非税征缴规范学费收缴提供统计查询助力场景建设",
        },
        {
          icon: require("../../assets/bank/yewu_icon.png"),
          title: "全程支持",
          cont: "提供7x24小时在线咨询服务迭代升级满足学校个性化需求专职经理上门服务提供详细操作手册",
        },
      ],

      tableHeight: "",
    };
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route() {},
  },
  computed: {},
  created() {
    this.id = this.$route.query.id;
    // for (var i in this.$parent.tagNavList) {
    //   if (this.$parent.tagNavList[i].name == "bank") {
    //     // this.$parent.tagNavList[i].meta.title = this.$route.query.title;
        
    //   }
    // }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 计算页面高度
      this.pageHeight();
      window.onresize = () => {
        this.pageHeight();
      };
    },
    pageHeight() {
      let pageHeight = Number(
        document.getElementsByClassName("single-page")[0].clientHeight
      );
      this.tableHeight = pageHeight - 50;
    },
  },
};
</script>

<style lang="scss" scoped>
.trainlist {
  padding: 0 36px 0 42px;
  position: relative;

  .content {
    position: relative;
    width: 100%;
    min-width: 1200px;
    overflow-x: auto;
    background: #f0f2f7;
    border-radius: 30px;
    float: left;
    box-sizing: border-box;
    margin-top: 30px;
    padding: 0 50px;

    .header {
      padding: 20px 0;
      position: relative;
      width: 100%;
      float: left;
      background: url("../../assets/bank/top_icon.png") center top no-repeat;
      margin-top: -20px;

      img {
        width: 56px;
        height: 90px;
        position: relative;
        float: left;
        margin-left: 50%;
        object-fit: contain;
        z-index: 7;
        transform: translateX(-50%);
      }

      p {
        height: 48px;
        line-height: 48px;
        font-size: 28px;
        font-weight: 550;
        position: relative;
        width: 100%;
        float: left;
        text-align: center;
        color: #373737;
      }
    }

    .header::after {
      content: "";
      background: #fff;
      width: 84px;
      height: 74px;
      border-radius: 15px;
      left: 50%;
      top: 66px;
      transform: translate(-50%, -50%);
      position: absolute;
    }

    .hint {
      position: relative;
      width: 100%;
      float: left;
      margin-top: 22px;
      margin-bottom: 50px;

      p {
        width: 100%;
        line-height: 40px;
        font-size: 18px;
        color: #313131;
        font-weight: 550;
        // text-align: center;
        position: relative;
        float: left;
      }
    }

    .label {
      position: relative;
      width: 100%;
      float: left;
      height: 40px;

      p {
        height: 40px;
        line-height: 40px;
        position: relative;
        display: inline-block;
        color: #4581f5;
        font-size: 20px;
        padding-left: 10px;
        font-weight: 550;
      }
    }

    .label::after{
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #4581F5;
    }

    .car {
      position: relative;
      float: left;
      width: 100%;
      padding: 15px 0 80px 0;

      .demo {
        position: relative;
        float: left;
        width: 23.5%;
        margin-right: 2%;
        background: #fff;
        border-radius: 18px;
        height: 356px;
        padding: 24px 30px 10px 30px;

        img {
          width: 50px;
          height: 50px;
          object-fit: contain;
          margin-left: 50%;
          transform: translateX(-50%);
          margin-top: 0;
        }

        p {
          margin-top: 20px;
          position: relative;
          float: left;
          width: 100%;
          height: 22px;
          line-height: 24px;
          text-align: center;
          font-size: 22px;
          color: #363636;
          font-weight: 550;
        }

        h5 {
          color: #747474;
          margin-top: 20px;
          line-height: 28px;
          font-size: 16px;
          position: relative;
          float: left;
          width: 100%;
        }
      }

      .demo:nth-child(4) {
        margin-right: 0;
      }
    }

    .car2 {
      position: relative;
      float: left;
      width: 100%;
      padding: 15px 0 20px 0;

      p {
        width: 100%;
        font-size: 18px;
        color: #313131;
        position: relative;
        float: left;
        line-height: 30px;
        font-weight: 550;
      }
    }

    .btn{
      position: relative;
      float: left;
      width: 100%;
      margin-top: 50px;
      margin-bottom: 30px;

      p{
        width: 400px;
        height: 58px;
        font-size: 22px;
        color: #fff;
        margin-left: 50%;
        transform: translateX(-50%);
        border-radius: 8px;
        text-align: center;
        line-height: 58px;
        background: #417DF4;
      }
    }
  }
}
.header p::before{
  bottom: 20px;
    width: 5px;
    height: 5px;
    border-radius: 30px;
    background:#373737;
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.header p a{
  color: #F0F2F7;
}
</style>
