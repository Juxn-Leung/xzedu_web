<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_head">
        <Tabs
          :value="$router.currentRoute.name"
          @on-click="goRouter"
        >
          <TabPane
            label="员工管理"
            name="staff"
          ></TabPane>
          <TabPane
            label="角色管理"
            name="roleManagement"
          ></TabPane>
        </Tabs>
      </div>

      <div
        class="tab_content"
        :style="`height:${tableHeight}px;`"
      >
        <div class="rolePanel">
          <div class="conetent">
            <div class="label">
              <p>角色</p>
            </div>
            <div
              class="addBtn"
              @click="userAdd"
            ></div>

            <Tree
              :data="data2"
              :render="renderContent"
            ></Tree>
          </div>
        </div>

        <div class="role">
          <div class="describe">
            <Form
              ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="110"
              :disabled="type"
            >
              <FormItem
                label="角色名称:"
                prop="name"
              >
                <Input
                  v-model="formValidate.name"
                  placeholder="请输入角色名称"
                ></Input>
              </FormItem>

              <FormItem label="描述:">
                <Input
                  v-model="formValidate.remark"
                  type="textarea"
                  placeholder="请对角色进行描述"
                ></Input>
              </FormItem>
            </Form>
          </div>

          <div class="jurisdiction">
            <div class="label">
              <p>功能权限</p>
            </div>

            <div class="cont">
              <template v-for="(item,index) in data1">
                <Tree
                  v-if="data1.length!==0"
                  :ref="`tree${index}`"
                  :data="item"
                  multiple
                  show-checkbox
                  @on-check-change="(event)=> checkChange(event, `tree${index}`)"
                ></Tree>
              </template>
            </div>
          </div>
        </div>

        <div class="btn_foot" v-if="type==false">
          <div class="btn">
            <p
              style="border:none; color:#fff; background:#0056FB;"
              v-if="step==1"
              @click="roleAdd"
            >保 存</p>
            <p
              style="border:none; color:#fff; background:#0056FB;"
              v-else
              @click="roleEdit"
            >修 改</p>
          </div>
          <div class="btn">
            <p @click="goBack">返 回</p>
          </div>
        </div>
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
          {{hasUser==0?'确定要删除这个角色吗？':'不能被删除'}}
        </p>
        <h5> {{hasUser==0?'删除后角色将不能被使用，此操作不能被撤销':'该角色已有绑定的账户，不能删除！'}}</h5>
      </div>

      <div
        slot="footer"
        class="footer_btn"
        v-if="hasUser==0"
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
      <div
        slot="footer"
        class="footer_btn"
        v-else
      >
        <Button
          type="primary"
          @click="closeModal"
        >知道了</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  roleList,
  allFunList,
  roleAdd,
  roleEdit,
  roleDel,
  myFunList,
  userAdd,
  userEdit,
  userDel,
} from "../../api/index";
export default {
  data() {
    return {
      tableHeight: null,
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
      },
      formValidate: {
        name: "",
        remark: "",
        menuIds: [],
      },

      data1: [],

      data2: [
        {
          title: "角色",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%",
                },
              },
              [
                h("span", [
                  h("Icon", {
                    props: {
                      type: "md-people",
                    },
                    style: {
                      marginRight: "8px",
                    },
                  }),
                  h("span", data.title),
                ]),
                h("span", {
                  style: {
                    display: "inline-block",
                    float: "right",
                    marginRight: "32px",
                  },
                }),
              ]
            );
          },

          children: [],
        },
      ],
      buttonProps: {
        type: "default",
        size: "small",
      },

      data1Check: true,

      modal: false,
      delId: null,
      editId: null,
      hasUser: 0,
      type: false,
      step: 1,
    };
  },
  // watch: {},

  created() {
    this.funList();
  },
  mounted() {
    this.init();
    this.roleList();
  },
  destroyed() {},
  computed: {},
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%",
          },
        },
        [
          h(
            "span",
            {
              on: {
                click: () => {
                  let index = data.nodeKey;
                  this.myFunList(index);
                },
              },
            },
            [
              h("Icon", {
                props: {
                  type: "md-person",
                },
                style: {
                  marginRight: "8px",
                },
              }),
              h("span", data.title),
            ]
          ),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
              },
            },
            [
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps, {}),
                  style: {
                    right: "8px",
                    border: "none",
                    height: "16px",
                  },
                  on: {
                    click: () => {
                      this.roleDel(root, node, data);
                    },
                  },
                },
                "删除"
              ),
            ]
          ),
        ]
      );
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
      this.tableHeight = pageHeight - 70;
    },

    goRouter(event) {
      this.$router.push({
        name: event,
        query: {},
      });
    },

    roleList() {
      roleList({}).then((res) => {
        if (res.code == 200) {
          let list = res.result;
          let arr = [];
          for (var i in list) {
            let obj = {};
            obj.title = list[i].name;
            obj.hasUser = list[i].hasUser;
            obj.expand = true;
            obj.id = list[i].id;
            obj.remark = list[i].remark;
            if (list[i].type == 1) {
              obj.disabled = true;
            }
            arr.push(obj);
            if (Number(i) == list.length - 1) {
              this.data2[0].children = arr;
            }
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

    funList() {
      allFunList({}).then((res) => {
        if (res.code == 200) {
          let list = [];
          for (var i in res.result) {
            let arr = [];
            arr.push(res.result[i]);
            list.push(arr);
            if (Number(i) == res.result.length - 1) {
              this.data1 = list;
            }
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

    myFunList(index) {
      this.formValidate.name = this.data2[0].children[index - 1].title;
      this.formValidate.remark = this.data2[0].children[index - 1].remark;
      this.type = this.data2[0].children[index - 1].disabled || false;
      let id = this.data2[0].children[index - 1].id;
      this.editId = id;
      this.step = 2;
      console.log(id);
      let obj = {
        roleId: id,
      };
      myFunList(obj).then((res) => {
        if (res.code == 200) {
          let list = [];
          for (var i in res.result) {
            let arr = [];
            let obj = res.result[i];
            obj.expand = true;
            if (obj.children.length !== 0) {
              obj.checked = false; 
              for (var j in obj.children) {
                if(obj.children[j].children.length!==0){
                  obj.children[j].checked = false;
                  obj.children[j].expand = true;
                }
                if (Number(j) == obj.children.length - 1) {
                  arr.push(obj);
                  list.push(arr);
                }
              }
            } else {
              arr.push(obj);
              list.push(arr);
            }
            if (Number(i) == res.result.length - 1) {
              this.data1 = list;
              this.data1Check = false;
              setTimeout(() => {
                this.checkChange();
              }, 500);
            }
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

    roleAdd() {
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          let obj = this.formValidate;
          roleAdd(obj).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: res.message,
              });
              this.userAdd();
              this.roleList();
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
          return false;
        }
      });
    },

    roleEdit() {
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          let id = this.editId;
          let obj = this.formValidate;
          obj.id = id;
          roleEdit(obj).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: res.message,
              });
              this.userAdd();
              this.roleList();
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
          return false;
        }
      });
    },

    roleDel(root, node, data) {
      this.hasUser = data.hasUser;
      this.delId = data.id;
      this.modal = true;
    },

    closeModal() {
      this.modal = false;
    },

    userDel() {
      let obj = {};
      obj.id = this.delId;
      roleDel(obj).then((res) => {
        if (res.code == 200) {
          this.$Message.success({
            top: 300,
            closable: true,
            duration: 3,
            content: res.message,
          });
          this.roleList();
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

    userAdd() {
      this.formValidate.name = "";
      this.formValidate.remark = "";
      this.formValidate.menuIds = [];
      this.type = false;
      this.step = 1;
      this.funList();
    },

    goBack() {
      let route = this.$parent.$route;
      this.$parent.closeTag(route);
      this.$router.go(-1);
    },

    checkChange(event, ref) {
      let roleList = this.data1;
      let newsList = [];
      for (var i in roleList) {
        let index = "tree" + i;
        let list = this.$refs[index][0].getCheckedAndIndeterminateNodes();
        let arr = [];
        for (var j in list) {
          arr.push(list[j].id);
          if (Number(j) == list.length - 1) {
            newsList.push(...arr);
          }
        }
        if (Number(i) == roleList.length - 1) {
          this.formValidate.menuIds = newsList;
          console.log(this.formValidate.menuIds);
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
    padding: 26px 18px 0 332px;
    // display: flex;
    overflow-y: auto;

    .label {
      position: relative;
      float: left;
      width: 100%;

      p {
        position: relative;
        float: left;
        height: 46px;
        width: 100%;
        padding-left: 30px;
        line-height: 46px;
        font-size: 20px;
        color: #323232;
        font-weight: 550;
      }
    }

    .label::after {
      height: 18px;
      width: 4px;
      border-radius: 20px;
      background: #0056fb;
      position: absolute;
      content: "";
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }

    .rolePanel {
      width: 314px;
      position: absolute;
      left: 18px;
      top: 26px;

      .conetent {
        position: relative;
        float: left;
        width: 100%;
        border-radius: 10px;
        border: 2px solid #d9e1eb;
        padding-top: 11px;
        padding-bottom: 16px;

        .addBtn {
          width: 24px;
          height: 24px;
          position: absolute;
          right: 14px;
          top: 20px;
          z-index: 2;
          border-radius: 50%;
          border: 2px solid #0056fb;
        }

        .addBtn::before {
          content: "";
          background: #0056fb;
          position: absolute;
          width: 12px;
          height: 2px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .addBtn::after {
          content: "";
          background: #0056fb;
          position: absolute;
          width: 2px;
          height: 12px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        /deep/ .ivu-tree {
          position: relative;
          float: left;
          width: 100%;
          padding: 0 16px 0 16px;

          .ivu-tree-children {
            margin: 8px 0 8px 0 !important;
            position: relative;
            float: left;
            width: 100%;

            li {
              margin: 0;
            }

            .ivu-tree-arrow {
            }

            .ivu-tree-arrow-disabled::after {
              position: absolute;
              right: -15px;
              padding: 0 17px;
              top: -4px;
              height: 30px;
              background: #fff;
              color: #c0c0c0;
              font-size: 15px;
              line-height: 30px;
              content: "系统角色";
              pointer-events: none;
            }

            .ivu-tree-title-selected,
            .ivu-tree-title-selected:hover,
            .ivu-tree-title {
              background: transparent !important;
              border: none !important;
            }

            .ivu-tree-title {
              width: 100%;

              span {
                border: none !important;
              }

              .ivu-btn {
                border: none;
                height: 16px;
                line-height: 16px;
                color: #fc8991;
                padding: 0 15px;
              }

              .ivu-btn:hover {
                background: transparent !important;
              }
            }
          }
        }
      }
    }

    .role {
      width: 100%;
      position: relative;
      float: left;
      padding-left: 17px;

      .describe {
        width: 100%;
        position: relative;
        float: left;
        background: #fafbfc;
        padding-left: 30px;
        padding-top: 30px;
        border-radius: 10px;

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
          }
        }
      }

      .cont {
        position: relative;
        float: left;
        border-radius: 10px;
        border: 2px solid #d9e1eb;
        width: 100%;
        padding-top: 26px;
        padding-left: 10%;

        /deep/ .ivu-tree {
          width: 30%;
          margin-bottom: 32px;
          position: relative;
          float: left;

          .ivu-tree-title-selected,
          .ivu-tree-title-selected:hover,
          .ivu-tree-title {
            background: transparent !important;
            border: none !important;
          }
        }

        // /deep/ .ivu-tree:nth-child(4n),
        // /deep/ .ivu-tree:nth-child(1) {
        //   margin-left: 10%;
        // }
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