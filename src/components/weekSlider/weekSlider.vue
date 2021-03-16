<template>
  <div>
    <div class="header">
      <div class="year_str">{{yearMonthStr}}</div>

      <div
        class="last_btn"
        @click="lastMonth"
      >
        <div></div>
      </div>
      <div
        class="next_btn"
        @click="nextMonth"
      >
        <div></div>
      </div>

    </div>
    <div class="week-slider">
      <div
        class="sliders"
        ref="sliders"
        @touchstart="touchstartHandle"
        @touchmove="touchmoveHandle"
        @touchend="touchendHandle"
      >
        <template v-for="(item, index) in dates">
          <div
            class="slider"
            :style="getTransform(index)"
            @webkit-transition-end="onTransitionEnd(index)"
            @transitionend="onTransitionEnd(index)"
          >
            <div
              class="day"
              v-for="day in getDaies(item.date)"
            >
              <div
                @click.stop="dayClickHandle(day.date)"
                :class="markDateClss(day.date)"
                :style="buildDateStyle(activeDay, day.date)"
              >
                {{day.week}}<br><strong>{{day.date.split('-')[2]}}</strong>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "weekSlider",
  props: {
    defaultDate: {
      type: String,
      default: moment().format("YYYY-MM-DD"),
    },
    markDate:{
      type:Array,
      default: false,
    },
    showYear: {
      type: Boolean,
      default: false,
    },
    activeBgColor: {
      type: String,
      default: "rgba(182, 30, 40, 1)",
    },
    todayBgColor: {
      type: String,
    },
    activeTxtColor: {
      type: String,
      default: "rgba(255, 255, 255, 1)",
    },
    todayTxtColor: {
      type: String,
    },
    lang: {
      type: String,
      default: "ch",
    },
  },
  data() {
    return {
      dates: [],
      direction: null,
      activeIndex: 1,
      isAnimation: false,
      yearMonthStr: "",
      start: {
        x: null,
        y: null,
      },
      end: {
        x: null,
        y: null,
      },
      distan: {
        x: 0,
        y: 0,
      },
      sliderWidth: 0,
      weekLanguages: {
        ch: ["日", "一", "二", "三", "四", "五", "六"],
        en: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
      },

      activeDay: "",
    };
  },
  watch: {
    defaultDate: {
      handler: function (newVal, oldVal) {
        this.setDay();
      },
      deep: true,
    },

    dates: {
      handler: function (newVal, oldVal) {
        this.yearMonthStr = moment(newVal[1].date).format("YYYY[年]MM[月]");
      },
      deep: true,
    },
  },
  computed: {
    todayStyle: function () {
      let vm = this;
      return {
        color: vm.todayTxtColor ? vm.todayTxtColor : "",
      };
    },
  },
  mounted() {
    // this.setDay();

    this.sliderWidth = this.$refs.sliders.offsetWidth;
  },
  created() {},
  methods: {
    /**
     *获取制定日期的当前周的日期数据
     */

    setDay() {
      let vm = this;
      let list = [];
      list.push(
        {
          date: moment(vm.defaultDate).subtract(7, "d").format("YYYY-MM-DD"),
        },
        {
          date: vm.defaultDate,
        },
        {
          date: moment(vm.defaultDate).add(7, "d").format("YYYY-MM-DD"),
        }
      );
      this.dates = list;
      vm.activeDay = moment(vm.defaultDate).format("YYYY-MM-DD");
    },

    getDaies(date) {
      let vm = this,
        arr = [];
      let weekOfDate = Number(moment(date).format("E"));
      let weeks = vm.weekLanguages[vm.lang];
      let today = moment();
      let defaultDay = moment(vm.defaultDate);
      if (weekOfDate === 7) {
        weekOfDate = 0;
      }
      for (var i = 0; i < 7; i++) {
        let _theDate = moment(date).subtract(weekOfDate - i, "d");
        arr.push({
          date: _theDate.format("YYYY-MM-DD"),
          week: weeks[i],
          isToday: _theDate.format("YYYY-MM-DD") === today.format("YYYY-MM-DD"),
          isDay: _theDate.format("E") === defaultDay.format("E"),
        });
      }
      return arr;
    },

    /**
     *根据索引计算出样式
     */
    getTransform(index) {
      let vm = this;
      let style = {};
      if (index === vm.activeIndex) {
        style["transform"] = "translateX(" + vm.distan.x + "px)";
      }
      if (index < vm.activeIndex) {
        style["transform"] = "translateX(-100%)";
      }
      if (index > vm.activeIndex) {
        style["transform"] = "translateX(100%)";
      }
      style["transition"] = vm.isAnimation ? "transform .5s ease-out" : "none";
      return style;
    },

    /**
     * touchstart handle
     */
    touchstartHandle(event) {
      let vm = this,
        touch = event.touches[0];
      vm.start.x = touch.pageX;
      vm.start.y = touch.pageY;
    },

    /**
     * touchmove handle
     */
    touchmoveHandle(event) {
      let vm = this,
        touch = event.touches[0];
      vm.isAnimation = true;
      vm.end.x = touch.pageX;
      vm.end.y = touch.pageY;
      vm.distan.x = vm.end.x - vm.start.x;
      vm.distan.y = vm.end.y - vm.start.y;

      let dom =
        vm.distan.x < 0
          ? this.$refs.sliders.children[2]
          : this.$refs.sliders.children[0];
      if (vm.distan.x < 0) {
        dom.style["transform"] =
          "translateX(" + (vm.sliderWidth + vm.distan.x) + "px)";
      } else {
        dom.style["transform"] =
          "translateX(" + (-vm.sliderWidth + vm.distan.x) + "px)";
      }
    },

    lastMonth() {
      let event = {
        touches: [
          {
            pageX: 100,
            pageY: 0,
          },
        ],
        changedTouches: [
          {
            pageX: 300,
            pageY: 0,
          },
        ],
      };
      this.touchstartHandle(event);
      this.touchmoveHandle(event);
      this.touchendHandle(event);
    },

    nextMonth() {
      let event = {
        touches: [
          {
            pageX: -100,
            pageY: 0,
          },
        ],
        changedTouches: [
          {
            pageX: -300,
            pageY: 0,
          },
        ],
      };
      this.touchstartHandle(event);
      this.touchmoveHandle(event);
      this.touchendHandle(event);
    },

    /**
     * touchend handle
     */
    touchendHandle(event) {
      let vm = this,
        touch = event.changedTouches[0];
      vm.isAnimation = true;
      vm.end.x = touch.pageX;
      vm.end.y = touch.pageY;
      vm.distan.x = vm.end.x - vm.start.x;
      vm.distan.y = vm.end.y - vm.start.y;

      vm.getTouchDirection(vm.distan.x, vm.distan.y);
      if (vm.direction === "left") {
        vm.activeIndex = 2;
      } else if (vm.direction === "right") {
        vm.activeIndex = 0;
      } else {
        for (var i = 0; i < this.$refs.sliders.children.length; i++) {
          this.$refs.sliders.children[i].style["transform"] =
            "translateX(" + (i * 100 - 100) + "%)";
        }
      }
      vm.distan.x = 0;
      vm.distan.y = 0;
      vm.direction = null;
    },

    onTransitionEnd(index) {
      let vm = this;
      vm.isAnimation = false;
      if (index === 1 && this.activeIndex === 2) {
        vm.dates.push({
          date: moment(vm.dates[vm.activeIndex].date)
            .add(7, "d")
            .format("YYYY-MM-DD"),
        });
        vm.dates.shift();
        vm.activeIndex = 1;
      } else if (index === 1 && this.activeIndex === 0) {
        vm.dates.unshift({
          date: moment(vm.dates[vm.activeIndex].date)
            .subtract(7, "d")
            .format("YYYY-MM-DD"),
        });
        vm.dates.pop();
        vm.activeIndex = 1;
      }
    },

    /**
     * getAngle 计算角度
     */
    getAngle(x, y) {
      return (Math.atan2(y, x) * 180) / Math.PI;
    },

    /**
     * getTouchDirection 获取滑动方向
     */
    getTouchDirection(x, y) {
      let vm = this;
      if (Math.abs(x) > 20) {
        let angle = vm.getAngle(x, y);
        if (angle >= -45 && angle <= 45) {
          //向右
          vm.direction = "right";
        } else if (
          (angle >= 135 && angle <= 180) ||
          (angle >= -180 && angle < -135)
        ) {
          //向左
          vm.direction = "left";
        }
      }
    },

    dayClickHandle(date) {
      this.activeDay = date;
      this.$emit("dateClick", date);
      // this.$emit("update:defaultDate", date);
    },

    /**
     *生成日期样式
     */

    markDateClss(isToday){
      let vm = this;
      let res = '';
      let list = vm.markDate;
      for(var i in list){
        if(list[i]==isToday){
          res = 'mark_date'
          return res
        }
      }

      return res;
    },

    buildDateStyle(isActive, isToday) {
      let vm = this;
      let res = {};
      if (isActive == isToday) {
        res.color = vm.activeTxtColor || "";
        res.backgroundColor = vm.activeBgColor || "";
      }
      return res;
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #e9e9e9;
  height: 38px;
  width: 100%;
  position: relative;
  float: left;
  background: #fff;
  display: flex;
  list-style: none;
}
.year_str {
  height: 38px;
  line-height: 38px;
  flex: 4.5;
  font-size: 19px;
  color: #353535;
  display: flex;
  text-align: left;
  display: block;
  padding-left: 22px;
  justify-content: center;
  align-items: center;
  flex-wrap: 550;
}
.last_btn {
  height: 38px;
  line-height: 38px;
  justify-content: center;
  align-items: center;
  flex: 1;
  cursor: pointer;
  display: flex;

  div {
    width: 10px;
    height: 10px;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    transform: rotate(-45deg);
    border-color: #333333;
  }
}
.next_btn {
  height: 38px;
  line-height: 38px;
  justify-content: center;
  align-items: center;
  flex: 1;
  cursor: pointer;
  display: flex;

  div {
    width: 10px;
    height: 10px;
    border-top: 2px solid #fff;
    border-right: 2px solid #fff;
    transform: rotate(45deg);
    border-color: #333333;
  }
}
.week-slider {
  width: 100%;
  height: 48px;
  overflow: hidden;
  padding: 10px 0;
  .sliders {
    position: relative;
    .slider {
      height: 48px;
      width: 100%;
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      // overflow: hidden;
      .day {
        flex: 1;
        div {
          height: 36px;
          width: 48px;
          padding: 6px 0;
          margin: auto;
          text-align: center;
          line-height: 18px;
          font-size: 12px;
          border-radius: 50%;
          &.sameDay {
            background-color: #999;
            color: #fff;
          }
          strong {
            font-size: 14px;
          }
        }
      }
    }
  }
}

.mark_date{
  position: relative;
}

.mark_date::after{
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
</style>
