<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_head">
        <Tabs :value="$router.currentRoute.name" @on-click="goRouter">
          <TabPane label="机构管理" name="organ"></TabPane>
          <TabPane label="机构认证" name="accrInstitution"></TabPane>
        </Tabs>

        <div class="head_btn">
          <p class="blueBtn" @click="goAdd">添加机构</p>
        </div>
      </div>

      <div class="tab_content">
        <!-- 搜索 -->
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
              <div v-if="row.orgType == 0">
                <div class="instion_logo">
                  <img :src="zx" style="margin-left: -30px" />
                  <div class="zongxiao">总校</div>
                </div>
                <div class="orgnaex">{{ row.orgName }}</div>
              </div>
              <div class="orgname1" v-if="row.orgType == 1">
                {{ row.orgName }}
              </div>
            </template>

            <template slot-scope="{ row }" slot="aff">
              <div v-if="row.orgType == 0">{{ row.orgName }}总校</div>
              <div v-if="row.orgType == 1">{{ row.orgName }}分校</div>
            </template>

            <template slot-scope="{ row }" slot="action">
              <Button
                class="edit"
                type="primary"
                @click="handleEdit(row)"
                style="margin-right: 6px"
                size="small"
                >编辑</Button
              >
              <Button
                v-if="row.orgType == 1"
                class="delete"
                type="error"
                @click="handleDelete(row)"
                style="margin-right: 6px"
                size="small"
                >删除</Button
              >
            </template>
            <template slot-scope="{ row }" slot="status">
              <Tag v-if="row.status == 0" color="gold">审核中</Tag>
              <Tag v-if="row.status == 1" color="geekblue">已通过</Tag>
              <Tag v-if="row.status == 2" color="red">未通过</Tag>
            </template>
          </Table>
        </div>
        <!-- 分页 -->
        <div ref="footer" type="flex" justify="end" class="search_page">
          <!-- <div ref="footer" class="footer">
            <Page
              :current="searchForm.pageNumber"
              :page-size="searchForm.pageSize"
              :total="total"
              next-text="下一页"
              prev-text="上一页"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
            ></Page>
          </div> -->
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
          确定要删除这个机构？
        </p>
        <!-- <h5>删除后员工将不能登录系统，此操作不能被撤销</h5> -->
      </div>

      <div slot="footer" class="footer_btn">
        <Button type="default" @click="closeModal">取消</Button>
        <Button type="primary" @click="userDel">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Debounce } from "../../libs/util";
import { checkOrgList, deleteById, goAddCheckOrg } from "@/api";
export default {
  data() {
    return {
      zx: require("@/assets/login/zx.png"),
      searchForm: {},
      loading: false,
      modal: false,
      delId: null,
      tableHeight: null,
      canAdd: "",
      ifFinal: "",
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
          key: "branchName",
          minWidth: 140,
        },
        {
          title: "联系电话",
          align: "center",
          key: "mobile",
          minWidth: 140,
        },
        {
          title: "管辖校区",
          align: "center",
          slot: "aff",
          minWidth: 140,
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
          width: 180,
        },
      ],

      data: [],
      total: 0,
    };
  },
  watch: {},

  created() {
    this.goAddCheckOrg();
  },

  mounted() {
    this.init();
  },

  destroyed() {},
  computed: {},
  methods: {
    goAddCheckOrg() {
      goAddCheckOrg().then((res) => {
        if (res.code == 200) {
          console.log(res.result);
     
        
            this.canAdd = res.result.canAdd;
            this.ifFinal = res.result.ifFinal;
            this.mobile=res.result.mobile;
        }
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
      this.tableHeight = pageHeight - headerHeight - footerHeight - 90;
    },
    checkOrgList() {
      let obj = this.searchForm;
      checkOrgList(obj).then((res) => {
        if (res.code == 200) {
          this.data = res.result;
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
        this.ifFinal=this.ifFinal;
        this.mobile=this.mobile;
        this.$router.push({
          name: "addAgency",
          query: { ID: "add",ifFinal:this.ifFinal,mobile:this.mobile},
        });
      }else if(this.canAdd==0){
         this.$Message.error({
            top: 300,
            closable: true,
            duration: 3,
            content: "有未审核或审核不通过的机构,无法添加!",
          });
      }
    },

    inputKey: Debounce(function (e) {
      this.searchForm.key = e;
    }, 400),

    changeStatic() {},

    handleSearch() {},

    changeSelect() {},

    changePage() {},

    changePageSize() {},

    handleEdit(row) {
      this.idx = row.id;
      this.status=row.status;
      this.$router.push({
        name: "addAgency",
        query: { id: "edit", idx: this.idx, status:this.status},
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
</style>
