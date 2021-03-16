<template>
  <div id="agreement">
    <div class="header">
      <div class="title">
        <h5>机构管理</h5>
        <div
          class="menu"
          @click="showRightPanel"
        >
          <p></p>
        </div>
      </div>
      <div class="tabPanel">
        <Tabs @on-click="inquire">
          <TabPane
            label="全部"
            name="0"
          >
            <slot name="content"></slot>
          </TabPane>
          <TabPane
            label="存在问题"
            name="1"
          >
            <slot name="content"></slot>
          </TabPane>
        </Tabs>
      </div>

      <div
        class="container"
        :style="`height:${listHeight}px;`"
        slot="content"
      >
        <Scroll
          :on-reach-bottom="handleReachBottom"
          loading-text="加载中"
          :distance-to-edge="10"
          :height="(listHeight-100)"
        >
          <template v-for="(item,index) in orgList">
            <div class="demo">
              <p
                v-if="item.status==1"
                class="label"
                style="background:#E3EFFF;color:#3D90FF;"
              >合法</p>
              <p
                v-if="item.status==2"
                class="label"
                style="background:#FFE3E4;color:#FF3D3D;"
              >非法</p>
              <p
                v-if="item.status==3"
                class="label"
                style="background-color: #fff5e0; color: #f7a93a;"
              >整改中</p>
              <p
                v-if="item.status==4"
                class="label"
                style="background:#E3EFFF;color:#3D90FF;"
              >注册</p>
              <div class="orgName">
                <p>{{item.orgName}}</p>
              </div>
              <div
                class="issue"
                v-if="item.isProblem==1"
              >
                <p><span>1</span> 存在问题</p>
              </div>

              <div class="btn">
                <p @click="eidt(item.orgId)">修改</p>
                <p @click="check(item.orgId)">排查</p>
              </div>
            </div>
          </template>
        </Scroll>

      </div>
    </div>

    <div class="seach">
      <Cascader
        :data="addressData"
        :value="areaId"
        v-model="areaId"
        @on-change="changeCascader"
        transfer
        :clearable="false"
        :render-format="format"
        style="width: 35%;
              margin-right: 3%;
              position: relative;
              float: left;"
      >
      </Cascader>
      <Select
        @on-change="changeSelect"
        v-model="formItem.status"
        style="width: 35%;
              margin-right: 3%;
              position: relative;
              float: left;"
      >
        <Option
          v-for="item in stateList"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}</Option>
      </Select>

      <div
        class="searchBtn"
        @click="showSeach"
      >
        <Input
          placeholder="搜索"
          disabled
        >
        <Icon
          type="ios-search"
          slot="prefix"
        />
        </Input>
      </div>
    </div>

    <div
      class="shade"
      v-if="seachShow==1"
      @click="closeSeach"
    >
      <div
        class="searchBtn"
        :class="`${seachShow==1?'unfold':''}`"
        @click.stop="prevent"
      >
        <Input
          v-model="formItem.key"
          placeholder="请输入机构名称进行搜索"
          autofocus
        >
        <Icon
          type="ios-search"
          slot="prefix"
        />
        </Input>
      </div>
      <p
        class="btn"
        @click.stop="goSearch"
      >搜索</p>
    </div>

    <div
      class="bottomPanel"
      v-if="seachShow==0"
    >
      <div class="btn" @click="add">
        <div class="img"></div>
        <p>添加机构</p>
      </div>
    </div>

    <div
      class="rightPanel"
      :class="`${featureShow==1?'show':''}`"
    >
      <div class="head">
        <div
          class="closeIcon"
          @click="closeRightPanel"
        ></div>

        <img class="headPortrait">
        <p>教育局管理员</p>
      </div>

      <div class="content">
        <div class="demo">
          <img
            src="../../../assets/whiteList/icon.png"
            style="left:14px;"
          >
          <p>机构管理</p>
          <img
            src="../../../assets/whiteList/right.png"
            style="right:15px"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { attendGetInfo, getAreaList, wOrgList } from "@/api";

export default {
  data() {
    return {
      areaId: [],
      addressData: [],

      areaId: [],

      stateList: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "合法",
        },
        {
          value: 2,
          label: "非法",
        },
        {
          value: 3,
          label: "整改中",
        },
        {
          value: 4,
          label: "注册",
        },
      ],

      text: "",

      seachShow: 0,
      model: 0,

      featureShow: 0,

      userMessage: "",

      formItem: {
        pageNumber: 1,
        pageSize: 10,
        uid: "",
        areaId: null,
        key: "",
        status: 0,
        isProblem: 0,
      },

      total: 0,

      orgList: [
        // {
        //   orgId: 20,
        //   orgName: "小番茄培训机构",
        //   status: 1,
        //   isProblem: 0,
        // },
        // {
        //   orgId: 20,
        //   orgName: "小番茄培训机构",
        //   status: 2,
        //   isProblem: 1,
        // },
      ],
    };
  },

  created() {
    this.getHeight();
  },

  mounted() {
    this.attendGetInfo();
  },
  methods: {
    getHeight() {
      var h =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.listHeight = h - 160; //减去页面上固定高度height;
    },

    attendGetInfo() {
      if (
        sessionStorage.getItem("openid") &&
        sessionStorage.getItem("openid") != "undefined"
      ) {
        let openId = sessionStorage.getItem("openid");
        let obj = {
          openId,
        };
        attendGetInfo(obj).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.userMessage = res.result;
            this.formItem.uid = res.result.userId;
            this.getUserInfo(res.result.type);
          } else {
            this.$Message.error({
              top: 300,
              closable: true,
              duration: 3,
              content: res.message,
            });
          }
        });
      } else {
        // let obj = {
        //   openId: "oinbDvza6HCP9r4b8taZC5SGIRyA",
        // };
        // attendGetInfo(obj).then((res) => {
        //   console.log(res);
        //   if (res.code == 200) {
        //     this.userMessage = res.result;
        //     this.formItem.uid = res.result.userId;
        //     this.getUserInfo(res.result.name);
        //   } else {
        //     this.$Message.error({
        //       top: 300,
        //       closable: true,
        //       duration: 3,
        //       content: res.message,
        //     });
        //   }
        // });
      }
    },

    getUserInfo(type) {
      let areaIdMessage = this.userMessage.areaId;
      let stringResult = areaIdMessage.split(",");
      for(var i in stringResult){
        this.areaId.push(Number(stringResult[i]));
      }
      if (type === 2) {
        // 市级教育局
        this.formItem.areaId = null;
        this.getTownshipList(this.areaId[0], this.areaId[1]);
      } else {
        // 镇级教育局
        this.formItem.areaId = this.areaId[2];
        this.getTownshipList2(this.areaId[0], this.areaId[1], this.areaId[2]);
      }
      this.wOrgList();
    },

    getTownshipList(s_id, z_id) {
      let addressData = {};
      getAreaList({ level: 1 }).then((res) => {
        addressData = res.result;
        let newList = [];
        addressData.forEach((item) => {
          if (item.id == s_id) {
            newList = item;
            newList.children = [];
            newList.loading = false;
          }
        });
        addressData = newList;
        let newList2 = [];
        getAreaList({ pid: s_id, level: 2 }).then((res) => {
          res.result.forEach((item) => {
            if (item.id == z_id) {
              newList2 = item;
              newList2.children = [];
              newList2.loading = false;
            }
          });
          getAreaList({ pid: z_id, level: 3 }).then((res) => {
            newList2.children = res.result;
            newList2.children.splice(0,0,{id: 0, pid: 2123, name: "全中山", level: 3, value: 0, label: "全中山"});
            addressData.children.push(newList2);
            this.addressData.push(addressData);
          });
        });
      });
    },

    getTownshipList2(s_id, z_id, q_id) {
      let addressData = {};
      getAreaList({ level: 1 }).then((res) => {
        addressData = res.result;
        let newList = [];
        addressData.forEach((item) => {
          if (item.id == s_id) {
            newList = item;
            newList.children = [];
            newList.loading = false;
          }
        });
        addressData = newList;
        let newList2 = [];
        getAreaList({ pid: s_id, level: 2 }).then((res) => {
          res.result.forEach((item) => {
            if (item.id == z_id) {
              newList2 = item;
              newList2.children = [];
              newList2.loading = false;
            }
          });
          getAreaList({ pid: z_id, level: 3 }).then((res) => {
            res.result.forEach((item) => {
              if (item.id == q_id) {
                newList2.children.push(item);
                addressData.children.push(newList2);
                this.addressData.push(addressData);
              }
            });
          });
        });
      });
    },

    format(labels, selectedData) {
      const data = selectedData[2] || false;
      if (data) {
        return labels[1] + "/" + labels[2];
      }
      return labels[0];
    },

    wOrgList() {
      let obj = this.formItem;
      wOrgList(obj).then((res) => {
        if (res.code == 200) {
          if (this.formItem.pageNumber == 1) {
            this.orgList = res.result.content;
            this.total = res.result.totalPages;
          } else if (this.formItem.pageNumber == res.result.totalPages) {
            this.$Message.error({
              top: 300,
              closable: true,
              duration: 3,
              content: "没有更多数据了！",
            });
          } else {
            this.orgList.push(...res.result.content);
          }
        } else {
          this.$Message.error({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
        }
      });
    },

    resetPage() {
      this.pageNumber = 1;
      this.wOrgList();
    },

    inquire(name) {
      this.formItem.key = "";
      this.formItem.isProblem = name;
      this.resetPage();
    },

    changeCascader(e) {
      // console.log(e);
      this.formItem.key = "";
      this.formItem.areaId = e[2];
      this.resetPage();
    },

    changeSelect() {
      this.formItem.key = "";
      this.resetPage();
    },

    showSeach() {
      this.seachShow = 1;
    },

    closeSeach() {
      this.seachShow = 0;
    },

    goSearch() {
      this.resetPage();
      this.closeSeach();
    },

    prevent() {
      // 阻止冒泡
    },

    showRightPanel() {
      this.featureShow = 1;
    },

    closeRightPanel() {
      this.featureShow = 0;
    },

    eidt(id) {
      let uid = this.userMessage.userId;
      this.$router.push({
        name: "h5-eidtOrg",
        query: { 
          id,
          uid 
        },
      });
    },

    add(){
      let uid = this.userMessage.userId;
      this.$router.push({
        name: "h5-addOrg",
        query: {
          uid
        }
      });
    },

    check(id) {
      let uid = this.userMessage.userId;
      this.$router.push({
        name: "h5-modification",
        query: {
          id,
          uid
        }
      });
    },

    handleReachBottom() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.formItem.pageNumber++;
          this.wOrgList();
          resolve();
        }, 500);
      });
    },

  },
};
</script>

<style lang="scss" scoped>
#agreement {
  position: relative;
  float: left;
  margin-left: 50%;
  max-width: 750px;
  width: 100%;
  transform: translateX(-50%);
  background-size: cover;
  padding: 0;
  z-index: 770;
  background: #f7f8fa;
  overflow: hidden;

  .header {
    position: relative;
    width: 100%;
    float: left;
    z-index: 7;

    .title {
      position: relative;
      width: 100%;
      float: left;
      height: 50px;
      padding: 0 44px 0 8px;
      border-top: 1px solid #fbfbfb;
      border-bottom: 1px solid #fbfbfb;
      background: #ffffff;

      h5 {
        line-height: 64px;
        height: 50px;
        position: relative;
        float: left;
        font-size: 18px;
        color: #101010;
      }

      .menu {
        height: 50px;
        width: 44px;
        position: absolute;
        right: 0;
        top: 0;

        p {
          height: 50px;
          width: 44px;
          position: relative;
          float: left;
        }

        p::before {
          content: "";
          width: 6px;
          height: 6px;
          background: #fd752b;
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
        }

        p::after {
          content: "";
          width: 6px;
          height: 6px;
          background: #515151;
          position: absolute;
          left: 22px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
        }
      }

      .menu::before {
        content: "";
        width: 8px;
        height: 8px;
        background: #006bff;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 50%;
      }
    }

    .tabPanel {
      position: relative;
      width: 100%;
      float: left;

      /deep/ .ivu-tabs-nav-scroll {
        background: #ffffff;
        height: 36px;

        .ivu-tabs-nav {
          width: 100%;

          .ivu-tabs-tab {
            margin-right: 0;
            width: 50%;
            text-align: center;
          }

          .ivu-tabs-ink-bar {
            background: transparent;
          }

          .ivu-tabs-tab-active::after {
            content: "";
            background: #006bff;
            width: 100px;
            height: 6px;
            border-radius: 30px;
            bottom: -1px;
            left: 50%;
            transform: translateX(-50%);
            position: absolute;
          }
        }
      }

      /deep/ .ivu-tabs-content {
        margin-top: 75px;
      }
    }
  }

  .seach {
    position: absolute;
    top: 100px;
    width: 100%;
    padding: 0 8px;
    z-index: 7;

    /deep/ .ivu-input{
      z-index: -1;
    }

    /deep/ .ivu-input,
    /deep/ .ivu-select-selection {
      border-radius: 60px;
      border: none;
      line-height: 44px;
      height: 44px;
      text-align: center;

      .ivu-select-placeholder,
      .ivu-select-selected-value {
        line-height: 44px;
        height: 44px;
        text-align: center;
      }

      .ivu-cascader-arrow::after {
        position: absolute;
        left: 0;
        bottom: 0;
        content: "";
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 7px solid #3a4d78;
        top: 4px;
        left: 2px;
      }
    }

    /deep/ .ivu-input-disabled {
      background: #ffffff;
    }

    .searchBtn {
      position: relative;
      float: left;
      width: 22%;

      /deep/ .ivu-input-prefix {
        z-index: 0;
      }

      /deep/ .ivu-input-prefix i {
        font-size: 24px;
        line-height: 32px;
        color: #d2d2d2;
        top: 7px;
        position: absolute;
        left: 9px;
      }
    }
  }

  .shade {
    position: fixed;
    width: 100%;
    height: auto;
    left: 0;
    top: 85px;
    right: 0;
    bottom: 0;
    background: rgba($color: #000000, $alpha: 0.39);
    z-index: 7;

    .searchBtn {
      position: absolute;
      right: 0;
      padding: 0 12px;
      top: 15px;
      width: 22%;
      transition: all 0.3s;

      /deep/ .ivu-input {
        border-radius: 60px;
        border: none;
        line-height: 44px;
        height: 44px;
      }

      /deep/ .ivu-input-prefix {
        z-index: 0;
      }

      /deep/ .ivu-input-prefix i {
        font-size: 24px;
        line-height: 32px;
        color: #d2d2d2;
        top: 7px;
        position: absolute;
        left: 9px;
      }
    }

    .btn {
      width: 18%;
      height: 40px;
      position: absolute;
      right: 14px;
      top: 17px;
      border-radius: 60px;
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      line-height: 40px;
      background: #006bff;
      z-index: 7;
    }

    .searchBtn.unfold {
      width: 100%;
    }
  }

  .bottomPanel {
    position: fixed;
    background: rgba($color: #ffffff, $alpha: 0.75);
    width: 100%;
    height: 100px;
    z-index: 777;
    left: 0;
    bottom: 0;

    .btn {
      height: 88px;
      width: 60px;
      position: relative;
      float: left;
      margin-left: 50%;
      margin-top: 10px;
      transform: translateX(-50%);

      .img {
        width: 60px;
        height: 60px;
        position: relative;
        float: left;
        background: #006bff;
        border-radius: 50%;
      }

      .img::after {
        width: 30px;
        height: 5px;
        position: absolute;
        border-radius: 30px;
        background: #ffffff;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        content: "";
      }

      .img::before {
        height: 30px;
        width: 5px;
        position: absolute;
        border-radius: 30px;
        background: #ffffff;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        content: "";
      }

      p {
        width: 100%;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        color: #006bff;
        font-weight: 550;
        text-align: center;
      }
    }
  }

  .rightPanel {
    width: 180px;
    height: 100%;
    right: -180px;
    top: 0;
    bottom: 0;
    background: rgba($color: #ffffff, $alpha: 0.87);
    position: fixed;
    z-index: 778;
    transition: all 0.3s;
  }

  .rightPanel.show {
    right: 0;
    box-shadow: 0 0 14px rgba($color: #000000, $alpha: 0.24);

    .head {
      height: 100px;
      width: 100%;
      position: relative;
      float: left;
      padding-top: 65px;

      .headPortrait {
        width: 45px;
        height: 45px;
        right: 40px;
        border-radius: 50%;
        top: 15px;
        display: inline-block;
        position: absolute;
      }

      p {
        text-align: center;
        width: 125px;
        height: 30px;
        line-height: 30px;
        color: #1a1a1a;
        position: relative;
        float: right;
        font-size: 13px;
      }

      .closeIcon {
        left: 20px;
        top: 30px;
        width: 25px;
        height: 20px;
        background: url("../../../assets/whiteList/right_icon.png") center
          center no-repeat;
        background-size: contain;
        position: absolute;
      }
    }

    .content {
      position: relative;
      width: 100%;
      float: left;

      .demo {
        width: 100%;
        position: relative;
        float: left;
        height: 48px;
        background: #006bff;

        img {
          position: absolute;
          width: 14px;
          height: 14px;
          top: 50%;
          transform: translateY(-50%);
          display: inline-block;
          object-fit: contain;
          z-index: 7;
        }

        p {
          width: 100%;
          height: 48px;
          line-height: 48px;
          position: relative;
          float: left;
          text-align: center;
          font-size: 13px;
          color: #fff;
        }
      }
    }
  }

  .container {
    width: 100%;
    float: left;
    position: relative;
    // overflow-y: auto;
    padding: 0 8px 100px 8px;

    .demo {
      border-radius: 8px;
      width: 100%;
      background: #fff;
      height: 90px;
      margin-bottom: 8px;
      overflow: hidden;
      padding-left: 64px;
      padding-top: 12px;
      position: relative;
      float: left;

      .label {
        position: absolute;
        top: 12px;
        left: 0;
        width: 50px;
        border-radius: 0 30px 30px 0;
        padding-left: 10px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
      }

      .orgName {
        display: inline-block;
        padding: 2px 0;
        position: relative;
        float: left;
        margin-right: 4px;

        p {
          font-size: 15px;
          color: #101010;
          line-height: 20px;
          position: relative;
          font-weight: 550;
        }
      }

      .issue {
        position: relative;
        display: inline-block;
        padding: 2px 0;
        position: relative;

        span {
          height: 16px;
          width: 16px;
          display: inline-block;
          line-height: 16px;
          text-align: center;
          color: #fff;
          font-size: 12px;
          border-radius: 50%;
          background: #ff3d3d;
        }

        p {
          font-size: 13px;
          color: #ff3d3d;
          line-height: 20px;
          position: relative;
        }
      }

      .btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 130px;
        height: 30px;

        p {
          width: 60px;
          height: 30px;
          border-radius: 30px;
          font-size: 15px;
          font-weight: 550;
          color: #fff;
          line-height: 30px;
          text-align: center;
          position: relative;
          float: left;
        }

        p:nth-child(1) {
          background: #fd752b;
        }

        p:nth-child(2) {
          background: #006bff;
          float: right;
        }
      }
    }
  }

  ::-webkit-scrollbar {
    width: 0 !important;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
}
</style>