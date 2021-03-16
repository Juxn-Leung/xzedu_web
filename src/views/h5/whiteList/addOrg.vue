<template>
  <div id="agreement">
    <template v-for="(item,index) in messageList">
      <div
        class="message"
        :class="item.close==true?'messageClose':''"
      >
        <div
          class="label"
          @click="scrollMessage(index)"
        >
          <p>{{item.name}}</p>
          <img src="../../../assets/whiteList/top.png">
        </div>

        <Form
          :model="formItem"
          :label-width="120"
          :label-position="`${index==4?'top':'left'}`"
        >
          <template v-for="(item2,index2) in item.list">

            <FormItem
              :label="item2.title"
              v-if="item2.type=='text'"
            >
              <Input
                type=""
                v-model="item2.content"
                :placeholder="`请输入${item2.title}`"
              ></Input>
            </FormItem>

            <FormItem
              :label="item2.title"
              v-if="item2.type=='number'"
            >
              <Input
                type="number"
                v-model="item2.content"
                :placeholder="`请输入${item2.title}`"
              ></Input>
            </FormItem>

            <FormItem
              :label="item2.title"
              v-if="item2.type=='picker'"
            >
              <Select
                v-model="item2.content"
                transfer
              >
                <template v-for="item3 in item2.picker">
                  <Option :value="item3.id">{{item3.name}}</Option>
                </template>
              </Select>
            </FormItem>

            <FormItem
              :label="item2.title"
              multiple
              v-if="item2.type=='checkbox'"
            >
              <Select
                v-model="item2.content"
                transfer
                multiple
              >
                <template v-for="item3 in item2.picker">
                  <Option :value="item3.name">{{item3.name}}</Option>
                </template>
              </Select>
            </FormItem>

            <!-- <FormItem
              label="问题描述"
              class="textareaItem"
            >
              <Input
                v-model="formItem.textarea"
                type="textarea"
                placeholder="请描述存在的详细问题"
              ></Input>
            </FormItem> -->

            <FormItem
              :label="item2.title"
              v-if="item2.type=='date'"
            >
              <DatePicker
                type="date"
                :vules="item2.content"
                @on-change="changeDate"
                placeholder="请选择"
                :clearable="false"
              ></DatePicker>
            </FormItem>

            <FormItem
              :label="item2.title"
              v-if="item2.type=='multiSelector'"
            >
              <Cascader
                :data="addressData"
                v-model="item2.content"
                @on-change=""
                transfer
                :clearable="false"
              ></Cascader>
            </FormItem>

          </template>

        </Form>

      </div>
    </template>

    <template>
      <Form
        class="formPanel"
        :model="formItem"
        :label-width="120"
        label-position="left"
      >
        <FormItem label="选择机构状态">
          <Select
            v-model="list6.content"
            transfer
          >
            <template v-for="item in list6.picker">
              <Option :value="item.id">{{item.name}}</Option>
            </template>
          </Select>
        </FormItem>
      </Form>
    </template>

    <div class="btn">
      <Button
        type="primary"
        @click="subFrom"
      >保存</Button>
    </div>

  </div>

</template>

<script>
import { attendGetInfo, getAreaList, wAdd } from "@/api";

export default {
  data() {
    return {
      areaId: [],
      areaId2: [],
      addressData: [],

      formItem: {
        uid: null,
        orgName: "",
        regAreaId: null,
        areaId: null,
        establishDate: "",
        uscCode: "",
        setAddress: "",
        businessAddress: "",
        legalRep: "",
        legalRepHouse: "",
        chairman: "",
        organizer: "",
        organizerType: [],
        srlNo: "",
        issuingDeptId: null,
        lprDeptId: null,
        hasTrainContent: null,
        trainType: [],
        trainContent: "",
        enrollmentTarge: "",
        enrollmentScope: null,
        lastTrainNumber: null,
        nowStudentNumber: null,
        trainForm: [],
        pmSchoolSubject: "",
        trainSubjectForm: [],
        placeType: null,
        placeArea: "",
        staffNum: "",
        teacherNum: "",
        fTeacherNum: "",
        cTeacherNum: "",
        pTeacherNum: "",
        isFireControl: null,
        ifBoard: null,
        ifFood: null,
        ifCslicense: null,
        ifLegal: null,
      },

      messageList: [
        {
          id: 0,
          name: "基本信息",
          list: [],
          close: false,
        },
        {
          id: 1,
          name: "资质信息",
          list: [],
          close: true,
        },
        {
          id: 2,
          name: "办学情况",
          list: [],
          close: true,
        },
        {
          id: 3,
          name: "学科培训",
          list: [],
          close: true,
        },
        {
          id: 4,
          name: "办学条件",
          list: [],
          close: true,
        },
      ],

      list6: {
        picker: [
          {
            id: 1,
            name: "合法",
          },
          {
            id: 2,
            name: "非法",
          },
          {
            id: 3,
            name: "整改中",
          }
        ],
        content: null,
      },
    };
  },

  created() {
    this.attendGetInfo();
    this.formItem.uid = this.$route.query.uid;
  },

  mounted() {
    this.structure();
  },

  methods: {
    scrollMessage(index) {
      if (this.messageList[index].close == false) {
        this.messageList[index].close = true;
      } else {
        this.messageList[index].close = false;
      }
    },

    attendGetInfo() {
      if (
        sessionStorage.getItem("openid") &&
        sessionStorage.getItem("openid") != "undefined"
      ) {
        let openId = sessionStorage.getItem("openid");
        let obj = {
          openId,
        };
        attendGetInfo(obj).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.userMessage = res.result;
            this.formItem.uid = res.result.userId;
            this.getUserInfo(res.result.type);
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
        // let obj = {
        //   openId: "oinbDvza6HCP9r4b8taZC5SGIRyA",
        // };
        // attendGetInfo(obj).then((res) => {
        //   console.log(res);
        //   if (res.code == 200) {
        //     this.userMessage = res.result;
        //     this.formItem.uid = res.result.userId;
        //     this.getUserInfo(res.result.name);
        //   } else {
        //     this.$Message.error({
        //       top: 300,
        //       closable: true,
        //       duration: 3,
        //       content: res.message,
        //     });
        //   }
        // });
      }
    },

    getUserInfo(type) {
      let areaIdMessage = this.userMessage.areaId;
      let stringResult = areaIdMessage.split(",");
      for (var i in stringResult) {
        this.areaId.push(Number(stringResult[i]));
      }
      if (type === 2) {
        this.getTownshipList(this.areaId[0], this.areaId[1]);
      } else {
        this.getTownshipList2(this.areaId[0], this.areaId[1], this.areaId[2]);
      }
    },

    getTownshipList2(s_id, z_id, q_id) {
      let addressData = {};
      getAreaList({ level: 1 }).then((res) => {
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
        getAreaList({ pid: s_id, level: 2 }).then((res) => {
          res.result.forEach((item) => {
            if (item.id == z_id) {
              newList2 = item;
              newList2.children = [];
              newList2.loading = false;
            }
          });
          getAreaList({ pid: z_id, level: 3 }).then((res) => {
            res.result.forEach((item) => {
              if (item.id == q_id) {
                newList2.children.push(item);
                addressData.children.push(newList2);
                this.addressData.push(addressData);

                this.messageList[0].list[1].content = this.areaId;
                this.messageList[0].list[2].content = this.areaId;
              }
            });
          });
        });
      });
    },

    getTownshipList(s_id, z_id) {
      let addressData = {};
      getAreaList({ level: 1 }).then((res) => {
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
        getAreaList({ pid: s_id, level: 2 }).then((res) => {
          res.result.forEach((item) => {
            if (item.id == z_id) {
              newList2 = item;
              newList2.children = [];
              newList2.loading = false;
            }
          });
          getAreaList({ pid: z_id, level: 3 }).then((res) => {
            newList2.children = res.result;
            addressData.children.push(newList2);
            this.addressData.push(addressData);

            this.messageList[0].list[1].content = this.areaId;
            this.messageList[0].list[2].content = this.areaId;
          });
        });
      });
    },

    // 构建数据
    structure() {
      let list1 = [
        {
          title: "机构名称",
          placeholder: "请输入机构名称",
          content: "",
          picker: [],
          type: "text",
          no: 0,
        },
        {
          title: "登记单位",
          placeholder: "",
          content: [],
          picker: [],
          type: "multiSelector",
          no: 0,
        },
        {
          title: "机构所在区域",
          placeholder: "",
          content: [],
          picker: [],
          type: "multiSelector",
          no: 0,
        },
        {
          title: "设立时间",
          placeholder: "",
          content: "",
          picker: [],
          type: "date",
          no: 0,
        },
        {
          title: "统一社会信用代码",
          placeholder: "请输入统一社会信用代码",
          content: "",
          picker: [],
          type: "text",
          no: 0,
        },
        {
          title: "注册地址",
          placeholder: "请输入注册地址",
          content: "",
          picker: [],
          type: "text",
          no: 0,
        },
        {
          title: "实际经营地址",
          placeholder: "请输入实际经营地址",
          content: "",
          picker: [],
          type: "text",
          no: 0,
        },
        {
          title: "法定代表人",
          placeholder: "请输入法定代表人姓名",
          content: "",
          picker: [],
          type: "text",
          no: 0,
        },
        {
          title: "法定代表人户籍",
          placeholder: "请输入法定代表人户籍",
          content: "",
          picker: [],
          type: "text",
          no: 0,
        },
        {
          title: "校长(负责人)姓名",
          placeholder: "请输入校长（负责人）姓名",
          content: "",
          picker: [],
          type: "text",
          no: 0,
        },
        {
          title: "举办者名称(姓名)",
          placeholder: "请输入举办者名称（姓名）",
          content: "",
          picker: [],
          type: "text",
          no: 0,
        },
        {
          title: "举办者属性",
          placeholder: "",
          content: [],
          picker: [
            { id: 0, name: "个人" },
            { id: 1, name: "企业" },
            { id: 2, name: "个体工商户" },
            { id: 3, name: "事业单位" },
            { id: 4, name: "机关单位" },
            { id: 5, name: "社会组织" },
            { id: 6, name: "其他" },
          ],
          type: "checkbox",
          no: 0,
        },
      ];

      let list2 = [
        {
          title: "办学许可证号",
          placeholder: "请输入办学许可证",
          content: "",
          picker: [],
          type: "text",
          no: 1,
        },
        {
          title: "发证机关",
          placeholder: "",
          content: "",
          picker: [
            { id: 0, name: "市场监管部门" },
            { id: 1, name: "教育行政部门" },
            { id: 2, name: "人力社保行政部门" },
            { id: 3, name: "行政审批局" },
            { id: 4, name: "民政部门" },
          ],
          type: "picker",
          no: 1,
        },
        {
          title: "法人登记部门",
          placeholder: "",
          content: "",
          picker: [
            { id: 0, name: "工商部门" },
            { id: 1, name: "民政部门" },
          ],
          type: "picker",
          no: 1,
        },
        {
          title: "经营业务是否有培训内",
          placeholder: "",
          content: "",
          picker: [
            {
              id: 0,
              name: "否",
            },
            {
              id: 1,
              name: "是",
            },
          ],
          type: "picker",
          no: 1,
        },
      ];

      let list3 = [
        {
          title: "培训类别",
          placeholder: "",
          content: [],
          picker: [
            { id: 0, name: "中小学学科类" },
            { id: 1, name: "中小学非学科类（体艺科等）" },
            { id: 2, name: "课后托管" },
            { id: 3, name: "成人类培训" },
            { id: 4, name: "其他" },
          ],
          type: "checkbox",
          no: 2,
        },
        {
          title: "培训内容",
          placeholder: "请输入培训内容",
          content: "",
          picker: [],
          type: "text",
          no: 2,
        },
        {
          title: "招生对象",
          placeholder: "请输入招生对象",
          content: "",
          picker: [],
          type: "text",
          no: 2,
        },
        {
          title: "招生范围",
          placeholder: "",
          content: null,
          picker: [
            { id: 0, name: "本地区" },
            { id: 1, name: "本省" },
            { id: 2, name: "全国" },
            { id: 3, name: "全球" },
          ],
          type: "picker",
          no: 2,
        },
        {
          title: "上年培训总人数",
          placeholder: "请输入上年培训总人数",
          content: null,
          picker: [],
          type: "text",
          no: 2,
        },
        {
          title: "目前在校生人数",
          placeholder: "请输入目前在校生人数",
          content: null,
          picker: [],
          type: "text",
          no: 2,
        },
        {
          title: "培训形式",
          placeholder: "",
          content: [],
          picker: [
            { id: 0, name: "面授" },
            { id: 1, name: "在线培训" },
          ],
          type: "checkbox",
          no: 2,
        },
      ];

      let list4 = [
        {
          title: "培训学科",
          placeholder: "请输入培训学科",
          content: "",
          picker: [],
          type: "text",
          no: 3,
        },
        {
          title: "培训形式",
          content: [],
          picker: [
            { id: 0, name: "面授" },
            { id: 1, name: "在线培训" },
          ],
          type: "checkbox",
          no: 3,
        },
      ];

      let list5 = [
        {
          title: "场地性质",
          placeholder: "",
          content: null,
          picker: [
            { id: 0, name: "租用" },
            { id: 1, name: "自有" },
            { id: 2, name: "其他" },
          ],
          type: "picker",
          no: 4,
        },
        {
          title: "建筑面积(平方米)",
          placeholder: "请输入建筑面积",
          content: null,
          picker: [],
          type: "number",
          no: 4,
        },
        {
          title: "教职工数",
          placeholder: "请输入教职工数",
          content: null,
          picker: [],
          type: "number",
          no: 4,
        },
        {
          title: "专职教师数",
          placeholder: "请输入专职教师数",
          content: null,
          picker: [],
          type: "number",
          no: 4,
        },
        {
          title: "外籍教师数",
          placeholder: "请输入外籍教师数",
          content: null,
          picker: [],
          type: "number",
          no: 4,
        },
        {
          title: "持教师资格证、专业技能证教师数",
          placeholder: "请输入持证教师数",
          content: null,
          picker: [],
          type: "number",
          no: 4,
        },
        {
          title: "公办中小学在职教师数",
          placeholder: "请输入在职教师数",
          content: null,
          picker: [],
          type: "number",
          no: 4,
        },
        {
          title: "是否通过消防验收",
          placeholder: "",
          content: null,
          picker: [
            {
              id: 0,
              name: "否",
            },
            {
              id: 1,
              name: "是",
            },
          ],
          type: "picker",
          no: 4,
        },
        {
          title: "是否寄宿",
          placeholder: "",
          content: null,
          picker: [
            {
              id: 0,
              name: "否",
            },
            {
              id: 1,
              name: "是",
            },
          ],
          type: "picker",
          no: 4,
        },
        {
          title: "是否提供餐饮",
          placeholder: "",
          content: null,
          picker: [
            {
              id: 0,
              name: "否",
            },
            {
              id: 1,
              name: "是",
            },
          ],
          type: "picker",
          no: 4,
        },
        {
          title: "有无餐饮服务许可证",
          placeholder: "",
          content: null,
          picker: [
            {
              id: 0,
              name: "无",
            },
            {
              id: 1,
              name: "有",
            },
          ],
          type: "picker",
          no: 4,
        },
      ];

      this.messageList[0].list = list1;
      this.messageList[1].list = list2;
      this.messageList[2].list = list3;
      this.messageList[3].list = list4;
      this.messageList[4].list = list5;
    },

    changeDate(event) {
      this.messageList[0].list[3].content = event;
    },

    subFrom() {
      let obj = this.formItem;
      obj.orgName = this.messageList[0].list[0].content;
      obj.regAreaId = this.messageList[0].list[1].content[2] || null;
      obj.areaId = this.messageList[0].list[2].content[2] || null;
      obj.establishDate = this.messageList[0].list[3].content || null;
      obj.uscCode = this.messageList[0].list[4].content;
      obj.setAddress = this.messageList[0].list[5].content;
      obj.businessAddress = this.messageList[0].list[6].content;
      obj.legalRep = this.messageList[0].list[7].content;
      obj.legalRepHouse = this.messageList[0].list[8].content;
      obj.chairman = this.messageList[0].list[9].content;
      obj.organizer = this.messageList[0].list[10].content;
      obj.organizerType = this.messageList[0].list[11].content;

      obj.srlNo = this.messageList[1].list[0].content;
      obj.issuingDeptId = this.messageList[1].list[1].content;
      obj.lprDeptId = this.messageList[1].list[2].content;
      obj.hasTrainContent = this.messageList[1].list[3].content;

      obj.trainType = this.messageList[2].list[0].content;
      obj.trainContent = this.messageList[2].list[1].content;
      obj.enrollmentTarge = this.messageList[2].list[2].content;
      obj.enrollmentScope = this.messageList[2].list[3].content;
      obj.lastTrainNumber = this.messageList[2].list[4].content || null;
      obj.nowStudentNumber = this.messageList[2].list[5].content || null;
      obj.trainForm = this.messageList[2].list[6].content;

      obj.pmSchoolSubject = this.messageList[3].list[0].content;
      obj.trainSubjectForm = this.messageList[3].list[1].content;

      obj.placeType = this.messageList[4].list[0].content;
      obj.placeArea = this.messageList[4].list[1].content;
      obj.staffNum = this.messageList[4].list[2].content;
      obj.teacherNum = this.messageList[4].list[3].content;
      obj.fTeacherNum = this.messageList[4].list[4].content;
      obj.cTeacherNum = this.messageList[4].list[5].content;
      obj.pTeacherNum = this.messageList[4].list[6].content;
      obj.isFireControl = this.messageList[4].list[7].content;
      obj.ifBoard = this.messageList[4].list[8].content;
      obj.ifFood = this.messageList[4].list[9].content;
      obj.ifCslicense = this.messageList[4].list[10].content || null;

      obj.ifLegal = this.list6.content;

      console.log(this.messageList);
      if (obj.orgName == "") {
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: "请填写机构名称!",
        });
      } else if (obj.areaId == null) {
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: "机构所在地不能为空!",
        });
      } else if (obj.ifLegal == null) {
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: "请选择状态!",
        });
      } else {
        console.log(obj);
        wAdd(obj).then((res) => {
          if (res.code == 200) {
            this.$Message.success({
              top: 300,
              closable: true,
              duration: 3,
              content: "添加成功!",
            });
            setTimeout(() => {
              this.$router.push({
                name: "h5-orgManage",
              });
            }, 2000);
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
    },
  },
};
</script>

<style lang="scss" scoped>
#agreement {
  position: relative;
  float: left;
  margin-left: 50%;
  max-width: 750px;
  width: 100%;
  transform: translateX(-50%);
  background-size: cover;
  padding: 0;
  z-index: 770;
  background: #f7f8fa;
  overflow: hidden;
  padding: 9px 0;

  .message {
    width: 100%;
    background: #fff;
    float: left;
    position: relative;
    margin-bottom: 12px;
    overflow: hidden;

    .label {
      height: 58px;
      position: relative;
      width: 100%;
      padding: 0 40rpx;
      box-sizing: border-box;
      padding: 0 18px;

      p {
        font-size: 16px;
        font-weight: 550;
        position: relative;
        float: left;
        display: inline-block;
        padding-left: 7px;
        box-sizing: border-box;
        line-height: 58px;
        color: #181818;
      }

      p::after {
        width: 2px;
        height: 15px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #181818;
        border-radius: 15px;
        content: "";
      }

      img {
        position: absolute;
        right: 20px;
        width: 13px;
        height: 13px;
        object-fit: contain;
        display: block;
        top: 40%;
        transition: all 0.2s;
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        /* IE 9 */
        -moz-transform: rotate(0deg);
        /* Firefox */
        -webkit-transform: rotate(0deg);
        /* Safari 和 Chrome */
        -o-transform: rotate(0deg);
      }
    }

    .label::after {
      background: #eeeeee;
      bottom: 0;
      height: 1px;
      width: 100%;
      left: 0;
      right: 0;
      content: "";
      position: absolute;
    }

    /deep/ .ivu-form {
      padding: 0 18px;
    }

    /deep/ .ivu-form-item {
      min-height: 50px;
      width: 100%;
      position: relative;
      float: left;
      padding-left: 120px;
      margin-bottom: 6px;
      border-bottom: 1px solid #f7f7f7;

      .ivu-form-item-label {
        padding: 0;
        text-align: left;
        line-height: 50px;
        height: 50px;
        font-size: 15px;
        color: #7e7e7e;
        font-weight: 550;
        position: absolute;
        left: 0;
        top: 0;
      }

      .ivu-date-picker {
        width: 100%;
      }

      .ivu-form-item-content {
        width: 100%;
        position: relative;
        float: left;
        margin-left: 0 !important;

        .ivu-radio-group {
          width: 100%;
          text-align: right;

          .ivu-radio-wrapper {
            width: 90px;
            margin-right: 0;
            position: relative;
            height: 50px;
            line-height: 50px;
          }
        }

        .ivu-cascader i::before,
        .ivu-select-arrow::before,
        .ivu-input-suffix i:before {
          content: "\F11F" !important;
        }
      }

      .ivu-input-with-suffix,
      .ivu-select-placeholder,
      .ivu-select-selected-value {
        border: none;
        height: 32px;
        line-height: 32px;
        text-align: right;
        margin: 9px 0;
      }

      .ivu-input-prefix i,
      .ivu-input-suffix i {
        font-size: 16px;
        line-height: 32px;
        color: #808695;
        position: absolute;
        top: 9px;
      }

      .ivu-tag-checked {
        .ivu-icon-ios-close:before {
          content: "\f178" !important;
        }
      }
    }

    /deep/ .ivu-form-item:last-child {
      border-bottom: none;
    }

    /deep/ .textareaItem {
      height: 146px;
      padding-left: 0;

      .ivu-input-type-textarea {
        position: absolute;
        top: 45px;

        .ivu-input {
          height: 80px !important;
          background: #f7f8fa;
          border: none;
          border-radius: 7px;
        }
      }
    }

    /deep/ .ivu-input-wrapper {
      .ivu-input {
        border: none;
        text-align: right;
        margin: 9px 0;
        height: 32px;
        padding-left: 10px;
      }
    }

    /deep/ .ivu-select-selection {
      border: none;
      text-align: right;
      margin: 9px 0;
      height: 32px;
    }

    /deep/ .ivu-select-placeholder {
      height: 32px !important;
      line-height: 32px !important;
    }

    /deep/ .ivu-form-label-top {
      .ivu-form-item {
        padding-top: 50px;
        padding-left: 0;
        width: 48%;
      }

      .ivu-form-item-label {
        width: 100% !important;
        top: 50%;
        transform: translateY(-50%);
        height: 60px;
        line-height: initial;
        display: inline-block;
      }

      .ivu-form-item-content {
        z-index: 7;
      }

      .ivu-form-item:nth-child(2),
      .ivu-form-item:nth-child(4),
      .ivu-form-item:nth-child(6),
      .ivu-form-item:nth-child(8),
      .ivu-form-item:nth-child(10) {
        float: right;
      }

      .ivu-form-item:nth-child(2)::before,
      .ivu-form-item:nth-child(4)::before,
      .ivu-form-item:nth-child(6)::before,
      .ivu-form-item:nth-child(8)::before,
      .ivu-form-item:nth-child(10)::before {
        width: 1px;
        height: 25px;
        position: absolute;
        left: -5%;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        background: #f0f0f0;
      }

      // .ivu-form-item:nth-last-child(2) {
      //   border-bottom: none;
      // }

      .ivu-input-default,
      .ivu-select-selected-value,
      .ivu-select-placeholder {
        text-align: left;
        padding-left: 0;
      }
    }
  }

  .messageClose {
    height: 58px;

    .label::after {
      display: none;
    }

    img {
      transform: rotate(180deg) !important;
      -ms-transform: rotate(180deg) !important;
      /* IE 9 */
      -moz-transform: rotate(180deg) !important;
      /* Firefox */
      -webkit-transform: rotate(180deg) !important;
      /* Safari 和 Chrome */
      -o-transform: rotate(180deg) !important;
    }
  }

  .formPanel {
    position: relative;
    float: left;
    width: 100%;
    padding: 0 18px;
    background: #fff;

    /deep/ .ivu-form-item {
      min-height: 50px;
      width: 100%;
      position: relative;
      float: left;
      padding-left: 120px;
      margin-bottom: 6px;

      .ivu-form-item-label {
        padding: 0;
        text-align: left;
        line-height: 50px;
        height: 50px;
        font-size: 15px;
        color: #7e7e7e;
        font-weight: 550;
        position: absolute;
        left: 0;
        top: 0;
      }

      .ivu-form-item-content {
        width: 100%;
        position: relative;
        float: left;
        margin-left: 0 !important;

        .ivu-select {
          display: inline-block;
          width: 100%;
          box-sizing: border-box;
          vertical-align: middle;
          color: #515a6e;
          font-size: 14px;
          line-height: normal;
        }

        .ivu-select-selection {
          border: none;
          text-align: right;
          margin: 9px 0;
          height: 32px;
          padding: 0 24px 0 4px;
        }

        .ivu-select-placeholder {
          text-align: right;
          margin: 9px 0;
        }

        .ivu-select-arrow {
          position: absolute;
          top: 50%;
          right: 8px;
          line-height: 1;
          transform: translateY(-50%);
          font-size: 14px;
          color: #808695;
          transition: all 0.2s ease-in-out;
        }

        .ivu-icon-ios-arrow-down:before {
          content: "\F11F" !important;
        }
      }
    }
  }

  .btn {
    position: relative;
    width: 100%;
    float: left;
    padding: 0 12px;

    /deep/ Button {
      width: 100%;
      height: 50px;
      line-height: 50px;
      margin: 13px 0;
      border: none;

      span {
        font-size: 18px;
        color: #fff;
      }
    }

    /deep/ .ivu-btn-default {
      background: #dddddd;
    }

    /deep/ .ivu-btn-primary {
      background: #006bff;
      float: right;
    }
  }
}
</style>