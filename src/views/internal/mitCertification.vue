<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_head"></div>
      <div class="tab_content">
        <!-- 搜索 -->
        <div class="searchPanel" ref="header" style="min-height: 5px"></div>
        <!-- 表格 -->
        <div class="tablePanel">
          <div class="contentx">
            <div class="fi_img">
              <img :src="shenhe" />
            </div>
            <div class="fi_imgx">认证审核中</div>
            <div class="fi_imgp">
              您的信息已提交，我们会尽快审核处理，请您耐心等待。
            </div>
            <div class="fi_content">
              <div class="con_title">{{ orgname }}</div>
              <div class="con_nei">
                <div class="nei_first" v-if="type == 1">认证类型：个人认证</div>
                <div class="nei_first" v-if="type == 2">认证类型：企业认证</div>
                <div class="nei_first">认证时间：{{ creatTime }}</div>
                <div class="nei_first">姓 名 ：{{ name }}</div>
              </div>
            </div>
            <div class="fi_imgpbutton">
              <div class="que" @click="que">确 定</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Debounce } from "../../libs/util";
import { dateFormat } from "@/utils/current";
import {} from "@/api";
export default {
  data() {
    return {
      orgname: "",
      name: "",
      type: "",
      creatTime: "",
      loading: false,
      shenhe: require("@/assets/login/shenhe.png"),
      tableHeight: null,
    };
  },
  watch: {},

  created() {
    this.information();
  },

  mounted() {},

  destroyed() {},
  computed: {},
  methods: {
    init() {
      // 计算页面高度
      this.pageHeight();
      window.onresize = () => {
        this.pageHeight();
      };
      this.checkOrgList();
    },
    pageHeight() {
      let pageHeight = Number(
        document.getElementsByClassName("single-page")[0].clientHeight
      );
      let headerHeight = this.$refs.header.clientHeight;
      let footerHeight = this.$refs.footer.clientHeight;
      this.tableHeight = pageHeight - headerHeight - footerHeight - 90;
    },
    information() {
      
      this.orgname = this.$route.query.orgName;
      this.name = this.$route.query.name;
      this.creatTime = dateFormat( this.$route.query.creatTime);
      this.type = this.$route.query.type;
    },
    goRouter(event) {
      this.$router.push({
        name: event,
        query: {},
      });
    },
    que() {
      this.$router.push({
        name: "accrInstitution",
        query: {},
      });
    },
    goAdd() {
      this.$router.push({
        name: "mitCertification",
        query: {},
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  float: left;
  width: 100%;
}

.head_btn {
  cursor: pointer;
}
.totl {
  float: left;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 44px;
  color: #759bee;
}

/deep/ .ivu-modal {
  top: 40%;
  // transform: translateY(-50%);

  .ivu-modal-content {
    padding: 10px 16px;
  }

  .ivu-modal-close {
    display: none;
  }

  .content {
    p {
      font-size: 18px;
      color: #383838;
      width: 100%;
      margin-top: 35px;

      .ivu-icon-md-alert {
        font-size: 26px;
        color: #dedede;
      }
    }

    h5 {
      color: #a6a6a6;
      font-size: 14px;
      text-align: center;
      margin-top: 10px;
    }
  }

  .ivu-modal-footer {
    border-top: none;
    padding-bottom: 18px;

    .ivu-btn {
      line-height: 34px;
      height: 34px;
      width: 90px;
      text-align: center;
      font-size: 13px;
    }

    .ivu-btn-primary {
      background: #0056fb;
    }
  }
}

.instion_logo {
  float: left;
  width: 30px;
  height: 34px;

  position: relative;
  margin-top: -1px;
}
.zongxiao {
  float: left;
  margin-top: -40px;
  position: absolute;
  color: white;
  font-size: 12px;
  width: 100%;
  margin-left: -10px;
}
.orgnaex {
  float: left;
  width: 84%;
  text-align: left;
}
.orgname1 {
  float: left;
  margin-left: 30px;
}
.seach_sou {
  float: left;
  width: 300px;
  height: 38px;
  margin-right: 15px;
  margin-top: 16px;
  border-radius: 10px;
  cursor: pointer;
}

/deep/.ivu-input {
  display: inline-block;
  width: 100%;
  height: 38px;
  line-height: 1.5;
  padding: 4px 7px;
  margin-top: 0px;
  font-size: 14px;
  background: #f7fbff;
  /* border: 1px solid #dcdee2; */
  /* border-radius: 4px; */
  color: #515a6e;
  border-radius: 10px;
  border: 1px solid #d9e1eb !important;
  /* background-color: #fff; */
  /* background-image: none; */

  position: relative;

  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

/deep/ .ivu-form .ivu-form-item-label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #515a6e;
  line-height: 1;
  padding: 12px 12px 10px 0;
  box-sizing: border-box;
}

.tex {
  text-align: center;
  height: 65px;
  margin-bottom: 30px;
  width: 90%;
  margin-left: 0%;
}

/deep/.ivu-select-single .ivu-select-selection {
  height: 38px;
  position: relative;
  border-radius: 10px;
  border: 1px solid #d9e1eb !important;
  background: #f7fbff;
}

/deep/.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  display: block;
  height: 38px;
  line-height: 38px;
}

/deep/ .ivu-select-selection .ivu-select-selected-value {
  display: block;
  height: 38px;
  line-height: 38px;
}

.contentx {
  width: 100%;
  position: relative;
}
.fi_img {
  position: absolute;
  width: 81px;
  height: 78px;
  margin: auto;
  left: 0;
  right: 0;
  top: 100px;
}
.fi_img img {
  float: left;
  width: 100%;
  height: 100%;
}
.fi_imgx {
  position: absolute;
  width: 100px;
  margin: auto;
  left: 0;
  right: 0;
  top: 200px;
  text-align: center;
  color: #2b2b2b;
  font-size: 16px;
}
.fi_imgp {
  position: absolute;

  margin: auto;
  left: 0;
  right: 0;
  top: 230px;
  text-align: center;
  color: #acacac;
  font-size: 12px;
}

.fi_content {
  position: absolute;
  width: 550px;
  height: 180px;
  background: #f8fbfd;
  border: 1px solid #ebebeb;
  margin: auto;
  left: 0;
  right: 0;
  top: 260px;
}

.con_title {
  float: left;
  width: 95%;
  margin-top: 20px;
  color: #434343;
  padding-left: 2.5%;
}

.con_nei {
  float: left;
  width: 95%;
  margin-left: 2.5%;
}
.nei_first {
  float: left;
  width: 50%;
  margin-top: 25px;
}

.fi_imgpbutton {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 514px;
  width: 200px;
  text-align: center;
  color: #acacac;
  font-size: 12px;
}
.que {
  width: 227px;
  height: 52px;
  background: #0056fb;
  border-radius: 4px;
  text-align: center;
  color: white;
  line-height: 52px;
  cursor: pointer;
}
</style>
