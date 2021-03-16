<template>
  <div id="agreement">
    <div class="header">
      <div class="title">
        <p class="name">{{courseName}}({{progress==0?'未开始':progress==1?'开课中':'已结课'}})</p>
        <p class="time">班级总人数:{{totalStudent}}人</p>
        <p class="time">上课时间:{{courseTime}}</p>

        <Dropdown
          trigger="click"
          @on-click="changeOutlines"
        >
          <a
            class="num"
            href="javascript:void(0)"
          >
            第<span>{{outlineIndex}}节</span>课时
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu
            slot="list"
            v-for="item in outlines"
          >
            <DropdownItem
              :class="searchForm.outlineId == item.outlineId?'active':''"
              :name="item.outlineId"
            >{{item.outlineIndex}}节({{item.progress==0?'未开始':item.progress==1?'开课中':'已结课'}})</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

    </div>

    <div class="sort">
      <Dropdown
        trigger="click"
        @on-click="changeSort"
      >
        <a
          class="label"
          href="javascript:void(0)"
        >
          按名字首字母排序
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="1">按名字首字母排序
            <Icon
              v-if="searchForm.sortType==1"
              type="md-checkmark"
            />
          </DropdownItem>
          <DropdownItem name="2">按报名顺序排序
            <Icon
              v-if="searchForm.sortType==2"
              type="md-checkmark"
            />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <div
        class="sortIcon"
        @click="changeSort"
      >
        <img
          v-if="searchForm.arrangeType==1"
          src="../../../assets/clockIn/sort.png"
        >
        <img
          v-if="searchForm.arrangeType==2"
          src="../../../assets/clockIn/sortLine.png"
        >
      </div>
    </div>

    <div class="search">
      <Input
        v-model="searchForm.key"
        @input="keyInput"
        placeholder="输入学生名字搜索"
      >
      <Icon
        type="ios-search"
        slot="prefix"
      />
      </Input>
    </div>

    <div class="studentlist">
      <div class="number">
        <p class="all">班级总人数:{{totalStudent}}人</p>

        <p class="attendance">出勤:<span>{{hasAttendStudent}}人</span></p>

        <p class="absent">缺勤<span>{{noAttendStudent}}人</span></p>
      </div>

      <div
        class="student"
        :style="`height:${studentHeight};`"
        v-show="searchForm.arrangeType==1"
      >
        <template v-for="item in horStudentList">
          <div class="demo">
            <img :src="item.studentHeadImg">
            <Dropdown
              trigger="click"
              :placement="bottom"
              @on-click="clilckState"
              @on-visible-change="changeState(item)"
            >
              <a
                class="label"
                :style="item.attendStatus==1?'':'color:#FA4F74;'"
                href="javascript:void(0)"
              >
                {{item.attendStatus==1?'· 出勤':'· 缺勤'}}
              </a>
              <DropdownMenu slot="list">
                <DropdownItem
                  name="1"
                  :class="item.attendStatus==1?'active':''"
                >出勤</DropdownItem>
                <DropdownItem
                  name="0"
                  :class="item.attendStatus==0?'active':''"
                >缺勤</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <p class="name">{{item.studentName}}</p>
          </div>
        </template>
      </div>

      <div
        class="student"
        :style="`height:${studentHeight};`"
        v-show="searchForm.arrangeType==2"
      >
        <PinyinSort
          :list="verStudentList"
          :top="letterListHeight"
        >
          <p
            class="title"
            slot="sortTitle"
            slot-scope="item"
          >{{item.letter}}</p>
          <div
            class="cont"
            slot="sortCont"
            slot-scope="i"
          >
            <img :src="i.data.studentHeadImg">
            <p>{{i.data.studentName}}</p>

            <Dropdown
              class="sortDropdown"
              trigger="click"
              :placement="bottom"
              @on-click="clilckState"
              @on-visible-change="changeState(i.data)"
            >
              <a
                class="label"
                :style="i.data.attendStatus==1?'':'color:#FA4F74;'"
                href="javascript:void(0)"
              >
                {{i.data.attendStatus==1?'· 出勤':'· 缺勤'}}
              </a>
              <DropdownMenu slot="list">
                <DropdownItem
                  name="1"
                  :class="i.data.attendStatus==1?'active':''"
                >出勤</DropdownItem>
                <DropdownItem
                  name="0"
                  :class="i.data.attendStatus==0?'active':''"
                >缺勤</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </PinyinSort>
      </div>
    </div>

  </div>
</template>
<script>
import { attendOutlineDetail, attendOutlines, checkDone } from "@/api";
import { Debounce } from "../../../libs/util";

import PinyinSort from "@/components/sort/pinyinSort.vue";
export default {
  data() {
    return {
      searchForm: {
        lecturerId: "",
        outlineId: "",
        sortType: 2,
        arrangeType: 1,
        key: "",
      },
      courseId: null,
      courseName: "",
      outlineConent: "",
      outlineIndex: 0,
      progress: 0,
      courseTime: "",
      canAttend: 0,
      notAttendReson: "",
      totalStudent: 0,
      hasAttendStudent: 0,
      noAttendStudent: 0,

      horStudentList: [],

      verStudentList: [],

      outlines: [],

      studentId: "",

      studentHeight: "",

      letterListHeight: "",
    };
  },

  watch: {},

  components: {
    PinyinSort,
  },

  computed: {},

  created() {},

  mounted() {
    this.setId();
    this.getHeight();
  },

  methods: {
    getHeight() {
      let height = document.documentElement.clientHeight - 226;
      this.studentHeight = height + "px";

      this.letterListHeight = height / 2 + 226 + "px";
    },

    setId() {
      this.searchForm.lecturerId = this.$route.query.lecturerId;
      this.searchForm.outlineId = this.$route.query.outlineId;

      this.searchForm.lecturerId = 62;

      this.searchForm.outlineId = 888;

      this.attendOutlineDetail();
    },

    attendOutlines() {
      let obj = {};
      obj.courseId = this.courseId;
      attendOutlines(obj).then((res) => {
        if (res.code == 200) {
          this.outlines = res.result;
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

    attendOutlineDetail() {
      let obj = this.searchForm;
      attendOutlineDetail(obj).then((res) => {
        if (res.code == 200) {
          this.horStudentList = res.result.horStudentList;

          this.courseId = res.result.courseId;

          this.courseName = res.result.courseName;
          this.outlineConent = res.result.outlineConent;
          this.outlineIndex = res.result.outlineIndex;
          this.progress = res.result.progress;
          this.courseTime = res.result.courseTime;
          this.canAttend = res.result.canAttend;
          this.notAttendReson = res.result.notAttendReson;

          this.totalStudent = res.result.totalStudent;
          this.hasAttendStudent = res.result.hasAttendStudent;
          this.noAttendStudent = res.result.noAttendStudent;

          this.verStudentList = res.result.verStudentList;

          this.attendOutlines();
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

    clilckState(e) {
      if (this.canAttend == 1) {
        let obj = {
          lecturerId: this.searchForm.lecturerId,
          studentId: this.studentId,
          outlineId: this.searchForm.outlineId,
          attend: e,
        };
        checkDone(obj).then((res) => {
          if (res.code == 200) {
          } else {
            this.$Message.error({
              top: 300,
              closable: true,
              duration: 3,
              content: res.message,
            });
          }
        });

        this.attendOutlineDetail();
      } else {
        if (this.notAttendReson == 1) {
          var str = "上课前半小时之前，不能打卡";
        } else {
          var str = "上课已超过半小时，不能打卡";
        }
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: str,
        });
      }
    },

    changeState(item) {
      this.studentId = item.studentId;
    },

    changeOutlines(e) {
      this.searchForm.outlineId = e;
      
      this.attendOutlineDetail();
    },

    keyInput: Debounce(function (e) {
      this.searchForm.key = e;

      this.attendOutlineDetail();
    }, 600),

    changeSort() {
      if (this.searchForm.arrangeType == 1) {
        this.searchForm.arrangeType = 2;
      } else {
        this.searchForm.arrangeType = 1;
      }
      this.attendOutlineDetail();
    },
  },
};
</script>
<style lang="scss" scoped>
#agreement {
  position: relative;
  float: left;
  margin-left: 50%;
  max-width: 750px;
  width: 100%;
  transform: translateX(-50%);
  background-size: cover;
  padding: 0;
  z-index: 770;
  background: #fff;

  .header {
    width: 100%;
    position: relative;
    float: left;

    .title {
      padding: 0 22px;
      position: relative;
      float: left;
      width: 100%;
      background: #fff;

      .name {
        position: relative;
        float: left;
        width: 100%;
        line-height: 38px;
        height: 38px;
        font-size: 18px;
        font-weight: 550;
        color: #222222;
        margin-top: 14px;
      }

      .time {
        height: 13px;
        line-height: 13px;
        font-size: 13px;
        position: relative;
        float: left;
        width: 100%;
        color: #222222;
        margin-bottom: 11px;
      }

      /deep/ .ivu-dropdown {
        top: 50%;
        transform: translateY(-50%);
        right: 12px;
        position: absolute;
        z-index: 7;

        li {
          color: #6f6f6f;
        }

        li.active {
          color: #006bff;
        }

        .ivu-select-dropdown {
          max-height: 200px;
          overflow-y: auto;
        }

        .num {
          display: inline-block;
          color: #222222;
          font-size: 16px;
          height: 16px;

          span {
            color: #006bff;
          }
        }
      }
    }

    .triangle {
      width: 0px;
      height: 0px;
      border-width: 30px 50px;
      border-color: #fff transparent transparent;
      border-style: solid;
      display: inline-block;
      margin-left: 50%;
      transform: translateX(-50%);
      position: relative;
      float: left;
    }

    .triangle::after {
      content: "";
      width: 0;
      height: 0;
      border-width: 6px 8px;
      border-color: #e6e6e6 transparent transparent;
      border-style: solid;
      display: inline-block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -150%);
      position: absolute;
    }
  }

  .sort {
    height: 26px;
    width: 100%;
    position: relative;
    float: left;
    background: #f7f8fa;
    padding: 0 22px 0 22px;

    /deep/ .ivu-dropdown {
      height: 26px;
      width: 100%;
      position: relative;

      .label {
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        display: inline-block;
        color: #7a7a7a;
      }

      .ivu-icon-md-checkmark {
        color: #006bff;
        float: right;
      }
    }

    .sortIcon {
      width: 26px;
      height: 26px;
      position: absolute;
      right: 12px;
      z-index: 777;
      top: 0;

      img {
        width: 20px;
        height: 20px;
        position: relative;
        margin: 3px;
        display: block;
      }
    }
  }

  .search {
    width: 100%;
    position: relative;
    float: left;
    height: 40px;
    padding: 0 22px;
    margin-top: 16px;

    /deep/ .ivu-input-wrapper {
      height: 40px;
      position: relative;
      float: left;
      width: 100%;
      border: none;

      i {
        line-height: 40px !important;
        font-size: 23px;
        color: #cacaca;
        margin-left: 10px;
      }

      input {
        height: 40px;
        position: relative;
        float: left;
        width: 100%;
        border: none;
        background: #f7f8fa;
        border-radius: 45px;
        padding-left: 40px;
      }

      /deep/ .ivu-input-prefix {
        width: 40px;
      }
    }
  }

  .studentlist {
    width: 100%;
    position: relative;
    float: left;
    padding: 0 22px;

    .number {
      height: 44px;
      width: 100%;
      position: relative;
      float: left;
      display: flex;

      p {
        position: relative;
        float: left;
        display: inline-block;
        padding: 0 8px;
        height: 44px;
        line-height: 44px;
        font-size: 15px;
        color: #222222;
      }

      .all {
        flex: 1;
      }

      .attendance::after {
        width: 4px;
        height: 4px;
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #006bff;
        border-radius: 50%;
      }

      .attendance span {
        color: #006bff;
      }

      .absent::after {
        width: 4px;
        height: 4px;
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #fa4f74;
        border-radius: 50%;
      }

      .absent span {
        color: #fa4f74;
      }
    }

    .student {
      width: 100%;
      position: relative;
      float: left;
      overflow-y: auto;
      padding: 10px 0;

      .demo {
        width: 25%;
        position: relative;
        float: left;
        margin-bottom: 7px;

        /deep/ .ivu-select-dropdown {
          left: -25%;
          width: 150%;
        }

        /deep/ .ivu-dropdown-menu {
          min-width: auto;

          li {
            padding: 10px 2px;
            color: #3d3d3d;
            text-align: center;
          }

          li.active {
            color: #006bff;
          }
        }

        img {
          width: 70px;
          height: 70px;
          margin-left: 50%;
          transform: translateX(-50%);
          position: relative;
          float: left;
        }

        /deep/ .ivu-dropdown {
          height: 16px;
          border-radius: 25px;
          background: #f7faff;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 62px;
          z-index: 2;
          width: 50px;
        }

        .label {
          width: 50px;
          text-align: center;
          line-height: 16px;
          height: 16px;
          z-index: 2;
          font-size: 12px;
          display: block;
        }

        .label.attendance {
          color: #89bbff;
        }

        .label.absent {
          color: #fa4f74;
        }

        .name {
          width: 100%;
          position: relative;
          float: left;
          text-align: center;
          margin-top: 10px;
          font-size: 14px;
          height: 22px;
          line-height: 22px;
          color: #242424;
        }
      }

      .title {
        height: 28px;
        font-size: 15px;
        position: relative;
        float: left;
        width: 100%;
        padding: 0 16px;
        color: #a3a3a3;
        text-align: left;
        margin: 0;
      }

      .cont {
        position: relative;
        float: left;
        width: 100%;
        padding: 0 16px 0 80px;
        height: 70px;

        img {
          width: 50px;
          height: 50px;
          top: 10px;
          border-radius: 50%;
          object-fit: cover;
          left: 16px;
          position: absolute;
        }

        p {
          height: 70px;
          line-height: 70px;
          position: relative;
          width: 100%;
          float: left;
          font-size: 16px;
          color: #242424;
          flex-wrap: 550;
          text-align: left;
          margin: 0;
        }
      }

      /deep/ .sortDropdown{
        position: absolute;
        width: 90px;
        height: 21px;
        right: 2px;
        top: 35px;

        .label{
          width: 100%;
          text-align: center;
          display: block;
        }
        
        .ivu-dropdown-item{
          padding: 12px 16px;
          width: 90px;
          text-align: center;
          color: #3d3d3d;
        }

        .ivu-dropdown-item.active{
          color: #006bff;
        }
      }
    }

    ::-webkit-scrollbar {
      width: 0 !important;
    }
    ::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }
  }
}
</style>