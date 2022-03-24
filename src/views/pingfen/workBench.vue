<template>
  <div class="register absolute" style="background:#FFF">
    <div class="white-bg">
      <div class="title-bg">
        平安江北-评分工作台<Icon
          @click="goBack()"
          class="icon-back"
          name="arrow-left"
        />
      </div>
      <div class="content">
        <div class="content-title">当前评分任务状态</div>
        <div class="content-content">
          <div @click="goBeEvaluated()">
            <div>待考评</div>
            <div>{{ overData }}</div>
          </div>
          <div @click="goEvaluated()">
            <div>已考评</div>
            <div>{{ noData }}</div>
          </div>
        </div>
      </div>
      <div class="content-position"></div>
      <!-- <router-link class="goLook" to="/myRating">查看我的评分</router-link> -->
      <div class="goLook">
        <router-link style="color:white" to="/myRating"
          >查看我的评分</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  name: "workBench",
  components: { Icon },
  data: function() {
    return {
      overData: 57,
      noData: 43,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goEvaluated() {
      this.$router.push("/evaluated");
    },
    goBeEvaluated() {
      this.$router.push("/beEvaluated");
    },
  },
  mounted() {},
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
  height: 4.3rem;
  padding: 0.9rem 0.3rem 1.2rem;
  box-shadow: 0.04rem 0.1rem 0.1rem rgba(0, 0, 0, 0.35);
  border-radius: 0.1rem;
}
.content-position {
  /* background-color: red; */
  width: 6rem;
  height: 4.3rem;
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
  width: 1.15rem;
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
  width: 1.15rem;
  height: 0.25rem;
  border-bottom: 0.04rem solid #206bc4;
  display: inline-block;
  position: absolute;
  left: 0.3rem;
  /* top: 11px; */
  /* left: 29px; */
}
.content-content {
  display: flex;
  justify-content: space-around;
}
.content-content > div > div {
  text-align: center;
  margin-top: 0.4rem;
  font-size: 0.36rem;
}
.content-content > div:first-child > div:first-child {
  color: #1abc9c;
}
.content-content > div:nth-child(2) > div:first-child {
  color: #eb1212;
}
/* .goLook {
  width: 2.8rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  background-color: #206bc4;
  position: fixed;
  left: 50%;
  color: white;
  font-size: 0.36rem;
  margin-left: -1.4rem;
  bottom: 2.4rem;
  border-radius: 0.1rem;
} */
.goLook {
  width: 2.8rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  background-color: #206bc4;
  /* position: fixed;
  left: 50%; */
  color: white;
  font-size: 0.36rem;
  margin: 3.7rem auto;
  /* margin-left: -1.4rem; */
  /* bottom: 2.4rem; */
  border-radius: 0.1rem;
}
</style>
