<template>
  <div class="trainlist">
    <Row>
      <div class="header" ref="header">
        <div class="title">
          <span>教师评价</span>
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
          :label-width="100"
        >

          <FormItem label="评价时间">
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


           <FormItem label="评价状态">
            <Select
            
              v-model="searchForm.discuss"
              :value="searchForm.discuss"
              transfer
              style="width: 80px"
              @on-change="changeClizhi"
            >
              <Option :value="0">全部</Option>
              <Option :value="1">满意</Option>
              <Option :value="2">一般</Option>
               <Option :value="3">不满意</Option>
            </Select>
          </FormItem>

          <FormItem label="关键字" style="width: 360px">
            <Input
              v-model="searchForm.key"
              placeholder="请输入评价内容或用户昵称进行搜索"
              @input="keyInput"
            />
          </FormItem>
        </Form>
        <div class="sou" style="float: right; margin: 15px 0px 11px 0px">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </div>
      </div>
    </Row>
    <Row>
      <div class="tabel_first">
        <div class="tabel_second">
          全部评价:<a>{{ total }}(条)</a>
        </div>
        <div class="tabel_second">
          授课老师:<a>{{ teacherName }}</a>
        </div>
      </div>
    </Row>
    <div class="table_content" :style="{ height: tableHeight + 'px' }">
      <div class="table_tilte" v-for="tablex in data1">
        <Row>
          <Col span="2">
            <div class="table_img">
              <img :src="tablex.userAvatar" />
            </div>
          </Col>
          <Col span="22">
            <div class="content_tab">
              <div class="content_h">{{ tablex.userName }}</div>
              <div class="content_nei">
                <div class="content_type" v-for="item in tablex.evaluateList">
                  <a>{{ item.name }}</a>
                </div>
                <div class="content_xian">{{ tablex.detail }}</div>
              </div>
              <div class="content_riqi">
                <div class="riqi">{{ tablex.evaluateTime }}</div>
                <div class="mayi" v-if="tablex.discussId == 1">
                  {{ tablex.discussText }}
                </div>
                <div class="mayi" v-if="tablex.discussId == 2" style="color:#F4AB42">
                  {{ tablex.discussText }}
                </div>
                <div class="mayi" v-if="tablex.discussId == 3" style="color:#FF3854">
                  {{ tablex.discussText }}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
       <Spin size="large" fix v-if="spinShow"></Spin>
    </div>

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
</template>

<script>
import { mapState } from "vuex";
import { courseEvaluateList } from "@/api";
export default {
  data() {
    return {
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        key: "",
        discuss:0,
      },
      total: 0,
      tableHeight: 0,
      teacherName: "",
      spinShow: true,
      data1: [
        // {
        //   name: "渡边麻的星星",
        //   age: 18,
        //   address: "New York No. 1 Lake Park",
        //   date: "2016-10-03 12:05:03",
        //   mayi:"满意",
        //   content:"老师讲的很好，互动题难度合适，课程难度合适，时长合理，课程生动有趣，课程内容适量，学习有收获，老师讲的很好，大神风范，方老师讲的很好，互动题难度合适，课程难度合适，时长合理，老师讲的很好，互动题难度合适，课程难度合适，时长合理，课程生动有趣，课程内容适量，学习有收获，老师讲的很好，大神风范，方老师讲的很好，互动题难度合适，课程难度合适，时长合理，课程生动有趣，课程内容适量，学习有收获，老师讲的很好，大神风范，方",
        //   img: "https://i.loli.net/2017/08/21/599a521472424.jpg",
        //   leix: [
        //     {
        //       name: "生动有趣",
        //     },
        //     {
        //       name: "活泼可爱",
        //     },
        //   ],
        // },
        // {
        //   name: "Jim Green",
        //   age: 24,
        //   address: "London No. 1 Lake Park",
        //   date: "2016-10-01",
        //   leix: [
        //     {
        //       name: "skydeng",
        //     },
        //   ],
        // },
        // {
        //   name: "Joe Black",
        //   age: 30,
        //   address: "Sydney No. 1 Lake Park",
        //   date: "2016-10-02",
        // },
        // {
        //   name: "Jon Snow",
        //   age: 26,
        //   address: "Ottawa No. 2 Lake Park",
        //   date: "2016-10-04",
        // },
        // {
        //   name: "Jon Snow",
        //   age: 26,
        //   address: "Ottawa No. 2 Lake Park",
        //   date: "2016-10-04",
        // },
        // {
        //   name: "Jon Snow",
        //   age: 26,
        //   address: "Ottawa No. 2 Lake Park",
        //   date: "2016-10-04",
        // },
        // {
        //   name: "Jon Snow",
        //   age: 26,
        //   address: "Ottawa No. 2 Lake Park",
        //   date: "2016-10-04",
        // },
      ],
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    // 销毁全局方法
    window.onresize = null;
  },
  created() {
    this.getLecturerList();
  },
  computed: {},
  methods: {
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
      let headerHeight = this.$refs.header.clientHeight;
      let footerHeight = this.$refs.footer.clientHeight;
      this.tableHeight = pageHeight - headerHeight - footerHeight - 165;
    },

      changeClizhi(e) {
      console.log(e);
      this.searchForm.discuss = e;
    },

    
     changeDate(e) {
      console.log(e);
      let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);
      console.log(date);
      this.searchForm.findTime = date;
    },

    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getLecturerList();
    },
    keyInput(e) {
      this.searchForm.key = e;
      console.log(this.searchForm.key);
    },

    changePage(e) {
      this.searchForm.pageNumber = e;
      this.getLecturerList();
    },
    changePageSize(e) {
      this.searchForm.pageSize = e;
      this.getLecturerList();
    },

    getLecturerList() {
      let type = JSON.parse(sessionStorage.getItem("userInfo")).type;
      this.searchForm.lecturerId = this.$route.query.id;

      courseEvaluateList(this.searchForm).then((res) => {
        console.log(res);
        if (res.code == 200) {
          res.result.content.forEach((item) => {
            if (item.createdTime) {
              item.createdTime = dateFormat(item.createdTime);
            }
          });
          this.data1 = res.result.content;
          this.total = res.result.totalElements;
          this.loading = false;
          this.teacherName = res.result.teacherName;
          this.spinShow =false;
        }
      });
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
    margin-bottom: 15px;

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
  text-align: center;
  padding: 14px 12px 10px 0 !important;
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
  border-radius: 20px;
}

/deep/ .ivu-modal-close {
  z-index: 1;
  font-size: 14px;
  position: absolute;
  right: -9px;
  top: -8px;
  overflow: hidden;
  cursor: pointer;
  background: none !important;
  // border-radius: 50%;
}
/deep/ a {
  color: #515a6e;
}

/deep/ .ivu-modal-footer {
  text-align: center;
}

.table_content {
  border-radius: 15px;
  overflow: auto;
  padding-left: 0px;
  padding-right: 0px;
}
.tabel_first {
  width: 100%;
}
.tabel_second {
  float: left;
  color: #373737;
  font-weight: 600;
  font-size: 17px;
  font-weight: bold;
  margin-left: 45px;
  margin-bottom: 5px;
}
.tabel_second a {
  color: #4481f5;
}
.table_tilte {
  background: #f0f2f7;
  border-radius: 15px;
  overflow: hidden;
  padding-left: 0px;
  padding-right: 0px;
  margin-bottom: 10px;
}
.table_img {
  float: left;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  text-align: center;
  margin-top: 10px;
}
.table_img img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
}

.content_tab {
  height: 50px;
}
.content_h {
  float: left;
  width: 100%;
  margin-top: 10px;
  color: #111111;
  font-weight: bold;
  font-size: 15px;
}
.content_type {
  float: left;
}
.content_type a {
  float: left;
  margin-right: 5px;
  color: white;
  font-size: 5px;
  background: #98b7f0;
  padding: 2px 5px 2px 5px;
  border-radius: 5px;
}

.content_nei {
  float: left;
  width: 85%;
}

.content_riqi {
  float: right;
  width: 15%;
  height: 50px;
}
.riqi {
  float: left;
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: #898989;
}
.mayi {
  float: left;
  width: 100%;
  text-align: center;
  color: #427ef4;
  font-weight: bold;
  margin-top: 10px;
}
.content_xian {
  float: left;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #707070;
}
</style>