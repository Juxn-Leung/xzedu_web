<template>
  <div>
    <div class="trainlist">
      <Row>
        <div class="header" ref="header">
          <div class="title">
            <span>退款管理</span>
          </div>
        </div>
        <!-- <Divider style="margin: 10px 0" /> -->
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
            <FormItem label="省市区" v-if="showAddInput == 3">
              <Cascader
                change-on-select
                @on-visible-change="clickAreaSearch"
                ref="cascader"
                :data="addressDataSearch"
                :value="areaId"
                @on-change="changeAreaSearch"
                :load-data="loadDataSearch"
                transfer
              ></Cascader>
            </FormItem>
            <FormItem label="省市区" v-else-if="showAddInput == 1">
              <Cascader
                :data="addressData"
                :value="areaId2"
                v-model="areaId2"
                @on-change="changeCascader"
                transfer
              ></Cascader>
            </FormItem>

            <FormItem prop="startTime" label="退款时间">
              <DatePicker
                type="date"
                format="yyyy年MM月dd日"
                :options="startTimeOptions"
                @on-change="startTimeChange"
                v-model="form.startTime"
                placeholder="请选择时间"
              ></DatePicker>
            </FormItem>
            <FormItem style="margin-left: -80px" prop="endTime" label="至">
              <DatePicker
                :disabled="disabledfn"
                type="date"
                format="yyyy年MM月dd日"
                :options="endTimeOptions"
                @on-change="endTimeChange"
                v-model="form.endTime"
                placeholder="请选择时间"
              ></DatePicker>
            </FormItem>

            <FormItem label="关键字">
              <Input
                v-model="searchForm.key"
                @input="selectInput"
                placeholder="请输入订单号,退款单号,学生姓名等查询"
                style="width: 260px"
                clearable
              />
            </FormItem>

            <!-- <FormItem label="姓名">
            <Input
              v-model="searchForm.key"
              @input="selectname"
              placeholder="请输入姓名搜索"
              style="width: 170px;"
              clearable
            />
          </FormItem>-->
          </Form>

          <div class="sou" style="float: right; margin: 15px 0px 11px 0px">
            <Button @click="handleSearch">搜索</Button>
          </div>
        </div>
      </Row>
      <!-- 表格 -->

      <Row>
        <div class="search" style="padding: 0 3px">
          <div class="first_ul">
            <ul>
              <li
                v-for="(tab, index) in tabs"
                v-bind:key="tab"
                :class="{ active: num == index }"
                @click="table(index)"
              >
                {{ tab }}
              </li>
            </ul>
          </div>
        </div>
      </Row>

      <div class="table_content">
        <Row>
          <Table
            :columns="columns"
            :data="data"
            ref="table"
            :loading="loading"
            :height="tableHeight"
          >
            <template slot="finishRate" slot-scope="{ row, index }">
              <div class="nolass" @click="onclikclassName(row, index)">
                <Progress
                  stroke-color="#C6DDFD"
                  v-if="row.progressId == 0"
                  :percent="Number(row.finishRate)"
                >
                  <span style="color: #9e9e9e">{{ row.finishRate }}%</span>
                </Progress>
                <Progress
                  stroke-color="#006BFF"
                  v-if="row.progressId == 1"
                  :percent="Number(row.finishRate)"
                >
                  <span style="color: #006bff">{{ row.finishRate }}%</span>
                </Progress>

                <Progress
                  stroke-color="#FFAF30"
                  v-if="row.progressId == 2"
                  :percent="Number(row.finishRate)"
                >
                  <span style="color: #ffaf30">{{ row.finishRate }}%</span>
                </Progress>
              </div>
            </template>

            <template slot="progressText" slot-scope="{ row, index }">
              <div
                class="progressText"
                v-if="row.progressId == 0"
                style="color: #4c628d"
              >
                {{ row.progressText }}
              </div>
              <div
                class="progressText"
                v-if="row.progressId == 1"
                style="color: #006bff"
              >
                {{ row.progressText }}
              </div>
              <div
                class="progressText"
                v-if="row.progressId == 2"
                style="color: #ffaf30"
              >
                {{ row.progressText }}
              </div>
            </template>

            <template slot="action" slot-scope="{ row, index }">
              <div v-if="cvimg == 1">
                <div v-if="row.tkStatusId == 1" class="yitong" type="text">
                  已处理
                </div>
                <Button
                  v-else
                  @click="succes(row, index)"
                  size="small"
                  type="primary"
                  style="margin-right: 6px; margin-top: 6px; margin-bottom: 6px"
                  >申请中</Button
                >
              </div>

              <div v-if="showAddInput == 3">
                <div
                  v-if="row.tkStatusId == 1"
                  style="color:black;"
                  class="yitong"
                  type="text"
                >
                  已处理
                </div>
                <div
                  v-else
                  class="yitong"
                  style="margin-right: 6px; margin-top: 6px; margin-bottom: 6px"
                  type="text"
                >
                  申请中
                </div>
              </div>
            </template>
          </Table>

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
        </Row>
      </div>

      <!--   弹框 -->
      <!--   弹框 -->
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
          <span>确定通过申请?</span>
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

        <div slot="footer">
          <Button type="primary" :loading="modal_loading" @click="submitAudit"
            >确 定</Button
          >
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { formatDate } from "../../utils/time.js";

import {
  getAddresslist,
  financeDone,
  orderManage,
  getCourseList,
  refundDetailList,
} from "@/api";
import { dateFormat } from "@/utils/current";
export default {
  data() {
    return {
      isEdit: "add",

      seach_panel: true,
      ex: "",
      cvimg: "",
      institution: "",
      tabs: ["全部", "待退款", "已处理"],
      num: 0,
      modal: false,
      modal_loading: false,
      organname: "",
      kainame: "",
      bank: "",
      bankaccount: "",
      bankmoney: "",
      disabledfn: true,
      columns: [
        {
          title: "退款订单号",
          key: "tkOrderNo",
          align: "center",
          minWidth: 180,
        },

        {
          title: "订单号",
          key: "orderNo",
          align: "center",
          minWidth: 180,
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth: 80,
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center",
          minWidth: 200,
        },
        {
          title: "课程名称",
          key: "className",
          align: "center",
          minWidth: 180,
        },
        {
          title: "课程进度",
          slot: "finishRate",
          align: "center",
          minWidth: 180,
        },

        {
          title: "课程状态",
          slot: "progressText",
          align: "center",
          minWidth: 100,
        },

        {
          title: "退款时间",
          key: "refundTime",
          align: "center",
          minWidth: 160,
        },

        {
          title: "操作",
          slot: "action",
          align: "center",
          minWidth: 80,
        },
      ],
      data: [],
      loading: true,
      tableHeight: 0,
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        status: 3,

        // provinceId: "",
        // cityId: "",
        // areaId: "",
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
      form: {
        startTime: "",
        endTime: "",
      },
      startTimeOptions: {}, //开始日期设置
      endTimeOptions: {}, //结束日期设置
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

  watch: {
    "$store.state.organization.myOrgId"() {
      //监听vuex中userName变化而改变header里面的值
      this.getCourseList();
    },

    "$store.state.organization.myCheckInfo"() {
      //监听vuex中userName变化而改变header里面的值
      this.status = this.$store.state.organization.myCheckInfo;
    },
  },

  created() {
    this.getUserInfo();
    this.getCourseList();
  },
  mounted() {
    this.init();
    //this.getAddresslist(); //地址接口

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
    onclikclassName(row, index) {
      this.$router.push({
        name: "refudCourse",
        query: {
          courseId: row.courseId,
          studentId: row.studentId,
          className: row.className,
        },
      });
    },

    addceshi() {
      this.modal = false;
    },

    // 开始时间
    startTimeChange: function(e) {
      let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);
      console.log(date);
      this.starttime = date;
      console.log(this.starttime);
      this.endTimeOptions = {
        disabledDate: (date) => {
          let startTime = this.starttime
            ? new Date(this.starttime).valueOf()
            : "";
          return date && date.valueOf() < startTime;
        },
      };
      this.disabledfn = false;
      this.searchForm.beginTime = date;
    },

    // 结束时间
    endTimeChange: function(e) {
      let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);
      console.log(date);
      this.endtime = date;
      console.log(this.endtime);
      let endTime = this.endtime
        ? new Date(this.endtime).valueOf() - 1 * 24 * 60 * 60 * 1000
        : "";
      this.searchForm.endTime = date;
    },

    succes(row, index) {
      this.modal = true;
      console.log(row);
      this.orderId = row.orderId;
      console.log(this.orderId);
    },
    submitAudit() {
      console.log(this.orderId);
      let orderId = this.orderId;
      let params = {
        orderId,
      };
      financeDone(params).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: "提交成功！",
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
      this.modal = false;
    },

    table(index) {
      this.num = index;
      console.log(this.num);
      if (this.num == 1) {
        this.searchForm.status = 0;
      } else if (this.num == 2) {
        this.searchForm.status = 1;
      } else {
        this.searchForm.status = 3;
      }

      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getCourseList();
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
      addId_list = userMessage.areaId.split(",");
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
        s_id = parseInt(id0);
        z_id = parseInt(id1);
        // q_id = parseInt(id2);
        q_id = 0;

        this.cvimg = 1;
        this.role = 1;
      }
      // else if(addId_list.length ==1){
      //   // 省级教育局
      //   var id0 = addId_list[0];
      //   var s_id = Integer.parseInt(id0);
      //   this.getCityList(s_id);
      // }
      // this.searchForm.provinceId = s_id;
      // this.searchForm.cityId = z_id;
      // this.searchForm.areaId = q_id;
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
      console.log(this.searchForm.cityId);
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

      if (areaId.length == 3) {
        this.searchForm.provinceId = areaId[0];
        this.searchForm.cityId = areaId[1];
        this.searchForm.areaId = areaId[2];
      } else {
        this.searchForm.provinceId = 0;
        this.searchForm.cityId = 0;
        this.searchForm.areaId = 0;
      }
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
      this.tableHeight = pageHeight - headerHeight - footerHeight - 225;
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
      console.log("ee");
      this.getCourseList();
    },

    changePageSize(e) {
      this.searchForm.pageSize = e;
      this.getCourseList();
    },

    // 搜索订单号
    selectInput(e) {
      this.searchForm.key = e;
      console.log(this.searchForm.key);
    },

    changeDate(e) {
      console.log(e);
      this.startDate = e[0];
      this.endTime = e[1];
      console.log("滴滴滴" + this.startDate);

      // let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      // date = date.substring(0, date.length - 1);
      // console.log(date);
      this.searchForm.beginTime = this.startDate;
      this.searchForm.overTime = this.endTime;
    },

    // 获取数据
    getCourseList() {
      let type = JSON.parse(sessionStorage.getItem("userInfo")).type;
      if (type == "ORGPRINCIPAL" || type == "TRUSTEESHIPORGPRINCIPAL") {
        let id = this.$store.state.organization.myOrgId;
        if (id !== "" && id !== null && id !== undefined) {
          console.log(this.$store.state.organization);

          if (this.searchForm.orgId !== "" && this.searchForm.orgId !== id) {
            this.searchForm.pageNumber = 1;
            this.searchForm.pageSize = 10;
          }
          this.searchForm.orgId = id;

          let orgList = JSON.parse(sessionStorage.getItem("userInfo")).orgList;
          console.log("sss" + orgList);
          let type = JSON.parse(sessionStorage.getItem("userInfo")).type;

          console.log(this.searchForm);
        }
        else{
          this.ad=1;
        }
      }

      let orgList = sessionStorage.getItem("userInfo").orgList;
      console.log("sss" + orgList);
      if (this.ad!==1) {
        refundDetailList(this.searchForm).then((res) => {
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
      } else {
        this.data = [];
        this.total = 0;
        this.loading = false;
      }
    },

    // 修改页面
    goEdit(row, index) {
      console.log(row.id);
    },

    // 删除
    delCourse() {},
  },
};
</script>
<style lang="scss" scoped>
.trainlist {
  padding: 12px 16px;
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
  .search {
    border: 1px solid #f0f2f7;
    border-radius: 4px;
    padding: 0 6px;
    margin-bottom: 10px;
    // overflow: hidden;
    background: #f0f2f7;
    border-radius: 15px;
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

.sou button {
  background: #427ef4;
  color: white;
  border-radius: 20px;
}

.ivu-table-row .ivu-btn {
  width: 72px;
}

textarea.ivu-input {
  height: 160px;
}

/deep/ .ivu-form-item-label {
  font-weight: 550;
  color: #1e275e;
}
/deep/ .ivu-modal-header {
  border: 0px;
}
/deep/ .ivu-table-row .ivu-btn {
  width: 56px;

  border: 0px;
  color: white;
  height: 35px;
  border-radius: 12px;
}
/deep/ .ivu-table-row .no {
  width: 56px;
  background: #fa455e;
  border: 0px;
  color: white;
  height: 35px;
  border-radius: 12px;
}

/deep/ .ivu-input::-webkit-input-placeholder {
  color: #bfc4dd;
}
/deep/ .ivu-input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #bfc4dd;
}
/deep/ .ivu-input::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #bfc4dd;
}
/deep/ .ivu-input::-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #bfc4dd;
}

/deep/ .ivu-input {
  background-color: #e2e7f3;
  border: #e2e7f3;
  color: #5669d9;
}
/deep/ .ivu-table td {
  border-bottom: 6px solid #f0f2f7;
}
/deep/ .ivu-table th {
  background-color: #f0f2f7;
  border: 0px;
}

.table_content {
  background: #f0f2f7;
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
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;
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

/deep/ .ivu-table-tbody tr {
}

/deep/ .ivu-table-tbody tr td {
  background-color: #fff;
  margin-bottom: 6px;
  border-top: 3px solid #f0f2f7;
  border-bottom: 3px solid #f0f2f7;
}

/deep/ .ivu-table-tbody tr td:first-child {
  border-bottom-left-radius: 8px;
  border-left: 3px solid #f0f2f7;
}

/deep/ .ivu-table-tbody tr td:last-child {
  border-bottom-right-radius: 8px;
  border-right: 3px solid #f0f2f7;
}

/deep/ .ivu-table-tbody tr td:first-child {
  border-top-left-radius: 8px;
  border-left: 3px solid #f0f2f7;
}

/deep/ .ivu-table-tbody tr td:last-child {
  border-top-right-radius: 8px;
  border-right: 3px solid #f0f2f7;
}

/deep/ .ivu-table {
  background-color: transparent !important;
}

/deep/ .ivu-table-border:after,
/deep/ .ivu-table-fixed-right::before,
/deep/ .ivu-table-fixed::before,
/deep/ .ivu-table::before,
/deep/ .ivu-row::after {
  display: none;
}

.ivu-row-flex-end {
  margin-top: 10px;
  padding-bottom: 20px;
  padding-right: 20px;
}

.first_ul ul {
  width: 100%;
  display: flex;
  height: 55px;
}
.first_ul ul li {
  width: 150px;
  height: 45px;
  margin-top: 5px;
  border-radius: 20px;
  background: #f0f2f7;
  display: inline-flex;
  border-right: 1px solid #f0f2f7;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: 550;
  color: #acacac;
}
.first_ul ul li.active {
  background: white;
  color: #427ef4;
  font-weight: 550;
  font-size: 15px;
}

/deep/ .ivu-modal-content {
  border-radius: 20px;
}

/deep/ .ivu-input {
  border-radius: 10px;
  height: 40px;
  overflow: hidden;
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
  margin-right: 51%;
  transform: translateX(50%);
  height: 46px;
  border-radius: 10px;
  background: #417df4;
  width: 220px;
  margin-bottom: 10px;
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

.matter {
  float: left;
  width: 60%;
  height: 20px;
  margin-left: 25%;
  text-align: left;
  margin-bottom: 25px;
}
.matter a {
  margin-left: 10px;
}
.yitong {
  margin-right: 6px;
  margin-top: 6px;
  margin-bottom: 6px;
  color: #427ef4;
  font-weight: 550;
}

/deep/ .ivu-input-suffix i {
  font-size: 16px;
  line-height: 41px;
  color: #808695;
}
/deep/ .ivu-input-icon {
  line-height: 41px;
}
/deep/ a {
  color: #515a6e;
}

/deep/ .ivu-form .ivu-form-item-label {
  padding: 14px 12px 10px 0 !important;
}

/deep/ .ivu-modal-close {
  z-index: 1;
  font-size: 12px;
  position: absolute;
  right: -5px;
  top: -8px;
  overflow: hidden;
  cursor: pointer;
}
.nolass {
  cursor: pointer;
}
</style>
