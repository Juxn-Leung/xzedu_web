<template>
  <div id="agreement">
    <div class="header">
      <Form
        :model="formItem"
        :label-width="120"
      >
        <FormItem label="是否存在问题">
          <RadioGroup @on-change="changeRadio">
            <Radio :label="`${Number(1)}`">是</Radio>
            <Radio :label="`${Number(0)}`">否</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem
          label="问题描述"
          class="textareaItem"
          v-if="disabled==false"
        >
          <Input
            v-model="formItem.content"
            type="textarea"
            placeholder="请描述存在的详细问题"
            :disabled="disabled"
          ></Input>
        </FormItem>

        <FormItem
          label="整改期限"
          v-if="disabled==false"
        >
          <DatePicker
            type="date"
            placeholder="请选择"
            :clearable="false"
            :disabled="disabled"
            @on-change="changeDate"
          ></DatePicker>
        </FormItem>
      </Form>
    </div>

    <div class="btn">
      <Button @click="empty">取消</Button>
      <Button
        type="primary"
        @click="sub"
      >确定</Button>
    </div>

    <div
      class="contnet"
      :class="close==true?'contnetClose':''"
    >
      <div
        class="title"
        @click="scrollMessage"
      >
        <p>历史排查<span>({{issueList.length}})</span></p>

        <img src="../../../assets/whiteList/top.png">
      </div>

      <template v-for="item in issueList">
        <div class="demoList">
          <div class="demo">
            <div class="label">
              <p>排查时间</p>
            </div>
            <div class="cont">
              <p>{{item.dt}}</p>
            </div>
          </div>
          <div class="demo">
            <div class="label">
              <p>是否存在问题</p>
            </div>
            <div class="cont">
              <p :style="`color:${item.isProblem==0?'':color};`">{{item.isProblem==0?'否':'是'}}</p>
            </div>
          </div>
          <div class="demo" v-if="item.isProblem==1">
            <div class="label">
              <p>问题描述</p>
            </div>
            <div class="cont">
              <p :style="`color:${color};`">{{item.content}}</p>
            </div>
          </div>
          <div class="demo" v-if="item.isProblem==1">
            <div class="label">
              <p>整改期限</p>
            </div>
            <div class="cont">
              <p>{{item.reformTerm}}</p>
            </div>
          </div>
          <div
            class="operate"
            v-if="item.op==0&&item.isProblem==1"
          >
            <p @click="doIns(item.id,1)">未整改</p>
            <p @click="doIns(item.id,2)">已整改</p>
          </div>
          <div
            class="operate2"
            v-if="item.op==2&&item.isProblem==1"
          >
            <p>已整改</p>
          </div>
          <div
            class="operate3"
            v-if="item.op==1&&item.isProblem==1"
          >
            <p>未整改</p>
          </div>
        </div>
      </template>
    </div>
    <l-modal
      v-if="modalShow==true"
      :title="modalTitle"
      @confirm="confirm"
      @cancel="closeModal"
    ></l-modal>
  </div>
</template>

<script>
import { getAddresslist, insList, submitIns, doIns } from "@/api";

import LModal from "../components/modal.vue";

export default {
  data() {
    return {
      formItem: {
        isProblem: null,
        content: "",
        reformTerm: null,
      },

      issueList: [],

      modalShow: false,
      modalTitle: "",
      modalId: null,
      color: "#FF4B67",
      disabled: false,
      close: true,
    };
  },

  components: {
    LModal,
  },

  created() {
    this.uid = this.$route.query.uid;
    this.orgId = this.$route.query.id;
  },

  mounted() {
    this.insList();
  },
  methods: {
    scrollMessage() {
      if (this.close == false) {
        this.close = true;
      } else {
        this.close = false;
      }
    },

    sub() {
      this.modalTitle = "确定提交";
      this.showModal();
    },

    showModal() {
      this.modalShow = true;
    },

    closeModal() {
      this.modalShow = false;
      this.modalTitle = "";
    },

    confirm() {
      if (this.formItem.isProblem == null) {
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: "请填写完整信息!",
        });
        this.closeModal();
      } else if (this.formItem.isProblem == 1) {
        if (
          this.formItem.content == "" ||
          this.formItem.reformTerm == "" ||
          this.formItem.reformTerm == null
        ) {
          this.$Message.error({
            top: 300,
            closable: true,
            duration: 3,
            content: "请填写完整信息!",
          });
          this.closeModal();
        } else {
          this.submitIns();
          this.closeModal();
        }
      } else {
        this.closeModal();
        this.submitIns();
      }
    },

    changeDate(event) {
      this.formItem.reformTerm = event;
    },

    changeRadio(event) {
      console.log(event);
      if (event == 1) {
        this.formItem = {
          content: "",
          reformTerm: null,
        };
        this.disabled = false;
        this.formItem.isProblem = 1;
      } else {
        this.disabled = true;
        this.formItem.isProblem = 0;
      }
    },

    empty() {
      this.formItem = {
        isProblem: null,
        content: "",
        reformTerm: null,
      };
    },

    insList() {
      let obj = {
        pageNumber: 1,
        pageSize: 100,
      };
      obj.uid = this.uid;
      obj.orgId = this.orgId;
      insList(obj).then((res) => {
        if (res.code == 200) {
          this.issueList = res.result.content;
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

    submitIns() {
      let obj = this.formItem;
      obj.uid = this.uid;
      obj.orgId = this.orgId;
      submitIns(obj).then((res) => {
        if (res.code == 200) {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
          this.empty();
          this.insList();
        } else {
          this.modalTitle = res.message;
          this.showModal();
        }
      });
    },

    doIns(id, op) {
      let obj = {};
      obj.uid = this.uid;
      obj.insId = id;
      obj.op = op;
      doIns(obj).then((res) => {
        if (res.code == 200) {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
          this.insList();
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
  },
};
</script>

<style lang="scss" scoped>
#agreement {
  position: relative;
  float: left;
  // margin-left: 50%;
  max-width: 750px;
  width: 100%;
  // transform: translateX(-50%);
  background-size: cover;
  padding: 0;
  z-index: 770;
  background: #f7f8fa;
  overflow: hidden;
  padding: 9px 12px;

  .header {
    width: 100%;
    background: #fff;
    float: left;
    position: relative;
    border-radius: 30px;
    padding: 12px 17px;

    /deep/ .ivu-form-item {
      min-height: 50px;
      width: 100%;
      position: relative;
      float: left;
      padding-left: 120px;
      margin-bottom: 6px;
      border-bottom: 1px solid #f7f7f7;

      .ivu-form-item-label {
        padding: 0;
        text-align: left;
        line-height: 50px;
        height: 50px;
        font-size: 15px;
        color: #121212;
        font-weight: 550;
        position: absolute;
        left: 0;
        top: 0;
      }

      .ivu-form-item-content {
        width: 100%;
        position: relative;
        float: left;
        margin-left: 0 !important;

        .ivu-radio-group {
          width: 100%;
          text-align: right;

          .ivu-radio-wrapper {
            width: 90px;
            margin-right: 0;
            position: relative;
            height: 50px;
            line-height: 50px;
          }
        }
      }

      .ivu-input-with-suffix,
      .ivu-select-placeholder,
      .ivu-select-selected-value {
        border: none;
        height: 50px;
        line-height: 50px;
        text-align: right;
      }

      .ivu-input-prefix i,
      .ivu-input-suffix i {
        font-size: 16px;
        line-height: 32px;
        color: #808695;
        position: absolute;
        top: 9px;
      }

      .ivu-icon:before {
        content: "\F11F" !important;
      }
    }

    /deep/ .ivu-form-item:last-child {
      border-bottom: none;
    }

    /deep/ .textareaItem {
      height: 146px;
      padding-left: 0;

      .ivu-input-type-textarea {
        position: absolute;
        top: 45px;

        .ivu-input {
          height: 80px !important;
          background: #f7f8fa;
          border: none;
          border-radius: 7px;
        }
      }
    }
  }

  .btn {
    position: relative;
    width: 100%;
    float: left;

    /deep/ Button {
      width: 160px;
      height: 40px;
      margin: 13px 0;
      border: none;

      span {
        font-size: 15px;
        color: #fff;
      }
    }

    /deep/ .ivu-btn-default {
      background: #dddddd;
    }

    /deep/ .ivu-btn-primary {
      background: #006bff;
      float: right;
    }
  }

  .contnet {
    width: 100%;
    background: #fff;
    float: left;
    position: relative;
    border-radius: 30px;
    padding: 12px 0;
    overflow: hidden;

    .title {
      height: 40px;
      line-height: 40px;
      padding-left: 5px;
      width: 100%;
      position: relative;
      padding: 0 16px;

      p {
        font-size: 16px;
        font-weight: 550;
        color: #121212;

        span {
          color: #006bff;
        }
      }

      img {
        position: absolute;
        right: 20px;
        width: 13px;
        height: 13px;
        object-fit: contain;
        display: block;
        top: 40%;
        transition: all 0.2s;
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        /* IE 9 */
        -moz-transform: rotate(0deg);
        /* Firefox */
        -webkit-transform: rotate(0deg);
        /* Safari 和 Chrome */
        -o-transform: rotate(0deg);
      }
    }

    .demoList {
      position: relative;
      float: left;
      width: 100%;
      padding: 0 16px;
    }

    .demoList::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      background: #f5f5f5;
      height: 1px;
      width: 100%;
    }

    .demo {
      width: 100%;
      position: relative;
      float: left;
      min-height: 44px;

      .label {
        line-height: 44px;
        width: 40%;
        position: relative;
        float: left;
        height: 44px;

        p {
          font-size: 15px;
          color: #121212;
          font-weight: 550;
        }
      }

      .cont {
        width: 60%;
        position: relative;
        float: left;
        min-height: 40px;

        p {
          vertical-align: middle;
          text-align: right;
          width: 100%;
          font-size: 13px;
          color: #525252;
          font-weight: 550;
          position: absolute;
          box-sizing: border-box;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          display: inline-block;
        }
      }
    }

    .operate {
      position: relative;
      float: left;
      width: 100%;
      padding: 0 28px;
      margin: 0 0 22px 0;

      p {
        width: 120px;
        border-radius: 10px;
        text-align: center;
        line-height: 40px;
        height: 40px;
        color: #fff;
        position: relative;
      }

      p:nth-child(1) {
        background: #ffc000;
        float: left;
      }

      p:nth-child(2) {
        background: #006bff;
        float: right;
      }
    }

    .operate2 {
      position: relative;
      float: left;
      width: 100%;
      padding: 0 28px;
      margin: 0 0 22px 0;

      p {
        width: 120px;
        border-radius: 10px;
        text-align: center;
        line-height: 40px;
        height: 40px;
        color: #2278ff;
        position: relative;
        border: 1px solid #e2edff;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }

    .operate3 {
      position: relative;
      float: left;
      width: 100%;
      padding: 0 28px;
      margin: 0 0 22px 0;

      p {
        width: 120px;
        border-radius: 10px;
        text-align: center;
        line-height: 40px;
        height: 40px;
        color: #ff556e;
        position: relative;
        border: 1px solid #fdeded;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .contnetClose {
    height: 64px;

    .title img {
      transform: rotate(180deg) !important;
      -ms-transform: rotate(180deg) !important;
      /* IE 9 */
      -moz-transform: rotate(180deg) !important;
      /* Firefox */
      -webkit-transform: rotate(180deg) !important;
      /* Safari 和 Chrome */
      -o-transform: rotate(180deg) !important;
    }
  }
}
</style>