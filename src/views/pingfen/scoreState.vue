<template>
  <div class="register absolute" style="background:#FFF">
    <div class="white-bg">
      <div class="title-bg">
        平安江北-评分系统<Icon
          @click="goBack()"
          class="icon-back"
          name="arrow-left"
        />
      </div>
      <div class="content">
        <div class="content-title">评分状态</div>
        <div class="content-content">
          <div class="c-c-title">{{ whichDept }}重点工作</div>
          <div class="c-c-state">进行中</div>
          <div class="c-c-content">
              <div>
                  <div>评分项</div>
                  <div>2</div>
              </div>
              <div>
                  <div>评分次数</div>
                  <div>1</div>
              </div>
              <div>
                  <div>评分次数</div>
                  <div>99</div>
              </div>
          </div>
        </div>
        <div class="content-content">
          <div class="c-c-title">{{ whichDept }}基础工作</div>
          <div class="c-c-state c-c-stated">已结束</div>
          <div class="c-c-content">
              <div>
                  <div>评分项</div>
                  <div>100</div>
              </div>
              <div>
                  <div>评分次数</div>
                  <div>8613</div>
              </div>
              <div>
                  <div>评分次数</div>
                  <div>99</div>
              </div>
          </div>
        </div>
      </div>
      <div class="content-position"></div>
      <!-- <div class="goLook">生成我的得分报告</div> -->
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  name: "scoreState",
  components: { Icon },
  data: function() {
    return {
      visible: false,
      stateNum: -1,
      whichDept: "",
      quData: [
        "观音桥街道",
        "红旗河沟街道",
        "江北办事处",
        "江北政法委",
        "居民政委部",
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    if (this.$route.query.name) {
      console.log("接受数据：", this.$route.query.name);
      this.whichDept = this.$route.query.name;
    } else {
      this.$router.push("/scoreIdentity");
    }
  },
};
</script>

<style scoped>
.white-bg {
  background-color: white;
}
.title-bg {
  background-color: #206bc4;
  margin: 0 auto;
  text-align: center;
  color: white;
  font-size: 0.46rem;
  font-weight: bold;
  padding: 1.15rem;
  border-bottom-left-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
  position: relative;
}
.icon-back {
  position: absolute;
  top: 0.35rem;
  left: 0.2rem;
}
.content {
  position: absolute;
  left: 50%;
  top: 2.5rem;
  margin-left: -3rem;
  background-color: white;
  width: 6rem;
  height: 10rem;
  overflow: auto;
  padding: 0.9rem 0.3rem 1.2rem;
  box-shadow: 0.04rem 0.1rem 0.1rem rgba(0, 0, 0, 0.35);
  border-radius: 0.1rem;
}
.content-position {
  /* background-color: red; */
  width: 6rem;
  height: 10rem;
  padding: 0.9rem 0.3rem 1.2rem;
  margin: -0.38rem auto;
  /* box-shadow: 0.04rem 0.1rem 0.1rem rgba(0, 0, 0, 0.35); */
  border-radius: 0.1rem;
}
.content-title {
  margin: 0px auto;
  text-align: center;
  font-size: 0.34rem;
  color: #206bc4;
}
.content-title:after {
  content: "";
  width: 1.75rem;
  height: 0.25rem;
  border-bottom: 0.04rem solid #206bc4;
  display: inline-block;
  position: absolute;
  right: 0.3rem;
  /* top: 10px; */
  /* right: 29px; */
}
.content-title:before {
  content: "";
  width: 1.75rem;
  height: 0.25rem;
  border-bottom: 0.04rem solid #206bc4;
  display: inline-block;
  position: absolute;
  left: 0.3rem;
  /* top: 11px; */
  /* left: 29px; */
}
.content-content {
  margin-top: 0.3rem;
}
.c-c-title {
  font-weight: bold;
}
.c-c-state {
  margin: 0.3rem auto;
  background-color: #5bc0de;
  color: white;
  text-align: center;
  width: 1.8rem;
  padding: 0.18rem;
}
.c-c-stated {
  color: #bbb;
  background-color: #e8e8e8;
}
.c-c-content{
    display: flex;
    justify-content: space-between;
    border-top: 0.01rem #f8f8f8 solid;
    margin-top: 0.3rem;
}
.c-c-content>div{
    text-align: center;
    padding: 0rem 0.3rem;
    margin: 0.2rem 0rem;
    width: 1.2rem;
    box-sizing: content-box;
    font-size: 0.24rem;
    font-weight: bold;
}
.c-c-content>div:nth-child(1){
    color: #61BC92;
    border-right: 0.01rem #f8f8f8 solid;
}
.c-c-content>div:nth-child(2){
    color: #E1686E;
    border-right: 0.01rem #f8f8f8 solid;
}
.c-c-content>div:nth-child(3){
    color: #75AEE8;
}
.c-c-content>div>div:nth-child(2){
    margin-top: 0.3rem;
}
</style>
