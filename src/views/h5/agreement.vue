<template>
  <div id="agreement">
    <h1 class="title">给全体中小学生和家长的一封信</h1>
    <h2 class="subtitle">（校外培训和在线教育培训）</h2>

    <div class="text_content">
      <h2>亲爱的各位同学、各位家长：</h2>

      <p>
        近年来，各地中小学校外培训发展迅速，各类线上教育产品也如火如荼发展，为广大学生家长提供了教育教学的有益补充。
        同时，也出现了预付费过多、师资良莠不齐、超纲超前教学等问题。为规范中小学校外培训机构市场秩序，
        广东省教育厅会同有关部门联合开展了专项治理行动，并将合格合规的校外培训机构（文化教育类，下同）列入全国“白名单”。
        请广大学生、家长尽量选择名单以内的校外培训机构，以免误选违规校外培训机构造成重大经济损失、伤害学生身心健康。
      </p>

      <p>
        广大学生、家长选择中小学校外培训机构，请认准
        <span>“全国中小学生校外培训机构管理服务平台”</span>
        上面公布的白名单机构；选用校外线上培训机构的，请认准
        <span>“全国校外线上培训管理服务平台”</span>
        上面公布的白名单机构。
      </p>

      <p>
        此外，根据国家规定，中小学校外培训机构一次性收费不得超过3个月。为帮助广大学生家长切实维护自身合法权益，规范校外培训市场秩序，
        广东省教育厅、广东省市场监督管理局印发了教育部、市场监督管理总局联合制定
        的《校外培训机构培训服务合同（示范文本）》。
        请广大学生、家长在缴费之前，认真、仔细阅读合同（协议）各项条款，尽量选择使用广东省教育厅印发的《合同》（示范文本），
        切勿片面追求各类充值优惠、“买6（个月）送6（个月）”等所谓折扣，更不要一次缴纳多年巨额费用。同时，要仔细保管好有关协议文本、
        合同、票据等资料，切实维护自身合法权益。
      </p>

      <p>广东省教育厅将继续组织各地市加大监督检查力度，共同营造校外培训机构规范发展的市场氛围。</p>

      <p>祝各位同学、家长在新学期里，身体健康、学业进步、万事如意！</p>

      <p style="text-align: right;">广东省教育厅</p>

      <p style="text-align: right;">2021年1月</p>

      <div class="erweima">
        <div class="demo">
          <div class="img">
            <img src="../../assets/login/1.jpg">
          </div>
          <div class="text">
            <p>长按识别</p>
            <p>查询校外培训机构</p>
          </div>
        </div>

        <div class="demo">
          <div class="img">
            <img src="../../assets/login/3.png">
          </div>
          <div class="text">
            <p style="color:#209ae7;">长按识别</p>
            <p style="color:#209ae7;">查看保存合同范文</p>
          </div>
        </div>

      </div>

      <div class="line"></div>

      <Form
        ref="formItem"
        :model="formItem"
        :label-width="90"
        :rules="ruleValidate"
        :hide-required-mark="true"
      >
        <FormItem
          label="学校"
          prop="schoolId"
        >
          <Select
            v-model="formItem.schoolId"
            :value="formItem.schoolId"
            :filterable="true"
            remote
            :remote-method="schList"
            :loading="loading"
            placeholder="请输入学校名称"
            @on-change="changeSchool"
          >
            <Option
              v-for="(item, index) in schoolList"
              :key="index"
              :value="item.id"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem
          label="年级"
          prop="gradeId"
        >
          <Select
            v-model="formItem.gradeId"
            :value="formItem.gradeId"
            transfer
            @on-change="changeGrade"
          >
            <Option
              v-for="(item, index) in gradeList"
              :key="index"
              :value="item.id"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem
          label="班级"
          prop="classId"
        >
          <Select
            v-model="formItem.classId"
            :value="formItem.classId"
            transfer
            @on-change="changeClass"
          >
            <Option
              v-for="(item, index) in classList"
              :key="index"
              :value="item.id"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem
          label="学生姓名"
          prop="name"
        >
          <Input
            v-model="formItem.name"
            placeholder="请输入学生姓名"
          />
        </FormItem>

        <FormItem
          label="家长手机"
          prop="phone"
        >
          <Input
            v-model="formItem.phone"
            placeholder="请输入家长手机号码"
          />
        </FormItem>

        <div class="operation">
          <div class="from_demo">
            <h5>家长签字（请在下面方框内手写签名）</h5>

            <div
              class="signature_panel"
              ref="Signature_panel"
            >
              <sign-canvas
                class="sign-canvas"
                ref="SignCanvas"
                :options="options"
                v-model="value"
              />
              <span
                id="save"
                @click="canvasClear()"
              >清空</span>
              <!-- <span
                id="save"
                @click="saveAsImg()"
              >确定</span>-->
            </div>
          </div>
          <h5
            v-if="hint!==''"
            class="hint_h5"
          >{{hint}}</h5>
        </div>

        <FormItem class="check">
          <Checkbox
            v-model="single"
            @on-change="checkOk"
          >我已认真阅读并知晓其风险</Checkbox>
        </FormItem>
      </Form>

      <div
        slot="footer"
        class="footer_btn"
      >
        <Button
          :class="submit==true?'':'no'"
          type="primary"
          @click="saveAsImg"
        >提 交</Button>
      </div>
    </div>

    <Modal
      v-model="modalStatus"
      :title="modalTitle"
      :closable="false"
      :mask-closable="false"
    >
      <div class="modal_title">
        <div class="model_img">
          <img src="../../assets/succes.png" />
        </div>
      </div>
      <div class="modal_title">
        <div class="model_titlex">提交成功</div>
      </div>

      <div class="modal_title">
        <div class="model_titlex2">关注教培云公众号，获取更多教育资讯</div>
      </div>

      <div
        slot="footer"
        class="footer_btn"
      >
        <Button
          class="qu"
          @click="kub"
        >知道了</Button>
        <Button
          class="guan"
          @click="skip"
        >去关注</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { collectAdd, schList, getGradeList } from "@/api";
import { uploadPic } from "../../libs/ali-oss";
export default {
  data() {
    return {
      value: null,
      modalStatus: false,
      modalTitle: "",
      options: {
        lastWriteSpeed: 1, //书写速度 [Number] 可选
        lastWriteWidth: 2, //下笔的宽度 [Number] 可选
        lineCap: "round", //线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square]	正方形线帽
        lineJoin: "round", //线条交汇时边角的类型  [bevel]创建斜角 [round]创建圆角 [miter]创建尖角。
        canvasWidth: null, //canvas宽高 [Number] 可选
        canvasHeight: null, //高度  [Number] 可选
        isShowBorder: true, //是否显示边框 [可选]
        bgColor: "#fff", //背景色 [String] 可选 注:这背景色仅仅只是canvas背景,保存的图片仍然是透明的
        borderWidth: 1, // 网格线宽度  [Number] 可选
        borderColor: "#fff", //网格颜色  [String] 可选
        writeWidth: 2, //基础轨迹宽度  [Number] 可选
        maxWriteWidth: 30, // 写字模式最大线宽  [Number] 可选
        minWriteWidth: 2, // 写字模式最小线宽  [Number] 可选
        writeColor: "#101010", // 轨迹颜色  [String] 可选
        isSign: true, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
        imgType: "png", //下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
      },

      schoolList: [],
      classList: [],
      gradeList: [
        { id: 5, sectionId: 2, name: "小学一年级", sort: 5 },
        { id: 6, sectionId: 2, name: "小学二年级", sort: 6 },
        { id: 7, sectionId: 2, name: "小学三年级", sort: 7 },
        { id: 8, sectionId: 2, name: "小学四年级", sort: 8 },
        { id: 9, sectionId: 2, name: "小学五年级", sort: 9 },
        { id: 10, sectionId: 2, name: "小学六年级", sort: 10 },
        { id: 11, sectionId: 3, name: "初中一年级", sort: 11 },
        { id: 12, sectionId: 3, name: "初中二年级", sort: 12 },
        { id: 13, sectionId: 3, name: "初中三年级", sort: 13 },
        { id: 14, sectionId: 4, name: "高中一年级", sort: 14 },
        { id: 15, sectionId: 4, name: "高中二年级", sort: 15 },
        { id: 16, sectionId: 4, name: "高中三年级", sort: 16 },
      ],

      loading: false,

      submit: false,

      formItem: {
        schoolId: "",
        schoolName: "",
        name: "",
        gradeId: "",
        gradeName: "",
        className: "",
        classId: "",
        phone: "",
        signImg: "",
      },

      single: false,

      ruleValidate: {
        schoolId: [
          {
            required: true,
            message: "请输入学校名称",
            trigger: "change",
            type: "number",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入学生姓名",
            trigger: "blur",
          },
        ],
        gradeId: [
          {
            required: true,
            message: "请选择年级",
            trigger: "change",
            type: "number",
          },
        ],
        classId: [
          {
            required: true,
            message: "请选择班级",
            trigger: "change",
            type: "number",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入家长手机号码",
            trigger: "blur",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur",
          },
        ],
      },

      hint: "",
    };
  },
  mounted() {
    this.getClassList();
    // this.getGradeList();
    // this.schList();
    this.getSignature_panel();
  },
  methods: {
    // 定义画布大小
    getSignature_panel() {
      let height = this.$refs.Signature_panel.offsetHeight;
      let width = this.$refs.Signature_panel.offsetWidth;
      this.options.canvasWidth = width;
      this.options.canvasHeight = height;
    },
    /**
     * 清除画板
     */
    canvasClear() {
      this.$refs.SignCanvas.canvasClear();
      this.formItem.signImg = "";
    },

    /**
     * 保存图片
     */
    saveAsImg() {
      if (this.submit == true) {
        this.hint = "请完成手写签名";
        // console.log("sss");
      }

      if (
        this.$refs.SignCanvas.$attrs.value !== null &&
        this.$refs.SignCanvas.$attrs.value !== ""
      ) {
        const img = this.$refs.SignCanvas.saveAsImg();
        this.formItem.img = img;
        console.log("ddd" + img);
        // let newImg = this.base64ToFile(img, "newimg.png");
        // console.log(newImg);
        // this.avatarUpload(newImg);
        this.handleSubmit();
        this.hint = "";
      }
      //  else {
      //   this.hint = "请完成手写签名";
      // }
    },

    base64ToFile(urlData, fileName) {
      let arr = urlData.split(",");
      console.log(arr);
      let mime = arr[0].match(/:(.*?);/)[1];
      let bytes = atob(arr[1]); // 解码base64
      let n = bytes.length;
      let ia = new Uint8Array(n);
      while (n--) {
        ia[n] = bytes.charCodeAt(n);
      }
      return new File([ia], fileName, { type: mime });
    },

    /**
     * 下载图片
     */
    downloadSignImg() {
      this.$refs.SignCanvas.downloadSignImg();
    },

    schList(query = "") {
      let params = {
        pageNumber: 1,
        pageSize: 100,
        key: query,
      };
      this.loading = true;
      console.log(params);
      schList(params).then((res) => {
        this.loading = false;
        console.log(res);
        if (res.code === 200) {
          this.schoolList = res.result.content;
        } else {
          this.$Message.error(res.result);
        }
      });
    },

    changeSchool(e) {
      this.formItem.schoolId = e;
      console.log(e);
    },

    getClassList() {
      let list = [];
      for (var i = 0; i < 60; i++) {
        let obj = {};
        obj.id = i;
        obj.name = "（" + (i + 1) + "）班";
        list.push(obj);
        if (list.length == 60) {
          this.classList = list;
        }
      }
    },

    changeClass(e) {
      console.log(e);
      this.formItem.classId = e;
      let list = this.classList;
      for (var i in list) {
        if (list[i].id == e) {
          this.formItem.className = list[i].name;
        }
      }
    },

    getGradeList() {
      this.gradeList = [
        { id: 5, sectionId: 2, name: "小学一年级", sort: 5 },
        { id: 6, sectionId: 2, name: "小学二年级", sort: 6 },
        { id: 7, sectionId: 2, name: "小学三年级", sort: 7 },
        { id: 8, sectionId: 2, name: "小学四年级", sort: 8 },
        { id: 9, sectionId: 2, name: "小学五年级", sort: 9 },
        { id: 10, sectionId: 2, name: "小学六年级", sort: 10 },
        { id: 11, sectionId: 3, name: "初中一年级", sort: 11 },
        { id: 12, sectionId: 3, name: "初中二年级", sort: 12 },
        { id: 13, sectionId: 3, name: "初中三年级", sort: 13 },
        { id: 14, sectionId: 4, name: "高中一年级", sort: 14 },
        { id: 15, sectionId: 4, name: "高中二年级", sort: 15 },
        { id: 16, sectionId: 4, name: "高中三年级", sort: 16 },
      ];
    },

    changeGrade(e) {
      console.log(e);
      this.formItem.gradeId = e;
      let list = this.gradeList;
      for (var i in list) {
        if (list[i].id == e) {
          this.formItem.gradeName = list[i].name;
        }
      }
    },

    // 图片 上传
    avatarUpload(file) {
      console.log(file);
      let path = "data/collect/";
      uploadPic(file, path).then((res) => {
        console.log(res);
        if (res.name !== "") {
          let newImg = "https://file.zahooedu.com/" + res.name;
          this.formItem.signImg = newImg;
          this.handleSubmit();
        }

        console.log(this.formItem.signImg);
      });
    },

    checkOk(e) {
      console.log(e);
      this.submit = e;
    },
    kub() {
      setTimeout(function () {
        location.reload();
      }, 1000);

      this.modalStatus = false;
    },

    //跳转到公众号

    skip() {
      const u = navigator.userAgent,
        app = navigator.appVersion;
      //const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        console.log("ios");
        this.$router.push({ name: "h5-code" });
      } else {
        console.log("andriod");
        location.href =
          "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIxNzI1ODEyMg==#wechat_redirect";
      }
    },

    appSource() {
      const u = navigator.userAgent,
        app = navigator.appVersion;
      //const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        console.log("ios");
      } else {
        console.log("andriod");
      }
    },

    // 提交
    handleSubmit() {
      console.log("sss");
      if (this.submit == true) {
        this.$refs["formItem"].validate((valid) => {
          if (valid) {
            let obj = JSON.parse(JSON.stringify(this.formItem));
            obj.name = this.formItem.name;
            obj.schoolId = this.formItem.schoolId;
            obj.className = this.formItem.gradeName + this.formItem.className;
            obj.phone = this.formItem.phone;
            obj.signImg = this.formItem.img;
            console.log(obj);
            if (
              obj.signImg !== "" &&
              obj.signImg !== undefined &&
              obj.signImg !== null
            ) {
              console.log(obj);
              collectAdd(obj).then((res) => {
                console.log(res);
                if (res.code == 200) {
                  // this.$Message.success({
                  //   top: 300,
                  //   closable: true,
                  //   duration: 3,
                  //   content: "提交成功!",
                  // });
                  // setTimeout(function () {
                  //   location.reload();
                  // }, 1000);

                  this.appSource();
                  this.modalStatus = true;
                  document.body.style.cssText = `overflow: hidden;`;
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
              this.$Message.error({
                top: 300,
                closable: true,
                duration: 3,
                content: "请确认签名!",
              });
            }
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// 页面样式

.footer_btn {
  .ivu-btn {
    height: 45px;
    width: 40%;
    margin-right: 6.66666%;
    border-radius: 25px;
    margin-bottom: 30px;
  }
}

.ivu-table-row .ivu-btn {
  width: 72px;
}

.guan {
  background: #006bff;
  color: white;
}

.qu {
  background: #dddddd;
  color: white;
}

.v-transfer-dom /deep/ .ivu-modal-footer {
  border: 0px;
}

.modal_title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
}

.model_img {
  width: 70px;
  height: 70px;
}

.model_img img {
  float: left;
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

.model_titlex {
  font-size: 24px;
  font-weight: 500;
  height: 30px;
  margin-top: 10px;
  color: #006bff;
}

.model_titlex2 {
  font-size: 16px;
  font-weight: 500;
  height: 30px;
  color: #006bff;
}

#agreement {
  position: relative;
  float: left;
  margin-left: 50%;
  max-width: 750px;
  width: 100%;
  transform: translateX(-50%);
  background: url("../../assets/agreement/agreement_bg.jpg") top no-repeat;
  background-size: cover;
  padding: 70px 0;
  z-index: 770;
  overflow-x: hidden;

  .title {
    width: 100%;
    position: relative;
    float: left;
    line-height: 34px;
    color: #ffffff;
    font-size: 23px;
    text-align: center;
    padding: 0;
  }

  .subtitle {
    width: 100%;
    position: relative;
    float: left;
    line-height: 24px;
    color: #ffffff;
    font-size: 17px;
    text-align: center;
    padding: 0;
  }

  .text_content {
    position: relative;
    float: left;
    width: 100%;
    padding: 60px 50px 15px 50px;
    background: url("../../assets/agreement/letter_top.png") top no-repeat,
      url("../../assets/agreement/letter_bottom.png") bottom no-repeat;
    background-size: contain;

    h2 {
      position: relative;
      float: left;
      width: 100%;
      line-height: 64px;
      color: #2a50df;
      font-weight: 600;
      text-align: left;
      font-size: 18px;
    }

    p {
      font-size: 15px;
      text-indent: 30px;
      font-weight: 550;
      line-height: 29px;
      width: 100%;
      position: relative;
      float: left;
      word-wrap: break-word;
      word-break: normal;
      color: #151515;

      span {
        color: #2a50df;
      }
    }

    .line {
      margin-top: 34px;
      width: 100%;
      height: 2px;
      border-top: #2a50df 1px dashed;
      position: relative;
      float: left;
      margin-bottom: 24px;
    }

    .operation {
      position: relative;
      float: left;
      width: 100%;

      .from_demo {
        position: relative;
        width: 100%;
        float: left;
        border-top: 1px solid #f8f8f8;

        h5 {
          line-height: 53px;
          text-align: center;
          width: 100%;
          position: relative;
          font-size: 15px;
          font-weight: 550;
          color: #0f0f0f;
        }

        .signature_panel {
          height: 202px;
          width: 100%;
          position: relative;
          float: left;
          border-radius: 5px;
          border: 4px solid #2a50df;
          overflow: hidden;

          .sign-canvas {
            display: block;
            width: 100%;
            height: 202px !important;
            position: relative;
            float: left;
          }

          #clear {
            position: absolute;
            width: 55px;
            height: 19px;
            left: 5px;
            bottom: 10px;
            color: #2a50df;
            font-size: 14px;
            font-weight: 550;
            text-align: center;
          }

          #save {
            position: absolute;
            width: 55px;
            height: 19px;
            right: 5px;
            bottom: 10px;
            font-size: 14px;
            font-weight: 550;
            color: #2a50df;
            text-align: center;
          }
        }
      }
    }
  }

  .text_content::after {
    height: 95%;
    top: 3%;
    width: 100%;
    position: absolute;
    background: url("../../assets/agreement/letter_body.png");
    background-size: contain;
    content: "";
    left: 0;
    right: 0;
    z-index: -1;
  }

  .erweima {
    position: relative;
    float: left;
    width: 100%;
    margin-top: 35px;

    .demo {
      position: relative;
      float: left;
      width: 50%;

      .img {
        position: relative;
        float: left;
        margin-left: 50%;
        transform: translateX(-50%);
        width: 108px;
        height: 108px;
        background: #ffffff;
        box-sizing: border-box;
        box-shadow: 0 0 8px rgba($color: #000000, $alpha: 0.13);

        img {
          width: 108px;
          height: 108px;
          object-fit: contain;
        }
      }

      .text {
        position: relative;
        float: left;
        width: 100%;
        margin-top: 5px;

        p {
          font-size: 13px;
          line-height: 17px;
          display: inline-block;
          text-align: center;
          position: relative;
          float: left;
          width: 100%;
          color: #5874e2;
          text-indent: 0;
        }
      }
    }
  }

  @media (max-width: 450px) {
    .text_content {
      padding: 60px 35px 15px 35px;
    }
  }

  .ivu-form /deep/ .ivu-form-item {
    height: 63px;
    border-top: 1px solid #f8f8f8;
    width: 100%;
    position: relative;
    float: left;
    margin-bottom: 0;
  }

  .ivu-form /deep/ .ivu-form-item:nth-child(1) {
    border: none !important;
  }

  .ivu-form /deep/ label {
    text-align: left !important;
    font-size: 15px;
    font-weight: 550;
    height: 63px;
    line-height: 63px;
    padding: 0 !important;
    white-space: nowrap;
  }

  .ivu-form /deep/ .ivu-form-item-content {
    margin-top: 16px;
  }

  .ivu-form /deep/ .ivu-input {
    border: none !important;
    text-align: right !important;
    font-size: 14px;
    color: #151515;
  }

  .ivu-form /deep/ .ivu-select-input {
    text-align: right;
  }

  .ivu-form /deep/ .ivu-form-item-error-tip {
    padding-top: 0 !important;
  }

  .ivu-form /deep/ .ivu-form-item-error {
    border: none !important;
  }

  .ivu-form /deep/ .ivu-select-selection {
    border: none !important;
    text-align: right !important;
  }

  /deep/ .ivu-input::-webkit-input-placeholder {
    color: #a0a0a0;
  }
  /deep/ .ivu-input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #a0a0a0;
  }
  /deep/ .ivu-input::-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #a0a0a0;
  }
  /deep/ .ivu-input::-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #a0a0a0;
  }

  .ivu-form /deep/ .ivu-select-placeholder {
    color: #a0a0a0;
  }

  .ivu-form /deep/ .ivu-select-input::-webkit-input-placeholder {
    color: #a0a0a0;
  }

  .ivu-form /deep/ .ivu-select-input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #a0a0a0;
  }
  .ivu-form /deep/ .ivu-select-input::-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #a0a0a0;
  }

  .ivu-form /deep/ .ivu-select-input::-ms-input-placeholder {
    color: #a0a0a0;
  }

  .ivu-form /deep/ .ivu-checkbox-wrapper {
    color: #3353cc;
  }

  .ivu-form /deep/ .check .ivu-form-item-content {
    margin: 0 !important;
  }

  .ivu-form /deep/ .check .ivu-checkbox-wrapper {
    margin-left: 50%;
    transform: translateX(-50%);
    margin-right: 0 !important;
    white-space: nowrap;
  }

  .ivu-form /deep/ .ivu-checkbox-inner {
    border-radius: 50% !important;
    border: 2px solid #3353cc !important;
    width: 18px !important;
    height: 18px !important;
  }

  .ivu-form {
    position: relative;
    float: left;
    width: 100%;
  }

  .footer_btn {
    width: 100%;
    position: relative;
    float: left;
  }

  .footer_btn /deep/ .ivu-btn {
    width: 100%;
    height: 40px;
    position: relative;
    float: left;
    border-radius: 35px;
    background: #3353cc;
    text-align: center;
    line-height: 40px;
    padding: 0 !important;
    font-size: 16px;
    font-weight: 550;
    color: #ffffff;
    margin-bottom: 10px;
  }

  .footer_btn /deep/ .ivu-btn.no {
    background: #a0a0a0 !important;
    border-color: #a0a0a0 !important;
  }
}

.ivu-select-dropdown-transfer /deep/ .ivu-select-item {
  padding: 7px 16px !important;
}

.copyright {
  position: absolute;
  bottom: 0;
  left: 0;
}

.hint_h5 {
  color: #ed4014;
  font-size: 14px;
  text-align: center;
  width: 100%;
  font-weight: 500;
  bottom: -24px;
  position: absolute;
}

@media (max-width: 400px) {
  .v-transfer-dom /deep/ .ivu-modal {
    top: 30% !important;
    margin: 7.5%;
    width: 85% !important;
  }
}

@media (max-width: 576px) {
  .v-transfer-dom /deep/ .ivu-modal {
    top: 25% !important;
    margin: 7.5%;
    width: 85% !important;
  }
}

@media all and (min-height: 960px) and (max-height: 1080px) {
  .v-transfer-dom /deep/ .ivu-modal {
    top: 25% !important;
    margin: 10%;
    width: 80% !important;
  }
}

// .v-transfer-dom /deep/ .ivu-modal {
//     top: 30% !important;
//     margin: 10%;
//     width: 80% !important;
// }

.v-transfer-dom /deep/ .ivu-modal-content {
  border-radius: 25px;
}
</style>