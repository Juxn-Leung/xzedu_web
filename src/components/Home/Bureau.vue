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
          <div class="home_text" v-show="text !== ''">{{ text }}</div>

          <Cascader
            v-if="shictro == 1"
            change-on-select
            ref="cascader"
            :data="addressData"
            :value="areaId2"
            v-model="areaId2"
            @on-change="changeCascader"
            transfer
          >
            <a href="javascript:void(0)" v-show="text !== ''"
              ><Icon size="30" style="color: #373737" type="md-arrow-dropdown"
            /></a>
          </Cascader>
        </div>

        <div class="home_first_second" style="margin-top: 2px">
          <div class="home_first_icon_second">
            <img :src="orgs" />
          </div>
          <div class="organization_second" @click="organ">
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

    <Col span="9">
      <div class="home_thirst2">
        <div class="home_title">
          <div class="title">
            <span>老师统计</span>
          </div>
          <div>
            <div class="percentum_first">{{ (manPercent).toFixed(2) + "%" }}</div>
            <div class="percentum_second">
              {{ (womanPercent).toFixed(2) + "%" }}
            </div>
          </div>
          <div class="progre">
            <div class="progre_first">男</div>
            <div class="progre_second">
              <Progress :percent="percentum" hide-info />
            </div>
            <div class="progre_first2">女</div>
          </div>

          <div>
            <div class="percentum_first">{{ manCount}}</div>
            <div class="percentum_second">
              {{ womanCount}}
            </div>
          </div>
        </div>

        <div
          class="home_line"
          style="
            position: relative;
             z-index: 1;
            text-align: -webkit-center;
            height: 250px;
            margin-top: 50px;
          "
        >
          <div
            class="xian_title"
            style="
              position: absolute;
               top: 100px;
               left: 43%;
               z-index: 2;
              width: 15%;
            "
          >
            <a class="xian_techer">学科</a>
            <span>教学老师</span>
          </div>
          <ve-ring
            height="250px"
            width="100%"
            :data="chartDatax"
            :extend="chartExtendx"
            :settings="chartSettingsx"
          >
          </ve-ring>
        </div>
      </div>
    </Col>

    <Col span="15">
      <div class="home_thirst3">
        <div class="home_title">
          <div class="title">
            <span>机构统计</span>
          </div>
        </div>
        <div class="home_line" style="position: relative;  z-index: 1">
          <div
            class="xian_second"
            style="
              position: absolute;
               top: 40px;
               left: 0%;
               z-index: 2;
              width: 100%;
            "
          >
            <div class="xian_li">
              <a>证照齐全</a>
            </div>
            <div class="xian_li3">
              <a>有证无照</a>
            </div>
            <div class="xian_li2">
              <a>有照无证</a>
            </div>
          </div>

          <ve-liquidfill
            :data="chartData"
            :settings="chartSettings"
            height="360px"
            style="width: 100%"
          ></ve-liquidfill>
        </div>
      </div>
    </Col>
  </Row>
</template>


<script>
import { mapState } from "vuex";
import {
  getAddresslist,
  getAreaName,
  edubasic,
  edudetail,
  edustatistics,
  edulec,
} from "@/api";
import { Debounce } from "../../libs/util";
import { dateFormat } from "@/utils/current";

export default {
  data() {
    this.chartSettings = {
      // dimension: ["clickDate"],
      seriesMap: [
        {
          label: {
            fontSize: 16,
          },
          center: ["15%", "50%"],
          radius: "50%",
          color: ["rgb(0,153,255)"],
          waveAnimation: 10,
          amplitude: 20, // 振幅
          // 设置背景色
          backgroundStyle: {
            borderColor: "#fff",
            borderWidth: 1,
            shadowColor: "#fff",
            shadowBlur: 20,
            // 环状里边的背景色
            color: "#DFEAFF",
          },
          outline: {
            show: true,
            borderDistance: 5,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 3,
            },
          },
        },
        {
          label: {
            fontSize: 16,
          },
          center: ["50%", "50%"],
          radius: "50%",
          color: ["rgb(0,153,255)"],
          waveAnimation: 10,
          amplitude: 20, // 振幅
          // 设置背景色
          backgroundStyle: {
            borderColor: "#fff",
            borderWidth: 1,
            shadowColor: "#fff",
            shadowBlur: 20,
            // 环状里边的背景色
            color: "#DFEAFF",
          },
          outline: {
            show: true,
            borderDistance: 5,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
        },
        {
          label: {
            fontSize: 16,
          },
          center: ["85%", "50%"],
          radius: "50%",
          color: ["rgb(0,153,255)"],
          waveAnimation: 10,
          amplitude: 20, // 振幅
          // 设置背景色
          backgroundStyle: {
            borderColor: "#DFEAFF",
            borderWidth: 1,
            shadowColor: "#fff",
            shadowBlur: 20,
            // 环状里边的背景色
            color: "#DFEAFF",
          },
          outline: {
            show: true,
            borderDistance: 5,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
        },
      ],
    };

    this.chartExtendx = {
      legend: { show: false }, //隐藏legend
      series: {
        center: ["50%", "50%"],
      },
    };

    return {
      
      percentum:0,
      womanPercent:0,
      manPercent:0,
      womanCount:"",
      manCount:"",
      text: "",
      s_id: "",
      z_id: "",
      q_id: "",
      shictro: "",
      areaId2: [],
      addressData: [],
      searchForm: {},
      OrgCount: "",
      StuCount: "",
      TeacherCount: "",
      OrgCount1: "",
      StuCount1: "",
      TeacherCount1: "",
      type: "",
      ac1: "",
      ac2: "",
      ac: {},
      chartData2: {},
      imgUrl: require("@/assets/welcome.png"),
      organization: require("@/assets/home/organization.png"),
      orgs: require("@/assets/home/orgs.png"),
      teacher: require("@/assets/home/teacher.png"),
      teacher2: require("@/assets/home/teacher2.png"),
      student: require("@/assets/home/student.png"),
      student2: require("@/assets/home/student2.png"),
      chartData: {},

      chartDatax: {
        columns: ["lei", "percent"],
        rows: [
          { lei: "非学科类", percent: 0.4 },
          { lei: "学科类", percent: 0.6 },
        ],
      },

      chartSettingsx: {
        radius: ["80px", "100px"],
        label: {
          formatter: (params) => {
            if (params.dataIndex === 0) {
              return `{a| 非学科类${params.percent}%}`;
            } else {
              return `{b| 学科类${params.percent}%}`;
            }
          },
          rich: {
            a: {
              color: "#FFB72B",
            },
            b: {
              color: "#417DF4",
            },
          },
        },
        itemStyle: {
          color: (seriesIndex) => {
            if (seriesIndex.dataIndex === 0) {
              return {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FFB72B", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FFB72B", // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FFB72B", // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FFB72B", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              };
            } else {
              return "#417DF4";
            }
          },
        },
      },
    };
  },
  created() {
    this.getUserInfo();
    this.edubasic();
    this.edudetail();
    this.edustatistics();
    this.edulec();
  },
  methods: {
    getUserInfo() {
      let userMessage = JSON.parse(sessionStorage.getItem("userInfo"));
      console.log(userMessage);
      let addId_list = [];
      let type = userMessage.type;
      this.type = userMessage.type;
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
        this.institution = 1;
        this.showAddInput = 0;
        this.getTownshipListx(q_id);
      } else if (type == "EDUCATIONPRINCIPAL") {
        // 市级教育局
        let id0 = addId_list[0];
        let id1 = addId_list[1];
        s_id = parseInt(id0);
        z_id = parseInt(id1);
        q_id = 0;
        console.log(z_id);
        this.areaId2.push(s_id);
        this.areaId2.push(z_id);
        this.areaId2.push(q_id);
        //  this.searchForm.cityId =q_id;
        console.log(this.areaId2);
        this.shictro = 1;
        this.showAddInput = 1;
        this.getTownshipList(z_id);
      } else if (type == "INNER") {
        // admin
        this.showAddInput = 3;
        this.getAddresslist();
        s_id = 0;
        z_id = 0;
        q_id = 0;
        this.admintest = 1;
      } else if (type == "ORGPRINCIPAL" || type == "TRUSTEESHIPORGPRINCIPAL") {
        let id0 = addId_list[0];
        let id1 = addId_list[1];
        let id2 = addId_list[2];
        s_id = 0;
        z_id = 0;
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

    getTownshipList(z_id) {
      let level = 1;
      let addressData = {};
      console.log(z_id);
      let newList2 = [];
      var cardNumObj = {};
      getAddresslist({ pid: z_id }).then((res) => {
        this.addressData = res.result;

        cardNumObj = {
          id: null,
          label: "全市",
          level: 3,
          name: "全市",
          pid: null,
          value: null,
        };
        console.log("册数" + this.addressData);

        this.addressData.unshift(cardNumObj);
        console.log(this.addressData);
        this.text = this.addressData[0].label;
      });
    },

    getTownshipListx(q_id) {
      let level = 1;
      let addressData = {};

      let newList2 = [];

      getAreaName({ id: q_id }).then((res) => {
        this.addressData = res.result;
        this.text = res.result.name;
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

    changeCascader(value, selectedData) {
      console.log(selectedData);
      this.text = selectedData.map((o) => o.label).join(", ");
      this.searchForm.areaId = selectedData.map((o) => o.value);
      console.log(this.searchForm.areaId);
      this.edudetail();
      this.edustatistics();
      this.edulec();
    },

    edubasic() {
      if (this.type == "EDUCATIONPRINCIPAL" || this.type == "TOWNPRINCIPAL") {
        edubasic().then((res) => {
          console.log(res);
          this.OrgCount = res.result.OrgCount;
          this.StuCount = res.result.StuCount;
          this.TeacherCount = res.result.TeacherCount;
        });
      }
    },

    edudetail() {
      if (this.type == "EDUCATIONPRINCIPAL" || this.type == "TOWNPRINCIPAL") {
        edudetail(this.searchForm).then((res) => {
          console.log(res);
          this.OrgCount1 = res.result.OrgCount;
          this.StuCount1 = res.result.StuCount;
          this.TeacherCount1 = res.result.TeacherCount;
        });
      }
    },
    edulec() {
      if (this.type == "EDUCATIONPRINCIPAL" || this.type == "TOWNPRINCIPAL") {
        edulec(this.searchForm).then((res) => {
          this.chartDatax = res.result;
          this.manCount=res.result.manCount;
          this.womanCount=res.result.womanCount;
          // this.percentum= Number(res.result.manPercent);
          this.percentum=Number((res.result.manPercent)*100);
          this.manPercent=(res.result.manPercent)*100;
          this.womanPercent=(res.result.womanPercent)*100;
          console.log( this.percentum);
        });
      }
    },

    edustatistics() {
      if (this.type == "EDUCATIONPRINCIPAL" || this.type == "TOWNPRINCIPAL") {
        edustatistics(this.searchForm).then((res) => {
          this.chartData = res.result;
          
        });
      }
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
  width: 96%;
  margin-left: 2%;
  height: 380px;
  margin-top: 20px;
  background: #f0f2f7;
  border-radius: 27px;
}
.home_thirst2 {
  float: left;
  width: 96%;
  margin-left: 4%;
  height: 380px;
  margin-top: 20px;
  background: #f0f2f7;
  border-radius: 27px;
}
.home_thirst3 {
  float: left;
  width: 96%;
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
  float: right;
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
/deep/ .ivu-progress-inner {
  background-color: #21d3ac;
}
.percentum_first {
  float: left;
}
.percentum_second {
  float: right;
}
.progre {
  float: left;
  width: 100%;
}
.progre_first {
  float: left;
  width: 10%;
  text-align: center;
  font-weight: bold;
  color: #417df4;
}
.progre_second {
  float: left;
  width: 80%;
}

.progre_first2 {
  float: right;
  width: 10%;
  text-align: center;
  font-weight: bold;
  color: #21d3ac;
}
.percentum_first {
  margin-left: 10%;
  color: #417df4;
  font-weight: bold;
}
.percentum_second {
  margin-right: 10%;
  color: #21d3ac;
  font-weight: bold;
}

/deep/ .ivu-cascader {
  line-height: normal;
  float: left;
}
.xian_techer {
  float: left;
  width: 100%;
  color: #417DF4;
  font-weight: bold;
}

.xian_title {
  text-align: center;
  font-size: 17px;
}
.xian_title span {
  color: #417DF4;
  font-weight: bold;
}

.xian_li {
  float: left;
  width: 33.3%;
}
.xian_li a {
  float: left;
  width: 68%;
  margin-left: 32%;
  color: #373737;
  font-size: 16px;
  font-weight: bold;
}
.xian_li2 {
  float: right;
  width: 33.3%;
}
.xian_li3 {
  float: left;
  width: 33.3%;
}
.xian_li3 a {
  width: 66%;
  margin-left: 34%;
  color: #373737;
  font-size: 16px;
  font-weight: bold;
}

.xian_li2 a {
  width: 60%;
  margin-left: 40%;
  color: #373737;
  font-size: 16px;
  font-weight: bold;
}
</style>