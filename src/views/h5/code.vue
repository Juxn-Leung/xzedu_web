<template>
  <div id="agreement">
    <div class="ti">
      <div class="line">
        <img src="../../assets/code.png" />
      </div>
    </div>

    <div class="ti">
      <div class="linea">长按图片,识别二维码</div>
    </div>

    <div class="footer"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
#app > div:not(.copyright) {
  min-height: auto;
}
// 页面样式
#agreement {
  width: 100%;
}
.ti {
  display: flex;
  justify-content: center;
  align-items: center;
}
.line {
  margin-top: 20%;
  box-shadow: 0 0 9px 3px #999;
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}
.linea {
  text-align: center;
  width: 200px;
}
.line img {
  float: left;
  width: 100%;
  height: 100%;
}
.footer {
  height: 200px;

  width: 100%;

  background-color: white;

  position: fixed;
  z-index: 1000;
  bottom: 0;
}
</style>