<template>
  <div class="trainlist">
    <Row>
      <div class="header" ref="header">
        <div class="title">
          <span>任教课程</span>
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

    <Row>
      <div class="search">
        <Form
          :model="searchForm"
          ref="searchForm"
          style="display: flex; float: left"
          :label-width="80"
        >
          <FormItem label="课程状态">
            <Select
              v-model="searchForm.progressId"
              :value="searchForm.progressId"
              transfer
              style="width: 90px"
            >
              <Option :value="0">未开课</Option>
              <Option :value="1">进行中</Option>
              <Option :value="2">已结课</Option>
               <Option :value="3">全部</Option>
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
    <Row>
      <div class="tabel_first">
        <div class="tabel_second">
          授课老师:<a class="b">{{ teacherName }}</a>
        </div>

        <div class="tabel_second">
          任教课程:<a class="c">{{ total }}(门)</a>
        </div>
      </div>
    </Row>
    <!-- 表格 -->
    <div class="table_content" :style="{ height: tableHeight + 'px' }">
      <Row>
        <div class="curriculum">
          <template v-for="item in data">
            <div class="course" @click="couerxian(item)">
              <img :src="item.coverImg" />
              <p class="name">{{ item.name }}</p>
              <div class="schedule">
                <p>课程进度</p>
                <Progress stroke-color="#E0E0E0" v-if="item.progressId==0" :percent="100" ><span style="color:#A2A2A2;">未开课</span></Progress>
                <Progress v-if="item.progressId==1" :percent="item.finishRate" ></Progress>
                <Progress v-if="item.progressId==2" :percent="item.finishRate" ><span>已结课</span></Progress>
              </div>
              <p class="teacher">授课老师:{{teacherName }}</p>
              <p class="time">时间:{{ item.classDate }}</p>
            </div>
          </template>
        </div>
      </Row>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
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
import { courseLecturerList } from "@/api";
export default {
  data() {
    return {
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        key: "",
        progressId: 3,
      
      },
      teacherName: "",
      total: 0,
      data: [],
      loading: true,
      tableHeight: 0,
      dateStatus: false,
       spinShow: true,
      pageNumber: 1,
      pageSize: 10,
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
      this.tableHeight = pageHeight - headerHeight - footerHeight - 165;
    },

    couerxian(item) {
     console.log(item.id);
     this.courseId=item.id;
      this.$router.push({
        name: "courseXian",
       query: { courseId: this.courseId },
      });
    },

    goBlcak() {
      let route = this.$parent.$route;
      this.$parent.closeTag(route);
      this.$router.go(-1);
    },

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
      this.searchForm.pageSize = 10;
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
      this.searchForm.lecturerId = this.$route.query.id;
      let obj = this.searchForm;
      courseLecturerList(obj).then((res) => {
        if (res.code == 200) {
          res.result.content.forEach((item) => {
            if (item.createdTime) {
              item.createdTime = dateFormat(item.createdTime);
            }
          });
          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.teacherName = res.result.teacherName;
          this.loading = false;
          this.spinShow =false;
        }
      });
    },

    // 操作
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

.table_content {
  background: #fff;
  border-radius: 15px;
  overflow: auto;
  padding-left: 10px;
  padding-right: 10px;

  /deep/ .title {
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

  /deep/ .curriculum {
    width: 100%;
    position: relative;
    min-width: 800px;

    .course {
      width: 24%;
      margin-right: 1%;
      border-radius: 20px;
      position: relative;
      float: left;
      background: #f0f2f7;
      overflow: hidden;
      padding: 0 0 8px 0;
      margin-bottom: 16px;
      cursor: pointer;

      img {
        width: 100%;
        height: 190px;
        position: relative;
        object-fit: cover;
        float: left;
      }

      p {
        width: 100%;
        position: relative;
        float: left;
        margin-top: 8px;
        padding: 0 16px;
      }

      .name {
        line-height: 26px;
        color: #111111;
        font-size: 18px;
        font-weight: 550;
      }

      .schedule {
        padding-left: 90px;
        position: relative;
        width: 100%;
        float: left;
        margin-top: 2px;

        p {
          margin-top: 0;
          line-height: 16px;
          font-size: 15px;
          color: #111111;
          display: inline-block;
          width: 74px;
          left: 16px;
          top: 2px;
          padding: 0;
          text-align: left;
          position: absolute;
        }

        /deep/ .ivu-progress-inner {
          background: #d2dffd;
        }

        /deep/ .ivu-progress-text-inner {
          color: #4580f5;
        }
      }

      .teacher,
      .time {
        line-height: 16px;
        font-size: 15px;
        color: #7e7e7e;
      }
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

.tabel_first {
  width: 100%;
  float: left;
}
.tabel_second {
  float: left;
  color: #1e275e;
  font-weight: 600;
  font-size: 17px;
  font-weight: bold;
  margin-left: 45px;
  margin-bottom: 5px;
}
.b {
  color: #1e275e !important;
}
.c {
  color: #4481f5 !important;
}
</style>
