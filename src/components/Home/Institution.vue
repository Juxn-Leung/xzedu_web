<template>
  <Row>
    <Col span="6">
      <div class="home_first">
        <div class="home_first_icon">
          <img :src="organization" />
        </div>
        <div class="organization1" @click="organ">
          <div class="organization_title">我的机构</div>
          <div class="organization_number">{{ allType }}</div>
        </div>
        <div class="organization2" @click="organ">
          <div class="organization_title">待审核</div>
          <div class="organization2_number">{{ checking }}</div>
        </div>
        <div class="organization2" @click="organ">
          <div class="organization_title">未通过</div>
          <div class="organization3_number">{{ failed }}</div>
        </div>
      </div>
    </Col>
    <Col span="6">
      <div class="home_first">
        <div class="home_first_icon">
          <img :src="teacher" />
        </div>
        <div class="organization">
          <div class="organization_title">订单总金额</div>
          <div class="organization_number">{{ allOrder }}</div>
        </div>
      </div>
    </Col>

    <Col span="6">
      <div class="home_first">
        <div class="home_first_icon">
          <img :src="number" />
        </div>
        <div class="organization">
          <div class="organization_title">累计访问量</div>
          <div class="organization_number">{{ allVisit }}</div>
        </div>
      </div>
    </Col>

    <Col span="6">
      <div class="home_first">
        <div class="home_first_icon">
          <img :src="student" />
        </div>
        <div class="organization">
          <div class="organization_title">学生数量</div>
          <div class="organization_number">{{ allStu }}</div>
        </div>
      </div>
    </Col>

    <Col span="8">
      <div class="home_second">
        <div class="home_area">
          <div class="title">
            <span>今日统计</span>
          </div>
        </div>
        <div class="home_first_second" style="margin-top: 0px">
          <div class="home_first_icon_second">
            <img :src="dingdan" />
          </div>
          <div class="organization_second">
            <div class="organization_title">今日订单总额</div>
            <div class="organization_number_second">{{ orderMoneyCount }}</div>
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
            <div class="organization_title">今日订单数量</div>
            <div class="organization_number_second">{{ orderNumCount }}</div>
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
            <div class="organization_title">今日商城访问量</div>
            <div class="organization_number_second">{{ visitCount }}</div>
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
import {
  getAddresslist,
  orguserbasic,
  orguserdetail,
  orguserstatistics,
  getPageList,
} from "@/api";
import { Debounce } from "../../libs/util";
export default {
  data() {
    this.chartSettings = {
      metrics: ["allCount"],
      dimension: ["clickDate"],
      yAxisName: ["/元"],

      labelMap: {
        allCount: "当日总金额",
        countNum: "当日访问量",
      },
    };

    return {
      tabs: ["日", "周", "月"],
      searchForm: {},
      num: 1,
      type: "",
      cvimg: "",
      allType: "",
      checking: "",
      failed: "",
      allOrder: "",
      allVisit: "",
      allStu: "",
      orderMoneyCount: "",
      orderNumCount: "",
      visitCount: "",
      title_biti: "",
      title_biti2: "",
      imgUrl: require("@/assets/welcome.png"),
      organization: require("@/assets/home/organization.png"),
      orgs: require("@/assets/home/orgs.png"),
      dingdan: require("@/assets/home/er.png"),
      number: require("@/assets/home/nu.png"),
      teacher: require("@/assets/home/sh.png"),
      teacher2: require("@/assets/home/teacher2.png"),
      student: require("@/assets/home/st.png"),
      student2: require("@/assets/home/student2.png"),
      searchForm2: {
        pageNumber: 1,
        pageSize: 10,
        // type: "",
      },
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
            trigger: "axis",
            position: ["20%", 5],

            formatter: (params) => {},
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
    this.getPageList();
    this.orguserbasic();
    this.orguserdetail();
    this.searchForm.findTime = "week";
    this.title_biti = "本周用户总数";
    this.title_biti2 = "本周订单总额";
    this.orguserstatistics();
  },

  methods: {
    getUserInfo() {
      let userMessage = JSON.parse(sessionStorage.getItem("userInfo"));
      console.log(userMessage);
      let addId_list = [];
      let type = userMessage.type;
      this.type = userMessage.type;
      // addId_list = userMessage.areaId.split(",");
      console.log(addId_list);
      let s_id;
      let z_id;
      let q_id;
      if (type == "ORGPRINCIPAL" || type == "TRUSTEESHIPORGPRINCIPAL") {
        let id0 = addId_list[0];
        let id1 = addId_list[1];
        let id2 = addId_list[2];
        s_id = parseInt(id0);
        z_id = parseInt(id1);
        // q_id = parseInt(id2);
        q_id = 0;
        this.cvimg = 1;
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
    getPageList() {
      getPageList(this.searchForm2).then((res) => {
        console.log(res);
        if (res.code == 200) {
          res.result.content.forEach((item) => {
            if (item.createTime) {
              item.createTime = dateFormat(item.createTime);
            }
          });

          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.loading = false;
          if (this.data.length > 0) {
          } else {
            if (
              this.type == "ORGPRINCIPAL" ||
              this.type == "TRUSTEESHIPORGPRINCIPAL"
            ) {
              this.$router.push({
                name: "orgManage",
              });
            }
          }
        }
      });
    },
    orguserbasic() {
      if (this.cvimg == 1) {
        orguserbasic().then((res) => {
          console.log(res);
          this.allType = res.result.allOrg.allType;
          this.checking = res.result.allOrg.checking;
          this.failed = res.result.allOrg.failed;
          this.allOrder = res.result.allOrder;
          this.allVisit = res.result.allVisit;
          this.allStu = res.result.allStu;
        });
      }
    },

    orguserdetail() {
      if (this.cvimg == 1) {
        orguserdetail(this.searchForm).then((res) => {
          console.log(res);
          this.orderMoneyCount = res.result.orderMoneyCount;
          this.orderNumCount = res.result.orderNumCount;
          this.visitCount = res.result.visitCount;
        });
      }
    },
    orguserstatistics() {
      if (this.cvimg == 1) {
        orguserstatistics(this.searchForm).then((res) => {
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
      this.orguserstatistics();
    },
    organ() {
      this.$router.push({
        name: "orgManage",
        // query: {
        //   id: id,
        // },
      });
    },
  },
};
</script>

<style scoped>
.home_first {
  float: left;
  width: 90%;
  margin-left: 5%;
  height: 150px;
  background: #f0f2f7;
  border-radius: 27px;
}

.home_second {
  float: left;
  width: 96%;
  margin-left: 4%;
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
  margin: 40px 15px 40px 15px;
  width: 70px;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 3px 15px 0px rgba(238, 238, 238, 0.41);
  border-radius: 20px;
  text-align: center;
}

.home_first_icon img {
  border-radius: 20px;
  width: 100%;
  height: 100%;
}

.organization {
  float: left;
  margin-top: 50px;
  font-size: 16px;
  margin-left: 10%;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #787d94;
  cursor: pointer;
}

.organization1 {
  float: left;
  margin-top: 50px;
  font-size: 16px;
  margin-left: 10%;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #787d94;
  cursor: pointer;
}

.organization2 {
  float: left;
  margin-top: 52px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #787d94;
  margin-left: 5%;
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

.organization2_number {
  float: left;
  margin-top: 15px;
  font-size: 15px;
  font-family: STXihei;
  font-weight: bold;
  color: #111111;
}

.organization3_number {
  float: left;
  margin-top: 15px;
  font-size: 15px;
  font-family: STXihei;
  font-weight: bold;
  color: #fa455e;
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

.home_area {
  float: left;
  width: 80%;
  height: 40px;
  margin-left: 5%;
  margin-top: 10px;
  text-align: left;
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

@media screen and (min-width: 1200px) {
  /* 你的样式 */
  .organization1 {
    float: left;
    margin-top: 50px;
    font-size: 16px;
    margin-left: 5%;
  }
}
</style>
