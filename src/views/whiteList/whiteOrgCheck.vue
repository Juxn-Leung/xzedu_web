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
      <div class="header" ref="header" style="margin-bottom: 15px">
        <div class="title">
          <span>机构审核</span>
        
        </div>
      </div>
      <!-- <Divider style="margin: 10px 0" /> -->
    </Row>
    <!-- 搜索 -->
    <Row>
      <div class="search" v-if="seach_panel">
        <Form
          :model="searchForm"
          ref="searchForm"
          style="display: flex; float: left"
          :label-width="80"
        >
          <FormItem label="省市区" v-if="showAddInput == 3">
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
          <FormItem label="省市区" v-else-if="showAddInput == 1">
            <Cascader
              :data="addressData"
              :value="areaId2"
              v-model="areaId2"
              @on-change="changeCascader"
              transfer
            ></Cascader>
          </FormItem>

          <FormItem label="审核状态" v-if="showAddInput == 3">
            <Select
              clearable
              v-model="searchForm.status"
              :value="searchForm.status"
              transfer
              style="width: 100px"
              @on-change="changeCondition"
            >
              <Option :value="2">待审核</Option>
              <Option :value="3">已通过</Option>
              <Option :value="4">未通过</Option>
            </Select>
          </FormItem>

          <FormItem label="登记时间">
            <Row>
              <DatePicker
                v-model="searchForm.findTime"
                :value="searchForm.findTime"
                format="yyyy年MM月dd日"
                type="date"
                placeholder="选择日期"
                style="width: 150px; z-index: 7"
                @on-change="changeDate"
              ></DatePicker>
            </Row>
          </FormItem>

          <FormItem label="关键字" style="width: 400px">
            <Input
              v-model="searchForm.key"
              placeholder="请输入机构名称、办学许可、营业执照进行搜索"
              @input="keyInput"
            />
          </FormItem>
        </Form>
        <div class="sou" style="float: right; margin: 15px 0px 11px 0px">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </div>
      </div>
    </Row>
    <!-- 表格 -->

    <div v-if="addlenght == 1" class="table_content">
      <Row>
        <Table
          size="large"
          :columns="columns"
          :data="data"
          ref="table"
          :loading="loading"
          :height="tableHeight"
          @on-selection-change="changeSelect"
        >
          <template slot="actionx" slot-scope="{ row }">
            <div v-if="genre == 2">
              <Button
                v-if="row.status == 2"
                type="primary"
                size="small"
                style="background: #edf3ff; color: #437ef6; cursor: auto"
                >待审核</Button
              >
              <Button
                v-if="row.status == 3"
                type="text"
                size="small"
                style="background: #e5fbe5; color: #3a955d; cursor: auto"
                >已通过</Button
              >
              <Button
                v-if="row.status == 4"
                type="primary"
                size="small"
                style="background: #ffeaea; color: #ff7d7d; cursor: auto"
                >未通过</Button
              >
            </div>
          </template>

          <template slot="action" slot-scope="{ row, index }">
            <div v-if="seach_panel == true">
              <Button
                type="primary"
                size="small"
                style="margin-right: 6px; background: #427ef4"
                @click="handleEdit(row, index)"
                >查看</Button
              >

              <Button
                v-if="row.status == 2"
                @click="succes(row, index)"
                size="small"
                style="margin-right: 6px; margin-top: 6px; margin-bottom: 6px"
                >通过</Button
              >
              <Button
                v-if="row.status == 2"
                @click="erno(row, index)"
                class="no"
                size="small"
                style="margin-right: 6px; margin-top: 6px; margin-bottom: 6px"
                >不通过</Button
              >
            </div>
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
            :page-size-opts="[10, 20, 50]"
            show-total
            show-elevator
            show-sizer
          ></Page>
        </div>
      </Row>
    </div>

    <!-- 新建&编辑弹框 -->
    <Modal v-model="modalStatus" :mask-closable="false" width="650">
      <div slot="header" style="color: #f60; text-align: center">
        <div class="headertitle">
          <div>机构详情</div>
        </div>
      </div>

      <p
        slot="close"
        style="
          border: 1px solid #818284;
          border-radius: 100%;
          background: white;
        "
      >
        <Icon
          @click.native="addceshi"
          type="ios-close-circle"
          style="margin-top: 1px; margin-left: 0px"
          size="24"
        ></Icon>
      </p>

      <div class="agency">
        <div class="agency_first">
          <div>营业执照</div>

          <div id="div1">
            <div id="div2">
              <div class="box">
                <img :src="objx.uscCodeImg" />
                <div class="text">
                  <div class="h3">
                    <p class="details">
                      <Icon
                        :data-id="1"
                        @click="getdata"
                        type="ios-eye-outline"
                        @click.native="handle(objx)"
                      ></Icon>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="agency_sencond">
          <div>办学许可证</div>

          <div id="div1" style="margin-left: 30px">
            <div id="div2">
              <div class="box">
                <img :src="srlNoImg" />
                <div class="text">
                  <div class="h3">
                    <p class="details">
                      <Icon
                        :data-id="1"
                        @click="getdata"
                        type="ios-eye-outline"
                        @click.native="handle2(objx)"
                      ></Icon>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="agency_third">
          <div>法人身份证</div>

          <div id="div1" style="margin-left: 30px">
            <div id="div2">
              <div class="box">
                <img :src="identityNoImg" />
                <div class="text">
                  <div class="h3">
                    <p class="details">
                      <Icon
                        :data-id="1"
                        @click="getdata"
                        type="ios-eye-outline"
                        @click.native="handle1(objx)"
                      ></Icon>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer" class="footer_btn">
        <!-- <Button type="default" @click="modalStatus=false">取消</Button> -->
      </div>
    </Modal>

    <Modal v-model="modal" width="460" :styles="{ top: '20%' }">
      <p
        slot="header"
        style="
          color: #606060;
          text-align: center;
          font-weight: 550;
          padding: 25px 0px;
        "
      >
        <span v-if="status == 2">审核不通过</span>
      </p>
      <p
        slot="close"
        style="
          border: 1px solid #818284;
          border-radius: 100%;
          background: white;
        "
      >
        <Icon
          @click.native="addceshi"
          type="ios-close-circle"
          style="margin-top: 1px; margin-left: 0px"
          size="24"
        ></Icon>
      </p>

      <div v-if="status == 1" style="text-align: center; margin-bottom: 50px">
        <span class="queding">确定通过审核?</span>
      </div>

      <div v-if="status == 2" class="tex">
        <Form
          :disabled="disabled"
          :model="formLeft"
          label-position="left"
          :label-width="100"
        >
          <FormItem label="备注内容">
            <Input
              type="textarea"
              v-model="formLeft.audit"
              :rows="4"
              placeholder="请输入审核不通过的原因"
             
            />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button v-if="stats == 1" type="primary" @click="submitAuditx"
          >确 定</Button
        >
        <Button v-else type="primary" @click="submitAudit">确 定</Button>
      </div>
    </Modal>

    <Modal
      title="View Image"
      width="670"
      :styles="{ top: '15%' }"
      v-model="visible"
    >
      <p
        slot="header"
        style="
          color: #606060;
          text-align: center;
          font-weight: 550;
          padding: 25px 0px;
        "
      >
        <span v-if="status == 2">审核不通过</span>
      </p>
      <p
        slot="close"
        style="
          border: 1px solid #818284;
          border-radius: 100%;
          background: white;
        "
      >
        <Icon
          @click.native="addceshi"
          type="ios-close-circle"
          style="margin-top: 1px; margin-left: 0px"
          size="24"
        ></Icon>
      </p>

      <img :src="educationImgUrlx" v-if="visible" style="width: 100%" />

      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { formatDate } from "../../utils/time.js";
import { mapState } from "vuex";
import { getAddresslist, whiteList, deleteById, whiteListdone } from "@/api";
import { Debounce } from "../../libs/util";
import { dateFormat } from "@/utils/current";

export default {
  data() {
    return {
      isEdit: "add",
     
      educationImgUrl: "",
      objx: {},
      identityNoImg: "",
      srlNoImg: "",
      seach_panel: true,
      admintest: "",
      shictro: "",
      institution: "",
      cvimg: "",
      addlenght: "",
      visible: false,
      visible2: false,
      checkAll: true,
      checkAll2: true,
      genre: "",
      modal: false,
      status: "",
      stats: "",
      disabled2: false,
      disabled2x: "",
      formLeft: {
        audit: "请提供清晰彩色营业执照照片和法人身份证原件照片",
      },
      columns: [
        {
          title: "机构所在区域",
          key: "areaName",
          align: "center",
          minWidth: 180,
        },
        {
          title: "教育机构名称",
          key: "orgName",
          align: "center",
          minWidth: 200,
        },

        {
          title: "统一社会信用代码",
          key: "uscCode",
          align: "center",
          minWidth: 160,
        },

        {
          title: "办学许可证代码",
          key: "srlNo",
          align: "center",
          minWidth: 160,
        },
        {
          title: "登记时间",
          key: "updateTime",
          align: "center",
          minWidth: 170,
          render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.updateTime), "yyyy-MM-dd hh:mm")
            );
          },
        },
        {
          title: "审核状态",
          slot: "actionx",
          align: "center",
          minWidth: 80,
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 250,
        },
      ],
      data: [],
      loading: true,
      tableHeight: 0,
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        // type: "",
      },
      total: 0,
      modalTitle: "",
      modalStatus: false,
      addressData: [],
      disabled: false,
      organizationType: "",
      dateForm: {
        date: "",
        id: "",
      },
      addressDataSearch: [],
      area: [],
      areaId: [],
      // 判断显示哪个下拉框 0 = 区级/镇级教育局，不显示 ; 1 = 市级教育局，可以选择 区/镇 ; 2 = 省级教育局，可以选 市，区/镇 ; 3 = admin ，可以选 省，市，区/镇。
      showAddInput: 0,
      s_id: "",
      z_id: "",
      q_id: "",
      areaId2: [],
    };
  },
  created() {
    this.getUserInfo();
    this.getTableInfo();
  },
  mounted() {
    this.init();
    // this.getAddresslist(); //地址接口

    this.examineBtn();
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
    getdata: function (e) {
      console.log(e.srcElement.dataset.id);
      this.idx = e.srcElement.dataset.id;
    },

    handle(objx) {
      console.log(this.objx);
      this.educationImgUrlx = this.objx.uscCodeImg;
      this.imgName = name;
      this.visible = true;
    },
    handle2(objx) {
      console.log(this.objx);
      this.educationImgUrlx = this.objx.srlNoImg;
      this.imgName = name;
      this.visible = true;
    },

    handle1(objx) {
      console.log(this.objx);
      this.educationImgUrlx = this.objx.identityNoImg;
      this.imgName = name;
      this.visible = true;
    },

    addceshi() {
      console.log("ccc");

      this.checkAll = true;
      this.checkAll2 = true;
      this.disabled = false;
      this.disabled2 = false;
    },

    changeDate(e) {
      console.log(e);
      let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);
      console.log(date);
      this.searchForm.findTime = date;
    },

    changeCondition(e) {
      console.log(e);
      this.searchForm.status = e;
    },
    changeSelect() {},
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
        this.institution = 1;
        this.showAddInput = 0;
        this.getAddresslist();
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
        this.shictro = 1;
        this.showAddInput = 1;
        this.getTownshipList(s_id, z_id);
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
        s_id = parseInt(id0);
        z_id = parseInt(id1);
        // q_id = parseInt(id2);
        q_id = 0;
        this.cvimg = 1;
        this.getAddresslist(); //地址接口
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

    submitAuditx() {
      this.modal = false;
    },

    succes(row, index) {
      this.modal = true;
      console.log(row.orgName);
      this.organname = row.orgName;
      this.kainame = row.name;
      this.bank = row.bank;
      this.bankaccount = row.account;
      this.bankmoney = row.money;
      this.id = row.id;
      this.status = 1;
    },

    erno(row, index) {
      this.modal = true;
      console.log(row.orgName);
      this.organname = row.orgName;
      this.kainame = row.name;
      this.bank = row.bank;
      this.bankaccount = row.account;
      this.bankmoney = row.money;
      this.id = row.id;
      this.status = 2;
    },
    submitAudit() {
      console.log(this.id);
      let id = this.id;
      let reason = this.formLeft.audit;
      console.log(this.formLeft.audit);
      let status = this.status;

      if (status == 1) {
        console.log(status);

        //审核通过
        let status = 3;
        let params = {
          id,
          status,
        };
        whiteListdone(params).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$Message.success({
              top: 300,
              closable: true,
              duration: 3,
              content: res.result,
            });
            this.getTableInfo();
            this.modal = false;
          } else {
            this.$Message.error({
              top: 300,
              closable: true,
              duration: 3,
              content: res.message,
            });
          }
        });
      } else {
        let status = 4;
        if (reason == "") {
          this.$Message.error("请输入审核不通过的理由!");
        } else {
          let params = {
            id,
            status,
            reason,
          };
          whiteListdone(params).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: res.result,
              });
              this.getTableInfo();
              this.modal = false;
            } else {
              this.$Message.error({
                top: 300,
                closable: true,
                duration: 3,
                content: res.message,
              });
            }
          });
        }
      }
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
      // console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        let s_id = this.data.s_id;
        let z_id = this.data.z_id;
        this.getTownshipList(s_id, z_id);
      }
    },

    examineBtn() {
      // 判断编辑按钮是否为查看
      let type = JSON.parse(sessionStorage.getItem("userInfo")).type;
      this.organizationType = type;
      console.log(type);
      if (type == "ORGPRINCIPAL" || type == "TRUSTEESHIPORGPRINCIPAL") {
        this.examine_btn = "修改";
        this.seach_panel = false;
      } else {
        this.examine_btn = "查看";
        this.seach_panel = true;
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

      if (areaId.length == 3) {
        this.searchForm.provinceId = areaId[0];
        this.searchForm.cityId = areaId[1];
        this.searchForm.areaId = areaId[2];
      } else {
        this.searchForm.provinceId = 0;
        this.searchForm.cityId = 0;
        this.searchForm.areaId = 0;
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

    getTableInfo() {
      let orgList = JSON.parse(sessionStorage.getItem("userInfo")).orgList;
      console.log(orgList);

      let type = JSON.parse(sessionStorage.getItem("userInfo")).type;

      this.addlenght = 1;

      if (type == "INNER") {
        this.genre = 2;
      } else {
        this.genre = 3;
      }
      whiteList(this.searchForm).then((res) => {
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
    /**
     * 页面&表格高度
     */
    pageHeight() {
      let type = JSON.parse(sessionStorage.getItem("userInfo")).type;

      let pageHeight = Number(
        document.getElementsByClassName("single-page")[0].clientHeight
      );
      let headerHeight = this.$refs.header.clientHeight;
      let footerHeight = 35;
      this.tableHeight = pageHeight - headerHeight - footerHeight - 160;
    },

    handleSearch() {
      // delete this.searchForm.area;
      // console.log(this.areaId)
      // this.searchForm.areaId = this.areaId.join(",");
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getTableInfo();
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

    handleEdit(row, index) {
      // this.modalTitle = "编辑培训机构";
      this.isEdit = "edit";
      this.modalStatus = true;

      let obj = JSON.parse(JSON.stringify(row));
      this.objx = obj;
      console.log(obj.educationImgUrl);
      this.educationImgUrl = obj.uscCodeImg;
      this.srlNoImg = obj.srlNoImg;
      this.identityNoImg = obj.identityNoImg;
    },

    // handleDelete(row, index) {
    //   this.$Modal.confirm({
    //     title: "确认删除",
    //     content: "您确认要删除这个机构?",
    //     onOk: () => {
    //       deleteById({
    //         id: row.id,
    //       }).then((res) => {
    //         if (res.code == 200) {
    //           this.$Message.success({
    //             top: 300,
    //             closable: true,
    //             duration: 3,
    //             content: "删除成功!",
    //           });

    //           let userInfo = JSON.stringify(res.result);
    //           // console.log(userInfo);
    //           sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    //           this.$store.commit("ADD_USER_INFO", userInfo);

    //           this.$parent.getUserInfo();
    //           this.getTableInfo();
    //         }
    //       });
    //     },
    //   });
    // },

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
    changePage(e) {
      this.searchForm.pageNumber = e;
      this.getTableInfo();
    },
    changePageSize(e) {
      this.searchForm.pageSize = e;
      this.getTableInfo();
    },
    keyInput(e) {
      this.searchForm.key = e;
      console.log(this.searchForm.key);
    },
  },
};
</script>

<style lang="scss" scoped>
.trainlist {
  padding: 12px 16px;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;

 
  }

  .title {
      color: #373737;
      font-weight: 600;
      font-size: 20px;
      font-weight: bold;
      line-height: 50px;
      margin-left: 45px;
      position: relative;
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
  .search {
    border: 1px solid #f0f2f7;
    border-radius: 4px;
    padding: 0 6px;
    margin-bottom: 10px;
    // overflow: hidden;
    background: #f0f2f7;
    border-radius: 15px;
    float: left;
    width: 100%;

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

.sou button {
  background: #427ef4;
  color: white;
  border-radius: 20px;
}

.agency {
  width: 100%;
  height: 260px;
}

.agency_first {
  float: left;
  width: 25%;
  height: 240px;
  text-align: center;
  font-size: 16px;
  font-weight: 550;
}

.agency_sencond {
  float: left;
  width: 35%;
  height: 190px;
  margin-left: 2.5%;
  text-align: center;
  font-size: 16px;
  font-weight: 550;
}

.agency_third {
  float: left;
  width: 35%;
  height: 190px;
  margin-left: 2.5%;
  text-align: center;
  font-size: 16px;
  font-weight: 550;
}

.img {
  margin-top: 20px;
  width: 100%;
  height: 200px;
}

.img img {
  float: left;
  width: 100%;
  height: 100%;
}

.ivu-table-row .ivu-btn {
  width: 72px;
}

textarea.ivu-input {
  height: 160px;
}

/deep/ .ivu-form-item-label {
  font-weight: 550;
  color: #1e275e;
}

/deep/ .ivu-table-row .ivu-btn {
  width: 56px;
  background: #f4c042;
  border: 0px;
  color: white;
  height: 35px;
  border-radius: 12px;
}

/deep/ .ivu-table-row .no {
  width: 56px;
  background: #fa455e;
  border: 0px;
  color: white;
  height: 35px;
  border-radius: 12px;
}
/deep/ .ivu-form-item-content .ivu-select-placeholder{
 color: #bfc4dd  !important;
 background-color: #e2e7f3;
 height: 40px !important;
 line-height: 40px !important;
 border-radius: 10px !important;
 border: 0px !important;
}
/deep/ .ivu-form-item-content .ivu-select-selected-value{
 color: #5669d9;
 background-color: #e2e7f3;
 height: 40px !important;
 line-height: 40px !important;
 border-radius: 10px !important;
 border: 0px !important;
}
/deep/ .ivu-form-item-content  .ivu-select-selection{
    color: #bfc4dd;
 background-color: #e2e7f3;
 height: 40px !important;
 line-height: 40px !important;
 border-radius: 10px !important;
 border: 0px !important;
}
/deep/ .ivu-input::-webkit-input-placeholder {
  color: #bfc4dd;
}
/deep/ .ivu-input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #bfc4dd;
}
/deep/ .ivu-input::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #bfc4dd;
}
/deep/ .ivu-input::-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #bfc4dd;
}

/deep/ .ivu-input {
  background-color: #e2e7f3;
  border: #e2e7f3;
  color: #5669d9;
}
/deep/ .ivu-table td {
  border-bottom: 6px solid #f0f2f7;
}

/deep/ .ivu-table th {
  background-color: #f0f2f7;
  border: 0px;
}

.table_content {
  background: #f0f2f7;
}

.trainlist::after {
  content: "";
  background: #fff;
  left: -16px;
  top: -16px;
  position: absolute;
  width: 110%;
  height: 110%;
  z-index: -1;
}

.table_content {
  background: #f0f2f7;
  border-radius: 15px;
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;
}

.queding {
  font-size: 18px;
  font-weight: 550;
}

.table_panel /deep/ .ivu-table table {
  overflow-y: auto;
}

.table_panel /deep/ .ivu-table-wrapper {
  border: none;
}

.table_panel /deep/ .ivu-table-tip tr {
  background: #f0f2f7;
}

.table_panel /deep/ .ivu-table th {
  background: #f0f2f7;
  border: 0;
}



/deep/ .ivu-table-tbody tr td {
  background-color: #fff;
  margin-bottom: 6px;
  border-top: 3px solid #f0f2f7;
  border-bottom: 3px solid #f0f2f7;
}

/deep/ .ivu-table-tbody tr td:first-child {
  border-bottom-left-radius: 8px;
  border-left: 3px solid #f0f2f7;
}

/deep/ .ivu-table-tbody tr td:last-child {
  border-bottom-right-radius: 8px;
  border-right: 3px solid #f0f2f7;
}

/deep/ .ivu-table-tbody tr td:first-child {
  border-top-left-radius: 8px;
  border-left: 3px solid #f0f2f7;
}

/deep/ .ivu-table-tbody tr td:last-child {
  border-top-right-radius: 8px;
  border-right: 3px solid #f0f2f7;
}

/deep/ .ivu-table {
  background-color: transparent !important;
}

/deep/ .ivu-table-border:after,
/deep/ .ivu-table-fixed-right::before,
/deep/ .ivu-table-fixed::before,
/deep/ .ivu-table::before,
/deep/ .ivu-row::after {
  display: none;
}

.ivu-row-flex-end {
  margin-top: 10px;
  padding-bottom: 20px;
  padding-right: 20px;
}

.first_ul ul {
  width: 100%;
  display: flex;
  height: 55px;
}

.first_ul ul li {
  width: 150px;
  height: 45px;
  margin-top: 5px;
  border-radius: 20px;
  background: #f0f2f7;
  display: inline-flex;
  border-right: 1px solid #f0f2f7;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: 550;
  color: #acacac;
}

.first_ul ul li.active {
  background: white;
  color: #427ef4;
  font-weight: 550;
  font-size: 15px;
}

/deep/ .ivu-modal {
  top: 25%;
}

/deep/ .ivu-modal-content {
  border-radius: 20px;
}

/deep/ .ivu-modal-header {
  border: 0px;
}

/deep/ .ivu-input {
  border-radius: 10px;
 height: 40px;
  overflow: hidden;
}

/deep/ .ivu-modal-footer {
  border-top: none;
}

/deep/ .ivu-form-item-content p {
  text-align: left;
  font-size: 12px;
  // color: #c8c8c8;
  line-height: 22px;
}

/deep/ .ivu-modal-footer .ivu-btn {
  margin-right: 51%;
  transform: translateX(50%);
  height: 46px;
  border-radius: 10px;
  background: #417df4;
  width: 220px;
  margin-bottom: 10px;
}

/deep/ .hint_panel {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  .content {
    position: absolute;
    right: 15px;
    top: 165px;
    width: 300px;
    background: #fff;
    box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.65);
    padding: 10px 20px 0 20px;

    p {
      text-align: left;
      position: relative;
      float: left;
      width: 100%;
    }

    .title {
      font-size: 15px;
      color: #292929;
      font-weight: 550;
    }

    .cont {
      font-size: 13px;
      margin-bottom: 10px;
    }

    span {
      color: #417df4;
      font-weight: 550;
      font-size: 15px;
    }
  }
}

.tex {
  text-align: center;
  height: 65px;
  margin-bottom: 30px;
  width: 90%;
  margin-left: 0%;
}

/deep/ .tex .ivu-input {
  float: left;
  height: 100%;
  border: 1px solid #dcdee2;
  background-color: white;
  color: #606060 !important;
}

/deep/.ivu-form-label-left .ivu-form-item-label {
  text-align: right;

}
/deep/ .ivu-form .ivu-form-item-label{
  padding: 14px 12px 10px 0 !important;
}
.yitong {
  margin-right: 6px;
  margin-top: 6px;
  margin-bottom: 6px;
  color: #427ef4;
  font-weight: 550;
}

/deep/ .ivu-input-suffix i {
  font-size: 16px;
   line-height: 40px;
  color: #808695;
}

/deep/ .ivu-input-icon {
  line-height: 41px;
}

/deep/ a {
  color: #515a6e;
}

/deep/ .ivu-checkbox-inner {
  border-radius: 50%;
}

#ceshi {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ceshifirst {
  width: 100px;
  height: 100px;
  cursor: pointer;
  text-align: center;
}

.firsticon {
  float: left;
  width: 100%;
}

.firsttitle {
  font-size: 20px;
  color: #427ef4;
  font-weight: 550;
}

.ceshifirst1 {
  width: 50px;
  height: 50px;
  cursor: pointer;
  text-align: center;
}

.firsticon1 {
  float: left;
  width: 100%;
}

.firsttitle1 {
  font-size: 12px;
  color: #427ef4;
  font-weight: 550;
}

// 表单样式
.demo-upload-list {
  width: 100px;
  height: 80px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 100px;
    height: 80px;
    object-fit: cover;
    position: relative;
    float: left;
    // border-radius: 50%;
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
  width: 100px;
  height: 90px;
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

.tp {
  // margin-left: 145px;
  margin-bottom: 5px;
  margin-top: 2px;
  font-size: 12px;
  color: #fa8282;
}

.headertitle {
  width: 100%;
  font-size: 17px;
  font-weight: 550;
  letter-spacing: 2px;
  color: #000000;
  margin-top: 15px;
}

.headersecond {
  font-size: 14px;
  margin-top: 5px;
  color: #535353;
}

.header_a {
  color: red;
  font-size: 18px;
}

.header_xian {
  height: 1px;
  background: #eeeeee;
}

/deep/ .ivu-modal-close {
  z-index: 1;
  font-size: 12px;
  position: absolute;
  right: -8px;
  top: -8px;
  overflow: hidden;
  cursor: pointer;
  background: none !important;
  // border-radius: 50%;
}

.wei {
  color: #fac659;
  font-weight: 550;
  font-size: 14px;
}

.weifirst {
  color: #fa455e;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 550;
  font-size: 14px;
}

.weiyi {
  color: #427ef4;
  font-weight: 550;
  font-size: 14px;
}

#div1 {
  width: 158px;
  height: 202px;

  overflow: hidden;
  margin-top: 20px;
  position: absolute;
}

#div2 {
  overflow: auto;
}

.box {
  position: relative;
  width: 158px;
  height: 202px;
  margin: 0 30px 30px 0;
  background-size: 100% 100%;
  float: left;
}

.box img {
  width: 158px;
  height: 202px;
}

.box:hover .details {
  display: block;
}

.text {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 202px;
  line-height: 202px;
  cursor: pointer;
}

.h3 {
  float: left;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #ffffff;
}

.details {
  color: white;
  display: none;
  font-size: 24px;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
