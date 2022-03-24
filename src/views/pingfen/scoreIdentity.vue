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
        <div class="content-title">评分对象选择</div>
        <div class="content-content">
          <div
            :style="
              visible
                ? 'max-height: ' + (0.68 + quData.length * 1) + 'rem;'
                : 'max-height: 0.68rem;'
            "
          >
            <div
              @click="
                () => {
                  this.visible = !this.visible;
                }
              "
              class="c-c-title"
            >
              选择<span><Icon :name="visible ? 'arrow-down' : 'arrow'"/></span>
            </div>
            <!-- <div> -->
            <!-- <transition :name="visible ? 'van-slide-down' : 'van-fade'"> -->
            <div class="isShow">
              <div
                :class="stateNum === i ? 'isChoosed' : ''"
                v-for="(item, i) in quData"
                :key="{ i }"
              >
                <div @click="goScoreState(item, i)">{{ item }}</div>
              </div>
            </div>
            <!-- </transition> -->
            <!-- </div> -->
          </div>
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
  name: "scoreIdentity",
  components: { Icon },
  data: function() {
    return {
      visible: false,
      stateNum: -1,
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
    goScoreState(item, i) {
      this.stateNum = i;
      this.$router.push({
        path: "/scoreState",
        query: {
          name:item,
        },
      });
    //   console.log(item);
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
  width: 1.6rem;
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
  width: 1.6rem;
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
.content-content .c-c-title {
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
.content-content > div {
  /* height: 0.68rem; */
  overflow: hidden;
  transition: max-height 1s;
}
.isShow {
  max-height: calc(100% - 0.68rem);
  overflow: auto;
  border-radius: 0.1rem;
}
.isShow > div {
  font-size: 0.32rem;
  /* border-radius: 0.1rem; */
  margin: 0.1rem 0 0.15rem;
  padding: 0.06rem;
  border: 0.01rem solid rgba(0, 0, 0, 0.35);
  border-radius: 0.1rem;
  background-color: #f2f2f2;
  color: #7f7f7f;
  display: flex;
  justify-content: space-around;
}
.isShow > .isChoosed {
  color: white;
  background-color: #4472c4;
  border: 0.01rem solid #fff;
}
/* .isShow > div > div:last-child {
  font-size: 0.28rem;
  color: #206bc4;
} */
.content-content .c-c-title > span {
  position: absolute;
  right: 0.2rem;
  font-size: 0.34rem;
  top: 0.07rem;
}
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
