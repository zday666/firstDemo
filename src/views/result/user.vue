<template>
  <!-- 2、评分对象选择页 -->
  <div class="register absolute">
    <div class="white-bg">
      <div class="top">
        <div class="top-title">
          仅展示已完成考评的对象总分
        </div>
        <div class="top-far">
          <div style="color:#1696D9;">党政考评进度</div>
          <div class="top-color">
            <div
              :style="
                allData === 100 ? '' : 'width:' + (allData / 100.0) * 4 + 'rem;'
              "
            ></div>
            <!-- <p>进度{{ allData }}%</p> -->
          </div>
          <div style="color:#1696D9;">{{ allData }}%</div>
        </div>
        <div class="top-far">
          <div style="color:#2876DF;">街道考评进度</div>
          <div class="top-color">
            <div
              :style="
                allData1 === 100
                  ? 'background-color:#2876DF;'
                  : 'background-color:#2876DF;width:' +
                    (allData1 / 100.0) * 4 +
                    'rem;'
              "
            ></div>
            <!-- <p>进度{{ allData }}%</p> -->
          </div>
          <div style="color:#2876DF;">{{ allData1 }}%</div>
        </div>
        <div class="top-far">
          <div style="color:#F00;">总考评进度</div>
          <div class="top-color">
            <div
              :style="
                allData2 === 100
                  ? 'background-color:#F00;'
                  : 'background-color:#F00;width:' +
                    (allData2 / 100.0) * 4 +
                    'rem;'
              "
            ></div>
            <!-- <p>进度{{ allData }}%</p> -->
          </div>
          <div style="color:#F00;">{{ allData2 }}%</div>
        </div>
        <div
          class="top-class"
          @click="
            () => {
              this.show = true;
              this.result = [];
            }
          "
        >
          <div v-if="result2.length === 0">
            默认全展示，筛选查看指定考评对象
            <div><Icon name="arrow-down" /></div>
          </div>
          <div v-if="result2.length > 0">
            <span v-for="(item, i) in result2" :key="{ i }">{{
              i &lt; result2.length - 1 ? item + "，" : item
            }}</span>
            <div><Icon name="arrow-down" /></div>
          </div>
        </div>
      </div>
      <div class="top1"></div>
      <div v-if="true" class="content">
        <div v-for="(item, i) in dataSearch" :key="{ i }">
          <div class="c-kaoping">
            <div>
              <div :style="true ? 'color:#01F500;' : 'color:#CCC;'">
                <Icon name="passed" />
              </div>
              <div>
                {{ item.scoringThemeName ? item.scoringThemeName : "" }}
              </div>
            </div>
            <div>
              <div>总分</div>
              <div>
                {{
                  item.totalScore === 0 || item.totalScore
                    ? item.totalScore
                    : "0"
                }}
              </div>
              <div>
                {{ item.scoringResults ? item.scoringResults : "" }}
              </div>
            </div>
            <div @click="setOutShowFalse(i, !showArr[i])">
              {{ showArr[i] ? "收拢" : "展开" }}
            </div>
          </div>
          <div class="c-user" v-if="showArr[i]">
            <!-- <div :class="true ? '' : 'c-user1'">
              <div :style="true ? 'color:#01F500;' : 'color:#CCC;'">
                <Icon name="passed" />
              </div>
              <div>区法院</div>
            </div> -->
            <div class="title">
              {{
                detailData.length > 0
                  ? "*暂未对该对象进行评分的考评人"
                  : "*无考评人未对该考评对象评分"
              }}
            </div>
            <div v-if="detailData.length > 0">
              <div
                v-for="(item, i) in detailData"
                :key="i"
                :class="false ? '' : 'c-user1'"
              >
                <div :style="false ? 'color:#01F500;' : 'color:red;'">
                  <Icon name="passed" />
                </div>
                <div>{{ item.roleName }}</div>
              </div>
              <!-- <div :class="false ? '' : 'c-user1'">
                <div :style="false ? 'color:#01F500;' : 'color:#CCC;'">
                  <Icon name="passed" />
                </div>
                <div>区法院</div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div v-if="false" class="content1">
        <Icon class="warn-o" name="warn-o" />当前未有已完成考评信息可展示<br />
        请提醒考评人进行对象考评
      </div>
      <Popup v-model="show" position="top" :style="{ height: '40%' }">
        <CheckboxGroup v-model="result" ref="checkboxGroup">
          <Checkbox name="" disabled
            >街道
            <Checkbox
              v-for="(item, i) in dataJie"
              :key="{ i }"
              :name="item.id"
              >{{ item.scoringThemeName }}</Checkbox
            >
          </Checkbox>
          <Checkbox name="" disabled
            >党政机关
            <Checkbox
              v-for="(item1, i1) in dataDang"
              :key="{ i1 }"
              :name="item1.id"
              >{{ item1.scoringThemeName }}</Checkbox
            >
          </Checkbox>
        </CheckboxGroup>
        <Button type="info" plain @click="checkAll">全选</Button>
        <Button type="primary" plain @click="toggleAll">反选</Button>
        <Button type="info" @click="searchData">确定</Button>
      </Popup>
      <div class="bottom1"></div>
      <div class="bottom">
        <!-- <div class="save-time"></div> -->
        <!-- 上次保存时间：2022-02-07 11:34 -->
        <!-- <Button :loading="load" type="info" size="large" @click="goExcel"
          >一键导出</Button
        > -->
        <div class="b-save" @click="goExcel">总考评导出</div>
        <div class="b-save" @click="goExcel1">街道导出</div>
        <!-- <div class="b-warn">
          <span style="color:red;">注：</span
          >以最后一次保存为提交版，在截至日期前均可修改
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import {
  Icon,
  Progress,
  Toast,
  Button,
  Picker,
  Field,
  Popup,
  Notify,
  CheckboxGroup,
  Checkbox,
} from "vant";
import {
  findAlltScor,
  findScoringObjectScor,
  findName,
  adminstrip,
  findRated,
} from "@api/user";
import moment from "moment";
import axios from "axios";
import Vue from "vue";
export default {
  name: "scoreState",
  components: {
    Icon,
    Progress,
    Button,
    Picker,
    Field,
    Popup,
    Notify,
    CheckboxGroup,
    Checkbox,
  },
  data: function() {
    return {
      excelData: {},
      // load: false,
      allData: 0,
      allData1: 0,
      allData2: 0,
      show: false,
      result: [],
      result1: [], //id
      result2: [], //名称
      showArr: [],
      dataDang: [],
      dataJie: [],
      dataSearch: [
        /* { name: "区法院1", score: 91, desc: "优" },
        { name: "区法院2", score: 91, desc: "优" },
        { name: "区法院3", score: 91, desc: "优" },
        { name: "区法院4", score: 91, desc: "优" },
        { name: "区法院5", score: 91, desc: "优" }, */
      ],
      detailData: [],
    };
  },
  methods: {
    setOutShowFalse(num, state) {
      //点击进行保存操作
      //移至点击显示详细问题处，产生相应问题再做相应操作
      if (state) {
        findRated({ scoringObjectId: this.dataSearch[num].id })
          .then((res) => {
            this.detailData = res;
          })
          .catch(() => {
            this.detailData = [];
          });
      }
      this.showArr.map((v, i) => {
        if (v) {
          Vue.set(this.showArr, i, false);
        }
      });
      Vue.set(this.showArr, num, state);
      /* if (state) {
        this.outShowNum = num;
      } else {
        this.outShowNum = null;
      } */
    },
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
      console.log(this.result);
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    searchData() {
      console.log(this.result);
      this.result1 = [];
      this.result2 = [];
      if (
        this.result.length - 2 !==
        this.dataDang.length + this.dataJie.length
      ) {
        this.dataDang.map((v) => {
          this.result.map((v1) => {
            if (v.id === v1) {
              this.result1.push(v.id);
              this.result2.push(v.scoringThemeName);
            }
          });
        });
        this.dataJie.map((v) => {
          this.result.map((v1) => {
            if (v.id === v1) {
              this.result1.push(v.id);
              this.result2.push(v.scoringThemeName);
            }
          });
        });
        this.result1 = Array.from(new Set(this.result1));
        this.result2 = Array.from(new Set(this.result2));
        findScoringObjectScor(this.result1)
          .then((res) => {
            console.log(res);
            this.dataSearch = res;
          })
          .catch(() => {
            this.$dialog.error("查询失败，暂无数据");
            this.dataSearch = [];
          })
          .finally(() => {
            this.show = false;
          });
      } else {
        findAlltScor()
          .then((res) => {
            console.log(res);
            this.dataSearch = res;
          })
          .catch(() => {
            this.$dialog.error("查询失败，暂无数据");
            this.dataSearch = [];
          })
          .finally(() => {
            this.show = false;
          });
      }
    },
    findScoringObjectScor() {
      findScoringObjectScor().then((res) => {
        console.log(res);
      });
    },
    goExcel() {
      // this.load = true;
      this.exportExcel("/api/role/export","总考评");
    },
    goExcel1(){
      this.exportExcel("/api/role/streetExport","街道");
    },
    adminstrip() {
      adminstrip()
        .then((res) => {
          this.allData = res.street || 0;
          this.allData1 = res.office || 0;
          this.allData2 = res.total || 0;
        })
        .catch(() => {
          this.allData = 0;
          this.allData1 = 0;
          this.allData2 = 0;
        });
    },
    download(data,name) {
      if (!data) {
        return;
      }
      const url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute(
        "download",
        `${name}_等次评价表_${moment(Date.parse(new Date())).format("YYYY-MM-DD")}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href); // 释放URL 对象
      document.body.removeChild(link);
      link = null;
    },
    exportExcel(url,name) {
      axios({
        method: "post",
        url: url,
        responseType: "arraybuffer",
        data: this.excelData,
        /* headers: {
          token: this.token,
        }, */
      })
        .then((res) => {
          console.log(res.data);
          this.download(res.data,name); // 注意，这里一定是res.data，不然导出的excel会乱码
          // console.log(err);
        })
        .catch(() => {
          this.$dialog.error("导出失败，暂无数据");
        });

      /* exportExcel(this.excelData)
        .then((res) => {
          // window.open(res.url);
          console.log(res);
          let data = res;
          if (!data) {
            return;
          }
          const url = window.URL.createObjectURL(new Blob([data]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "考勤统计.xlsx");
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(link.href); // 释放URL 对象
          document.body.removeChild(link);
          link = null;
        })
        .catch(() => {
          this.$dialog.error("导出失败，暂无数据");
        })
        .finally(() => {
          this.load = false;
        }); */
    },
    findAlltScor() {
      findAlltScor()
        .then((res) => {
          console.log(res);
          this.dataSearch = res;
        })
        .catch(() => {
          this.$dialog.error("查询失败，暂无数据");
          this.dataSearch = [];
        })
        .finally(() => {
          findName({ objectStyle: 0 })
            .then((res) => {
              this.dataDang = JSON.parse(JSON.stringify(res));
              console.log(this.dataDang);
            })
            .catch(() => {
              // this.$dialog.error("查询失败，暂无数据");
              this.dataDang = [];
            })
            .finally(() => {
              findName({ objectStyle: 1 })
                .then((res1) => {
                  this.dataJie = JSON.parse(JSON.stringify(res1));
                  console.log(this.dataJie);
                })
                .catch(() => {
                  // this.$dialog.error("查询失败，暂无数据");
                  this.dataJie = [];
                });
            });
        });
    },
  },
  mounted() {
    let loginData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!loginData) {
      // if (loginData) {
      this.$router.push("/login");
    } else {
      if (loginData.role === 1) {
        this.$dialog.error("您暂无管理员权限，请重新登录");
        this.$router.push("/login");
      } else {
        this.excelData = { role: loginData.role, roleId: loginData.id };
        this.showArr = [];
        this.dataSearch.map(() => {
          this.showArr.push(false);
        });
        this.adminstrip();
        this.findAlltScor();
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
  -webkit-overflow-scrolling: touch; /* ios5+ */
  background-color: rgba(255, 255, 255, 0.8);
}
.top {
  position: fixed;
  background-color: #f1efef;
  width: 100%;
  height: 2.6rem;
  color: black;
  padding: 0 0.2rem;
  top: 0;
  left: 0;
  z-index: 99;
}
.top1 {
  height: 2.6rem;
}
.top-title {
  text-align: center;
  font-weight: bold;
  margin-top: 0.1rem;
}
.top-far {
  display: flex;
  font-weight: bold;
  margin: 0.1rem 0;
}
.top-far > div:first-child {
  /* background-color: red; */
  width: 1.8rem;
  height: 0.3rem;
  line-height: 0.3rem;
}
.top-far > div:last-child {
  width: 0.7rem;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: right;
}

.top-color {
  background-color: rgba(204, 204, 204, 0.5);
  height: 0.3rem;
  line-height: 0.3rem;
  margin: 0 0.25rem;
  width: 4.3rem;
  text-align: right;
  /* padding-right: 0.2rem; */
  color: white;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
}
.top-color > div {
  position: absolute;
  width: 4rem;
  height: 0.15rem;
  margin: 0.075rem;
  border-radius: 1rem;
  top: 0;
  left: 0;
  background-color: rgb(22, 150, 217);
}
.top-color > p {
  position: absolute;
  z-index: 9;
  right: 0.2rem;
}
.top-class {
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
  border-radius: 0.1rem;
  position: relative;
  color: #878787;
  padding: 0.1rem 0.3rem 0.1rem 0.2rem;
  height: 0.6rem;
  line-height: 0.4rem;
  margin-top: 0.2rem;
  background-color: white;
}
.top-class > div > div {
  position: absolute;
  right: 0.05rem;
  top: 0.1rem;
}
.top-class > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.top-class > div > span {
  color: black;
}
.ok-true {
  color: #3898da;
  font-weight: bold;
  /* text-align: center; */
}
.ok-false {
  font-weight: bold;
  color: #e30829;
  /* text-align: center; */
}
.content {
  padding: 0 0.2rem;
}
.content1 {
  margin: 2rem auto;
  text-align: center;
  color: #f5bd00;
  font-weight: bold;
  line-height: 0.5rem;
  position: relative;
}
.warn-o {
  font-size: 0.5rem;
  position: absolute;
  top: -0.05rem;
  left: 1.25rem;
  color: red;
  /* line-height: 0.5rem; */
}
.c-title {
  display: flex;
  justify-content: center;
  margin-top: 0.1rem;
}
.c-title > div {
  margin: 0 0.1rem;
}
.c-kaoping {
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0;
}
.c-kaoping > div:first-child {
  width: 3.3rem;
  height: 0.64rem;
  padding: 0.1rem 0;
  display: flex;
  background-color: #0892e3;
  color: white;
  /* justify-content: space-around; */
  border-radius: 0.1rem;
  border: 1px solid #0892e3;
}
.c-kaoping1 > div:first-child {
  background-color: white;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
  color: black;
}
.c-kaoping > div:first-child > div {
  line-height: 0.44rem;
}
.c-kaoping > div:first-child > div:first-child {
  font-size: 0.44rem;
  margin: 0 0.1rem 0 0.1rem;
}
.c-kaoping1 > div:first-child > div:first-child {
  font-size: 0.28rem;
  margin-left: 0.1rem;
  font-weight: bold;
  text-align: left;
}
.c-kaoping > div:first-child > div:nth-child(2) {
  width: 2.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.c-kaoping > div:nth-child(2) {
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  height: 0.64rem;
  line-height: 0.64rem;
  width: 2.6rem;
  font-weight: bold;
  font-size: 0.26rem;
}
.c-kaoping > div:nth-child(2) > div:nth-child(2),
.c-kaoping > div:nth-child(2) > div:nth-child(3) {
  background-color: #1696d9;
  color: white;
  border: 0.01rem solid rgba(0, 0, 0, 0.1);
  width: 0.86rem;
  text-align: center;
}
.c-kaoping1 > div:nth-child(2) > div:nth-child(2) {
  background-color: white;
  color: #1696d9;
  font-weight: lighter;
  font-size: 0.24rem;
}
.c-kaoping > div:nth-child(3) {
  /* background-color: red; */
  height: 0.64rem;
  line-height: 0.64rem;
  text-decoration: underline;
  font-size: 0.24rem;
  color: #1696d9;
}
.ck-detail {
  display: flex;
  justify-content: space-between;
}
.ck-detail > div:first-child {
  width: 5.3rem;
  background-color: white;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
  padding: 0.1rem;
  line-height: 0.5rem;
  font-weight: 500;
}
.ck-detail > div:nth-child(2) {
  width: 1.55rem;
  height: 0.64rem;
  line-height: 0.64rem;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.ck-detail > div:nth-child(2) > div:nth-child(2) {
  width: 0.8rem;
  background-color: white;
  text-align: center;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
  color: #1696d9;
  font-size: 0.24rem;
}

.c-user {
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  margin: 0.2rem 0;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
  padding: 0.1rem 0;
  background-color: white;
}
.c-user > div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0.2rem 0 0;
  padding: 0.1rem 0;
  background-color: white;
}
.c-user > .title {
  width: 100%;
  background-color: transparent;
  color: red;
  padding: 0;
  height: auto;
  margin: 0 0.27rem;
  border: 0px solid transparent;
}
.c-user > div > div {
  width: 2.95rem;
  height: 1.1rem;
  padding: 0.1rem 0;
  display: flex;
  background-color: #0892e3;
  margin: 0.1rem 0.27rem;
  color: white;
  /* justify-content: space-around; */
  border-radius: 0.1rem;
  border: 1px solid #0892e3;
  align-items: center;
}
.c-user > div > .c-user1 {
  background-color: white;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
  color: black;
}
.c-user > div > div > div {
  line-height: 0.44rem;
}
.c-user > div > div > div:first-child {
  font-size: 0.44rem;
  height: 0.44rem;
  margin: 0rem 0.1rem 0 0.1rem;
}
.c-user > div > div > div:nth-child(2) {
  width: 2.15rem;
  color: #b66f05;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center; */
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

::v-deep .van-checkbox-group {
  padding: 0.2rem 0;
  position: relative;
}
::v-deep .van-checkbox-group > .van-checkbox {
  position: relative;
  margin: 0 0.8rem;
}
::v-deep .van-checkbox-group > .van-checkbox > .van-checkbox__icon > .van-icon {
  position: absolute;
  top: 0rem;
  left: 0;
}
::v-deep .van-checkbox-group > .van-checkbox > .van-checkbox__label {
  padding-left: 0.4rem;
}
::v-deep
  .van-checkbox-group
  > .van-checkbox
  > .van-checkbox__label
  > .van-checkbox {
  margin: 0.05rem 0;
}
::v-deep .van-checkbox__label {
  font-size: 0.28rem;
}
::v-deep .van-button--normal {
  position: fixed;
  right: 0.2rem;
  top: 0.4rem;
  width: 2rem;
  height: 0.8rem;
  border-radius: 0.1rem;
  font-size: 0.28rem;
}
::v-deep .van-button--normal:nth-child(3) {
  top: 1.6rem;
}
::v-deep .van-button--normal:nth-child(4) {
  top: 2.8rem;
}
.bottom {
  position: fixed;
  background-color: #f1efef;
  width: 100%;
  height: 1.2rem;
  color: black;
  padding: 0 0.2rem;
  bottom: 0;
  text-align: center;
  left: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.bottom1 {
  height: 1.2rem;
}
.save-time {
  text-align: center;
  font-size: 0.24rem;
  height: 0.3rem;
  color: #787575;
}
.b-save {
  border-radius: 0.08rem;
  height: 0.7rem;
  line-height: 0.7rem;
  width: 2.5rem;
  border: 0.01rem solid #0885ce;
  color: white;
  font-weight: 600;
  margin: 0 auto;
  text-align: center;
  background-color: #1989fa;
}
.b-save:last-child {
  background-color: white;
  color: #1989fa;
}
.b-warn {
  color: #f5bd00;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.44rem;
}
</style>
