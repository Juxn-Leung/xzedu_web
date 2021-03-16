<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_head">
        <Tabs :value="$router.currentRoute.name" @on-click="goRouter">
          <TabPane label="机构管理" name="organ"></TabPane>
          <TabPane label="机构认证" name="accrInstitution"></TabPane>
        </Tabs>

        <!-- <div class="head_btn">
          <p class="blueBtn" @click="goAdd">添加机构</p>
        </div> -->
      </div>

      <div class="tab_content">
        <!-- 搜索 -->
        <div
          class="searchPanel"
          ref="header"
          style="padding: 0px; min-height: 5px"
        ></div>
        <!-- 表格 -->
        <div class="tablePanel" style="background: none">
          <Row :gutter="30">
            <Col
              span="6"
              v-for="(item, index) in data"
              style="margin-top: 30px"
            >
              <div class="instion">
                <div class="instion_title">{{ item.orgName }}</div>
                <div class="instion_logo" v-if="item.orgType == 0">
                  <img :src="zx" />
                  <div class="zongxiao">总校</div>
                </div>
                <div class="instion_fu" style="padding-left: 16px">
                  负 责 人 :<a class="ti_first">{{ item.branchName }}</a
                  ><a>{{ item.mobile }}</a>
                </div>

                <div class="instion_fu" v-if="item.checkType == 0">
                  主体信息:<a class="ti_first">未认证</a
                  ><a v-if="item.status==1" @click="goAdd(item)">立即认证》</a>
                   <a v-if="item.status==0">审核中</a>
                    <a v-if="item.status==2">未通过</a>
                </div>

                <div class="instion_fu" v-if="item.checkType == 1">
                  主体信息:<a class="ti_first">已认证</a
                  ><a v-if="item.status==1" @click="bianji(item)">编辑</a>
                </div>
                <!-- 
                <div class="instion_fu">
                  到期时间：<a>{{}}</a>
                </div> -->
              </div>
            </Col>
          </Row>
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
  </div>
</template>

<script>
import { Debounce } from "../../libs/util";
import { checkOrgAuthenList } from "@/api";
export default {
  data() {
    return {
      zx: require("@/assets/login/zx.png"),
      searchForm: {},
      loading: false,
      tableHeight: null,
      data: [],
      total: 0,
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
      this.checkOrgAuthenList();
    },
    pageHeight() {
      let pageHeight = Number(
        document.getElementsByClassName("single-page")[0].clientHeight
      );
      let headerHeight = this.$refs.header.clientHeight;
      let footerHeight = this.$refs.footer.clientHeight;
      this.tableHeight = pageHeight - headerHeight - footerHeight - 90;
    },
    checkOrgAuthenList() {
      checkOrgAuthenList().then((res) => {
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

    bianji(item) {
      if (item.authenType == 1) {
        this.$router.push({
          name: "bianCertificate",
          query: {
            principalId: item.branchId,
            checkOrgId: item.id,
            id: item.id,
          },
        });
      } else if (item.authenType == 2) {
        this.$router.push({
          name: "bianenteCertification",
          query: { id: item.id ,  checkOrgId: item.id,},
        });
      }
    },

    goAdd(item) {
      this.$router.push({
        name: "startCertification",
        query: { principalId: item.branchId, checkOrgId: item.id },
      });
    },

    inputKey: Debounce(function (e) {
      this.searchForm.key = e;
    }, 400),

    changeStatic() {},

    handleSearch() {},

    changeSelect() {},

    changePage() {},

    changePageSize() {},

    handleEdit() {},

    handleDelete() {},
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

/deep/ .ivu-row {
  margin-left: 20px !important;
  margin-right: 20px !important;
}
.instion {
  float: left;
  width: 100%;
  // height: 100px;
  border: 1px solid #e8eaf1;
  box-shadow: 0px 1px 3px 0px rgba(0, 27, 78, 0.06);
  border-radius: 3px;
}
.instion_title {
     float: left;
    width: auto;
    /* height: 30px; */
    margin-top: 10px;
    padding-left: 15px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #25396e;
    /* line-height: 30px; */
    width: 200px;
}

.instion_logo {
  float: right;
  width: 30px;
  height: 34px;
  margin-right: 15px;
  position: relative;
  margin-top: 10px;
}
.zongxiao {
  float: right;
  margin-top: -40px;
  position: absolute;
  color: white;
  font-size: 12px;
  width: 100%;
  margin-left: 14px;
}

.instion_fu {
  float: left;
  width: 100%;
  height: 25px;
  line-height: 25px;
  padding-left: 15px;
}
.ti_first {
  margin-right: 10px;
  margin-left: 10px;
  color: #2d3957;
  width: auto;
}
</style>
