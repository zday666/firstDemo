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
        <div class="content-title">已考评对象</div>
        <div class="content-content">
          <div
            :style="
              visible
                ? 'max-height: ' + (0.68 + numData[0] * 1) + 'rem;'
                : 'max-height: 0.68rem;'
            "
          >
            <div
              @click="
                () => {
                  this.visible = !this.visible;
                  this.visible1 = false;
                  this.visible2 = false;
                }
              "
              class="c-c-title"
            >
              区委各部委<span>{{ numData[0] }}</span>
            </div>
            <!-- <div> -->
            <!-- <transition :name="visible ? 'van-slide-down' : 'van-fade'"> -->
            <div class="isShow">
              <div v-for="(item, i) in quData" :key="{ i }">
                <div>{{ item }}</div>
                <div @click="goTestPage(item)">查看考评情况</div>
              </div>
            </div>
            <!-- </transition> -->
            <!-- </div> -->
          </div>
          <div
            :style="
              visible1
                ? 'max-height: ' + (0.68 + numData[1] * 1) + 'rem;'
                : 'max-height: 0.68rem;'
            "
          >
            <div
              @click="
                () => {
                  this.visible1 = !this.visible1;
                  this.visible = false;
                  this.visible2 = false;
                }
              "
              class="c-c-title"
            >
              区人大常委机关<span>{{ numData[1] }}</span>
            </div>
            <div class="isShow">
              <div v-for="(item, i) in quData1" :key="{ i }">
                <div>{{ item }}</div>
                <div @click="goTestPage(item)">查看考评情况</div>
              </div>
            </div>
          </div>
          <div
            :style="
              visible2
                ? 'max-height: ' + (0.68 + numData[2] * 1) + 'rem;'
                : 'max-height: 0.68rem;'
            "
          >
            <div
              @click="
                () => {
                  this.visible2 = !this.visible2;
                  this.visible1 = false;
                  this.visible = false;
                }
              "
              class="c-c-title"
            >
              区政府各部门<span>{{ numData[2] }}</span>
            </div>
            <div class="isShow">
              <div v-for="(item, i) in quData2" :key="{ i }">
                <div>{{ item }}</div>
                <div @click="goTestPage(item)">查看考评情况</div>
              </div>
            </div>
          </div>
        </div>

        <div class="goLook1">
          <!-- <router-link style="color:white" to="/myRating"
            >生成我的打分报告</router-link
          > -->
          生成我的打分报告
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
  name: "Evaluated",
  components: { Icon },
  data: function() {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      quData: ["组织部", "宣传部", "督察部", "纪检部", "江北部"],
      quData1: ["江北部", "宣传部"],
      quData2: ["宣传部", "督察部", "纪检部", "江北部"],
      numData: [5, 2, 4],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goTestPage(name) {
      console.log(name);
      this.$router.push({
        path: "/assessmentPage",
        query: {
          name,
        },
      });
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
  box-sizing: border-box;
  padding: 0.9rem 0.3rem 0.2rem;
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
  background-color: #f2f2f2;
  max-height: calc(100% - 0.68rem);
  overflow: auto;
  border-radius: 0.1rem;
}
.isShow > div {
  font-size: 0.32rem;
  /* border-radius: 0.1rem; */
  margin: 0.2rem 0;
  color: black;
  display: flex;
  justify-content: space-around;
}
.isShow > div > div:last-child {
  font-size: 0.28rem;
  color: #206bc4;
}
.content-content .c-c-title > span {
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
  margin: 5.04rem auto 0;
}
</style>
