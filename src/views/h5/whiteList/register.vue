<template>
  <div id="agreement">
    <div class="header">
      <div class="bg">
        <p>教育培训机构云服务平台</p>
      </div>
    </div>
    <div class="content">
      <div class="bg">
        <Form
          ref="formLogin"
          :model="formLogin"
          :rules="ruleCustom"
          label-position="top"
        >
          <FormItem
            label="用户账户"
            prop="mobile"
          >
            <Input
              v-model="formLogin.mobile"
              placeholder="请输入您的用户账户"
            ></Input>
          </FormItem>
          <FormItem
            label="用户密码"
            prop="password"
          >
            <Input
              v-model="formLogin.password"
              type="password"
              placeholder="请输入机构后台设置的密码"
            ></Input>
          </FormItem>

          <FormItem class="btn">
            <Button
              type="primary"
              @click="handleSubmit"
            >立即登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { attendLogin, checkAuth, attendGetInfo } from "@/api";
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };

    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };

    return {
      formLogin: {
        mobile: "",
        password: "",
      },

      ruleCustom: {
        mobile: [{ validator: validatePhone, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },

      teacherMessage:{},
      code:''
    };
  },

  created(){
    this.getCode();
  },

  mounted() {
    // this.attendGetInfo();
  },
  methods: {
    handleSubmit() {
      this.$refs["formLogin"].validate((valid) => {
        console.log(valid);
        if (valid) {
          let openId = sessionStorage.getItem("openid");
          let obj = this.formLogin;
            obj.openId = openId;
          attendLogin(obj).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$Message.success({
                top: 300,
                closable: true,
                duration: 3,
                content: "登录成功！",
              });
              
              this.$router.push({
                name: "h5-orgManage"
              });

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
      });
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
            this.$Message.success({
              top: 300,
              closable: true,
              duration: 3,
              content: "登录成功！",
            });
            this.$router.push({
              name: "h5-orgManage"
            });
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

    getCode() {
      var code = this.getUrlParam("code"); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
      var local = window.location.href;
      var APPID = "wx033954e2afd65bc5";
      var wechat_redirect = "https://hihooedu.com/h5-orgManage";
      if (code == null || code === "") {
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          APPID +
          "&redirect_uri=" +
          encodeURIComponent(local) +
          "&response_type=code&scope=snsapi_base&state=#wechat_redirect";
      } else {
        this.code = code;
        this.checkAuth();
      }
    },

    getUrlParam(name) {
      console.log(name);
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },

    checkAuth() {
      let obj = {};
      obj.code = this.code;

      checkAuth(obj).then((res) => {
        console.log(res);
        if (res.code == 200) {
          sessionStorage.setItem("openid", res.result.mpOpenId);
          this.$router.push({
            name: "h5-orgManage"
          });
        } else if (res.code == 503){
          sessionStorage.setItem("openid", res.result.mpOpenId);
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
  background: #fff;

  .header {
    height: 240px;
    background: #fff;
    width: 100%;
    position: relative;
    float: left;

    .bg {
      background: #006bff;
      height: 240px;
      width: 100%;
      position: relative;
      float: left;
      border-radius: 0 0 0 50px;

      p {
        width: 100%;
        top: 170px;
        position: absolute;
        left: 0;
        font-size: 24px;
        font-weight: 550;
        color: #fff;
        padding-left: 35px;
      }
    }
  }

  .content {
    position: relative;
    float: left;
    width: 100%;
    background: #006bff;

    .bg {
      background: #fff;
      border-radius: 0 50px 0 0;
      height: 260px;
      width: 100%;
      position: relative;
      float: left;

      /deep/ .ivu-form-item {
        height: 106px;
        position: relative;
        float: left;
        width: 100%;
        padding: 0 18px;
        margin-bottom: 0;

        .ivu-form-item-label {
          height: 32px;
          line-height: 32px;
          margin-top: 40px;
          width: 100%;
          font-size: 16px;
          font-weight: 550;
          color: #1b1b1b;
          text-align: left;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .ivu-input {
          border: none;
          border-bottom: 1px solid #d5dbe4;
          border-radius: 0;
          height: 40px;
          line-height: 40px;
          padding: 0;
        }
      }

      /deep/ .btn {
        .ivu-form-item-content {
          margin-top: 70px;

          button {
            height: 48px;
            width: 100%;
            background: #6daaff;
            border-radius: 30px;
            text-align: center;
            font-size: 16px;
            line-height: 48px;
            color: #ffffff;
            border: none;
          }
        }
      }
    }
  }
}
</style>