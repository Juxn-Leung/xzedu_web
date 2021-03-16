<template>
  <div class="trainlist">
    <Row>
      <div
        class="header"
        ref="header"
      >
        <div class="title">
          <span>编辑轮播</span>
        </div>
      </div>
    </Row>

    <div class="content">
      <div class="bannerPanel contentPanel">
        <div class="title">
          <p>banner轮播</p>
          <h5>排序</h5>
        </div>

        <template v-for="(item,index) in bannerList">
          <div class="bannerDemo">
            <p class="no">{{index + 1}}.</p>
            <div
              class="icon1"
              @click="bannerUpward(index)"
            >
              <img :src="item.icon1">
            </div>
            <div
              class="icon2"
              @click="bannerDownward(index)"
            >
              <img :src="item.icon2">
            </div>

            <div
              v-if="item.imgUrl== ''"
              class="uploadPanel"
            >
              <Upload
                ref="upload"
                :on-success="handleSuccess"
                :format="['jpg', 'jpeg', 'png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="(file)=> beforeUpload(file, index)"
                multiple
                type="drag"
                action
              >
              </Upload>
              <p class="addText">上传图片</p>
            </div>

            <img
              class="bannerImg"
              v-else
              :src="item.imgUrl"
            >
            <div
              v-if="item.imgUrl!== ''"
              class="delete"
              @click="deleteBannerImg(index)"
            ></div>

            <div class="radioPanel">
              <RadioGroup
                v-model="item.type"
                @on-change="changeType(index)"
              >
                <Radio :label="1">
                  <span>跳转内容</span>
                </Radio>
                <Radio :label="2">
                  <span>跳转链接</span>
                </Radio>
                <Radio :label="3">
                  <span>无跳转</span>
                </Radio>
              </RadioGroup>
            </div>
            <div class="btn">
              <p
                v-if="item.type==1"
                @click="showCoursesModal(index)"
              >选择内容</p>
              <h5 v-if="item.type==1&&item.courseName!==null&&item.courseName!==''"><span>已选择:</span>{{item.courseName}}</h5>
              <Input
                v-if="item.type==2"
                v-model="item.link"
                placeholder="请输入链接"
              />
            </div>

          </div>
        </template>

        <Button
          class="button"
          type="primary"
          @click="newsAddBanner"
        >保存</Button>
      </div>

      <div class="newsPanel contentPanel">
        <div class="title">
          <p>头条轮播</p>
          <h5>排序</h5>
        </div>

        <template v-for="(item,index) in newsList">
          <div class="bannerDemo">
            <p class="no">{{index + 1}}.</p>
            <div
              class="icon1"
              @click="newsUpward(index)"
            >
              <img :src="item.icon1">
            </div>
            <div
              class="icon2"
              @click="newsDownward(index)"
            >
              <img :src="item.icon2">
            </div>

            <div
              v-if="item.imgUrl== ''"
              class="uploadPanel"
            >
              <div
                class="newsUpload"
                @click="showAddNewsModal(index)"
              >
                <div class="add"></div>
              </div>
              <p class="addText">上传图片</p>
            </div>

            <img
              v-else
              :src="item.imgUrl"
              class="newsImg"
            >
            <div
              v-if="item.text!== ''"
              class="newsText"
            >
              <p>{{item.text}}</p>
            </div>
            <div
              v-if="item.imgUrl!== ''"
              class="delete"
              @click="deleteNewsImg(index)"
            ></div>
          </div>
        </template>

        <Button
          class="button"
          type="primary"
          @click="newsAddHeadLine"
        >保存</Button>
      </div>
    </div>

    <Modal
      class="choseCoursesModal"
      :mask-closable="false"
      v-model="modal"
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
        <p>选择内容</p>
      </div>

      <div class="modalContent">
        <Input
          prefix="ios-search"
          @on-change="inputChange"
          placeholder="请输入机构名称或课程名称进行查询"
        />

        <Form
          ref="addForm"
          :model="addForm"
        >
          <FormItem>
            <RadioGroup
              v-model="addForm.courses"
              @on-change=""
              v-if="selcoursesList.length!==0"
            >
              <template v-for="(item,index) in selcoursesList">
                <Radio
                  :label="item.id"
                  :disabled="item.disabled"
                  :style="`float:${(index+1)%2==0?'right':'left'}`"
                >
                  <div @click="coursesChange(item)">
                    <img :src="item.coverImg">
                    <p class="name">{{item.name}}</p>
                    <p class="org">{{item.orgName}}</p>
                    <p class="teacher">授课老师:{{item.lecturerName}}</p>
                  </div>
                </Radio>
              </template>
            </RadioGroup>
          </FormItem>

          <Page
            :total="total"
            :page-size="pageSize"
            show-total
            class="paging"
            @on-change="change_page"
            @on-page-size-change="change_page_size"
          ></Page>
        </Form>
      </div>

      <div
        class="modalFooter"
        slot="footer"
      >
        <Button
          v-if="modalPlan==1"
          type="text"
          @click="addCourses"
        >添加</Button>

        <Button
          v-if="modalPlan==2"
          type="text"
          @click="eidtCourses"
        >修改</Button>
      </div>
    </Modal>

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
        <p>添加新闻</p>
      </div>

      <div class="modalContent">
        <Input
          prefix="ios-search"
          @on-change="inputChange2"
          placeholder="请输入新闻标题进行搜索"
        />

        <Form
          ref="addForm"
          :model="addForm2"
          v-if="selnewsList.length!==0"
        >
          <FormItem>
            <RadioGroup
              v-model="addForm2.news"
              @on-change="checkboxChange"
              v-if="selnewsList.length!==0"
            >
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

          <Page
            :total="total2"
            :page-size="pageSize2"
            show-total
            class="paging"
            @on-change="change_page2"
            @on-page-size-change="change_page_size2"
          ></Page>
        </Form>

        <div
          class="noNews"
          v-if="selnewsList.length==0"
        >
          <p class="text">您还没有添加新闻</p>

          <p
            class="btn"
            @click="goAddNews"
          >去添加</p>
        </div>
      </div>

      <div
        class="modalFooter"
        slot="footer"
      >
        <Button
          v-if="selnewsList.length!==0"
          type="text"
          @click="addNewsImg"
        >添加</Button>

        <Button
          v-if="selnewsList.length==0"
          type="text"
          @click="closeModal"
        >确定</Button>
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
  getSelList,
  newsAddHeadLine,
  getBannerIndexs,
  getSelCourses,
  newsAddBanner,
  getHeadLines,
} from "@/api";

export default {
  components: {},
  data() {
    return {
      showPanel: 1,

      // 轮播图
      bannerList: [
        {
          icon1: require("../../assets/news/top_icon3.png"),
          icon2: require("../../assets/news/buttom_icon3.png"),
          imgUrl: "",
          type: 3,
          link: "",
          courseName: "",
          id: "",
        },
        {
          icon1: require("../../assets/news/top_icon.png"),
          icon2: require("../../assets/news/buttom_icon.png"),
          imgUrl: "",
          type: 3,
          link: "",
          courseName: "",
          id: "",
        },
        {
          icon1: require("../../assets/news/top_icon2.png"),
          icon2: require("../../assets/news/buttom_icon2.png"),
          imgUrl: "",
          type: 3,
          link: "",
          courseName: "",
          id: "",
        },
      ],

      newsList: [
        {
          icon1: require("../../assets/news/top_icon3.png"),
          icon2: require("../../assets/news/buttom_icon3.png"),
          imgUrl: "",
          text: "",
          id: "",
        },
        {
          icon1: require("../../assets/news/top_icon.png"),
          icon2: require("../../assets/news/buttom_icon.png"),
          imgUrl: "",
          text: "",
          id: "",
        },
        {
          icon1: require("../../assets/news/top_icon.png"),
          icon2: require("../../assets/news/buttom_icon.png"),
          imgUrl: "",
          text: "",
          id: "",
        },
        {
          icon1: require("../../assets/news/top_icon2.png"),
          icon2: require("../../assets/news/buttom_icon2.png"),
          imgUrl: "",
          text: "",
          id: "",
        },
      ],

      carouseList: [],

      // 上传图片相关
      imgName: "",
      visible: false,
      uploadList: [],

      modal1: false,

      courseId: null,

      totalLesson: 0,

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

      modalPlan: 1,
      modal: false,
      selcoursesList: [],
      total: 0,

      pageNumber: 1,
      pageSize: 10,
      key: "",
      bannerItem: {},
      bannerIndex: "",

      addForm: {
        courses: "",
      },

      modal2: false,
      total2: 0,

      pageNumber2: 1,
      pageSize2: 10,
      key2: "",

      newsIndex: "",
      addForm2: {
        news: "",
        text: "",
      },
      newsItem: {},
      selnewsList: [],
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getHeadLines();
    this.getBannerIndexs();
    this.getSelList();
    this.getSelCourses();
  },
  mounted() {},
  methods: {
    // 关闭并返回
    goBack() {
      let route = this.$parent.$route;
      this.$parent.closeTag(route);
      this.$router.go(-1);
    },

    goAddNews() {
      this.$router.push({
        name: "newsList",
      });
    },

    closeModal() {
      this.modal = false;
      this.modal2 = false;
      this.bannerIndex = "";
      this.newsIndex = "";
    },

    getBannerIndexs() {
      getBannerIndexs().then((res) => {
        if (res.code == 200) {
          let list = res.result;
          for (var i in list) {
            let no = res.result[i].sort - 1;
            this.bannerList[no].id = res.result[i].id;
            this.bannerList[no].type = res.result[i].type;
            this.bannerList[no].imgUrl = res.result[i].imgUrl;
            this.bannerList[no].link = res.result[i].link;
            this.bannerList[no].courseName = res.result[i].courseName;
          }
          // this.$forceUpdate();
          console.log(this.bannerList);
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

    getHeadLines() {
      getHeadLines().then((res) => {
        if (res.code == 200) {
          let list = res.result;
          for (var i in list) {
            let no = res.result[i].showIndexNo - 1;
            this.newsList[no].id = res.result[i].id;
            this.newsList[no].text = res.result[i].title;
            this.newsList[no].imgUrl = res.result[i].imgUrl;
          }
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

    getSelCourses() {
      let obj = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        key: this.key,
      };
      getSelCourses(obj).then((res) => {
        if (res.code == 200) {
          this.selcoursesList = res.result.content;
          this.total = res.result.totalElements;
          for (var i in this.selcoursesList) {
            this.selcoursesList[i].disabled = false;
          }
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

    getSelList() {
      let obj = {
        pageNumber: this.pageNumber2,
        pageSize: this.pageSize2,
        key: this.key2,
      };
      getSelList(obj).then((res) => {
        if (res.code == 200) {
          this.selnewsList = res.result.content;
          this.total2 = res.result.totalElements;
          for (var i in this.selnewsList) {
            this.selnewsList[i].disabled = false;
          }
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

    changeType(index) {
      console.log(index);
      this.bannerList[index].link = "";
      this.bannerList[index].courseName = "";
    },

    showCoursesModal(index) {
      this.bannerIndex = index;
      this.modal = true;
      if (this.bannerList[index].link !== "") {
        this.addForm.courses = this.bannerList[index].link;
      }
    },

    coursesChange(item) {
      this.bannerItem = item;
    },

    addCourses() {
      if (this.bannerItem.id !== "" && this.bannerItem.id !== undefined) {
        this.bannerList[this.bannerIndex].link = this.bannerItem.id;
        this.bannerList[this.bannerIndex].courseName = this.bannerItem.name;
        this.bannerList[this.bannerIndex].text = this.bannerItem.type;

        for (var i in this.selcoursesList) {
          if (this.selcoursesList[i].id == this.bannerItem.id) {
            this.selcoursesList[i].disabled = true;
          }
        }
      }
      this.closeModal();
    },

    eidtCourses() {},

    // 上传图片相关
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },

    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },

    handleSuccess() {
      this.newsList[this.newsIndex].link = item.id;
      this.bannerList[this.bannerIndex].courseName = item.name;
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
    beforeUpload(file, index) {
      let path = "data/mall/bannerList";
      uploadPic(file, path).then((res) => {
        console.log(res);
        if (res.name !== "") {
          var newImg = "https://file.zahooedu.com/" + res.name;
        }
        this.bannerList[index].imgUrl = newImg;
      });
    },

    // 操作
    bannerUpward(index) {
      if (index !== 0) {
        let Img1 = this.bannerList[index].imgUrl;
        let Img2 = this.bannerList[index - 1].imgUrl;
        let type1 = this.bannerList[index].type;
        let type2 = this.bannerList[index - 1].type;
        let link1 = this.bannerList[index].link;
        let link2 = this.bannerList[index - 1].link;
        let courseId1 = this.bannerList[index].courseId;
        let courseId2 = this.bannerList[index - 1].courseId;
        let courseName1 = this.bannerList[index].courseName;
        let courseName2 = this.bannerList[index - 1].courseName;

        if (Img1 !== "") {
          this.bannerList[index].imgUrl = Img2;
          this.bannerList[index - 1].imgUrl = Img1;
          this.bannerList[index].type = type2;
          this.bannerList[index - 1].type = type1;
          this.bannerList[index].link = link2;
          this.bannerList[index - 1].link = link1;
          this.bannerList[index].courseId = courseId2;
          this.bannerList[index - 1].courseId = courseId1;
          this.bannerList[index].courseName = courseName2;
          this.bannerList[index - 1].courseName = courseName1;
        }
      }
    },

    bannerDownward(index) {
      if (index !== this.bannerList.length) {
        let Img1 = this.bannerList[index].imgUrl;
        let Img2 = this.bannerList[index + 1].imgUrl;
        let type1 = this.bannerList[index].type;
        let type2 = this.bannerList[index + 1].type;
        let link1 = this.bannerList[index].link;
        let link2 = this.bannerList[index + 1].link;
        let courseId1 = this.bannerList[index].courseId;
        let courseId2 = this.bannerList[index + 1].courseId;
        let courseName1 = this.bannerList[index].courseName;
        let courseName2 = this.bannerList[index + 1].courseName;
        if (Img1 !== "") {
          this.bannerList[index].imgUrl = Img2;
          this.bannerList[index + 1].imgUrl = Img1;
          this.bannerList[index].type = type2;
          this.bannerList[index + 1].type = type1;
          this.bannerList[index].link = link2;
          this.bannerList[index + 1].link = link1;
          this.bannerList[index].courseId = courseId2;
          this.bannerList[index + 1].courseId = courseId1;
          this.bannerList[index].courseName = courseName2;
          this.bannerList[index + 1].courseName = courseName1;
        }
      }
    },

    deleteBannerImg(index) {
      this.bannerList[index].imgUrl = "";
      this.bannerList[index].type = 3;
      this.bannerList[index].courseId = "";
      this.bannerList[index].courseName = "";
      this.bannerList[index].link = "";
    },

    // 添加新闻

    newsUpward(index) {
      if (index !== 0) {
        let Img1 = this.newsList[index].imgUrl;
        let Img2 = this.newsList[index - 1].imgUrl;

        let text1 = this.newsList[index].text;
        let text2 = this.newsList[index - 1].text;

        let id1 = this.newsList[index].id;
        let id2 = this.newsList[index - 1].id;
        if (Img1 !== "") {
          this.newsList[index].imgUrl = Img2;
          this.newsList[index - 1].imgUrl = Img1;

          this.newsList[index].text = text2;
          this.newsList[index - 1].text = text1;

          this.newsList[index].id = id2;
          this.newsList[index - 1].id = id1;
        }
      }
    },

    newsDownward(index) {
      if (index !== this.newsList.length) {
        let Img1 = this.newsList[index].imgUrl;
        let Img2 = this.newsList[index + 1].imgUrl;

        let text1 = this.newsList[index].text;
        let text2 = this.newsList[index + 1].text;

        let id1 = this.newsList[index].id;
        let id2 = this.newsList[index + 1].id;
        if (Img1 !== "") {
          this.newsList[index].imgUrl = Img2;
          this.newsList[index + 1].imgUrl = Img1;

          this.newsList[index].text = text2;
          this.newsList[index + 1].text = text1;

          this.newsList[index].id = id2;
          this.newsList[index + 1].id = id1;
        }
      }
    },

    showAddNewsModal(index) {
      this.modal2 = true;
      this.newsIndex = index;
      if (this.newsList[index].id !== "") {
        this.addForm2.news = this.newsList[index].id;
        this.addForm2.text = this.newsList[index].text;
      }
    },

    newsChange(item, index) {
      this.newsItem = item;
    },

    deleteNewsImg(index) {
      let id = this.newsList[index].id;
      let imgUrl = this.newsList[index].imgUrl;
      let title = this.newsList[index].text;

      this.newsList[index].imgUrl = "";
      this.newsList[index].id = "";
      this.newsList[index].text = "";

      for (var i in this.selnewsList) {
        if (this.selnewsList[i].id == id) {
          return;
        }

        if (Number(i) == this.selnewsList.length - 1) {
          let obj = {
            id,
            imgUrl,
            title,
          };
          this.selnewsList.push(obj);
        }
      }
    },

    addNewsImg() {
      if (this.newsItem.id !== "" && this.newsItem.id !== undefined) {
        this.newsList[this.newsIndex].imgUrl = this.newsItem.imgUrl;
        this.newsList[this.newsIndex].id = this.newsItem.id;
        this.newsList[this.newsIndex].text = this.newsItem.title;
        for (var i in this.selnewsList) {
          if (this.selnewsList[i].id == this.newsItem.id) {
            this.selnewsList[i].disabled = true;
          }
        }
      }
      this.closeModal();
      this.addForm2.news = "";
      this.addForm2.text = "";
      this.newsItem = {};
    },

    eidtNewsImg() {},

    inputChange: Debounce(function (e) {
      this.key = e.data;
      this.getSelCourses();
    }, 400),

    inputChange2: Debounce(function (e) {
      this.key2 = e.data;
      this.getSelList();
    }, 400),

    checkboxChange(e) {
      console.log(e);
    },

    change_page_size(e) {
      this.pageSize = e;
      this.getSelCourses();
    },

    change_page(e) {
      this.pageNumber = e;
      this.getSelCourses();
    },

    change_page_size2(e) {
      this.pageSize2 = e;
      this.getSelList();
    },

    change_page2(e) {
      this.pageNumber2 = e;
      this.getSelList();
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

    newsAddBanner() {
      let arr = [];
      for (var i in this.bannerList) {
        var obj = {
          no: Number(i) + 1,
          type: this.bannerList[i].type,
          link: this.bannerList[i].link,
          imgUrl: this.bannerList[i].imgUrl,
        };

        if (this.bannerList[i].imgUrl !== "") {
          arr.push(obj);
        }

        if (Number(i) == this.bannerList.length - 1) {
          let lines = {
            banners: arr,
          };
          console.log(lines);
          newsAddBanner(lines).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: "操作成功",
              });
              this.getBannerIndexs();
              this.getSelCourses();
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

    newsAddHeadLine() {
      let arr = [];
      for (var i in this.newsList) {
        var obj = {
          no: Number(i) + 1,
          id: this.newsList[i].id,
        };

        if (this.newsList[i].id !== "") {
          arr.push(obj);
        }

        if (Number(i) == this.newsList.length - 1) {
          let lines = {
            headLines: arr,
          };
          newsAddHeadLine(lines).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: "操作成功",
              });
              this.getHeadLines();
              this.getSelList();
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
  },
};
</script>

<style lang="scss" scoped>
.trainlist {
  padding: 0 36px 0 42px;
  position: relative;
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
      width: 50%;
      position: relative;
      float: left;
      padding: 0 50px;

      .title {
        height: 100px;
        position: relative;
        float: left;
        width: 100%;

        p {
          height: 100px;
          position: relative;
          float: left;
          width: auto;
          display: inline-block;
          line-height: 80px;
          font-size: 24px;
          font-weight: 550;
          color: #373737;
        }

        p::after {
          content: "";
          width: 36px;
          height: 7px;
          border-radius: 30px;
          background: #006bff;
          position: absolute;
          bottom: 26px;
          left: 50%;
          transform: translateX(-50%);
        }

        h5 {
          position: absolute;
          left: 0;
          bottom: -30px;
          line-height: 48px;
          height: 48px;
          text-align: center;
          font-size: 20px;
          font-weight: 550;
          color: #373737;
          display: inline-block;
        }
      }

      .bannerDemo {
        position: relative;
        width: 100%;
        float: left;
        padding: 0 40px 0 100px;
        min-height: 100%;

        .no {
          position: absolute;
          left: 0;
          width: 50px;
          text-align: center;
          font-size: 20px;
          color: #1c1c1c;
          height: 100px;
          font-weight: 550;
          line-height: 100px;
        }

        .icon1 {
          position: absolute;
          left: 54px;
          top: 35px;
          display: inline-block;
          cursor: pointer;
        }

        .icon2 {
          position: absolute;
          left: 74px;
          top: 35px;
          display: inline-block;
        }

        .uploadPanel {
          position: relative;
          width: 100%;
          float: left;

          /deep/ .ivu-upload {
            width: 100% !important;
            height: 100px;
            position: relative;
            float: left;
            border: none;
            background: transparent;

            .ivu-upload-drag {
              border-radius: 100px;
              border: 2px #006bff dashed;
            }

            .ivu-upload-drag::before {
              width: 20px;
              height: 5px;
              border-radius: 10px;
              background: #fff;
              top: 34px;
            }

            .ivu-upload-drag::after {
              content: "";
              width: 5px;
              height: 20px;
              border-radius: 10px;
              background: #fff;
              position: absolute;
              left: 50%;
              top: 26px;
              transform: translateX(-50%);
            }
          }

          /deep/ .ivu-upload::before {
            content: "";
            background: #006bff;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 18px;
            width: 40px;
            height: 40px;
            transform: translateX(-50%);
          }

          .addIcon {
            position: absolute;
            left: 50%;
            top: 18px;
            width: 40px;
            height: 40px;
            transform: translateX(-50%);
            display: inline-block;
          }

          .addText {
            position: absolute;
            bottom: 6px;
            left: 50%;
            transform: translateX(-50%);
            height: 38px;
            line-height: 38px;
            display: inline-block;
            font-size: 17px;
            color: #006bff;
          }
        }

        .radioPanel {
          height: 70px;
          position: relative;
          width: 100%;
          float: left;

          /deep/ .ivu-radio-group {
            width: 100%;
            position: relative;
            float: left;
            display: flex;

            label {
              margin: 20px 0 0 0;
              flex: 1;

              span {
                color: #9a9a9a;
              }
            }

            .ivu-radio-wrapper-checked {
              span {
                color: #006bff;
              }
            }

            .ivu-radio-checked .ivu-radio-inner {
              color: #006bff !important;
            }

            .ivu-radio-checked .ivu-radio-inner {
              color: #006bff !important;
            }

            .ivu-radio-inner:after {
              background-color: #006bff !important;
            }
          }
        }

        .bannerImg {
          border-radius: 100px;
          object-fit: cover;
          overflow: hidden;
          width: 100%;
          height: 100px;
          position: relative;
          float: left;
        }

        .newsImg {
          border-radius: 8px !important;
          object-fit: cover;
          overflow: hidden;
          width: 100%;
          height: 140px;
          position: relative;
          float: left;
          margin-bottom: 20px;
        }

        .newsText {
          height: 50px;
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 3;
          padding: 0 40px 0 100px;
          border-radius: 0 0 8px 8px;
          overflow: hidden;

          p {
            position: relative;
            width: 100%;
            float: left;
            background: #fff;
            height: 50px;
            line-height: 50px;
            padding: 0 15px;
            font-size: 16px;
            color: #393939;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-radius: 0 0 8px 8px;
          }
        }

        .delete {
          position: absolute;
          right: 70px;
          top: -8px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ff4b67;
          z-index: 77;
        }

        .delete::after {
          height: 2px;
          width: 10px;
          background: #fff;
          top: 50%;
          left: 50%;
          position: absolute;
          content: "";
          transform: translate(-50%, -50%);
        }

        .btn {
          position: relative;
          float: left;
          width: 100%;
          padding: 0 20px;
          z-index: 7;

          p {
            max-width: 120px;
            width: 20%;
            min-width: 100px;
            border-radius: 5px;
            background: #006bff;
            text-align: center;
            color: #fff;
            height: 36px;
            font-size: 14px;
            line-height: 36px;
            margin-top: -15px;
            margin-bottom: 30px;
          }

          h5 {
            position: absolute;
            padding-left: 130px;
            top: -6px;
            left: 0;
            line-height: 16px;
            color: #006bff;
            z-index: -1;

            span {
              color: #1f1f1f;
            }
          }

          /deep/ .ivu-input {
            position: relative;
            margin-top: -15px;
            margin-bottom: 30px;
            width: 200px;
            margin-left: 50%;
            transform: translateX(-50%);
            height: 36px;
            line-height: 36px;
            background: transparent;
          }
        }
      }

      .button {
        width: 200px;
        height: 50px;
        border-radius: 10px;
        position: relative;
        float: left;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: 500;
        color: #fff;
        background: #006bff;
      }
    }

    .bannerPanel {
      box-shadow: 2px 0 14px rgba(154, 154, 154, 0.24);
    }

    .newsPanel {
      .uploadPanel {
        height: 140px !important;
        margin-bottom: 20px;

        .newsUpload {
          width: 100% !important;
          position: relative;
          float: left;
          border: 2px #006bff dashed;
          border-radius: 8px !important;
          height: 140px !important;
          background-size: contain !important;

          .add {
            width: 100% !important;
            position: relative;
            float: left;
            height: 140px;
          }

          .add::after {
            width: 20px;
            height: 5px;
            border-radius: 10px;
            background: #fff;
            top: 46px;
            left: 50%;
            transform: translateX(-50%);
            content: "";
            position: absolute;
          }

          .add::before {
            width: 5px;
            height: 20px;
            border-radius: 10px;
            background: #fff;
            top: 38px;
            left: 50%;
            transform: translateX(-50%);
            content: "";
            position: absolute;
          }
        }

        .newsUpload::before {
          content: "";
          background: #006bff;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 28px;
          width: 40px;
          height: 40px;
          transform: translateX(-50%);
        }

        .addIcon {
          position: absolute;
          left: 50%;
          top: 40px !important;
          width: 40px;
          height: 40px;
          transform: translateX(-50%);
          display: inline-block;
        }

        .addText {
          position: absolute;
          bottom: 22px !important;
          left: 50%;
          transform: translateX(-50%);
          height: 38px;
          line-height: 38px;
          display: inline-block;
          font-size: 17px;
          color: #006bff;
        }
      }

      .delete {
        right: 35px !important;
      }
    }
  }
}

.choseCoursesModal {
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
    // border-radius: 50%;
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

    .ivu-form-item-content {
      margin-left: 0;

      .ivu-radio-wrapper {
        width: 290px;
        background: #f8f8f8;
        margin-bottom: 20px;
        border-radius: 20px;
        height: 68px;
        position: relative;
        margin-right: 0;
        padding-left: 76px;

        img {
          width: 64px;
          height: 60px;
          position: absolute;
          border-radius: 20px;
          left: 4px;
          top: 4px;
        }

        .name {
          width: 100%;
          position: relative;
          line-height: 20px;
          height: 20px;
          font-size: 14px;
          color: #494949;
          white-space: nowrap;
          text-overflow: ellipsis;
          -webkit-text-overflow: ellipsis;
          overflow: hidden;
          text-align: left;
          margin-top: 10px;
        }

        .org {
          width: 100%;
          position: relative;
          line-height: 18px;
          height: 18px;
          font-size: 12px;
          color: #3d3d3d;
          text-align: left;
          white-space: nowrap;
          text-overflow: ellipsis;
          -webkit-text-overflow: ellipsis;
          overflow: hidden;
          text-align: left;
        }

        .teacher {
          width: 100%;
          position: relative;
          line-height: 18px;
          height: 18px;
          font-size: 12px;
          color: #9c9c9c;
          text-align: left;
        }

        .ivu-radio {
          position: absolute;
          right: 6px;
          bottom: 6px;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          overflow: hidden;
          background: #e1e1e1;

          .ivu-radio-inner {
            border: none;
            border-radius: 50%;
            background: transparent;
          }
        }

        .ivu-radio-checked {
          background: #4480f5 !important;
          box-shadow: none !important;
          border-radius: 50%;
          width: 16px;
          height: 16px;
        }

        .ivu-radio-focus {
          box-shadow: none !important;
        }

        .ivu-radio-inner:after {
          width: 5px;
          height: 9px;
          position: absolute;
          top: 3px;
          left: 6px;
          content: "";
          display: table;
          border: 2px solid #fff;
          border-top: 0;
          border-left: 0;
          -webkit-transform: rotate(45deg) scale(1);
          transform: rotate(45deg) scale(1);
          transition: all 0.2s ease-in-out;
        }
      }
    }

    .ivu-page {
      float: right;
      position: relative;
    }
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

/deep/ .modalContent .noNews {
  width: 100%;
  position: relative;
  float: left;
  height: 300px;

  .text {
    width: 100%;
    position: relative;
    margin-top: 30px;
    line-height: 60px;
    font-size: 16px;
    color: #7B7B7B;
    text-align: center;

  }

  .btn {
    width: 120px;
    border-radius: 60px;
    background: #006bff;
    text-align: center;
    font-size: 16px;
    color: #fff;
    text-align: center;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 40px;
    height: 46px;
    line-height: 46px;
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
