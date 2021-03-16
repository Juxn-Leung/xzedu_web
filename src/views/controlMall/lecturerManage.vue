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
          <span>授课老师列表</span>
        </div>
        <div class="export-btn">
          <!-- <Button type="primary" icon="md-add" @click="add" v-if="menuBtns.indexOf('delete:org')>-1">添加老师</Button> -->
          <Button type="primary" icon="md-add" @click="add">添加老师</Button>
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
          <FormItem label="老师名字">
            <Input v-model="searchForm.principalName" placeholder="请输入老师名字" />
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
          <FormItem label="老师头像">
              <Upload
                ref="upload"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
                <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
            </Modal>
          </FormItem>
          
        <FormItem label="老师名称" prop="teacherName">
          <Input v-model="formItem.teacherName" placeholder="请输入老师名称" />
        </FormItem>

        <FormItem label="老师简介" style="height:200px;">
          <Input :autosize="true"  type="textarea" :rows="10" v-model="formItem.synopsis" :placeholder="disabled==true?'':'请输入老师的介绍'"/>
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
  deleteOrg,

  getLecturerList,
  getLecturerDetails,
  addLecturer,
  editLecturer,
  delLecturer
} from "@/api";
import { dateFormat} from "@/utils/current";
export default {
  data() {
    return {
      isEdit: "add",
      seach_panel:true,
      columns: [
        {
          title: "老师头像",
          key: "teacherPicture",
          align: "center",
          minWidth: 40,
		  render: (h, params) => {
			return h('img', {
				attrs: {
				    src: 'http://file.zahooedu.com/boy.png'
				},
				style: {
                    'width': '60px',
                    'height': '60px',
                    'border-radius': '50%',
                    'margin-top': '10px',
                    'margin-bottom': '10px'
			    }
			})
		  }
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
          minWidth: 180
        },
        {
          title: "教育机构名称",
          key: "orgName",
          align: "center",
          minWidth: 200
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
        teacherName: [
          {
            required: true,
            message: "请输入老师的名称",
            trigger: "blur"
          }
        ]
      },
      disabled:false,
      organizationType:'',
      dateStatus: false,
      dateForm: { date: "", id: "" },
      dateList: [],
      addressDataSearch: [],
      area: [],
      areaId: [],

    //   上传图片相关
        imgName: '',
        visible: false,
        uploadList: []
    };
  },
  created() {
    this.getUserInfo();
    this.getTableInfo();
    this.getLecturerList();
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

    getLecturerList(){
      getLecturerList(this.searchForm).then(res => {
        console.log(res);
      });
    },

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
      this.modalTitle = "新增老师";
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
              addOrg(obj).then(res => {
                if (res.code == 200) {
                  this.$Message.success({
                    top:300,
                    closable:true,
                    duration:3,
                    content:"新增老师成功!"
                  });
                  this.getTableInfo();
                  this.modalStatus = false;
                }
              });
          } else if (this.isEdit == "edit") {
              editOrg(obj).then(res => {
                if (res.code == 200) {
                  this.$Message.success({
                    top:300,
                    closable:true,
                    duration:3,
                    content:"编辑老师成功!"
                  });
                  this.getTableInfo();
                  this.modalStatus = false;
                }
            });
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

    // 确认日期
    handleSubmitDate() {
      this.$refs.dateForm.validate(valid => {
        if (valid) {
          this.$router.push({ name: "everyDay", query: this.dateForm });
        }
      });
    },

    handleEdit(row, index) {
      this.modalTitle = "编辑老师信息";
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
        content: "您确认要删除这个老师?",
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

    // 上传图片相关
    handleView (name) {
        this.imgName = name;
        this.visible = true;
    },
    handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: 'The file format is incorrect',
            desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: 'Exceeding file size limit',
            desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
    },
    handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
            this.$Notice.warning({
                title: 'Up to five pictures can be uploaded.'
            });
        }
        return check;
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