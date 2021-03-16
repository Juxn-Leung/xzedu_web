<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_head">
        <Tabs
          :value="$router.currentRoute.name"
          @on-click="goRouter"
        >
          <TabPane
            label="员工管理"
            name="staff"
          ></TabPane>
          <TabPane
            label="角色管理"
            name="roleManagement"
          ></TabPane>
        </Tabs>

        <div class="head_btn">
          <p
            class="blueBtn"
            @click="goAdd"
          >添加员工</p>
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
              placeholder="请输员工姓名或手机号码"
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
      :width="410"
    >
      <div class="content">
        <p>
          <Icon type="md-alert" />
          确定要删除这个员工吗？
        </p>
        <h5>删除后员工将不能登录系统，此操作不能被撤销</h5>
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
          @click="userDel"
        >确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Debounce } from "../../libs/util";
import { userList,userDel,setTeaching } from "../../api/index";
// import essentialInformationVue from '../../components/clientList/essentialInformation.vue';
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
          title: "姓名",
          align: "center",
          key: "name",
          minWidth: 120,
        },
        {
          title: "手机号码",
          align: "center",
          key: "phone",
          minWidth: 140,
        },
        {
          title: "角色",
          align: "center",
          key: "roleName",
          minWidth: 140,
        },
        {
          title: "所属校区",
          align: "center",
          key: "orgName",
          minWidth: 140,
        },
        {
          title: "在职状态",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            //return h('元素',{元素的性质},'内容')
            return h("i-switch", {
              props: {
                size: "large",
                value: params.row.teaching == 1,
              },
              on: {
                "on-change": (value) => {
                  let id = params.row.id;
                  if(value==false){ 
                    var op = 0;
                  }else{
                    var op = 1;
                  }
                  this.setTeaching(id,op);
                },
              },
            });
          },
        },
        {
          title: "操作",
          align: "center",
          slot: "action",
          width: 180,
        },
      ],

      data: [],
      total: 0,

      modal: false,
      delId: null,
    };
  },
  watch: {},

  created() {},

  mounted() {
    this.init();
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

      this.userList();
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

    goAdd() {
      this.$router.push({
        name: "staffAdd",
        query: {},
      });
    },

    inputKey: Debounce(function (e) {
      this.searchForm.key = e;
    }, 400),

    userList() {
      let obj = this.searchForm;
      userList(obj).then((res) => {
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

    setTeaching(id,op) {
      let obj = {
        userId:id,
        op
      }
      setTeaching(obj).then(res=>{
        if (res.code == 200) {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
          this.userList();
        } else {
          this.$Message.error({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
        }
      })
    },

    handleSearch() {
      this.userList();
    },

    changePage() {
      this.userList();
    },

    changePageSize() {
      this.searchForm.pageSize = e;
      this.userList();
    },

    handleEdit(row) {
      let name = row.name;
      let id = row.id;
      let phone = row.phone;
      let sex = row.sex;
      let teaching = row.teaching;
      let orgId = row.orgId;
      let roleId = row.roleId;

      this.$router.push({
        name: "staffEdit",
        query: {
          name,
          id,
          phone,
          sex,
          teaching,
          orgId,
          roleId
        },
      });
    },

    handleDelete(row) {
      this.delId = row.id;
      this.modal = true;
    },

    closeModal() {
      this.modal = false;
    },

    userDel() {
      let obj = {};
      obj.id = this.delId;
      userDel(obj).then((res) => {
        if (res.code == 200) {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
          this.userList();
        } else {
          this.$Message.error({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
        }
        this.closeModal();
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
</style>