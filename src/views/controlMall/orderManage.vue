
<template>
  <div class="trainlist">
    <Row>
      <div class="header" ref="header">
        <div class="title">
          <span>订单列表</span>
        </div>
      </div>
      <Divider style="margin: 10px 0" />
    </Row>
    <!-- 搜索 -->
    <Row>
      <div class="search">
        <Form
          :model="searchForm"
          ref="searchForm"
          style="display: flex; float: left"
          :label-width="100"
        >
          <FormItem label="订单号">
            <Input
              v-model="searchForm.noKey"
              @input="selectInput"
              placeholder="请输入订单号搜索"
              style="width: 170px"
              clearable
            />
          </FormItem>

          <FormItem label="姓名">
            <Input
              v-model="searchForm.key"
              @input="selectname"
              placeholder="请输入姓名搜索"
              style="width: 170px"
              clearable
            />
          </FormItem>

          <FormItem label="下单时间">
            <Row>
              <DatePicker
                type="daterange"
                placeholder="选择日期"
                style="width: 200px; z-index: 7"
                @on-change="changeDate"
                separator="至"
              ></DatePicker>
            </Row>
          </FormItem>

          <FormItem label="省市区" v-if="role !== 1">
            <Cascader
              v-if="showAddInput == 3"
              change-on-select
              @on-visible-change="clickAreaSearch"
              ref="cascader"
              :data="addressDataSearch"
              :value="areaId"
              @on-change="changeAreaSearch"
              :load-data="loadDataSearch"
              style="width: 200px"
              transfer
            ></Cascader>

            <Cascader
              v-else-if="showAddInput == 1"
              :data="addressData"
              :value="areaId2"
              v-model="areaId2"
              @on-change="changeCascader"
              transfer
              style="width: 200px"
            ></Cascader>
          </FormItem>

          <!-- <FormItem label="状态" :style="role!==1?'margin-left: -45px;':'margin-left:225px'">
            <Select
              v-model="searchForm.status"
              :value="searchForm.status"
              transfer
              style="width: 90px;"
              @on-change="changeCondition"
            >
              <Option :value="0">全部</Option>
              <Option :value="1">上架</Option>
              <Option :value="2">下架</Option>
            </Select>
          </FormItem>-->

          <!-- <FormItem
            label="科目"
            :style="role!==1?'left: 650px; position: absolute;':'left: 404px; position: absolute;'"
          >
            <Select v-model="searchForm.subjectId" @on-change="changeSubject">
              <Option :value="0">全部</Option>
              <Option
                v-for="(item , index) in subjectList"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>-->

          <!-- <FormItem
            label="年级"
            :style="role!==1?'left: 780px; position: absolute;':'left: 545px; position: absolute;'"
          >
            <Select v-model="searchForm.gradeId" style="width:110px" @on-change="changeGrade">
              <Option :value="0">全部</Option>
              <Option
                v-for="(item , index) in gradeList"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>-->

          <!-- <FormItem label="老师名字">
            <Input v-model="searchForm.key" placeholder="请输入老师名字" />
          </FormItem>-->
        </Form>

        <div style="float: right; margin: 11px 0">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </div>
      </div>
    </Row>
    <!-- 表格 -->

    <!-- tab栏目-->
    <Tabs type="card" @on-click="tabonclick">
      <TabPane name="6" size="default" label="全部订单"></TabPane>
      <TabPane name="0" size="default" label="待付款"></TabPane>
      <TabPane name="1" size="default" label="待使用"></TabPane>
      <TabPane name="2" size="default" label="已使用"></TabPane>
      <TabPane name="3" size="default" label="已完成"></TabPane>
      <TabPane name="4" size="default" label="已关闭"></TabPane>
    </Tabs>

    <Row>
      <Table
        :columns="columns"
        :data="data"
        border
        ref="table"
        :loading="loading"
        :height="tableHeight"
      >
        <template slot="action" slot-scope="{ row, index }">
          <Button
            size="small"
            v-if="row.status == 0"
            style="margin-right: 6px"
            type="text"
            >待付款</Button
          >

          <Button
            size="small"
            v-if="row.status == 1"
            style="margin-right: 6px"
            type="text"
            >已付款</Button
          >

          <!-- <Button
            type="warning"
            size="small"
            v-if="row.status == 1 && seach_panel == false"
            style="margin-right: 6px; margin-top: 6px; margin-bottom: 6px"
            @click="immediate_use(row, index)"
            >立即使用</Button
          > -->

          <Button
            size="small"
            v-if="row.status == 2"
            style="margin-right: 6px"
            type="text"
            >待评价</Button
          >

          <Button
            size="small"
            v-if="row.status == 3"
            style="margin-right: 6px"
            type="text"
            >已评价</Button
          >

          <Button
            size="small"
            v-if="row.status == 4"
            style="margin-right: 6px"
            type="text"
            >退款</Button
          >

          <Button
            size="small"
            v-if="row.status == 5"
            style="margin-right: 6px"
            type="text"
            >订单取消</Button
          >
        </template>
      </Table>
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
</template>
<script>
import { mapState } from "vuex";
import { formatDate } from "../../utils/time.js";
import {
  getOrgList,
  getAddresslist,
  deleteOrg,
  recommend,
  norecommend,
  orderManage,
  orderused,
  getCourseList,
  getCourseDetails,
  addCourse,
  editCourse,
  delCourse,
  putonCourse,
  pulloffCourse,
  getOrgLectures,
  getReportList,
  getImgList,
  addImg,
  editImg,
  delImg,
  getOutlineList,
  addOutline,
  editOutline,
  delOutline,
} from "@/api";
import { dateFormat } from "@/utils/current";
export default {
  components: {},
  data() {
    return {
      isEdit: "add",
      seach_panel: true,
      ex: "",
      cvimg: "",
      institution: "",
      columns: [
        {
          title: "课程图片",
          key: "signImg",
          align: "center",
          minWidth: 50,
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.imgUrl,
              },
              style: {
                width: "50px",
                height: "50px",
                "border-radius": "50%",
                "margin-top": "5px",
                "margin-bottom": "5px",
              },
            });
          },
        },

        {
          title: "商品名称",
          key: "name",
          align: "center",
          minWidth: 250,
        },
        {
          title: "机构名称",
          key: "orgName",
          align: "center",
          minWidth: 250,
        },
        {
          title: "订单号",
          key: "orderNo",
          align: "center",
          minWidth: 100,
        },
        {
          title: "学生姓名",
          key: "consumerName",
          align: "center",
          minWidth: 60,
        },
        {
          title: "手机号",
          key: "consumerPhone",
          align: "center",
          minWidth: 40,
        },
        {
          title: "下单时间",
          key: "orderTime",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.orderTime), "yyyy-MM-dd hh:mm")
            );
          },
        },
        {
          title: "实付款",
          key: "payment",
          align: "center",
          minWidth: 40,
        },
        {
          title: "订单状态",
          slot: "action",
          align: "center",
          minWidth: 40,
        },
      ],
      data: [],
      loading: true,
      tableHeight: 0,
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        status: "",
        gradeId: 0,
        subjectId: 0,
        provinceId: "",
        cityId: "",
        areaId: "",
      },
      total: 0,
      modalTitle: "",
      modalStatus: false,
      addressData: [],
      formItem: {
        orgName: "",
        areaId: [],
        area: [],
        areaDetail: "",
        type: this.organizationType,
        marketRegisterNo: "",
        permissionNo: "",
        teacherCount: "",
        studentCount: "",
        nonTeacherCount: "",
        scopeBusiness: "",
      },
      disabled: false,
      organizationType: "",
      dateStatus: false,
      dateForm: { date: "", id: "" },
      dateList: [],
      addressDataSearch: [],
      area: [],
      areaId: [],
      // 判断显示哪个下拉框 0 = 区级/镇级教育局，不显示 ; 1 = 市级教育局，可以选择 区/镇 ; 2 = 省级教育局，可以选 市，区/镇 ; 3 = admin ，可以选 省，市，区/镇。
      showAddInput: 0,
      s_id: "",
      z_id: "",
      q_id: "",
      areaId2: [],

      // 角色 0 = admin ; 1 = 机构 ; 2 = 镇级教育局 ; 3 = 市级教育局 ; 4 省级教育局 ;
      role: "",

      // 课程上架、下架 0 = 正在上架(显示下架);
      courseState: 0,

      // 课程、年级列表
    };
  },
  created() {
    this.getUserInfo();
    this.getCourseList();
  },
  mounted() {
    this.init();
    //this.getAddresslist(); //地址接口
    this.handleColumns(); //过滤表格中是否显示那一列的调用
    this.examineBtn();
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
    //过滤表格中是否显示那一列
    handleColumns() {
      if (this.cvimg == "1") {
        this.columns = this.columns.filter((col) => col.key !== "signImg");
        this.columns = this.columns.filter((col) => col.key !== "orgName");
      }
      if (this.institution == "1") {
        this.columns = this.columns.filter((col) => col.key !== "signImg");
      } else {
        this.columns = this.columns.filter((col) => col.key !== "orgName");
      }
    },

    clickAreaSearch(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        let s_id = this.data.s_id;
        let z_id = this.data.z_id;
        this.getTownshipList(s_id, z_id);
      }
    },

    getUserInfo() {
      let userMessage = JSON.parse(sessionStorage.getItem("userInfo"));
      console.log(userMessage);
      // this.searchForm.educationId=userMessage.id;
      let addId_list = [];
      let type = userMessage.type;
      // addId_list = userMessage.areaId.split(",");
      if (
        userMessage.areaId == "" ||
        userMessage.areaId == null ||
        userMessage.areaId == undefined
      ) {
      } else {
        addId_list = userMessage.areaId.split(",");
      }
      console.log(addId_list);
      let s_id;
      let z_id;
      let q_id;
      if (type == "TOWNPRINCIPAL") {
        // 区级/镇级教育局
        let id0 = addId_list[0];
        let id1 = addId_list[1];
        let id2 = addId_list[2];
        s_id = parseInt(id0);
        z_id = parseInt(id1);
        q_id = parseInt(id2);
        this.role = 1;
        this.ex = 1;
        this.institution = 1;
        this.showAddInput = 0;
      } else if (type == "EDUCATIONPRINCIPAL") {
        // 市级教育局
        let id0 = addId_list[0];
        let id1 = addId_list[1];
        s_id = parseInt(id0);
        z_id = parseInt(id1);
        q_id = 0;

        this.areaId2.push(s_id);
        this.areaId2.push(z_id);
        this.areaId2.push(q_id);

        console.log(this.areaId2);

        this.showAddInput = 1;
        this.getTownshipList(s_id, z_id);
      } else if (type == "INNER") {
        // admin
        this.showAddInput = 3;
        this.getAddresslist();
        s_id = 0;
        z_id = 0;
        q_id = 0;
      } else if (type == "ORGPRINCIPAL" || type == "TRUSTEESHIPORGPRINCIPAL") {
       
          let id0 = addId_list[0];
          let id1 = addId_list[1];
          let id2 = addId_list[2];
            s_id = 0;
        z_id = 0;
        // q_id = parseInt(id2);
        q_id = 0;
      
        this.searchForm.status = "";
        this.cvimg = 1;
        this.role = 1;
      }
      // else if(addId_list.length ==1){
      //   // 省级教育局
      //   var id0 = addId_list[0];
      //   var s_id = Integer.parseInt(id0);
      //   this.getCityList(s_id);
      // }
      this.searchForm.provinceId = s_id;
      this.searchForm.cityId = z_id;
      this.searchForm.areaId = q_id;
      console.log("获取地区" + this.showAddInput);
    },

    getTownshipList(s_id, z_id) {
      let level = 1;
      let addressData = {};
      getAddresslist({ level: level }).then((res) => {
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
        getAddresslist({ pid: s_id }).then((res) => {
          res.result.forEach((item) => {
            if (item.id == z_id) {
              newList2 = item;
              newList2.children = [];
              newList2.loading = false;
            }
          });
          getAddresslist({ pid: z_id }).then((res) => {
            newList2.children = res.result;

            addressData.children.push(newList2);
            console.log(addressData);
            this.addressData.push(addressData);
          });
        });
      });
    },

    changeCascader(e) {
      console.log(e);
      this.searchForm.provinceId = e[0];
      this.searchForm.cityId = e[1];
      this.searchForm.areaId = e[2];
    },

    examineBtn() {
      // 判断编辑按钮是否为查看
      let type = JSON.parse(sessionStorage.getItem("userInfo")).type;
      this.organizationType = type;
      console.log(type);
      if (type == "ORGPRINCIPAL" || type == "TRUSTEESHIPORGPRINCIPAL") {
        this.examine_btn = "待付款";
        this.seach_panel = false;
      } else {
        this.examine_btn = "查看";
        this.seach_panel = true;
      }
    },

    changeAreaSearch(v, item) {
      let area = [];
      item.map((val) => {
        area.push(val.label);
      });
      let areaId = [];
      v.map((val) => {
        areaId.push(val * 1);
      });
      this.area = area;
      this.areaId = areaId;
    },

    loadDataSearch(item, callback) {
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
      this.tableHeight = pageHeight - headerHeight - footerHeight - 123;
    },

    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getCourseList();
    },
    handleReset() {
      this.areaId = [];
      this.area = [];
      this.searchForm = {
        pageNumber: 1,
        pageSize: 10,
        type: "EDUCATION",
        areaId: "",
        orgName: "",
        principalName: "",
      };
      this.getCourseList();
    },

    // 确认日期
    handleSubmitDate() {
      this.$refs.dateForm.validate((valid) => {
        if (valid) {
          this.$router.push({ name: "everyDay", query: this.dateForm });
        }
      });
    },
    // changeCondition(e) {
    //   console.log(e);
    //   this.searchForm.status = e;
    // },

    //数据--通用地址
    async regroupAddress(arr) {
      for (let i = 0, len = arr.length; i < len; i++) {
        await this.getAddresslist(arr[i], i, arr);
      }
      let ar = [];
      arr.forEach((item) => {
        ar.push(item * 1);
      });
      this.formItem.areaId = ar;
    },

    handleDelete(row, index) {
      let params = {
        id: row.id,
      };
      console.log(params);
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除这个课程?",
        onOk: () => {
          delCourse(params).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: "删除成功!",
              });
              this.getCourseList();
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
      });
    },

    // 获取省份
    getAddresslist(id, i, arr) {
      if (this.isEdit == "add") {
        getAddresslist({ level: 1 }).then((res) => {
          this.addressData = res.result;
          this.addressDataSearch = res.result;
          this.addressData.forEach((item) => {
            item.children = [];
            item.loading = false;
          });
        });
      } else if (this.isEdit == "edit") {
        return getAddresslist({ pid: id }).then((res) => {
          if (i == 0) {
            this.addressData.forEach((item) => {
              if (item.id == id) {
                item.children = res.result;
                item.loading = false;
              } else {
                item.children = [];
                item.loading = false;
              }
            });
          } else if (i == 1) {
            this.addressData.forEach((item) => {
              if (item.id == arr[i - 1]) {
                item.children.forEach((it) => {
                  if (it.id == id) {
                    it.children = res.result;
                    it.loading = false;
                    console.log(it.name, it.children);
                  } else {
                    it.children = [];
                    it.loading = false;
                  }
                });
              }
            });
          }
        });
      }
    },

    clickArea(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        this.getAddresslist();
      }
    },

    tabonclick(name) {
      console.log("获取" + name);
      if (name == 6) {
        this.searchForm.status = "";
      } else {
        this.searchForm.status = name;
      }

      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getCourseList();
    },

    changeArea(v, item) {
      console.log(item);
      let area = [];
      item.map((val) => {
        area.push(val.label);
      });
      let areaId = [];
      v.map((val) => {
        areaId.push(val * 1);
      });
      this.formItem.area = area;
      this.formItem.areaId = areaId;
      console.log(this.formItem.area);
      console.log(this.formItem.areaId);
    },

    // changeGrade(e) {
    //   console.log(e);
    //   this.searchForm.gradeList = e;
    // },

    // changeSubject(e) {
    //   console.log(e);
    //   this.searchForm.subjectList = e;
    // },

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
      this.getCourseList();
    },

    changePageSize(e) {
      this.searchForm.pageSize = e;
      this.getCourseList();
    },

    // 搜索订单号
    selectInput(e) {
      this.searchForm.noKey = e;
      console.log(this.searchForm.noKey);
    },
    //搜索姓名
    selectname(e) {
      this.searchForm.key = e;
      console.log(this.searchForm.key);
    },

    changeDate(e) {
      console.log(e);
      this.startDate = e[0];
      this.endDate = e[1];
      console.log("滴滴滴" + this.startDate);

      // let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      // date = date.substring(0, date.length - 1);
      // console.log(date);
      this.searchForm.beginTime = this.startDate;
      this.searchForm.overTime = this.endDate;
    },

    // 获取数据
    getCourseList() {
      orderManage(this.searchForm).then((res) => {
        console.log(this.searchForm);
        console.log(res);
        if (res.code == 200) {
          res.result.content.forEach((item) => {
            if (item.createdTime) {
              item.createdTime = dateFormat(item.createdTime);
            }
          });
          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.loading = false;
        }
      });
    },

    // 修改页面
    goEdit(row, index) {
      console.log(row.id);
    },

    //立即使用
    immediate_use(row, index) {
      console.log(row.id);
      let id = row.id;
      let params = {
        id,
      };
      orderused(params).then((res) => {
        console.log(res);
        this.$Message.success({
          top: 300,
          closable: true,
          duration: 3,
          content: res.message,
        });
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        this.getCourseList();
      });
    },

    // 查看页面
    goExamine(row, index) {
      console.log(row);
      this.$router.push({ name: "examine" });
    },

    // 删除
    delCourse() {},

    handleOperation(row, index) {
      console.log(row);
      // 上架
      let id = row.id;
      let params = {
        id,
      };
      let status = row.status;
      console.log(status);
      if (status !== 0) {
        // 下架
        pulloffCourse(params).then((res) => {
          console.log(res);
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.result,
          });
          this.getCourseList();
        });
      } else {
        putonCourse(params).then((res) => {
          console.log(res);
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.result,
          });
          this.getCourseList();
        });
      }
    },

    //推荐课程

    recommendx(row, index) {
      console.log(row);
      // 推荐课程
      let id = row.id;
      let params = {
        id,
      };
      let isRecommend = row.isRecommend;
      console.log(isRecommend);
      if (isRecommend == 1) {
        // 下架
        norecommend(params).then((res) => {
          console.log(res);
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.result,
          });
          this.getCourseList();
        });
      } else {
        recommend(params).then((res) => {
          console.log(res);
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.result,
          });
          this.getCourseList();
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.trainlist {
  padding: 16px;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    .title {
      color: #2d8cf0;
      font-weight: bold;
      line-height: 32px;
    }
  }
  .search {
    border: 1px solid #dcdee2;
    border-radius: 4px;
    padding: 0 6px;
    margin-bottom: 10px;
    // overflow: hidden;
    float: left;
    width: 100%;
    .ivu-form {
      .ivu-form-item {
        margin: 10px 0;
        margin-right: 12px;
      }
    }
  }
  .footer {
    margin-top: 10px;
  }
}

.footer_btn {
  .ivu-btn {
    height: 40px;
    width: 40%;
    margin-right: 6.66666%;
  }
}

.ivu-table-row .ivu-btn {
  width: 72px;
}

textarea.ivu-input {
  height: 160px;
}
</style>