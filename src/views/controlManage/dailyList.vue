<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-23 14:14:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-31 09:07:48
--> 
<template>
  <div class="trainlist">
    <Row>
      <div
        class="header"
        ref="header"
      >
        <div class="title">
          <span>健康日报列表</span>
        </div>
        <div
          style="display:flex"
          :label-width="100"
        >
        </div>
      </div>
      <Divider style="margin:10px 0" />
    </Row>
    <!-- 搜索 -->
    <Row>
      <div class="search">
        <Form
          :model="orgInfo"
          style="display:flex;float:left"
          :label-width="80"
        >

          <FormItem label="填报日期">
            <Row>
              <DatePicker
                v-model="searchForm.creationDate"
                :value="searchForm.creationDate"
                format="yyyy年MM月dd日"
                type="date"
                placeholder="选择日期"
                style="width:150px;z-index:7;position: fixed;"
                @on-change="changeDate"
              ></DatePicker>
            </Row>
          </FormItem>

          <FormItem label="填报状态" style="margin-left:150px;">
            <Select
              v-model="searchForm.status"
              :value="searchForm.status"
              transfer
              style="width:90px;"
              @on-change="changeCondition"
            >
              <Option :value="0">全部</Option>
              <Option :value="1">正常</Option>
              <Option :value="2">异常</Option>

            </Select>
          </FormItem>

          <FormItem
            label="区域"
            v-if="showAddInput==3"
          >
            <Cascader
              @on-visible-change="clickAreaSearch"
              ref="cascader"
              :data="addressDataSearch"
              :value="areaId"
              @on-change="changeAreaSearch"
              :load-data="loadDataSearch"
              transfer
              change-on-select
            ></Cascader>
          </FormItem>

          <FormItem
            label="区镇/街县"
            v-else-if="showAddInput==1"
          >
            <Cascader
              :data="addressData"
              :value="areaId2"
              v-model="areaId2"
              @on-change="changeCascader"
              transfer
              style="width: 200px"
            ></Cascader>
          </FormItem>

          <FormItem label="关键字">
            <Input
              v-model="searchForm.key"
              @input="selectInput"
              placeholder="请输入姓名或机构关键字"
              style="width: 200px"
            />
          </FormItem>

          <FormItem
            label="数量:"
          >
          <p><b style="color:#2d8cf0;font-size:20px;">{{total}}</b> 人</p>
            
          </FormItem>

        </Form>
        <div style="float:right;margin:11px 0">
          <Button
            type="primary"
            @click="handleSearch"
          >搜索</Button>

          <Button type="warning" style="margin-right:6px;margin-left:20px;" @click="exportData">导出</Button>
        </div>
      </div>
    </Row>
    <!-- 表格 -->
    <Row>
      <Table
        :columns="columns"
        :data="data"
        border
        ref="table"
        :loading="loading"
        :height="tableHeight"
        @on-selection-change="changeSelect"
      >
        <template
          slot-scope="{row}"
          slot="temperatureHome"
        >
          <Tag :color="changeTemp(row.temperatureHome)">{{row.temperatureHomeFlag }}</Tag>
        </template>

        <template
          slot-scope="{row}"
          slot="attendance"
        >
          <Tag :color="changeAtt(row.attendance)">{{row.attendance | changeAttendance}}</Tag>
        </template>
        <template
          slot-scope="{row}"
          slot="cough"
        >
          <Tag :color="coughColor(row.toHighArea)" v-if="row.toHighArea==1">{{row.toHighArea==1?'14天内曾居住或前往疫情高发地':''}}</Tag>
          <Tag :color="coughColor(row.touch)" v-if="row.touch==1">{{row.touch==1?'两周内有与确诊患者接触':''}}</Tag>
          <Tag :color="coughColor(row.cough)" v-if="row.cough==0">{{row.cough==0?'没有症状':'有症状'}}</Tag>
          <Tag :color="coughColor(row.cold)" v-if="row.cold==1">{{row.cold==1?'有感冒症状:乏力、精神差、咳嗽、发烧、肌肉痛、头疼':''}}</Tag>
          <Tag :color="coughColor(row.broken)" v-if="row.broken==1">{{row.broken==1?'哮憋、呼吸急促':''}}</Tag>
          <Tag :color="coughColor(row.vomit)" v-if="row.vomit==1">{{row.vomit==1?'恶心呕吐、腹泻':''}}</Tag>
          <Tag :color="coughColor(row.heart)" v-if="row.heart==1">{{row.heart==1?'心慌、胸闷':''}}</Tag>
          <Tag :color="coughColor(row.eye)" v-if="row.eye==1">{{row.eye==1?'结膜炎':''}}</Tag>
        </template>

        <template
          slot-scope="{row}"
          slot="temperatureOrg"
        >
          <Tag :color="changeTemp(row.temperatureOrg)">
            <input
              v-if="input_show"
              class="tempInput"
              maxlength="4"
              v-model="row.temperatureOrg"
              @input="inputChange(row.id,row.temperatureOrg)"
              :style="row.temperatureOrg >37.3? 'color:red':'color:#52c41a'"
              size="large"
              @blur="setOrgTemplate(row.id,row.temperatureOrg)"
              placeholder="请输入体温"
            >

            <p
              v-else
              class="p_temp"
              :style="row.temperatureOrg >37.3? 'color:red':'color:#52c41a'"
            >{{row.temperatureOrg}}℃</p>
          </Tag>
        </template>
      </Table>
    </Row>
    <!-- 分页 -->
    <Row
      type="flex"
      justify="end"
      class="page"
    >
      <div
        ref="footer"
        class="footer"
      >
        <Page
          :current="searchForm.pageNumber"
          :total="total"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10,20,50]"
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
  getEveryDayInfoList,
  getAddresslist,
  setOrgTemplate,
  getDailyHealth,
  exportAll
  
} from "@/api";
// import { dateFormat } from "@/utils/current";
export default {
  data() {
    return {
      orgInfo: {},
      // 全部体温
      tempObj: {},
      input_show: false,
      columns: [
        {
          title: "镇区",
          key: "areaName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "姓名",
          key: "userName",
          align: "center",
          minWidth: 70,
        },
        {
          title: "填报日期",
          key: "creationDate",
          align: "center",
          minWidth: 100,
        },
        {
          title: "机构名称",
          key: "orgName",
          align: "center",
          minWidth: 180,
        },
        {
          title: "考勤",
          slot: "attendance",
          align: "center",
          minWidth: 70,
        },
        {
          title: "居家测温",
          slot: "temperatureHome",
          align: "center",
          minWidth: 100,
        },
        {
          title: "行踪/健康情况",
          slot: "cough",
          align: "center",
          minWidth: 160,
        },
        {
          title: "机构测温",
          slot: "temperatureOrg",
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
        status:2
      },
      total: 0,
      dateValue: "",
      input_value: "",
      addressDataSearch: [],
      addressData: [],
      addressValue: [],
      areaId: [],
      isEdit: "add",
      // 判断显示哪个下拉框 0 = 区级/镇级教育局，不显示 ; 1 = 市级教育局，可以选择 区/镇 ; 2 = 省级教育局，可以选 市，区/镇 ; 3 = admin ，可以选 省，市，区/镇。
      showAddInput: 0,
      s_id: "",
      z_id: "",
      q_id: "",
      areaId2: [],
    };
  },
  created() {
    this.orgInfo = this.$route.query;
    console.log(this.orgInfo);
    this.searchForm.organizationId = this.orgInfo.id;
    // this.searchForm.creationDate = this.orgInfo.date;
    // this.getTableInfo();
    this.getUserInfo();
    this.getDailyHealth();
  },
  mounted() {
    this.init();
    //this.getAddresslist(); //地址接口

    // this.getUserInfo();
  },
  destroyed() {
    // 销毁全局方法
    window.onresize = null;
  },
  filters: {
    changeCode(msg) {
      switch (msg) {
        case 0:
          return "绿码";
          break;
        case 1:
          return "红码";
          break;
        case 2:
          return "黄码";
          break;
      }
    },
    changeAttendance(msg) {
      switch (msg) {
        case 0:
          return "正常";
          break;
        case 1:
          return "病假";
          break;
        case 2:
          return "事假";
          break;
        default:
          return "-";
          break;
      }
    },
  },
  methods: {
    clickAreaSearch(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        let s_id = this.data.s_id;
        let z_id = this.data.z_id;
        this.getTownshipList(s_id, z_id);
      }
    },

    clickAreaSearch2(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        this.getAddresslist();
      }
    },

    getUserInfo() {
      let userMessage = JSON.parse(sessionStorage.getItem("userInfo"));
      console.log(userMessage);
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
      }else if (type == "ORGPRINCIPAL" || type == "TRUSTEESHIPORGPRINCIPAL") {
        let id0 = addId_list[0];
        let id1 = addId_list[1];
        let id2 = addId_list[2];
        s_id = parseInt(id0);
        z_id = parseInt(id1);
        // q_id = parseInt(id2);
        q_id = 0;
        this.searchForm.status = 0;
        console.log(this.searchForm.status);
      }
      // else if(addId_list.length ==1){
      //   // 省级教育局
      //   var id0 = addId_list[0];
      //   var s_id = Integer.parseInt(id0);
      //   this.getCityList(s_id);
      // }
      this.searchForm.provinceId = s_id;
      this.searchForm.cityId = z_id;
      this.searchForm.areaId = q_id;
      console.log(this.showAddInput);
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

    getCityList() {
      let level = 1;
      getAddresslist({ level: level }).then((res) => {
        this.address_s = res.result;
        let newList = [];
        this.address_s.forEach((item) => {
          if (item.id == s_id) {
            newList = item;
            newList.children = [];
            newList.loading = false;
          }
        });
      });
    },

    // 获取省份
    getAddresslist(id, i, arr) {
      console.log(id);
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

      // if(areaId.length==1){
      //   this.searchForm.provinceId = areaId[0];
      // }else if(areaId.length==2){
      //   this.searchForm.provinceId = areaId[0];
      //   this.searchForm.cityId = areaId[1];
      // }else if(areaId.length==3){
      //   this.searchForm.provinceId = areaId[0];
      //   this.searchForm.cityId = areaId[1];
      //   this.searchForm.areaId = areaId[2];
      // }
      if(areaId.length==3){
        this.searchForm.provinceId = areaId[0];
        this.searchForm.cityId = areaId[1];
        this.searchForm.areaId = areaId[2];
      }else{
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

    changeDate(e){
      console.log(e);
      let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);  
      console.log(date);
      this.searchForm.creationDate = date;
    },

    changeCondition(e){
      console.log(e);
      this.searchForm.status = e;
    },

    changeCascader(e){
      console.log(e);
      this.searchForm.provinceId = e[0];
      this.searchForm.cityId = e[1];
      this.searchForm.areaId = e[2];
    },

    selectInput(e){
      this.searchForm.key = e;
      console.log(this.searchForm.key);
    },

    changeTemp(msg) {
      if (msg > 37.3) {
        return "red";
      } else {
        return "green";
      }
    },
    codeColor(msg) {
      switch (msg) {
        case 0:
          return "success";
          break;
        case 1:
          return "error";
          break;
        case 2:
          return "warning";
          break;
      }
    },
    coughColor(msg){
      switch (msg) {
        case 0:
          return "green";
          break;
        case 1:
          return "red";
          break;
      }
    },
    changeAtt(msg) {
      switch (msg) {
        case 0:
          return "blue";
          break;
        case 1:
          return "orange";
          break;
        case 2:
          return "orange";
          break;
        default:
          return "default";
          break;
      }
    },
    getTableInfo() {
      getEveryDayInfoList(this.searchForm).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.loading = false;
        }
      });
    },

    getDailyHealth() {
      console.log(this.searchForm);
      getDailyHealth(this.searchForm).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.loading = false;
          // this.searchForm.creationDate = res.result.content[0].creationDate;
        }
      });

      if (sessionStorage.getItem("userInfo") != null) {
        let type = JSON.parse(sessionStorage.getItem("userInfo")).type;
        if (type == "ORGPRINCIPAL" || type == "TRUSTEESHIPORGPRINCIPAL") {
          this.input_show = true;
        } else {
          this.input_show = false;
        }
      }
    },

    inputChange(id, val) {
      console.log(this.data);
      let totalElements = this.data;
      // 找到当前id是第几条列表
      let id_num = "";
      for (var i = 0; i < totalElements.length; i++) {
        if (totalElements[i].id == id) {
          id_num = i;
        }
      }

      val = val.replace(/(^\s*)|(\s*$)/g, "");
      if (!val) {
        // this.temp_input = "";
        this.data[id_num].temperatureOrg = "";
        return;
      }

      // 开头为0
      val = val.replace(/^0*/g, "");

      if (val.length >= 2) {
        if (val <= 34) {
          this.$Message.error({
            top:300,
            closable:true,
            duration:3,
            content:"请输入正确的体温！"
          });
          val = "";
        }
      }

      if (val >= 47) {
        this.$Message.error({
            top:300,
            closable:true,
            duration:3,
            content:"请输入正确的体温！"
            });
        val = "";
      }

      var reg = /[^\d.]/g;
      // 只能是数字和小数点，不能是其他输入
      val = val.replace(reg, "");
      // 保证第一位只能是数字，不能是点
      val = val.replace(/^\./g, "");
      // 小数只能出现1位
      val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      // 小数点后面保留1位 没多一位，加一个 \d
      val = val.replace(/^(\-)*(\d+)\.(\d).*$/, "$1$2.$3");
      // this.temp_input = val;
      this.data[id_num].temperatureOrg = val;
    },

    // 机构填写体温
    setOrgTemplate(id, temp_input) {
      if (temp_input == null) {
        temp_input = "";
      }else if(temp_input.length == 1){
        this.$Message.error({
            top:300,
            closable:true,
            duration:3,
            content:"请输入正确的体温！"
          });
        temp_input = "";
      }else{
        let temperature = temp_input;
        setOrgTemplate({ id, temperature }).then((res) => {
          if (res.code == 200) {
            this.$Message.success({
              duration:3,
              top:300,
              closable:true,
              content:res.message
            });
          }
        });
      }
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
      this.tableHeight = pageHeight - headerHeight - footerHeight - 123;
    },
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      // this.getTableInfo();
      this.getDailyHealth();
    },
    handleReset() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.searchForm.isGtTemperatureThreshold = "";
      this.searchForm.attendance = "";
      // this.getTableInfo();
      this.getDailyHealth();
    },
    changeSelect() {},
    changePage(e) {
      this.searchForm.pageNumber = e;
      // this.getTableInfo();
      this.getDailyHealth();
    },
    changePageSize(e) {
      this.searchForm.pageSize = e;
      // this.getTableInfo();
      this.getDailyHealth();
    },

    /**
     * 批量导出按钮事件
     */
    exportData() {
      console.log(this.searchForm);

      let status = this.searchForm.status;
      let creationDate = this.searchForm.creationDate||'';
      let key = this.searchForm.key||'';
      let provinceId = this.searchForm.provinceId||0;
      let cityId = this.searchForm.cityId||0;
      let orgId = this.searchForm.orgId||0;

      let link = document.createElement("a");
      let state = process.env.NODE_ENV === "production";
      if (state) {
        link.href = `/HealthReport-admin/admin/common/dailyHealth/exportAll?status=`+status+`&creationDate=`+creationDate+`&key=`+key+`&provinceId=`+provinceId+`&cityId=`+cityId+`&orgId=`+orgId;
      } else {
        link.href = `/admin/common/dailyHealth/exportAll?status=`+status+`&creationDate=`+creationDate+`&key=`+key+`&provinceId=`+provinceId+`&cityId=`+cityId+`&orgId=`+orgId;
      }

      link.target = "_self";
            link.click();

      // exportAll(this.searchForm).then((res) => {
            
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
.trainlist {
  padding: 16px;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    .title {
      color: #2d8cf0;
      font-weight: bold;
      line-height: 32px;
    }
  }
  .search {
    border: 1px solid #dcdee2;
    border-radius: 4px;
    padding: 0 6px;
    margin-bottom: 10px;
    overflow: hidden;
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

.tempInput {
  border: none !important;
  height: 20px !important;
  outline-color: transparent !important;
  background: transparent !important;
  // color: #52c41a;
  text-align: center;
  font-size: 14px !important;
  width: 100%;
}

.tempInput:focus {
  border: none !important;
  box-shadow: none !important;
}
.p_temp {
  height: 20px;
  // width: 50px;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 14px;
}
</style>