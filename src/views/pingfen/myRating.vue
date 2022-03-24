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
        <div class="content-title">我的得分</div>
        <div class="content-content" ref="imageTofile">
          <div>基础工作<span>25分</span></div>
          <div>重点工作</div>
          <div>专项工作</div>
        </div>
        <!-- <img :src="posterUrl" style="width:100%" /> -->
        <div class="goLook1" @click="toImage">
          生成我的得分报告
        </div>
        <!-- <div v-if="isImg" class="goLook1" @click="saveImage">
          点击保存
        </div> -->
      </div>
      <div class="content-position"></div>
      <!-- <div class="goLook">生成我的得分报告</div> -->
    </div>
    <Overlay
      :show="isImg"
      @click="
        () => {
          this.isImg = false;
        }
      "
    >
      <div class="wrapper">
        <div @click.stop>
          <div class="save-title">长按图片保存到本地</div>
          <div class="block">
            <img :src="posterUrl" style="width:100%" />
          </div>
        </div>
      </div>
    </Overlay>
  </div>
</template>
<script>
import { Icon, Overlay } from "vant";
import html2canvas from "html2canvas";
export default {
  name: "myRating",
  components: { Icon, Overlay },
  data: function() {
    return {
      posterUrl: "",
      isImg: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    DPR() {
      if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio;
      }
      return 1;
    },
    // 页面元素转图片
    toImage() {
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      this.isImg = false;
      return html2canvas(this.$refs.imageTofile, {
        backgroundColor: null, // 背景颜色
        dpi: 192, // 将分辨率提高到特定的dpi,默认值为96
        scale: this.DPR(), // 用于渲染的比例尺。默认为浏览器设备像素比率。默认值是1，手机端设置成2
        useCORS: true, // 是否尝试使用CORS从服务器加载图像
      }).then((canvas) => {
        this.posterUrl = canvas.toDataURL("image/png");
        this.isImg = true;
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.setAttribute("download", "评分" + ".png");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
      });
      /* return html2canvas(this.$refs.imageTofile).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.setAttribute("download", '评分' + ".png");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
      }); */
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
  width: 1.85rem;
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
  width: 1.85rem;
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
  margin: 5.04rem auto 0;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.save-title {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #d5ebf6;
}
.block {
  width: 6rem;
  padding: 0.2rem;
  max-height: 10rem;
  overflow: auto;
  background-color: #fff;
}
</style>
