<template>
  <div id="reminder">
      <img class="icon" src="../../assets/reminder/exclamation.png">
      <p class="hint">您的微信客户端版本过低，不支持小程序。</p>
      <p class="hint">请升级您的微信客户端！</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  mounted() {

  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
// 页面样式
#reminder {
  position: relative;
  float: left;
  margin-left: 50%;
  max-width: 750px;
  width: 100%;
  transform: translateX(-50%);
  background: #f7f8fa;
  background-size: cover;
  z-index: 770;

  .icon{
      width: 62px;
      height: 62px;
      position: relative;
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 178px;
      margin-bottom: 28px;
  }

  .hint{
      width: 100%;
      position: relative;
      float: left;
      height: 26px;
      line-height: 26px;
      font-size: 17px;
      color: #7f7f80;
      text-align: center;
      display: block;

  }
}
</style>