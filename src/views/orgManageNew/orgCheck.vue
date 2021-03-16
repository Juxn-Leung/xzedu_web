<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_content">
        <!-- 搜索 -->
        <div class="searchPanel" ref="header" style="min-height: 5px">
          <div class="search" style="float: left; width: 100%">
            <Form
              :model="searchForm"
              ref="searchForm"
              style="display: flex; float: left"
              :label-width="90"
            >
              <div class="seach_sou">
                <FormItem label="省市区">
                  <Cascader
                    change-on-select
                    @on-visible-change="clickArea"
                    ref="cascader"
                    :data="addressData"
                    :value="areaIdx"
                    @on-change="changeArea"
                    :load-data="loadData"
                    transfer
                  ></Cascader>
                </FormItem>
              </div>

              <div class="seach_sou" style="width: 180px;">
                <FormItem label="审核状态" style="mar">
                  <Select
                    clearable
                    v-model="searchForm.status"
                    :value="searchForm.status"
                    transfer
                    style="width: 100px"
                    @on-change="changeCondition"
                  >
                    <Option :value="0">待审核</Option>
                    <Option :value="1">已通过</Option>
                    <Option :value="2">未通过</Option>
                  </Select>
                </FormItem>
              </div>

              <div class="seach_sou">
                <FormItem label="关键字">
                  <Input
                    v-model="searchForm.key"
                    @input="inputKey"
                    placeholder="请输机构名称"
                  />
                </FormItem>
              </div>
            </Form>

            <Button
              style="float: right"
              class="search_btn"
              type="primary"
              @click="handleSearch"
              >搜索</Button
            >
          </div>
        </div>
        <!-- 表格 -->
        <div class="tablePanel">
          <Table
            :columns="columns"
            :data="data"
            :border="false"
            :stripe="true"
            ref="table"
            :loading="loading"
            :height="tableHeight"
          >
            <template slot-scope="{ row }" slot="orgName">
              <div>
                {{ row.orgName }}
              </div>
            </template>

            <template slot-scope="{ row }" slot="aff">
              <div>{{ row.areaName }}</div>
            </template>

            <template slot-scope="{ row }" slot="action">
              <Button
                class="edit"
                type="primary"
                @click="handleEdit(row)"
                style="margin-right: 6px"
                size="small"
                >查看</Button
              >
              <Button
                class="edit"
                type="primary"
                v-if="row.status == 0"
                @click="succes(row)"
                style="margin-right: 6px"
                size="small"
                >通过</Button
              >

              <Button
                v-if="row.status == 0"
                class="delete"
                type="error"
                @click="erno(row)"
                style="margin-right: 6px"
                size="small"
                >不通过</Button
              >
            </template>
            <template slot-scope="{ row }" slot="status">
              <Tag v-if="row.status == 0" color="gold">待审核</Tag>
              <Tag v-if="row.status == 1" color="geekblue">已通过</Tag>
              <Tag v-if="row.status == 2" color="red">未通过</Tag>
            </template>
          </Table>
        </div>
        <!-- 分页 -->
        <div ref="footer" type="flex" justify="end" class="search_page">
          <div ref="footer" class="footer">
            <Page
              :current="searchForm.pageNumber"
              :page-size="searchForm.pageSize"
              :total="total"
              next-text="下一页"
              prev-text="上一页"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
            ></Page>
          </div>
        </div>
      </div>
    </div>
    <Modal
      class="modalPanel"
      v-model="modal"
      :mask-closable="false"
      :width="410"
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
        <span v-if="status == 1">确定通过审核?</span>
        <span v-if="status == 2">审核不通过</span>
      </p>
      <div class="content">
        <div v-if="status == 2" class="tex">
          <Form :model="formLeft" label-position="left" :label-width="100">
            <FormItem label="备注内容">
              <Input
                type="textarea"
                v-model="formLeft.audit"
                :rows="4"
                placeholder="请输入审核不通过的原因"
              />
            </FormItem>
          </Form>
        </div>
      </div>

      <div slot="footer" class="footer_btn">
        <Button type="default" @click="closeModal">取消</Button>
        <Button type="primary" @click="submitAudit">确定</Button>
      </div>
    </Modal>

    <!--   
    <Modal v-model="modal" width="460" :styles="{ top: '20%' }">
      <p
        slot="header"
        style="
          color: #606060;
          text-align: center;
          font-weight: 550;
          padding: 25px 0px;
        "
      >
        <span v-if="status == 1">确定通过审核?</span>
        <span v-if="status == 2">审核不通过</span>
      </p>
      <p
        slot="close"
        style="
          border: 1px solid #818284;
          border-radius: 100%;
          background: white;
        "
      >
        <Icon
          @click.native="addceshi"
          type="ios-close-circle"
          style="margin-top: 1px; margin-left: 0px"
          size="24"
        ></Icon>
      </p>
      <div v-if="status == 2" class="tex">
        <Form
          :disabled="disabled"
          :model="formLeft"
          label-position="left"
          :label-width="100"
        >
          <FormItem label="备注内容">
            <Input
              type="textarea"
              v-model="formLeft.audit"
              :rows="4"
              placeholder="请输入审核不通过的原因"
            />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button v-if="stats == 1" type="primary" @click="submitAuditx"
          >确 定</Button
        >
        <Button v-else type="primary" @click="submitAudit">确 定</Button>
      </div>
    </Modal> -->
  </div>
</template>

<script>
import { Debounce } from "../../libs/util";
import { dateFormat } from "@/utils/current";
import {
  getAddresslist,
  checkOrgList,
  getPageList,
  deleteById,
  goAddCheckOrg,
  pass,
  failed,
} from "@/api";
export default {
  data() {
    return {
      zx: require("@/assets/login/zx.png"),
      searchForm: {},
      loading: false,
      addressData: [],
      status: "",
      modal: false,
      delId: null,
      tableHeight: null,
      canAdd: "",
      ifFinal: "",
      formLeft: {
        audit: "",
      },
      columns: [
        {
          title: "机构名称",
          align: "center",
          slot: "orgName",
          minWidth: 230,
        },
        {
          title: "负责人",
          align: "center",
          key: "creater",
          minWidth: 100,
        },
        {
          title: "联系电话",
          align: "center",
          key: "mobile",
          minWidth: 140,
        },
        {
          title: "机构所在地",
          align: "center",
          slot: "aff",
          minWidth: 160,
        },

        {
          title: "创建时间",
          align: "center",
          key: "createTime",
          minWidth: 140,
        },

        {
          title: "机构状态",
          align: "center",
          slot: "status",
          minWidth: 140,
        },
        {
          title: "操作",
          align: "center",
          slot: "action",
          width: 210,
        },
      ],

      data: [],
      total: 0,
      areaIdx: [],
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        // type: "",
      },
    };
  },
  watch: {},

  created() {
    // this.goAddCheckOrg();
  },

  mounted() {
    this.init();
    this.getAddresslist(); //地址接口
  },

  destroyed() {},
  computed: {},
  methods: {
    changeCondition(e) {
      console.log(e);
      this.searchForm.status = e;
    },
    clickArea(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        this.getAddresslist();
      }
    },

    loadDataSearch(item, callback) {
      item.loading = true;
      getAddresslist({
        pid: item.id,
      }).then((res) => {
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

    // 获取省份
    getAddresslist(id, i, arr) {
      getAddresslist({
        level: 1,
      }).then((res) => {
        this.addressData = res.result;
        this.addressDataSearch = res.result;
        this.addressData.forEach((item) => {
          item.children = [];
          item.loading = false;
        });
      });
    },

    loadData(item, callback) {
      item.loading = true;
      getAddresslist({
        pid: item.id,
      }).then((res) => {
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
    changeArea(v, item) {
      console.log(item);
      let area = [];
      item.map((val) => {
        area.push(val.label);
      });
      let areaIdx = [];
      v.map((val) => {
        areaIdx.push(val * 1);
      });
      this.areaIdx = areaIdx;
    },
    changePage(e) {
      // this.checkOrgList();
      this.searchForm.pageNumber = e;
      console.log(this.searchForm.pageNumber);
      this.checkOrgList();
    },

    changePageSize() {
      this.searchForm.pageSize = e;
      console.log(this.searchForm.pageSize);
    },
    goAddCheckOrg() {
      goAddCheckOrg().then((res) => {
        if (res.code == 200) {
          console.log(res.result);
          if (res.result.ifFinal == 0) {
            this.canAdd = res.result.canAdd;
            this.ifFinal = res.result.ifFinal;
          } else {
            this.disabledmoblie = false;
          }
        }
      });
    },

    handleSearch() {
      this.searchForm.areaId = this.areaIdx.join(",");
      this.checkOrgList();
    },

    handleDelete(row) {
      this.delId = row.id;
      this.modal = true;
    },

    succes(row, index) {
      this.modal = true;
      console.log(row.orgName);

      this.id = row.id;
      this.status = 1;
    },

    erno(row, index) {
      this.modal = true;
      console.log(row.id);

      this.id = row.id;
      this.status = 2;
    },

    submitAudit() {
      console.log(this.id);
      let id = this.id;
      let reason = this.formLeft.audit;
      console.log(this.formLeft.audit);
      let status = this.status;
      console.log(status);

      if (status == 1) {
        //审核通过
        let params = {
          id,
        };
        pass(params).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$Message.success({
              top: 300,
              closable: true,
              duration: 3,
              content: res.result,
            });
            this.checkOrgList();
            this.modal = false;
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
        if (reason == "") {
          this.$Message.error("请输入审核不通过的理由!");
        } else {
          let params = {
            id,

            reason,
          };
          failed(params).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: res.result,
              });
              this.checkOrgList();
              this.modal = false;
            } else {
              this.$Message.error({
                top: 300,
                closable: true,
                duration: 3,
                content: res.message,
              });
            }
          });
        }
      }
    },

    closeModal() {
      this.modal = false;
    },
    userDel() {
      let obj = {};
      obj.id = this.delId;
      deleteById(obj).then((res) => {
        if (res.code == 200) {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
          this.checkOrgList();
        } else {
          // this.$Message.error({
          //   top: 300,
          //   closable: true,
          //   duration: 3,
          //   content: res.message,
          // });
        }
        this.closeModal();
      });
    },
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
      this.tableHeight = pageHeight - headerHeight - footerHeight - 20;
    },
    checkOrgList() {
      let obj = this.searchForm;
      getPageList(obj).then((res) => {
        if (res.code == 200) {
          res.result.content.forEach((item) => {
            if (item.createTime) {
              item.createTime = dateFormat(item.createTime);
            }
          });

          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.loading = false;
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

    goRouter(event) {
      this.$router.push({
        name: event,
        query: {},
      });
    },

    goAdd() {
      if (this.canAdd == 1) {
        this.ifFinal = this.ifFinal;
        this.$router.push({
          name: "addAgency",
          query: { ID: "add", ifFinal: this.ifFinal },
        });
      }
    },

    inputKey: Debounce(function (e) {
      this.searchForm.key = e;
    }, 400),

    handleEdit(row) {
      this.idx = row.id;
      this.$router.push({
        name: "orgAgency",
        query: { id: "edit", idx: this.idx },
      });
    },

    // handleDelete(row) {
    //   this.$router.push({
    //     name: "startCertification",
    //     query: { id: "edit", idx: this.idx },
    //   });
    // },
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

/deep/.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    display: block;
    height: 38px;
    line-height: 38px;
}


/deep/ .ivu-select-selection .ivu-select-selected-value {
    display: block;
    height: 38px;
    line-height: 38px;
}
</style>
