<template>
  <div class="register absolute" style="background:#FFF">
    <div class="white-bg">
      <div class="title-bg">
        平安江北-考评系统<Icon
          @click="goBack()"
          class="icon-back"
          name="arrow-left"
        />
      </div>
      <div class="content">
        <div class="content-title">考评页</div>
        <div class="content-content">
          <div>基础工作<span>5</span></div>
          <div>重点工作<span>2</span></div>
          <div>专项工作<span>5</span></div>
        </div>
        <!-- <div class="goLook1">
          生成我的打分报告
        </div> -->
      </div>
      <div class="content-position"></div>
      <!-- <div class="goLook">生成我的得分报告</div> -->
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  name: "Evaluated",
  components: { Icon },
  data: function() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    if (this.$route.query.name) {
      console.log("接受数据：", this.$route.query.name);
    } else {
      this.$router.push("/beEvaluated");
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
  width: 1.65rem;
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
  width: 1.65rem;
  height: 0.25rem;
  border-bottom: 0.04rem solid #206bc4;
  display: inline-block;
  position: absolute;
  left: 0.3rem;
  /* top: 11px; */
  /* left: 29px; */
}
.content-content {
  margin-top: 0.2rem;
}
.content-content > div {
  /* width: 5.42rem; */
  border-radius: 0.1rem;
  height: 0.68rem;
  background-color: rgba(22, 155, 213, 1);
  text-align: center;
  color: white;
  font-size: 0.36rem;
  position: relative;
  line-height: 0.68rem;
}
.content-content > div > span {
  position: absolute;
  right: 0.1rem;
  font-size: 0.28rem;
}

/* .goLook {
  width: 3.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  background-color: #206bc4;
  position: fixed;
  left: 50%;
  color: white;
  font-size: 0.26rem;
  margin-left: -1.55rem;
  bottom: 1.5rem;
  border-radius: 0.1rem;
} */
.goLook1 {
  width: 3.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  background-color: #206bc4;
  color: white;
  font-size: 0.26rem;
  border-radius: 0.1rem;
  margin: 5.04rem auto;
}
</style>
