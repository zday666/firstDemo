<template>
  <!-- 1、登录页 -->
  <div class="register absolute">
    <div class="whiteBg1">
      <div class="whiteBg" v-if="formItem === 1">
        <div class="title acea-row row-center-wrapper">
          <div class="item">
            平安江北建设考核<br/>（评价）系统
          </div>
        </div>
        <div class="list">
          <form @submit.prevent="submit">
            <div class="item">
              <div class="acea-row row-between-wrapper">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yonghu"></use>
                </svg>
                <input
                  type="text"
                  placeholder="请输入登录账号"
                  v-model="accountNumber"
                  required
                />
              </div>
            </div>
            <div class="item">
              <div class="acea-row row-between-wrapper">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-code_"></use>
                </svg>
                <input
                  type="password"
                  placeholder="请输入登录密码"
                  v-model="password"
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <div class="warn-content">
          *考评时间限制说明：在截止时间<span style="color:#1696d9">{{
            dateL
          }}</span
          >前，可登录系统进行考评，可进行多次修改与保存，考评终版以最后结束时间保存版本为准
        </div>
        <div class="logon" @click="submit" style="background:#FFF">登录</div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>
<script>
// import sendVerifyCode from "@mixins/SendVerifyCode";
import { login, findendTime } from "@api/user";
import moment from "moment";
// import { encrypt } from "@/utils/rsaEncrypt";
import attrs, { required, alpha_num, chs_phone } from "@utils/validate";
import { validatorDefaultCatch } from "@utils/dialog";
// import cookie from "@utils/store/cookie";
import { Notify } from "vant";

// const BACK_URL = "login_back_url";

export default {
  name: "Login",
  // mixins: [sendVerifyCode],
  data: function() {
    return {
      accountNumber: "",
      password: "",
      captcha: "",
      formItem: 1,
      type: "login",
      dateL: null,
    };
  },
  methods: {
    /* async register() {
      var that = this;
      const { accountNumber, captcha, password } = that;
      try {
        await that
          .$validator({
            accountNumber: [
              required(required.message("手机号码")),
              chs_phone(chs_phone.message()),
            ],
            captcha: [
              required(required.message("验证码")),
              alpha_num(alpha_num.message("验证码")),
            ],
            password: [
              required(required.message("密码")),
              attrs.range([6, 16], attrs.range.message("密码")),
              alpha_num(alpha_num.message("密码")),
            ],
          })
          .validate({ accountNumber, captcha, password });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      register({
        accountNumber: that.accountNumber,
        captcha: that.captcha,
        password: encrypt(that.password),
        spread: cookie.get("spread"),
      })
        .then((res) => {
          that.$dialog.success(res.message);
          that.formItem = 1;
        })
        .catch((res) => {
          that.$dialog.error(res.message);
        });
    },
    async code() {
      var that = this;
      const { accountNumber } = that;
      try {
        await that
          .$validator({
            accountNumber: [
              required(required.message("手机号码")),
              chs_phone(chs_phone.message()),
            ],
          })
          .validate({ accountNumber });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      if (that.formItem == 2) that.type = "register";
      await registerVerify({ phone: that.accountNumber, type: that.type })
        .then((res) => {
          that.$dialog.success(res.message);
          that.sendCode();
        })
        .catch((res) => {
          that.$dialog.error(res.message);
        });
    }, */
    async submit() {
      // let time1 = Date.parse(this.dateL);
      let arr = moment(this.dateL)
        .format("YYYY/MM/DD HH:mm:ss")
        .split(/[- : \/]/);
      let time1 = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
      // let time2 = Date.parse(new Date());
      let arr1 = moment(new Date())
        .format("YYYY/MM/DD HH:mm:ss")
        .split(/[- : \/]/);
      let time2 = new Date(
        arr1[0],
        arr1[1] - 1,
        arr1[2],
        arr1[3],
        arr1[4],
        arr1[5]
      );
      if (time2 <= time1) {
        // console.log("spread:" + cookie.get("spread"));
        const { accountNumber, password } = this;
        try {
          await this.$validator({
            accountNumber: [
              required(required.message("账号")),
              attrs.range([1, 16], attrs.range.message("账号")),
              alpha_num(alpha_num.message("账号")),
            ],
            password: [
              required(required.message("密码")),
              attrs.range([1, 16], attrs.range.message("密码")),
              alpha_num(alpha_num.message("密码")),
            ],
          }).validate({ accountNumber, password });
        } catch (e) {
          return validatorDefaultCatch(e);
        }
        /* await axios
          .post(`http://192.168.137.204:5781/role/login`, data)
          .then((res) => {
            console.log("res=>", res);
          }); */
        login({
          accountNumber: accountNumber,
          password: password,
        })
          .then((res) => {
            console.log(res);
            localStorage.setItem("loginInfo", JSON.stringify(res));
            if (res.role === 0) {
              this.$router.replace({ path: "/user" });
            } else {
              this.$router.replace({ path: "/scoreEntry" });
            }
            // if(role)
            // this.$store.commit("LOGIN", data.token, dayjs(data.expires_time));
            // const backUrl = cookie.get(BACK_URL) || "/";
            // cookie.remove(BACK_URL);
            // this.$router.replace({ path: backUrl });
          })
          .catch((e) => {
            // console.log(e);
            this.$dialog.error("登录失败");
          });
      } else {
        Notify({ type: "danger", message: "已超过截止时间，不可登录" });
      }
    },
  },
  mounted() {
    this.dateL = moment(Date.parse(new Date())).format("YYYY-MM-DD HH:mm:ss");

    if (JSON.parse(localStorage.getItem("loginInfo"))) {
      localStorage.removeItem("loginInfo");
    }
    findendTime()
      .then((res) => {
        this.dateL = res[0];
      })
      .catch(() => {
        this.dateL = moment(Date.parse(new Date())).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.$dialog.error("截止时间已过期，请刷新重试");
      });
  },
};
</script>

<style scoped>
.white-bg1 {
  width: 100%;
  height: 100vh;
  position: fixed;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.8);
}
.register .whiteBg {
  width: 7rem;
  border-radius: 0.16rem;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 1.2rem auto 0 auto;
  padding: 0.45rem 0.3rem 0 0.3rem;
}
.register .whiteBg .title .item {
  color: #bbb;
  border-bottom: 0.05rem solid #fff;
  padding-bottom: 1.1rem;
  font-size: 0.52rem;
  font-weight: 600;
  line-height: 0.86rem;
}
.register .whiteBg .list .item {
  border: 0.01rem solid #ededed;
  padding: 0.3rem 0.3rem;
  position: relative;
  margin-bottom: 0.5rem;
  background-color: #fff;
}
.register .whiteBg .list .item .icon {
  color: #1696d9;
}
.register .whiteBg .list .item input {
  font-size: 0.25rem;
  width: 5rem;
  margin-top: 0.05rem;
}
.register .whiteBg .tip {
  height: 1.1rem;
  text-align: right;
  margin-top: 0.3rem;
  line-height: 1.05rem;
  font-size: 0.3rem;
  color: #cccccc;
}
.register .whiteBg .logon {
  border-radius: 0.08rem;
  height: 1rem;
  line-height: 1rem;
  border: 0.01rem solid #0885ce;
  color: #0885ce;
  font-weight: 600;
}
.warn-content {
  color: #e41d26;
  font-weight: 600;
  line-height: 0.54rem;
  font-size: 0.26rem;
}
.all-last {
  margin-top: 0.5rem;
  text-align-last: justify;
  text-align: justify;
  text-justify: distribute-all-lines;
}
</style>
