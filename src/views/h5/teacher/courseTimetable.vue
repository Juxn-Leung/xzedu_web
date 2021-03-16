<template>
  <div id="agreement">
    <div class="header">
      <div class="title">
        <p class="name">你好,{{firstName}}老师</p>
        <p class="time">今天是{{today}} {{nowWeek}}</p>
        <p class="num">今日课程 <span style="font-size: 16px;display: inline-block;">{{courseCount}}节</span></p>
      </div>

      <div class="date">
        <Calendar
          v-show="datePanel==1"
          ref="calendar"
          :format="format"
          @choseDay="choseDay"
          @changeMonth="changeDate"
          :markDate="markDate"
          :agoDayHide="agoDayHide"
        ></Calendar>

        <div
          class="weekSlider"
          v-show="datePanel==2"
        >
          <weekSlider
            @dateClick="dateClickhandler"
            :showYear="true"
            :markDate="markDate"
            :defaultDate="default_date"
            activeTxtColor="rgba(255, 255, 255, 1)"
            activeBgColor="rgba(0, 107, 255, 1)"
          ></weekSlider>
        </div>

        <a
          class="triangle"
          @click="changeDatePanel"
        ></a>
      </div>
    </div>

    <div class="dateLable">
      <p>{{change_date(default_date)}}</p>
    </div>

    <div class="content">
      <div class="forenoon">
        <div
          class="cont"
          v-if="outlines.am.length!==0"
        >
          <div class="title">
            <p>上午</p>
          </div>
          <div class="list am">
            <template v-for="(item, index)  in outlines.am">
              <div class="demo">
                <p class="time">{{item.courseTime}}
                  <span v-if="item.progress==0" style="color:#C5C5C5;">(未开始)</span>
                  <span v-if="item.progress==1">(开课中)</span>
                  <span v-if="item.progress==2" style="color:#C5C5C5;">(已结课)</span>
                </p>
                <p class="name">{{item.courseName}}</p>
                <p class="num">第<span>{{item.outlineIndex}}</span>节课时</p>

                <p
                  v-if="item.progress==1"
                  class="btn"
                  style="background:#006BFF;"
                  @click="goDetail(item)"
                >立即点名</p>
                <p
                  v-else
                  class="btn"
                  style="border:1px solid #006BFF;color: #006BFF;"
                  @click="goDetail(item)"
                >班级详情</p>
              </div>
            </template>
          </div>
        </div>
        <div
          class="cont"
          v-if="outlines.pm.length!==0"
        >
          <div class="title">
            <p>下午</p>
          </div>
          <div class="list pm">
            <template v-for="(item, index)  in outlines.pm">
              <div class="demo">
                <p class="time">{{item.courseTime}}<span>({{item.progress==0?'未开始':item.progress==1?'开课中':'已结课'}})</span></p>
                <p class="name">{{item.courseName}}</p>
                <p class="num">第<span>{{item.outlineIndex}}</span>节课时</p>

                <p
                  v-if="item.progress==1"
                  class="btn"
                  style="background:#006BFF;"
                  @click="goDetail(item)"
                >立即点名</p>
                <p
                  v-else
                  class="btn"
                  style="border:1px solid #006BFF;color: #006BFF;"
                  @click="goDetail(item)"
                >班级详情</p>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="afternoon">

      </div>
    </div>

  </div>
</template>
<script>
import {
  attendGetInfo,
  attendCalendar,
  dayCourses,
  attendOutlines,
} from "@/api";
import { Debounce } from "../../../libs/util";
import weekSlider from "@/components/weekSlider/weekSlider.vue";
import Calendar from "vue-calendar-component";
export default {
  data() {
    return {
      default_date: "2020-12-05",
      format: "yyyy-MM-dd",
      agoDayHide: "",
      markDate: [],
      datePanel: 2,

      teacherMessage: {},

      outlines: {
        am: [],
        pm: [],
      },
      dataList: {},
      today: "",

      firstName: "",
      nowWeek: "",
      courseCount: "",
    };
  },

  watch: {
    default_date() {
      this.CalendarDay();
    },
  },

  components: {
    weekSlider,
    Calendar,
  },

  created() {
    this.attendGetInfo();
  },

  mounted() {
    this.getToday();
    this.getWeek();
    this.CalendarDay();
  },

  methods: {
    attendGetInfo() {
      if (
        sessionStorage.getItem("openid") &&
        sessionStorage.getItem("openid") != "undefined"
      ) {
        let openId = sessionStorage.getItem("openid");
        let obj = {
          openId,
        };
        attendGetInfo(obj).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.teacherMessage = res.result;
            this.attendCalendar(res.result.lecturerId);
            this.dayCourses(res.result.lecturerId, this.default_date);
          } else {
            this.$Message.error({
              top: 300,
              closable: true,
              duration: 3,
              content: res.message,
            });
          }
        });
      }
    },

    attendCalendar(lecturerId) {
      let obj = {
        lecturerId,
      };
      attendCalendar(obj).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.markDate = res.result;
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

    dayCourses: Debounce(function (lecturerId, dt) {
      let obj = {
        lecturerId,
        dt,
      };
      dayCourses(obj).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.outlines = res.result.courseList;

          this.firstName = res.result.firstName;
          if (this.courseCount === "") {
            this.courseCount = res.result.courseCount;
          }
        } else {
          this.$Message.error({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
        }
      });
    }, 400),

    // attendOutlines() {
    //   attendOutlines(obj).then((res) => {
    //     console.log(res);
    //     if (res.code == 200) {
    //       this.outlines = res.result;
    //     } else {
    //       this.$Message.error({
    //         top: 300,
    //         closable: true,
    //         duration: 3,
    //         content: res.message,
    //       });
    //     }
    //   });
    // },

    getToday() {
      var aData = new Date();
      this.default_date =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate();

      this.today =
        aData.getFullYear() +
        "年" +
        (aData.getMonth() + 1) +
        "月" +
        aData.getDate() + '日';
    },

    getWeek() {
      let myDate = new Date();
      let wk = myDate.getDay();
      let weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      let week = weeks[wk];
      this.nowWeek = week;
    },

    change_date(date){
      let index1 = date.indexOf("-");
      let str = date.substring(index1+1,date.length);
      let index2 = str.indexOf("-");
      let mm = str.substring(0,index2);
      let dd = str.substring(index2+1,date.length);

      return mm+'月'+dd+'日';
    },

    CalendarDay() {
      this.$refs.calendar.ChoseMonth(this.default_date);
    },

    choseDay(data) {
      //选中某天
      var reg = new RegExp("/", "g");
      data = data.replace(reg, "-");
      data = data.replace(/(?=\b\d\b)/g, "0");
      console.log(data);
      this.default_date = data;
      if (
        this.teacherMessage.lecturerId !== "" &&
        this.teacherMessage.lecturerId !== undefined
      ) {
        this.dayCourses(this.teacherMessage.lecturerId, data);
      }
    },

    changeDate(data) {
      console.log(data);
    },

    clickToday(data) {
      console.log(data); //跳到了本月
    },

    dateClickhandler(e) {
      this.default_date = e;
      if (
        this.teacherMessage.lecturerId !== "" &&
        this.teacherMessage.lecturerId !== undefined
      ) {
        this.dayCourses(this.teacherMessage.lecturerId, e);
      }
    },

    changeDatePanel() {
      if (this.datePanel == 1) {
        this.datePanel = 2;
      } else {
        this.datePanel = 1;
      }
    },

    goDetail(item){
      console.log(item);
      let outlineId = item.outlineId;
      let lecturerId = this.teacherMessage.lecturerId;
      this.$router.push({
        name: "h5-callNames",
        query:{
          outlineId,
          lecturerId
        }
      });
    }
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
  background: #f7f8fa;

  .header {
    width: 100%;
    position: relative;
    float: left;
    transition: all 0.3s;

    .title {
      height: 72px;
      padding: 0 22px;
      position: relative;
      float: left;
      width: 100%;
      background: #fff;

      .name {
        position: relative;
        float: left;
        width: 100%;
        line-height: 30px;
        height: 30px;
        font-size: 20px;
        font-weight: 550;
        color: #222222;
        margin-top: 14px;
      }

      .time {
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        position: relative;
        float: left;
        width: 100%;
        color: #222222;
      }

      .num {
        top: 30px;
        right: 20px;
        position: absolute;
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        color: #222222;

        span {
          color: #006bff;
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

  /deep/ .wh_content_all {
    background: #fff;
    border: none;
    border-radius: 4px;

    .wh_isToday {
      background: transparent;
      border-radius: 0;
    }

    li {
      color: #353535;
    }

    .wh_top_changge {
      border-bottom: 1px solid #e9e9e9;
    }

    .wh_top_changge li:nth-child(2) {
      order: -1;
      flex: 4.5;
      text-align: left;
      display: block;
      padding-left: 22px;
      font-size: 19px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    .wh_top_changge li {
      height: 38px;
      line-height: 38px;
    }

    .wh_top_changge .wh_jiantou1,
    .wh_top_changge .wh_jiantou2 {
      width: 10px;
      height: 10px;
    }

    .wh_jiantou1,
    .wh_jiantou2 {
      border-color: #333333;
    }

    .wh_top_tag {
      color: #8a8a8a;
    }

    .wh_content_item {
      width: 14.2857%;
    }

    .wh_item_date {
      color: #353535;
      width: 100%;
      margin: 0;
    }

    .wh_item_date:hover {
      background: transparent;
    }

    .wh_isMark.wh_chose_day,
    .wh_isMark.wh_isToday.wh_chose_day {
      background: rgb(0, 107, 255);
    }

    // .wh_isToday,
    .wh_chose_day,
    .wh_item_date:hover {
      background-size: 40px 40px;
      border-radius: 8px;
      color: #fff;
      background: rgb(0, 107, 255);
      width: 60%;
      height: 70%;
      position: relative;
      margin: 15% 20%;
      text-align: center;
    }

    .wh_isMark {
      background-size: 40px 40px;
      border-radius: 8px;
      background: transparent;
      width: 60%;
      height: 70%;
      position: relative;
      margin: 15% 20%;
      text-align: center;
    }

    .wh_isMark::after {
      background: rgb(0, 107, 255);
      width: 4px;
      height: 4px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -8px;
      content: "";
      border-radius: 50%;
    }

    .wh_want_dayhide {
      background: #f7f7f7;
    }

    .wh_want_dayhide:hover {
      background: transparent;
      cursor: default;
    }

    .wh_want_dayhide:hover {
      background: #f7f7f7;
      color: #d6d6d6;
    }

    .wh_want_dayhide:hover::after {
      display: none;
    }

    .wh_other_dayhide,
    .wh_want_dayhide {
      color: #d6d6d6;
    }
  }

  .weekSlider {
    position: relative;
    float: left;
    width: 100%;

    .wh_top_changge {
      border-bottom: 1px solid #e9e9e9;
      height: 38px;
      width: 100%;
      position: relative;
      float: left;
      background: #fff;
      display: flex;
      list-style: none;

      .null {
        flex: 4.5 !important;
      }

      li {
        height: 38px;
        line-height: 38px;
        justify-content: center;
        align-items: center;
        flex: 1;
        cursor: pointer;
        display: flex;

        .wh_jiantou1 {
          width: 10px;
          height: 10px;
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(-45deg);
          border-color: #333333;
        }

        .wh_jiantou2 {
          width: 10px;
          height: 10px;
          border-top: 2px solid #fff;
          border-right: 2px solid #fff;
          transform: rotate(45deg);
          border-color: #333333;
        }
      }
    }

    /deep/ .week-slider {
      background: #fff;
      position: relative;
      width: 100%;
      float: left;
      height: 68px;

      .sliders .slider .day div {
        background: #ebeefd;
        border-radius: 10px !important;
        height: 44px;
        color: #006bff;
      }
    }
  }

  .dateLable {
    height: 75px;
    width: 100%;
    position: relative;
    float: left;

    p {
      background: #fff;
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      display: inline-block;
      padding: 0 8px 0 22px;
      position: relative;
      color: #222222;
    }
  }

  .content {
    position: relative;
    width: 100%;
    float: left;

    .cont {
      position: relative;
      width: 100%;
      float: left;
      padding-left: 82px;
      min-height: 140px;

      .no {
        position: absolute;
        left: 50%;
        top: 50px;
        transform: translate(-50%, -50%);
        display: block;
      }

      .title {
        position: absolute;
        left: 0;
        top: 0;
        width: 82px;
        height: 100%;
        border-right: 1px solid #e5e5e5;

        p {
          position: relative;
          width: 100%;
          padding-left: 30px;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          color: #2b2b2b;
          font-weight: 550;
        }
      }

      .list {
        position: relative;
        width: 100%;
        float: left;
        padding: 0 18px;

        .demo {
          position: relative;
          width: 100%;
          float: left;
          margin-bottom: 12px;
          background: #fff;
          border-radius: 10px;
          padding: 0 10px;

          p {
            position: relative;
            width: 100%;
            float: left;
            padding: 0 4px;
          }

          .time {
            height: 37px;
            line-height: 37px;
            font-size: 12px;
            font-weight: 550;
            color: #2b2b2b;
            border-bottom: 1px solid #f1f1f1;
          }

          .name {
            line-height: 16px;
            font-size: 14px;
            font-weight: 550;
            color: #2b2b2b;
            margin: 8px 0;
          }

          .num {
            height: 26px;
            line-height: 26px;
            font-size: 14px;
            font-weight: 550;
            color: #2b2b2b;
          }

          .btn {
            width: 64px;
            border-radius: 30px;
            display: inline-block;
            float: right;
            text-align: center;
            color: #fff;
            height: 22px;
            line-height: 22px;
            font-size: 12px;
            margin-bottom: 12px;
          }
        }

        .demo::before {
          width: 17px;
          height: 17px;
          background: #fff;
          content: "";
          position: absolute;
          left: -27px;
          top: 12px;
          border-radius: 50%;
        }

        .demo::after {
          width: 13px;
          height: 13px;
          background: #ff4b67;
          content: "";
          position: absolute;
          left: -25px;
          top: 14px;
          border-radius: 50%;
          opacity: 0.9;
        }
      }

      .am.list:nth-child(1)::after{
        background: #ff4b67;
        opacity: 1;
      }

      .pm.list::after{
        background: #006BFF;
      }

      .pm.list:nth-child(1)::after{
        opacity: 1;
      }

    }
  }
}
</style>