<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_head">
        <Tabs>
          <TabPane
            label="添加员工"
            name="staffAdd"
          ></TabPane>
        </Tabs>
      </div>

      <div
        class="tab_content"
        :style="`height:${tableHeight}px;`"
      >
        <div class="information">
          <div class="title">
            <p>基本信息</p>
          </div>

          <Form
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="110"
          >
            <FormItem
              label="员工姓名:"
              prop="name"
            >
              <Input
                v-model="formValidate.name"
                placeholder="请输入员工姓名"
              ></Input>
            </FormItem>

            <FormItem
              label="手机号码:"
              prop="phone"
            >
              <Input
                v-model="formValidate.phone"
                placeholder="请输入手机号码"
              ></Input>
            </FormItem>
            <h5>此手机号码将作为员工登录系统的账号</h5>

            <FormItem
              label="性别:"
              style="margin-bottom: 4px;"
            >
              <RadioGroup v-model="formValidate.sex">
                <Radio :label="1">男</Radio>
                <Radio :label="0">女</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem
              label="所属校区:"
              style="margin-bottom: 4px;"
            >
              <RadioGroup v-model="formValidate.orgId">
                <template v-for="item in userInfo">
                  <Radio :label="item.id">{{item.name}}</Radio>
                </template>
              </RadioGroup>
            </FormItem>

            <FormItem
              label="是否授课:"
              style="margin-bottom: 4px;"
            >
              <i-switch
                v-model="formValidate.teaching"
                :true-value="1"
                :false-value="0"
                @on-change="changeTeaching"
              />
            </FormItem>
            <h5 style="margin-top: -2px;">设置上课教师，便于设置班级和排课时选择教师</h5>

          </Form>
        </div>

        <div class="information">
          <div class="title">
            <p>所属角色</p>
          </div>

          <div class="role">
            <p class="hint">选择角色后，下方将显示对应的权限</p>
            <RadioGroup
              v-model="formValidate.roleId"
              @on-change="roleIdChange"
            >
              <template v-for="item in data2">
                <Radio :label="item.id">{{item.title}}</Radio>
              </template>
            </RadioGroup>
          </div>

          <div class="cont">
            <p>功能权限</p>
            <h5>决定角色可以看到哪些页面或使用哪些操作</h5>

            <template v-for="item in data3">
              <Tree
                v-if="data3.length!==0"
                :data="item"
                multiple
                show-checkbox
              ></Tree>
            </template>
          </div>
        </div>

        <div class="btn_foot">
          <div class="btn">
            <p
              style="border:none; color:#fff; background:#0056FB;"
              @click="userAdd"
            >保 存</p>
          </div>
          <div class="btn">
            <p @click="back">返 回</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { roleList, myFunList, userAdd } from "../../api/index";
export default {
  data() {
    return {
      tableHeight: null,
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入员工姓名",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
          {
            type: "string",
            pattern: /^\d+$/,
            message: "请输入数字",
            trigger: "blur"
          }
        ],
      },
      formValidate: {
        name: "",
        phone: "",
        sex: 1,
        orgId: "",
        teaching: 0,
        roleId: "",
      },

      data1: [
        {
          id: 1,
          level: 2,
          title: "教务中心",
          flag: "eduAffairs",
          isOwn: 1,
          children: [
            {
              id: 2,
              level: 3,
              title: "学生管理",
              flag: "student",
              isOwn: 1,
              children: [
                {
                  id: 3,
                  level: 4,
                  title: "查看管辖校区的学生列表",
                  flag: "student_query",
                  isOwn: 1,
                  children: null,
                },
                {
                  id: 4,
                  level: 4,
                  title: "添加学生",
                  flag: "student_add",
                  isOwn: 0,
                  children: null,
                },
                {
                  id: 5,
                  level: 4,
                  title: "编辑学生信息",
                  flag: "student_mdf",
                  isOwn: 0,
                  children: null,
                },
                {
                  id: 6,
                  level: 4,
                  title: "删除学生",
                  flag: "student_del",
                  isOwn: 0,
                  children: null,
                },
              ],
            },
          ],
        },
      ],
      userInfo: [],
      data2: [],

      data3: [],
    };
  },
  watch: {},

  created() {
    this.roleList();
  },
  mounted() {
    this.userInfo =
      JSON.parse(sessionStorage.getItem("userInfo")).orgList || [];
    this.formValidate.orgId = this.userInfo[0].id;
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
            arr.push(obj);
            if (Number(i) == list.length - 1) {
              this.data2 = arr;
              this.formValidate.roleId = this.data2[0].id;
              this.myFunList(this.formValidate.roleId);
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

    myFunList(id) {
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
                let obj2 = obj.children[j];
                if (obj2.children.length !== 0) {
                  obj2.checked = false;
                  obj2.expand = true;
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
              this.data3 = list;
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

    roleIdChange(event) {
      let roleId = event;
      this.myFunList(roleId);
    },

    // 上一步
    back() {
      this.$router.push({
        name: "staff",
        query: {},
      });
    },

    changeTeaching() {},

    userAdd() {
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          let obj = this.formValidate;
          userAdd(obj).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: res.message,
              });
              setTimeout(() => {
                this.back();
              }, 1000);
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

        h5 {
          color: #b7b7b7;
          position: relative;
          width: 100%;
          padding-left: 110px;
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
</style>