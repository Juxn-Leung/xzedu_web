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
          <div style="margin-right:30px">
            <span style="margin-right:6px">教育机构名称:</span>
            <span>{{orgInfo.orgName}}</span>
          </div>
          <div style="margin-right:30px">
            <span style="margin-right:6px">联系人:</span>
            <span>{{orgInfo.con}}</span>
          </div>
          <div>
            <span style="margin-right:6px">联系电话:</span>
            <span>{{orgInfo.phone}}</span>
          </div>
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
          <FormItem label="机构测温">
            <Select
              v-model="searchForm.isGtTemperatureThreshold"
              transfer
              style="width:136px"
            >
              <Option :value="0">小于37.3℃</Option>
              <Option :value="1">大于等于37.3℃</Option>
            </Select>
          </FormItem>
          <FormItem label="考勤">
            <Select
              v-model="searchForm.attendance"
              transfer
            >
              <Option :value="0">正常</Option>
              <Option :value="1">病假</Option>
              <Option :value="2">事假</Option>
            </Select>
          </FormItem>
        </Form>
        <div style="float:right;margin:11px 0">
          <Button
            type="primary"
            @click="handleSearch"
          >搜索</Button>
          <Button
            @click="handleReset"
            style="margin-left:6px"
          >重置</Button>
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
        <!-- <template slot-scope="{row}" slot="temperatureHome">
          <Tag :color="changeTemp(row.temperatureHome)">{{row.temperatureHome }}℃</Tag>
        </template> -->

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
          <Tag :color="row.cough==1?'red':'green'">{{row.cough==1?'是':'否'}}</Tag>
        </template>
        <!-- <template slot-scope="{row}" slot="healthCode">
          <Tag :color="codeColor(row.healthCode)">{{row.healthCode | changeCode}}</Tag>
        </template> -->
        <!-- <template
          slot-scope="{row}"
          slot="temperatureOrg"
        >
          <Tag :color="changeTemp(row.temperatureOrg)">{{row.temperatureOrg}}℃</Tag>
        </template> -->
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

            <p v-else class="p_temp" :style="row.temperatureOrg >37.3? 'color:red':'color:#52c41a'">{{row.temperatureOrg}}℃</p>
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
import { getEveryDayInfoList, setOrgTemplate } from "@/api";
// import { dateFormat } from "@/utils/current";
export default {
  data() {
    return {
      orgInfo: {},
      // 全部体温
      tempObj:{},
      input_show : false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          title: "姓名",
          key: "userName",
          align: "center",
          minWidth: 110
        },
        {
          title: "填报日期",
          key: "creationDate",
          align: "center",
          minWidth: 180
        },
        {
          title: "考勤",
          slot: "attendance",
          align: "center",
          minWidth: 100
        },
        {
          title: "居家测温",
          slot: "temperatureHome",
          align: "center",
          minWidth: 100
        },
        {
          title: "是否咳嗽",
          slot: "cough",
          align: "center",
          minWidth: 100
        },
        // {
        //   title: "粤康码",
        //   slot: "healthCode",
        //   align: "center",
        //   minWidth: 100
        // },
        {
          title: "机构测温",
          slot: "temperatureOrg",
          align: "center",
          minWidth: 100
        }
      ],
      data: [],
      loading: true,
      tableHeight: 0,
      searchForm: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0
    };
  },
  created() {
    this.orgInfo = this.$route.query;
    this.searchForm.organizationId = this.orgInfo.id;
    this.searchForm.creationDate = this.orgInfo.date;
    this.getTableInfo();
  },
  mounted() {
    this.init();
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
    }
  },
  methods: {
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
      getEveryDayInfoList(this.searchForm).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.loading = false;
        }
      });

      if (sessionStorage.getItem("userInfo") != null) {
          let type = JSON.parse(sessionStorage.getItem("userInfo")).type;
          if(type == 'ORGPRINCIPAL' || type == 'TRUSTEESHIPORGPRINCIPAL'){
            this.input_show = true;
          }else{
             this.input_show = false
          }
	      }
    },

    inputChange(id, val) {
      console.log(this.data)
      let totalElements = this.data;
      // 找到当前id是第几条列表
      let id_num = '';
      for(var i=0;i<totalElements.length;i++){
        if(totalElements[i].id == id){
          id_num = i;
        }
      }

      val = val.replace(/(^\s*)|(\s*$)/g, "");
      if (!val) {
        // this.temp_input = "";
          this.data[id_num].temperatureOrg = '';
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
                content:"请输入正确的体温！"});
          val = "";
        }
      }

      if (val >= 47) {
        this.$Message.error({
          top:300,
                closable:true,
                duration:3,
                content:"请输入正确的体温！"});
        val = "";
      }

      var reg = /[^\d.]/g;
      // 只能是数字和小数点，不能是其他输入
      val = val.replace(reg, "");
      // 保证第一位只能是数字，不能是点
      val = val.replace(/^\./g, "");
      // 小数只能出现1位
      val = val
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      // 小数点后面保留1位 没多一位，加一个 \d
      val = val.replace(/^(\-)*(\d+)\.(\d).*$/, "$1$2.$3");
      // this.temp_input = val;
      this.data[id_num].temperatureOrg = val;
    },

    // 机构填写体温
    setOrgTemplate(id, temp_input) {
      if(temp_input==null){
        temp_input = ''
      }
      let temperature = temp_input;

      setOrgTemplate({ id, temperature }).then(res => {
        if (res.code == 200) {
          this.$Message.success({
            top:300,
                closable:true,
                duration:3,
                content:res.message});
        }
      });
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
      this.getTableInfo();
    },
    handleReset() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.searchForm.isGtTemperatureThreshold = "";
      this.searchForm.attendance = "";
      this.getTableInfo();
    },
    changeSelect() {},
    changePage(e) {
      this.searchForm.pageNumber = e;
      this.getTableInfo();
    },
    changePageSize(e) {
      this.searchForm.pageSize = e;
      this.getTableInfo();
    }
  }
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
.p_temp{
  height: 20px;
  // width: 50px;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 14px;

}
</style>