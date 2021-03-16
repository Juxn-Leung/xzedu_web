<!-- 个人中心 -->
<template>
  <div class="trainlist">
    <Row>
      <div class="header" ref="header">
        <div class="title">
          <span>个人中心</span>
        </div>
      </div>
      <!-- <Divider style="margin: 10px 0" /> -->
    </Row>
    <Row>
      <div class="search" style="padding: 0 3px">
        <div class="first_ul">
          <ul>
            <li
              v-for="(tab, index) in tabs"
              v-bind:key="tab"
              :class="{ active: num == index }"
              @click="table(index)"
            >
              {{ tab }}
            </li>
          </ul>
        </div>
      </div>
    </Row>
    <div class="table_content">
      <div class="userCenter-box">
        <div class="content" v-if="num == 0">
          <div class="biaoti">
            <div
              class="demo-upload-list"
              v-for="(item, index) in avatarList"
              :key="index"
            >
              <template v-if="item !== ''">
                <img :src="item" />
                <Icon
                  v-if="disabled == false"
                  class="removeIcon"
                  type="ios-close-circle"
                  @click="avatarRemove(item)"
                />
                <Icon
                  class="eyeIcon"
                  type="ios-eye-outline"
                  @click.native="eyeIcon(item)"
                ></Icon>
              </template>
            </div>
            <Upload
              v-if="avatarList.length < 1"
              ref="upload"
              :on-success="handleSuccess"
              :format="['jpg', 'png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="avatarUpload"
              multiple
              type="drag"
              action
              style="display: inline-block; width: 86px; margin-right: -70px"
            >
              <div style="width: 86px; height: 80px; line-height: 80px">
                <!-- <Icon type="ios-camera" size="20"></Icon> -->
                <img :src="head" />
              </div>

              <div class="head_title">修改头像</div>
            </Upload>
            <Modal title="View Image" v-model="visible">
              <img
                style="float: left; width: 100%; height: 100%"
                :src="eyeUrl"
                v-if="visible"
              />
            </Modal>

            <!-- <p class="tp">（请上传jpg、png格式，小于2M的图片)</p> -->
          </div>

          <div class="input-box">
            <div class="text">用户名</div>
            <Input
              autocomplete="off"
              type="text"
              v-model="pws2.username"
              style="width: 300px"
              placeholder="请输入姓名"
            />
          </div>
          <div class="wexinx">
            <div class="text2">绑定微信</div>
            <div class="wwxinx2" v-show="wxl == 0">
              <wxlogin
                :appid="appid"
                :scope="scope"
                :redirect_uri="redirect_uri"
                :state="state"
              ></wxlogin>
              <div class="ccx2">
           请扫一扫立即绑定微信号
          </div>
          <div class="ccx">
            绑定成功后登录时可以用微信快捷登录了哦~
          </div>

            </div>

            <div class="ban" v-show="wxl == 1">
              <Icon
                type="md-checkmark-circle-outline"
                style="color: #4545f8"
                size="70"
              />
              <a>你已绑定微信账户,</a>
              <a>下次登录可以直接微信扫码登录</a>
            </div>
          </div>

          <div class="input-box">
            <Button type="primary" size="large" @click="btnConfig2"
              >确认修改</Button
            >
          </div>
        </div>

        <div class="content" v-if="num == 1">
          <div class="biaoti"></div>

          <div class="input-box">
            <div class="text">旧密码</div>
            <Input
              autocomplete="off"
              type="text"
              v-model="pws.oldPassword"
              style="width: 300px"
              placeholder="请输入旧密码"
            />
          </div>
          <div class="input-box">
            <div class="text">新密码</div>
            <Input
              autocomplete="off"
              type="text"
              v-model="pws.newPassword"
              style="width: 300px"
              placeholder="请输入新密码"
            />
          </div>
          <div class="input-box">
            <div class="text">确认密码</div>
            <Input
              autocomplete="off"
              type="text"
              v-model="allNewPws"
              style="width: 300px"
              placeholder="请再次输入新密码"
            />
          </div>
          <div class="input-box">
            <Button type="primary" size="large" @click="btnConfig"
              >确认修改</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ModifyPassword, wxCheckLogin, updateUserNameImg } from "@/api";
import wxlogin from "@/components/vue-wxlogin";
import { uploadPic } from "../../libs/ali-oss";
import initData from "@/utils/wechattype.js";
export default {
  components: {
    wxlogin,
  },
  inject: ["reload"],
  data() {
    return {
      appid: "wxfdcdf3d1cb602949",
      scope: "snsapi_login",
      redirect_uri: "https://hihooedu.com/usercenter",
      state: "Rn1NPZMD",
      tabs: ["个人信息", "修改密码"],
      head: require("@/assets/login/head.png"),
      num: 0,
      data: {},
      // init: {
      //   kdCheckpointSelect: {},
      // },
      // hx: "",
      // center: "/usercenter",
      pws: {
        oldPassword: "",
        newPassword: "",
      },
      pws2: {
        username: "",
        imgUrl: "",
      },
      allNewPws: "",
      //   上传图片相关
      imgName: "",
      visible: false,
      avatarList: [],
      disabled: false,
      wxl: 0,
    };
  },
  created() {
    // this.init.kdCheckpointSelect = initData.wechatapi;
    // this.typeapi = this.init.kdCheckpointSelect.center;
    this.data = JSON.parse(sessionStorage.getItem("userInfo"));
    console.log("获取信息" + this.data.id);
    this.wxLoginOpenid = this.data.wxLoginOpenid;
    this.pws2.username=this.data.userName;
    console.log("获取信息" + this.wxLoginOpenid);
    if (this.wxLoginOpenid == null) {
      this.wxl = 0;
      function getUrl(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
      }
      let code = getUrl("code");

      console.log("获取" + code);
      if (code == null || code == "") {
      } else {
        this.spinShow = true;
        // this.hx = document.location.hostname;
        // console.log("获取域名" + this.hx);
        // if (this.hx !== this.typeapi) {
        //   window.location.href =
        //     "https://" + this.typeapi + this.center + "?code=" + code;
        // }
        console.log("hu" + code);
        let state = this.state;
        let userId = this.data.id;
        console.log("获取用户id" + userId);
        wxCheckLogin({ code: code, state: state, userId: userId }).then(
          (res) => {
            if (res.code === 200) {
              const self = this;
              console.log(res);
              this.userDO = res.result.userDO;
              console.log(this.userDO);
              this.spinShow = false;

              this.logincheck = 1;
              localStorage.clear("tagNaveList");
              let userInfo = JSON.stringify(res.result.userDO);
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              this.$store.commit("ADD_USER_INFO", userInfo);
              //  this.reload();

              this.$Message.success("绑定成功!");
              this.logincheck = 0;
              this.$store.commit("organization/changeMyOrgId", "");
              sessionStorage.removeItem("userId");
              this.wxl = 1;
            } else {
              this.$Message.error(res.message);
            }
          }
        );
      }
    } else {
      this.wxl = 1;
    }
  },
  methods: {
    // 上传图片相关
    eyeIcon(item) {
      this.eyeUrl = item;
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
    handleFormatError(file) {
      this.$Notice.warning({
        title: "上传头像失败!",
        desc: "这张" + file.name + " 格式不正确, 请上传 jpg 或者 png格式!",
      });
      return false;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "上传图片过大!",
        desc: "这张" + file.name + "过大, 上传小于2M的图片",
      });
    },

    avatarRemove(e) {
      let list = this.avatarList;
      let index = list.indexOf(e);
      if (index != -1) list.splice(index, 1);
      this.avatarList = list;
    },

    // 图片 上传
    avatarUpload(file) {
      console.log(file);

      if (file.type !== "") {
        if (file.size < 2060000) {
          let path = "data/teacher/";
          let imgList = this.avatarList;

          uploadPic(file, path).then((res) => {
            console.log(res);
            if (res.name !== "") {
              let newImg = "https://file.zahooedu.com/" + res.name;
              imgList.push(newImg);
              if (imgList.length !== 1) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "头像只能上传一张，超出1张默认选择最后一张!",
                });
                for (var i = 0; i < imgList.length - 1; i++) {
                  // 删除除了最后一个的图片地址
                  imgList.splice(0, 1);
                  console.log(imgList);
                }
                this.avatarList = imgList;
              } else {
                this.avatarList = imgList;
              }
            }
            this.pws2.imgUrl = this.avatarList;
            console.log(this.avatarList);
          });
        }
      }
    },

    table(index) {
      this.num = index;
      console.log(this.num);
    },

    btnConfig() {
      if (this.pws.oldPassword == "") {
        this.$Message.error("旧密码不能为空");
        return;
      }
      if (this.pws.newPassword == "") {
        this.$Message.error("新密码不能为空");
        return;
      }
      if (this.allNewPws == "") {
        this.$Message.error("重复新密码不能为空");
        return;
      }
      if (this.pws.newPassword != this.allNewPws) {
        this.$Message.error("新密码和确认密码输入不一致");
        return;
      }
      ModifyPassword(this.pws).then((res) => {
        if (res.code == 200) {
          this.$Message.success(res.message);
          this.oldPassword = "";
          this.newPassword = "";
          this.allNewPws = "";
        }
      });
    },

    btnConfig2() {
      if (this.pws2.imgUrl == "") {
        this.$Message.error("头像不能为空");
        return;
      }
      if (this.pws2.username == "") {
        this.$Message.error("用户名不能为空");
        return;
      }

      updateUserNameImg(this.pws2).then((res) => {
        if (res.code == 200) {
          this.$Message.success(res.message);

          this.pws2.username = "";
          this.avatarList = "";
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
    margin-top: 10px;
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

.biaoti {
  height: 80px;
  font-size: 25px;
  font-weight: 550;
  margin-top: 40px;
  margin-bottom: 35px;
}
.userCenter-box {
  // width: 100vh;
  display: flex;
  justify-content: center;
  height: 100%;
  text-align: center;
  align-items: center;
  overflow: auto;
  .content {
    height: 600px;
    .image-box {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 500px;
      img {
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      a {
        margin: 20px 0;
        width: 500px;
        text-align: center;
      }
    }
    .input-box {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: center;
      .text {
        width: 80px;
        text-align: right;
        margin-right: 10px;
        font-weight: bold;
      }
      button {
        margin-top: 50px;
        width: 200px;
        margin-left: 88px;
      }
    }
  }
}
/deep/ .ivu-btn-large {
  height: 40px;
  padding: 0 15px;
  font-size: 16px;
  border-radius: 15px;
}
.search {
  border: 1px solid #f0f2f7;
  border-radius: 4px;
  padding: 0 6px;
  margin-bottom: 10px;
  margin-top: 10px;
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
.table_content {
  background: #f0f2f7;
  border-radius: 20px;
}
.demo-upload-list::before {
  background: none;
}
// 表单样式
.demo-upload-list {
  width: 58px;
  height: 58px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  margin-left: 195px;

  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    position: relative;
    float: left;
    border-radius: 50%;
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
  width: 58px;
  height: 58px;
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

/deep/.ivu-input {
  border: 0px;
}

.wexinx {
  width: 300px;
  height: 225px;
  background-color: #fff;
  margin-left: 90px;
  border-radius: 10px;
  margin-top: 20px;
}
.wwxinx2 {
  float: left;
  margin-left: 40px;
  height: 200px;
}
.text2 {
  float: left;
  margin-left: -66px;
  font-weight: bold;
  color: #1e275e;
}
img {
  float: left;
  width: 100%;
  height: 100%;
}
.head_title {
  font-size: 14px;
}

.ban {
  float: left;
  text-align: center;
  margin-top: 50px;
}
.ban a {
  float: left;
  font-weight: bold;
  width: 100%;
  color: #4545f8;
}
/deep/ .ivu-upload-drag {
  background: none;
  border: 0px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

/deep/ .userCenter-box .content .input-box .text {
  width: 80px;
  text-align: right;
  margin-right: 10px;
  font-weight: bold;
  color: #1e275e;
}

.ccx {
  float: left;
  margin-top: -40px;
  margin-left: 0%;
  color: #4545F8;
  font-weight: bold;
  font-size: 12px;
}
.ccx2 {
  float: left;
  margin-top: -58px;
  margin-left: 10%;
  color: #4545F8;
  font-weight: bold;
  font-size: 15px;
}
</style>
