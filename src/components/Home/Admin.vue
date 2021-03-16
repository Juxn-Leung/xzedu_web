<template>
  <Row>
    <Col span="8">
      <div class="home_first">
        <div class="home_first_icon">
          <img :src="organization" />
        </div>
        <div class="organization" @click="organ">
          <div class="organization_title">机构总数</div>
          <div class="organization_number">{{ OrgCount }}</div>
        </div>
      </div>
    </Col>
    <Col span="8">
      <div class="home_first">
        <div class="home_first_icon">
          <img :src="teacher" />
        </div>
        <div class="organization" @click="teachergan">
          <div class="organization_title">老师总数</div>
          <div class="organization_number">{{ TeacherCount }}</div>
        </div>
      </div>
    </Col>
    <Col span="8">
      <div class="home_first">
        <div class="home_first_icon">
          <img :src="student" />
        </div>
        <div class="organization">
          <div class="organization_title">学生总数</div>
          <div class="organization_number">{{ StuCount }}</div>
        </div>
      </div>
    </Col>

    <Col span="8">
      <div class="home_second">
        <div class="home_area">
          <div class="home_text">{{ text }}</div>

          <Cascader
            change-on-select
            @on-visible-change="clickAreaSearch"
            ref="cascader"
            :data="addressDataSearch"
            :value="areaId"
            @on-change="changeAreaSearch"
            :load-data="loadDataSearch"
            transfer
          >
            <a href="javascript:void(0)"
              ><Icon size="30" style="color: #373737" type="md-arrow-dropdown"
            /></a>
          </Cascader>
        </div>
        <div class="home_first_second" style="margin-top: 0px">
          <div class="home_first_icon_second">
            <img :src="orgs" />
          </div>
          <div class="organization_second">
            <div class="organization_title">机构数量</div>
            <div class="organization_number_second">{{ OrgCount1 }}</div>
          </div>
        </div>
      </div>
    </Col>
    <Col span="8">
      <div class="home_second1">
        <div class="home_first_second">
          <div class="home_first_icon_second">
            <img :src="teacher2" />
          </div>
          <div class="organization_second">
            <div class="organization_title">老师数量</div>
            <div class="organization_number_second">{{ TeacherCount1 }}</div>
          </div>
        </div>
      </div>
    </Col>
    <Col span="8">
      <div class="home_second2">
        <div class="home_first_second" style="border: 0px">
          <div class="home_first_icon_second">
            <img :src="student2" />
          </div>
          <div class="organization_second">
            <div class="organization_title">学生数量</div>
            <div class="organization_number_second">{{ StuCount1 }}</div>
          </div>
        </div>
      </div>
    </Col>

    <Col span="24">
      <div class="home_thirst">
        <div class="home_title">
          <div class="title">
            <span>订单统计</span>
          </div>
          <div class="number_users">
            <a class="number_users_a">{{ title_biti }}</a>
            <span>{{ chartData.allCountStu }}</span>
          </div>

          <div class="number_users2">
            <a class="number_users_a2">{{ title_biti2 }}</a>
            <span>¥{{ chartData.allCountPay }}</span>
          </div>

          <div class="month_title">
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
        </div>
        <div class="home_line">
          <ve-line
            :extend="chartExtend"
            :legend-visible="false"
            :data="chartData"
            :settings="chartSettings"
            height="360px"
          ></ve-line>
        </div>
      </div>
    </Col>
  </Row>
</template>


<script>
import { formatDate } from "../../utils/time.js";
import { mapState } from "vuex";
import { getAddresslist, detail, basic, statistics } from "@/api";
import { Debounce } from "../../libs/util";
import { dateFormat } from "@/utils/current";
export default {
  data() {
    this.chartSettings = {
      metrics: ["allCount"],
      dimension: ["clickDate"],
      yAxisName: ["/元"],

      labelMap: {
        allCount: "当时刻总金额",
      },
    };

    return {
      tabs: ["日", "周", "月"],
      num: 1,
      areaId2: [],
      areaId: [],
      addressDataSearch: [],
      isEdit: "add",
      addressData: [],
      searchForm: {},
      text: "未选择",
      OrgCount: "",
      StuCount: "",
      TeacherCount: "",
      OrgCount1: "",
      StuCount1: "",
      TeacherCount1: "",
      type: "",
       title_biti: "",
      title_biti2: "",
      imgUrl: require("@/assets/welcome.png"),
      organization: require("@/assets/home/organization.png"),
      orgs: require("@/assets/home/orgs.png"),
      teacher: require("@/assets/home/teacher.png"),
      teacher2: require("@/assets/home/teacher2.png"),
      student: require("@/assets/home/student.png"),
      student2: require("@/assets/home/student2.png"),
      chartData: {
        allCountPay: "",
        allCountStu: "",
        rows: [],
      },

      chartExtend: {
        series: {
          // 是否显示折线提示点
          showSymbol: true,
          // 折线颜色
          color: "#417EF4",

          symbolSize: 9,
          itemStyle: {
            normal: {
              // 折线隐藏方式
              lineStyle: {
                width: 5,
              },
            },
          },

          splitLine: {
            lineStyle: {
              type: "dashed", // 轴线变成虚线
              color: "#ccc",
            },
          },
        },
        // x轴设置项
        xAxis: {
          // 去掉负数出现小标下标线错位问题
          onZero: false,
          axisTick: {
            inside: true, // 刻度消除
          },

          // 设置轴线文本样式
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#999DAF",
              fontSize: 14,
            },
          },
          // 轴线样式
          axisLine: {
            show: true,
            lineStyle: {
              width: 0, // 隐藏线条
              color: "#4682E5",
            },
          },
          // 图表数据渲染线样式
          splitLine: {
            lineStyle: {
              width: 8,
              color: "#4682E5",
            },
          },
          // 鼠标移动显示
          tooltip: {
            // 提示位置
            position: ["20%", 5],
            formatter: (res) => {
              this.$console.log(res);
              return res;
            },
          },
        },

        yAxis: {
          // 基本和xAxis中的配置一样
          axisLabel: {
            textStyle: {
              color: "#999DAF",
              fontSize: 14,
            },
          },
        },
      },
    };
  },

  created() {
    this.getUserInfo();
    this.basic();
    this.detail();
    this.searchForm.findTime = "week";
     this.title_biti = "本周用户总数";
    this.title_biti2 = "本周订单总额";
    this.statistics();
  },
  methods: {
    getUserInfo() {
      let userMessage = JSON.parse(sessionStorage.getItem("userInfo"));
      console.log(userMessage);
      let addId_list = [];
      let type = userMessage.type;
      this.type = userMessage.type;
      
      console.log(addId_list);
      let s_id;
      let z_id;
      let q_id;
      if (type == "TOWNPRINCIPAL") {
        addId_list = userMessage.areaId.split(",");
        // 区级/镇级教育局
        let id0 = addId_list[0];
        let id1 = addId_list[1];
        let id2 = addId_list[2];
        s_id = parseInt(id0);
        z_id = parseInt(id1);
        q_id = parseInt(id2);
        this.institution = 1;
        this.showAddInput = 0;
        this.getAddresslist();
      } else if (type == "EDUCATIONPRINCIPAL") {
        // 市级教育局
         addId_list = userMessage.areaId.split(",");
        let id0 = addId_list[0];
        let id1 = addId_list[1];
        s_id = parseInt(id0);
        z_id = parseInt(id1);
        q_id = 0;

        this.areaId2.push(s_id);
        this.areaId2.push(z_id);
        this.areaId2.push(q_id);

        console.log(this.areaId2);
        this.shictro = 1;
        this.showAddInput = 1;
        this.getTownshipList(s_id, z_id);
      } else if (type == "INNER") {
        // admin
        console.log("超级");
 addId_list = userMessage.areaId.split(",");
        this.getAddresslist();

        s_id = 1964;
        z_id = 0;
        q_id = 0;
        this.areaId.push(s_id);
        console.log(this.areaId);
        this.searchForm.provinceId = this.areaId;
        this.text = "广东省";
        this.admintest = 1;
      } else if (type == "ORGPRINCIPAL" || type == "TRUSTEESHIPORGPRINCIPAL") {
        let id0 = addId_list[0];
        let id1 = addId_list[1];
        let id2 = addId_list[2];
        s_id = parseInt(id0);
        z_id = parseInt(id1);
        // q_id = parseInt(id2);
        q_id = 0;
        this.cvimg = 1;
        this.getAddresslist(); //地址接口
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
      this.organizationType = type;
      console.log(this.showAddInput);
    },

    basic() {
      if (this.type == "INNER") {
        basic().then((res) => {
          console.log(res);
          this.OrgCount = res.result.OrgCount;
          this.StuCount = res.result.StuCount;
          this.TeacherCount = res.result.TeacherCount;
        });
      }
    },

    detail() {
      if (this.type == "INNER") {
        detail(this.searchForm).then((res) => {
          console.log(res);
          this.OrgCount1 = res.result.OrgCount;
          this.StuCount1 = res.result.StuCount;
          this.TeacherCount1 = res.result.TeacherCount;
        });
      }
    },
    statistics() {
      if (this.type == "INNER") {
        statistics(this.searchForm).then((res) => {
          this.chartData = res.result;
          console.log(this.chartData);
        });
      }
    },
    table(index) {
      this.num = index;
      console.log(this.num);
      if (this.num == 0) {
        this.searchForm.findTime = "day";
          this.title_biti = "本日用户总数";
        this.title_biti2 = "本日订单总额";
      } else if (this.num == 1) {
        this.searchForm.findTime = "week";
          this.title_biti = "本周用户总数";
        this.title_biti2 = "本周订单总额";
      } else {
        this.searchForm.findTime = "month";
         this.title_biti = "本月用户总数";
        this.title_biti2 = "本月订单总额";
      }
      this.statistics();
    },
    organ() {
      this.$router.push({
        name: "orgManage",
        // query: {
        //   id: id,
        // },
      });
    },
    teachergan() {
      this.$router.push({
        name: "teacherManage",
        // query: {
        //   id: id,
        // },
      });
    },

    clickAreaSearch(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        let s_id = this.data.s_id;
        // let z_id = this.data.z_id;
        this.getTownshipList(s_id);
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
      console.log(areaId);
      this.area = area;
      this.areaId = areaId;

      if (areaId.length == 2) {
        this.searchForm.provinceId = areaId[0];
        this.searchForm.cityId = areaId[1];
      } else {
        this.searchForm.provinceId = areaId[0];
        this.searchForm.cityId = "";
      }
      this.text = item.map((o) => o.label).join("/");

      this.detail();
      this.statistics();
    },
    loadDataSearch(item, callback) {
      item.loading = true;
      getAddresslist({
        pid: item.id,
      }).then((res) => {
        if (res.code == 200) {
          item.loading = false;
          item.children = res.result;
          if (item.level < 1) {
            item.children.forEach((it) => {
              it.loading = false;
              it.children = [];
            });
          }
          callback();
        }
      });
    },
    changeCascader(v, item) {
      // console.log(e);
      let area = [];
      item.map((val) => {
        area.push(val.label);
      });
      let areaId = [];
      v.map((val) => {
        areaId.push(val * 1);
      });
      console.log(areaId);
      this.area = area;
      this.areaId = areaId;

      // this.searchForm.provinceId = e[0];
      // this.searchForm.cityId = e[1];
      // this.searchForm.areaId = e[2];
    },
    getTownshipList(s_id) {
      let level = 1;
      let addressData = {};
      getAddresslist({
        level: level,
      }).then((res) => {
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
      });
    },

    // 获取省份
    getAddresslist(id, i, arr) {
      if (this.isEdit == "add") {
        getAddresslist({
          level: 1,
        }).then((res) => {
          this.addressData = res.result;
          console.log(this.addressData);
          this.addressDataSearch = res.result;
          this.addressData.forEach((item) => {
            item.children = [];
            item.loading = false;
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home_first {
  float: left;
  width: 90%;
  margin-left: 5%;
  height: 150px;
  background: #f0f2f7;
  border-radius: 27px;
}

.home_area {
  float: left;
  width: 80%;
  height: 40px;
  margin-left: 5%;
  margin-top: 10px;
  text-align: left;
}
.home_text {
  float: left;
  font-size: 20px;
  color: #373737;
  font-weight: bold;
  position: relative;
  letter-spacing: 4px;
}
.home_text::before {
  bottom: -8px;
  width: 27px;
  height: 5px;
  border-radius: 30px;
  background: #9fbffe;
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.home_second {
  float: left;
  width: 95%;
  margin-left: 5%;
  height: 150px;
  background: #f0f2f7;
  margin-top: 20px;
  border-radius: 27px 0px 0px 27px;
}
.home_second1 {
  float: left;
  width: 100%;
  height: 150px;
  margin-top: 20px;
  background: #f0f2f7;
}
.home_first_second {
  float: left;
  width: 90%;
  margin-left: 5%;
  height: 70px;
  margin-top: 55px;
  border-right: 3px solid #e5e7ed;
  background: #f0f2f7;
}
.home_thirst {
  float: left;
  width: 97%;
  margin-left: 1.5%;
  height: 380px;
  margin-top: 20px;
  background: #f0f2f7;
  border-radius: 27px;
}
.home_second2 {
  float: left;
  width: 95%;
  margin-right: 5%;
  height: 150px;
  margin-top: 20px;
  background: #f0f2f7;
  border-radius: 0px 27px 27px 0px;
}

.home_first_icon {
  float: left;
  margin: 25px;
  width: 100px;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 3px 15px 0px rgba(238, 238, 238, 0.41);
  border-radius: 30px;
  text-align: center;
}
.home_first_icon img {
  margin-top: 17.5px;
}
.organization {
  float: left;
  margin-top: 50px;
  font-size: 16px;
  margin-left: 5%;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #787d94;
  cursor: pointer;
}
.organization_number {
  float: left;
  margin-top: 5px;
  font-size: 21px;
  font-family: STXihei;
  font-weight: bold;
  color: #111111;
}

.home_first_icon_second {
  float: left;
  margin: 10px 25px 25px 20%;
  width: 50px;
  height: 52px;
  background: #ffffff;
  box-shadow: 0px 3px 15px 0px rgba(238, 238, 238, 0.41);
  border-radius: 30px;
  text-align: center;
}

.home_first_icon_second img {
  border-radius: 30px;
  width: 50px;
  height: 52px;
}

.organization_second {
  float: left;
  margin-top: 10px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #787d94;
  cursor: pointer;
}
.organization_number_second {
  float: left;
  margin-top: 5px;
  font-size: 21px;
  font-family: STXihei;
  font-weight: bold;
  color: #111111;
}

.home_title {
  float: left;
  width: 95%;
  margin-left: 2.5%;
  height: 40px;
}
.home_line {
  float: left;
  height: 320px;
  width: 100%;
}

.title {
  color: #373737;
  font-weight: 600;
  font-size: 20px;
  font-weight: bold;
  line-height: 50px;
  margin-left: 5px;
  position: relative;
  width: 80px;
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
.number_users {
  float: left;
  margin-left: 100px;
  height: 40px;
  width: 150px;
  margin-top: -40px;
  text-align: center;
}
.number_users_a {
  float: left;
  width: 100%;
  color: #787d94;
  font-weight: bold;
}
.number_users_a2 {
  float: left;
  width: 100%;
  color: #787d94;
  font-weight: bold;
}
.number_users2 {
  float: left;
  margin-left: 250px;
  height: 40px;
  width: 150px;
  margin-top: -40px;
  text-align: center;
}
.number_users span {
  color: #111111;
  font-size: 18px;
  font-weight: bold;
}

.number_users2 span {
  color: #111111;
  font-size: 18px;
  font-weight: bold;
}

.month_title {
  float: right;
  width: 200px;
  height: 50px;
  margin-top: -40px;
}

.first_ul ul {
  width: 100%;
  display: flex;
  height: 50px;
}
.first_ul ul li {
  width: 120px;
  height: 30px;
  margin-top: 5px;
  border-radius: 5px;
  background: #c0d5fe;
  display: inline-flex;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: 550;
  color: #ffffff;
}
.first_ul ul li.active {
  background: #4581f5;
  color: #ffffff;
  font-weight: 550;
  font-size: 15px;
}

/deep/ .ivu-cascader {
  line-height: normal;
  float: left;
}
</style>