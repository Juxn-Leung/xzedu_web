<template>
  <div id="agreement">
    <div class="bg"></div>

    <div
      class="content"
      v-if="fraction==null"
    >
      <template>
        <swiper
          ref="mySwiper"
          :options="swiperOptions"
          autoplay
          :loop="false"
          :initialSlide="answerList.length-1"
          v-if="answerList.length"
        >
          <template v-for="(item,index) in answerList">
            <swiper-slide>
              <div class="demo">
                <div class="demo-index">
                  <p>{{`${item.no }`}}<span>/{{`${questionCnt}`}}</span></p>
                </div>
                <div
                  class="demo-btn"
                  v-if="item.choose==null||item.choose.length==0?false:true"
                >
                  <p
                    v-if="item.verify==2"
                    @click="nextQuestion"
                  >下一题</p>
                  <p
                    v-if="item.verify==null"
                    @click="check(item.id,item.choose,index)"
                  >确定</p>
                </div>
                <div class="demo-title">
                  <p
                    class="title"
                    v-if="item.type==1"
                  >单选题<span>(答对加{{item.fraction}}分)</span></p>
                  <p
                    class="title"
                    v-if="item.type==2"
                  >多选题<span>(答对加{{item.fraction}}分)</span></p>
                </div>
                <div class="demo-carousel">
                  <p>{{item.content}}</p>
                </div>
                <div
                  v-if="item.type==1"
                  class="demo-radio"
                  :class="`${item.verify==null?'':item.verify==2?'error':''}`"
                >
                  <RadioGroup
                    v-model="item.choose"
                    @on-change="(event)=> shangeRadio(event, index) "
                  >
                    <template v-for="item2 in item.options">
                      <Radio
                        :label="item2.flag"
                        :class="`${item.verify==null?'':item.answer==item2.flag?'correct':''}`"
                      >
                        <span
                          v-if="item.verify==null"
                          class="radioText"
                        >{{`${item2.flag}. ${item2.content}`}}</span>

                        <span
                          v-if="item.verify==1"
                          :class="item.choose==item2.flag?'success':''"
                          class="radioText"
                        >{{`${item2.flag}. ${item2.content}`}}</span>

                        <span
                          v-if="item.verify==2"
                          :class="item.choose==item2.flag?'error':item.answer==item2.flag?'success':''"
                          class="radioText"
                        >{{`${item2.flag}. ${item2.content}`}}</span>

                      </Radio>
                    </template>
                  </RadioGroup>

                  <div
                    class="shade"
                    v-if="item.verify!==null"
                  ></div>
                </div>

                <div
                  class="demo-checkbox"
                  :class="`${item.verify==null?'':item.verify==1?'success':'error'}`"
                  v-if="item.type==2"
                >
                  <div class="ivu-checkbox-group ivu-checkbox-default">
                    <template v-for="item2 in item.options">
                      <label
                        :class="`${indexOfActive(item2.flag,item.choose)=='success'?'ivu-checkbox-wrapper-checked':''}`"
                        class="ivu-checkbox-wrapper ivu-checkbox-group-item ivu-checkbox-default"
                        @click="shangeCheckbox(item2.flag, index) "
                      >
                        <span
                          v-if="item.verify==null"
                          class="checkboxText"
                        >{{`${item2.flag}. ${item2.content}`}}</span>

                        <span
                          v-else
                          :class="indexOf(item2.flag,item.verify,item.choose)"
                          class="checkboxText"
                        >{{`${item2.flag}. ${item2.content}`}}</span>
                      </label>
                    </template>
                  </div>

                  <div
                    class="shade"
                    v-if="item.verify!==null"
                  ></div>
                </div>

                <div class="demo-hint" v-if="item.verify!==2">
                  <img src="../../../assets/answer/hint.png">
                  <p @click="showTip(item.tip)">查看提示</p>
                </div>

              </div>

              <div
                class="demo"
                style="margin:10px 0;"
                v-if="item.verify==2"
              >
                <div class="demo-title">
                  <p class="title">答案解析</p>
                </div>
                <div class="demo-analysis">
                  <h5>正确答案: <span>{{item.answer}}</span></h5>
                  <p>{{item.tip}}</p>
                </div>
              </div>
            </swiper-slide>
          </template>
        </swiper>
      </template>

      <div
        class="tipPanel"
        v-show="show_tip==true"
      >
        <div
          class="panel"
          :class="`${show_tip==true?'show':''}`"
        >
          <div class="title">
            <p>提示</p>
            <Icon
              @click="closeTip"
              type="md-close"
            />
          </div>

          <div class="text">
            <p>{{tip}}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="content content2"
    >
      <div class="cont">
        <p>{{fraction}}<span>分</span></p>
        <h2>您已超过机构{{morePercent}}的人，再接再厉哦~</h2>
        <img src="../../../assets/answer/ewm.jpg">

        <h5>关注教培云公众号，获取更多教育资讯</h5>
      </div>

      <button @click="again">再答一次</button>
    </div>
  </div>
</template>
<script>
import { questionDetail, aDone, aResult } from "@/api";

import "swiper/swiper-bundle.min.css"; //导入样式
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

// SwiperCore.use([Navigation, Autoplay]); 注册模块

export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        // Some Swiper option/callback...
      },
      formItem: {
        paperId: null,
        no: 1,
      },
      answerList: [],
      show_tip: false,
      tip: "",

      fraction: null,
      morePercent: null,
    };
  },

  created() {
    this.getHeight();
    this.formItem.paperId = this.$route.query.paperId;
    this.questionCnt = this.$route.query.questionCnt;
  },

  mounted() {
    this.questionDetail();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    getHeight() {
      var h =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.top = h / 2;
    },

    upDate() {
      let no = this.formItem.no;
      let paperId = this.formItem.paperId;
      let questionCnt = this.questionCnt;
      setTimeout(() => {
        this.$forceUpdate();
        this.formItem.paperId = paperId;
        this.formItem.no = no;
        this.questionCnt = questionCnt;
      }, 100);
    },

    questionDetail() {
      let obj = this.formItem;
      if (obj.no > this.questionCnt) {
        let paperId = this.formItem.paperId;
        aResult({ paperId }).then((res) => {
          if (res.code == 200) {
            this.fraction = res.result.fraction;
            this.morePercent = res.result.morePercent;
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
        questionDetail(obj).then((res) => {
          if (res.code == 200) {
            this.answerList.push(res.result);
            this.upDate();
            let length = this.answerList.length;
            if (res.result.type == 1) {
              this.answerList[length - 1].choose = null; // 选择的选项。
            } else {
              this.answerList[length - 1].choose = []; // 选择的选项。
            }
            this.answerList[length - 1].verify = null; // null->还没验证，1->正确，2->错误;
            if (length > 1) {
              setTimeout(() => {
                this.swiper.slideTo(length - 1, 500, true);
              }, 100);
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
      }
    },

    check(questionId, answer, index) {
      let obj = {};
      obj.paperId = this.formItem.paperId;
      obj.questionId = questionId;
      if (this.answerList[index].type == 1) {
        obj.answer = answer;
      } else {
        obj.answer = answer.toString();
      }
      aDone(obj).then((res) => {
        if (res.code == 200) {
          if (res.result.isCorrect == 1) {
            this.answerList[index].verify = 1;
            this.$Message.success({
              top: 300,
              closable: true,
              duration: 3,
              content: "回答正确!",
            });
            this.nextQuestion();
          } else {
            this.answerList[index].verify = 2;
            this.$Message.error({
              top: 300,
              closable: true,
              duration: 3,
              content: "回答错误!",
            });
          }
          this.upDate();
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

    nextQuestion() {
      this.formItem.no++;
      this.questionDetail();
    },

    indexOfActive(flag, choose) {
      for (var j in choose) {
        if (flag == choose[j]) {
          return "success";
        }
      }
    },

    indexOf(flag, verify, choose) {
      if (verify == 1) {
        for (var i in choose) {
          if (flag == choose[i]) {
            return "success";
          }
        }
      } else if (verify == 2) {
        for (var j in choose) {
          if (flag == choose[j]) {
            return "error";
          }
        }
      }
    },

    shangeRadio(event, index) {
      this.upDate();
    },

    shangeCheckbox(event, index) {
      let list = this.answerList[index].choose;
      let length = list.length;
      let flag = true;
      if (length !== 0) {
        for (var i in list) {
          if (list[i] == event) {
            this.answerList[index].choose.splice(i, 1);
            flag = false;
          }

          if (Number(i) == length - 1) {
            if (flag == true) {
              this.answerList[index].choose.push(event);
            }
          }
        }
      } else {
        this.answerList[index].choose.push(event);
      }
      this.upDate();
    },

    showTip(tip) {
      this.tip = tip;
      this.show_tip = true;
    },

    closeTip() {
      this.tip = "";
      this.show_tip = false;
    },

    again() {
      this.$router.push({
        name: "h5-select",
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
  background: #f7f8fa;

  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: url("../../../assets/answer/bg.png") no-repeat top center;
    background-size: contain;
  }

  .content {
    box-sizing: border-box;
    position: relative;
    float: left;
    width: 100%;
    height: 100%;
    z-index: 7;

    /deep/ .swiper-container {
      .swiper-wrapper {
        padding: 90px 0 0 0;

        .swiper-slide {
          padding: 0 12px;

          .demo {
            width: 100% !important;
            padding: 24px 10px;
            background: #fff;
            border-radius: 12px;
            position: relative;
            float: left;

            .demo-index {
              position: absolute;
              top: 12px;
              height: 32px;
              width: 82px;
              right: 0;
              z-index: 7;
              p {
                font-size: 23px;
                color: #000000;
                text-align: right;
                padding-right: 16px;

                span {
                  color: #8a8a8a;
                }
              }
            }

            .demo-btn {
              position: absolute;
              top: -6px;
              transform: translateY(-32px);
              height: 32px;
              width: 82px;
              right: 0;
              z-index: 7;

              p {
                border-radius: 6px;
                position: relative;
                float: left;
                width: 100%;
                height: 32px;
                line-height: 32px;
                font-size: 16px;
                text-align: center;
                color: #fff;
                border-radius: 6px;
                background: #ffd076;
              }
            }

            .demo-title {
              position: relative;
              float: left;
              width: 100%;
              padding: 0 6px 18px 6px;
              border-bottom: 1px solid #ededed;

              .title {
                height: 20px;
                line-height: 20px;
                font-size: 18px;
                display: inline-block;
                position: relative;
                font-weight: 550;
                color: #101010;

                span {
                  font-size: 14px;
                  display: inline-block;
                }
              }
            }

            .demo-carousel {
              padding: 10px;
              position: relative;
              float: left;
              width: 100%;

              p {
                position: relative;
                float: left;
                width: 100%;
                line-height: 28px;
                font-size: 16px;
                color: #141414;
              }
            }

            .demo-radio {
              padding: 11px 16px;
              position: relative;
              float: left;
              width: 100%;

              .ivu-radio-group {
                width: 100%;

                .ivu-radio-wrapper {
                  width: 100%;
                  position: relative;
                  height: 50px;
                  line-height: 50px;
                  margin-right: 0;
                  border: 1px solid #ececec;
                  border-radius: 8px;
                  background: #fafafa;
                  font-size: 15px;
                  font-weight: 550;
                  color: #282828;
                  padding: 0 16px;
                  margin-bottom: 14px;

                  .ivu-radio-inner {
                    display: none;
                  }
                }

                .ivu-radio-wrapper-checked {
                  background: #e4f6ff;
                  border: 1px solid #c1eaff;
                  color: #32b0ef;
                }
              }

              .radioText {
                position: absolute;
                width: 100%;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                word-break: normal;
                display: block;
                white-space: pre-wrap;
                word-wrap: break-word;
                // overflow: hidden;
                line-height: 18px;
                padding-right: 30px;
              }

              .radioText.success::after {
                content: "";
                background: url("../../../assets/answer/correct.png");
                background-size: contain;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                position: absolute;
                left: -2px;
                top: 0;
              }

              .radioText.error::after {
                content: "";
                background: url("../../../assets/answer/error.png");
                background-size: contain;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                position: absolute;
                left: -2px;
                top: 0;
              }

              .shade {
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 7777;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
              }
            }

            .demo-radio {
              .correct {
                background: #eff2ff !important;
                border: 1px solid #cdd6ff !important;
                color: #637be9 !important;
              }
            }

            .demo-radio.error {
              .ivu-radio-wrapper-checked {
                background: #ffe7e7 !important;
                border: 1px solid #ff9ead !important;
                color: #ff4b67 !important;
              }
            }

            .demo-checkbox {
              padding: 11px 16px;
              position: relative;
              float: left;
              width: 100%;

              .ivu-checkbox-group {
                width: 100%;

                .ivu-checkbox-wrapper {
                  width: 100%;
                  position: relative;
                  height: 50px;
                  line-height: 50px;
                  margin-right: 0;
                  border: 1px solid #ececec;
                  border-radius: 8px;
                  background: #fafafa;
                  font-size: 15px;
                  font-weight: 550;
                  color: #282828;
                  padding: 0 16px;
                  margin-bottom: 14px;

                  .ivu-checkbox-inner {
                    display: none;
                  }
                }

                .ivu-checkbox-wrapper-checked {
                  background: #e4f6ff;
                  border: 1px solid #c1eaff;
                  color: #32b0ef;
                }
              }

              .checkboxText {
                position: absolute;
                width: 100%;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                word-break: normal;
                display: block;
                white-space: pre-wrap;
                word-wrap: break-word;
                // overflow: hidden;
                line-height: 18px;
                padding-right: 30px;
              }

              .checkboxText.success::after {
                content: "";
                background: url("../../../assets/answer/correct.png");
                background-size: contain;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                position: absolute;
                left: -2px;
                top: 0;
              }

              .checkboxText.error::after {
                content: "";
                background: url("../../../assets/answer/error.png");
                background-size: contain;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                position: absolute;
                left: -2px;
                top: 0;
              }

              .shade {
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 7777;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
              }
            }

            .demo-checkbox.success {
              .ivu-checkbox-wrapper-checked {
                background: #eff2ff !important;
                border: 1px solid #cdd6ff !important;
                color: #637be9 !important;
              }
            }

            .demo-checkbox.error {
              .ivu-checkbox-wrapper-checked {
                background: #ffe7e7 !important;
                border: 1px solid #ff9ead !important;
                color: #ff4b67 !important;
              }
            }

            .demo-hint {
              position: relative;
              float: left;
              width: 70px;
              margin-left: 50%;
              transform: translateX(-50%);

              img {
                height: 15px;
                width: 15px;
                position: relative;
                float: left;
              }

              p {
                font-size: 13px;
                line-height: 15px;
                display: inline-block;
                position: relative;
                float: right;
              }
            }

            .demo-analysis {
              padding: 14px 10px;

              h5 {
                line-height: 32px;
                line-height: 32px;
                position: relative;
                margin: 0;
                float: left;
                width: 100%;
                font-size: 16px;
                font-weight: 550;
                color: #141414;

                span {
                  color: #798eeb;
                }
              }

              p {
                line-height: 28px;
                line-height: 28px;
                position: relative;
                margin: 0;
                float: left;
                width: 100%;
                font-size: 15px;
                font-weight: 550;
                color: #4d4d4d;
              }
            }
          }
        }
      }
    }
  }

  .content2 {
    padding: 130px 12px;

    .cont {
      position: relative;
      width: 100%;
      height: 306px;
      border-radius: 16px;
      background: #fff;

      p {
        margin-top: 40px;
        font-size: 30px;
        font-weight: 550;
        text-align: center;
        position: relative;
        width: 100%;
        float: left;
        color: #5684f4;

        span {
          font-size: 14px;
        }
      }

      h2 {
        line-height: 40px;
        text-align: center;
        position: relative;
        width: 100%;
        float: left;
        font-size: 12px;
        color: #545454;
      }

      img{
        width: 104px;
        height: 104px;
        position: relative;
        float: left;
        margin-left: 50%;
        transform: translate(-50%);
        border: 1px solid #e0ebff;
        border-radius: 3px;
        margin-top: 24px;
      }

      h5 {
        line-height: 40px;
        text-align: center;
        position: relative;
        width: 100%;
        float: left;
        font-size: 10px;
        color: #c2c2c2;
      }
    }

    button {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      margin-top: 16px;
      color: #fff;
      font-weight: 550;
      background: #9db0ec;
      position: relative;
      float: left;
      border-radius: 6px;
      text-align: center;
      border: none;
    }
  }

  .tipPanel {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 777;
    background: rgba($color: #000000, $alpha: 0.25);
    overflow: hidden;

    .panel {
      height: 54px;
      position: absolute;
      width: 100%;
      left: 0;
      right: 0;
      bottom: -300px;
      border-radius: 4px 4px 0 0;
      background: #fff;
      min-height: 300px;
      padding: 0 16px;
      transition: all 0.5s;

      .title {
        position: relative;
        width: 100%;
        float: left;
        border-bottom: 1px solid #f8f8f8;

        p {
          position: relative;
          width: 100%;
          float: left;
          font-size: 16px;
          text-align: center;
          height: 54px;
          line-height: 54px;
          font-weight: 550;
          color: #1e1e1e;
        }

        .ivu-icon {
          right: 0;
          position: absolute;
          top: 12px;
          font-size: 26px;
          color: #b1b1b1;
        }
      }
    }

    .panel.show {
      bottom: 0;
    }

    .text {
      position: relative;
      float: left;
      width: 100%;
      padding: 20px 8px;
      overflow-y: auto;
      height: 245px;

      p {
        line-height: 28px;
        font-size: 16px;
        position: relative;
        float: left;
        width: 100%;
        color: #1e1e1e;
      }
    }

    .text::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>