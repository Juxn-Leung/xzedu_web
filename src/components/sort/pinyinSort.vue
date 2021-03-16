<template>
  <div class="sortContent">
    <div id="content">
      <template v-for="item in list">
        <div class="sortTitle" :id="`letter${item.letter}`">
          <slot name="sortTitle" :letter="item.letter">
            <p class="s-p">{{item.letter}}</p>
          </slot>
        </div>
        <div class="sortCont">
          <template v-for="i in item.studentList">
            <slot name="sortCont" :data="i">
              <p
                class="s-p"
                style="background:#fff;"
              >{{i.studentName}}</p>
            </slot>
          </template>
        </div>
      </template>
    </div>

    <div class="letterList" :style="`top:${top};`">
      <template v-for="item in letters">
        <p 
          class="letter" 
          :class="letter==item?'active':''"
          @click="jumper(item)"
        >{{item}}</p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props:{
    list: {
      type: Array,
    },
    top:{
      type: String
    }
  },
  data() {
    return {
      fullHeight: "",
      letter: "",
      letters: [],
      
    };
  },
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        this.getLetters();
      },
      deep: true,
    },
  },
  computed: {},
  filters: {},
  mounted() {
    this.getLetters();
  },
  methods: {
    getLetters(){
      let list = [];
      for(var i in this.list){
        list.push(this.list[i].letter);
        if(Number(i)==this.list.length-1){
          this.letters = list;
        }
      }
    },

    //字母索引锚点定位
    jumper(key) {
      this.letter = key;
      let dom = this.$el.querySelector(`#letter${key}`);
      if(dom) {
        setTimeout(()=>{
          //页面没有渲染完成时是无法滚动的，因此设置延迟
            dom.scrollIntoView({
              behavior: "smooth",  // 平滑过渡
              block:    "start"  // 上边框与视窗顶部平齐。默认值
            }); 
            //js的内置方法，可滚动视图位置至元素位置
        },200);
      }
    },
  },
  
};
</script>

<style lang="scss" scoped>
.sortContent {
  position: relative;
  float: left;
  width: 100%;

  #content{
    position: relative;
    float: left;
    width: 100%;

    .sortTitle{
      position: relative;
      float: left;
      width: 100%;

      .s-p{
        height: 40px;
        padding: 0 20px;
        line-height: 40px;
        font-size: 16px;
        color: #A3A3A3;
        border-bottom: 1px solid #eee;
        margin: 0;
        text-align: left;
      }
    }

    .sortCont{
      position: relative;
      float: left;
      width: 100%;

      .s-p{
        height: 40px;
        padding: 0 20px;
        line-height: 40px;
        font-size: 15px;
        color: #242424;
        margin: 0;
        text-align: left;
      }
    }
  }

  .letterList {
    position: fixed;
    right: 10px;
    transform: translateY(-50%);
    width: 30px;

    .letter{
      position: relative;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin: 1px 5px;
      color: #006BFF;
      text-align: center;
      line-height: 20px;
    }

    .letter.active{
      background: #006BFF;
      color: #fff;
    }
  }
}
</style>