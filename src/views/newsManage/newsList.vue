<template>
  <div class="trainlist">
    <Row v-if="rowPanel==1">
      <div
        class="header"
        ref="header"
      >
        <div class="title">
          <span>新闻列表</span>
        </div>
        <div class="export-btn">
          <div
            @click="goAdd"
            class="ceshifirst"
          >
            <div class="firsticon">
              <Icon
                type="md-add-circle"
                color="#427ef4"
                size="35"
              />
            </div>

            <div class="firsttitle">添加新闻</div>
          </div>
        </div>
      </div>
    </Row>
    <!-- 搜索 -->
    <Row v-if="rowPanel==1">
      <div class="search">
        <Form
          :model="searchForm"
          ref="searchForm"
          :loading="loading"
          style="display: flex; float: left"
          :label-width="80"
        >

          <FormItem label="添加时间">
            <Row>
              <DatePicker
                @on-change="startTimeChange"
                :options="startTimeOptions"
                format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                style="width: 180px; z-index: 7"
              ></DatePicker>
            </Row>
          </FormItem>
          <FormItem
            label="至"
            style="margin-left:-50px;"
          >
            <Row>
              <DatePicker
                @on-change="endTimeChange"
                :options="endTimeOptions"
                format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                style="width: 180px; z-index: 7"
              ></DatePicker>
            </Row>
          </FormItem>

          <FormItem label="状态">
            <Select
              v-model="searchForm.status"
              :value="searchForm.status"
              transfer
              style="width: 90px"
              @on-change="changeCondition"
            >
              <Option :value="0"> 全 部 </Option>
              <Option :value="1">展示</Option>
              <Option :value="2">隐藏</Option>
            </Select>
          </FormItem>

          <FormItem label="关键字">
            <Input
              v-model="searchForm.key"
              @input="selectInput"
              placeholder="请输入新闻标题进行搜索"
              style="width: 240px"
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

    <div
      class="content"
      v-if="rowPanel==1"
    >
      <div class="bannerPanel contentPanel">

        <div
          class="demo"
          @click="goAdd"
          v-if="searchForm.pageNumber==1"
        >
          <div class="bg"></div>
          <div class="add"></div>
          <p class="addText">添加新闻</p>
        </div>
        <template v-for="(item,index) in newsList">
          <div class="demo">
            <div class="bg"></div>

            <div
              class="hideBtn"
              v-if="item.isShow==0"
            >
              <img src="../../assets/news/hide2.png">
            </div>

            <div class="cont">
              <img :src="item.imgUrl">
              <div class="text">
                <p>{{item.title}}</p>
              </div>
            </div>

            <div class="operate">
              <div
                class="oper"
                @click="newsDone(item.id,item.isShow)"
              >
                <img src="../../assets/news/hide.png">
                <p>{{`${item.isShow==0?'显示':'隐藏'}`}}</p>
              </div>
              <div
                class="oper"
                @click="getNewsDetail(item.id)"
              >
                <img src="../../assets/news/eidt.png">
                <p>修改</p>
              </div>
              <div
                class="oper"
                @click="newsDel(item.id)"
              >
                <img src="../../assets/news/del.png">
                <p>删除</p>
              </div>
            </div>
          </div>
        </template>

      </div>

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

    <Row v-if="rowPanel==2">
      <div
        class="header"
        ref="header"
      >
        <div class="title">
          <span>添加新闻</span>
        </div>
      </div>
    </Row>

    <div
      class="content"
      v-if="rowPanel==2"
    >
      <div
        class="contentPanel"
        style="padding-top:30px;"
      >
        <Form
          :model="formItem"
          :label-width="92"
        >
          <FormItem label="新闻标题">
            <Input
              v-model="formItem.title"
              maxlength="30"
              placeholder="请输入新闻标题，最多30字"
            ></Input>
          </FormItem>

          <FormItem
            label="封面图"
            class="uploadCarousel"
          >
            <div class="demo-upload-list">
              <img
                :src="formItem.imgUrl"
                v-if="formItem.imgUrl!==''"
              />
              <Icon
                type="ios-close-circle"
                v-if="formItem.imgUrl!==''"
                @click="carouseRemove"
              />
            </div>
            <Upload
              v-if="formItem.imgUrl==''"
              ref="upload"
              :on-success="handleSuccess"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="carouselUpload"
              multiple
              type="drag"
              action
              style="display: inline-block; width: 58px"
            >
              <div class="uploadBtn">
                <Icon
                  type="ios-camera"
                  size="20"
                ></Icon>
              </div>
            </Upload>
          </FormItem>

          <FormItem
            label="新闻详情"
            class="uploadCarousel uploadParticulars"
          >
            <vue-editor
              v-model="formItem.content"
              placeholder="这里输入文字...."
              :editor-toolbar="customToolbar"
              :useCustomImageHandler="true"
              @image-added="handleImageAdded"
            />
          </FormItem>

          <FormItem
            label="设置为教培头条展示"
            class="formSwitch"
          >
            <i-switch
              v-model="formItem.showIndex"
              :true-value="1"
              :false-value="0"
              size="large"
            >
              <span slot="open"></span>
              <span slot="close"></span>
            </i-switch>
          </FormItem>

          <FormItem>
            <Button @click="goBack">返回</Button>
            <Button
              v-if="editId==null||editId==''"
              type="primary"
              @click="newsAdd"
            >添加新闻</Button>
            <Button
              v-else
              type="primary"
              @click="newsEdit"
            >修改新闻</Button>
          </FormItem>
        </Form>
      </div>
    </div>

    <Modal
      class="choseNewsModal"
      :mask-closable="false"
      v-model="modal2"
      width="660"
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

      <div
        class="modalHeader"
        slot="header"
      >
        <p>头条展示内容已满，是否要替换？</p>
      </div>

      <div class="modalContent">
        <Form
          ref="addForm"
          :model="addForm2"
          v-if="selnewsList.length!==0"
        >
          <FormItem>
            <RadioGroup>
              <template v-for="(item,index) in selnewsList">
                <Radio
                  :label="item.id"
                  :disabled="item.disabled"
                  :style="`float:${(index+1)%2==0?'right':'left'}`"
                >
                  <div @click="newsChange(item,index)">
                    <img :src="item.imgUrl">
                    <p class="title">{{item.title}}</p>
                  </div>
                </Radio>
              </template>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>

      <div
        class="modalFooter"
        slot="footer"
      >
        <Button
          v-if="selnewsList.length!==0"
          type="text"
          @click="addNewsImg"
        >确认替换</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Debounce, Throttle } from "../../libs/util";
import { uploadPic } from "../../libs/ali-oss";
import { compressImg } from "../../libs/compress";
import { VueEditor } from "vue2-editor";

import {
  getNewsList,
  getNewsDetail,
  newsAdd,
  newsEdit,
  newsDel,
  newsDone,
} from "@/api";
export default {
  components: {},
  data() {
    return {
      rowPanel: 1,

      // 上传图片相关
      imgName: "",
      visible: false,
      uploadList: [],

      modal1: false,

      courseId: null,

      totalLesson: 0,

      carouseList: [],

      beginDate: "",
      endDate: "",

      searchForm: {
        pageNumber: 1,
        pageSize: 7,
        beginDate: "",
        endDate: "",
        status: "",
        key: "",
      },

      loading: false,

      total: 0,

      newsList: [],

      formItem: {
        title: "",
        imgUrl: "",
        content: "",
        showIndex: 0,
      },

      editId: null,

      modal2: false,
      addForm2: {},
      selnewsList: [],

      editorContent: "",
      customToolbar: [
        [
          "bold",
          "italic",
          "underline",
          "strike",
          { direction: "" },
          { direction: "rtl" },
        ],
        [{ background: [] }, { color: [] }],
        [{ align: "" }, { align: "right" }, { align: "center" }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        ["link", "image", "video", "code-block"],
      ],
      disabledHours: [],

      disabledfn: true,
      startTimeOptions: {}, //开始日期设置
      endTimeOptions: {}, //结束日期设置
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.getNewsList();
    this.getNewsList2();
  },
  methods: {
    // 关闭并返回
    goBack() {
      this.rowPanel = 1;
      this.formItem = {
        title: "",
        imgUrl: "",
        content: "",
        showIndex: 0,
      };
      this.editId = null;
    },

    goAdd() {
      this.rowPanel = 2;
    },

    restoration() {
      this.searchForm = {
        pageNumber: 1,
        pageSize: 7,
        beginDate: "",
        endDate: "",
        status: "",
        key: "",
      };
    },

    getNewsList() {
      let obj = this.searchForm;
      getNewsList(obj).then((res) => {
        if (res.code == 200) {
          this.newsList = res.result.content;
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

    getNewsList2() {
      let obj = {
        pageNumber: 1,
        pageSize: 4,
        beginDate: "",
        endDate: "",
        status: 1,
        key: "",
      };
      getNewsList(obj).then((res) => {
        if (res.code == 200) {
          this.selnewsList = res.result.content;
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

    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 7;
      this.getNewsList();
    },

    selectInput(e) {
      this.searchForm.key = e;
    },

    setBeginDate() {
      var picker = this.$refs["beginDate"];
      var date = picker.visualValue;
      date = date.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);
      this.searchForm.beginDate = data;
    },

    setEndDate() {
      var picker = this.$refs["endDate"];
      var date = picker.visualValue;
      date = date.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);
      this.searchForm.endDate = data;
    },

    // 开始时间
    startTimeChange: function (e) {
      let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      let starttime = date;
      this.endTimeOptions = {
        disabledDate: (date) => {
          let startTime = starttime ? new Date(starttime).valueOf() : "";
          return date && date.valueOf() < startTime;
        },
      };
      this.disabledfn = false;
      this.searchForm.beginDate = date;
    },

    // 结束时间
    endTimeChange: function (e) {
      console.log(e);
      let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      console.log(date);
      let endtime = date;
      let endTime = endtime
        ? new Date(endtime).valueOf() - 1 * 24 * 60 * 60 * 1000
        : "";
      this.startTimeOptions = {
        disabledDate(date) {
          return date && date.valueOf() > endTime;
        },
      };

      this.searchForm.endDate = date;
    },

    changePage(e) {
      this.searchForm.pageNumber = e;
      if (e !== 1) {
        this.searchForm.pageSize = 8;
      }
      this.getNewsList();
    },

    changePageSize(e) {
      this.searchForm.pageSize = e;
      this.getNewsList();
    },

    // 上传图片相关
    handleView(name) {
      this.imgName = name;
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

    changeCondition(e) {
      console.log(e);
      this.searchForm.status = e;
    },

    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png.",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M.",
      });
    },

    // 轮播图 上传
    carouselUpload(file) {
      let path = "data/news/";
      uploadPic(file, path).then((res) => {
        console.log(res);
        if (res.name !== "") {
          let newImg = "https://file.zahooedu.com/" + res.name;
          this.formItem.imgUrl = newImg;
        }
      });
    },

    carouseRemove() {
      this.formItem.imgUrl = "";
    },

    handleReset(name) {
      this.$refs[name].resetFields();
    },

    // 编辑器
    handleImageAdded(file, Editor, cursorLocation) {
      //上传前压缩图片
      compressImg(file).then((res) => {
        console.log(res);
        //上传图片操作
        let path = "data/particulars/";
        uploadPic(res, path).then((rest) => {
          console.log(rest);
          if (rest.url !== "") {
            //把获取到的图片url 插入到鼠标所在位置 回显图片
            Editor.insertEmbed(cursorLocation, "image", rest.url);
          }
        });
      });
    },

    getNewsDetail(id) {
      getNewsDetail({ id }).then((res) => {
        if (res.code == 200) {
          this.rowPanel = 2;
          this.formItem.imgUrl = res.result.imgUrl;
          this.formItem.content = res.result.content;
          this.formItem.title = res.result.title;
          this.formItem.showIndex = res.result.showIndex;
          this.editId = res.result.id;
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

    closeModal() {
      // this.formItem.replaceId = "";
      this.modal2 = false;
    },

    newsChange(item, index) {
      this.newsItem = item;
    },

    addNewsImg() {
      if (this.newsItem.id !== "" && this.newsItem.id !== undefined) {
        this.formItem.replaceId = this.newsItem.id;
      }
      this.newsAdd();
      this.closeModal();
    },

    newsAdd() {
      let obj = this.formItem;
      if (obj.title == "") {
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: "请输入新闻标题",
        });
        return;
      } else if (obj.imgUrl == "") {
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: "请添加封面图片",
        });
        return;
      } else if (obj.content == "") {
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: "请输入新闻内容",
        });
        return;
      } else {
        newsAdd(obj).then((res) => {
          if (res.code == 200) {
            this.$Message.success({
              top: 300,
              closable: true,
              duration: 3,
              content: "添加成功",
            });
            this.goBack();
            this.getNewsList();
            this.getNewsList2();
          } else if (res.code == 504) {
            this.$Message.error({
              top: 300,
              closable: true,
              duration: 3,
              content: res.message,
            });
            this.modal2 = true;
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

    newsEdit() {
      let obj = this.formItem;
      obj.id = this.editId;
      if (obj.title == "") {
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: "请输入新闻标题",
        });
        return;
      } else if (obj.imgUrl == "") {
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: "请添加封面图片",
        });
        return;
      } else if (obj.content == "") {
        this.$Message.error({
          top: 300,
          closable: true,
          duration: 3,
          content: "请输入新闻内容",
        });
        return;
      } else {
        newsEdit(obj).then((res) => {
          if (res.code == 200) {
            this.$Message.success({
              top: 300,
              closable: true,
              duration: 3,
              content: "修改成功",
            });
            this.goBack();
            this.getNewsList();
            this.getNewsList2();
          } else if (res.code == 504) {
            this.$Message.error({
              top: 300,
              closable: true,
              duration: 3,
              content: res.message,
            });
            this.modal2 = true;
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

    newsDel(id) {
      newsDel({ id }).then((res) => {
        if (res.code == 200) {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: "操作成功",
          });
          this.getNewsList();
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

    newsDone(id, isShow) {
      if (isShow == 0) {
        var type = 1;
      } else {
        var type = 0;
      }
      newsDone({ id, type }).then((res) => {
        if (res.code == 200) {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: "操作成功",
          });
          this.getNewsList();
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
  },
};
</script>

<style lang="scss" scoped>
.trainlist {
  padding: 0 36px 0 42px;
  position: relative;

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
    /deep/ .ivu-form {
      .ivu-form-item {
        margin: 10px 0;
        margin-right: 12px;

        .input-suffix i {
          font-size: 16px;
          line-height: 40px;
        }

        .ivu-form-item-label {
          font-weight: 550;
          color: #1e275e;
        }

        .ivu-form-item-content {
          position: relative;
          line-height: 32px;
          font-size: 14px;

          .ivu-select-placeholder {
            color: #bfc4dd !important;
            background-color: #e2e7f3;
            height: 40px !important;
            line-height: 40px !important;
            border-radius: 10px !important;
            border: 0px !important;
          }
          .ivu-select-selected-value {
            color: #5669d9;
            background-color: #e2e7f3;
            height: 40px !important;
            line-height: 40px !important;
            border-radius: 10px !important;
            border: 0px !important;
          }
          .ivu-select-selection {
            color: #bfc4dd;
            background-color: #e2e7f3;
            height: 40px !important;
            line-height: 40px !important;
            border-radius: 10px !important;
            border: 0px !important;
          }
          .ivu-input::-webkit-input-placeholder {
            color: #bfc4dd;
          }
          .ivu-input::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #bfc4dd;
          }
          .ivu-input::-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #bfc4dd;
          }
          .ivu-input::-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: #bfc4dd;
          }

          .ivu-input {
            background-color: #e2e7f3;
            border: #e2e7f3;
            color: #5669d9;
          }

          .ivu-input {
            border-radius: 10px;
            height: 40px;
            overflow: hidden;
          }
        }
      }
    }

    /deep/ .ivu-input {
      background-color: #e2e7f3;
      border: #e2e7f3;
      color: #5669d9;
    }

    /deep/ .sou button {
      background: #427ef4;
      color: white;
      border-radius: 20px;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 19px 6px;
    .title {
      color: #373737;
      font-weight: 600;
      font-size: 20px;
      font-weight: bold;
      line-height: 32px;
      margin-left: 45px;
      position: relative;
    }

    .title::before {
      bottom: -3px;
      width: 27px;
      height: 5px;
      border-radius: 30px;
      background: #9fbffe;
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .export-btn {
      text-align: center;
      button {
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

      .firsttitle {
        color: #427ef4;
      }
    }
  }

  .content {
    position: relative;
    width: 100%;
    min-width: 1200px;
    overflow-x: auto;
    background: #f0f2f7;
    border-radius: 30px;
    float: left;
    box-sizing: border-box;

    .contentPanel {
      width: 100%;
      position: relative;
      float: left;
      padding: 40px 30px 0 30px;

      .title {
        height: 100px;
        position: relative;
        float: left;
        width: 100%;
        line-height: 100px;
        font-size: 24px;
        font-weight: 550;
        color: #373737;
      }

      .demo {
        width: 24%;
        height: 280px;
        position: relative;
        float: left;
        border-radius: 16px;
        overflow: hidden;
        margin-left: 1%;
        margin-bottom: 60px;

        .bg {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          border-radius: 16px;
          border: 2px dashed #417ef4;
        }

        .hideBtn {
          width: 40px;
          height: 40px;
          right: 8px;
          top: 8px;
          position: absolute;
          z-index: 7;
          cursor: pointer;

          img {
            width: 40px;
            height: 40px;
            object-fit: contain;
          }
        }

        .add {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 40%;
          transform: translate(-50%, -50%);
          background: #417ef4;
          z-index: 2;
          cursor: pointer;
        }

        .add::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          border-radius: 30px;
          width: 5px;
          height: 32px;
        }
        .add::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          border-radius: 30px;
          height: 5px;
          width: 32px;
        }

        .addText {
          position: absolute;
          width: 100%;
          text-align: center;
          bottom: 90px;
          font-weight: 550;
          font-size: 16px;
          color: #1d212d;
        }

        .cont {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 6;
          left: 0;
          top: 0;
          box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.15);

          img {
            position: relative;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .text {
            height: 70px;
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            background: rgba($color: #000000, $alpha: 0.65);

            p {
              line-height: 28px;
              font-size: 16px;
              position: absolute;
              width: 100%;
              top: 50%;
              transform: translateY(-50%);
              color: #fff;
              padding: 0 20px;
            }
          }
        }

        .operate {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background: rgba($color: #000000, $alpha: 0.66);
          z-index: 7;
          display: none;

          .oper {
            width: 40px;
            height: 80px;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;

            img {
              width: 40px;
              height: 40px;
              object-fit: contain;
              position: relative;
              float: left;
            }

            p {
              position: relative;
              float: left;
              height: 40px;
              width: 100%;
              text-align: center;
              color: #fff;
              line-height: 40px;
              font-size: 18px;
            }
          }

          .oper:nth-child(1) {
            left: 25%;
          }
          .oper:nth-child(2) {
            left: 50%;
          }
          .oper:nth-child(3) {
            left: 75%;
          }
        }
      }

      .demo:hover {
        .operate {
          display: block;
        }
      }

      .demo:nth-child(1),
      .demo:nth-child(5) {
        margin-left: 0;
      }
    }

    .ivu-row-flex {
      position: relative;
      width: 100%;
      padding-right: 30px;
      margin-bottom: 20px;
    }

    .contentPanel {
      /deep/ .ivu-form {
        width: 740px;
        position: relative;
        float: left;
        margin-left: 50%;
        transform: translateX(-50%);

        .ivu-form-item {
          margin: 10px 0;
          position: relative;
          margin-right: 12px;
          float: left;
          width: 100%;

          .ivu-form-item-label {
            font-weight: 550;
            color: #1e275e;
            font-size: 18px;
            padding: 0 20px 0 0;
            height: 52px;
            line-height: 52px;
          }

          .ivu-input-default {
            border-radius: 10px;
            background: #fff;
            height: 52px;
            line-height: 52px;
            border: none;
          }

          .demo-upload-list {
            width: 210px;
            height: 170px;
            border: 2px dashed #3e7bf3;
            border-radius: 16px;

            img {
              width: 206px;
              border-radius: 16px;
              height: 166px;
              object-fit: cover;
            }

            .ivu-icon {
              position: absolute;
              color: #ff4b67;
              font-size: 20px;
              left: 200px;
              top: -10px;
            }
          }

          .ivu-upload {
            display: inline-block;
            width: 58px;
            height: 58px;
            background: #3e7bf3;
            border-radius: 50%;
            position: absolute;
            left: 105px;
            top: 85px;
            transform: translate(-50%, -50%);

            .ivu-upload-drag {
              opacity: 0;
              left: 0;
              top: 0;
              transform: none;
            }
          }

          .ivu-upload::after {
            height: 26px;
            width: 4px;
            border-radius: 20px;
            content: "";
            position: absolute;
            background: #fff;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }

          .ivu-upload::before {
            height: 4px;
            width: 26px;
            border-radius: 20px;
            content: "";
            position: absolute;
            background: #fff;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }

          .quillWrapper {
            background: #fff;
            border-radius: 10px;
            overflow: hidden;

            .ql-toolbar {
              border: none;
              padding: 16px 0 0 0;
              height: 56px;
              box-shadow: 0 2px 4px rgba($color: #b8bdee, $alpha: 0.26);
            }

            .ql-container {
              border: none;
              height: 200px;
              overflow-y: auto;
              scrollbar-width: none;
            }

            ::-webkit-scrollbar {
              display: none; /* Chrome Safari */
            }
          }

          .ivu-btn {
            width: 230px;
            height: 46px;
            background: #d5d8e0;
            border: none;
            color: #3e3e3e;
            font-size: 18px;
            border-radius: 10px;
            margin-left: 32px;
            margin-bottom: 10px;
          }

          .ivu-btn.ivu-btn-primary {
            background: #417ef4;
            color: #fff;
          }
        }

        .formSwitch {
          .ivu-form-item-label {
            width: 182px !important;
          }

          .ivu-form-item-content {
            margin-left: 182px !important;
            height: 52px;
            line-height: 52px;

            .ivu-switch {
              height: 32px;
              width: 66px;
            }

            .ivu-switch:after {
              content: "";
              width: 28px;
              height: 28px;
            }

            .ivu-switch-checked {
              border-color: #3e7bf3;
              background-color: #3e7bf3;
            }
          }
        }
      }
    }
  }
}

.choseNewsModal {
  /deep/ .ivu-modal {
    border-radius: 20px !important;
    margin-top: 100px;

    .ivu-modal-content {
      border-radius: 20px !important;
      background: #fff;
    }
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
  }

  /deep/ .modalHeader {
    position: relative;
    width: 100%;
    height: 55px;

    p {
      width: 100%;
      font-size: 21px;
      text-align: center;
      position: relative;
      float: left;
      height: 32px;
      margin-top: 12px;
      line-height: 32px;
      font-weight: 550;
      color: #1c1c1c;
    }
  }

  /deep/ .ivu-modal-body,
  /deep/ .ivu-modal-footer {
    padding: 22px 26px 30px 26px;
    position: relative;
    width: 100%;
    text-align: center;

    .ivu-input-wrapper {
      margin-bottom: 20px;
    }

    .ivu-input {
      padding-left: 52px;
      border-radius: 40px;
      height: 50px;
      font-size: 18px;
    }

    .ivu-input-prefix i {
      font-size: 32px;
      line-height: 32px;
      color: #e2e2e2;
      top: 10px;
      position: absolute;
    }

    label {
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;

      span {
        word-break: break-all;
      }
    }

    .ivu-form-item-content {
      margin-left: 0;

      .ivu-radio-wrapper {
        width: 285px;
        background: #f8f8f8;
        margin-bottom: 20px;
        border-radius: 15px;
        height: 115px;
        position: relative;
        margin-right: 0;
        padding-top: 76px;
        overflow: hidden;

        img {
          width: 100%;
          height: 74px;
          position: absolute;
          left: 0;
          top: 0;
          object-fit: cover;
        }

        .title {
          position: relative;
          float: left;
          width: 285px;
          line-height: 18px;
          height: 36px;
          text-align: left;
          font-size: 14px;
          color: #494949;
          padding: 0 10px;
          display: inline-block;
          white-space: pre-wrap;
        }

        .ivu-radio {
          position: absolute;
          overflow: hidden;
          background: #e1e1e1;
          top: -30px;
          z-index: 77;
          right: -30px;
          width: 60px;
          border-radius: 0;
          height: 60px;
          margin-right: 0;
          transform: rotate(45deg);

          .ivu-radio-inner {
            border: none;
            position: relative;
            width: 100%;
            height: 100%;
            background: transparent;
          }

          .ivu-radio-inner::before {
            width: 7px;
            height: 12px;
            position: absolute;
            background: transparent;
            top: 42px;
            left: 24px;
            content: "";
            display: table;
            border: 2px solid #fff;
            border-top: 0;
            border-left: 0;
            -webkit-transition: all 0.2s ease-in-out;
            transition: all 0.2s ease-in-out;
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
        }

        .ivu-radio-checked {
          background: #4480f5 !important;
          box-shadow: none !important;
          top: -30px;
          z-index: 77;
          right: -30px;
          width: 60px;
          border-radius: 0;
          height: 60px;
          margin-right: 0;
          transform: rotate(45deg);
        }

        .ivu-radio-focus {
          box-shadow: none !important;
        }

        .ivu-radio-inner:after {
          width: 7px;
          height: 12px;
          position: absolute;
          background: transparent;
          top: 42px;
          left: 24px;
          content: "";
          display: table;
          border: 2px solid #fff;
          border-top: 0;
          border-left: 0;
          transition: all 0.2s ease-in-out;
          transform: rotate(0deg);
        }
      }
    }

    .ivu-page {
      float: right;
      position: relative;
    }
  }

  /deep/ .ivu-radio-group-default {
    width: 100%;
  }

  /deep/ .ivu-modal-body {
    z-index: 77;
  }

  /deep/ .ivu-modal-footer {
    border-top: 0;

    .ivu-btn {
      width: 260px;
      height: 60px;
      background: #006bff;
      color: #fff;
      text-align: center;
      line-height: 60pxc;
      border-radius: 10px;
      font-size: 20px;
    }
  }
}
</style>
