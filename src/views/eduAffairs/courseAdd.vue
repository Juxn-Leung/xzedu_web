<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_head">
        <Tabs
          :value="$router.currentRoute.name"
          @on-click="goRouter"
        >
          <TabPane
            label="创建课程"
            name="course"
          ></TabPane>
        </Tabs>
      </div>

      <div class="tab_content">
        <LSteps
          :width="660"
          :current="current"
          :list="stepsList"
        ></LSteps>

        <div
          class="stepsTab"
          v-show="current==1"
        >
          <div class="title">
            <p>课程基础信息</p>
          </div>

          <div class="information">
            <Form
              ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="110"
            >
              <FormItem
                label="课程名称:"
                prop="name"
              >
                <Input
                  v-model="formValidate.name"
                  placeholder="请输入课程名称"
                ></Input>
              </FormItem>

              <FormItem
                label="课程类别:"
                prop="category"
              >
                <Select v-model="formValidate.category">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>

              <FormItem
                label="年级:"
                class="half"
                prop="grade"
              >
                <Select v-model="formValidate.grade">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>

              <FormItem
                label="科目:"
                class="half"
                prop="clasz"
              >
                <Select v-model="formValidate.clasz">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>

              <FormItem
                label="授课模式:"
                prop="pattern"
                style="margin-bottom: 4px;"
              >
                <RadioGroup v-model="formValidate.pattern">
                  <Radio :label="1">一对多</Radio>
                  <Radio :label="0">一对一</Radio>
                </RadioGroup>
              </FormItem>

              <FormItem
                label="开课校区:"
                prop="roleId"
                style="margin-bottom: 4px;"
              >
                <RadioGroup v-model="formValidate.roleId">
                  <Radio :label="1">全部校区</Radio>
                  <Radio :label="0">指定校区</Radio>
                </RadioGroup>
              </FormItem>

              <FormItem
                label=""
                class="org"
                style="margin-bottom: 4px;"
              >
                <CheckboxGroup v-model="formValidate.orgId">
                  <template v-for="item in userInfo">
                    <Checkbox :label="item.id">{{item.name}}</Checkbox>
                  </template>
                </CheckboxGroup>
              </FormItem>

            </Form>
          </div>
        </div>

        <div
          class="stepsTab"
          v-show="current==2"
        >
          <div class="title">
            <p>课程收费模式 <span> (提示：按国务院办公厅文件要求，校外培训机构“不得一次性收取时间跨度超过3个月的费用培训结束时间不得晚于20:30。”)</span></p>
          </div>

          <div class="information">
            <div class="tab_cont">
              <Form
                ref="form"
                :model="form"
              >

                <FormItem
                  label="按课时收费"
                  style="margin-bottom: 4px;"
                >
                  <i-switch
                    v-model="form.teaching"
                    :true-value="1"
                    :false-value="0"
                    @on-change="changeTeaching"
                  />
                </FormItem>

                <div class="tab">
                  <Table
                    :columns="columns"
                    :data="data"
                    :stripe="true"
                    ref="table"
                  >
                    <template
                      slot-scope="{row}"
                      slot="amount"
                    >
                      <Input placeholder="请输入数量"></Input>
                    </template>

                    <template
                      slot-scope="{row}"
                      slot="total"
                    >
                      <Input placeholder="请输入总价"></Input>
                    </template>
                    <template
                      slot-scope="{row}"
                      slot="price"
                    >
                      <Input placeholder="请输入单价"></Input>
                    </template>

                    <template
                      slot-scope="{row}"
                      slot="action"
                    >
                      <Button
                        class="delete"
                        type="error"
                        @click="handleDelete(row)"
                        style="margin-right:6px"
                        size="small"
                      >删 除</Button>
                    </template>

                  </Table>
                  <p class="add" @click="addTab">添加</p>
                </div>

                <FormItem
                  label="扣课时规则：请假是否扣课时"
                  style="margin-bottom: 4px;"
                >
                  <RadioGroup v-model="form.leave">
                    <Radio :label="1">扣</Radio>
                    <Radio :label="0">不扣</Radio>
                  </RadioGroup>
                </FormItem>

                <FormItem
                  label="未到是否扣课时"
                  style="margin-bottom: 4px;"
                >
                  <RadioGroup v-model="form.absent">
                    <Radio :label="1">扣</Radio>
                    <Radio :label="0">不扣</Radio>
                  </RadioGroup>
                </FormItem>

                <FormItem
                  label="按月收费"
                  style="margin-bottom: 4px;"
                >
                  <i-switch
                    v-model="form.month"
                    :true-value="1"
                    :false-value="0"
                    @on-change="changeTeaching"
                  />
                </FormItem>

                <FormItem
                  label="按天收费"
                  style="margin-bottom: 4px;"
                >
                  <i-switch
                    v-model="form.day"
                    :true-value="1"
                    :false-value="0"
                    @on-change="changeTeaching"
                  />
                </FormItem>

              </Form>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="btn_foot">
      <div class="btn">
        <p
          style="border:none; color:#fff; background:#0056FB;"
          @click="next"
        >{{current==4?'保 存':'下一步'}}</p>
      </div>
      <div class="btn">
        <p @click="back">{{current==1?'返 回':'上一步'}}</p>
      </div>
    </div>

    <Modal
      class="modalPanel"
      v-model="modal"
      :mask-closable="false"
      :width="410"
    >
      <div class="content">
        <p>
          <Icon type="md-alert" />
          确定要删除这个员工吗？
        </p>
        <h5>删除后员工将不能登录系统，此操作不能被撤销</h5>
      </div>

      <div
        slot="footer"
        class="footer_btn"
      >
        <Button
          type="default"
          @click="closeModal"
        >取消</Button>
        <Button
          type="primary"
          @click="userDel"
        >确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Debounce } from "../../libs/util";
import { userList, userDel, setTeaching } from "../../api/index";
import LSteps from "../../components/steps/steps.vue";
export default {
  data() {
    return {
      searchForm: {
        key: "",
        pageNumber: 1,
        pageSize: 10,
      },
      loading: false,
      tableHeight: null,

      data: [],
      total: 0,

      modal: false,
      delId: null,

      current: 2,
      stepsList: ["课程基础信息", "课程收费模式", "图文详情", "其他信息"],

      formValidate: {
        name: "",
        category: "",
        grade: "",
        clasz: "",
        orgId: [],
        roleId: "",
      },

      userInfo: [],

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入课程名称",
            trigger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "请选择类别",
            trigger: "blur",
          },
        ],
        grade: [
          {
            required: true,
            message: "请选择年级",
            trigger: "blur",
          },
        ],
        clasz: [
          {
            required: true,
            message: "请选择班级",
            trigger: "blur",
          },
        ],
        pattern: [
          {
            required: true,
            message: "请选择开课模式",
            trigger: "blur",
          },
        ],
        orgId: [
          {
            required: true,
            message: "请选择开课校区",
            trigger: "blur",
          },
        ],
        roleId: [
          {
            required: true,
            message: "请选择所属校区",
            trigger: "blur",
          },
        ],
      },

      columns: [
        {
          title: "数量(课时)",
          align: "center",
          slot: "amount",
          width: 130,
        },
        {
          title: "总价(元)",
          align: "center",
          slot: "total",
          width: 130,
        },
        {
          title: "单价(元/课时)",
          align: "center",
          slot: "price",
          width: 130,
        },
        {
          title: "操作",
          align: "center",
          slot: "action",
          width: 130,
        },
      ],
      data: [
        {
          amount: "",
          total: "",
          price: "",
        },
      ],

      form: {
        way: 1,
        leave: 0,
        absent: 0,
        month: 1,
        day: 0,
      },
    };
  },

  components: {
    LSteps,
  },

  watch: {},

  created() {},

  mounted() {
    this.userInfo =
      JSON.parse(sessionStorage.getItem("userInfo")).orgList || [];
    this.formValidate.orgId.push(this.userInfo[0].id);
    this.init();
  },

  destroyed() {},
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
      this.tableHeight = pageHeight - 70;
    },

    goRouter(event) {
      this.$router.push({
        name: event,
        query: {},
      });
    },

    closeModal() {
      this.modal = false;
    },

    // 上一步
    back() {
      let current = this.current;
      if (current == 1) {
        this.$router.push({
          name: "course",
          query: {},
        });
      } else {
        this.current = current - 1;
      }
    },

    next() {
      let current = this.current;
      if (current == 1) {
        this.current = current + 1;
      } else if (current == 2) {
        this.current = current + 1;
      } else if (current == 3) {
        this.current = current + 1;
      } else {
        this.current = current + 1;
      }
    },

    addTab(){
      let list = this.data;
      if(list[0].amount==''||list[0].price==''||list[0].total==''){
        this.$Message.error({
            top: 500,
            closable: true,
            duration: 3,
            content: "请先填写完上一列信息",
          });
      }else{
        let obj =  {
          amount: "",
          total: "",
          price: "",
        }
        list.push(obj);
        this.data = list;
      }
    },

    userDel() {
      let obj = {};
      obj.id = this.delId;
      userDel(obj).then((res) => {
        if (res.code == 200) {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
        } else {
          this.$Message.error({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
        }
        this.closeModal();
      });
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

    .stepsTab {
      position: relative;
      float: left;
      width: 100%;
      margin-top: 12px;
      padding: 0 55px;

      .title {
        position: relative;
        float: left;
        width: 100%;

        p {
          position: relative;
          float: left;
          width: 100%;
          color: #080808;
          font-size: 18px;
          font-weight: 550;
          display: inline-block;
          line-height: 18px;

          span {
            color: #8a91a1;
            display: inline-block;
            font-size: 13px;
          }
        }
      }

      .title::after {
        content: "";
        background: #0056fb;
        left: -10px;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        border-radius: 10px;
        width: 4px;
        height: 18px;
      }

      .information {
        position: relative;
        float: left;
        width: 100%;

        /deep/ .ivu-form {
          width: 100%;
          max-width: 600px;
          padding: 10px 60px;
          position: relative;
          float: left;

          .ivu-form-item {
            min-height: 46px;
            margin-bottom: 26px;
            position: relative;
            float: left;
            width: 100%;

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

            .ivu-select-single {
              background: #fff;
              border-radius: 10px;
              border: 1px solid #d9e1eb;

              .ivu-select-selection {
                line-height: 46px;
                height: 46px;
                border: none;
                background: transparent;
              }
            }

            .ivu-select-placeholder {
              line-height: 46px;
              height: 46px;
            }

            .ivu-form-item-error-tip {
              left: 290px;
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

          .half.ivu-form-item {
            width: 50%;
            margin-bottom: 14px;
          }

          .org.ivu-form-item {
            position: relative;
            float: left;

            .ivu-form-item-content {
              background: #fbfcfe;
              padding: 10px 30px;
              border: 1px solid #d9e1eb;
              border-radius: 10px;

              .ivu-checkbox-wrapper {
                margin-bottom: 10px;
              }
            }
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

          // .ivu-radio-group::before {
          //   content: "*";
          //   display: inline-block;
          //   margin-right: 4px;
          //   line-height: 1;
          //   font-family: SimSun;
          //   font-size: 14px;
          //   color: #ed4014;
          //   top: 50%;
          //   transform: translateY(-50%);
          //   left: -2px;
          //   position: absolute;
          // }

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

          /deep/ .ivu-tree {
            min-width: 250px;
            display: inline-block;
            position: relative;
            float: left;

            .ivu-checkbox-wrapper {
              pointer-events: none;
            }
          }
        }

        .tab_cont {
          /deep/ .ivu-switch {
            position: relative;
            float: left;
          }

          /deep/ .ivu-form {
            padding: 20px 0 0 0;

            .ivu-form-item-label {
              color: #2a2a2a;
              font-size: 18px;
            }
          }

          .tab {
            position: relative;
            float: left;
            width: auto;

            .add {
              position: absolute;
              color: #689cff;
              left: 275px;
              bottom: 20px;
              text-indent: -40px;
              width: 22px;
              height: 22px;
              font-size: 14px;
              line-height: 22px;
              border-radius: 50%;
              border: 1px solid #689cff;
              background: #f6f8fd;
              z-index: 22;
              cursor: pointer;
            }

            .add::before {
              content: "";
              position: absolute;
              left: 50%;
              width: 14px;
              height: 2px;
              top: 50%;
              background: #689cff;
              transform: translate(-50%, -50%);
            }

            .add::after {
              content: "";
              position: absolute;
              left: 50%;
              height: 14px;
              width: 2px;
              top: 50%;
              background: #689cff;
              transform: translate(-50%, -50%);
            }

            /deep/ .ivu-table-wrapper {
              width: auto;
              position: relative;
              float: left;
              border-radius: 10px;
              border: 1px solid #d9e1eb;
              margin-bottom: 10px;
              padding-bottom: 40px;

              .ivu-table:before {
                // display: none;
                bottom: 39px;
                background: #d9e1eb;
              }

              .ivu-table td:last-child {
                border-bottom: none;
              }
              .ivu-table td:nth-last-child(2) {
                border-bottom: none;
              }
              .ivu-table td:nth-last-child(3) {
                border-bottom: none;
              }
              .ivu-table td:nth-last-child(4) {
                border-bottom: none;
              }

              .ivu-table-header {
                background: #f6f8fd;

                table {
                  height: 45px;

                  th {
                    background: #f6f8fd;
                    text-align: left;
                    line-height: 45px;
                    color: #2a2a2a;
                    font-size: 15px;
                    padding: 0;

                    .ivu-table-cell {
                      padding: 0 4px;
                    }
                  }
                }
              }

              .ivu-table-body {
                padding: 0 2px;
                .table {
                  // padding: 0 2px;
                }

                tr {
                  padding: 0 2px;
                  position: relative;

                  td {
                    padding: 0 !important;
                    background: #fff;
                    position: relative;

                    .ivu-table-cell {
                      padding: 0 2px;

                      .ivu-input-wrapper {
                        background: #f8faff;
                        font-size: 13px;
                        color: #3c4455;
                        border: 1px solid #e9efff;
                        border-radius: 4px;

                        .ivu-input {
                          background: transparent;
                          border: none;
                          line-height: 40px;
                          height: 40px;
                          text-align: center;
                        }
                      }
                    }

                    .ivu-btn {
                      background: #fff;
                      font-size: 13px;
                      color: #f8496a;
                      border: 1px solid #e9efff;
                      border-radius: 4px;
                      width: 100%;
                      height: 42px;
                    }
                  }
                }
              }
            }
          }
        }
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

/deep/ .ivu-modal {
  top: 40%;
  // transform: translateY(-50%);

  .ivu-modal-content {
    padding: 10px 16px;
  }

  .ivu-modal-close {
    display: none;
  }

  .content {
    p {
      font-size: 18px;
      color: #383838;
      width: 100%;
      margin-top: 35px;

      .ivu-icon-md-alert {
        font-size: 26px;
        color: #dedede;
      }
    }

    h5 {
      color: #a6a6a6;
      font-size: 14px;
      text-align: center;
      margin-top: 10px;
    }
  }

  .ivu-modal-footer {
    border-top: none;
    padding-bottom: 18px;

    .ivu-btn {
      line-height: 34px;
      height: 34px;
      width: 90px;
      text-align: center;
      font-size: 13px;
    }

    .ivu-btn-primary {
      background: #0056fb;
    }
  }
}
</style>