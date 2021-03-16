<template>
  <div class="trainlist">
    <Row>
      <div class="header" ref="header">
        <div class="title">
          <span>{{ cousername }}</span>
        </div>
        <!-- <div class="export-btn">
          <div @click="goBlcak">
            <div class="firsticon">
              <Icon type="ios-undo" color="#427ef4" size="35" />
            </div>

            <div class="firsttitle">返回</div>
          </div>
        </div> -->
      </div>
    </Row>
    <!-- 搜索 -->

    <Row v-if="pageDisplay == 1">
      <div class="search">
        <Form
          :model="searchForm"
          ref="searchForm"
          style="display: flex; float: left"
          :label-width="80"
        >
          <FormItem label="课程状态">
            <Select
              v-model="searchForm.status"
              :value="searchForm.status"
              transfer
              style="width: 90px"
              @on-change="changeCondition"
            >
              <Option :value="0">全部</Option>
              <Option :value="1">上架</Option>
              <Option :value="2">下架</Option>
            </Select>
          </FormItem>

          <FormItem label="关键字">
            <Input
              v-model="searchForm.key"
              @input="selectInput"
              placeholder="请输入学生姓名或手机号码进行搜索"
              style="width: 240px"
            />
          </FormItem>
        </Form>
        <div class="sou" style="float: right; margin: 15px 0px 11px 0px">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </div>
      </div>
    </Row>

    <!-- 表格 -->
    <!-- <Row>
      <div class="titlex">
        <p>总课时：<span>6 节课时</span></p>
        <p>已开课：<span>6 节课时</span></p>
      </div>
    </Row> -->

    <div class="table_content" :style="{ height: tableHeight + 'px' }">
      <div class="curriculum">
        <Row>
          <Col :xs="24" :sm="4" :md="4" :lg="4">
            <div class="curr_first" :style="{ height: tableHeight + 'px' }">
              <div class="curr_title">排课列表</div>
              <div class="curr_x">
                <div
                  class="curr_list"
                  v-for="(item, index) in curr_list"
                  
                  :class="{
                    active: index == isActive,
                    activex: item.progress == 0,
                  }"
                  @click="changeValue(index, item)"
                >
                  <div class="curr_name">
                    {{ item.rankClass }}<span>▶</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col :xs="24" :sm="20" :md="20" :lg="20">
            <div class="course_title">
              <h2>
                {{ rankClass }}<span>({{ classDate }})</span>
              </h2>
              <p>{{ classTitle }}</p>
            </div>

            <div class="course_caption">
              <div class="course_caption1">学生列表</div>
              <div class="course_caption2">
                授课教师：<span>{{ teachername }}</span> 学生人数：<span
                  >{{ allCount }}人</span
                >
              </div>
            </div>

            <div class="curr_first2" >
              <Row :gutter="6">
                <Col span="4" v-for="item in List" >
                  <div class="courseDetail">
                    <div class="courseDetail_first">
                      <p class="text">{{ item.userName }}</p>

                      <p class="num">
                        学生考勤:

                        <span
                          v-if="item.selfStatusId == 0"
                         
                          style="color: #ff4b67"
                          >未打卡</span
                        >
                        <span
                          v-if="item.selfStatusId == 1"
                          style="color: #006bff"
                          >已打卡</span
                        >
                        <span
                          v-if="item.selfStatusId == 2"
                          style="color: #f2ab3b"
                          >请假</span
                        >
                      </p>
                      <p class="num2">
                        老师点名:

                        <span
                          v-if="item.lecturerStatusId == 0"
                          style="color: #ff4b67"
                          >缺勤</span
                        >
                        <span
                          v-if="item.lecturerStatusId == 1"
                          style="color: #006bff"
                          >出勤</span
                        >
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <!-- <template>
            <div class="courseDetail">
              <p class="name">第一节</p>
              <p class="time">(2020-10-09 2020-12-01)</p>

              <p class="text">集合的概念与表示</p>
              <p class="text">授课老师:欧阳娜娜</p>
              <p class="text">学生名字:渡边麻友</p>
              
              <p class="num">学生考勤: <span style="color:#4581F5;">已打卡</span></p>
              <p class="num">老师点名: <span style="color:#4581F5;">出勤</span></p>

            </div>
          </template> -->
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <!-- 分页 -->
    <Row type="flex" justify="end" class="page">
      <div ref="footer" class="footer">
        <Page
          :current="searchForm.pageNumber"
          :total="total"
          @on-change="changePage"
           :page-size="30"
          @on-page-size-change="changePageSize"
          :page-size-opts="[30, 50, 100]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </Row>
  </div>
</template>

<script>
import { courseAttendList, studentAttendList } from "@/api";
export default {
  data() {
    return {
      searchForm: {
        pageNumber: 1,
        pageSize: 30,
        outlineId: "",
      },
      techerForm: {
        courseId: "",
      },
      curr_list: [],
      cousername: "",
      teachername: "",
      allCount: "",
      isActive: false,
      spinShow: true,
      classTitle: "",
      classDate: "",
      rankClass: "",
      List: [],
      total: 0,
      data1: [],
      data: [],
      loading: true,
      tableHeight: 0,
      dateStatus: false,
      dateForm: { date: "", id: "" },
      dateList: [],
      modal: false,
      modal2: false,

      modalPlan: 1,
      total2: 0,
      pageNumber: 1,
      pageSize: 30,

      pageDisplay: 2,
    };
  },
  watch: {
    "$store.state.organization.myOrgId"() {
      //监听vuex中userName变化而改变header里面的值
      this.getOrgId();
    },
  },
  created() {
    this.getStudentList();
  },
  mounted() {
    this.init();
  },
  destroyed() {
    // 销毁全局方法
    window.onresize = null;
  },
  computed: {},
  methods: {
    changeValue(index, item) {
      console.log(item.progress);
    
        this.isActive = index;
        this.searchForm.outlineId = item.id;
        this.getstudentAttendList();
      
    },
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
      this.tableHeight = pageHeight - headerHeight - footerHeight - 55;
    },

    goBlcak() {
      if (this.pageDisplay == 2) {
        this.pageDisplay = 1;
      } else {
        let route = this.$parent.$route;
        this.$parent.closeTag(route);
        this.$router.go(-1);
      }
    },

    getOrgId() {
      let id = this.$store.state.organization.myOrgId;
      this.addForm.orgId = id;
      if (id !== "" && id !== null && id !== undefined) {
        if (this.searchForm.orgId !== "" && this.searchForm.orgId !== id) {
          // 重置
          this.searchForm = {
            pageNumber: 1,
            pageSize: 30,
            key: "",
            addDate: "",
            areaId: null,
            cityId: null,
            provinceId: null,
            orgId: "",
          };
        }
        this.searchForm.orgId = id;
        this.selcourses();
      }
    },

    selcourses() {},

    // 筛选相关
    selectInput(e) {
      this.searchForm.key = e;
    },

    changeDate(e) {
      let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);
      this.searchForm.addDate = date;
    },

    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 30;
      this.getStudentList();
    },

    // 确认日期
    handleSubmitDate() {
      this.$refs.dateForm.validate((valid) => {
        if (valid) {
          this.$router.push({ name: "everyDay", query: this.dateForm });
        }
      });
    },

    // 新增页面
    showAddModal() {
      this.modal = true;
      this.modalPlan = 1;
    },

    addStudent() {},

    // 修改
    showEdModal(row, index) {
      let id = row.id;
      this.studentDetail(id);
      this.modal = true;
      this.modalPlan = 2;
    },

    eidtStudent() {},

    goBuyCount() {
      this.$router.push({ name: "evaluateCourse" });
    },

    goProgressCount() {
      this.$router.push({ name: "evaluatePlan" });
    },

    // 关闭&清空
    closeModal() {
      this.modal = false;
      this.clearAddForm();
    },

    clearAddForm() {
      this.addForm = {
        orgId: null,
        name: "",
        phone: "",
        parentName: "",
        parentphone: "",
        courses: [],
      };
      this.getOrgId();
    },

    changePage(e) {
      this.searchForm.pageNumber = e;
      this.getStudentList();
    },

    changePageSize(e) {
      this.searchForm.pageSize = e;
      this.getStudentList();
    },

    // 获取数据
    getStudentList() {
      let obj = {};
      let courseId = this.$route.query.courseId;
      obj.courseId = courseId;
      courseAttendList(obj).then((res) => {
        if (res.code == 200) {
          this.curr_list = res.result;

          this.cousername = res.result[0].name;
          this.outlineId = res.result[0].id;
          console.log(this.outlineId);
          this.searchForm.outlineId = this.outlineId;
          this.loading = false;
          this.getstudentAttendList();
        }
      });
    },

    //获取打卡

    getstudentAttendList() {
      let obj = {};
      console.log(this.outlineId);

      studentAttendList(this.searchForm).then((res) => {
        if (res.code == 200) {
          this.List = res.result.content;
          this.teachername = res.result.teacherName;
          this.total = res.result.totalElements;
          this.allCount = res.result.allCount;
          this.classTitle = res.result.classTitle;
          this.classDate = res.result.classDate;
          this.rankClass = res.result.rankClass;
          this.loading = false;
          this.spinShow = false;
       

        }
      });
    },

    studentDetail(id) {
      studentDetail({ id }).then((res) => {
        if (res.code == 200) {
          let result = res.result;
          this.addForm.name = result.name;
          this.addForm.phone = result.phone;
          this.addForm.parentName = result.parentName;
          this.addForm.parentPhone = result.parentPhone;

          let list = [];
          if (result.courses.length !== 0) {
            for (var i in result.courses) {
              list.push(result.courses[i].courseId);
              if (Number(i + 1) == result.courses.length) {
                this.addForm.courses = list;
              }
            }
          } else {
            this.addForm.courses = list;
          }
        }
      });
    },

    // 操作

    handleDelete(row, index) {},

    change_page() {},

    change_page_size() {},
  },
};
</script>

<style lang="scss" scoped>
.trainlist {
  padding: 0 16px 0 36px;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 19px 6px;
    .title {
      color: #373737;
      font-weight: 600;
      font-size: 20px;
      font-weight: bold;
      line-height: 50px;
      margin-left: 10px;
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

    .export-btn button {
      background: transparent;
      border: none;

      /deep/ span {
        color: #427ef4;
        position: absolute;
        top: 50px;
        right: 40px;
        font-size: 16px;
        margin-left: 0;
        width: 64px;
      }

      /deep/ i {
        width: 42px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        color: #fff;
        font-size: 22px;
        border-radius: 50%;
        background: #427ef4;
        position: absolute;
        top: 7px;
        right: 52px;
      }
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

    /deep/ .ivu-input {
      background-color: #e2e7f3;
      border: #e2e7f3;
      color: #5669d9;
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
/deep/ .ivu-modal-footer {
  border: 0px;
}
/deep/ .ivu-modal {
  top: 30px;
}
/deep/ .ivu-table-cell {
  padding-left: 0;
  padding-right: 0;
}
// .ivu-form{
//   width: 100%;
// }

.first {
  float: left;
  width: 30%;
  height: 30px;
  background: black;
}

/deep/ .ivu-modal-close {
  z-index: 1;
  font-size: 12px;
  position: absolute;
  right: -8px;
  top: -8px;
  overflow: hidden;
  cursor: pointer;
  background: none !important;
  color: #515a6e;
  // border-radius: 50%;
}

.footer_btn {
  .ivu-btn {
    height: 40px;
    width: 40%;
    margin-right: 6.66666%;
  }
}
a {
  color: #818284 !important;
}

.ceshifirst {
  width: 50px;
  height: 50px;
  cursor: pointer;
  text-align: center;
}

.firsticon {
  float: left;
  width: 100%;
  text-align: center;
}

.firsttitle {
  font-size: 12px;
  color: #427ef4;
  font-weight: 550;
}

/deep/ .ivu-table td {
  border-bottom: 6px solid #f0f2f7;
}

/deep/ .ivu-table th {
  background-color: #f0f2f7;
  border: 0px;
}

.ivu-row-flex-end {
  margin-top: 10px;
  padding-bottom: 20px;
  padding-right: 20px;
}

.table_content {
  background: #fff;
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

/deep/ .title {
  height: 56px;
  position: relative;
  float: left;

  p {
    font-size: 20px;
    font-weight: 550;
    color: #1e275e;
    position: relative;
    float: left;
    display: inline-block;
    margin-right: 32px;

    span {
      color: #4481f5;
    }
  }
}

.titlex {
  width: 100%;
  height: 56px;
  position: relative;
  float: left;

  p {
    font-size: 20px;
    font-weight: 550;
    color: #1e275e;
    position: relative;
    float: left;
    display: inline-block;
    margin-right: 32px;

    span {
      color: #4481f5;
    }
  }
}
.table_content {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;

  /deep/ .curriculum {
    width: 100%;
    position: relative;
    min-width: 800px;

    .course {
      width: 32%;
      margin-right: 2%;
      border-radius: 20px;
      position: relative;
      float: left;
      background: #f0f2f7;
      overflow: hidden;
      padding: 8px 8px 8px 190px;
      margin-bottom: 16px;
      height: 216px;

      img {
        width: 170px;
        height: 200px;
        position: absolute;
        object-fit: cover;
        left: 8px;
        top: 8px;
        border-radius: 10px;
      }

      p {
        width: 100%;
        position: relative;
        float: left;
        margin-top: 8px;
        padding: 0 0 0 8px;
      }

      .name {
        line-height: 26px;
        color: #111111;
        font-size: 18px;
        font-weight: 550;
      }

      .schedule {
        position: relative;
        width: 100%;
        float: left;
        padding: 0 0 0 8px;

        /deep/ .ivu-progress-inner {
          background: #d2dffd;
        }

        /deep/ .ivu-progress-text-inner {
          color: #4580f5;
        }
      }

      .teacher,
      .time,
      .num {
        line-height: 16px;
        font-size: 14px;
        color: #575757;
      }
    }

    .course:nth-child(3),
    .course:nth-child(6) {
      margin-right: 0;
    }

    @media (max-width: 1400px) {
      .course {
        width: 49%;
        margin-right: 0;
      }

      .course:nth-child(1),
      .course:nth-child(3),
      .course:nth-child(5) {
        margin-right: 2%;
      }
    }

    .courseDetail {
      position: relative;
      float: left;
      width: 100%;
      overflow: hidden;
      margin-bottom: 10px;

      p {
        position: relative;
        width: 100%;
        float: left;
      }

      .name {
        font-size: 17px;
        font-weight: 550;
        line-height: 20px;
        color: #111111;
      }

      .time {
        font-size: 12px;
        color: #575757;
        line-height: 14px;
        margin: 5px 0;
      }

      .text {
        font-size: 17px;
        color: #303030;
        line-height: 20px;
        margin-top: 10px;
        margin-left: 5px;
        font-weight: bold;
      }

      .num {
        line-height: 16px;
        font-size: 14px;
        font-weight: 550;
        color: #303030;
        padding: 0 0 0 14px;
        margin-top: 8px;
      }
      .num2 {
        line-height: 16px;
        font-size: 14px;
        font-weight: 550;
        color: #303030;
        padding: 0 0 0 14px;
        margin-top: 8px;
        margin-bottom: 10px;
      }

      .num::after {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #2f2f2f;
        position: absolute;
        left: 5px;
        top: 5px;
      }
      .num2::after {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #2f2f2f;
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }

    .courseDetail_first {
      width: 90%;
      overflow: hidden;
      margin: 0 auto;
      background: #f0f2f7;
      border-radius: 15px;
      padding: 5px;
    }
  }

  /deep/ .ivu-row-flex-end {
    width: 100%;
  }
}

.queding {
  font-size: 18px;
  font-weight: 550;
}

/deep/ .ivu-table table {
  overflow-y: auto;
}

/deep/ .ivu-table-wrapper {
  border: none;
}

/deep/ .ivu-table-tip tr {
  background: #f0f2f7;
}

/deep/ .ivu-table th {
  background: #f0f2f7;
  border: 0;
}
/deep/ .ivu-table-border td {
  border: 0px;
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
/deep/ .ivu-table-row .ivu-btn {
  width: 56px;
  background: #f4c042;
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

/deep/ .ivu-form-item-content .ivu-select-placeholder {
  color: #bfc4dd !important;
  background-color: #e2e7f3;
  height: 40px !important;
  line-height: 40px !important;
  border-radius: 10px !important;
  border: 0px !important;
}
/deep/ .ivu-form-item-content .ivu-select-selected-value {
  color: #5669d9;
  background-color: #e2e7f3;
  height: 40px !important;
  line-height: 40px !important;
  border-radius: 10px !important;
  border: 0px !important;
}
/deep/ .ivu-form-item-content .ivu-select-selection {
  color: #bfc4dd;
  background-color: #e2e7f3;
  height: 40px !important;
  line-height: 40px !important;
  border-radius: 10px !important;
  border: 0px !important;
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
  background-color: #fff;
  border: #eaeaea 1px solid;
  color: #5669d9;
}

/deep/ .ivu-input {
  border-radius: 10px;
  height: 40px;
  overflow: hidden;
}

/deep/ .ivu-form .ivu-form-item-label {
  text-align: center;
  padding: 14px 12px 10px 0 !important;
}

/deep/ .ivu-input-suffix i {
  font-size: 16px;
  line-height: 40px;
  color: #808695;
}

/deep/ .ivu-form-item-label {
  font-weight: 550;
  color: #1e275e;
}

.sou button {
  background: #427ef4;
  color: white;
  border-radius: 20px;
}

.addModal {
  /deep/ .ivu-modal {
    border-radius: 20px !important;
    margin-top: 100px;

    .ivu-modal-content {
      border-radius: 20px !important;
      background: #fff;
    }
  }

  /deep/ .modalHeader {
    position: relative;
    width: 100%;
    height: 64px;

    p {
      width: 100%;
      font-size: 18px;
      text-align: center;
      position: relative;
      float: left;
      height: 20px;
      margin-top: 12px;
      line-height: 20px;
      font-weight: 550;
      color: #535353;
    }

    h5 {
      width: 100%;
      font-size: 16px;
      text-align: center;
      position: relative;
      float: left;
      height: 20px;
      margin-top: 5px;
      line-height: 20px;
      color: #535353;

      span {
        color: #f43939;
      }
    }
  }

  /deep/ .ivu-modal-body,
  /deep/ .ivu-modal-footer {
    padding: 0 0 30px 0;
    position: relative;
    width: 100%;
    text-align: center;
  }

  /deep/ .ivu-modal-body {
    z-index: 77;
  }

  /deep/ .modalContent {
    padding: 30px 90px 30px 60px;
    position: relative;
    float: left;
    width: 100%;

    /deep/ .ivu-form-item-label {
      font-size: 17px;
      padding: 0 36px 0 0 !important;
      line-height: 40px;
      height: 40px;
      text-align: right;
      color: #535353;
    }

    /deep/ .hint {
      font-size: 15px;
      display: inline-block;
      height: 40px;
      position: relative;
      color: #c2c2c2;
      line-height: 40px;
      width: 100%;
      text-align: left;
      text-indent: -36px;
    }

    /deep/ .ivu-checkbox-group {
      width: 100%;
      position: relative;
      width: 610px;
      margin-left: -150px;
      z-index: 77;

      .ivu-checkbox-wrapper {
        width: 190px;
        height: 70px;
        position: relative;
        border-radius: 10px;
        background: #efefef;
        float: right;
        margin-left: 12px;
        margin-right: 0;

        .ivu-checkbox {
          border-radius: 50%;
          position: absolute;
          right: 5px;
          bottom: 5px;
          width: 18px;
          height: 18px;
          background: #d7d7d7;

          .ivu-checkbox-inner {
            width: 18px;
            height: 18px;
            border: none;
            background: transparent;
            position: relative;
          }
        }

        .ivu-checkbox-checked {
          background: #4480f5;
          box-shadow: none !important;
        }

        .ivu-checkbox-focus {
          box-shadow: none !important;
        }

        .ivu-checkbox-checked .ivu-checkbox-inner:after {
          width: 6px;
          height: 12px;
          position: absolute;
          top: 2px;
          left: 6px;
        }

        /deep/ img {
          width: 62px;
          height: 60px;
          border-radius: 8px;
          top: 5px;
          left: 5px;
          position: absolute;
        }

        /deep/ .name {
          position: absolute;
          left: 75px;
          top: 18px;
          color: #494949;
          line-height: 12px;
          font-size: 12px;
          padding-right: 10px;
          text-align: left;
          max-height: 36px;
          overflow: hidden;
        }

        /deep/ .teacher {
          position: absolute;
          bottom: 12px;
          left: 75px;
          color: #9c9c9c;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
        }
      }
    }
  }

  /deep/ .modalFooter {
    position: relative;
    // float: left;
    width: 100%;
    padding: 0;

    button {
      width: 270px;
      position: relative;
      background: #417df4;
      border-radius: 10px;
      text-align: center;
      line-height: 60px;
      height: 60px;
      color: #fff;
      font-size: 18px;
    }
  }

  /deep/ .ivu-page {
    text-align: right;
  }
}

/deep/ .ivu-spin-fix {
  background: transparent;
  border: none;
}

.curr_first {
  float: left;
  width: 100%;
  border-radius: 15px;
  background: #f0f2f7;
}
.curr_x {
  float: left;
  width: 100%;
  height: inherit;
  overflow: auto;
  height: 90%;
}
.curr_first2 {
  float: left;
  width: 100%;
  overflow: auto;
  height: 508px;
}
.course_title {
  float: left;
  width: 99%;
  margin-left: 1%;
  h2 {
    color: #121212;
    font-size: 18px;
  }

  span {
    font-size: 12px;
    color: #121212;
  }
  p {
    color: #696969;
    font-size: 18px;
    padding: 0 0 0 14px;
    font-weight: bold;
  }

  p::after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #696969;
    position: absolute;
    left: 13px;
    top: 37px;
  }
}

.course_caption {
  float: left;
  width: 98%;
  margin-left: 1%;
  margin-bottom: 6px;
}
.course_caption1 {
  float: left;
  font-size: 16px;
  color: #121212;
  font-weight: bold;
  padding: 0 0 0 14px;
}
.course_caption2 {
  float: right;
  font-size: 16px;
  color: #121212;
  font-weight: bold;

  span {
    color: #417df4;
    font-weight: bold;
    font-size: 18px;
    padding: 0 10px 0 0;
  }
}

.curr_title {
  float: left;
  width: 100%;
  font-size: 18px;
  color: #121212;
  font-weight: bold;
  padding: 20px 0 0 20px;
}
.curr_list {
  float: left;
  width: 100%;
  text-align: right;
  color: #121212;
}
.curr_name {
  font-size: 16px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
  padding: 0 10px 0 0;
  cursor: pointer;

  span {
    margin-left: 10px;

    font-size: 10px;
  }
}

.active {
  color: #4681f5;
}
.activex {
  color: #959595;
}
</style>
