<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-23 14:14:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-30 23:11:17
-->

<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_head">
        <Tabs v-if="typex == 0" :value="$router.currentRoute.name">
          <TabPane label="新建班级" name="claszAdd"></TabPane>
        </Tabs>
        <Tabs v-if="typex == 1" :value="$router.currentRoute.name">
          <TabPane label="编辑班级" name="claszAdd"></TabPane>
        </Tabs>
      </div>

      <div class="tab_content" :style="`height:${tableHeight}px;`">
        <div class="information">
          <div class="title">
            <p>基本信息</p>
          </div>

          <Form
            ref="formItem"
            :model="formItem"
            :rules="ruleValidate"
            :label-width="180"
            style="width: 100%"
          >
            <div class="taba">
         
             
              <FormItem label="选择课程:" prop="orgName" >
                <Input
                 :disabled="shu"
                  v-model="formItem.orgName"
                  placeholder="请选择课程"
                ></Input>
              </FormItem>

              <FormItem label="班级名称:" prop="branchName">
                <Input
                :disabled="shu"
                  v-model="formItem.branchName"
                  placeholder="请输入班级名称"
                ></Input>
              </FormItem>

              <FormItem label="班级容量:" prop="branchMobile">
                <Input
                :disabled="shu"
                
                  v-model="formItem.branchMobile"
                  placeholder="请输入班级容量"
                ></Input>
              </FormItem>

               <FormItem label="上课老师:" prop="branchMobile">
                <Input
                :disabled="shu"
                
                  v-model="formItem.branchMobile"
                  placeholder="请选择上课老师"
                ></Input>
              </FormItem>
              <!-- <h5>此手机号码用于分校将作为登录系统的账号</h5> -->

              <!-- <FormItem label="机构所在区镇(街县)" prop="areaIdx">
                <Cascader
                :disabled="shu"
                  @on-visible-change="clickArea"
                  ref="cascader"
                  :data="addressData"
                  :value="formItem.areaIdx"
                  @on-change="changeArea"
                  :load-data="loadData"
                  transfer
                ></Cascader>
              </FormItem> -->

              <div class="title">
                <p>其他信息</p>
              </div>
              <FormItem></FormItem>
             <FormItem label="开班日期:" prop="createTime">
                  <DatePicker
                    type="date"
                    format="yyyy年MM月dd日"
                    placeholder="请选择"
                  
                   
                  ></DatePicker>
                </FormItem>
            
   <FormItem label="结班日期:" prop="createTime">
                  <DatePicker
                    type="date"
                    format="yyyy年MM月dd日"
                    placeholder="请选择"
                  
                   
                  ></DatePicker>
                </FormItem>
             


              <FormItem label="备注:">
                <Input
                :disabled="shu"
                  v-model="formItem.orgAddress"
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 10 }"
                  placeholder="请填写详细地址"
                ></Input>
              </FormItem>

            </div>

            <div class="btn_foot">
              <div class="btn">
                <p
                  @click="handleSubmit('formItem')"
                  style="
                    cursor: pointer;
                    border: none;
                    color: #fff;
                    background: #0056fb;
                  "
                >
                  保 存
                </p>
              </div>
              <div class="btn" style="cursor: pointer">
                <p @click="back">返 回</p>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getAddresslist,
  addCheckOrg,
  goAddCheckOrg,
  checkOrgDetail,
  updateCheckOrg,
} from "@/api";
import { Debounce } from "../../libs/util";
import { dateFormat } from "@/utils/current";
import { uploadPic } from "../../libs/ali-oss";
export default {
  inject: ["reload"],
  data() {
    return {
      isEdit: "add",
      typex: 0,
      addlenght: 2,
      shu:false,
      data: [],
      loading: true,
      tableHeight: 0,
      modalTitle: "",
      modalStatus: false,
      addressData: [],
      disabledmoblie: false,
      head: require("@/assets/login/head.png"),
      tj: require("@/assets/login/tj.png"),
      //   上传图片相关
      addressData: [],
      imgName: "",
      visible: false,
      disabled: false,
      avatarList: [],
      visible2: false,
      disabled2: false,
      avatarList2: [],
      visible3: false,
      disabled3: false,
      tipg2: false,
      tipg: false,
      avatarList3: [],
      formItem: {
        orgName: "",
        branchName: "",
        branchMobile: "",
        areaIdx: [],
        orgAddress: "",
        marketRegisterNo: "",
        permissionNo: "",
        scopeBusiness: "",
        logoImgUrl: "",
        businessImgUrl: "",
        educationImgUrl: "",
      },
      tableHeight: null,
      ruleValidate: {
        logoImgUrl: [
          {
            required: true,
            message: "请上传LOGO",
            trigger: "unbind",
            type: "array",
          },
        ],
        orgName: [
          {
            required: true,
            message: "请输入机构名称",
            trigger: "blur",
          },
        ],

        branchName: [
          {
            required: true,
            message: "请输入负责人姓名",
            trigger: "blur",
          },
        ],
        branchMobile: [
          {
            required: true,
            message: "请输入负责人联系电话",
            trigger: "blur",
          },
        ],
        areaIdx: [
          {
            required: true,
            message: "请选择地区",
            trigger: "change",
            type: "array",
          },
        ],

        orgAddress: [
          {
            required: true,
            message: "请填写详细地址",
            trigger: "blur",
          },
        ],

        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.goAddCheckOrg();
  },
  mounted() {
    this.init();
    this.getAddresslist(); //地址接口

    this.examineBtn();
    this.handleEdit();
  },
  destroyed() {
    // 销毁全局方法
    window.onresize = null;
  },
  computed: {
    ...mapState({
      menuBtns: (state) => state.menu.menuBtns,
    }),
  },
  methods: {
    // 上一步
    back() {
      this.$router.push({
        name: "clasz",
        query: {},
      });
    },

    goAddCheckOrg() {
      this.ifFinal = this.$route.query.ifFinal;
      if (this.ifFinal == 0) {
        this.disabledmoblie = true;
      } else if (this.ifFinal == 1) {
        this.disabledmoblie = false;
      }
    },

    addceshi() {
      // console.log("ccc");

      this.modalsure = false;
    },

    getTownshipList(s_id, z_id) {
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
        let newList2 = [];
        getAddresslist({
          pid: s_id,
        }).then((res) => {
          res.result.forEach((item) => {
            if (item.id == z_id) {
              newList2 = item;
              newList2.children = [];
              newList2.loading = false;
            }
          });
          getAddresslist({
            pid: z_id,
          }).then((res) => {
            newList2.children = res.result;

            addressData.children.push(newList2);
            console.log(addressData);
            this.addressData.push(addressData);
          });
        });
      });
    },

    clickAreaSearch(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        let s_id = this.data.s_id;
        let z_id = this.data.z_id;
        this.getTownshipList(s_id, z_id);
      }
    },

    examineBtn() {},

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

      if (areaId.length == 3) {
        // this.searchForm.provinceId = areaId[0];
        // this.searchForm.cityId = areaId[1];
        // this.searchForm.areaId = areaId[2];
      } else {
        // this.searchForm.provinceId = 0;
        // this.searchForm.cityId = 0;
        // this.searchForm.areaId = 0;
      }
    },
    changeArea(v, item) {
      console.log(item);
      let area = [];
      item.map((val) => {
        area.push(val.label);
      });
      let areaIdx = [];
      v.map((val) => {
        areaIdx.push(val * 1);
      });
      this.formItem.area = area;
      this.formItem.areaIdx = areaIdx;
      this.formItem.areaId = areaIdx[2];
      this.formItem.cityId = areaIdx[1];
      this.formItem.provinceId = areaIdx[0];
      console.log(this.formItem.area);
      console.log(this.formItem.areaIdx[0]);
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

    loadDataSearch(item, callback) {
      item.loading = true;
      getAddresslist({
        pid: item.id,
      }).then((res) => {
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

    init() {
      // 计算页面高度
      this.pageHeight();
      window.onresize = () => {
        this.pageHeight();
      };
    },

    pageHeight() {
      let pageHeight = Number(
        document.getElementsByClassName("single-page")[0].clientHeight
      );
      this.tableHeight = pageHeight - 90;
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
          let obj = JSON.parse(JSON.stringify(this.formItem));
          console.log(this.$route.query.ID);
          console.log(obj);
          if (this.isEdit == "add") {
            addCheckOrg(obj).then((res) => {
              console.log(res.result);
              if (res.code == 200) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "新增机构成功!",
                });
                this.$router.push({
                  name: "organ",
                  query: {},
                });
              }
            });
          } else if (this.isEdit == "edit") {
            obj.id = this.$route.query.idx;
            updateCheckOrg(obj).then((res) => {
              console.log(res.result);
              if (res.code == 200) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "编辑机构成功!",
                });
                this.$router.push({
                  name: "organ",
                  query: {},
                });
              }
            });
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    // 获取省份
    getAddresslist(id, i, arr) {
      if (this.isEdit == "add") {
        getAddresslist({
          level: 1,
        }).then((res) => {
          this.addressData = res.result;
          this.addressDataSearch = res.result;
          this.addressData.forEach((item) => {
            item.children = [];
            item.loading = false;
          });
        });
      } else if (this.isEdit == "edit") {
        return getAddresslist({
          pid: id,
        }).then((res) => {
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
    clickArea(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        this.getAddresslist();
      }
    },

    //数据--通用地址
    async regroupAddress(arr) {
      let typex = JSON.parse(sessionStorage.getItem("userInfo")).type;
      if (typex !== "EDUCATIONPRINCIPAL") {
        for (let i = 0, len = arr.length; i < len; i++) {
          await this.getAddresslist(arr[i], i, arr);
        }
      }

      let ar = [];
      arr.forEach((item) => {
        ar.push(item * 1);
      });
      this.formItem.areaIdx = ar;
    },
    handleEdit() {
      this.type = this.$route.query.id;
       this.statusx=this.$route.query.status;
       if(this.statusx==1){
          this.shu=true;
       }
      this.id = this.$route.query.idx;
      if (this.type == "edit") {
        let objc = {};
        this.typex = 1;
        objc.id = this.id;
        checkOrgDetail(objc).then((res) => {
          if (res.code == 200) {
            this.$Message.success({
              top: 300,
              closable: true,
              duration: 3,
              content: res.message,
            });
            console.log(res.result.logoImgUrl);
            this.formItem.logoImgUrl = res.result.logoImgUrl;
            this.avatarList.push(res.result.logoImgUrl);

            if (res.result.educationImgUrl !== "") {
              this.tipg2 = true;
              this.formItem.educationImgUrl = res.result.educationImgUrl;
              this.avatarList3.push(res.result.educationImgUrl);
            }

            if (res.result.businessImgUrl !== "") {
              this.tipg = true;
              this.formItem.businessImgUrl = res.result.businessImgUrl;
              this.avatarList2.push(res.result.businessImgUrl);
            }
            this.formItem.orgName = res.result.orgName;
            this.formItem.branchName = res.result.branchName;
            this.formItem.branchMobile = res.result.mobile;
            this.formItem.orgAddress = res.result.orgAddress;
            this.formItem.marketRegisterNo = res.result.marketRegisterNo;
            this.formItem.permissionNo = res.result.permissionNo;
            this.formItem.scopeBusiness = res.result.permissionNo;
            console.log(res.result.areaId);
            let arr = res.result.areaId.split(",");

            this.regroupAddress(arr);

            console.log(arr);
          } else {
            this.$Message.error({
              top: 300,
              closable: true,
              duration: 3,
              content: res.message,
            });
          }
        });

        this.isEdit = "edit";
        this.modalStatus = true;
        this.$refs["formItem"].resetFields();
      }
    },

    loadData(item, callback) {
      item.loading = true;
      getAddresslist({
        pid: item.id,
      }).then((res) => {
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

    // 上传图片相关
    eyeIcon(item) {
      this.eyeUrl = item;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url = "";
      file.name = "";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "上传头像失败!",
        desc: "这张" + file.name + " 格式不正确, 请上传 jpg 或者 png格式!",
      });
      return false;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "上传图片过大!",
        desc: "这张" + file.name + "过大, 上传小于2M的图片",
      });
    },

    avatarRemove(e) {
      let list = this.avatarList;
      let index = list.indexOf(e);
      if (index != -1) list.splice(index, 1);
      this.avatarList = list;
    },

    // LOGO图片上传
    avatarUpload(file) {
      console.log(file);

      if (file.type !== "") {
        if (file.size < 2060000) {
          let path = "data/teacher/";
          let imgList = this.avatarList;

          uploadPic(file, path).then((res) => {
            console.log(res);
            if (res.name !== "") {
              let newImg = "https://file.zahooedu.com/" + res.name;
              imgList.push(newImg);
              if (imgList.length !== 1) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "头像只能上传一张，超出1张默认选择最后一张!",
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
            this.formItem.logoImgUrl = this.avatarList;
          });
        }
      }
    },

    // 上传图片相关
    eyeIcon2(item) {
      this.eyeUrl = item;
      this.visible2 = true;
    },
    handleRemove2(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess2(res, file) {
      file.url = "";
      file.name = "";
    },
    handleFormatError2(file) {
      this.$Notice.warning({
        title: "上传头像失败!",
        desc: "这张" + file.name + " 格式不正确, 请上传 jpg 或者 png格式!",
      });
      return false;
    },
    handleMaxSize2(file) {
      this.$Notice.warning({
        title: "上传图片过大!",
        desc: "这张" + file.name + "过大, 上传小于2M的图片",
      });
    },

    avatarRemove2(e) {
      let list = this.avatarList2;
      let index = list.indexOf(e);
      if (index != -1) list.splice(index, 1);
      this.avatarList2 = list;
      this.tipg = false;
    },

    // LOGO图片上传
    avatarUpload2(file) {
      console.log(file);

      if (file.type !== "") {
        if (file.size < 2060000) {
          let path = "data/teacher/";
          let imgList = this.avatarList2;

          uploadPic(file, path).then((res) => {
            console.log(res);
            if (res.name !== "") {
              let newImg = "https://file.zahooedu.com/" + res.name;
              imgList.push(newImg);
              if (imgList.length !== 1) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "头像只能上传一张，超出1张默认选择最后一张!",
                });
                for (var i = 0; i < imgList.length - 1; i++) {
                  // 删除除了最后一个的图片地址
                  imgList.splice(0, 1);
                  console.log(imgList);
                }
                this.avatarList2 = imgList;
              } else {
                this.avatarList2 = imgList;
              }
            }
            this.tipg = true;
            this.formItem.businessImgUrl = this.avatarList2;
            console.log(this.avatarList2);
          });
        }
      }
    },

    // 上传图片相关
    eyeIcon3(item) {
      this.eyeUrl = item;
      this.visible3 = true;
    },
    handleRemove3(file) {
      this.tipg = false;
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess3(res, file) {
      file.url = "";
      file.name = "";
    },
    handleFormatError3(file) {
      this.$Notice.warning({
        title: "上传头像失败!",
        desc: "这张" + file.name + " 格式不正确, 请上传 jpg 或者 png格式!",
      });
      return false;
    },
    handleMaxSize3(file) {
      this.$Notice.warning({
        title: "上传图片过大!",
        desc: "这张" + file.name + "过大, 上传小于2M的图片",
      });
    },

    avatarRemove3(e) {
      let list = this.avatarList3;
      let index = list.indexOf(e);
      if (index != -1) list.splice(index, 1);
      this.avatarList3 = list;
      this.tipg2 = false;
    },

    // LOGO图片上传
    avatarUpload3(file) {
      console.log(file);

      if (file.type !== "") {
        if (file.size < 2060000) {
          let path = "data/teacher/";
          let imgList = this.avatarList3;

          uploadPic(file, path).then((res) => {
            console.log(res);
            if (res.name !== "") {
              let newImg = "https://file.zahooedu.com/" + res.name;
              imgList.push(newImg);
              if (imgList.length !== 1) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "头像只能上传一张，超出1张默认选择最后一张!",
                });
                for (var i = 0; i < imgList.length - 1; i++) {
                  // 删除除了最后一个的图片地址
                  imgList.splice(0, 1);
                  console.log(imgList);
                }
                this.avatarList3 = imgList;
              } else {
                this.avatarList3 = imgList;
              }
            }
            this.tipg2 = true;
            this.formItem.educationImgUrl = this.avatarList3;
            console.log(this.avatarList3);
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  float: left;
  width: 100%;

  .tab_content {
    position: relative;
    float: left;
    width: 100%;
    background: #fff;
    border-radius: 0 0 18px 18px;
    padding: 26px 38px 0 38px;
    overflow-y: auto;

    .information {
      position: relative;
      float: left;
      width: 100%;

      .title {
        position: relative;
        float: left;
        width: 100%;
        margin-bottom: 10px;

        p {
          position: relative;
          float: left;
          height: 46px;
          width: 100%;
          padding-left: 17px;
          line-height: 46px;
          font-size: 20px;
          color: #323232;
          font-weight: 550;
        }
      }

      .title::after {
        height: 18px;
        width: 4px;
        border-radius: 20px;
        background: #0056fb;
        position: absolute;
        content: "";
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
      }

      /deep/ .ivu-form {
        width: 510px;
        position: relative;
        float: left;

        .ivu-form-item {
          min-height: 46px;
          margin-bottom: 26px;

          .ivu-form-item-label {
            line-height: 46px;
            height: 46px;
            padding: 0 20px 0 0;
            font-size: 17px;
            color: #2a2a2a;
          }

          .ivu-form-item-content {
            input,
            textarea {
              background: #fff;
              border-radius: 10px;
              border: 1px solid #d9e1eb;
            }

            input {
              line-height: 46px;
              height: 46px;
            }

            textarea {
              height: 150px;
            }
          }

          .ivu-form-item-error-tip {
            left: 180px;
            top: 10px;
          }

          .ivu-radio-group {
            margin-top: 5px;

            label {
              color: #6b6b6b;
              margin-right: 28px;
            }
          }

          .ivu-checkbox-group {
            margin-top: 6px;

            label {
              color: #6b6b6b;
            }
          }

          .ivu-switch {
            margin-top: 8px;
            width: 56px;
            height: 28px;
          }

          .ivu-switch-checked {
            border-color: #689cff;
            background-color: #689cff;
          }

          .ivu-switch:after {
            width: 22px;
            height: 22px;
            left: 2px;
            top: 2px;
          }

          .ivu-switch-checked:after {
            left: 30px;
          }
        }

        h5 {
          color: #b7b7b7;
          position: relative;
          width: 100%;
          padding-left: 180px;
          font-size: 14px;
          height: 14px;
          line-height: 14px;
          margin-top: -13px;
          font-weight: 500 !important;
          margin-bottom: 10px;
        }
      }

      /deep/ .role {
        position: relative;
        float: left;
        width: 100%;
        padding: 0 12px;

        .hint {
          font-size: 14px;
          color: #787878;
          margin-top: -14px;
        }

        .ivu-radio-group {
          margin-bottom: 24px;
          margin-top: 10px;
        }

        .ivu-radio-group::before {
          content: "*";
          display: inline-block;
          margin-right: 4px;
          line-height: 1;
          font-family: SimSun;
          font-size: 14px;
          color: #ed4014;
          top: 50%;
          transform: translateY(-50%);
          left: -2px;
          position: absolute;
        }

        .ivu-radio-inner {
          border-radius: 4px !important;
        }

        .ivu-radio-inner:after {
          border-radius: 3px !important;
        }
      }

      .cont {
        position: relative;
        float: left;
        width: 100%;
        border-radius: 10px;
        border: 2px solid #d9e1eb;
        min-height: 200px;
        padding: 15px 20px;

        p {
          position: relative;
          float: left;
          width: 100%;
          color: #3e3e3e;
          font-size: 16px;
          margin-bottom: 4px;
        }

        h5 {
          position: relative;
          float: left;
          width: 100%;
          font-size: 14px;
          color: #787878;
          margin-bottom: 12px;
        }

        .ivu-tree {
          min-width: 250px;
          display: inline-block;
          position: relative;
          float: left;
        }
      }
    }

    .btn_foot {
      position: relative;
      float: left;
      width: 100%;
      margin-bottom: -30px;
      margin-top: 20px;

      .btn {
        float: right;
        position: relative;
        margin-left: 24px;

        p {
          width: 140px;
          border-radius: 4px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: #8f8f8f;
          color: 18px;
          border: 1px solid #cccccc;
        }
      }
    }
  }
}

/deep/ .ivu-upload-drag {
  border: 0px;
}

img {
  width: 100%;
}

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

.demo-upload-list2 {
  width: 185px;
  height: 201px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 185px;
    height: 201px;
    object-fit: cover;
    position: relative;
    float: left;
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

.demo-upload-list2:hover {
  .eyeIcon {
    display: block;
  }
}

.demo-upload-list2:hover::before {
  width: 185px;
  height: 201px;
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
.tjban {
  width: 185px;
  height: 201px;
  line-height: 201px;
  border: 1px solid #71a2ff;
  border-radius: 10px;
}
.tj {
  width: 50px;
  height: 50px;
  float: left;
  margin-left: 70px;
  margin-top: 50px;
}

.title_img {
  float: left;
  margin-top: -85px;
  margin-left: 66px;
  color: #71a2ff;
  height: 30px;
}

.tp {
  float: right;
  margin-right: -504px;
  margin-top: 150px;
  width: 640px;
  font-size: 13px;
}
.tpactive {
  float: right;
  margin-right: -504px;
  margin-top: -75px;
  width: 640px;
  font-size: 13px;
}
.tp a {
  float: left;
  width: 100%;
  color: #e8748a;
}

.demo-upload-list3 {
  width: 233px;
  height: 163px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 233px;
    height: 163px;
    object-fit: cover;
    position: relative;
    float: left;
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

.demo-upload-list3:hover {
  .eyeIcon {
    display: block;
  }
}

.demo-upload-list3:hover::before {
  width: 233px;
  height: 163px;
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

.tjban3 {
  width: 233px;
  height: 163px;
  line-height: 201px;
  border: 1px solid #71a2ff;
  border-radius: 10px;
}
.tj3 {
  width: 50px;
  height: 50px;
  float: left;
  margin-left: 93px;
  margin-top: 50px;
}

.title_img3 {
  float: left;
  margin-top: -85px;
  margin-left: 90px;
  color: #71a2ff;
  height: 30px;
}

.tp3 {
  float: right;
  margin-right: -550px;
  margin-top: 108px;
  width: 640px;
  font-size: 13px;
}
.tpactive3 {
  float: right;
  margin-right: -550px;
  margin-top: -67px;
  width: 640px;
  font-size: 13px;
}
.tp3 a {
  float: left;
  width: 100%;
  color: #e8748a;
}

.taba {
  width: 510px;
  position: relative;
  float: left;
}
.xin {
  float: left;
  color: red;
  font-size: 18px;
  margin-top: -80px;
  margin-left: 95px;
}


/deep/ .ivu-input-suffix {
  top: 7px;
}

/deep/ .ivu-select-single .ivu-select-selection {
  height: 46px;
  position: relative;
  border-radius: 10px;
}

/deep/ .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  display: block;
  height: 46px;
  line-height: 46px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 8px;
  padding-right: 24px;
}

/deep/ .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  display: block;
  height: 46px;
  line-height: 46px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 8px;
  padding-right: 24px;
}
.ivu-date-picker {
  
    width: 100%;
}
</style>
