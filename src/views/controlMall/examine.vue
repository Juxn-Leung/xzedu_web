<template>
  <div class="trainlist">
    <Row>
      <div class="header" ref="header">
        <div class="title">
          <span>查看课程</span>
        </div>
        <div class="export-btn">
          <Button type="primary" icon="md-add" @click="goBack">返回</Button>
        </div>
      </div>
      <Divider style="margin:10px 0" />
    </Row>
  </div>
</template>

<style lang="scss" scoped>
    .trainlist {
        padding: 16px;
        .header {
            display: flex;
            justify-content: space-between;
            padding: 0 6px;
            .title {
            color: #2d8cf0;
            font-weight: bold;
            line-height: 32px;
            }
        }
    }
</style>

<script>
export default {
    data(){
        return{

        }
    },
    created() {

    },
    mounted(){

    },
    methods:{
        // 关闭并返回
        goBack(){
            let type = '';
            let route = this.$parent.$route;
            console.log(route);
            this.$Modal.confirm({
                title: "确认返回",
                content: "您尚未提交，确认要离开?",
                onOk: () => {
                this.$parent.closeTag(route);
                this.$router.go(-1);
                }
            });
        }
    }
}
</script>