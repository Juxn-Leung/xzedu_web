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
          <span>培训机构列表</span>
        </div>
        <div class="export-btn">
          <Button v-if="menuBtns.indexOf('add:org')>-1" type="primary" icon="md-add" @click="add">创建机构</Button>
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
          <FormItem label="教育机构名称">
            <Input v-model="searchForm.orgName" placeholder="请输入教育机构名称" />
          </FormItem>
          <FormItem label="负责人姓名">
            <Input v-model="searchForm.principalName" placeholder="请输入负责人姓名" />
          </FormItem>
          <FormItem label="省市区">
            <Cascader
              change-on-select
              @on-visible-change="clickAreaSearch"
              ref="cascader"
              :data="addressDataSearch"
              :value="areaId"
              @on-change="changeAreaSearch"
              :load-data="loadDataSearch"
              transfer
            ></Cascader>
          </FormItem>
        </Form>
        <div style="float:right;margin:11px 0">
          <Button type="primary" @click="handleSearch">搜索</Button>
          <!-- <Button @click="handleReset" style="margin-left:6px">重置</Button> -->
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
        <template slot="action" slot-scope="{row,index}">
          <!-- <Button
            type="success"
            size="small"
            style="margin-right:6px"
            @click="handleEveryday(row,index)"
          >健康日报</Button> -->
          <Button
            type="primary"
            size="small"
            style="margin-right:6px"
            @click="handleReport(row,index)"
          >健康申报</Button>
          <Button
            type="primary"
            size="small"
            style="margin-right:6px"
            @click="handleEdit(row,index)"
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
    <!-- 新建&编辑弹框 -->
    <Modal v-model="modalStatus" :title="modalTitle" :mask-closable="false">
      <Form ref="formItem" :model="formItem" :label-width="145" :rules="ruleValidate" :disabled="disabled">
        <FormItem label="机构名称" prop="orgName">
          <Input v-model="formItem.orgName" placeholder="请输入营业执照\办学许可证上的名称" />
        </FormItem>
        <FormItem label="机构所在区镇(街县)" prop="areaId">
          <Cascader
            @on-visible-change="clickArea"
            ref="cascader"
            :data="addressData"
            :value="formItem.areaId"
            @on-change="changeArea"
            :load-data="loadData"
            transfer
          ></Cascader>
        </FormItem>

        <FormItem label="详细地址" prop="areaDetail">
          <Input :autosize="true" type="textarea" v-model="formItem.areaDetail" placeholder="请输入详细地址"></Input>
        </FormItem>

       <FormItem label="统一社会信用号码">
          <Input :autosize="true" type="textarea" v-model="formItem.marketRegisterNo" :placeholder="disabled==true?'':'请输入统一社会信用号码'"></Input>
        </FormItem>

        <FormItem label="办学许可证号码">
          <Input :autosize="true" type="textarea" v-model="formItem.permissionNo" :placeholder="disabled==true?'':'请输入办学许可证号码'"></Input>
        </FormItem>

        <FormItem label="教师人数">
          <Input :autosize="true" type="textarea" v-model="formItem.teacherCount" :placeholder="disabled==true?'':'请输入机构教师人数'"></Input>
        </FormItem>

        <FormItem label="学生人数">
          <Input :autosize="true" type="textarea" v-model="formItem.studentCount" :placeholder="disabled==true?'':'请输入机构学生人数'"></Input>
        </FormItem>

        <FormItem label="非教师职工人数">
          <Input :autosize="true" type="textarea" v-model="formItem.nonTeacherCount" :placeholder="disabled==true?'':'请输入非教师职工人数'"></Input>
        </FormItem>

        <FormItem label="主营范围" >
          <Input :autosize="true" type="textarea" v-model="formItem.scopeBusiness" :placeholder="disabled==true?'':'请输入培训学科办学内容(例: 数学、语文、舞蹈)'"></Input>
        </FormItem>
      </Form>
      <div slot="footer" class="footer_btn">
        <Button type="default" @click="modalStatus=false">取消</Button>
        <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
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
  getListSearch,
  getAddresslist,
  addOrg,
  editOrg,
  getDateList,
  deleteOrg
} from "@/api";
import { dateFormat } from "@/utils/current";
export default {
  data() {
    return {
      isEdit: "add",
      seach_panel:true,
      columns: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center",
        //   fixed: "left"
        // },
        {
          title: "机构所在区域",
          key: "areaDetail",
          align: "center",
          minWidth: 180
        },
        {
          title: "教育机构名称",
          key: "orgName",
          align: "center",
          minWidth: 200
        },
        {
          title: "负责人姓名",
          key: "principalName",
          align: "center",
          minWidth: 160
        },
        {
          title: "负责人电话号码",
          key: "principalMobile",
          align: "center",
          minWidth: 160
        },
        {
          title: "登记时间",
          key: "createdTime",
          align: "center",
          minWidth: 170
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 300,
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
      ruleValidate: {
        orgName: [
          {
            required: true,
            message: "请输入教育机构名称",
            trigger: "blur"
          }
        ],
        areaId: [
          {
            required: true,
            message: "请选择地区",
            trigger: "change",
            type: "array"
          }
        ],
        areaDetail: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur"
          }
        ],
         marketRegisterNo:[
          {
            required: true,
            message: "统一社会信用号码不能为空",
            trigger: "blur"
          }
        ],
        permissionNo:[
          {
            required: true,
            message: "办学许可证号码不能为空",
            trigger: "blur"
          }
        ],
        teacherCount:[
          {
            required: true,
            message: "教师人数不能为空",
            trigger: "blur"
          }
        ],
        studentCount:[
          {
            required: true,
            message: "学生人数不能为空",
            trigger: "blur"
          }
        ],
        nonTeacherCount:[
          {
            required: true,
            message: "非教师职工人数不能为空",
            trigger: "blur"
          }
        ],
        scopeBusiness:[
          {
            required: true,
            message: "主营范围不能为空",
            trigger: "blur"
          }
        ],
      },
      disabled:false,
      organizationType:'',
      dateStatus: false,
      dateForm: { date: "", id: "" },
      dateList: [],
      addressDataSearch: [],
      area: [],
      areaId: []
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
          this.examine_btn = '修改';
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
    add() {
      this.disabled = false;
      this.modalTitle = "创建机构 (带*号为必填项)";
      this.isEdit = "add";
      this.modalStatus = true;
      this.$refs["formItem"].resetFields();
      this.formItem = {
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
      };
    },
    handleSubmit() {
      this.$refs["formItem"].validate(valid => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.formItem));
          obj.areaId = this.formItem.areaId.join(",");
          obj.type = "EDUCATION";
          console.log(valid, obj);
          if (this.isEdit == "add") {
            if(this.formItem.permissionNo == '' && this.formItem.marketRegisterNo == ''){
              this.$Message.warning({
                top:300,
                closable:true,
                duration:3,
                content:"统一社会信用号码和办学许可证号码至少填写一个!"
              });
            }else{
              addOrg(obj).then(res => {
                if (res.code == 200) {
                  this.$Message.success({
                    top:300,
                    closable:true,
                    duration:3,
                    content:"新增机构成功!"
                  });
                  this.getTableInfo();
                  this.modalStatus = false;
                }
              });
            }
          } else if (this.isEdit == "edit") {
            if(this.formItem.permissionNo ==0 && this.formItem.marketRegisterNo == 0){
              this.$Message.warning({
                top:300,
                closable:true,
                duration:3,
                content:"统一社会信用号码和办学许可证号码至少填写一个!"
              });
            }else{
              editOrg(obj).then(res => {
                if (res.code == 200) {
                  this.$Message.success({
                    top:300,
                    closable:true,
                    duration:3,
                    content:"编辑机构成功!"
                  });
                  this.getTableInfo();
                  this.modalStatus = false;
                }
              });
            }
          }
        }
      });
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
    changeSelect() {},
    handleEveryday(row, index) {
      this.$refs["dateForm"].resetFields();
      this.dateForm.orgName = row.orgName;
      this.dateForm.con = row.principalName;
      this.dateForm.phone = row.principalMobile;
      this.dateForm.id = row.id;
      getDateList({ organizationId: row.id }).then(res => {
        if (res.code == 200) {
          if (res.result && res.result[0]) {
            this.dateStatus = true;
            this.dateList = res.result;
          } else {
            this.$Message.warning({
              top:300,
              closable:true,
              duration:3,
              content:"当前机构暂未有填报信息!"
            });
          }
        }
      });
    },
    handleSubmitDate() {
      this.$refs.dateForm.validate(valid => {
        if (valid) {
          this.$router.push({ name: "everyDay", query: this.dateForm });
        }
      });
    },
    handleReport(row, index) {
      this.$router.push({
        name: "personInfo",
        query: {
          id: row.id
        }
      });
    },
    handleEdit(row, index) {
      this.modalTitle = "编辑培训机构";
      this.isEdit = "edit";
      this.modalStatus = true;
      this.$refs["formItem"].resetFields();
      let obj = JSON.parse(JSON.stringify(row));
      this.formItem.id = obj.id;
      this.formItem.orgName = obj.orgName;
      let arr = obj.areaId.split(",");
      this.regroupAddress(arr);
      this.formItem.areaDetail = obj.areaDetail;
      this.formItem.marketRegisterNo= obj.marketRegisterNo
        this.formItem.permissionNo= obj.permissionNo
        this.formItem.teacherCount= obj.teacherCount
        this.formItem.studentCount= obj.studentCount
        this.formItem.nonTeacherCount= obj.nonTeacherCount
        this.formItem.scopeBusiness= obj.scopeBusiness

      let type = JSON.parse(sessionStorage.getItem("userInfo")).type;
      console.log(type);
      if(type !== "ORGPRINCIPAL"){
        this.disabled = true;
      }else{
        this.disabled = false;
      }
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
        content: "您确认要删除这个机构?",
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

</style>