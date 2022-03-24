<template>
  <!-- 2、评分对象选择页 -->
  <div class="register absolute">
    <div class="white-bg">
      <div class="item">平安江北建设考核<br />（评价）系统</div>
      <div>
        <div>
          请单选以下任意评分对象
        </div>
        <div class="readBefore">
          <div v-if="state1 !== 1" class="button-in" @click="state1 = 1">
            党政机关考评入口
          </div>
          <div v-if="state1 === 1" class="button-in1" @click="state1 = 0">
            党政机关考评入口<Icon class="passed" name="passed" />
          </div>
          <!-- <div class="warn-content">
            *禁止性指标::有下列情形之一,平安建设年度考评为不达标
          </div>
          <div class="warn-content warn-content-padding">
            1、本单位、本系统、本领域发生重大、特别重大事故、事件、案件的，考评不达标。
          </div> -->
        </div>
        <div class="readBefore">
          <div v-if="state1 !== 2" class="button-in" @click="state1 = 2">
            街道考评入口
          </div>
          <div v-if="state1 === 2" class="button-in1" @click="state1 = 0">
            街道考评入口<Icon class="passed" name="passed" />
          </div>
          <!-- <div class="warn-content">
            *禁止性指标::有下列情形之一,平安建设年度考评为不达标
          </div>
          <div class="allContent">
            <div class="warn-content warn-content-padding" ref="content2">
              <div v-for="(item, i) in content" :key="{ i }">
                <div v-if="i > 1 ? state1Show : 'true'">{{ item.name }}</div>
              </div>
              <span
                class="readMore readMore1"
                v-if="state1Show"
                @click="state1Show = false"
                >收起</span
              >
              <span
                v-if="!state1Show"
                @click="state1Show = true"
                class="readMore"
                >点击查看更多>></span
              >
            </div>
          </div> -->
        </div>
      </div>
      <div class="come-in" @click="comeIn" style="background:#FFF">
        确认进入评分系统
      </div>
    </div>
  </div>
</template>
<script>
import { Icon, Toast } from "vant";
export default {
  name: "scoreState",
  components: { Icon },
  data: function() {
    return {
      state1: 0, //入口选择
      state1Show: false, //是否展示全部
      state2: 0,
      state3: 0,
      showExchangeButton: false,
      content: [
        {
          name: "1、年度群众安全感指数低于80%",
        },
        {
          name:
            "2、群众食品安全满意度低于80%，或食品安全评价性抽检合格率低于98%",
        },
        {
          name:
            "3、群众食品安全满意度低于80%，或食品安全评价性抽检合格率低于98%",
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    comeIn() {
      if (this.state1 === 0) {
        Toast("请选择上述任意评分入口");
      } else {
        if (this.state1 === 1) {
          this.$router.push({ path: "/dzjg", query: { name: "党政机关" } });
        } else {
          this.$router.push({ path: "/dzjg", query: { name: "街道" } });
        }
      }
    },
  },
  mounted() {
    let loginData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!loginData) {
      this.$router.push("/login");
    } else {
      if (loginData.role === 0) {
        this.$dialog.error("当前页暂无管理员权限，请重新登录");
        this.$router.push("/login");
      }
    }
  },
};
</script>

<style scoped>
.white-bg {
  width: 100%;
  height: 100vh;
  position: fixed;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.8);
}
.white-bg > .item {
  color: #bbb;
  font-size: 0.52rem;
  font-weight: 600;
  line-height: 0.86rem;
  opacity: 0.3;
  padding: 0 0.4rem;
  margin-top: 0.5rem;
}
.white-bg > div {
  text-align: center;
  margin: 0.1rem auto;
  font-weight: 600;
}
.readBefore {
  /* background-color: rebeccapurple; */
  width: 6.6rem;
  margin: 0 auto 2.2rem;
}
.button-in {
  padding: 0.7rem 0;
  background-color: white;
  width: 5rem;
  margin: 0.05rem auto;
  color: #878787;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
}
.button-in1 {
  padding: 0.7rem 0;
  background-color: #1696d9;
  width: 5rem;
  margin: 0.05rem auto;
  color: #000;
  font-weight: bold;
  font-size: 0.3rem;
  position: relative;
}
.button-in1 .passed {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.44rem;
  color: #01f500;
}
.warn-content {
  color: #e41d26;
  font-weight: 600;
  line-height: 0.44rem;
  font-size: 0.24rem;
  text-align: left;
}
.warn-content-padding {
  padding: 0 0.2rem;
  position: relative;
}
.readMore {
  position: absolute;
  right: 0.2rem;
  bottom: 0;
  text-decoration: underline;
}
.readMore1 {
  bottom: -0.22rem;
  color: #f5df66;
}
.white-bg .come-in {
  border-radius: 0.08rem;
  height: 1rem;
  line-height: 1rem;
  width: 5.5rem;
  margin-top: 0.4rem;
  border: 0.01rem solid #0885ce;
  color: #0885ce;
  font-weight: 600;
}
</style>
