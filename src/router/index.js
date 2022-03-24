import Vue from "vue";
import Router from "vue-router";
// import module from "./module";
import Index from "@views/pingfen/login";
import NotDefined from "@views/NotDefined";
import Coding from "@views/coding";
import $store from "../store";
import toLogin from "@libs/login";
import Loading from "@views/Loading";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      meta: {
        title: "登录",
        keepAlive: false,
      },
      component: () => import("@views/pingfen/login.vue"),
    },
    {
      path: "/workBench",
      name: "workBench",
      meta: {
        title: "工作台",
        keepAlive: false,
      },
      component: () => import("@views/pingfen/workBench.vue"),
    },
    {
      path: "/myRating",
      name: "myRating",
      meta: {
        title: "我的评分",
        keepAlive: false,
      },
      component: () => import("@views/pingfen/myRating.vue"),
    },
    {
      path: "/evaluated",
      name: "evaluated",
      meta: {
        title: "已考评",
        keepAlive: false,
      },
      component: () => import("@views/pingfen/evaluated.vue"),
    },
    {
      path: "/beEvaluated",
      name: "beEvaluated",
      meta: {
        title: "待考评",
        keepAlive: false,
      },
      component: () => import("@views/pingfen/beEvaluated.vue"),
    },
    {
      path: "/assessmentPage",
      name: "assessmentPage",
      meta: {
        title: "考评页",
        keepAlive: false,
      },
      component: () => import("@views/pingfen/assessmentPage.vue"),
    },
    {
      path: "/scoreIdentity",
      name: "scoreIdentity",
      meta: {
        title: "评分对象选择",
        keepAlive: false,
      },
      component: () => import("@views/pingfen/scoreIdentity.vue"),
    },
    {
      path: "/scoreState",
      name: "scoreState",
      meta: {
        title: "评分状态",
        keepAlive: false,
      },
      component: () => import("@views/pingfen/scoreState.vue"),
    },
    {
      path: "/scoreEntry",
      name: "scoreEntry",
      meta: {
        title: "考评对象选择",
        keepAlive: false,
      },
      component: () => import("@views/pingfen/scoreEntry.vue"),
    },
    //考评页面
    {
      path: "/dzjg",
      name: "dzjg",
      meta: {
        title: "对象考评",
        keepAlive: false,
      },
      component: () => import("@views/kaoping/dzjg.vue"),
    },
    {
      path: "/user",
      name: "user",
      meta: {
        title: "考评结果概览",
        keepAlive: false,
      },
      component: () => import("@views/result/user.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      meta: {
        title: "考评结果概览",
        keepAlive: false,
      },
      component: () => import("@views/result/admin.vue"),
    },


    /***************************************************** */

    {
      path: "/",
      name: "Index",
      meta: {
        title: "首页",
        keepAlive: false,
        footer: true,
        backgroundColor: "#fff",
      },
      component: Index,
    },

    // ...module,
    {
      path: "/auth/:url",
      name: "Loading",
      meta: {
        title: " 加载中",
        keepAlive: true,
      },
      component: Loading,
    },
    {
      path: "/coding",
      name: "Coding",
      meta: {
        title: "页面开发中",
        keepAlive: true,
        home: false,
        backgroundColor: "#F4F6FB",
      },
      component: Coding,
    },
    {
      path: "*",
      name: "NotDefined",
      meta: {
        title: "页面找不到",
        keepAlive: true,
        home: false,
        backgroundColor: "#F4F6FB",
      },
      component: NotDefined,
    },
  ],
  scrollBehavior(to, from) {
    from.meta.scrollTop = window.scrollY;
    return { x: 0, y: to.meta.scrollTop || 0 };
  },
});

const { back, replace } = router;

router.back = function() {
  this.isBack = true;
  back.call(router);
};
router.replace = function(...args) {
  this.isReplace = true;
  replace.call(router, ...args);
};

router.beforeEach((to, form, next) => {
  const { title, backgroundColor, footer, home, auth } = to.meta;
  // console.log(to.name, form.name);
  if (auth === true && !$store.state.app.token) {
    if (form.name === "Login") return;
    return toLogin(true, to.fullPath);
  }
  document.title = title || process.env.VUE_APP_NAME || "江北政法委评分系统";
  //判断是否显示底部导航
  footer === true ? $store.commit("SHOW_FOOTER") : $store.commit("HIDE_FOOTER");

  //控制悬浮按钮是否显示
  home === false ? $store.commit("HIDE_HOME") : $store.commit("SHOW_HOME");

  $store.commit("BACKGROUND_COLOR", backgroundColor || "#F5F5F5");

  if (auth) {
    $store.dispatch("USERINFO").then(() => {
      next();
    });
  } else next();
});

export default router;
