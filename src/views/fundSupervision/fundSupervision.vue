<template>
  <div class="trainlist">
    <Row>
      <div
        class="header"
        ref="header"
      >
        <div
          class="title"
        >
          <span>请选择资金监管平台</span>
        </div>
      </div>
    </Row>

    <div class="content">
      <template v-for="item in bankList">
        <div class="bankDemo" @click="goBank(item)">
          <img class="bg" :src="item.bgUrl">
          <img class="icon" :src="item.icon">
          <p>{{item.name}}</p>
        </div>
      </template>  
    </div>

  </div>
</template>

<script>
import { Debounce, Throttle } from "../../libs/util";

import {} from "@/api";
export default {
  components: {},
  data() {
    return {
      bankList:[
        {
          bgUrl: require('../../assets/bank/js_bg.png'),
          icon:require('../../assets/bank/js_icon.png'),
          name:'建设银行',
          id:0
        },{
          bgUrl:require('../../assets/bank/gs_bg.png'),
          icon:require('../../assets/bank/gs_icon.png'),
          name:'工商银行',
          id:1
        },{
          bgUrl:require('../../assets/bank/zx_bg.png'),
          icon:require('../../assets/bank/zx_icon.png'),
          name:'中信银行',
          id:2
        },{
          bgUrl:require('../../assets/bank/null_bg.png'),
          icon:require('../../assets/bank/null_icon.png'),
          name:'其他银行',
          id:3
        },
      ]
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    goBank(item) {
      let obj = {
        title: item.name,
        id:item.id
      };
      this.$router.push({
        name: "bank",
        query: obj,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.trainlist {
  padding: 0 36px 0 42px;
  position: relative;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 19px 6px;
    .title {
      color: #373737;
      font-weight: 600;
      font-size: 32px;
      font-weight: bold;
      line-height: 100px;
      position: relative;
      width: 100%;
      text-align: center;
    }
  }

  .content {
    position: relative;
    width: 100%;
    min-width: 1200px;
    overflow-x: auto;
    background: #f0f2f7;
    border-radius: 30px;
    padding: 0 0 0 30px;
    float: left;
    box-sizing: border-box;

    .bankDemo{
      position: relative;
      float: left;
      width: 300px;
      height: 200px;
      margin-right: 30px;
      padding: 30px;
      border-radius: 20px;
      background: #fff;
      margin-top: 30px;
      margin-bottom: 30px;
      overflow: hidden;

      .bg{
        position: absolute;
        left: -15px;
        top: -15px;
        height: 90px;
        width: 90px;
        object-fit: contain;
        display: block;
      }

      .icon{
        position: absolute;
        z-index: 7;
        top: 40%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 55px;
        height: 55px;
        display: block;
      }

      p{
        width: 100%;
        position: absolute;
        left: 0;
        z-index: 12;
        bottom: 30px;
        text-align: center;
        font-size: 23px;
        height: 60px;
        line-height: 60px;
        color: #373737;
      }
    }
  }
}
</style>
