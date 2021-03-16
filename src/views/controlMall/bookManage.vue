<template>
  <div class="trainlist">
    <Row>
      <div
        class="header"
        ref="header"
      >
        <div class="title">
          <span v-show="pageDisplay==1">教材备案列表</span>
          <span v-show="pageDisplay==2">教材备案</span>
        </div>
        <div
          class="export-btn"
          v-show="pageDisplay==2"
        >
          <div @click="goBlcak">
            <div class="firsticon">
              <Icon
                type="ios-undo"
                color="#427ef4"
                size="35"
              />
            </div>

            <div class="firsttitle">返回</div>
          </div>
        </div>
      </div>
    </Row>
    <!-- 搜索 -->

    <Row v-if="pageDisplay==1">
      <div class="search">
        <Form
          :model="searchForm"
          ref="searchForm"
          style="display: flex; float: left"
          :label-width="76"
        >
          <FormItem
            label="省市区"
            v-if="searchAddress==true"
          >
            <Cascader
              :data="addressData"
              :value="areaId2"
              v-model="areaId2"
              :clearable="false"
              @on-change="changeCascader"
              transfer
              style="width: 200px"
            ></Cascader>
          </FormItem>

          <FormItem label="关键字">
            <Input
              v-model="searchForm.key"
              @input="selectInput"
              placeholder="请输入教育机构名称进行搜索"
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

    <Row v-if="pageDisplay==2">
      <div class="search">
        <Form
          :model="searchForm2"
          ref="searchForm2"
          style="display: flex; float: left"
          :label-width="76"
        >

          <FormItem label="年级">
            <Select
              v-model="searchForm2.gradeId"
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
              v-model="searchForm2.subjectId"
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
              v-model="searchForm2.type"
              :value="searchForm2.type"
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
              v-model="searchForm2.key"
              @input="selectInput2"
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
            @click="handleSearch2"
          >搜索</Button>
        </div>
      </div>
    </Row>

    <!-- 表格 -->
    <div
      class="table_content"
      v-if="pageDisplay==1"
    >
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
            slot="action"
            slot-scope="{ row, index }"
          >
            <Button
              size="small"
              style="
                background: #4480F5 !important;
                margin-right: 7px;"
              @click="goDetails(row, index)"
            >详情</Button>
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

    <div
      class="table_content"
      v-if="pageDisplay==2"
    >
      <Row>
        <Table
          size="large"
          :columns="columns2"
          :data="data2"
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
              size="small"
              style="
                background: #4480F5 !important;
                width:80px;
                margin-right: 7px;"
              @click="golook(row, index)"
            >查看附件</Button>
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
            :current="searchForm2.pageNumber"
            :total="total"
            @on-change="changePage2"
            @on-page-size-change="changePageSize2"
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
        <p>附件详情</p>
      </div>

      <div class="modalContent">
        <Form
          ref="addForm"
          :model="addForm"
          :rules="ruleCustom"
          :label-width="150"
        >

          <FormItem
            class="uploadForm"
            prop="imgList"
          >

            <Upload
              v-if="addForm.type==1"
              ref="upload"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="51200"
              v-model="addForm.coverImg"
              multiple
              type="drag"
              action
              style="display: inline-block; width: 58px"
            >
              <div class="uploadBtn"></div>
              <p class="title">封面</p>

              <div
                class="image"
                v-if="addForm.coverImg!==''&&addForm.coverImg!==null"
              >
                <img
                  @click.stop="showImgModal(addForm.coverImg)"
                  :src="addForm.coverImg"
                />
              </div>
            </Upload>

            <Upload
              v-if="addForm.type==1"
              ref="upload"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="51200"
              v-model="addForm.copyRightImg"
              multiple
              type="drag"
              action
              style="display: inline-block; width: 58px"
            >
              <div class="uploadBtn"></div>
              <p class="title">版权页</p>

              <div
                class="image"
                v-if="addForm.copyRightImg!==''&&addForm.copyRightImg!==null"
              >
                <img
                  @click.stop="showImgModal(addForm.copyRightImg)"
                  :src="addForm.copyRightImg"
                />
              </div>
            </Upload>

            <Upload
              v-if="addForm.type==1"
              ref="upload"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="51200"
              v-model="addForm.menuImg"
              multiple
              type="drag"
              action
              style="display: inline-block; width: 58px"
            >
              <div class="uploadBtn"></div>
              <p class="title">目录第一页</p>

              <div
                class="image"
                v-if="addForm.menuImg!==''&&addForm.menuImg!==null"
              >
                <img
                  @click.stop="showImgModal(addForm.menuImg)"
                  :src="addForm.menuImg"
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
                <img :src="item" @click.stop="showImgModal(item)" />
              </div>
            </div>

          </FormItem>

          <div class="upload2Form">
            <div class="foeTtem">
              <p>其他附件<span>({{addForm.extraList.length}}) </span></p>
            </div>

            <template v-for="(item,index) in addForm.extraList">
              <div class="accessory">
                <p><span>{{index + 1}}. </span>{{item.name}} <span style="color:#bababa;">({{item.size}}kb)</span></p>

                <a :href="item.url" :download="item.name" target="_blank"></a>
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
      type="text"
      @click="closeModal"
    >确认</Button>
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
export default {
  data() {
    return {
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        key: "",
        areaId: null,
      },
      total: 0,
      addressData: [],
      columns: [
        {
          title: "机构名称",
          key: "orgName",
          align: "center",
          width: 200,
        },
        {
          title: "机构所在镇区名称",
          key: "areaName",
          align: "center",
          minWidth: 200,
        },
        {
          title: "出版物总数",
          key: "publish",
          align: "center",
          minWidth: 120,
        },
        {
          title: "自编资料总数",
          key: "self",
          align: "center",
          minWidth: 120,
        },
        {
          title: "授课资料总数",
          key: "sum",
          align: "center",
          minWidth: 120,
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 140,
        },
      ],
      data: [],
      loading: true,
      tableHeight: 0,

      dateList: [],
      modal: false,
      modal2: false,
      modal3: false,
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
      ruleCustom: {},

      area: [],
      areaId: [],
      areaId2: [],

      // 1 = 列表页，2 = 详情列表页
      pageDisplay: 1,

      modal3img: "",

      searchForm2: {
        pageNumber: 1,
        pageSize: 10,
        key: "",
        type: 0,
        subjectId: 0,
        gradeId: 0,
        orgId: "",
      },

      columns2: [
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

      total2: 0,
      data2: [],
      gradeList: [],
      subjectList: [],

      s_id: "",
      z_id: "",
      q_id: "",

      searchAddress: true,

      book_menu: "https://file.zahooedu.com/book_menu.jpg",
      book_copyright: "https://file.zahooedu.com/book_copyright.jpg",
      book_cover: "https://file.zahooedu.com/book_cover.jpg",

      book_1: "https://file.zahooedu.com/book_1.jpg",
      book_2: "https://file.zahooedu.com/book_2.jpg",
      book_3: "https://file.zahooedu.com/book_3.jpg",
    };
  },
  created() {
    this.getUserInfo();
    this.getGradeList();
    this.getSubjectList();
    this.summary();
  },
  mounted() {},
  destroyed() {
    // 销毁全局方法
    window.onresize = null;
  },
  computed: {},
  methods: {
    getUserInfo() {
      let userMessage = JSON.parse(sessionStorage.getItem("userInfo"));
      console.log(userMessage);
      let addId_list = [];
      let type = userMessage.type;
      if (
        userMessage.areaId == "" ||
        userMessage.areaId == null ||
        userMessage.areaId == undefined
      ) {
      } else {
        addId_list = userMessage.areaId.split(",");
        this.s_id = addId_list[0];
        this.z_id = addId_list[1];
      }
      if (type == "TOWNPRINCIPAL") {
        // 区级/镇级教育局
        let id = addId_list[2];
        this.searchForm.areaId = id;

        this.searchAddress = false;
        // this.getTownshipList();
      } else if (type == "EDUCATIONPRINCIPAL") {
        // 市级教育局
        this.getTownshipList(this.s_id, this.z_id);
      }
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

    changeCascader(e) {
      console.log(e);
      this.searchForm.areaId = e[2];
    },

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

    // 筛选相关
    selectInput(e) {
      this.searchForm.key = e;
    },

    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.summary();
    },

    changePage(e) {
      this.searchForm.pageNumber = e;
      this.summary();
    },

    changePageSize(e) {
      this.searchForm.pageSize = e;
      this.summary();
    },

    // 获取数据
    summary() {
      let obj = {};
      obj = this.searchForm;
      summary(obj).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.loading = false;
        }
      });
    },

    // 展示示例
    showImgModal(msg) {
      this.modal3img = msg;
      this.modal3 = true;
    },

    goDetails(row, index) {
      this.searchForm2.orgId = row.orgId;
      this.bookList();
    },

    goBlcak() {
      this.pageDisplay = 1;
      // 清除
    },

    selectInput2(e) {
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

    handleSearch2() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.bookList();
    },

    changePage2(e) {
      this.searchForm2.pageNumber = e;
      this.bookList();
    },

    changePageSize2(e) {
      this.searchForm2.pageSize = e;
      this.bookList();
    },

    // 获取数据
    bookList() {
      let obj = {};
      obj = this.searchForm2;

      bookList(obj).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.data2 = res.result.content;
          this.total2 = res.result.totalElements;
          this.loading = false;

          this.pageDisplay = 2;
        }
      });
    },

    golook(row, index) {
      let obj = {};
      obj.id = row.id;
      bookDetail(obj).then((res) => {
        if (res.code == 200) {
          this.addForm = res.result;

          if (res.result.isLongterm !== 1) {
            let time1 = Date.parse(new Date(res.result.beginDate));
            this.addForm.startTime = new Date(parseInt(time1));
            let time2 = Date.parse(new Date(res.result.endDate));
            this.addForm.finishTime = new Date(parseInt(time2));
          }

          this.modal = true;
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
    },

    closeModal() {
      this.modal = false;
      this.clearAddForm();
    },

    closeModal3() {
      this.modal3 = false;
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
  background-color: #e2e7f3;
  border: #e2e7f3;
  color: #5669d9;
}

/deep/ .ivu-input {
  border-radius: 10px;
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
      // height: 300px;

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
          height: 250px;
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
        padding: 0 100px 0 40px;

        /deep/ .accessory p {
          display: inline-block;
          font-size: 16px !important;
          color: #75a6f0 !important;
          height: 28px !important;
          line-height: 28px !important;
          height: auto !important;

          span {
            color: #5e5e5e !important;
          }

          b {
            font-weight: 500 !important;
            color: #bababa !important;
          }
        }

        /deep/ a{
            position: absolute;
            right: 60px;
            bottom: 0;
            width: 28px;
            height: 28px;
            background: url("../../assets/book/download_icon.png") center center no-repeat;
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