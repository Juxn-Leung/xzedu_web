<template>
  <div id="agreement">
    <img
      src="../../../assets/answer/answer_bg.jpg"
      class="bg"
    >

    <div
      class="selectPanel"
      :style="`margin-top:${top}px;`"
    >
      <Form
        :model="formItem"
        label-position="top"
      >
        <FormItem label="选择机构">
          <Select
            v-model="formItem.orgId"
            :value="formItem.orgId"
            transfer
            :filterable="true"
            remote
            :remote-method="aOrgList"
            :loading="loading"
            placeholder="请输入您所在的培训机构"
          >
            <template v-for="item in orgList">
              <Option :value="item.id">{{item.name}}</Option>
            </template>
          </Select>
        </FormItem>
      </Form>

      <div
        class="btn"
        :class="formItem.orgId!==null?'btn_active':''"
      >
        <Button
          type="primary"
          @click="sub"
        >开始答题</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { aOrgList, genPaper } from "@/api";
export default {
  data() {
    return {
      formItem: {
        orgId: null,
      },

      orgList: [],

      top: "",

      loading: false,
    };
  },

  created() {
    this.getHeight();
    // this.aOrgList();
  },

  mounted() {},
  methods: {
    getHeight() {
      var h =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.top = h / 2;
    },

    aOrgList(query = "") {
      let obj = {};
      obj.key = query;
      this.loading = true;
      aOrgList(obj).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.orgList = res.result;
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

    sub() {
      if (this.formItem.orgId !== null) {
        let obj = this.formItem;
        genPaper(obj).then((res) => {
          if (res.code == 200) {
            setTimeout(() => {
              this.$router.push({
                name: "h5-answer",
                query: {
                  paperId: res.result.paperId,
                  questionCnt: res.result.questionCnt,
                },
              });
            }, 1000);
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
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: "请先选择培训机构~",
        });
      }
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
  background: #fff;
  overflow-x: hidden;

  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .selectPanel {
    z-index: 7;
    position: relative;
    width: 100%;
    transform: translateY(-100%);
    height: 70px;
    padding: 0 20px;

    /deep/ .ivu-form-item-content {
      border-bottom: 1px solid #9797de;

      .ivu-select-input {
        color: #fff;
        padding-left: 0;
      }
    }

    /deep/ .ivu-form-item-label {
      color: #fff;
      font-size: 16px;
    }

    /deep/ .ivu-select-selection {
      background: transparent;
      border: none !important;
      color: #d1d1ed;
      font-size: 16px;

      .ivu-icon-ios-arrow-down:before {
        content: "\F11C" !important;
        color: #fff;
      }
    }

    /deep/ .ivu-select-placeholder {
      padding: 0;
      font-size: 16px;
      color: #d1d1ed;
    }

    /deep/ .ivu-select-visible .ivu-select-arrow {
      transform: translateY(-50%) rotate(90deg) !important;
      display: inline-block;
    }

    .btn {
      width: 100%;
      position: relative;
      float: left;
      margin-top: 70px;

      /deep/ button {
        width: 100%;
        border-radius: 60px;
        text-align: center;
        line-height: 50px;
        height: 50px;
        background: #dedef6;
        font-size: 18px;
        color: #c7c1ff;
        border: none;
        font-weight: 550;
        box-shadow: 2px 0 12px rgba($color: #6daaff, $alpha: 0.13);
      }
    }

    .btn_active {
      /deep/ button {
        background: #ffffff;
        color: #7775f2;
      }
    }
  }
}

/deep/ .ivu-select-dropdown-transfer {
  max-width: 100%;
  left: 0;
  max-width: 100%;

  .ivu-select-dropdown-list {
    min-width: auto;
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
  }
}
</style>