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
          <span>班级签名列表</span>
        </div>
     
      </div>
      <Divider style="margin: 10px 0;" />
    </Row>
    <!-- 搜索 -->
    <Row>
      <div class="search" v-if="seach_panel">
        <Form
          :model="searchForm"
          ref="searchForm"
          style="display: flex; float: left;"
          :label-width="100"
        >
          <!-- <FormItem label="省市区" v-if="showAddInput==3">
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
          <FormItem
            label="省市区"
            v-else-if="showAddInput==1"
          >
            <Cascader
              :data="addressData"
              :value="areaId2"
              v-model="areaId2"
              @on-change="changeCascader"
              transfer
            ></Cascader>
          </FormItem> -->

          <FormItem label="班级名称" style="width:360px;">
            <Input
              v-model="searchForm.className"
              placeholder="请输入班级名称关键字"
              @input="keyInput"
            />
          </FormItem>
        </Form>
        <div style="float: right; margin: 11px 0;">
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
        <!-- <template slot="action" slot-scope="{ row, index }">
      
             <Button
            type="primary"
            size="small"
            style="margin-right: 6px;"
            @click="handle(row, index)"
            >查看</Button>


            
        
        </template> -->
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
          :page-size-opts="[10, 20, 50]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </Row>
    <!-- 新建&编辑弹框 -->
    <Modal v-model="modalStatus" :title="modalTitle" :closable="false" :mask-closable="false">
      <Form
        ref="formItem"
        :model="formItem"
        :label-width="90"
        :rules="ruleValidate"
        :disabled="disabled"
      >
        <FormItem label="老师头像">
          <div class="demo-upload-list" v-for="(item,index) in avatarList" :key="index">
            <template v-if="item !== ''">
              <img :src="item" />
              <Icon
                v-if="disabled == false"
                class="removeIcon"
                type="ios-close-circle"
                @click="avatarRemove(item)"
              />
              <Icon
                class="eyeIcon"
                type="ios-eye-outline"
                @click.native="eyeIcon(item)"
              ></Icon>
            </template>
          </div>
          <Upload
            v-if="avatarList.length < 1"
            ref="upload"
            :on-success="handleSuccess"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="avatarUpload"
            multiple
            type="drag"
            action=""
            style="display: inline-block; width: 58px;"
          >
            <div style="width: 58px; height: 58px; line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="View Image" v-model="visible">
            <img :src="eyeUrl" v-if="visible" style="width: 100%;" />
          </Modal>
        </FormItem>

        <FormItem label="所在机构">
            <Select
              v-if="disabled==false"
              v-model="formItem.orgId"
              :value="formItem.orgId"
              transfer
              @on-change="changeOrganization"
            >
              <Option v-for="(item , index) in organizationList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
            <Input v-else v-model="formItem.orgName" placeholder="" />
        </FormItem>

        <FormItem label="老师姓名" prop="name">
          <Input v-model="formItem.name" placeholder="请输入老师名称" />
        </FormItem>

        <FormItem label="任教年级" prop="gradeIds">
          <Select 
          v-model="formItem.gradeIds"
          multiple
          @on-change="changeGrade">
            <Option 
            v-for="(item , index) in gradeList" 
            :value="item.id"
            :key="index">{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem label="任教科目" prop="subjectId">
          <Select 
          v-model="formItem.subjectId"
          @on-change="changeSubject">
            <Option 
            v-for="(item , index) in subjectList" 
            :value="item.id" 
            :key="index">{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem label="简介" prop="profile">
          <Input
            :autosize="true"
            type="textarea"
            :rows="3"
            v-model="formItem.profile"
            :placeholder="disabled == true ? '' : '请输入老师的简介'"
          />
        </FormItem>

        <FormItem label="教龄" prop="teacherYears">
          <Input v-model="formItem.teacherYears" placeholder="请输入老师的教龄" />
        </FormItem>

        <FormItem label="教学成果" prop="gain">
          <Input
            :autosize="true"
            type="textarea"
            :rows="10"
            v-model="formItem.gain"
            :placeholder="disabled == true ? '' : '请输入老师的教学成果'"
          />
        </FormItem>
        
        <FormItem label="教学经验" prop="experience">
          <Input
            :autosize="true"
            type="textarea"
            :rows="10"
            v-model="formItem.experience"
            :placeholder="disabled == true ? '' : '请输入老师的教学经验'"
          />
        </FormItem>

        <FormItem label="教学特点" prop="feature">
          <Input
            :autosize="true"
            type="textarea"
            :rows="10"
            v-model="formItem.feature"
            :placeholder="disabled == true ? '' : '请输入老师的教学特点'"
          />
        </FormItem>
        
      </Form>
      <div slot="footer" class="footer_btn">
        <Button
          type="default"
          @click="
            modalStatus = false;
            avatarList = [];
          "
          >取消</Button
        >
        <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
    <!-- 选择日期弹框 -->
    <Modal
      v-model="dateStatus"
      title="选择日期查看当日列表"
      :mask-closable="false"
    >
      <Form ref="dateForm" :model="dateForm">
        <FormItem
          label="选择日期:"
          prop="date"
          :label-width="90"
          :rules="{ required: true, message: '请选择日期', trigger: 'change' }"
        >
          <Select v-model="dateForm.date">
            <Option
              v-for="(item, index) in dateList"
              :key="index"
              :value="item"
              >{{ item }}</Option
            >
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="default" @click="dateStatus = false">取消</Button>
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

  getGradeList,
  getSubjectList,
  getMyOrgList,
  getLecturerList,
  signlist,
  getLecturerDetails,
  addLecturer,
  editLecturer,
  delLecturer
} from "@/api";
import { dateFormat } from "@/utils/current";
import { uploadPic } from "../../libs/ali-oss";
export default {
  data () {
    return {
      isEdit: "add",
      seach_panel: true,
      columns: [
        // {
        //   title: "头像",
        //   key: "signImg",
        //   align: "center",
        //   minWidth: 40,
        //   render: (h, params) => {
        //     return h('img', {
        //       attrs: {
        //         src:params.row.signImg
        //       },
        //       style: {
        //         'width': '60px',
        //         'height': '60px',
        //         'border-radius': '50%',
        //         'margin-top': '10px',
        //         'margin-bottom': '10px'
        //       }
        //     })
        //   }
        // },

         {
           title: "序号",
          type: 'index',
         
          align: 'center',
            minWidth: 60
          },
             {
          title: "学校名称",
          key: "schoolName",
          align: "center",
          minWidth: 120
        },
        {
          title: "班级名称",
          key: "className",
          align: "center",
          minWidth: 60
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth: 60
        },
      //  {
      //     title: "电话",
      //     key: "phone",
      //     align: "center",
      //     minWidth: 80
      //   },
       
        // {
        //   title: "时间",
        //   key: "time",
        //   align: "center",
        //   minWidth: 100
        // },
        // {
        //   title: "操作",
        //   slot: "action",
        //   align: "center",
        //   width: 400,
        //   fixed: "right"
        // }
      ],
      data: [],
      loading: true,
      tableHeight: 0,
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        className:''
      },
      total: 0,
      modalTitle: "",
      modalStatus: false,
      addressData: [],
      formItem: {
        name: '',
        type: this.organizationType,
        profile: '',
        id: '',
        headImg: '',
        areaName: '',
        createTime: '',
        orgId:'',
        profile:'',
        subjectId:'',
        gradeIds:[],
        teacherYears:'',
        gain:'',
        experience:'',
        feature:'',

      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入老师的名称",
            trigger: "blur"
          }
        ],
        profile:[
          {
            required: true,
            message: "请输入老师简介",
            trigger: "blur"
          }
        ],
        subjectId:[{
          required: true,
          message: "请选择科目",
          trigger: "change",
          type:'number'
        }],
        gradeIds:[{
          required: true,
          message: "请选择年级",
          trigger: "change",
          type: "array"
        }]
      },
      disabled: false,
      organizationType: '',
      dateStatus: false,
      dateForm: { date: "", id: "" },
      dateList: [],
      addressDataSearch: [],
      area: [],
      areaId: [],
      // 判断显示哪个下拉框 0 = 区级/镇级教育局，不显示 ; 1 = 市级教育局，可以选择 区/镇 ; 2 = 省级教育局，可以选 市，区/镇 ; 3 = admin ，可以选 省，市，区/镇。
      showAddInput: 0,
      s_id: "",
      z_id: "",
      q_id: "",
      areaId2: [],

      //   上传图片相关
      imgName: '',
      visible: false,
      avatarList: [],

      organizationList:[],
      gradeList: [],
      subjectList: [],
    };
  },
  created () {
    this.getUserInfo();
    // this.getLecturerList();
    this.signlist();
    this.getMyOrgList();
    this.getGradeList();
    this.getSubjectList();
  },
  mounted () {
    this.init();
    //this.getAddresslist(); //地址接口
    this.examineBtn();
  },
  destroyed () {
    // 销毁全局方法
    window.onresize = null;
  },
  computed: {
    ...mapState({
      menuBtns: state => state.menu.menuBtns
    })
  },
  methods: {

    getUserInfo () {
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
      } else if (type == "ORGPRINCIPAL" || type == "TRUSTEESHIPORGPRINCIPAL") {
        let id0 = addId_list[0];
        let id1 = addId_list[1];
        let id2 = addId_list[2];
        s_id = parseInt(id0);
        z_id = parseInt(id1);
        // q_id = parseInt(id2);
        q_id = 0;
      }
      // else if(addId_list.length ==1){
      //   // 省级教育局
      //   var id0 = addId_list[0];
      //   var s_id = Integer.parseInt(id0);
      //   this.getCityList(s_id);
      // }
    //   this.searchForm.provinceId = s_id;
    //   this.searchForm.cityId = z_id;
      this.searchForm.areaId = q_id;
      this.searchForm.schoolId=this.$route.params.schoolId;
      this.searchForm.className=this.$route.params.className;
       this.searchForm.type=this.$route.params.type;
    //   console.log("获取路由"+this.$route.params.id)
      //  let id = this.$route.params.id;
      this.organizationType = type;
      console.log(this.showAddInput);
    },

    getMyOrgList(){
      getMyOrgList().then(res => {
        console.log(res);
        if(res.code == 200){
          let list = [];
          for(var i in res.result){
            list.push(res.result[i]);
          }
          this.organizationList = list;
          console.log(this.organizationList)
        }
      });
    },

    changeOrganization(e){
      console.log(e);
      this.formItem.orgId = e;
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

    signlist () {
      console.log('获取'+this.searchForm);
      signlist(this.searchForm).then(res => {
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

    // clickAreaSearch (val) {
    //   console.log(val, this.addressData, "点击了");
    //   if (val && !this.addressData[0]) {
    //     this.getAddresslist();
    //   }
    // },

    clickAreaSearch(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        let s_id = this.data.s_id;
        let z_id = this.data.z_id;
        this.getTownshipList(s_id, z_id);
      }
    },

    examineBtn () {
      // 判断编辑按钮是否为查看
    
        this.examine_btn = '查看';
        this.seach_panel = true;
      
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

    changeCascader(e){
      console.log(e);
      this.searchForm.provinceId = e[0];
      this.searchForm.cityId = e[1];
      this.searchForm.areaId = e[2];
    },

    loadDataSearch (item, callback) {
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
    init () {
      // 计算页面高度
      this.pageHeight();
      window.onresize = () => {
        this.pageHeight();
      };
    },
    /**
     * 页面&表格高度
     */
    pageHeight () {
      let pageHeight = Number(
        document.getElementsByClassName("single-page")[0].clientHeight
      );
      let headerHeight = this.$refs.header.clientHeight;
      let footerHeight = this.$refs.footer.clientHeight;
      this.tableHeight = pageHeight - headerHeight - footerHeight - 123;
    },
    add () {
      this.disabled = false;
      this.modalTitle = "新增老师";
      this.isEdit = "add";
      this.modalStatus = true;
      this.$refs["formItem"].resetFields();
      this.formItem = {
        areaId: [],
        name: "",
        type: this.organizationType,
        headImg: "",
        profile:'',
        subjectId:'',
        gradeIds:[],
        teacherYears:'',
        gain:'',
        experience:'',
        feature:''
      };
    },
    handleSubmit () {
      this.$refs["formItem"].validate(valid => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.formItem));
          console.log(obj);
          obj.name = this.formItem.name;
          obj.orgId = this.formItem.orgId;
          obj.headImg = this.avatarList[0];
          obj.subjectId = this.formItem.subjectId;
          obj.gradeIds = this.formItem.gradeIds;
          obj.profile = this.formItem.profile;
          obj.teacherYears = this.formItem.teacherYears;
          obj.gain = this.formItem.gain;
          obj.experience = this.formItem.experience;
          obj.feature = this.formItem.feature;
          
          if(obj.headImg !=='' && obj.headImg !==undefined && obj.headImg !== null && obj.orgId !=='' && obj.orgId !==undefined && obj.orgId !== null){
            console.log(obj);
            if (this.isEdit == "add") {
              addLecturer(obj).then(res => {
                if (res.code == 200) {
                  this.$Message.success({
                    top: 300,
                    closable: true,
                    duration: 3,
                    content: "新增老师成功!"
                  });
                  this.getLecturerList();
                  this.modalStatus = false;
                  // 清空头像
                  this.avatarList = [];
                }else{
                   this.$Message.error({
                    top: 300,
                    closable: true,
                    duration: 3,
                    content: res.message
                  });
                }
              });
            } else if (this.isEdit == "edit") {
              if(this.disabled==true){
                // 查看老师
                this.getLecturerList();
                this.modalStatus = false;
                // 清空头像
                this.avatarList = [];
              }else{
                // 编辑老师
                obj.id = this.formItem.id;
                editLecturer(obj).then(res => {
                  if (res.code == 200) {
                    this.$Message.success({
                      top: 300,
                      closable: true,
                      duration: 3,
                      content: "编辑老师成功!"
                    });
                    this.getLecturerList();
                    this.modalStatus = false;
                    // 清空头像
                    this.avatarList = [];
                  }
                }); 
              }
            }else{
                  this.getLecturerList();
                  this.modalStatus = false;
                  // 清空头像
                  this.avatarList = [];
            }
          }else{
            if(obj.orgId =='' || obj.orgId ==undefined || obj.orgId == null){
              this.$Message.error({
              top: 300,
              closable: true,
              duration: 3,
              content: "请选择所在机构!"
            });
            }else{
              this.$Message.error({
              top: 300,
              closable: true,
              duration: 3,
              content: "请上传老师图片!"
            });
            }
          }
        }
      });
    },
    handleSearch () {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.signlist();
    },
    handleReset () {
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
      this.signlist();
    },

    // 确认日期
    handleSubmitDate () {
      this.$refs.dateForm.validate(valid => {
        if (valid) {
          this.$router.push({ name: "everyDay", query: this.dateForm });
        }
      });
    },

   //查看班级签名列表


     handle (row, index) {
       console.log(row);

         let id = row.id;
        console.log(id);
        this.$router.push({ name: "gradeManger", params:{id:id} });

     },




    handleEdit (row, index) {
      console.log(row);
      this.isEdit = "edit";
      this.modalStatus = true;
      this.$refs["formItem"].resetFields();
      let obj = JSON.parse(JSON.stringify(row));

      this.formItem.headImg = obj.headImg;
      this.avatarList.push(obj.headImg);
      this.formItem.id = obj.id;
      this.formItem.name = obj.name;
      this.formItem.profile = obj.profile;
      this.formItem.orgId = obj.orgId;
      this.formItem.orgName = obj.orgName;
      this.formItem.subjectId = obj.subjectId;
      this.formItem.gradeIds = obj.gradeIds;      
      this.formItem.teacherYears = obj.teacherYears;
      this.formItem.gain = obj.gain;
      this.formItem.experience = obj.experience;
      this.formItem.feature = obj.feature;
          

      let type = JSON.parse(sessionStorage.getItem("userInfo")).type;
      console.log(type);
      if (type !== "ORGPRINCIPAL" && type !== "TRUSTEESHIPORGPRINCIPAL") {
        this.disabled = true;
        this.modalTitle = "查看老师信息";
      } else {
        this.disabled = false;
        this.modalTitle = "编辑老师信息";
      }
    },

    // handleDelete (row, index) {
    //   this.$Modal.confirm({
    //     title: "确认删除",
    //     content: "您确认要删除这个老师?",
    //     onOk: () => {
    //       delLecturer({ id: row.id }).then(res => {
    //         if (res.code == 200) {
    //           this.$Message.success({
    //             top: 300,
    //             closable: true,
    //             duration: 3,
    //             content: "删除成功!"
    //           });
    //           this.getLecturerList();
    //           // 清空头像
    //             this.avatarList = [];
    //         }else{
    //           this.$Message.error({
    //             top: 300,
    //             closable: true,
    //             duration: 3,
    //             content:res.message
    //           });
    //         }
    //       });
    //     }
    //   });
    // },
    // 获取省份
    getAddresslist (id, i, arr) {
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
    clickArea (val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        this.getAddresslist();
      }
    },

    loadData (item, callback) {
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
    changePage (e) {
      this.searchForm.pageNumber = e;
      this.signlist();
    },
    changePageSize (e) {
      this.searchForm.pageSize = e;
      this.signlist();
    },
    keyInput(e){
      this.searchForm.className = e;
      console.log(this.searchForm.className);
    },

    // 上传图片相关
    eyeIcon (item) {
      this.eyeUrl = item;
      this.visible = true;
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
      file.url = '';
      file.name = '';
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

    avatarRemove (e) {
      let list = this.avatarList;
      let index = list.indexOf(e);
      if (index != -1)
        list.splice(index, 1);
      this.avatarList = list;
    },

    // 图片 上传
    avatarUpload (file) {
      console.log(file);
      let path = 'data/teacher/';
      let imgList = this.avatarList;
      
      uploadPic(file, path).then(res => {
        console.log(res);
        if (res.name !== '') {
          let newImg = 'https://file.zahooedu.com/' + res.name;
          imgList.push(newImg);
          if (imgList.length !== 1) {
            this.$Message.success({
              top: 300,
              closable: true,
              duration: 3,
              content: "头像只能上传一张，超出1张默认选择最后一张!"
            });
            for (var i = 0; i < imgList.length - 1; i++) {
              // 删除除了最后一个的图片地址
              imgList.splice(0, 1);
              console.log(imgList);
            }
            this.avatarList = imgList;
          } else {
            this.avatarList = imgList;
          }
        }
        console.log(this.avatarList);
      });
    },

    getGradeList(){
      getGradeList().then(res=>{
        console.log(res);
        this.gradeList = res.result;
      });
    },

    getSubjectList(){
      getSubjectList().then(res=>{
        console.log(res);
        this.subjectList = res.result;
      });
    },

    changeSubject(e){
      console.log(e);
      this.formItem.subjectId = e;
      console.log(this.formItem.subjectId);
    },

    changeGrade(e){
      console.log(e);
      this.formItem.gradeIds = e;
      console.log(this.formItem.gradeIds);
    },
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

.footer_btn {
  .ivu-btn {
    height: 40px;
    width: 40%;
    margin-right: 6.66666%;
  }
}

.ivu-table-row .ivu-btn {
  width: 72px;
}

textarea.ivu-input {
  height: 160px;
}

// 表单样式
.demo-upload-list {
  width: 58px;
  height: 58px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 58px;
    height: 58px;
    object-fit: cover;
    position: relative;
    float: left;
    border-radius: 50%;
  }

  .removeIcon {
    position: absolute;
    right: -7px;
    top: -7px;
    color: red;
    font-size: 16px;
    z-index: 8;
  }

  .eyeIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
    z-index: 7;
    font-weight: 550;
    display: none;
  }
}

.demo-upload-list:hover {
  .eyeIcon {
    display: block;
  }
}

.demo-upload-list:hover::before {
  width: 58px;
  height: 58px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #ffffff, $alpha: 0.6);
  content: "";
  display: block;
  z-index: 6;
}

textarea.ivu-input {
  height: 160px;
}
</style>