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
        <Tabs :value="$router.currentRoute.name">
          <TabPane label="认证信息" name="persCertificate"></TabPane>
        </Tabs>
      </div>

      <div class="tab_content" :style="`height:${tableHeight}px;`">
        <!--  -->
        <div class="yuan_first">
          <div class="yuan_lan">
            <!-- <Steps :current="current" :size="60">
            <Step class="blue" title="填写基本信息" style="width: 25%"> </Step>
            <Step class="blue" title="填写经营信息" style="width: 25%"> </Step>
          </Steps> -->
            <div
              class="yuan"
              :class="{ tabsactive: current == 0 || current == 1 }"
            >
              1
            </div>
            <div
              class="yuan_xian"
              :class="{ tabsactivexian: current == 1 }"
            ></div>
            <div class="yuan" :class="{ tabsactive: current == 1 }">2</div>
            <div class="yuan_title">
              <div class="tit1">填写基本信息</div>
              <div class="tit2" :class="{ tabsactiveti: current == 1 }">
                填写经营信息
              </div>
            </div>
          </div>
        </div>

        <div v-show="current === 0">
          <div class="information">
            <div class="title">
              <p>基本信息</p>
            </div>

            <Form
              ref="formData1"
              :model="formData1"
              :rules="ruleValidate"
              :label-width="180"
              style="width: 100%"
            >
              <div class="taba">
                <FormItem label="姓名:" prop="principalName">
                  <Input
                    :disabled="shu"
                    v-model="formData1.principalName"
                    placeholder="请输入姓名"
                  ></Input>
                </FormItem>

                <FormItem label="身份证号码:" prop="principalIdentityId">
                  <Input
                    v-model="formData1.principalIdentityId"
                    placeholder="请输入身份证号码"
                  ></Input>
                </FormItem>

                <FormItem label="联系电话:" prop="principalMobile">
                  <Input
                    :disabled="shu"
                    v-model="formData1.principalMobile"
                    placeholder="请输入联系电话"
                  ></Input>
                </FormItem>

                <!-- <FormItem label="机构所在区镇(街县)" prop="areaIdx">
                  <Cascader
                    @on-visible-change="clickArea"
                    ref="cascader"
                    :data="addressData"
                    :value="formItem.areaIdx"
                    @on-change="changeArea"
                    :load-data="loadData"
                    transfer
                  ></Cascader>
                </FormItem> -->
                <!-- 
                <FormItem prop="orgAddress">
                  <Input
                    v-model="formItem.orgAddress"
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 10 }"
                    placeholder="请填写详细地址"
                  ></Input>
                </FormItem> -->

                <!-- <div class="title">
                  <p>资质信息</p>
                </div>
                <FormItem></FormItem>
                <FormItem label="统一社会信用代码:">
                  <Input
                    v-model="formItem.marketRegisterNo"
                    placeholder="请输入统一社会信用代码"
                  ></Input>
                </FormItem>

                <h5 style="color: #7aa8ff">
                  请输入15位登记证书号或18位的统一社会信用代码
                </h5> -->

                <FormItem label="举办人身份证照:" prop="img">
                  <div
                    class="demo-upload-list3"
                    v-for="(item, index) in avatarList2"
                    :key="index"
                  >
                    <template v-if="item !== ''">
                      <img :src="item" />
                      <Icon
                        v-if="disabled2 == false"
                        class="removeIcon"
                        type="ios-close-circle"
                        @click="avatarRemove2(item)"
                      />
                      <Icon
                        class="eyeIcon"
                        type="ios-eye-outline"
                        @click.native="eyeIcon2(item)"
                      ></Icon>
                    </template>
                  </div>
                  <Upload
                    v-if="avatarList2.length < 1"
                    ref="upload"
                    :on-success="handleSuccess2"
                    :format="['jpg', 'png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError2"
                    :on-exceeded-size="handleMaxSize2"
                    :before-upload="avatarUpload2"
                    multiple
                    type="drag"
                    action
                    style="display: inline-block; width: 233px"
                  >
                    <div class="tjban3">
                      <img :src="tj" class="tj3" />
                      <div class="title_img3">点击上传</div>
                    </div>
                  </Upload>
                  <Modal title="查看" :closable="false" v-model="visible2">
                    <img :src="eyeUrl" v-if="visible2" style="width: 100%" />
                  </Modal>

                  <p class="tp3" :class="{ tpactive3: tipg == true }">
                    <a
                      >请注意保持清晰各项描述可见，且申请时间在有效范围时间之内</a
                    >
                    <a
                      >文件小于20M，支持jpg、gif、png或bmp格式的图片支持jpg、jpeg、bmp、gif、png格式照片，大小不超过5M</a
                    >
                  </p>
                </FormItem>
                <div class="xin">*</div>
                <FormItem>
                  <div
                    class="demo-upload-list3"
                    v-for="(item, index) in avatarList1"
                    :key="index"
                  >
                    <template v-if="item !== ''">
                      <img :src="item" />
                      <Icon
                        v-if="disabled1 == false"
                        class="removeIcon"
                        type="ios-close-circle"
                        @click="avatarRemove1(item)"
                      />
                      <Icon
                        class="eyeIcon"
                        type="ios-eye-outline"
                        @click.native="eyeIcon1(item)"
                      ></Icon>
                    </template>
                  </div>
                  <Upload
                    v-if="avatarList1.length < 1"
                    ref="upload"
                    :on-success="handleSuccess1"
                    :format="['jpg', 'png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError1"
                    :on-exceeded-size="handleMaxSize1"
                    :before-upload="avatarUpload1"
                    multiple
                    type="drag"
                    action
                    style="display: inline-block; width: 233px"
                  >
                    <div class="tjban3">
                      <img :src="tj" class="tj3" />
                      <div class="title_img3">点击上传</div>
                    </div>
                  </Upload>
                  <Modal title="查看" :closable="false" v-model="visible1">
                    <img :src="eyeUrl" v-if="visible1" style="width: 100%" />
                  </Modal>

                  <p class="tp3" :class="{ tpactive3: tipg1 == true }">
                    <a
                      >请注意保持清晰各项描述可见，且申请时间在有效范围时间之内</a
                    >
                    <a
                      >文件小于20M，支持jpg、gif、png或bmp格式的图片支持jpg、jpeg、bmp、gif、png格式照片，大小不超过5M</a
                    >
                  </p>
                </FormItem>

                <FormItem>
                  <div
                    class="demo-upload-list3"
                    v-for="(item, index) in avatarList3"
                    :key="index"
                  >
                    <template v-if="item !== ''">
                      <img :src="item" />
                      <Icon
                        v-if="disabled3 == false"
                        class="removeIcon"
                        type="ios-close-circle"
                        @click="avatarRemove3(item)"
                      />
                      <Icon
                        class="eyeIcon"
                        type="ios-eye-outline"
                        @click.native="eyeIcon3(item)"
                      ></Icon>
                    </template>
                  </div>
                  <Upload
                    v-if="avatarList3.length < 1"
                    ref="upload"
                    :on-success="handleSuccess3"
                    :format="['jpg', 'png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError3"
                    :on-exceeded-size="handleMaxSize3"
                    :before-upload="avatarUpload3"
                    multiple
                    type="drag"
                    action
                    style="display: inline-block; width: 233px"
                  >
                    <div class="tjban3">
                      <img :src="tj" class="tj3" />
                      <div class="title_img3">点击上传</div>
                    </div>
                  </Upload>
                  <Modal title="查看" :closable="false" v-model="visible3">
                    <img :src="eyeUrl" v-if="visible3" style="width: 100%" />
                  </Modal>

                  <p class="tp3" :class="{ tpactive3: tipg2 == true }">
                    <a
                      >请注意保持清晰各项描述可见，且申请时间在有效范围时间之内</a
                    >
                    <a
                      >文件小于20M，支持jpg、gif、png或bmp格式的图片支持jpg、jpeg、bmp、gif、png格式照片，大小不超过5M</a
                    >
                  </p>
                </FormItem>
              </div>
            </Form>
          </div>
        </div>

        <div v-show="current === 1">
          <div class="information">
            <div class="title">
              <p>基本信息</p>
            </div>

            <Form
              ref="formData2"
              :model="formData2"
              :rules="ruleValidate2"
              :label-width="180"
              style="width: 100%"
            >
              <div class="taba">
                <FormItem
                  label="培训类别"
                  style="width: 855px"
                  prop="trainType"
                >
                  <CheckboxGroup v-model="formData2.trainType">
                    <Checkbox
                      v-for="item in questionTypes"
                      :label="item.id"
                      :key="item.id"
                      ref="checkboxGroup"
                    >
                      <span>{{ item.name }}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>

                <FormItem label="联系人姓名:" prop="contactsName">
                  <Input
                    v-model="formData2.contactsName"
                    placeholder="请输入联系人姓名"
                  ></Input>
                </FormItem>

                <FormItem label="联系人电话:" prop="contactsMobile">
                  <Input
                    v-model="formData2.contactsMobile"
                    placeholder="请输入联系人电话"
                  ></Input>
                </FormItem>

                <FormItem label="店铺名称">
                  <Input
                    v-model="formData2.storeName"
                    placeholder="请输入店铺名称"
                  ></Input>
                </FormItem>

                <FormItem label="经营地址">
                  <Cascader
                    @on-visible-change="clickArea"
                    ref="cascader"
                    :data="addressData"
                    :value="formData2.areaIdx"
                    @on-change="changeArea"
                    :load-data="loadData"
                    transfer
                  ></Cascader>
                </FormItem>

                <FormItem>
                  <Input
                    v-model="formData2.orgAddress"
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 10 }"
                    placeholder="请填写详细地址"
                  ></Input>
                </FormItem>

                <FormItem label="培训学科">
                  <Input
                    v-model="formData2.pmSchoolSubject"
                    placeholder="请输入培训学科"
                  ></Input>
                </FormItem>
              </div>
            </Form>
          </div>
        </div>

        <div class="btn_foot">
          <div style="float: right">
            <Button
              style="
                margin-right: 24px;
                width: 140px;
                border-radius: 4px;
                height: 50px;
              "
              @click="back"
              v-if="current === 0"
              >取消</Button
            >
            <Button
              style="
                margin-right: 24px;
                width: 140px;
                border-radius: 4px;
                height: 50px;
              "
              @click="prev"
              v-if="current > 0"
              >上一步</Button
            >
            <Button
              style="
                float: right;
                margin-right: 37px;
                width: 140px;
                border-radius: 4px;
                height: 50px;
                background: rgb(0, 86, 251);
              "
              type="primary"
              @click="next()"
              v-if="current < 1"
              >下一步</Button
            >
            <Button
              style="
                float: right;
                margin-right: 37px;
                width: 140px;
                border-radius: 4px;
                height: 50px;
                background: rgb(0, 86, 251);
              "
              type="primary"
              @click="handleSubmit('formData2')"
              v-if="current === 1"
              >确认提交</Button
            >
          </div>
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
  personalAuthenAdd,
  goAddCheckOrg,
  checkOrgDetail,
  authenDetail,
  orgAttrs,
} from "@/api";
import { Debounce } from "../../libs/util";
import { dateFormat } from "@/utils/current";
import { uploadPic } from "../../libs/ali-oss";
export default {
  inject: ["reload"],
  data() {
    return {
      //步骤条
      current: 0,
      isEdit: "add",
      addlenght: 2,
      data: [],
      loading: true,
      shu: false,
      tableHeight: 0,
      modalTitle: "",
      modalStatus: false,
      addressData: [],
      questionTypes: [],
      head: require("@/assets/login/head.png"),
      tj: require("@/assets/login/tj.png"),
      //   上传图片相关
      addressData: [],
      imgName: "",
      visible: false,
      disabled: false,
      avatarList1: [],
      visible2: false,
      disabled2: false,
      disabled1: false,
      avatarList2: [],
      visible3: false,
      visible1: false,
      disabled3: false,
      tipg2: false,
      tipg: false,
      tipg1: false,
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

        businessImgUrl: "",
        educationImgUrl: "",
      },
      formData2: {
        trainType: [],
        contactsName: "",
        contactsMobile: "",
        storeName: "",
        areaIdx: [],
        orgAddress: "",
        pmSchoolSubject: "",
      },
      formData1: {
        principalName: "",
        principalIdentityId: "",
        principalMobile: "",

        orgAddress: "",
        marketRegisterNo: "",
        permissionNo: "",
        scopeBusiness: "",
        identityFaceImg: "",
        identityNationalEmblemImg: "",
        identityInHoldImg: "",
      },
      tableHeight: null,
      ruleValidate: {
        principalName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],

        principalIdentityId: [
          {
            required: true,
            message: "请输入身份证号码",
            trigger: "blur",
          },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "你的身份证格式不正确",
          },
        ],
        principalMobile: [
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

      ruleValidate2: {
        contactsName: [
          {
            required: true,
            message: "请输入联系人姓名",
            trigger: "blur",
          },
        ],
        contactsMobile: [
          { required: true, message: "请输入联系人电话", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],

        contactsMobile: [
          {
            required: true,
            message: "请输入联系人电话",
            trigger: "blur",
          },
        ],
        trainType: [
          {
            required: true,
            type: "array",

            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.goAddCheckOrg();
    this.orgAttrs();
    this.authenDetail();
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
    checkAllGroupChange(data1, data2) {
      console.log(data1);
      console.log(data2);
    },
    orgAttrs() {
      orgAttrs().then((res) => {
        if (res.code == 200) {
          console.log(res.result.trainTypes);
          this.questionTypes = res.result.trainTypes;
        }
      });
    },
    prev() {
      if (this.current > 0) {
        this.current--;
        document.querySelector(".yuan_first").scrollIntoView(true);
      }
    },
    // 下一步
    next() {
      if (this.current === 0) {
        this.$refs["formData1"].validate((valid) => {
          if (valid) {
            if (
              this.formData1.identityFaceImg !== "" &&
              this.formData1.identityInHoldImg !== "" &&
              this.formData1.identityNationalEmblemImg !== ""
            ) {
              document.querySelector(".yuan_first").scrollIntoView(true);
              this.current++;
            } else {
              this.$Message.error({
                top: 300,
                closable: true,
                duration: 3,
                content: "请上传完整身份信息!",
              });
            }
          }
        });
      } else if (this.current === 1) {
        this.current++;
        // this.$refs['formData2'].validate(valid => {
        //   if (valid) {
        //     this.current++
        //   }
        // })
      }
    },

    // 上一步
    back() {
      this.$router.push({
        name: "accrInstitution",
        query: {},
      });
    },

    goAddCheckOrg() {
      goAddCheckOrg().then((res) => {
        if (res.code == 200) {
          console.log(res.result);
        }
      });
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
      this.formData2.area = area;
      this.formData2.areaIdx = areaIdx;
      this.formData2.areaId = areaIdx[2];
      this.formData2.cityId = areaIdx[1];
      this.formData2.provinceId = areaIdx[0];
      console.log(this.formData2.area);
      console.log(this.formData2.areaIdx[0]);
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
          let obj = this.formData2;
          let objx = JSON.parse(JSON.stringify(this.formData1));
          console.log(this.$route.query.ID);
          console.log(obj);
          console.log(objx);
          obj.identityFaceImg = this.formData1.identityFaceImg;
          obj.identityNationalEmblemImg = this.formData1.identityNationalEmblemImg;
          obj.identityInHoldImg = this.formData1.identityInHoldImg;
          obj.principalName = this.formData1.principalName;
          obj.principalIdentityId = this.formData1.principalIdentityId;
          obj.principalMobile = this.formData1.principalMobile;
          obj.checkOrgId = this.$route.query.checkOrgId;
          obj.principalId = this.$route.query.principalId;
          console.log(this.formData1.identityFaceImg);
          personalAuthenAdd(obj).then((res) => {
            console.log(res.result);
            if (res.code == 200) {
              // this.$Message.success({
              //   top: 300,
              //   closable: true,
              //   duration: 3,
              //   content: "新增机构成功!",
              // });
               this.timex=res.result.createTime;
              this.$router.push({
                name: "mitCertification",
                query: {
                  orgName: res.result.orgName,
                  creatTime: this.timex,
                  name: res.result.name,
                  type: res.result.type,
                },
              });
            }
          });
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
      this.id = this.$route.query.idx;
      if (this.type == "edit") {
        let objc = {};
        objc.id = this.id;
        checkOrgDetail(objc).then((res) => {
          console.log(res.result.areaId);
          let arr = res.result.areaId.split(",");

          this.regroupAddress(arr);

          console.log(arr);
        });

        this.isEdit = "edit";
        this.modalStatus = true;
        this.$refs["formItem"].resetFields();
      }
    },

    authenDetail() {
      this.checkOrgId = this.$route.query.checkOrgId;
      let objc = {};
      objc.checkOrgId = this.checkOrgId;
      objc.type = 1;
      authenDetail(objc).then((res) => {
        // console.log(res.result.areaId);
        // let arr = res.result.areaId.split(",");
        this.formData1.principalName = res.result.name;
        this.formData1.principalMobile = res.result.mobile;
        this.shu = true;
        // this.regroupAddress(arr);
        this.isEdit = "edit";
      });
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
            this.formData1.identityFaceImg = this.avatarList2;
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
            this.formData1.identityInHoldImg = this.avatarList3;
            console.log(this.avatarList3);
          });
        }
      }
    },

    // 上传图片相关
    eyeIcon1(item) {
      this.eyeUrl = item;
      this.visible1 = true;
    },
    handleRemove1(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess1(res, file) {
      file.url = "";
      file.name = "";
    },
    handleFormatError1(file) {
      this.$Notice.warning({
        title: "上传头像失败!",
        desc: "这张" + file.name + " 格式不正确, 请上传 jpg 或者 png格式!",
      });
      return false;
    },
    handleMaxSize1(file) {
      this.$Notice.warning({
        title: "上传图片过大!",
        desc: "这张" + file.name + "过大, 上传小于2M的图片",
      });
    },

    avatarRemove1(e) {
      let list = this.avatarList1;
      let index = list.indexOf(e);
      if (index != -1) list.splice(index, 1);
      this.avatarList1 = list;
      this.tipg1 = false;
    },

    // LOGO图片上传
    avatarUpload1(file) {
      console.log(file);

      if (file.type !== "") {
        if (file.size < 2060000) {
          let path = "data/teacher/";
          let imgList = this.avatarList1;

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
                this.avatarList1 = imgList;
              } else {
                this.avatarList1 = imgList;
              }
            }
            this.tipg1 = true;
            this.formData1.identityNationalEmblemImg = this.avatarList1;
            console.log(this.avatarList1);
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

/deep/ .ivu-steps {
  display: flex;
  width: 50%;
  font-size: 0;
  margin-left: 25%;
  line-height: 1.5;
}

/deep/ .ivu-steps .ivu-steps-title {
  display: block;
  margin-top: 15px;
  margin-left: -26px;
}

/deep/ .ivu-steps-item {
  display: inline-block;
  position: relative;
  vertical-align: top;
  flex: 1;
  overflow: inherit;
}

.yuan_first {
  float: left;
  width: 100%;
  position: relative;
  height: 120px;
}
.yuan_lan {
  margin: auto;
  left: 0;
  right: 0;
  position: absolute;
  bottom: 50px;
  top: 30px;
  width: 235px;
}
.yuan {
  float: left;
  width: 40px;
  height: 40px;
  background: #ffffff;
  border: 3px solid #e7efff;
  border-radius: 50%;
  color: #e5eeff;
  line-height: 35px;
  text-align: center;
  font-size: 20px;
  font-weight: 550;
}
.tabsactive {
  background: #ffffff;
  border: 4px solid #0056fb;
  border-radius: 50%;
  color: #0056fb;
}
.tabsactivexian {
  background: #0056fb !important;
}
.yuan_xian {
  float: left;
  width: 150px;
  height: 4px;
  background: #e5eeff;
  margin-top: 19px;
}

.yuan_title {
  float: left;
  width: 100%;
  height: 50px;
}

.tit1 {
  margin-top: 10px;
  float: left;
  font-size: 15px;
  font-weight: 550;
  margin-left: -21px;
  color: #0056fb;
}

.tit2 {
  margin-top: 10px;
  float: right;
  font-size: 15px;
  font-weight: 550;
  margin-right: -21px;
  color: #e5eeff;
}
.tabsactiveti {
  color: #0056fb;
}
.xin {
  float: left;
  color: #ed4014;
  font-size: 20px;
  margin-top: -186px;
  margin-left: 26px;
}
</style>
