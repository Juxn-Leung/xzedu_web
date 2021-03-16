<template>
  <div class="trainlist">
    <Row>
      <div class="header" ref="header">
        <div class="title">
          <span>{{ className }}</span>
        </div>
      </div>
    </Row>
    <!-- 搜索 -->
    <Row>
 <div class="tabel_first">
        <div class="tabel_second">
         总课时：<a>{{ totalLesson }}</a> 节课时
        </div>
        <div class="tabel_second">
          已开课：<a>{{ openLesson }}</a> 节课时
        </div>
      </div>

    </Row>
    <!-- 表格 -->

    <div class="table_content" :style="{ height: tableHeight + 'px' }">
      <Row>
        <div class="curriculum">
          <template v-for="item in data2">
            <div class="courseDetail">
              <p class="name">第{{ item.index }}节</p>
              <p class="time">({{ item.time }})</p>

              <p class="text">{{ item.name }}</p>
              <p class="text">授课老师:{{ item.lecturerName }}</p>
              <p class="text">学生名字:{{ item.studentName }}</p>

              <p v-if="item.selfStatus == -1" class="num">
                学生考勤: <span style="color: #989898">未开课</span>
              </p>
              <p v-if="item.selfStatus == 0" class="num">
                学生考勤: <span style="color: #ff4b67">未打卡</span>
              </p>
              <p v-if="item.selfStatus == 1" class="num">
                学生考勤: <span style="color: #006bff">已打卡</span>
              </p>
              <p v-if="item.selfStatus == 2" class="num">
                学生考勤: <span style="color: #f2ab3b">请假</span>
              </p>

              <p v-if="item.selfStatus == -1" class="num">
                老师点名: <span style="color: #989898">未开课</span>
              </p>
              <p v-if="item.selfStatus == 0" class="num">
                老师点名: <span style="color: #ff4b67">缺勤</span>
              </p>
              <p v-if="item.selfStatus == 1" class="num">
                老师点名: <span style="color: #006bff">出勤</span>
              </p>
            </div>
          </template>
        </div>
      </Row>
    </div>
    <!-- 分页 -->
    <Row type="flex" justify="end" class="page">
      <div ref="footer" class="footer">
        <Page
          :current="pageNumber"
          :total="total2"
          @on-change="changePage2"
           :page-size="18"
          @on-page-size-change="changePageSize2"
          :page-size-opts="[18, 38, 58]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </Row>
  </div>
</template>

<script>
import {
  studentList,
  selcourses,
  addStudents,
  editStudent,
  delStudent,
  studentDetail,
  courses,
  attends,
} from "@/api";
export default {
  data() {
    return {
      className: "",

      data: [],
      loading: true,
      tableHeight: 0,

      total2: 0,
      data2: [],
      pageNumber: 1,
      pageSize: 18,

      totalLesson: "",
      openLesson: "",
    };
  },

  created() {
    this.attends();
    this.className = this.$route.query.className;
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
      this.tableHeight = pageHeight - headerHeight - footerHeight - 100;
    },
    attends() {
      let obj = {};
      obj.courseId = this.$route.query.courseId;
      obj.studentId = this.$route.query.studentId;
      obj.pageNumber = this.pageNumber;
      obj.pageSize = this.pageSize;
      attends(obj).then((res) => {
        if (res.code == 200) {
          this.data2 = res.result.content;
          this.total2 = res.result.totalElements;
          this.totalLesson = res.result.totalLesson;
          this.openLesson = res.result.openLesson;
        }
      });
    },

    changePage2(e) {
      this.pageNumber = e;
      this.attends();
    },

    changePageSize2(e) {
      this.pageSize = e;
      this.attends();
    },
  },
};
</script>

<style  lang="scss" scoped>
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
  float: left;
  width: 100%;
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

        /deep/ .ivu-icon-ios-checkmark-circle::before {
          content: "已完成";
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
      border-radius: 20px;
      margin: 0 10px 10px 0;
      width: 210px;
      height: 180px;
      background: #f0f2f7;
      padding: 14px 18px;
      overflow: hidden;

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
        font-size: 14px;
        color: #696969;
        line-height: 20px;
      }

      .num {
        line-height: 16px;
        font-size: 15px;
        font-weight: 550;
        color: #303030;
        padding: 0 0 0 14px;
        margin-top: 8px;
      }

      .num::after {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #2f2f2f;
        position: absolute;
        left: 4px;
        top: 5px;
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

    Button {
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
  height: 40px;
}
.tabel_second {
  float: left;
  color: #1E275E;
  font-weight: 600;
  font-size: 17px;
  font-weight: bold;
  margin-left: 45px;
  margin-bottom: 5px;
}
.tabel_second a {
  color: #4481f5 !important;
}
</style>