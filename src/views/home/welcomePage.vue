<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-02-16 15:46:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-23 13:36:05
--> 
<template>
  <div class="welcome">
    <Row class="title">欢迎进入楼无忧后台管理系统</Row>
    <div class="img">
      <img :src="imgUrl" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: require("@/assets/welcome.png")
    };
  }
};
</script>
<style lang="scss" scoped>
.welcome {
  height: 100%;
  position: relative;
  .title {
    position: absolute;
    left: 50%;
    top: 16%;
    transform: translate(-50%, -50%);
    font-size: 30px;
  }
  .img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -40%);
    max-width: 70%;
    height: auto;
  }

  .img img{
    object-fit: cover;
    width: 100%;
  }
}
</style>