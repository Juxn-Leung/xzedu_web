<template>
  <div id="steps">
    <Steps
      :current="current"
      :style="`width:${ width }px;`"
    >
    <template v-for="item in list">
      <Step :title="item"></Step>
    </template>
    </Steps>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
    },
    current: {
      type: Number,
    },
    width: {
      type: Number,
    },
  },
  data() {
    return {};
  },

  methods: {},

  mounted() {},
};
</script>
<style lang="scss" scoped>
#steps {
  position: relative;
  float: left;
  width: 100%;

  /deep/ .ivu-steps {
    position: relative;
    margin-left: 50%;
    margin-top: 25px;
    transform: translateX(-50%);

    .ivu-steps-tail>i{
      background: #E5EEFF;
      height: 4px;
      margin-top: 6px;
      padding-right: 0;
    }

    .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail>i:after{
      background: #0056FB;
    }

    .ivu-steps-title {
      display: block;
      margin-top: 12px;
      transform: translateX(-50%);
      width: 200px;
      padding-right: 0;
      text-align: center;
      margin-left: 20px;
      color: #E5EEFF;
      font-size: 16px;
    }

    .ivu-steps-item {
      display: inline-block;
      position: relative;
      vertical-align: top;
      overflow: inherit;
    }

    .ivu-steps-item:last-child {
      width: 58px;
    }

    .ivu-steps-status-finish {
      .ivu-steps-title {
        color: #0056FB;
      }

      .ivu-steps-head-inner{
        background: #0056fb;

        span{
          color: #0056FB;
          font-size: 16px;
        }

        .ivu-icon-ios-checkmark:before{
              font-size: 34px;
        }
      }
    }

    .ivu-steps-head{
      // padding: 0;
    }

    .ivu-steps-head-inner {
      width: 40px;
      height: 40px;
      background: #E5EEFF;
      position: relative;
      padding: 0 ;
      border: none;

      span {
        width: 32px;
        height: 32px;
        background: #fff;
        display: block;
        border-radius: 50%;
        position: absolute;
        left: 4px;
        top: 4px;
        color: #E5EEFF;
        font-size: 16px;
        line-height: 32px;
        font-weight: 800;
      }
    }
  }
}
</style>