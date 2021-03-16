<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-23 14:14:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-30 23:11:17
-->


<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_head">
        <Tabs :value="$router.currentRoute.name">
          <TabPane label="认证信息" name="startCertification"></TabPane>
        </Tabs>
      </div>
      <div
        class="searchPanel"
        ref="header"
        style="
          background: #eff4ff;
          margin-top: 5px;
          border: 1px solid #d5e2ff;
          padding: 0px;
          min-height: 50px;
        "
      >
        <div class="totl">
          <Icon type="ios-alert" size="24" />
          第一个创建的校区为校区总部，其他校区为分校区，总部具有最高权限。
        </div>
        <!-- <div
            class="search"
            style="float:right;"
          >

            <Input
              class="search_input"
              v-model="searchForm.key"
              prefix="ios-search"
              @input="inputKey"
              placeholder="请输员工姓名或手机号码"
            />

            <Button
              class="search_btn"
              type="primary"
              @click="handleSearch"
            >搜索</Button>

          </div> -->
      </div>
      <div class="tab_content" :style="`height:${tableHeight}px;`">
        <!-- 搜索 -->

        <div class="information">
          <div class="title">
            <p>选择主体类型</p>
          </div>

          <div class="bulie">
            <div class="bulie_title">
              <div class="bu_fist">
                主体类型：

                <div
                  class="colx"
                  v-for="(item, index) in tabstitle"
                  @click="togtabstitle(index)"
                >
                  <div
                    class="buttom_ed"
                    :class="{ tabsactive: index == nowIndex1 }"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>

              <div class="bu_rang">
                个人:为根据法律规定和相关规定免于办理工商登记，无营业执照的商家。
              </div>

              <div class="bu_fist" style="margin-top: 20px">所需材料：</div>
              <div class="bu_fist" style="margin-top: 20px; color: #0c0c0c">
                1.证明店铺归属人的材料：法人手持证件照、法人身份证正反面照片；
              </div>
              <div class="bu_fist" style="margin-top: 20px; color: #0c0c0c">
                2.提供真实合法的经营信息：营业执照等信息；
              </div>

              <div class="bu_fist" style="margin-top: 20px; color: #0c0c0c">
                3.照片规则：照片需四角完整、清晰可辩，若加水印需保证照片重要信息清晰可辩；可提交复印件，每张复印件均需加盖完整红色印章；
              </div>
            </div>
          </div>

          <div class="btn_foot" style="margin-top: 370px">
            <div class="btn" @click="userAdd">
              <p style="border: none; color: #fff; background: #0056fb">
                开始认证
              </p>
            </div>
            <div class="btn" @click="back">
              <p>返回上一步</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>






<script>
import { mapState } from "vuex";
import {} from "@/api";
import { Debounce } from "../../libs/util";
import { dateFormat } from "@/utils/current";
import { uploadPic } from "../../libs/ali-oss";
export default {
  inject: ["reload"],
  data() {
    return {
      //步骤条
      current: 0,
      xz: require("@/assets/login/xz.png"),
      nowIndex1: 0,
      isEdit: "add",
      addlenght: 2,
      data: [],
      loading: true,
      tableHeight: 0,
      modalTitle: "",
      modalStatus: false,
      addressData: [],
      tabstitle: [{ name: "个人" }, { name: "企业" }],
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  destroyed() {
    // 销毁全局方法
    window.onresize = null;
  },
  computed: {
    ...mapState({
      menuBtns: (state) => state.menu.menuBtns,
    }),
  },
  methods: {
    togtabstitle: function (index) {
      this.nowIndex1 = index;

      console.log("测试" + this.nowIndex1);
    },
    // 上一步
    back() {
      this.$router.push({
        name: "accrInstitution",
        query: {},
      });
    },

    userAdd() {
      if (this.nowIndex1 == 0) {
        this.principalId = this.$route.query.principalId;
        this.checkOrgId = this.$route.query.checkOrgId;
        this.$router.push({
          name: "persCertificate",
          query: { principalId: this.principalId, checkOrgId: this.checkOrgId },
        });
      } else if (this.nowIndex1 == 1) {
        this.principalId = this.$route.query.principalId;
        this.checkOrgId = this.$route.query.checkOrgId;
        this.$router.push({
          name: "enteCertification",
          query: { principalId: this.principalId, checkOrgId: this.checkOrgId },
        });
      }
    },

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
      this.tableHeight = pageHeight - 90;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  float: left;
  width: 100%;

  .tab_content {
    position: relative;
    float: left;
    width: 100%;
    background: #fff;
    border-radius: 0 0 18px 18px;
    padding: 26px 38px 0 38px;
    overflow-y: auto;

    .information {
      position: relative;
      float: left;
      width: 100%;

      .title {
        position: relative;
        float: left;
        width: 100%;
        margin-bottom: 10px;

        p {
          position: relative;
          float: left;
          height: 46px;
          width: 100%;
          padding-left: 17px;
          line-height: 46px;
          font-size: 20px;
          color: #323232;
          font-weight: 550;
        }
      }

      .title::after {
        height: 18px;
        width: 4px;
        border-radius: 20px;
        background: #0056fb;
        position: absolute;
        content: "";
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
      }

      /deep/ .ivu-form {
        width: 510px;
        position: relative;
        float: left;

        .ivu-form-item {
          min-height: 46px;
          margin-bottom: 26px;

          .ivu-form-item-label {
            line-height: 46px;
            height: 46px;
            padding: 0 20px 0 0;
            font-size: 17px;
            color: #2a2a2a;
          }

          .ivu-form-item-content {
            input,
            textarea {
              background: #fff;
              border-radius: 10px;
              border: 1px solid #d9e1eb;
            }

            input {
              line-height: 46px;
              height: 46px;
            }

            textarea {
              height: 150px;
            }
          }

          .ivu-form-item-error-tip {
            left: 180px;
            top: 10px;
          }

          .ivu-radio-group {
            margin-top: 5px;

            label {
              color: #6b6b6b;
              margin-right: 28px;
            }
          }

          .ivu-checkbox-group {
            margin-top: 6px;

            label {
              color: #6b6b6b;
            }
          }

          .ivu-switch {
            margin-top: 8px;
            width: 56px;
            height: 28px;
          }

          .ivu-switch-checked {
            border-color: #689cff;
            background-color: #689cff;
          }

          .ivu-switch:after {
            width: 22px;
            height: 22px;
            left: 2px;
            top: 2px;
          }

          .ivu-switch-checked:after {
            left: 30px;
          }
        }

        h5 {
          color: #b7b7b7;
          position: relative;
          width: 100%;
          padding-left: 180px;
          font-size: 14px;
          height: 14px;
          line-height: 14px;
          margin-top: -13px;
          font-weight: 500 !important;
          margin-bottom: 10px;
        }
      }

      /deep/ .role {
        position: relative;
        float: left;
        width: 100%;
        padding: 0 12px;

        .hint {
          font-size: 14px;
          color: #787878;
          margin-top: -14px;
        }

        .ivu-radio-group {
          margin-bottom: 24px;
          margin-top: 10px;
        }

        .ivu-radio-group::before {
          content: "*";
          display: inline-block;
          margin-right: 4px;
          line-height: 1;
          font-family: SimSun;
          font-size: 14px;
          color: #ed4014;
          top: 50%;
          transform: translateY(-50%);
          left: -2px;
          position: absolute;
        }

        .ivu-radio-inner {
          border-radius: 4px !important;
        }

        .ivu-radio-inner:after {
          border-radius: 3px !important;
        }
      }

      .cont {
        position: relative;
        float: left;
        width: 100%;
        border-radius: 10px;
        border: 2px solid #d9e1eb;
        min-height: 200px;
        padding: 15px 20px;

        p {
          position: relative;
          float: left;
          width: 100%;
          color: #3e3e3e;
          font-size: 16px;
          margin-bottom: 4px;
        }

        h5 {
          position: relative;
          float: left;
          width: 100%;
          font-size: 14px;
          color: #787878;
          margin-bottom: 12px;
        }

        .ivu-tree {
          min-width: 250px;
          display: inline-block;
          position: relative;
          float: left;
        }
      }
    }

    .btn_foot {
      position: relative;
      float: left;
      width: 100%;
      margin-bottom: -30px;
      margin-top: 20px;

      .btn {
        float: right;
        position: relative;
        margin-left: 24px;

        p {
          width: 140px;
          border-radius: 4px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: #8f8f8f;
          color: 18px;
          border: 1px solid #cccccc;
        }
      }
    }
  }
}

/deep/ .ivu-upload-drag {
  border: 0px;
}

img {
  width: 100%;
}

.demo-upload-list {
  width: 58px;
  height: 58px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 58px;
    height: 58px;
    object-fit: cover;
    position: relative;
    float: left;
    border-radius: 50%;
  }

  .removeIcon {
    position: absolute;
    right: -7px;
    top: -7px;
    color: red;
    font-size: 16px;
    z-index: 8;
  }

  .eyeIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
    z-index: 7;
    font-weight: 550;
    display: none;
  }
}

.demo-upload-list:hover {
  .eyeIcon {
    display: block;
  }
}

.demo-upload-list:hover::before {
  width: 58px;
  height: 58px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #ffffff, $alpha: 0.6);
  content: "";
  display: block;
  z-index: 6;
}

.demo-upload-list2 {
  width: 185px;
  height: 201px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 185px;
    height: 201px;
    object-fit: cover;
    position: relative;
    float: left;
  }

  .removeIcon {
    position: absolute;
    right: -7px;
    top: -7px;
    color: red;
    font-size: 16px;
    z-index: 8;
  }

  .eyeIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
    z-index: 7;
    font-weight: 550;
    display: none;
  }
}

.demo-upload-list2:hover {
  .eyeIcon {
    display: block;
  }
}

.demo-upload-list2:hover::before {
  width: 185px;
  height: 201px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #ffffff, $alpha: 0.6);
  content: "";
  display: block;
  z-index: 6;
}
.tjban {
  width: 185px;
  height: 201px;
  line-height: 201px;
  border: 1px solid #71a2ff;
  border-radius: 10px;
}
.tj {
  width: 50px;
  height: 50px;
  float: left;
  margin-left: 70px;
  margin-top: 50px;
}

.title_img {
  float: left;
  margin-top: -85px;
  margin-left: 66px;
  color: #71a2ff;
  height: 30px;
}

.tp {
  float: right;
  margin-right: -504px;
  margin-top: 150px;
  width: 640px;
  font-size: 13px;
}
.tpactive {
  float: right;
  margin-right: -504px;
  margin-top: -75px;
  width: 640px;
  font-size: 13px;
}
.tp a {
  float: left;
  width: 100%;
  color: #e8748a;
}

.demo-upload-list3 {
  width: 233px;
  height: 163px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 233px;
    height: 163px;
    object-fit: cover;
    position: relative;
    float: left;
  }

  .removeIcon {
    position: absolute;
    right: -7px;
    top: -7px;
    color: red;
    font-size: 16px;
    z-index: 8;
  }

  .eyeIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
    z-index: 7;
    font-weight: 550;
    display: none;
  }
}

.demo-upload-list3:hover {
  .eyeIcon {
    display: block;
  }
}

.demo-upload-list3:hover::before {
  width: 233px;
  height: 163px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #ffffff, $alpha: 0.6);
  content: "";
  display: block;
  z-index: 6;
}

.tjban3 {
  width: 233px;
  height: 163px;
  line-height: 201px;
  border: 1px solid #71a2ff;
  border-radius: 10px;
}
.tj3 {
  width: 50px;
  height: 50px;
  float: left;
  margin-left: 93px;
  margin-top: 50px;
}

.title_img3 {
  float: left;
  margin-top: -85px;
  margin-left: 90px;
  color: #71a2ff;
  height: 30px;
}

.tp3 {
  float: right;
  margin-right: -550px;
  margin-top: 108px;
  width: 640px;
  font-size: 13px;
}
.tpactive3 {
  float: right;
  margin-right: -550px;
  margin-top: -67px;
  width: 640px;
  font-size: 13px;
}
.tp3 a {
  float: left;
  width: 100%;
  color: #e8748a;
}

.taba {
  width: 510px;
  position: relative;
  float: left;
}

/deep/ .ivu-steps {
  display: flex;
  width: 50%;
  font-size: 0;
  margin-left: 25%;
  line-height: 1.5;
}

/deep/ .ivu-steps .ivu-steps-title {
  display: block;
  margin-top: 15px;
  margin-left: -26px;
}

/deep/ .ivu-steps-item {
  display: inline-block;
  position: relative;
  vertical-align: top;
  flex: 1;
  overflow: inherit;
}

.totl {
  float: left;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 44px;
  color: #759bee;
  background: #eff4ff;
  border: 1px solid #d5e2ff;
  margin-top: 10px;
}

.bulie {
  float: left;
  width: 90%;
  height: 50px;
  margin-left: 5%;
}
.cox {
  float: left;
  width: 200px;
  height: 50px;
}
.bu_fist {
  float: left;
  width: 100%;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #2a2a2a;
  line-height: 30px;
}

.tabsactive {
  color: white;
  background-image: url("../../assets/login/xz.png");
  background-size: 100% 100%;
  border: 0px !important;
}

.buttom_ed {
  width: 112px;
  height: 55px;
  text-align: center;
  line-height: 55px;
  font-size: 15px;
  float: left;
  cursor: pointer;
  margin-left: 15px;
  border-radius: 10px;
  border: 1px solid #d9e1eb;
}
.bulie_title {
  float: left;
  width: 100%;
}
.colx {
  margin-left: 120px;
  margin-top: -33px;
}
.bu_rang {
  float: left;
  width: 500px;
  height: 50px;
  background: #f2f5fa;
  margin-top: 20px;
  margin-left: 140px;
  line-height: 50px;
  color: #5e5f7f;
  padding-left: 5px;
}
.btn {
  cursor: pointer;
}
</style>