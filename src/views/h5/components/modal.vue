<template>
  <div class="container" :style="`height:${height}px;`">
    <div class="content">
      <div class="title">
        <p>{{title}}</p>
      </div>

      <div class="btn">
        <p @click="cancel">取消</p>
        <p @click="confirm">确定</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,   
      require: true,
    },
  },
  data(){
    return{
      height:''
    }
  },
  created(){
    this.getHeight();
  },

  mounted(){},

  methods:{
    getHeight() {
      var h =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.height = h; 
    },

    confirm(){
      if(this.title=="确定提交"){
        this.$emit('confirm');
      }else{
        this.$emit('cancel');
      }
    },

    cancel(){
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 7777;
  background: rgba($color: #000000, $alpha: 0.13);

  .content {
    width: 320px;
    height: 245px;
    border-radius: 20px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 26px;

    .title {
      height: 164px;
      width: 100%;
      position: relative;
      float: left;

      p {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        line-height: 25px;
        font-size: 15px;
        font-weight: 550;
        color: #121212;
        text-align: center;
      }
    }

    .btn {
      width: 100%;
      position: relative;
      float: left;

      p {
        width: 120px;
        position: relative;
        border-radius: 60px;
        text-align: center;
        line-height: 38px;
        height: 38px;
        font-size: 15px;
        color: #fff;
      }

      p:nth-child(1) {
        background: #dddddd;
        float: left;
      }

      p:nth-child(2) {
        background: #006bff;
        float: right;
      }
    }
  }
}
</style>