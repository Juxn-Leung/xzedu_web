<!-- 登录页面 -->
<template>
  <div :class="{ login: isActive, active: isActivex }">
    <div class="logoimg">
      <!-- <img :src="Logo" /> -->
    </div>

    <div class="main_first" v-show="isLogin == 0">
      <!-- <div class="title_yuan"></div>
      <div class="title_yuan2"></div>
      <div class="arc"></div> -->

      <div class="mainfirst">
        <img class="mianfirstimg" :src="xiaogt" />
      </div>

      <div class="main">
        <!-- <h3 class="title_second">Hello,</h3>
       <h4 class="title_second2">Welcom</h4> -->

        <div class="login_erwei" v-if="wechatlogin == 0 && logincheck == 0">
          <Tooltip content="微 信 登 录" placement="left">
            <Button type="text" style="border: 0px">
              <div class="wei_tu" @click="wechatloginx">
                <img class="wei_tuimg" :src="saoma" /></div
            ></Button>
          </Tooltip>
        </div>

        <div class="login_erwei" v-if="wechatlogin == 1 && logincheck == 0">
          <Tooltip content="密 码 登 录" placement="left">
            <Button type="text" style="border: 0px">
              <div class="wei_tu" @click="wechatloginx">
                <img class="wei_tuimg" :src="dnd" /></div
            ></Button>
          </Tooltip>
        </div>

        <div class="login_tab" v-if="wechatlogin == 0 && logincheck == 0">
          <div
            class="tab-first"
            v-for="(item, index) in tabstitle"
            @click="togtabstitle(index)"
          >
            <div class="buttom_ed" :class="{ tabsactive: index == nowIndex1 }">
              {{ item.name }}
            </div>
          </div>
        </div>

        <!-- 登录 -->
        <div class="login-info">
          <div class="login-info-from">
            <div v-show="logincheck == 0">
              <div v-show="nowIndex1 == 0">
                <Form
                  v-show="wechatlogin == 0"
                  ref="formCustom"
                  :model="formCustom"
                  :rules="rules"
                >
                  <FormItem prop="mobile">
                    <Input
                      type="text"
                      v-model="formCustom.mobile"
                      placeholder="手机号/账号"
                      size="large"
                    >
                    </Input>
                  </FormItem>
                  <FormItem prop="pawssWord">
                    <Input
                      :type="leix"
                      on-click="onclick"
                      v-model="formCustom.password"
                      placeholder="密码"
                      size="large"
                    >
                    </Input>

                    <div class="iconx">
                      <img :src="pass" />
                    </div>

                    <div class="hanpsseord" @click="handlePassword">
                      <img v-show="eyex == 0" :src="eyes" />
                      <img v-show="eyex == 1" :src="eye" />
                    </div>
                  </FormItem>

                  <div style="text-align: right; height: 35px">
                    <!-- <div style="color: #78b5d5" class="fi" @click="goRegister">
                    用户注册
                  </div> -->
                    <div class="fi" @click="goFotget">忘记密码?</div>
                  </div>

                  <FormItem style="border: 0px">
                    <div class="bu" @click="handleSubmit('formCustom')">
                      登录
                    </div>
                  </FormItem>

                  <div class="zhucex">
                    <div
                      style="color: #78b5d5"
                      class="zhucex_bu"
                      @click="goRegister"
                    >
                      <a class="zhucex_a1">没有账号？</a
                      ><a class="zhucex_a2">用户注册</a>
                    </div>
                  </div>
                </Form>
              </div>

              <div style="margin-top: 15px;" v-show="nowIndex1 == 1 && wechatlogin == 0">
                <Form ref="form3" :rules="ruleValidate3" :model="form3">
                  <FormItem prop="phone">
                    <Input
                      autocomplete="off"
                      v-model="form3.phone"
                      placeholder="手机号"
                      maxlength="11"
                    >
                    </Input>
                  </FormItem>
                  <FormItem prop="validateCode">
                    <div style="display: flex">
                      <Input
                        style="width: 70%"
                        v-model="form3.validateCode"
                        placeholder="验证码"
                      >
                      </Input>

                      <Button
                        style="
                          width: 90px;
                          margin-left: 40px;
                          background: none;
                          border-radius: 20px;
                          color: #7aa8ff;
                          margin-bottom: 10px;
                        "
                        @click="getResetPwdValidator2"
                        v-if="!isDisabledCode3"
                        >获取验证码</Button
                      >
                      <div
                        v-else
                        style="
                          width: 90px;
                          margin-left: 40px;
                          border-radius: 20px;
                          background: none;
                          color: #7aa8ff;
                          text-align: center;
                          margin-bottom: 10px;
                        "
                      >
                        {{ timer_num2 }}后再次获取
                      </div>
                    </div>
                  </FormItem>
                  <div class="yamacuowu">{{ tipsx }} <div class="fi" style="margin-right: -10px;" @click="goFotget">忘记密码?</div></div>

                    <!-- <div style="text-align: right; height: 35px">
               
                    <div class="fi" @click="goFotget">忘记密码?</div>
                  </div> -->
                </Form>
                <div style="text-align: center">
                  <div
                    style="margin-top: 35px; margin-bottom: 30px"
                    class="bu"
                    @click="submit3('form3')"
                  >
                    登录
                  </div>
                </div>

                <div class="zhucex">
                  <div
                    style="color: #78b5d5"
                    class="zhucex_bu"
                    @click="goRegister"
                  >
                    <a class="zhucex_a1">没有账号？</a
                    ><a class="zhucex_a2">用户注册</a>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="logincheck == 1">
              <div class="zhuce_title" style="margin-top: -50%">绑定微信</div>
              <Form
                v-show="wechatlogin == 0"
                ref="formCustom"
                :model="formCustom"
                :rules="rules"
              >
                <FormItem prop="mobile">
                  <Input
                    autocomplete="off"
                    type="text"
                    v-model="formCustom.mobile"
                    placeholder="请输入手机号"
                    size="large"
                  >
                  </Input>
                  <div class="iconx">
                    <img :src="phone" />
                  </div>
                </FormItem>
                <FormItem prop="pawssWord">
                  <Input
                    autocomplete="new-password"
                    :type="leix"
                    on-click="onclick"
                    v-model="formCustom.password"
                    placeholder="请输入用户密码"
                    size="large"
                  >
                  </Input>
                  <div class="iconx">
                    <img :src="pass" />
                  </div>
                  <!-- <Icon
                  @click="handlePassword"
                  type="ios-eye-off-outline"
                  size="22"
                  style="
                    float: right;
                    color: wheat;
                    cursor: pointer;
                    margin-top: -30px;
                    margin-right: -10px;
                  "
                /> -->
                  <div class="hanpsseord" @click="handlePassword">
                    <img v-show="eyex == 0" :src="eyes" />
                    <img v-show="eyex == 1" :src="eye" />
                  </div>
                </FormItem>

                <div style="text-align: right; height: 35px">
                  <div class="fi" @click="goRegister">用户注册</div>
                </div>

                <FormItem style="border: 0px">
                  <div class="bu" @click="handlewechat('formCustom')">绑定</div>
                </FormItem>
              </Form>

              <div class="zhucex">
                <div style="color: #78b5d5" class="zhucex_bu" @click="goBack">
                  <a class="zhucex_a1">已有账号？</a
                  ><a class="zhucex_a2" @click="wechatloginx2">马上登录</a>
                </div>
              </div>
            </div>

            <div
              id="wxbox"
              v-show="wechatlogin == 1"
              style="margin-top: -155px"
            >
              <div class="zhuce_title2">微信登录</div>
              <wxlogin
                :appid="appid"
                :scope="scope"
                :redirect_uri="redirect_uri"
                :state="state"
              ></wxlogin>
              <div class="ccx1">使用微信扫描二维码登录平台</div>
              <div class="buback">
                <a class="a1">没有账号？</a
                ><a class="a2" @click="goRegister">立即注册</a>
              </div>
            </div>

            <!-- 注册 -->
            <!-- <div
              class="wechat"
              :style="{ marginTop: x + 'px' }"
              v-show="logincheck == 0"
            >
              <div class="wechat_img" v-show="wechatlogin == 0">
                <img :src="wechat" />
              </div>
              <div class="wechat_img" v-show="wechatlogin == 1">
                <img :src="wechat2" />
              </div>
              <div @click="wechatloginx" class="wechat_title">
                {{ btnText1 }}
              </div>
            </div> -->

            <!-- <div
              class="wechat"
              style="margin-top: 44px"
              v-show="logincheck == 1"
            >
              <div class="wechat_img">
                <img :src="wechat2" />
              </div>
              <div @click="wechatloginx2" class="wechat_title">
                账号密码登录
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="main_second" v-show="isLogin == 1">
      <!-- <div
        class="main_title2"
        v-if="logincheck == 1"
        style="margin-bottom: 20px"
      >
        <Icon
          type="md-checkmark-circle-outline"
          size="70"
          style="color: #00ffe4"
        /><a style="top: -11px; position: relative; color: white">注册成功</a>
      </div> -->
      <!-- <div class="retuz" @click="goBack">
        <img :src="retu" />
      </div> -->

      <div class="mainfirst">
        <img class="mianfirstimg" :src="xiaogt" />
      </div>

      <div class="main2">
        <!-- 注册 -->
        <div v-show="logincheck == 0" class="register-info">
          <div class="zhuce_title" style="margin-bottom: 5%">免费注册</div>
          <Form ref="formValidate" :rules="ruleValidate" :model="form">
            <FormItem prop="userName">
              <Input
                autocomplete="off"
                v-model="form.userName"
                placeholder="用户名"
              >
              </Input>
              <div class="iconx2">
                <img :src="my" />
              </div>
            </FormItem>

            <FormItem prop="mobile">
              <div style="display: flex">
                <Input
                  v-model="form.mobile"
                  placeholder="手机号"
                  maxlength="11"
                >
                </Input>
                <div class="iconx3">
                  <img :src="phone" />
                </div>
              </div>
            </FormItem>

            <FormItem prop="validator">
              <div style="display: flex">
                <Input
                  style="width: 70%"
                  v-model="form.validator"
                  placeholder="验证码"
                >
                </Input>

                <Button
                  style="
                    width: 90px;
                    margin-left: 40px;
                    background: none;
                    border-radius: 20px;
                    color: #7aa8ff;
                    margin-bottom: 10px;
                  "
                  @click="getMobileValidator"
                  v-if="!isDisabledCode"
                  >获取验证码</Button
                >
                <div
                  v-else
                  style="
                    width: 90px;
                    margin-left: 40px;
                    border-radius: 20px;
                    background: none;
                    color: #7aa8ff;
                    text-align: center;
                    margin-bottom: 10px;
                  "
                >
                  {{ timer_num }}后再次获取
                </div>
              </div>
            </FormItem>
            <FormItem prop="password">
              <Input
                :type="leix"
                autocomplete="new-password"
                v-model="form.password"
                placeholder="设置密码：6-16位字符，包含字母和数字"
              >
              </Input>
              <div class="iconx2">
                <img :src="pass" />
              </div>

              <div
                style="margin-top: 0px"
                class="hanpsseord"
                @click="handlePassword"
              >
                <img v-show="eyex == 0" :src="eyes" />
                <img v-show="eyex == 1" :src="eye" />
              </div>
            </FormItem>
            <FormItem prop="password2">
              <Input
                :type="leix2"
                v-model="form.password2"
                placeholder="再次输入设置密码"
              >
              </Input>
              <div class="iconx2">
                <img :src="pass" />
              </div>

              <div
                style="margin-top: 0px"
                class="hanpsseord"
                @click="handlePassword2"
              >
                <img v-show="eyex2 == 0" :src="eyes" />
                <img v-show="eyex2 == 1" :src="eye" />
              </div>
            </FormItem>

            <FormItem
              label="培训机构"
              prop="orgId"
              v-show="form.type == 'TEACHER' || form.type == 'STUDENT'"
            >
              <Select
                placeholder="请选择你所在的培训机构"
                v-model="form.orgId"
                filterable
                remote
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <Option
                  v-for="(option, index) in options"
                  :value="option.id"
                  :key="index"
                  >{{ option.orgName }}</Option
                >
              </Select>
            </FormItem>
          </Form>

          <div class="successicon_first">
            <div class="successicon">
              <div @click="showToggle">
                <Icon
                  v-show="successicon == 0"
                  type="ios-square-outline"
                  style="color: #e3e3e3"
                  size="25"
                />

                <Icon
                  v-show="successicon == 1"
                  type="ios-checkbox-outline"
                  style="color: #0056fb"
                  size="25"
                />
              </div>
              <!-- <p>{{btnText}}</p> -->
              <div style="margin-top: -24px; margin-left: 35px; color: #bcbcbc">
                我已阅读并同意<a style="color: #73a3ff"
                  ><router-link
                    tag="a"
                    style="color: #73a3ff"
                    target="_blank"
                    :to="{
                      name: 'h5-agree',
                    }"
                    >《用户注册协议》</router-link
                  ></a
                >
                <a style="color: #73a3ff">《隐私政策》</a>
              </div>
            </div>
          </div>

          <div style="text-align: center">
            <div class="bu" @click="submit('formValidate')">注册</div>
          </div>

          <div class="zhucex" style="margin-top: 20px">
            <div style="color: #78b5d5" class="zhucex_bu" @click="goBack">
              <a class="zhucex_a1">已有账号？</a
              ><a class="zhucex_a2" @click="goBack">马上登录</a>
            </div>
          </div>
        </div>

        <div id="wxbox" v-show="logincheck == 1" style="margin-top: 30%">
          <wxlogin
            :appid="appid"
            :scope="scope"
            :redirect_uri="redirect_uri"
            :state="state"
          ></wxlogin>
          <div class="ccx2">微信扫码绑定 快捷登录</div>
          <!-- <div class="ccx">不用再为忘记账号密码发愁!</div> -->
        </div>

        <div
          v-show="logincheck == 1"
          class="bu"
          style="margin-top: 60px; width: 350px; margin-left: 18%"
          @click="goBack"
        >
          <a class="bu_x">返回登录页面</a>
        </div>
      </div>
    </div>

    <div class="main_second2" v-show="isLogin == 2">
      <!-- <div v-if="lock == 0" class="main_title2">忘记密码</div> -->
      <div
        class="main_title2"
        v-if="lock == 1"
        style="margin-bottom: 20px; float: right; width: 50%; margin-top: 20%"
      >
        <Icon
          type="md-checkmark-circle-outline"
          size="70"
          style="color: #0056fb"
        />
        <div style="color: #0056fb; font-size: 18px">修改成功</div>
      </div>
      <!-- <div
        class="retuz"
        @click="goBack"
        :style="{ 'margin-top': lock == 1 ? '10%' : '15%' }"
      >
        <img :src="retu" />
      </div> -->

      <div class="mainfirst">
        <img class="mianfirstimg" :src="xiaogt" />
      </div>

      <div class="main2">
        <!-- 忘记密码 -->
        <div v-show="isLoginx == 0 || lock == 0" class="forget-info">
          <div class="zhuce_title">重置密码</div>
          <Form ref="formGetPassword" :rules="ruleValidate2" :model="form2">
            <FormItem prop="mobile2">
              <Input
                autocomplete="off"
                v-model="form2.mobile2"
                placeholder="手机号"
                maxlength="11"
              >
              </Input>
              <div
                class="iconx3"
                style="margin-top: -36px; margin-left: -133px"
              >
                <img :src="phone" />
              </div>
            </FormItem>
            <FormItem prop="validator2">
              <div style="display: flex">
                <Input
                  style="width: 70%"
                  v-model="form2.validator2"
                  placeholder="验证码"
                >
                </Input>
                <div class="iconx3" style="margin-left: -133px">
                  <img :src="ma" />
                </div>
                <Button
                  style="
                    width: 90px;
                    margin-left: 40px;
                    background: none;
                    border-radius: 20px;
                    color: #7aa8ff;
                    margin-bottom: 10px;
                  "
                  @click="getResetPwdValidator"
                  v-if="!isDisabledCode2"
                  >获取验证码</Button
                >
                <div
                  v-else
                  style="
                    width: 90px;
                    margin-left: 40px;
                    border-radius: 20px;
                    background: none;
                    color: #7aa8ff;
                    text-align: center;
                    margin-bottom: 10px;
                  "
                >
                  {{ timer_num2 }}后再次获取
                </div>
              </div>
            </FormItem>
            <FormItem prop="newPassword">
              <Input
                :type="leix"
                autocomplete="new-password"
                v-model="form2.newPassword"
                placeholder="新密码：6-16位字符，包含字母和数字"
              >
              </Input>
              <div class="iconx4">
                <img :src="pass" />
              </div>

              <div
                style="margin-top: 0px"
                class="hanpsseord"
                @click="handlePassword"
              >
                <img v-show="eyex == 0" :src="eyes" />
                <img v-show="eyex == 1" :src="eye" />
              </div>
            </FormItem>
            <FormItem prop="newPassword2">
              <Input
                :type="leix2"
                v-model="form2.newPassword2"
                placeholder="请再次输入新密码"
              >
              </Input>
              <div class="iconx4">
                <img :src="pass" />
              </div>
              <div
                style="margin-top: 0px"
                class="hanpsseord"
                @click="handlePassword2"
              >
                <img v-show="eyex2 == 0" :src="eyes" />
                <img v-show="eyex2 == 1" :src="eye" />
              </div>
            </FormItem>
          </Form>
          <div style="text-align: center">
            <div
            
              class="bu"
              @click="submit2('formGetPassword')"
            >
              确定
            </div>
          </div>

          <div class="zhucex" style="margin-top: 30px">
            <div style="color: #78b5d5" class="zhucex_bu" @click="goBack">
              <a class="zhucex_a1">已有账号？</a
              ><a class="zhucex_a2" @click="goBack">马上登录</a>
            </div>
          </div>
        </div>
        <div
          v-show="lock == 1"
          class="bu"
          style="margin-top: 60px; width: 350px; margin-left: 25%"
          @click="goBack"
        >
          <a class="bu_x">返回登录页面</a>
        </div>
      </div>
    </div>
    <!-- <div class="bottom_title" v-show="isLogin == 0">
      <div class="bottom_first">
        <div class="bottom_first1">
          教培白名单--快速查询校外培训机构是否合法，让孩子报培训班时不再“踩坑”。
        </div>
        <div class="bottom_first1">
          微教培--为学生提供更多优质校外培训课程，为教培机构提供免费线上课程发布服务。
        </div>
      </div>
      <div class="bottom_second">
        <div class="bottom_erwei">
          <div class="erwei_img">
            <img :src="xiao" />
          </div>
          <div class="erwei_titile">教培云白名单</div>
        </div>

        <div class="bottom_erwei">
          <div class="erwei_img" style="margin-left: 20px">
            <img :src="dan" />
          </div>
          <div class="erwei_titile" style="margin-left: 20px">微教培</div>
        </div>
      </div>
    </div> -->
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
// import Sidentify from "@/components/codeImage.vue";
import wxlogin from "@/components/vue-wxlogin";
import initData from "@/utils/wechattype.js";
import {
  login,
  getImageCode,
  register,
  orgList,
  mobileValidator,
  resetPwdValidator,
  getPassword,
  wxCheckLogin,
  openIdLock,
  smsLogin,
} from "@/api"; //接口
export default {
  components: {
    wxlogin,
  },
  inject: ["reload"],
  data() {
    return {
      appid: "wxfdcdf3d1cb602949",
      scope: "snsapi_login",
      redirect_uri: "https://hihooedu.com/login",
      state: "Rn1NPZMD",
      leix: "password",
      leix2: "password",
      user: "",
      help: 0,
      eyex: 0,
      eyex2: 0,
      x: -5,
      isActive: true,
      isActivex: false,
      isShow: true,
      isShow2: true,
      btnText: "",
      btnText1: "微信扫码登录",
      spinShow: false,
      successicon: 0,
      wechatlogin: 0,
      logincheck: 0,
      lock: 0,
      isLoginx: 0,
      openId: "",
      typeapi: "",
      tipsx: "",
      tabstitle: [{ name: "密码登录" }, { name: "验证码登录" }],
      nowIndex1: 0,
      title_img: require("@/assets/login/welcome.png"),
      wechat: require("@/assets/login/wechat.png"),
      xiao: require("@/assets/login/1.jpg"),
      dan: require("@/assets/login/2.jpg"),
      retu: require("@/assets/login/return.png"),
      wechat2: require("@/assets/login/dian.png"),
      eye: require("@/assets/login/eye.png"),
      eyes: require("@/assets/login/eyes.png"),
      pass: require("@/assets/login/pass.png"),
      my: require("@/assets/login/my.png"),
      phone: require("@/assets/login/phone.png"),
      ma: require("@/assets/login/ma.png"),
      Logo: require("@/assets/login/LOGO.png"),
      xiaogt: require("@/assets/login/xiaogt.png"),
      saoma: require("@/assets/login/saoma.png"),
      dnd: require("@/assets/login/dnd.png"),
      timer_num: 60,
      timer_num2: 60,
      timeClock: null,
      // hx: "",
      // login: "/login",
      init: {
        kdCheckpointSelect: {},
      },
      // isLogin: true,
      // 修改 开始
      // 新增忘记密码，则isLogin 需要有三个变量，暂定 0-登录，1-注册，2-忘记密码 默认为0
      isLogin: 0,
      // 修改结束
      isDisabledCode: false, //(注册)
      isDisabledCode2: false, //(忘记秘密)
      isDisabledCode3: false, //(验证码登录)
      form: {
        mobile: "",
        validator: "",
        type: "", //学生 STUDENT 老师 TEACHER 培训机构管理员 ORGPRINCIPAL
        userName: "",
        password: "",
        password2: "",
        orgId: "", //培训机构的Id
        openId: "",
      },
      form2: {
        mobile2: "",
        validator2: "",
        newPassword: "",
        newPassword2: "",
        id: "", //用户id
      },
      form3: {
        phone: "",
        validateCode: "",
      },

      ruleValidate: {
        mobile: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            type: "number",
            required: true,
            message: "请填写正确的手机号",
            trigger: "blur",
            transform(value) {
              var myreg = /^[1][0-9]{10}$/;
              if (!myreg.test(value)) {
                return false;
              } else {
                return Number(value);
              }
            },
          },
        ],
        validator: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
        type: [{ required: true, message: "角色不能为空", trigger: "blur" }],
        userName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
      ruleValidate2: {
        mobile2: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            type: "number",
            required: true,
            message: "请填写正确的手机号",
            trigger: "blur",
            transform(value) {
              var myreg = /^[1][0-9]{10}$/;
              if (!myreg.test(value)) {
                return false;
              } else {
                return Number(value);
              }
            },
          },
        ],
        validator2: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        newPassword2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
        ],
      },

      ruleValidate3: {
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            type: "number",
            required: true,
            message: "请填写正确的手机号",
            trigger: "blur",
            transform(value) {
              var myreg = /^[1][0-9]{10}$/;
              if (!myreg.test(value)) {
                return false;
              } else {
                return Number(value);
              }
            },
          },
        ],
        validateCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },

      loading: false,
      options: [],
      formCustom: {
        mobile: "",
        password: "",
        validateCode: "",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        validateCode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur",
          },
        ],
      },
      identifyCode: "",
    };
  },
  created() {
    // this.user = 123;
    // let path = this.$router.history.current.path;
    // this.$router.push({ path, query: { key2: this.user } });

    // this.refreshCode();
    // this.getImageCode();

    this.init.kdCheckpointSelect = initData.wechatapi;

    this.typeapi = this.init.kdCheckpointSelect.type;
    this.logincheck = 0;
    // console.log("获取域名" + document.location.hostname);
    this.keyupSubmit();
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
      // if (this.typeapi=='Rn1NPZMD') {
      //   window.location.href =
      //     "https://hihooedu.com/login" + "?code=" + code;
      //   console.log("sss")
      // }
      console.log("hu" + code);
      let state = this.typeapi;
      let userId = sessionStorage.getItem("userId");
      console.log("获取用户id" + userId);
      wxCheckLogin({ code: code, state: state, userId: userId }).then((res) => {
        if (res.code === 200) {
          const self = this;
          console.log(res);
          this.userDO = res.result.userDO;
          console.log(this.userDO);
          this.spinShow = false;
          if (this.userDO == null) {
            this.openId = res.result.openId;
            if (this.openId == null) {
              this.logincheck = 0;
            } else {
              this.logincheck = 1;
            }
          } else {
            localStorage.clear("tagNaveList");
            let userInfo = JSON.stringify(res.result.userDO);
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            this.$store.commit("ADD_USER_INFO", userInfo);
            //  this.reload();
            self.$router.push("/");
            this.$Message.success("登录成功!");
            this.logincheck = 0;
            // this.$store.commit("organization/changeMyOrgId", "");
            sessionStorage.removeItem("userId");
          }
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  },
  mounted() {
    // this.formCustom.imageCode = this.identifyCode;
    //  this.reload()
  },
  methods: {
    togtabstitle(index) {
     
      this.nowIndex1 = index;
      this.tipsx = "";
       this.reload();
       this.form3.validateCode="";
      console.log("测试" + this.nowIndex1);
    },

    handlePassword() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.leix = "password";
        this.btnText = "隐藏";
        this.eyex = 0;
      } else {
        this.leix = "text";
        this.btnText = "显示";
        this.eyex = 1;
      }
    },

    handlePassword2() {
      this.isShow2 = !this.isShow2;
      if (this.isShow2) {
        this.leix2 = "password";
        this.btnText = "隐藏";
        this.eyex2 = 0;
      } else {
        this.leix2 = "text";
        this.btnText = "显示";
        this.eyex2 = 1;
      }
    },
    wechatloginx() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.btnText1 = "微信扫码登录";
        this.wechatlogin = 0;
        this.reload();
      } else {
        this.btnText1 = "账号密码登录";
        this.wechatlogin = 1;
        this.x = 40;
      }
    },

    wechatloginx2() {
      this.reload();
      this.logincheck = 0;
      this.wechatlogin = 0;
    },

    showToggle: function () {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.btnText = "隐藏";
        this.successicon = 0;
      } else {
        this.btnText = "显示";
        this.successicon = 1;
      }
    },

    // 倒计时 (注册)
    sendCode() {
      this.timeClock = setInterval(() => {
        this.timer_num = this.timer_num - 1;
        if (this.timer_num == 0) {
          clearInterval(this.timeClock);
          this.isDisabledCode = false;
        }
      }, 1000);
    },

    // 倒计时 (忘记密码)
    sendCode2() {
      this.timeClock = setInterval(() => {
        this.timer_num2 = this.timer_num2 - 1;
        if (this.timer_num2 == 0) {
          clearInterval(this.timeClock);
          this.isDisabledCode2 = false;
        }
      }, 1000);
    },

    sendCode3() {
      this.timeClock = setInterval(() => {
        this.timer_num2 = this.timer_num2 - 1;
        if (this.timer_num2 == 0) {
          clearInterval(this.timeClock);
          this.isDisabledCode3 = false;
        }
      }, 1000);
    },
    getMobileValidator() {
      //获取验证码
      let { mobile } = this.form;
      if (!/^[1][0-9]{10}$/.test(mobile)) {
        return this.$Message.error("手机号码有误!");
      }
      this.isDisabledCode = true;
      this.timer_num = 60;
      this.sendCode();
      mobileValidator({ phone: mobile }).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    goRegister() {
      // clearInterval(this.timeClock);
      // this.isLogin = false;
      this.isActivex = true;
      this.isActive = false;
      this.isLogin = 1;
      this.logincheck = 0;

      this.formCustom = {
        mobile: "",
        password: "",
        validateCode: "",
      };
    },

    getResetPwdValidator() {
      //获取验证码
      let { mobile2 } = this.form2;
      if (!/^[1][0-9]{10}$/.test(mobile2)) {
        return this.$Message.error("手机号码有误!");
      }
      this.isDisabledCode2 = true;
      this.timer_num2 = 60;
      this.sendCode2();
      resetPwdValidator({ phone: mobile2 }).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.message);
          // this.form2 = {
          //   mobile2,
          //   id: res.result,
          // };
          sessionStorage.setItem("user_id", res.result);
        } else {
          this.$Message.error(res.message);
        }
      });
    },

    getResetPwdValidator2() {
      //获取验证码
      let { phone } = this.form3;
      if (!/^[1][0-9]{10}$/.test(phone)) {
        return this.$Message.error("手机号码有误!");
      }
      this.isDisabledCode3 = true;
      this.timer_num2 = 60;
      this.sendCode3();
      mobileValidator({ phone: phone }).then((res) => {
        if (res.code === 200) {
          this.$Message.success(res.message);
          // this.form2 = {
          //   mobile2,
          //   id: res.result,
          // };
          // sessionStorage.setItem("user_id", res.result);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    goFotget() {
      // clearInterval(this.timeClock);
      // this.isLogin = false;
      this.isActivex = true;
      this.isActive = false;
      this.isLogin = 2;
      this.lock = 0;
      this.reload();
      this.formCustom = {
        mobile: "",
        password: "",
        validateCode: "",
      };
    },
    goBack() {
      // clearInterval(this.timeClock);
      // this.isLogin = true;
      this.reload();
      this.isLogin = 0;
      this.isActivex = false;
      this.logincheck = 0;
      this.wechatlogin = 0;
      this.isActive = true;
      this.nowIndex1=0;
      sessionStorage.removeItem("userId");

      this.form = {
        mobile: "",
        validator: "",
        type: "", //学生 STUDENT 老师 TEACHER 培训机构管理员 ORGPRINCIPAL
        userName: "",
        password: "",
        password2: "",
        orgId: "", //培训机构的Id
        openId: "",
      };

      this.form2 = {
        mobile2: "",
        validator2: "",
        newPassword: "",
        newPassword2: "",
        id: "", //用户id
      };
    },
    submit(name) {
      let {
        mobile,
        validator,
        type,
        userName,
        password,
        password2,
        orgId,
        openId,
      } = this.form;
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (password !== password2) {
            this.$Message.error("两次密码不一致!");
            return;
          }

          if (this.successicon == 0) {
            console.log("ddd");
            this.$Message.error("请同意注册协议!");
          } else {
            orgId = "";
            openId = this.openId;
            register({ mobile, validator, userName, password, openId }).then(
              (res) => {
                if (res.code === 200) {
                  const self = this;
                  this.isWxLock = res.result.isWxLock;
                  console.log(res);
                  console.log(this.isWxLock);
                  this.userId = res.result.userDO.id;
                  this.wxLoginOpenid = res.result.userDO.wxLoginOpenid;
                  if (this.wxLoginOpenid == null) {
                    console.log(this.isWxLock);
                    this.wechatlogin = 1;
                    this.logincheck = 1;
                    this.isLogin = 1;
                    sessionStorage.setItem("userId", this.userId);
                  } else {
                    localStorage.clear("tagNaveList");
                    let userInfo = JSON.stringify(res.result.userDO);
                    sessionStorage.setItem(
                      "userInfo",
                      JSON.stringify(userInfo)
                    );
                    this.$store.commit("ADD_USER_INFO", userInfo);
                    //  this.reload();
                    self.$router.push("/");
                    this.$Message.success("登录成功!");

                    // this.$store.commit("organization/changeMyOrgId", "");
                    sessionStorage.removeItem("userId");
                  }

                  // this.goBack();
                } else {
                  this.$Message.error(res.result);
                }
              }
            );
          }
        } else {
          this.$Message.error(res.result);
        }
      });
    },
    submit2(name) {
      console.log("Sss");
      let { mobile2, validator2, newPassword, newPassword2, id } = this.form2;
      if (id === "") {
        if (sessionStorage.getItem("user_id") != null) {
          id = sessionStorage.getItem("user_id");
        }
      }
      this.$refs[name].validate((valid) => {
        console.log("Sss");
        if (valid) {
          if (newPassword !== newPassword2) {
            this.$Message.error("两次密码不一致!");
          } else {
            let validatorCode = validator2;
            let newPwd = newPassword;
            getPassword({ validatorCode, newPwd, id }).then((res) => {
              if (res.code === 200) {
                this.$Message.success(res.message);
                this.lock = 1;
                this.isLogin = 2;
                this.isLoginx = 1;
                // this.goBack();
                // this.reload();
              } else {
                this.$Message.success(res.message);
              }
            });
          }
        } else {
          this.$Message.error(res.result);
        }
      });
    },

    submit3(name) {
      console.log("Sss");

      this.$refs[name].validate((valid) => {
        if (valid) {
          // console.log("Sss"+this.form3.phone);
          //  let obj = JSON.parse(JSON.stringify(this.formCustom));
          let validateCode = this.form3.validateCode;
          let phone = this.form3.phone;
          smsLogin({ validateCode, phone }).then((res) => {
            if (res.code === 200) {
              const self = this;
              localStorage.clear("tagNaveList");
              let userInfo = JSON.stringify(res.result.userDO);
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              this.$store.commit("ADD_USER_INFO", userInfo);
              //  this.reload();
              self.$router.push("/");
              this.$Message.success("登录成功!");
              this.logincheck = 0;
            } else {
              if (res.message == "用户不存在，请去注册") {
                this.tipsx = res.message;
                this.form.mobile = this.form3.phone;
              }
              // this.$Message.success(res.message);
            }
          });
        } else {
          this.$Message.error(res.result);
        }
      });
    },

    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        orgList({ orgName: query }).then((res) => {
          this.loading = false;
          if (res.code === 200) {
            this.options = res.result;
          } else {
            this.$Message.error(res.result);
          }
        });
      } else {
        this.options = [];
      }
    },
    keyupSubmit() {
      document.onkeydown = (e) => {
        let _key = window.event.keyCode;
        if (_key === 13) {
          this.handleSubmit("formCustom");
          this.handlewechat("formCustom");
        }
      };
    },
    /**
     * 获取验证码
     */
    getImageCode() {
      getImageCode().then((res) => {
        this.identifyCode = res.result;
      });
    },
    /**
     * 登录按钮事件
     */
    handleSubmit(name) {
      // 判断输入框是否有值
      const self = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.formCustom));
          obj.validateCode = obj.validateCode.toUpperCase();
          // 发送登录请求
          login(obj).then((data) => {
            // 请求成功，本地存储用户信息
            if (data.code == 200) {
              localStorage.clear("tagNaveList");
              let userInfo = JSON.stringify(data.result.userDO);
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              this.$store.commit("ADD_USER_INFO", userInfo);
              //  this.reload();
              self.$router.push("/");
              this.$Message.success("登录成功!");
              this.logincheck = 0;
              // this.$store.commit("organization/changeMyOrgId", "");
            } else {
              // self.getImage();
            }
          });
        } else {
          self.$Message.error("验证码错误!");
          // self.getImage();
        }
      });
    },

    //微信绑定

    handlewechat(name) {
      // 判断输入框是否有值
      const self = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.formCustom));
          obj.openId = this.openId;
          obj.validateCode = obj.validateCode.toUpperCase();
          // 发送登录请求
          openIdLock(obj).then((data) => {
            // 请求成功，本地存储用户信息
            if (data.code == 200) {
              localStorage.clear("tagNaveList");
              let userInfo = JSON.stringify(data.result.userDO);
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              this.$store.commit("ADD_USER_INFO", userInfo);
              //  this.reload();
              self.$router.push("/");
              this.$Message.success("登录成功!");
              // this.$store.commit("organization/changeMyOrgId", "");
            } else {
              // self.getImage();
            }
          });
        } else {
          self.$Message.error("验证码错误!");
          // self.getImage();
        }
      });
    },

    getImage() {
      this.getImageCode();
    },
  },
};
</script>
<style lang="scss" scoped>
#wxbox {
  width: 220px;
  margin-left: 27%;
  height: 220px;
  background: white;
  border-radius: 7px;
  margin-top: -100px;
}
.active {
  background: #f5f6f9;
}

.mainfirst {
  float: left;
  width: 50%;
  height: 100%;
}
.mianfirstimg {
  float: left;
  width: 100%;
  height: 100%;
}
.login_erwei {
  float: left;
  width: 100%;
  height: 150px;
}
/deep/ .ivu-tooltip {
  display: inline-block;
  float: right;
  margin-top: 35px;
}

/deep/ .ivu-btn {
  border: 1px solid #7aa8ff;
  padding: 0px;
}

/deep/ .ivu-tooltip-inner {
  max-width: 250px;
  min-height: 34px;
  padding: 8px 25px;
  color: #b6cfff;
  text-align: left;
  text-decoration: none;
  background-color: #dfeaff;
  border-radius: 4px;
  box-shadow: none;
  margin-left: 40px;
  white-space: nowrap;
}
/deep/ .ivu-tooltip-rel {
  width: 75px;
}
/deep/ .ivu-tooltip-popper[x-placement^="left"] .ivu-tooltip-arrow {
  right: 3px;
  border-width: 5px 0 5px 5px;
  border-left-color: #dfeaff;
}
.wei_tu {
  float: right;
  width: 60px;
  height: 60px;
  margin-top: -15px;
  margin-right: 5%;
}
.wei_tuimg {
  float: left;
  width: 100%;
  height: 100%;
}
.logoimg {
  float: left;
  margin-top: 30px;
  margin-left: 50px;
}
.login {
  height: 100%;
  // background-image: url("../assets/login/loginx.png");
  background-size: 100% 100%;
  background: #f5f6f9;
  position: relative;
  .main {
    float: left;
    background: white !important;
    width: 50%;

    .title {
      font-size: 30px;
      line-height: 30px;
      margin-bottom: 25px;
      letter-spacing: 5px;
      font-weight: bolder;
      text-align: left;
      color: #eeeeee;
    }
    .title_second {
      font-size: 47px;
      text-align: left;
      color: #ffffff;
    }

    .title_second2 {
      font-size: 47px;
      text-align: left;
      color: #ffffff;
      margin-bottom: 24px;
    }
    .login-info {
      border-radius: 6px;
      width: 95%;
      height: 280px;
      padding: 50% 80px 32px 92px;
      margin-top: 15px;
    }
    .register-info {
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.8);
      width: 540px;
      padding: 32px 40px;
    }
    .forget-info {
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.8);
      width: 540px;
      padding: 32px 40px;
    }
  }
  .code-image {
    cursor: pointer;
  }
  .code {
    display: flex;
  }
}

.main2 {
  width: 50%;
  float: left;
}
.main_second {
  height: 80%;
  top: 10%;
}
.main_second2 {
  height: 80%;
  top: 10%;
}

.forget-info {
  width: 95%;
  height: 280px;
  padding: 15% 80px 32px 92px;
}

.register-info {
  width: 95%;
  height: 280px;
  padding: 8% 80px 32px 92px;
}
// 新增
.forgetPassword > :first-child {
  // width: 100px !important;
  // left: 20px !important;
  position: absolute !important;
}
.bottom_title {
  float: left;
  width: 69%;
  height: 150px;
  margin-left: 31%;
  bottom: 0;
  background: #0b3682;
  position: fixed;
}
.ccx {
  float: left;
  margin-top: -40px;
  margin-left: 16%;
  color: #749bff;
  font-weight: bold;
  font-size: 12px;
}
.ccx2 {
  float: left;
  margin-top: -58px;
  margin-left: 15%;
  color: #2965ff;
  font-weight: bold;
  font-size: 15px;
}
.ccx1 {
  float: left;
  margin-top: -30px;
  margin-left: 7%;
  color: #727272;
  font-weight: bold;
  font-size: 15px;
}
span {
  color: white;
}
/deep/ .ivu-input:focus {
  outline: none;
  border: none;
  box-shadow: 0 0 0 2px transparent;
}

// /deep/ .ivu-input:-webkit-autofill {
//   transition: background-color 5000s ease-in-out 0s;
// }

/deep/ .ivu-input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset !important;
}
/deep/ .ivu-input-group {
  width: 90%;
}
/deep/ .ivu-input-group-large .ivu-input {
  background: none !important;
}
/deep/ .ivu-input {
  border: 0px;
  background: none;
  font-size: 15px;
  // margin-left: 50px;
  margin-bottom: 6px;
}

/deep/ .ivu-form-item {
  border-bottom: 1px solid #dddddd;
  margin-bottom: 30px;
}
/deep/ .ivu-form .ivu-form-item-label {
  color: #d2d2d2;
}
/deep/ .ivu-input-group-prepend {
  background: none;
  border: 0px;
}
/deep/ input:-internal-autofill-selected {
  // -webkit-text-fill-color: white;
  transition: background-color 1000000000000s ease-out 0.5s;
}
/deep/ input:-internal-autofill-previewed {
  // -webkit-text-fill-color: white;
  transition: background-color 10000000000000s ease-out 0.5s;
}

/deep/ .ivu-form .ivu-form-item-label {
  text-align: left;
  padding: 10px 12px 10px 25px;
  font-size: 15px;
}

/deep/ .ivu-form-item-required .ivu-form-item-label:before {
  content: "*";
  display: inline-block;
  margin-right: 0px;
  line-height: 1;
  font-family: SimSun;
  font-size: 0px;
  color: #ed4014;
}

/deep/ .ivu-input-wrapper {
  display: inline-block;
  width: 80%;
  position: relative;
  vertical-align: middle;
  line-height: normal;
}

.main_first {
  float: left;
  width: 1270px;
  height: 700px;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  // background: #2047a4;
  // opacity: 0.9;
  background: #ffffff;
}
.retuz {
  width: 50px;
  height: 90px;
  float: left;
  margin-top: 15%;
  margin-left: 2%;
  cursor: pointer;
}
.retuz img {
  float: left;
  width: 100%;
  height: 100%;
}
.main_second {
  float: left;
  width: 1270px;
  height: 700px;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  background: #ffffff;
}
.main_second2 {
  float: left;
  width: 1270px;
  height: 700px;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  background: #ffffff;
}
.main_title2 {
  float: left;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 26px;
  margin-top: 5%;
  letter-spacing: 5px;
  font-weight: bold;
}
.title_yuan {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: #1741b1;
  position: fixed;
  right: -50px;
  top: -50px;
  z-index: 4;
}

.title_yuan2 {
  width: 370px;
  height: 370px;
  border-radius: 50%;
  background: #562d7b;
  position: fixed;
  right: 250px;
  top: -190px;
  z-index: 1;
}
.bu_x {
  float: left;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 14px;
  height: 100%;
  line-height: 45px;
}
.arc {
  width: 230px;
  height: 230px;
  position: fixed;
  right: 139px;
  border-radius: 230px 0;
  -webkit-transform: rotate(-30deg);
  transform: rotate(-10deg);
  background: #3f2d91;
  z-index: 4;
  top: -90px;
}

.bu {
  // width: 450px;
  height: 45px;
  border-radius: 5px;
  text-align: center;
  line-height: 45px;
  color: white;
  margin-top: 20px;
  letter-spacing: 5px;
  font-size: 16px;
  cursor: pointer;
  background: #0056fb;
}

.zhucex {
  float: left;
  width: 100%;
  height: 20px;
}

.zhucex_bu {
  float: left;
  width: 100%;
  text-align: center;
}

.zhucex_a1 {
  color: #727272;
  font-weight: 550;
}
.zhucex_a2 {
  color: #0056fb;
  font-weight: 550;
}
.wechat {
  float: left;
  color: white;
  width: 150px;
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 20px;
  margin-left: 65%;
  cursor: pointer;
}
.wechat::before {
  bottom: 16px;
  width: 100px;
  height: 0.5px;
  border-radius: 30px;
  background: #dddddd;
  content: "";
  position: absolute;
  left: -52%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.wechat::after {
  bottom: 16px;
  width: 100px;
  height: 0.5px;
  border-radius: 30px;
  background: #dddddd;
  content: "";
  position: absolute;
  left: 130%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.wechat_img {
  float: left;
  width: 35px;
  height: 35px;
}
.wechat_img img {
  float: left;
  width: 100%;
  height: 100%;
}
.wechat_title {
  float: left;
  line-height: 35px;
  margin-left: 5px;
  color: black;
}
.bottom_first {
  float: left;
  padding: 30px 30px 20px 30px;
  border-bottom: 1px solid #96baff;
  margin-left: 9%;
}
.bottom_first1 {
  color: #96baff;
  font-size: 12px;
}
.bottom_second {
  float: left;
  width: 200px;
  margin-left: 5%;
  height: 100px;
  margin-top: 20px;
}
.bottom_erwei {
  float: left;
  width: 100px;
  text-align: center;
}
.erwei_img {
  float: left;
  width: 100px;
  height: 100px;
  margin-left: -5px;
}
.erwei_img img {
  float: left;
  width: 100%;
  height: 100%;
}
.erwei_titile {
  float: left;
  width: 100%;
  color: #96baff;
  font-size: 12px;
}
.fi {
  color: #6a6a6a;
  float: right;
  font-weight: 550;
  font-size: 14px;
  width: 75px;
  cursor: pointer;
}
.successicon_first {
  width: 100%;
  height: 50px;
}
.successicon {
  float: left;
  // margin-left: 125px;
  cursor: pointer;
}

.zhuce_title {
  width: 100%;
  height: 35px;
  font-size: 18px;
  margin-bottom: 25%;
  color: #0056fb;
  position: relative;
  text-align: center;
  font-weight: 550;
}

.zhuce_title::after {
  width: 15px;
  height: 4px;
  border-radius: 40px;
  background: #0056fb;
  content: "";
  position: absolute;
  left: 50%;
  /* right: 13px; */
  /* margin-right: 119px; */
  margin-top: 30px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.hanpsseord {
  width: 40px;
  height: 40px;
  float: right;
  color: wheat;
  cursor: pointer;
  margin-top: -30px;
  margin-right: 0px;
}
.hanpsseord img {
  float: left;
  width: 100%;
  height: 100%;
}
.iconx {
  height: 30px;
  width: 30px;
  margin-top: -39px;
}
.iconx2 {
  position: absolute;
  margin-left: -106px;
  height: 30px;
  width: 30px;
  margin-top: -35px;
}
.iconx4 {
  position: absolute;
  margin-left: -133px;
  height: 30px;
  width: 30px;
  margin-top: -35px;
}
.iconx4 img {
  float: left;
  width: 100%;
  height: 100%;
}
.iconx img {
  float: left;
  width: 100%;
  height: 100%;
}
.iconx2 img {
  float: left;
  width: 100%;
  height: 100%;
}
.iconx3 {
  position: absolute;
  margin-top: 0px;
  margin-left: -106px;
  height: 30px;
  width: 30px;
}
.iconx3 img {
  float: left;
  width: 100%;
  height: 100%;
}

/deep/.ivu-btn:focus {
  box-shadow: none !important;
}
.buback {
  float: left;
  width: 100%;
  height: 20px;
  text-align: center;
  font-weight: 550;
  margin-top: 40px;
}
.a1 {
  color: #727272;
}
.a2 {
  color: #0056fb;
}

.login_tab {
  float: left;
  width: 70%;
  margin-left: 15%;
  margin-top: 5%;
  height: 20px;
}

.tab-first {
  float: left;
  width: 50%;
  height: 100%;
  font-size: 18px;
  font-weight: 550;
  color: #0f0f0f;
  text-align: center;
  cursor: pointer;
}

.tabsactive {
  color: #0056fb;
  position: relative;
  cursor: pointer;
}
.tabsactive::after {
  width: 15px;
  height: 4px;
  border-radius: 40px;
  background: #0056fb;
  content: "";
  position: absolute;
  left: 50%;
  /* right: 13px; */
  // margin-left: -35px;
  /* margin-right: 119px; */
  margin-top: 30px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.yamacuowu {
  margin-top: 5px;
  color: red;
  font-size: 13px;
  height: 20px;
}

/deep/ .ivu-input-wrapper {
  margin-bottom: 10px;
}

.zhuce_title2 {
  width: 100%;
  height: 35px;
  font-size: 18px;
  margin-bottom: 25%;
  color: #0f0f0f;
  position: relative;
  text-align: center;
  font-weight: 550;
}

@media (max-width: 1420px) {
  .main_first {
    width: 1170px !important;
  }

  .main_second2 {
    width: 1170px !important;
  }

  .main_second{
     width: 1170px !important;
  }
}
</style>
