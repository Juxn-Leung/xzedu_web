<template>
  <div class="trainlist">
    <Row>
      <div
        class="header"
        ref="header"
      >
        <div class="title">
          <span>教材备案</span>
        </div>
        <div class="export-btn">
          <div @click="goAdd">
            <div class="firsticon">
              <Icon
                type="md-add-circle"
                color="#427ef4"
                size="35"
              />
            </div>

            <div class="firsttitle">添加教材资料</div>
          </div>
        </div>
      </div>
    </Row>
    <!-- 搜索 -->

    <Row>
      <div class="search">
        <Form
          :model="searchForm"
          ref="searchForm"
          style="display: flex; float: left"
          :label-width="76"
        >

          <FormItem label="年级">
            <Select
              v-model="searchForm.gradeId"
              style="width: 110px"
              @on-change="changeGrade"
            >
              <Option :value="0">全部</Option>
              <Option
                v-for="(item, index) in gradeList"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem label="科目">
            <Select
              v-model="searchForm.subjectId"
              style="width: 110px"
              @on-change="changeSubject"
            >
              <Option :value="0">全部</Option>
              <Option
                v-for="(item, index) in subjectList"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem label="类型">
            <Select
              v-model="searchForm.type"
              :value="searchForm.type"
              transfer
              style="width: 110px"
              @on-change="changeType"
            >
              <Option :value="0">全部</Option>
              <Option :value="1">出版物</Option>
              <Option :value="2">自编资料</Option>
            </Select>
          </FormItem>

          <FormItem label="关键字">
            <Input
              v-model="searchForm.key"
              @input="selectInput"
              placeholder="请输入学生姓名或手机号码进行搜索"
              style="width: 260px"
            />
          </FormItem>
        </Form>
        <div
          class="sou"
          style="float: right; margin: 15px 0px 11px 0px"
        >
          <Button
            type="primary"
            @click="handleSearch"
          >搜索</Button>
        </div>
      </div>
    </Row>

    <!-- 表格 -->
    <div class="table_content">
      <Row>
        <Table
          size="large"
          :columns="columns"
          :data="data"
          border
          ref="table"
          :loading="loading"
          :height="tableHeight"
        >
          <template
            slot-scope="{row}"
            slot="type"
          >
            {{row.type==1?'出版物':'自编资料'}}
          </template>
          <template
            slot="action"
            slot-scope="{ row, index }"
          >
            <Button
              :type="row.status !== 0 ? 'info' : 'primary'"
              size="small"
              style="
                background: #87D6A3;
                margin-right: 7px;"
              @click="goEdit(row, index)"
            >编辑</Button>

            <Button
              type="error"
              size="small"
              style="
                margin-right: 3px; 
                background: #FA455E;"
              @click="handleDelete(row, index)"
            >删除</Button>
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
            :page-size-opts="[10, 20, 50]"
            show-total
            show-elevator
            show-sizer
          ></Page>
        </div>
      </Row>
    </div>

    <Modal
      class="addModal"
      v-model="modal"
      width="740"
    >
      <p
        slot="close"
        style="
          border: 1px solid #818284 !important;
          border-radius: 100%;
          background: white;
        "
      >
        <Icon
          @click="clearAddForm"
          type="ios-close-circle"
          style="margin-top: 1px; margin-left: 0px"
          size="24"
        ></Icon>
      </p>

      <div
        class="modalHeader"
        slot="header"
      >
        <p>添加教材资料</p>
        <h5>（带<span>*</span>号为必填项）</h5>
      </div>

      <div class="modalContent">
        <Form
          ref="addForm"
          :model="addForm"
          :rules="ruleCustom"
          :label-width="150"
        >
          <FormItem
            label="授课材料名称"
            prop="name"
          >
            <Input
              v-model="addForm.name"
              placeholder="请输入授课材料名称"
            ></Input>
          </FormItem>

          <FormItem
            label="使用年级"
            class="selectForm"
            prop="gradeId"
          >
            <Select
              v-model="addForm.gradeId"
              @on-change="changeFormGrade"
            >
              <Option
                v-for="(item, index) in gradeList"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem
            label="科目"
            class="selectForm"
            prop="subjectId"
          >
            <Select
              v-model="addForm.subjectId"
              @on-change="changeFormSubject"
            >
              <Option
                v-for="(item, index) in subjectList"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem
            label="使用时间"
            class="datePanel"
            style="width: 160px"
            prop="beginDate"
          >
            <Row>
              <DatePicker
                ref="beginDate"
                v-model="addForm.startTime"
                @on-open-change="setStartTimeOption"
                @on-change="setBeginDate"
                :options="startTimeOption"
                :editable="false"
                format="yyyy年MM月dd日"
                type="date"
                show-week-numbers
                placeholder="选择日期"
                :clearable="false"
                style="width: 200px; z-index: 7"
              >
              </DatePicker>
              <p class="to">至</p>
            </Row>
          </FormItem>

          <FormItem
            class="datePanel datePanel2"
            style="width: 160px;margin-left:40px;"
            prop="endDate"
          >
            <Row>
              <DatePicker
                ref="endDate"
                v-model="addForm.finishTime"
                @on-open-change="setEndTimeOption"
                @on-change="setEndDate"
                :options="startTimeOption"
                :editable="false"
                format="yyyy年MM月dd日"
                type="date"
                show-week-numbers
                placeholder="选择日期"
                :clearable="false"
                style="width: 200px; z-index: 7"
              >
              </DatePicker>
            </Row>
          </FormItem>

          <FormItem
            class="checkboxForm"
            style="width: 16%"
          >
            <Checkbox
              :true-value="1"
              :false-value="0"
              @on-change="checkboxIsLongterm"
              v-model="addForm.isLongterm"
            >长期</Checkbox>
          </FormItem>

          <FormItem
            class="radioForm"
            label="类型"
            prop="mode"
          >
            <RadioGroup v-model="addForm.type">
              <Radio :label="1">
                <span>出版物</span>
              </Radio>
              <Radio :label="2">
                <span>自编资料</span>
              </Radio>
            </RadioGroup>
          </FormItem>

          <FormItem
            label="ISBN/ CIP编号"
            prop="isbnCip"
            v-if="addForm.type==1"
          >
            <Input
              v-model="addForm.isbnCip"
              placeholder="请输入 ISBN/ CIP编号"
            ></Input>
          </FormItem>

          <FormItem
            class="uploadForm"
            label="上传附件"
            prop="imgList"
          >
            <h5 class="hint">(请上传教材、教辅、教案、课件等授课材料关键信息图片)</h5>

            <Upload
              v-if="addForm.type==1"
              ref="upload"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="51200"
              :before-upload="coverUpload"
              :on-format-error="uploadError"
              :on-exceeded-size="sizeExceeded"
              v-model="addForm.coverImg"
              multiple
              type="drag"
              action
              style="display: inline-block; width: 58px"
            >
              <div class="uploadBtn"></div>
              <p class="title">封面</p>
              <div
                class="example"
                @click.stop="showImgModal(book_cover)"
              >
                <img src="../../assets/book/cover_mini.png">
                <Icon type="md-eye" />
              </div>

              <div
                class="image"
                v-if="addForm.coverImg!==''&&addForm.coverImg!==null"
              >
                <img
                  @click.stop="showImgModal(addForm.coverImg)"
                  :src="addForm.coverImg"
                />
                <Icon
                  type="ios-close-circle"
                  @click.stop="coverRemove('coverImg')"
                />
              </div>
            </Upload>

            <Upload
              v-if="addForm.type==1"
              ref="upload"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="51200"
              :before-upload="copyrightUpload"
              :on-format-error="uploadError"
              :on-exceeded-size="sizeExceeded"
              v-model="addForm.copyRightImg"
              multiple
              type="drag"
              action
              style="display: inline-block; width: 58px"
            >
              <div class="uploadBtn"></div>
              <p class="title">版权页</p>
              <div
                class="example"
                @click.stop="showImgModal(book_copyright)"
              >
                <img src="../../assets/book/copyright_mini.png">
                <Icon type="md-eye" />
              </div>

              <div
                class="image"
                v-if="addForm.copyRightImg!==''&&addForm.copyRightImg!==null"
              >
                <img
                  @click.stop="showImgModal(addForm.copyRightImg)"
                  :src="addForm.copyRightImg"
                />
                <Icon
                  type="ios-close-circle"
                  @click.stop="copyrightRemove"
                />
              </div>
            </Upload>

            <Upload
              v-if="addForm.type==1"
              ref="upload"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="51200"
              :before-upload="catalogueUpload"
              :on-format-error="uploadError"
              :on-exceeded-size="sizeExceeded"
              v-model="addForm.menuImg"
              multiple
              type="drag"
              action
              style="display: inline-block; width: 58px"
            >
              <div class="uploadBtn"></div>
              <p class="title">目录第一页</p>
              <div
                class="example"
                @click.stop="showImgModal(book_menu)"
              >
                <img src="../../assets/book/catalogue_mini.png">
                <Icon type="md-eye" />
              </div>

              <div
                class="image"
                v-if="addForm.menuImg!==''&&addForm.menuImg!==null"
              >
                <img
                  @click.stop="showImgModal(addForm.menuImg)"
                  :src="addForm.menuImg"
                />
                <Icon
                  type="ios-close-circle"
                  @click.stop="catalogueRemove"
                />
              </div>
            </Upload>

            <div
              v-if="addForm.type==2"
              class="uploadlist"
            >
              <div
                class="img"
                v-for="(item, index) in addForm.imgList"
              >
                <img :src="item" />
                <Icon
                  type="ios-close-circle"
                  @click="delImgList(index)"
                />
              </div>

              <Upload
                v-if="addForm.type==2"
                ref="upload"
                :format="['jpg', 'jpeg', 'png']"
                :max-size="51200"
                ::on-format-error="uploadError"
                :on-exceeded-size="sizeExceeded"
                :before-upload="imgListUpload"
                multiple
                type="drag"
                action
                style="display: inline-block;"
              >
                <div class="uploadBtn"></div>
              </Upload>
            </div>

            <div
              class="exampleList"
              v-if="addForm.type==2"
            >
              <div
                class="example"
                @click.stop="showImgModal(book_1)"
              >
                <img src="https://file.zahooedu.com/book_1.jpg">
                <Icon type="md-eye" />
              </div>
              <div
                class="example"
                @click.stop="showImgModal(book_2)"
              >
                <img src="https://file.zahooedu.com/book_2.jpg">
                <Icon type="md-eye" />
              </div>
              <div
                class="example"
                @click.stop="showImgModal(book_3)"
              >
                <img src="https://file.zahooedu.com/book_3.jpg">
                <Icon type="md-eye" />
              </div>
            </div>

          </FormItem>

          <div class="upload2Form">
            <div class="foeTtem">
              <p>其他附件<span>({{addForm.extraList.length}}) </span></p>
              <h5> (若授课材料中有音频、视频、word、ppt文件请上传)</h5>
              <Upload
                ref="upload"
                :format="['word','mp3','mp4','avi','pdf','jpg', 'jpeg','png']"
                :max-size="51200"
                action
                :before-upload="uploadOrter"
                :on-format-error="uploadError"
                :on-exceeded-size="sizeExceeded"
                multiple
                type="drag"
                style="display: inline-block;"
              >
                <div class="uploadBtn"></div>
              </Upload>
            </div>

            <template v-for="(item,index) in addForm.extraList">
              <div class="accessory">
                <p><span>{{index + 1}}. </span>{{item.name}} <span style="color:#bababa;">({{item.size}}kb)</span></p>
                <Icon
                  @click="delAccessory(index);"
                  type="md-close"
                />
              </div>
            </template>
          </div>
        </Form>
      </div>

      <div
        class="modalFooter"
        slot="footer"
      >
        <Button
          v-if="modalPlan==1"
          type="text"
          @click="addTextbook"
        >添加</Button>

        <Button
          v-if="modalPlan==2"
          type="text"
          @click="eidtTextbook"
        >修改</Button>
      </div>
    </Modal>

    <Modal
      :mask-closable="false"
      v-model="modal2"
      width="680"
    >
      <p
        slot="close"
        style="
          border: 1px solid #818284 !important;
          border-radius: 100%;
          background: white;
        "
      >
        <Icon
          type="ios-close-circle"
          style="margin-top: 1px; margin-left: 0px"
          size="24"
        ></Icon>
      </p>

      <div style="text-align: center">
        <img
          style="float: left; width: 100%"
          src="../../assets/agreement/tishi.jpg"
        />
      </div>

      <div slot="footer">
        <Button type="text"></Button>
      </div>
    </Modal>

    <Modal
      class="addModal"
      :mask-closable="false"
      width="700"
      v-model="modal3"
    >
      <div
        class="modalHeader"
        slot="header"
      >
        <p>图片大图</p>
      </div>
      <p
        slot="close"
        style="
          border: 1px solid #818284 !important;
          border-radius: 100%;
          background: white;
        "
      >
        <Icon
          type="ios-close-circle"
          style="margin-top: 1px; margin-left: 0px"
          size="24"
        ></Icon>
      </p>

      <img
        :src="modal3img"
        style="width: 60%;margin-top:20px;"
      >

      <div
        class="modalFooter"
        slot="footer"
      >
        <Button
          type="text"
          @click="closeModal3"
        >确定</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import {
  bookGradeList,
  getSubjectList,
  getAddresslist,
  summary,
  addBook,
  editBook,
  delBook,
  bookList,
  bookDetail,
} from "@/api";
import { uploadPic } from "../../libs/ali-oss";
export default {
  data() {
    const validateImgList = (rule, value, callback) => {
      if (
        this.addForm.coverImg == "" ||
        this.addForm.copyRightImg == "" ||
        this.addForm.menuImg == ""
      ) {
        if (value.length == 0) {
          callback(new Error("请上传附件"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateBeginTime = (rule, value, callback) => {
      if (this.addForm.isLongterm == 0) {
        if (value == "") {
          return callback(new Error("请选择上课开始时间"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateEndTime = (rule, value, callback) => {
      if (this.addForm.isLongterm == 0) {
        if (value == "") {
          return callback(new Error("请选择上课结束时间"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateIsbnCip = (rule, value, callback) => {
      if (this.addForm.type == 2) {
        if (value == "") {
          return callback(new Error("请输入 ISBN/ CIP编号"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    
    return {
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        key: "",
        type: 0,
        subjectId: 0,
        gradeId: 0,
        orgId: "",
      },
      total: 0,
      addressData: [],
      gradeList: [],
      subjectList: [],
      columns: [
        {
          title: "授课资料名称",
          key: "name",
          align: "center",
          width: 240,
        },
        {
          title: "年级",
          key: "gradeName",
          align: "center",
          minWidth: 80,
        },
        {
          title: "科目",
          key: "subjectName",
          align: "center",
          minWidth: 80,
        },
        {
          title: "类型",
          slot: "type",
          align: "center",
          minWidth: 80,
        },
        {
          title: "ISBN/ CIP编号",
          key: "isbnCip",
          align: "center",
          minWidth: 100,
        },
        {
          title: "使用时间",
          key: "useTime",
          align: "center",
          minWidth: 160,
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 240,
        },
      ],
      data: [],
      loading: true,
      tableHeight: 0,
      dateStatus: false,
      dateForm: { date: "", id: "" },
      dateList: [],
      // 进度,1-添加,2-修改
      modalPlan: 1,
      modal: false,
      modal2: false,
      modal3: false,
      modal3img: "",

      addForm: {
        orgId: "",
        name: "",
        gradeId: null,
        subjectId: null,
        isLongterm: 1,
        beginDate: "",
        endDate: "",
        startTime: "",
        finishTime: "",
        type: 1,
        isbnCip: "",
        coverImg: "",
        copyRightImg: "",
        menuImg: "",
        imgList: [],
        extraList: [],
      },

      ruleCustom: {
        name: [
          { required: true, message: "请输入授课材料名称", trigger: "blur" },
        ],
        gradeId: [
          {
            required: true,
            message: "请选择年级",
            trigger: "change",
            type: "number",
          },
        ],
        subjectId: [
          {
            required: true,
            message: "请选择科目",
            trigger: "change",
            type: "number",
          },
        ],
        beginDate: [{ validator: validateBeginTime, trigger: "blur" }],
        endDate: [{ validator: validateEndTime, trigger: "blur" }],
        isbnCip: [{ validator: validateIsbnCip, trigger: "blur" }],
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change",
            type: "number",
          },
        ],

        imgList: [{ validator: validateImgList, trigger: "blur" }],
      },

      startTimeOption: {},

      book_menu: "https://file.zahooedu.com/book_menu.jpg",
      book_copyright: "https://file.zahooedu.com/book_copyright.jpg",
      book_cover: "https://file.zahooedu.com/book_cover.jpg",

      book_1: "https://file.zahooedu.com/book_1.jpg",
      book_2: "https://file.zahooedu.com/book_2.jpg",
      book_3: "https://file.zahooedu.com/book_3.jpg",

      accessoryList: [],
      imgList: [],
      extraList: [],
    };
  },
  watch: {
    "$store.state.organization.myOrgId"() {
      //监听vuex中userName变化而改变header里面的值
      this.getOrgId();
    },
  },
  created() {
    this.getGradeList();
    this.getSubjectList();
    this.getOrgId();
    this.bookList();
  },
  mounted() {},
  destroyed() {
    // 销毁全局方法
    window.onresize = null;
  },
  computed: {},
  methods: {
    // 获取年级，科目列表
    getGradeList() {
      bookGradeList().then((res) => {
        console.log(res);
        this.gradeList = res.result;
      });
    },

    getSubjectList() {
      getSubjectList().then((res) => {
        console.log(res);
        this.subjectList = res.result;
      });
    },

    getOrgId() {
      let id = this.$store.state.organization.myOrgId;
      this.addForm.orgId = id;
      if (id !== "" && id !== null && id !== undefined) {
        if (this.searchForm.orgId !== "" && this.searchForm.orgId !== id) {
          // 重置
          this.searchForm = {
            pageNumber: 1,
            pageSize: 10,
            key: "",
            type: 0,
            subjectId: 0,
            gradeId: 0,
            orgId: "",
          };
        }
        this.searchForm.orgId = id;
      }
    },

    // 筛选相关
    selectInput(e) {
      this.searchForm.key = e;
    },

    changeGrade(e) {
      console.log(e);
      this.searchForm.gradeList = e;
    },

    changeSubject(e) {
      console.log(e);
      this.searchForm.subjectList = e;
    },

    changeType(e) {
      console.log(e);
      this.searchForm.type = e;
    },

    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.bookList();
    },

    // 确认日期
    handleSubmitDate() {
      this.$refs.dateForm.validate((valid) => {
        if (valid) {
          this.$router.push({ name: "everyDay", query: this.dateForm });
        }
      });
    },

    // 新增页面
    goAdd() {
      this.modal = true;
      this.modalPlan = 1;
      this.clearAddForm();
    },

    // 修改
    goEdit(row, index) {
      let obj = {};
      obj.id = row.id;
      bookDetail(obj).then((res) => {
        if (res.code == 200) {
          console.log(res);
          this.addForm = res.result;
          if(res.result.isLongterm!==1){
            let time1 = Date.parse(new Date(res.result.beginDate));
            this.addForm.startTime = new Date(parseInt(time1));
            let time2 = Date.parse(new Date(res.result.endDate));
            this.addForm.finishTime = new Date(parseInt(time2));
          }
          this.modalPlan = 2;
          this.modal = true;
          // this.$refs["addForm"].validate((valid) => {});
        } else {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
        }
      });
    },

    changeFormGrade(e) {
      console.log(e);
      for (var i in this.gradeList) {
        if (this.gradeList[i].id == e) {
          var sectionId = this.gradeList[i].sectionId;
        }
      }
      this.addForm.gradeList = e;
      this.getSubjectList(sectionId);
    },

    changeFormSubject(e) {
      this.addForm.subjectList = e;
    },

    checkboxIsLongterm() {
      if (this.addForm.isLongterm == 1) {
        this.addForm.finishTime = "";
        this.addForm.startTime = "";
        this.addForm.beginDate = "";
        this.addForm.endDate = "";
      }
    },

    setBeginDate() {
      var picker = this.$refs["beginDate"];
      var date = picker.visualValue;
      date = date.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);
      this.addForm.beginDate = date;
      this.addForm.isLongterm = 0;
    },

    setEndDate() {
      var picker = this.$refs["endDate"];
      var date = picker.visualValue;
      date = date.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);
      this.addForm.endDate = date;
      this.addForm.isLongterm = 0;
    },

    setStartTimeOption() {
      if (this.addForm.endDate !== "") {
        let time2 = this.addForm.endDate + " " + "00:00:00";
        time2 = new Date(time2).getTime();
        this.startTimeOption = {
          disabledDate(time) {
            return time && time.valueOf() > time2;
          },
        };
      }
    },

    setEndTimeOption() {
      if (this.addForm.beginDate !== "") {
        let time2 = this.addForm.beginDate + " " + "00:00:00";
        time2 = new Date(time2).getTime();
        this.startTimeOption = {
          disabledDate(time) {
            // 大于等于上一个的时间
            return time && time.valueOf() <= time2;
          },
        };
      }
    },

    //  上传
    coverUpload(file) {
      let path = "data/book/cover";
      this.$Loading.start();
      uploadPic(file, path).then((res) => {
        if (res.name !== "") {
          let newImg = "https://file.zahooedu.com/" + res.name;
          this.addForm.coverImg = newImg;
          this.$Loading.finish();
        } else {
          this.$Loading.error();
        }
      });
    },

    copyrightUpload(file) {
      let path = "data/book/copyright";
      this.$Loading.start();
      uploadPic(file, path).then((res) => {
        if (res.name !== "") {
          let newImg = "https://file.zahooedu.com/" + res.name;
          this.addForm.copyRightImg = newImg;
          this.$Loading.finish();
        } else {
          this.$Loading.error();
        }
      });
    },

    catalogueUpload(file) {
      let path = "data/book/catalogue";
      this.$Loading.start();
      uploadPic(file, path).then((res) => {
        if (res.name !== "") {
          let newImg = "https://file.zahooedu.com/" + res.name;
          this.addForm.menuImg = newImg;
          this.$Loading.finish();
        } else {
          this.$Loading.error();
        }
      });
    },

    // 上传
    imgListUpload(file) {
      let path = "data/book/material";
      if (Number(file.size) <= 52428800) {
        this.$Loading.start();
        uploadPic(file, path).then((res) => {
          this.addForm.imgList.push(res.url);
          this.$Loading.finish();
        });
      } else {
        this.$Loading.error();
      }
    },

    // 上传 附件
    uploadOrter(file) {
      let path = "data/book/accessory";
      let obj = {
        name: file.name,
        url: "",
        size: (file.size/1024).toFixed(2),
      };
      console.log(file);
      if (Number(file.size) <= 52428800) {
        this.$Loading.start();
        let list = this.addForm.extraList;
        uploadPic(file, path).then((res) => {
          obj.url = res.url;
          list.push(obj);
          this.addForm.extraList = list;
          this.$Loading.finish();
        });
      } else {
        this.$Loading.error();
      }
    },

    // 删除 附件
    delAccessory(index) {
      this.addForm.extraList.splice(index, 1);
    },

    delImgList(index) {
      this.addForm.imgList.splice(index, 1);
    },

    // 删除
    coverRemove() {
      this.addForm.coverImg = "";
    },
    copyrightRemove() {
      this.addForm.copyRightImg = "";
    },
    catalogueRemove() {
      this.addForm.menuImg = "";
    },

    sizeExceeded() {
      this.$Message.error({
        top: 300,
        closable: true,
        duration: 3,
        content: "文件大小不能超过50M！",
      });
    },

    uploadError() {
      this.$Message.error({
        top: 300,
        closable: true,
        duration: 3,
        content: "文件格式错误！",
      });
    },

    // 展示示例
    showImgModal(msg) {
      this.modal3img = msg;
      this.modal3 = true;
    },

    closeModal3() {
      this.modal3 = false;
    },

    clearAddForm() {
      this.addForm = {
        orgId: "",
        name: "",
        gradeId: null,
        subjectId: null,
        isLongterm: 1,
        beginDate: "",
        endDate: "",
        startTime: "",
        finishTime: "",
        type: 1,
        isbnCip: "",
        coverImg: "",
        copyRightImg: "",
        menuImg: "",
        imgList: [],
        extraList: [],
      };
      this.getOrgId();
    },

    // 添加
    addTextbook() {
      this.$refs["addForm"].validate((valid) => {
        console.log(valid);
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.addForm));
          console.log(obj);
          addBook(obj).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: "保存成功！",
              });
              this.modal = false;
              this.bookList();
              this.clearAddForm();
            } else {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: res.message,
              });
            }
          });
        }
      });
    },

    // 修改
    eidtTextbook() {
      this.$refs["addForm"].validate((valid) => {
        console.log(valid);
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.addForm));
          editBook(obj).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: "修改成功！",
              });
              this.modal = false;
              this.bookList();
              this.clearAddForm();
            } else {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: res.message,
              });
            }
          });
        }
      });
    },

    changePage(e) {
      this.searchForm.pageNumber = e;
      this.bookList();
    },

    changePageSize(e) {
      this.searchForm.pageSize = e;
      this.bookList();
    },

    // 获取数据
    bookList() {
      let obj = {};
      obj = this.searchForm;

      bookList(obj).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.loading = false;
        }
      });
    },

    handleDelete(row, index) {
      let params = {
        id: row.id,
      };
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除这个课程?",
        onOk: () => {
          delBook(params).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: "删除成功!",
              });
              // 刷新
              this.bookList();
            } else {
              this.$Message.error({
                top: 300,
                closable: true,
                duration: 3,
                content: res.message,
              });
            }
          });
        },
      });
    },
  },
};
</script>

<style  lang="scss" scoped>
.trainlist {
  padding: 0 16px 0 36px;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 19px 6px;
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

    .export-btn button {
      background: transparent;
      border: none;

      /deep/ span {
        color: #427ef4;
        position: absolute;
        top: 50px;
        right: 40px;
        font-size: 16px;
        margin-left: 0;
        width: 64px;
      }

      /deep/ i {
        width: 42px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        color: #fff;
        font-size: 22px;
        border-radius: 50%;
        background: #427ef4;
        position: absolute;
        top: 7px;
        right: 52px;
      }
    }
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

.ivu-table-row .ivu-btn {
  width: 72px;
}

textarea.ivu-input {
  height: 160px;
}
/deep/ .ivu-modal-footer {
  border: 0px;
}
/deep/ .ivu-modal {
  top: 30px;
}
/deep/ .ivu-table-cell {
  padding-left: 0;
  padding-right: 0;
}
// .ivu-form{
//   width: 100%;
// }

.first {
  float: left;
  width: 30%;
  height: 30px;
  background: black;
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
  color: #515a6e;
  // border-radius: 50%;
}

.footer_btn {
  .ivu-btn {
    height: 40px;
    width: 40%;
    margin-right: 6.66666%;
  }
}
a {
  color: #818284 !important;
}

.ceshifirst {
  width: 50px;
  height: 50px;
  cursor: pointer;
  text-align: center;
}

.firsticon {
  float: left;
  width: 100%;
  text-align: center;
}

.firsttitle {
  font-size: 12px;
  color: #427ef4;
  font-weight: 550;
}

/deep/ .ivu-table td {
  border-bottom: 6px solid #f0f2f7;
}

/deep/ .ivu-table th {
  background-color: #f0f2f7;
  border: 0px;
}

.ivu-row-flex-end {
  margin-top: 10px;
  padding-bottom: 20px;
  padding-right: 20px;
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

/deep/ .ivu-table table {
  overflow-y: auto;
}

/deep/ .ivu-table-wrapper {
  border: none;
}

/deep/ .ivu-table-tip tr {
  background: #f0f2f7;
}

/deep/ .ivu-table th {
  background: #f0f2f7;
  border: 0;
}
/deep/ .ivu-table-border td {
  border: 0px;
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

/deep/ .ivu-form-item-content .ivu-select-placeholder {
  color: #bfc4dd !important;
  background-color: #e2e7f3;
  height: 40px !important;
  line-height: 40px !important;
  border-radius: 10px !important;
  border: 0px !important;
}
/deep/ .ivu-form-item-content .ivu-select-selected-value {
  color: #5669d9;
  background-color: #e2e7f3;
  height: 40px !important;
  line-height: 40px !important;
  border-radius: 10px !important;
  border: 0px !important;
}
/deep/ .ivu-form-item-content .ivu-select-selection {
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
  background-color: #fff;
  border: #eaeaea 1px solid;
  color: #5669d9;
}

/deep/ .ivu-input {
  border-radius: 6px;
  height: 40px;
  overflow: hidden;
}

/deep/ .ivu-form .ivu-form-item-label {
  text-align: right;
  padding: 14px 16px 10px 0 !important;
}

/deep/ .ivu-input-suffix i {
  font-size: 16px;
  line-height: 40px;
  color: #808695;
}

/deep/ .ivu-form-item-label {
  font-weight: 550;
  color: #1e275e;
}

.sou button {
  background: #427ef4;
  color: white;
  border-radius: 16px;
  margin-right: 12px;
}

/deep/ .ivu-spin-fix {
  background: transparent;
  border: none !important;
}

.addModal {
  /deep/ .ivu-modal {
    border-radius: 20px !important;
    margin-top: 100px;

    .ivu-modal-content {
      border-radius: 20px !important;
      background: #fff;
    }
  }

  /deep/ .modalHeader {
    position: relative;
    width: 100%;
    height: 64px;

    p {
      width: 100%;
      font-size: 20px;
      text-align: center;
      position: relative;
      float: left;
      height: 20px;
      margin-top: 12px;
      line-height: 20px;
      font-weight: 550;
      color: #161616;
    }

    h5 {
      width: 100%;
      font-size: 16px;
      text-align: center;
      position: relative;
      float: left;
      height: 20px;
      margin-top: 5px;
      line-height: 20px;
      color: #535353;

      span {
        color: #f43939;
      }
    }
  }

  /deep/ .ivu-modal-body,
  /deep/ .ivu-modal-footer {
    padding: 0 0 30px 0;
    position: relative;
    width: 100%;
    text-align: center;
  }

  /deep/ .ivu-modal-body {
    z-index: 77;

    /deep/ .ivu-input {
      color: #2a2a2a !important;
    }

    .datePanel {
      /deep/ .ivu-input {
        height: 42px;
        line-height: 42px;
        padding: 0 18px;
        position: relative;
        float: left;
        color: #6b6b6b;
        z-index: 77;
      }

      /deep/ .ivu-form-item-content {
        position: relative;
        // float: left;
        width: 100%;
        height: 42px;
        padding-right: 0 !important;
      }

      /deep/ .ivu-input-suffix {
        line-height: 42px;
        height: 42px;
        z-index: 78;
      }

      /deep/ .ivu-icon {
        height: 42px;
        line-height: 42px;
        color: #696969 !important;
      }

      /deep/ .to {
        font-size: 17px;
        color: #8e8e8e;
        position: absolute;
        width: 60px;
        display: inline-block;
        font-weight: 550;
        text-align: center;
        right: -50px;
        top: 6px;
      }
    }

    .datePanel2 /deep/ .ivu-form-item-content {
      padding-left: 0 !important;
    }

    .datePanel2 /deep/ .ivu-form-item-error-tip {
      left: 0;
    }

    .checkboxForm {
      padding-left: 0 !important;

      /deep/ .ivu-form-item-content {
        margin-left: 150px;
        width: 100px;
        margin-top: 4px;

        .ivu-checkbox {
          left: -5px;
        }
      }

      /deep/ .ivu-form-item-content label {
        color: #8e8e8e;
        font-size: 16px !important;
        font-weight: 550;
      }

      /deep/ .ivu-checkbox-wrapper-checked {
        color: #006bff !important;
      }

      /deep/ .ivu-checkbox-checked .ivu-checkbox-inner {
        display: inline-block;
        width: 15px;
        height: 15px;
        position: relative;
        top: 0;
        left: 0;
        background-color: #fff;
        border-radius: 50%;
        transition: all 0.2s ease-in-out;
        background: #fff;
        border: 1px solid #006bff;
        box-shadow: 0 0 0 2px #006bff !important;
        z-index: 1 !important;
      }

      /deep/ .ivu-checkbox-inner {
        box-shadow: 0 0 0 2px #c5c5c5 !important;
        z-index: 1 !important;
      }

      /deep/ .ivu-checkbox-checked .ivu-checkbox-inner::after {
        width: 11px;
        height: 11px;
        position: absolute;
        background: #006bff;
        left: 2px;
        top: 2px;
        content: "";
        border-radius: 50%;
        border: none !important;
      }
    }

    .checkboxForm /deep/ .ivu-checkbox-wrapper .ivu-checkbox-inner {
      border-radius: 50%;
      overflow: hidden;
      border: none;
    }

    .radioForm /deep/ .ivu-radio-group {
      text-align: left;
      width: 100%;
    }

    .radioForm /deep/ .ivu-radio-group label {
      position: relative !important;
      width: auto !important;
      left: auto !important;
      top: auto !important;
      font-size: 16px !important;
      color: #8b8b8b;
      margin-right: 0 !important;
      padding-right: 90px !important;

      /deep/ .ivu-radio-inner {
        border: none;
        box-shadow: 0 0 0 2px #c5c5c5;
      }
    }

    .radioForm /deep/ .ivu-radio-wrapper-checked {
      color: #006bff !important;

      /deep/ .ivu-radio-inner {
        border: none;
        box-shadow: 0 0 0 2px #006bff !important;
      }

      /deep/ .ivu-radio-inner::after {
        width: 12px;
        height: 12px;
        position: absolute;
        background: #006bff;
        left: 2px;
        top: 2px;
        content: "";
        border-radius: 50%;
        border: none !important;
      }
    }

    .selectForm {
      /deep/ .ivu-form-item-content {
        border-radius: 8px;
      }

      /deep/ .ivu-select-arrow {
        right: 50px;
      }

      /deep/ .ivu-select-arrow::after {
        position: absolute;
        left: 0;
        bottom: 0;
        content: "";
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 7px solid #3a4d78;
        top: 4px;
        left: 2px;
      }

      /deep/ .ivu-select-selected-value {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        background-color: transparent !important;
        color: #2a2a2a !important;
        border-radius: 6px !important;
        text-align: left !important;
      }
    }

    .uploadForm {
      position: relative;
      height: 300px;

      /deep/ .hint {
        position: absolute;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        color: #ff4b67;
        left: 140px;
        top: -42px;
      }

      /deep/ .ivu-form-item-content {
        height: 250px;
        width: 100%;
        border-radius: 6px;
        background: url("../../assets/book/border_icon.png") no-repeat center
          center;
        float: left;
        margin-left: 0 !important;

        /deep/ .ivu-upload {
          width: 33.33333% !important;
          height: 250px !important;
          position: relative;
          float: left;

          .ivu-upload-drag {
            position: absolute;
            width: 130px !important;
            height: 140px !important;
            top: 14px;
            left: 50%;
            transform: translateX(-50%);
            background: url("../../assets/book/border_min_icon.png") no-repeat
              center center;
            background-size: cover;
            border: none;
            overflow: initial;

            /deep/ .uploadBtn {
              position: absolute;
              width: 43px !important;
              height: 43px !important;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: url("../../assets/book/add_icon.png") no-repeat center
                center;
              background-size: 100% 100%;
            }

            /deep/ .title {
              position: absolute;
              width: 100%;
              height: 33px;
              line-height: 33px;
              text-align: center;
              font-size: 15px;
              color: #417df4;
              bottom: -33px;
            }

            /deep/ .example {
              position: absolute;
              width: 100%;
              height: 60px;
              bottom: -93px;

              img {
                width: 50px;
                height: 54px;
                position: absolute;
                top: 48%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 8px;
              }

              i {
                z-index: 7;
                position: absolute;
                left: 50%;
                top: 50%;
                color: #fff;
                transform: translate(-50%, -50%);
              }
            }

            /deep/ .example::after {
              content: "示例";
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 0;
              font-size: 14px;
              color: #949494;
              height: 30px;
              line-height: 30px;
            }

            /deep/ .example::before {
              content: "";
              width: 50px;
              height: 54px;
              position: absolute;
              top: 48%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 8px;
              background: #000;
              opacity: 0.5;
              z-index: 1;
            }
          }
        }

        /deep/ .uploadlist {
          overflow-x: auto;
          // overflow-y: hidden;
          height: 180px;
          width: 100%;
          position: relative;
          float: left;
          padding: 16px;

          /deep/ .ivu-upload {
            width: 130px !important;
            height: 140px !important;
            margin-right: 25px;
            margin-left: 25px;
            .ivu-upload {
              top: 0 !important;
              margin-right: 0;
              margin-left: 0;
            }
          }

          .img {
            width: 130px;
            height: 140px;
            margin-right: 25px;
            margin-left: 25px;
            margin-bottom: 16px;
            position: relative;
            float: left;

            img {
              width: 130px;
              height: 140px;
              border-radius: 13px;
              -o-object-fit: cover;
              object-fit: cover;

              position: relative;
              float: left;
            }

            /deep/ .ivu-icon {
              width: 21px;
              height: 21px;
              position: absolute;
              right: -11px;
              top: -11px;
              border-radius: 50%;
              background: #fd7f7f;
            }

            /deep/ .ivu-icon::after {
              height: 4px;
              width: 14px;
              background: #fff;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              content: "";
              position: absolute;
            }

            /deep/ .ivu-icon::before {
              display: none;
            }
          }
        }

        /deep/ .exampleList::before {
          content: "";
          width: 100%;
          height: 1px;
          border: 1px dashed #e4e4e4;
          top: -8px;
          left: 0;
          position: absolute;
        }

        /deep/ .exampleList {
          position: relative;
          float: left;
          height: 70px;
          width: 100%;
          padding-left: 60px;

          /deep/ .example {
            position: relative;
            width: 60px;
            height: 60px;
            bottom: 10px !important;
            margin-right: 10px;
            float: left;
            margin-top: 10px;

            img {
              width: 50px;
              height: 54px;
              position: absolute;
              top: 48%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 8px;
            }

            i {
              z-index: 7;
              position: absolute;
              left: 50%;
              top: 50%;
              color: #fff;
              transform: translate(-50%, -50%);
            }
          }

          /deep/ .example::before {
            content: "";
            width: 50px;
            height: 54px;
            position: absolute;
            top: 48%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8px;
            background: #000;
            opacity: 0.5;
            z-index: 1;
          }
        }

        /deep/ .exampleList::after {
          content: "示例";
          width: 60px;
          height: 60px;
          line-height: 60px;
          position: absolute;
          left: 0;
          top: 0;
          font-size: 15px;
          color: #949494;
        }
      }

      /deep/ .image {
        position: absolute;
        z-index: 777;
        width: 130px;
        height: 140px;
        background: #fff;

        img {
          width: 130px;
          height: 140px;
          border-radius: 13px;
          object-fit: cover;
        }

        /deep/ .ivu-icon {
          width: 21px;
          height: 21px;
          position: absolute;
          right: -11px;
          top: -11px;
          border-radius: 50%;
          background: #fd7f7f;
        }

        /deep/ .ivu-icon::after {
          height: 4px;
          width: 14px;
          background: #fff;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          content: "";
          position: absolute;
        }

        /deep/ .ivu-icon::before {
          display: none;
        }
      }
    }

    .upload2Form {
      position: relative;
      width: 740px;
      float: left;
      margin-left: -60px;
      margin-top: -14px;
      padding-bottom: 30px;
      text-align: left;

      .foeTtem {
        position: relative;
        width: 100%;
        background: #f4fbff;
        border-top: 1px solid #cae0ff;
        border-bottom: 1px solid #cae0ff;
        height: 46px;
        padding-left: 120px;
      }

      p {
        display: inline-block;
        height: 44px;
        line-height: 44px;
        font-size: 17px;
        font-weight: 550;
        color: #4c4c4c;
        position: relative;

        span {
          color: #006bff;
        }
      }

      h5 {
        font-size: 15px;
        padding-left: 4px;
        color: #c1c1c1;
        display: inline-block;
        height: 44px;
        line-height: 44px;
        position: relative;
      }

      /deep/ .ivu-upload-drag {
        position: absolute;
        right: 88px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 20px;
        background: #6d9eff;
        width: 80px;
        height: 34px;
        display: inline-block;
        border: none;
      }

      /deep/ .ivu-upload-drag::after {
        text-align: center;
        height: 34px;
        line-height: 34px;
        width: 80px;
        color: #fff;
        position: absolute;
        content: "上传文件";
        left: 0;
        top: 0;
      }

      /deep/ .accessory {
        position: relative;
        width: 100%;
        height: 28px;
        padding-left: 140px;

        /deep/ .accessory p {
          display: inline-block;
          font-size: 16px !important;
          color: #75a6f0 !important;
          height: 28px !important;
          line-height: 28px !important;

          span {
            color: #5e5e5e !important;
          }

          b {
            font-weight: 500 !important;
            color: #bababa !important;
          }
        }

        i {
          font-size: 20px;
          color: #ff4b67;
          margin-left: 10px;
        }
      }
    }

    /deep/ .ivu-form-item {
      position: relative;
      width: 100%;
      float: left;
    }

    /deep/ .ivu-date-picker {
      width: 160px !important;
    }
  }

  /deep/ .modalContent {
    padding: 30px 90px 30px 60px;
    position: relative;
    float: left;
    width: 100%;

    /deep/ .ivu-form-item-label {
      font-size: 17px;
      padding: 0 18px 0 0 !important;
      line-height: 40px;
      height: 40px;
      text-align: right;
      color: #4c4c4c;
    }
  }

  /deep/ .modalFooter {
    position: relative;
    // float: left;
    width: 100%;
    padding: 0;

    Button {
      width: 270px;
      position: relative;
      background: #417df4;
      border-radius: 10px;
      text-align: center;
      line-height: 60px;
      height: 60px;
      color: #fff;
      font-size: 18px;
    }
  }

  /deep/ .ivu-form-item-content .ivu-select-selection {
    background-color: transparent !important;
    border: #eaeaea 1px solid !important;
    color: #2a2a2a !important;
    border-radius: 6px !important;
    text-align: left !important;

    .ivu-select-placeholder {
      background-color: transparent !important;
      border: none;
      color: #bfc4dd !important;
      border-radius: 6px !important;
      text-align: left !important;
    }
  }
}
</style>