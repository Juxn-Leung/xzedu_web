<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-23 14:14:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-30 23:11:17
--> 
<template>
  <div class="trainlist">
    <Row>
      <div class="header" ref="header">
        <div class="title">
          <span>课程列表</span>
        </div>
        <div class="export-btn">
          <!-- <Button type="primary" icon="md-add" @click="add" v-if="menuBtns.indexOf('delete:org')>-1">添加老师</Button> -->
          <Button type="primary" icon="md-add" @click="goAdd">添加课程</Button>
        </div>
      </div>
      <Divider style="margin:10px 0" />
    </Row>
    <!-- 搜索 -->
    <Row>
      <div class="search" v-if="seach_panel">
        <Form
          :model="searchForm"
          ref="searchForm"
          style="display:flex;float:left"
          :label-width="100"
        >

         <FormItem label="填报日期">
            <Row>
              <DatePicker
                v-model="searchForm.classDate"
                :value="searchForm.classDate"
                format="yyyy年MM月dd日"
                type="date"
                placeholder="选择日期"
                style="width:150px;z-index:7;position: fixed;"
                @on-change="changeDate"
              ></DatePicker>
            </Row>
          </FormItem>

          <FormItem label="省市区" style="margin-left:110px;">
            <Cascader
              change-on-select
              @on-visible-change="clickAreaSearch"
              ref="cascader"
              :data="addressDataSearch"
              :value="areaId"
              @on-change="changeAreaSearch"
              :load-data="loadDataSearch"
              style="width:200px;"
              transfer
            ></Cascader>
          </FormItem>

          <FormItem label="状态" style="margin-left:-50px;">
            <Select
              v-model="searchForm.status"
              :value="searchForm.status"
              transfer
              style="width:90px;"
              @on-change="changeCondition"
            >
              <Option :value="0">全部</Option>
              <Option :value="1">上架</Option>
              <Option :value="2">下架</Option>

            </Select>
          </FormItem>

          <FormItem label="年级" style="margin-left:-50px;">
            <Select
              v-model="searchForm.gradeId"
              :value="searchForm.gradeId"
              transfer
              style="width:90px;"
              @on-change="changeCondition"
            >
              <Option :value="0">1</Option>
              <Option :value="1">2</Option>
              <Option :value="2">3</Option>
            </Select>
          </FormItem>

          <FormItem label="科目" style="margin-left:-50px;">
            <Select
              v-model="searchForm.subjectId	"
              :value="searchForm.subjectId	"
              transfer
              style="width:90px;"
              @on-change="changeCondition"
            >
              <Option :value="0">1</Option>
              <Option :value="1">2</Option>
              <Option :value="2">3</Option>
            </Select>
          </FormItem>

         <FormItem label="关键字" style="margin-left:-40px;">
            <Input
              v-model="searchForm.key"
              @input="selectInput"
              placeholder="课程名称或机构名称或老师姓名关键字"
              style="width: 260px"
            />
          </FormItem>

        <!-- <FormItem label="老师名字">
            <Input v-model="searchForm.key" placeholder="请输入老师名字" />
          </FormItem> -->

        </Form>
        <div style="float:right;margin:11px 0">
          <Button type="primary" @click="handleSearch">搜索</Button>
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
      >
        <template slot="action" slot-scope="{row,index}">
          <Button
            type="primary"
            size="small"
            style="margin-right:6px"
            @click="goEdit(row,index)"
          >{{examine_btn}}</Button>
          <Button
            type="error"
            size="small"
            @click="handleDelete(row,index)"
            v-if="menuBtns.indexOf('delete:org')>-1"
          >删除</Button>
        </template>
      </Table>
    </Row>
    <!-- 分页 -->
    <Row type="flex" justify="end" class="page">
      <div ref="footer" class="footer">
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

    <!-- 选择日期弹框 -->
    <Modal v-model="dateStatus" title="选择日期查看当日列表" :mask-closable="false">
      <Form ref="dateForm" :model="dateForm">
        <FormItem
          label="选择日期:"
          prop="date"
          :label-width="90"
          :rules="{required: true,
            message: '请选择日期',
            trigger: 'change'}"
        >
          <Select v-model="dateForm.date">
            <Option v-for="(item,index) in dateList" :key="index" :value="item">{{item}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="default" @click="dateStatus=false">取消</Button>
        <Button type="primary" @click="handleSubmitDate">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  getOrgList,
  getAddresslist,
  deleteOrg,

  getCourseList,
  getCourseDetails,
  addCourse,
  editCourse,
  delCourse,
  putonCourse,
  pulloffCourse,
  getOrgLectures,
  getReportList,
  getImgList,
  addImg,
  editImg,
  delImg,
  getOutlineList,
  addOutline,
  editOutline,
  delOutline
} from "@/api";
import { dateFormat } from "@/utils/current";
export default {
  data() {
    return {
      isEdit: "add",
      seach_panel:true,
      columns: [
          {
          title: "课程名称",
          key: "name",
          align: "center",
          minWidth: 60
        },
        {
          title: "机构名称",
          key: "orgName",
          align: "center",
          minWidth: 200
        },
        {
          title: "年级",
          key: "gradeName",
          align: "center",
          minWidth: 60
        },
        {
          title: "科目",
          key: "subjectName",
          align: "center",
          minWidth: 60
        },
        {
          title: "优惠价",
          key: "discountPrice",
          align: "center",
          minWidth: 60
        },
        {
          title: "老师姓名",
          key: "teacherName",
          align: "center",
          minWidth: 60
        },
        {
          title: "机构所在区域",
          key: "areaDetail",
          align: "center",
          minWidth: 60
        },
        {
          title: "人数",
          key: "capacity",
          align: "center",
          minWidth: 40
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 160,
          fixed: "right"
        }
      ],
      data: [],
      loading: true,
      tableHeight: 0,
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        type: "EDUCATION"
      },
      total: 0,
      modalTitle: "",
      modalStatus: false,
      addressData: [],
      formItem: {
        orgName: "",
        areaId: [],
        area: [],
        areaDetail: "",
        type:this.organizationType,
        marketRegisterNo:"",
        permissionNo:"",
        teacherCount:"",
        studentCount:"",
        nonTeacherCount:"",
        scopeBusiness:"",
      },
      disabled:false,
      organizationType:'',
      dateStatus: false,
      dateForm: { date: "", id: "" },
      dateList: [],
      addressDataSearch: [],
      area: [],
      areaId: [],

    };
  },
  created() {
    this.getTableInfo();
  },
  mounted() {
    this.init();
    this.getAddresslist(); //地址接口
    this.examineBtn();
  },
  destroyed() {
    // 销毁全局方法
    window.onresize = null;
  },
  computed: {
    ...mapState({
      menuBtns: state => state.menu.menuBtns
    })
  },
  methods: {
    clickAreaSearch(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        this.getAddresslist();
      }
    },

    examineBtn(){
      // 判断编辑按钮是否为查看
      let type = JSON.parse(sessionStorage.getItem("userInfo")).type;
      this.organizationType = "ORGPRINCIPAL";
      console.log(type);
        if(type == "ORGPRINCIPAL"){
          this.examine_btn = '编辑';
          this.seach_panel = false;
        }else{
          this.examine_btn = '查看';
          this.seach_panel = true;
        }
    },

    changeAreaSearch(v, item) {
      let area = [];
      item.map(val => {
        area.push(val.label);
      });
      let areaId = [];
      v.map(val => {
        areaId.push(val * 1);
      });
      this.area = area;
      this.areaId = areaId;
    },
    loadDataSearch(item, callback) {
      item.loading = true;
      getAddresslist({ pid: item.id }).then(res => {
        if (res.code == 200) {
          item.loading = false;
          item.children = res.result;
          if (item.level < 2) {
            item.children.forEach(it => {
              it.loading = false;
              it.children = [];
            });
          }
          callback();
        }
      });
    },
    getTableInfo() {
      getOrgList(this.searchForm).then(res => {
        console.log(res);
        if (res.code == 200) {
          res.result.content.forEach(item => {
            if (item.createdTime) {
              item.createdTime = dateFormat(item.createdTime);
            }
          });
          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.loading = false;
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
      delete this.searchForm.area;
      this.searchForm.areaId = this.areaId.join(",");
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getTableInfo();
    },
    handleReset() {
      this.areaId = [];
      this.area = [];
      this.searchForm = {
        pageNumber: 1,
        pageSize: 10,
        type: "EDUCATION",
        areaId: "",
        orgName: "",
        principalName: ""
      };
      this.getTableInfo();
    },

    // 确认日期
    handleSubmitDate() {
      this.$refs.dateForm.validate(valid => {
        if (valid) {
          this.$router.push({ name: "everyDay", query: this.dateForm });
        }
      });
    },
    changeCondition(e){
      console.log(e);
      this.searchForm.status = e;
    },

    //数据--通用地址
    async regroupAddress(arr) {
      for (let i = 0, len = arr.length; i < len; i++) {
        await this.getAddresslist(arr[i], i, arr);
      }
      let ar = [];
      arr.forEach(item => {
        ar.push(item * 1);
      });
      this.formItem.areaId = ar;
    },

    handleDelete(row, index) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除这个课程?",
        onOk: () => {
          deleteOrg({ orgId: row.id }).then(res => {
            if (res.code == 200) {
              this.$Message.success({
                top:300,
                closable:true,
                duration:3,
                content:"删除成功!"
              });
              this.getTableInfo();
            }
          });
        }
      });
    },
    // 获取省份
    getAddresslist(id, i, arr) {
      if (this.isEdit == "add") {
        getAddresslist({ level: 1 }).then(res => {
          this.addressData = res.result;
          this.addressDataSearch = res.result;
          this.addressData.forEach(item => {
            item.children = [];
            item.loading = false;
          });
        });
      } else if (this.isEdit == "edit") {
        return getAddresslist({ pid: id }).then(res => {
          if (i == 0) {
            this.addressData.forEach(item => {
              if (item.id == id) {
                item.children = res.result;
                item.loading = false;
              } else {
                item.children = [];
                item.loading = false;
              }
            });
          } else if (i == 1) {
            this.addressData.forEach(item => {
              if (item.id == arr[i - 1]) {
                item.children.forEach(it => {
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

    clickArea(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        this.getAddresslist();
      }
    },

    changeArea(v, item) {
      console.log(item);
      let area = [];
      item.map(val => {
        area.push(val.label);
      });
      let areaId = [];
      v.map(val => {
        areaId.push(val * 1);
      });
      this.formItem.area = area;
      this.formItem.areaId = areaId;
      console.log(this.formItem.area);
      console.log(this.formItem.areaId);
    },

    loadData(item, callback) {
      item.loading = true;
      getAddresslist({ pid: item.id }).then(res => {
        if (res.code == 200) {
          item.loading = false;
          item.children = res.result;
          if (item.level < 2) {
            item.children.forEach(it => {
              it.loading = false;
              it.children = [];
            });
          }
          callback();
        }
      });
    },

    changePage(e) {
      this.searchForm.pageNumber = e;
      this.getTableInfo();
    },

    changePageSize(e) {
      this.searchForm.pageSize = e;
      this.getTableInfo();
    },

    // 筛选相关
    selectInput(e){
      this.searchForm.key = e;
      console.log(this.searchForm.key);
    },

    changeDate(e){
      console.log(e);
      let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);  
      console.log(date);
      this.searchForm.classDate = date;
    },

    // 新增页面
    goAdd(){
        this.$router.push({ name: "added" });
    },

    // 修改页面
    goEdit(row,index){
        console.log(row);
        this.$router.push({ name: "modification" });
    },

    // 查看页面
    goExamine(row,index){
        console.log(row);
        this.$router.push({ name: "examine" });
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

.footer_btn{
  .ivu-btn {
    height: 40px;
    width: 40%;
    margin-right: 6.66666%;
  }
}

.ivu-table-row .ivu-btn{
  width: 72px;
}

textarea.ivu-input{
    height: 160px;
}
</style>