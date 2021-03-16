<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_head">
        <Tabs
          :value="$router.currentRoute.name"
          @on-click="goRouter"
        >
          <TabPane
            label="课程列表"
            name="course"
          ></TabPane>
          <TabPane
            label="课程类别"
            name="courseCategory"
          ></TabPane>
        </Tabs>

        <div class="head_btn">
          <p
            class="blueBtn"
            @click="AddCategory"
          >新建类别</p>
        </div>
      </div>

      <div class="tab_content">
        <!-- 搜索 -->
        <div
          class="searchPanel"
          ref="header"
        >
          <div
            class="search"
            style="float:right;"
          >

            <Input
              class="search_input"
              v-model="searchForm.key"
              prefix="ios-search"
              @input="inputKey"
              placeholder="请输入类别名称"
            />

            <Button
              class="search_btn"
              type="primary"
              @click="handleSearch"
            >搜索</Button>

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

            <template
              slot-scope="{row}"
              slot="action"
            >
              <Button
                class="edit"
                type="primary"
                @click="handleEdit(row)"
                style="margin-right:6px"
                size="small"
              >编辑</Button>
              <Button
                class="delete"
                type="error"
                @click="handleDelete(row)"
                style="margin-right:6px"
                size="small"
              >删除</Button>
            </template>

          </Table>
        </div>
        <!-- 分页 -->
        <div
          ref="footer"
          type="flex"
          justify="end"
          class="search_page"
        >
          <div
            ref="footer"
            class="footer"
          >
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
      :width="570"
    >

      <div
        class="inputContent"
        v-if="type!==3"
      >
        <div class="title">
          <p>{{type==1?'新建课程类别':'修改课程类别'}}</p>
        </div>

        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="108"
        >
          <FormItem
            label="序号："
            prop="orderNo"
          >
            <Input
              v-model="formValidate.orderNo"
              placeholder="请输入序号"
            ></Input>
          </FormItem>
          <FormItem
            label="类别名称："
            prop="name"
          >
            <Input
              v-model="formValidate.name"
              placeholder="请输入课程类别"
            ></Input>
          </FormItem>
        </Form>
      </div>

      <div
        slot="footer"
        class="footer_btn"
      >
        <Button
          type="default"
          @click="closeModal"
        >取消</Button>
        <Button
          type="primary"
          @click="categoryAdd"
          v-if="type==1"
        >确定</Button>
        <Button
          type="primary"
          @click="categoryEdit"
          v-if="type==2"
        >确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Debounce } from "../../libs/util";
import {
  categoryList,
  categoryAdd,
  categoryEdit,
  categoryDel,
} from "../../api/index";
export default {
  data() {
    return {
      searchForm: {
        key: "",
        pageNumber: 1,
        pageSize: 10,
      },
      loading: false,
      tableHeight: null,
      columns: [
        {
          title: "序号",
          align: "center",
          key: "orderNo",
          minWidth: 300,
        },
        {
          title: "类别名称",
          align: "center",
          key: "name",
          minWidth: 300,
        },
        {
          title: "操作",
          align: "center",
          slot: "action",
          width: 300,
        },
      ],

      data: [],
      total: 0,

      modal: false,
      id: null,
      // 1 = 新建, 2 = 编辑
      type: 1,

      formValidate: {
        name: "",
        orderNo: "",
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入课程类别",
            trigger: "blur",
          },
        ],
        orderNo: [
          {
            required: true,
            message: "请输入序号",
            trigger: "blur",
          },
          {
            type: "string",
            pattern: /^\d+$/,
            message: "请输入数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {},

  created() {},

  mounted() {
    this.init();
    this.categoryList();
  },

  destroyed() {},
  computed: {},
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
      let headerHeight = this.$refs.header.clientHeight;
      let footerHeight = this.$refs.footer.clientHeight;
      this.tableHeight = pageHeight - headerHeight - footerHeight - 70;
    },

    goRouter(event) {
      this.$router.push({
        name: event,
        query: {},
      });
    },

    AddCategory() {
      this.modal = true;
      this.type = 1;
    },

    inputKey: Debounce(function (e) {
      this.searchForm.key = e;
    }, 400),

    handleSearch() {
      this.categoryList();
    },

    changePage() {
      this.categoryList();
    },

    changePageSize() {
      this.searchForm.pageSize = e;
      this.categoryList();
    },

    closeModal() {
      this.modal = false;
      this.formValidate = {
        name: "",
        orderNo: "",
      };
    },

    categoryList() {
      let obj = this.searchForm;
      categoryList(obj).then((res) => {
        if (res.code == 200) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
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

    handleEdit(row) {
      this.id = row.id;
      this.formValidate.orderNo = row.orderNo;
      this.formValidate.name = row.name;
      this.modal = true;
      this.type = 2;
    },

    handleDelete(row) {
      this.id = row.id;
      this.categoryDel();
    },

    categoryAdd() {
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          let obj = this.formValidate;
          obj.id = this.id;
          categoryAdd(obj).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: res.message,
              });
              this.categoryList();
              this.closeModal();
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
          return false;
        }
      });
    },

    categoryEdit() {
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          let obj = this.formValidate;
          obj.id = this.id;
          categoryEdit(obj).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: res.message,
              });
              this.categoryList();
              this.closeModal();
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
          return false;
        }
      });
    },

    categoryDel() {
      let obj = {};
      obj.id = this.id;
      categoryDel(obj).then((res) => {
        if (res.code == 200) {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
          this.categoryList();
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
.container {
  position: relative;
  float: left;
  width: 100%;
}

/deep/ .ivu-modal {
  top: 40%;

  .ivu-modal-content {
    padding: 0 30px 10px 30px;
  }

  .ivu-modal-content::before {
    background: #f4f4f4;
    width: 100%;
    height: 1px;
    content: "";
    position: absolute;
    left: 0;
    top: 76px;
    transform: translateY(-50%);
  }

  .ivu-modal-close {
    display: none;
  }

  .ivu-modal-body {
    padding-bottom: 0;
  }

  .inputContent {
    .title {
      width: 100%;
      position: relative;

      p {
        position: relative;
        line-height: 50px;
        color: #383838;
        font-size: 18px;
      }
    }

    .title::after {
      background: #0056fb;
      width: 2px;
      height: 16px;
      content: "";
      position: absolute;
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
    }

    .ivu-form {
      position: relative;
      padding-top: 30px;

      .ivu-form-item-label {
        line-height: 45px;
        height: 45px;
        padding: 0 12px 0 0;
        font-size: 17px;
        color: #2a2a2a;
        position: relative;
      }

      .ivu-form-item {
        height: 45px;
        position: relative;

        .ivu-form-item-content {
          position: relative;

          input {
            border: none;
            padding: 0 14px;
            line-height: 43px;
            height: 43px;
            font-size: 16px;
            width: 100%;
            position: relative;
            border: 1px solid #d9e1eb;
            border-radius: 10px;
          }
        }
      }
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
</style>