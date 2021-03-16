<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-23 14:14:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-30 23:11:17

--> 
<template>
  <div class="trainlist">
    <Row>
      <div class="header" ref="header">
        <div class="title">
          <span>我的账户</span>
        </div>
      </div>
     
    </Row>
    <!-- 账户信息 -->
    <Row>
      <div class="message">
        <div class="demo">
          <p class="title">订单总金额</p>
          <p class="num">{{ totalMoney }}</p>
        </div>
        <div class="demo">
          <p class="title">可提现金额(元)</p>
          <p class="num">{{ canMoney }}</p>
        </div>
        <div class="demo">
          <p class="title">正在申请提现金额</p>
          <p class="num">{{ ingMoney }}</p>
        </div>
        <div class="demo">
          <p class="title">已提现金额</p>
          <p class="num">{{ hasMoney }}</p>
        </div>

        <div class="demo" v-if="status == 1">
          <Button style="background: #f4c042; color: #fff" @click="showModal2">申请提现</Button>
          <p class="hint" style="color: #2d70f3" @click="showModal3">提现记录</p>
        </div>

        <div class="demo" v-else>
          <Button type="primary" @click="showModal">
            {{
            status !== 0 ? "绑定账户" : "立即验证"
            }}
          </Button>

          <p v-if="status == null && fillout == false" class="hint">(请先绑定账户，才能完成提现)</p>

          <p v-if="status == 0" class="hint">(若还未验证，请进行验证，已完成验证请耐心等待审核)</p>

          <p v-if="status == 2" class="hint" style="color: #f91938">(审核失败，请重新审核)</p>
          <p
            v-if="status == 2"
            class="hint"
            style="color: #2d70f3; margin-top: 0"
            @click="examine">查看原因</p>
        </div>
      </div>
    </Row>
    <div class="table_content">
      <!-- 表格 -->
      <Row class="table_panel">
        <Table :columns="columns" :data="data" ref="table" :loading="loading" :height="tableHeight"></Table>
      </Row>
      <!-- 分页 -->
      <Row type="flex" justify="end" class="page">
        <div ref="footer" class="footer">
          <Page
            :current="searchForm.pageNumber"
            :total="total"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
            :page-size-opts="[10, 20, 50]"
            show-total
            show-elevator
            show-sizer
          ></Page>
        </div>
      </Row>
    </div>

    <!--   弹框 -->
    <Modal
      v-model="modal"
      width="560"
      :styles="{ top: '20%' }"
      :class="fillout == true ? 'blueHeader' : ''"
    >
      <p
        v-if="fillout == false"
        slot="header"
        style="
          color: #606060;
          text-align: center;
          font-weight: 550;
          padding: 25px 0px;
        "
      >
        <span v-if="status == 2">审核不通过</span>
        <span v-else>绑定账户</span>
      </p>

      <p
        v-else
        slot="header"
        style="
          color: #606060;
          text-align: center;
          font-weight: 550;
          padding: 25px 0px;
        "
      >
        <span>
          请使用
          <a>{{ preStoreUtils.openingBank }} (尾号:{{ tailNum }})</a>
          向以下账号转款、即可完成绑定
        </span>
      </p>
      <div style="text-align: center" v-if="fillout == false">
        <Form
          v-if="showFail == false"
          ref="preStoreUtils"
          :model="preStoreUtils"
          :label-width="160"
          :rules="ruleValidate"
          :hide-required-mark="true"
        >
          <FormItem label="开户名称" prop="name">
            <Input v-model="preStoreUtils.name" />
            <p class="hint">
              对公账户跟主体证件上的机构名称保持一致，
              <a @click="showHint">对公账户填写指引</a>企业是必须要有对公账户的，若无对公账户请先办理对公账户
            </p>
          </FormItem>

          <FormItem label="开户银行" prop="bank">
            <Input v-model="preStoreUtils.bank" />
          </FormItem>

          <FormItem label="请输入正确的银行账号" prop="cardNumber">
            <Input v-model="preStoreUtils.cardNumber" @on-change="refoundNumber" />
          </FormItem>

          <div class="hint_panel" @click="closeHint" v-show="hint == true">
            <div class="content">
              <p class="title">1.对公账户填写(个体工商户)</p>
              <p class="cont">若个体工商户对公账户，可填写营业执照上法人的个人银行卡号。</p>
              <p class="cont">
                <span>温馨提示：</span>填写个人银行卡号需与营业执照上法人保持一致。
              </p>
              <p class="title">1.对公账户填写(企业类型)</p>
              <p class="cont">企业是必须要对公账户的，若无对公账户请先办理对公账户。</p>
            </div>
          </div>
        </Form>

        <Form :label-width="160" :hide-required-mark="true" v-else>
          <FormItem label="备注内容">
            <Input type="textarea" :rows="6" disabled :placeholder="reason" v-model="reason" />
          </FormItem>
        </Form>
      </div>

      <div style="text-align: center" v-else>
        <p class="message">
          收款方全称：
          <span>{{ recName }}</span>
        </p>
        <p class="message">
          收 款 银 行：
          <span>{{ recBank }}</span>
        </p>
        <p class="message">
          收 款 账 号：
          <span>{{ recAccount }}</span>
        </p>
        <p class="message">
          验 证 金 额：
          <a>{{ recMoney }}</a>
          <span>元</span>(认证成功会转至您的账户)
        </p>

        <p style="text-indent: 8px;color:#2c48fa;font-size:16px;">请备注:教培云验证</p>
      </div>

      <div slot="footer" v-if="fillout == false">
        <Button
          v-if="status!==1&&showFail==false"
          type="primary"
          :loading="modal_loading"
          @click="submitAudit"
        >提交申请</Button>
        <Button v-if="status==2&&showFail==true" type="primary" @click="closeModal">确定</Button>
      </div>

      <div slot="footer" v-else></div>
    </Modal>

    <!-- 提现弹框 -->
    <Modal
      v-model="modal2"
      width="560"
      :styles="{ top: '20%' }"
      :class="presentSuccess==false?'':'successHeader'"
    >
      <p
        slot="header"
        style="
          color: #606060;
          text-align: center;
          font-weight: 550;
          padding: 25px 0px;
        "
      >
        <span v-if="presentSuccess == false">申请提现</span>

        <span v-else>提交成功!</span>
      </p>

      <div style="text-align: center" v-if="presentSuccess==false">
        <Form
          ref="withdraw"
          :model="withdraw"
          :label-width="160"
          :rules="ruleValidate2"
          :hide-required-mark="true"
        >
          <FormItem label="公司名称">
            <Input disabled :placeholder="withdraw.myBank" />
          </FormItem>

          <FormItem label="提现账户">
            <Input disabled :placeholder="withdraw.myAccount" />
          </FormItem>

          <FormItem label="提现金额" prop="money">
            <Input v-model="withdraw.money" @on-change="refoundMoney" />
          </FormItem>

          <p>
            可提现金额:
            <span style="color:#417df4;">{{withdraw.allMoney}} 元</span>
            <a
              @click="allWithdraw"
              style="color:#417df4;padding: 1px 6px;border:1px solid #417df4;border-radius:15px;display:inline-block;"
            >全部提现</a>
          </p>
        </Form>

        <!-- <Form :label-width="160" :hide-required-mark="true" v-else>
          <FormItem label="备注内容">
            <Input
              type="textarea"
              :rows="6"
              disabled
              :placeholder="reason"
              v-model="reason"
            />
          </FormItem>
        </Form>-->
      </div>

      <div style="text-align: center;height:120px" v-else></div>

      <div slot="footer">
        <Button
          type="primary"
          v-if="presentSuccess==false"
          :loading="modal_loading"
          @click="submitwithdraw"
        >提交申请</Button>
        <Button v-else type="primary" @click="closeModal2">确 定</Button>
      </div>
    </Modal>

    <!-- 历史弹框 -->
    <Modal v-model="modal3" width="800" class="modal_table" :styles="{ top: '20%' }">
      <p
        slot="header"
        style="
          color: #606060;
          text-align: center;
          font-weight: 550;
          padding: 25px 0px;
        "
      >
        <span>提现记录</span>
      </p>

      <div style="text-align: center">
        <!-- 表格 -->
        <Row class="modalTable">
          <Table :columns="columns2" :data="data2" ref="table" :loading="loading2" height="300">
            <template slot-scope="{row}" slot="status">
              <p
                :style="row.status==0?'color:#343534;':'color:#2c48fa;'"
              >{{row.status==0?'已申请':'提现成功'}}</p>
            </template>
          </Table>
        </Row>
        <!-- 分页 -->
        <Row type="flex" justify="end" class="page">
          <div ref="footer" class="footer">
            <Page
              :current="outListForm.pageNumber"
              :total="total2"
              @on-change="changePage2"
              @on-page-size-change="changePageSize2"
              :page-size-opts="[10, 20, 50]"
              show-total
              show-elevator
              show-sizer
            ></Page>
          </div>
        </Row>
      </div>

      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { myAccount, bindAccount, checkInfo, cashOut, outList } from "@/api";
import { dateFormat } from "@/utils/current";
import { bankCardAttribution } from "../../utils/bankDetection.js";
import { similar } from "../../utils/similar.js";
export default {
  data() {
    const validateMoney = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("提现金额不能为空！"));
      } else {
        callback();
      }
    };
    return {
      columns: [
        {
          title: "课程名称",
          key: "courseName",
          align: "center",
          minWidth: 180,
        },
        {
          title: "学生名字",
          key: "consumerName",
          align: "center",
          minWidth: 60,
        },
        {
          title: "手机号码",
          key: "consumerPhone",
          align: "center",
          minWidth: 100,
        },
        {
          title: "下单时间",
          key: "orderTime",
          align: "center",
          minWidth: 100,
        },
        {
          title: "实付款",
          key: "payment",
          align: "center",
          minWidth: 80,
        },
      ],
      data: [],
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        orgId: "",
      },
      modal: false,
      total: 0,
      loading: true,
      binding: "",
      pass: false,
      again: false,
      status: null,
      mistake: false,
      showFail: false,
      tableHeight: 0,
      preStoreUtils: {
        name: "",
        bank: "",
        cardNumber: "",
      },
      modal_loading: false,
      hint: false,
      ruleValidate: {
        name: [
          {
            required: true,
            message: "开户名称",
            trigger: "blur",
          },
        ],
        bank: [
          {
            required: true,
            message: "开户银行",
            trigger: "blur",
          },
        ],
        cardNumber: [
          {
            required: true,
            message: "请输入正确的银行账号",
            trigger: "blur",
          },
        ],
      },
      fillout: false,
      tailNum: "",
      totalMoney: 0,
      canMoney: 0,
      ingMoney: 0,
      hasMoney: 0,

      message: "",
      recName: "",
      recBank: "",
      recAccount: "",
      recMoney: "",

      modal2: false,
      withdraw: {
        money: "",
        allMoney: "",
        orgId: "",
        myAccount: "",
        myBank: "",
      },

      ruleValidate2: {
        money: [
          {
            validator: validateMoney,
            trigger: "blur",
          },
        ],
      },
      presentSuccess: false,
      outListForm: {
        pageNumber: 1,
        pageSize: 10,
        orgId: "",
      },
      modal3: false,
      columns2: [
        {
          title: "提现时间",
          key: "createTime",
          align: "center",
        },
        {
          title: "提现金额",
          key: "money",
          align: "center",
        },
        {
          title: "提现状态",
          slot: "status",
          align: "center",
        },
      ],
      total2: 0,
      data2: [],
      loading2: true,
    };
  },
  watch: {
    //此步骤是为了更清楚的格式化银行卡号，每4位一个空格
    "preStoreUtils.cardNumber"(val) {
      this.$nextTick(() => {
        this.preStoreUtils.cardNumber = val
          .replace(/\D/g, "")
          .replace(/....(?!$)/g, "$& ");
      });
    },

    recAccount(val) {
      this.$nextTick(() => {
        this.recAccount = val.replace(/\D/g, "").replace(/....(?!$)/g, "$& ");
      });
    },

    "$store.state.organization.myOrgId"() {
      //监听vuex中userName变化而改变header里面的值
      this.myAccount();
      this.checkInfo();
    },

    "$store.state.organization.myCheckInfo"() {
      //监听vuex中userName变化而改变header里面的值
      this.status = this.$store.state.organization.myCheckInfo;
    },
  },
  created() {
    this.getUserInfo();
    this.myAccount();
    this.checkInfo();
    this.outList();
  },
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
    getUserInfo() {
      let userMessage = JSON.parse(sessionStorage.getItem("userInfo"));
      this.status = this.$store.state.organization.myCheckInfo;
      console.log(this.status)
    },

    init() {
      // 计算页面高度
      this.pageHeight();
      window.onresize = () => {
        this.pageHeight();
      };
    },
    /**
     * 页面&表格高度
     */
    pageHeight() {
      let pageHeight = Number(
        document.getElementsByClassName("single-page")[0].clientHeight
      );
      let headerHeight = this.$refs.header.clientHeight;
      let footerHeight = this.$refs.footer.clientHeight;
      this.tableHeight = pageHeight - headerHeight - footerHeight - 240;
    },

    loadData(item, callback) {
      item.loading = true;
      getAddresslist({ pid: item.id }).then((res) => {
        if (res.code == 200) {
          item.loading = false;
          item.children = res.result;
          if (item.level < 2) {
            item.children.forEach((it) => {
              it.loading = false;
              it.children = [];
            });
          }
          callback();
        }
      });
    },

    changePage(e) {
      this.searchForm.pageNumber = e;
      this.myAccount();
    },

    changePageSize(e) {
      this.searchForm.pageSize = e;
      this.myAccount();
    },

    myAccount() {
      let id = this.$store.state.organization.myOrgId;
      if (id !== "" && id !== null && id !== undefined) {
        console.log(this.$store.state.organization);
        this.preStoreUtils.name = this.$store.state.organization.myOrgName;

        if (this.searchForm.orgId !== "" && this.searchForm.orgId !== id) {
          this.searchForm.pageNumber = 1;
          this.searchForm.pageSize = 10;
        }
        this.searchForm.orgId = id;
        console.log(this.searchForm);
        myAccount(this.searchForm).then((res) => {
          if (res.code == 200) {
            // res.result
            this.totalMoney = res.result.totalMoney;
            this.canMoney = res.result.canMoney;
            this.ingMoney = res.result.ingMoney;
            this.hasMoney = res.result.hasMoney;
            this.data = res.result.content;
            this.total = res.result.totalElements;
            this.loading = false;

            this.withdraw.allMoney = res.result.canMoney;

            this.outList();
          }
        });
      }
    },

    bindAccount() {
      let id = this.$store.state.organization.myOrgId;
      let obj = JSON.parse(JSON.stringify(this.preStoreUtils));
      obj.orgId = id;
      obj.account = this.preStoreUtils.cardNumber;
      bindAccount(obj).then((res) => {
        if (res.code == 200) {
          this.recName = res.result.recName;
          this.recBank = res.result.recBank;
          this.recAccount = res.result.recAccount;
          this.recMoney = res.result.recMoney;
        }
      });
    },

    checkInfo() {
      let id = this.$store.state.organization.myOrgId;
      let obj = {
        orgId: id,
      };
      checkInfo(obj).then((res) => {
        if (res.code == 200) {
          if (
            res.result == null ||
            res.result == "" ||
            res.result == undefined
          ) {
            // 未申请
            this.$store.commit("organization/changeMyCheckInfo", null);
            this.fillout = false;
            this.status = null;
          } else {
            this.status = res.result.status;
            console.log(this.status);

            this.$store.commit(
              "organization/changeMyCheckInfo",
              res.result.status
            );
            if (res.result.status == 0) {
              // 未审核
              this.fillout = true;
              this.recName = res.result.recName;
              this.recBank = res.result.recBank;
              this.recAccount = res.result.recAccount;
              this.recMoney = res.result.recMoney;
              let obje = bankCardAttribution(res.result.recAccount);
              this.preStoreUtils.openingBank = obje.bankName;
              this.tailNum = res.result.recAccount.substring(
                res.result.recAccount.length - 4
              );
            } else if (res.result.status == 1) {
              // 审核通过
              this.withdraw.myAccount = res.result.myAccount;
              this.withdraw.myBank = res.result.myBank;
            } else if (res.result.status == 2) {
              // 审核不通过
              this.fillout = false;
              this.reason = res.result.reason;
            }
          }
        } else if (res.message == "培训机构不存在!") {
          this.loading = false;

          this.$Modal.confirm({
            title: "培训机构不存在!",
            content: "无法操作,请前往添加培训机构",
            onOk: () => {
              this.$router.push({ name: "orgManage" });
            },
            onCancel: () => {},
          });
        }
      });
    },

    // 弹出
    showModal() {
      this.modal = true;
      this.showFail = false;
      this.statue = null;
    },

    closeModal() {
      this.modal = false;
      this.showFail = false;
    },

    refoundNumber() {
      let number = this.preStoreUtils.cardNumber;
      let num = number.replace(/\s+/g, "");
      let obj = bankCardAttribution(num);
      if (obj === "error") {
        // this.$Message.error('请输入正确的银行卡号！');
        // console.log('请输入正确的银行卡号！');
      } else {
        this.preStoreUtils.openingBank = obj.bankName;
      }
    },

    closeHint() {
      this.hint = false;
    },

    showHint() {
      this.hint = true;
    },

    // 6212262011022937531
    // 6214837605272826

    submitAudit() {
      this.$refs["preStoreUtils"].validate((valid) => {
        if (valid) {
          let num = this.preStoreUtils.cardNumber;
          if (num.length == 19 || num.length == 23) {
            let similarity = similar(
              this.preStoreUtils.openingBank,
              this.preStoreUtils.bank
            );
            if (similarity > 0) {
              console.log(similarity);
              this.fillout = true;
              if (num.length == 19) {
                this.tailNum = num.substring(num.length - 4);
              } else {
                this.tailNum =
                  num.substring(num.length - 5, num.length - 4) +
                  num.substring(num.length - 3);
              }
              this.bindAccount();
              this.status = 0;
            } else {
              this.$Message.error("您输入的银行卡号与开户银行不匹配！");
            }
            // this.modal = false;
          } else {
            this.$Message.error("请输入正确的银行卡号！");
            return;
          }
        } else {
          this.$Message.error({
            top: 300,
            closable: true,
            duration: 3,
            content: "请填写完信息！",
          });
        }
      });
    },

    showModal2() {
      this.modal2 = true;
      this.withdraw.money = "";
    },

    // let id = this.$store.state.organization.myOrgId;
    allWithdraw() {
      this.withdraw.money = this.withdraw.allMoney;
    },

    // 申请提现
    submitwithdraw() {
      let id = this.$store.state.organization.myOrgId;
      this.withdraw.orgId = id;
      this.$refs["withdraw"].validate((valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.withdraw));
          cashOut(obj).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.presentSuccess = true;
              this.myAccount();
            }
          });
        } else {
          this.$Message.error({
            top: 300,
            closable: true,
            duration: 3,
            content: "请填写完信息！",
          });
        }
      });
    },

    closeModal2() {
      this.modal2 = false;
      this.presentSuccess = false;
    },

    refoundMoney(e) {},

    // 获取提现列表
    outList() {
      let id = this.$store.state.organization.myOrgId;
      this.outListForm.orgId = id;
      let obj = JSON.parse(JSON.stringify(this.outListForm));
      outList(obj).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.data2 = res.result.content;
          this.total2 = res.result.totalElements;
          this.loading2 = false;
        }
      });
    },

    showModal3() {
      this.modal3 = true;
    },

    // 提现记录
    record() {},

    changePage2(e) {
      this.outListForm.pageNumber = e;
      this.outList();
    },

    changePageSize2(e) {
      this.outListForm.pageSize = e;
      this.outList();
    },

    // 查看原因
    examine() {
      this.modal = true;
      this.showFail = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.trainlist {
  padding: 6px 16px;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    .title {
      color: #373737;
      font-weight: 600;
      font-size: 20px;
      font-weight: bold;
      line-height: 50px;
      margin-left: 45px;
      position: relative;
    }

    .title::before {
      bottom: 5px;
      width: 27px;
      height: 5px;
      border-radius: 30px;
      background: #9fbffe;
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .message {
    display: flex;
    position: relative;
    float: left;
    background: #f0f2f7;
    border-radius: 15px;
    margin-bottom: 15px;
    width: 100%;

    .demo {
      flex: 1;
      position: relative;
      padding: 20px 20px 15px 5%;
      box-sizing: border-box;

      .title {
        position: relative;
        float: left;
        width: 100%;
        color: #141515;
        font-size: 15px;
        line-height: 30px;
        font-weight: 550;
      }

      .num {
        position: relative;
        float: left;
        width: 100%;
        line-height: 50px;
        color: #2469f3;
        font-size: 36px;
        font-weight: 550;
      }

      .hint {
        font-size: 12px;
        color: #2469f3;
        position: relative;
        float: left;
        width: 100%;
        text-align: center;
        margin-top: 5px;
      }

      /deep/ button {
        border-radius: 15px;
        background: #407df4;
        height: 45px;
        line-height: 45px;
        font-size: 16px;
        position: relative;
        float: left;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: 5px;
      }
    }

    .demo:nth-child(1)::after,
    .demo:nth-child(2)::after,
    .demo:nth-child(3)::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 30px;
      background: #dedfe1;
    }

    .demo:nth-child(5) {
      padding-left: 0;
    }
  }

  .footer {
    margin-top: 10px;
  }
}

.trainlist::after {
  content: "";
  background: #fff;
  left: -16px;
  top: -16px;
  position: absolute;
  width: 110%;
  height: 110%;
  z-index: -1;
}

.table_content {
  background: #f0f2f7;
  border-radius: 15px;
  padding: 0 10px;
  overflow: hidden;
}

.table_panel /deep/ .ivu-table table {
  overflow-y: auto;
}

.table_panel /deep/ .ivu-table-wrapper {
  border: none;
}

.table_panel /deep/ .ivu-table-tip tr {
  background: #f0f2f7;
}

.table_panel /deep/ .ivu-table th {
  background: #f0f2f7;
  border: 0;
}

.table_panel /deep/ .ivu-table-tbody tr td {
  background-color: #fff;
  margin-bottom: 6px;
  border-top: 3px solid #f0f2f7;
  border-bottom: 3px solid #f0f2f7;
}

.table_panel /deep/ .ivu-table-tbody tr td:first-child {
  border-bottom-left-radius: 8px;
  border-left: 3px solid #f0f2f7;
}

.table_panel /deep/ .ivu-table-tbody tr td:last-child {
  border-bottom-right-radius: 8px;
  border-right: 3px solid #f0f2f7;
}

.table_panel /deep/ .ivu-table-tbody tr td:first-child {
  border-top-left-radius: 8px;
  border-left: 3px solid #f0f2f7;
}

.table_panel /deep/ .ivu-table-tbody tr td:last-child {
  border-top-right-radius: 8px;
  border-right: 3px solid #f0f2f7;
}

.table_panel /deep/ .ivu-table {
  background-color: transparent;
}

.table_panel /deep/ .ivu-table-border:after,
.table_panel /deep/ .ivu-table-fixed-right::before,
.table_panel /deep/ .ivu-table-fixed::before,
.table_panel /deep/ .ivu-table::before,
.table_panel /deep/ .ivu-row::after {
  display: none;
}

/deep/ .ivu-modal .ivu-modal-body {
  padding-right: 80px;
}

.ivu-row-flex-end {
  margin-top: 10px;
  padding-bottom: 20px;
  padding-right: 20px;
}

.footer_btn {
  .ivu-btn {
    height: 40px;
    width: 40%;
    margin-right: 6.66666%;
  }
}

/deep/ .ivu-form-item-label {
  color: #4d4d4d;
  margin-top: 3px;
}

/deep/ .ivu-modal-content {
  border-radius: 20px;
}

/deep/ .ivu-input {
  border-radius: 10px;
  height: 40px;
  overflow: hidden;
}

/deep/ textarea {
  height: 120px !important;
}

/deep/ .ivu-modal-footer {
  border-top: none;
}

/deep/ .ivu-form-item-content p {
  text-align: left;
  font-size: 12px;
  color: #c8c8c8;
  line-height: 22px;
}

/deep/ .ivu-modal-footer .ivu-btn {
  margin-right: 50%;
  transform: translateX(50%);
  height: 46px;
  border-radius: 10px;
  background: #417df4;
  width: 160px;
}

/deep/ .hint_panel {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  .content {
    position: absolute;
    right: 15px;
    top: 165px;
    width: 300px;
    background: #fff;
    box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.65);
    padding: 10px 20px 0 20px;

    p {
      text-align: left;
      position: relative;
      float: left;
      width: 100%;
    }

    .title {
      font-size: 15px;
      color: #292929;
      font-weight: 550;
    }

    .cont {
      font-size: 13px;
      margin-bottom: 10px;
    }

    span {
      color: #417df4;
      font-weight: 550;
      font-size: 15px;
    }
  }
}

/deep/ .ivu-modal-body .message {
  width: 100%;
  padding: 0 0 0 65px;
  line-height: 36px;
  font-size: 18px;
  color: #595959;
  text-align: left;

  span {
    color: #161616;
    font-weight: 550;
  }

  a {
    color: #ffa629;
  }
}

/deep/ .ivu-modal-body .message:first-child {
  margin-top: 30px;
}

/deep/ .ivu-modal-body .message:last-child {
  margin-bottom: 50px;
}

.blueHeader /deep/ .ivu-modal-header {
  background: #fff;
  border-radius: 20px 20px 0 0;
}

.successHeader /deep/ .ivu-modal-header {
  border-bottom: none;
}

.modal_table /deep/ .ivu-modal-body {
  padding-right: 16px !important;
}

.modalTable /deep/ .ivu-table-cell span {
  font-size: 15px;
  color: #000000;
}

.modalTable /deep/ .ivu-table-wrapper {
  border: none;
}

.modalTable /deep/ .ivu-table-tip tr {
  background: #fff;
}

.modalTable /deep/ .ivu-table th {
  background: #fff;
  border: 0;
}

.modalTable /deep/ .ivu-table-tbody tr td {
  background-color: #f0f2f7;
  margin-bottom: 6px;
  border-top: 3px solid #fff;
  border-bottom: 3px solid #fff;
}

.modalTable /deep/ .ivu-table-tbody tr td:first-child {
  border-bottom-left-radius: 8px;
  border-left: 3px solid #fff;
}

.modalTable /deep/ .ivu-table-tbody tr td:last-child {
  border-bottom-right-radius: 8px;
  border-right: 3px solid #fff;
}

.modalTable /deep/ .ivu-table-tbody tr td:first-child {
  border-top-left-radius: 8px;
  border-left: 3px solid #fff;
}

.modalTable /deep/ .ivu-table-tbody tr td:last-child {
  border-top-right-radius: 8px;
  border-right: 3px solid #fff;
}

.modalTable /deep/ .ivu-table-border:after,
.modalTable /deep/ .ivu-table-fixed-right::before,
.modalTable /deep/ .ivu-table-fixed::before,
.modalTable /deep/ .ivu-table::before,
.modalTable /deep/ .ivu-row::after {
  display: none;
}
</style>