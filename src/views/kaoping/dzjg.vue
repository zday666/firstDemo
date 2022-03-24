<template>
  <!-- 2、评分对象选择页 -->
  <div class="register absolute">
    <div class="white-bg">
      <div class="top">
        <div class="top-title">
          {{
            outShowNum
              ? "请对以下对象进行填写考评"
              : "请单选以下任意评分问题进行考评"
          }}
        </div>
        <div class="top-far">
          <div style="color:#1696D9;">{{ whichObj }}考评</div>
          <div class="top-color">
            <div
              :style="
                allData === 100
                  ? ''
                  : 'width:' + (allData / 100.0) * 5.1 + 'rem;'
              "
            ></div>
            <p>总进度{{ allData }}%</p>
          </div>
        </div>
        <div class="top-class">
          <div>
            <div style="color:#01F500;"><Icon name="passed" /></div>
            <div>已完成考评</div>
          </div>
          <div>
            <div><Icon name="passed" /></div>
            <div>未完成考评</div>
          </div>
        </div>
      </div>
      <div class="top1"></div>
      <div class="content" :key="statePingfenxiang">
        <div v-for="(item2, i2) in questionTitle" :key="{ i2 }">
          <div class="c-title" @click="SearchData(item2.id)">
            {{ i2 + 1 + "、" + item2.title }}
            <div>
              <Icon :name="showTitleid === item2.id ? 'arrow-down' : 'arrow'" />
            </div>
          </div>
          <div v-if="moniData.length > 0 && showTitleid === item2.id">
            <div v-for="(item, i) in moniData" :key="{ i }">
              <div
                @click="setOutShowFalse(i, !outShowArr[i])"
                :class="
                  item.state0 === '0' ? 'c-content' : 'c-content c-content1'
                "
              >
                <div
                  class="c-c-isOK"
                  :style="item.state0 === '0' ? 'color:#01F500;' : 'color:#CCC'"
                >
                  <Icon name="passed" />
                </div>
                <div class="c-c-title">
                  <div
                    :class="item.state0 !== '0' ? 'ok-true' : 'ok-right'"
                    v-if="item.state0 === '0'"
                  >
                    完成{{ item.state1 }}个对象考评
                  </div>
                  <div class="ok-false" v-if="item.state0 !== '0'">
                    {{ item.state0 }}个对象未考评
                  </div>
                </div>
                <div class="c-c-content">
                  {{ i + 1 }}、{{ item.item
                  }}<span class="ok-false">{{
                    item.warn ? "(" + item.warn + ")" : ""
                  }}</span>
                </div>
              </div>
              <div v-if="outShowArr[i]" style="margin:-0.3rem 0 0.5rem">
                <div
                  v-if="item.scoingStyle === 1"
                  class="ok-false"
                  style="font-size:0.24rem"
                >
                  *等次记分规则：评价等次分为优秀、良好、达标、不达标四个等次，其中优秀不超过40%、良好不超过50%。区委平安办依据各评分单位提供的评价等次，按优秀得100%的分、良好得80%的分、达标得60%的分、不达标的0分进行折算
                </div>
                <div
                  v-if="item.scoingStyle === 2"
                  class="ok-false"
                  style="font-size:0.24rem"
                >
                  *禁止性指标规则：评价等次分为达标、未达标两个等次，其中达标得分为1，不达标为0。不达标将影响评分对象综合评分
                </div>

                <div v-if="item.scoingStyle !== 0">
                  <div
                    v-for="(item1, i1) in detailData"
                    :key="i1"
                    :class="
                      item1.evaluationStatus === 0
                        ? 'cc-kaoping'
                        : 'cc-kaoping cc-kaoping1'
                    "
                  >
                    <div class="cck-top">
                      <div>
                        <div
                          :style="
                            item1.evaluationStatus === 0
                              ? 'color:#01F500;'
                              : 'color:#CCC;'
                          "
                        >
                          <Icon name="passed" />
                        </div>
                        <div>{{ item1.scoringThemeName }}</div>
                      </div>
                      <div>
                        <div class="down-sec"><Icon name="arrow-down" /></div>
                        <Field
                          readonly
                          clickable
                          :value="
                            item.scoingStyle === 1
                              ? item1.status === 0 || item1.status
                                ? compuData2[item1.status]
                                : null
                              : item1.status === 0 || item1.status
                              ? compuDataJIN2[item1.status]
                              : null
                          "
                          placeholder="选择等次"
                          @click="setShowFalse(i1, true)"
                        />
                        <Popup v-model="showArr[i1]" round position="bottom">
                          <Picker
                            show-toolbar
                            :columns="
                              item.scoingStyle === 1 ? columns : columnsJIN
                            "
                            @cancel="setShowFalse(i1, false)"
                            @confirm="onConfirm"
                          />
                        </Popup>
                      </div>
                    </div>
                    <div class="cck-bottom">
                      <div v-if="item.scoingStyle !== 2">
                        <div>得分</div>
                        <div
                          @click="dangerDo('输入框不可填写，请选择等次')"
                          :style="
                            item1.scoring === 0 || item1.scoring
                              ? ''
                              : 'color:#B9B6B6'
                          "
                        >
                          {{
                            item1.scoring === 0 || item1.scoring
                              ? item1.scoring
                              : "请选择等次"
                          }}
                        </div>
                      </div>
                      <div
                        class="bottom-reason"
                        :style="item1.operationReason ? '' : 'color:#B9B6B6'"
                        @click="
                          () => {
                            if (item1.status === 0 || item1.status) {
                              //reasonData.name = item1.scoringThemeName;
                              //reasonData.score = item1.scoring;
                              //reasonData.num = i1;
                              //messageReason = item1.operationReason;
                              //showPopup = true;
                              setReason(item1, i1);
                            } else {
                              dangerDo('请先选择等次');
                            }
                          }
                        "
                      >
                        {{
                          item1.operationReason
                            ? item1.operationReason
                            : "请输入评分原因"
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.scoingStyle === 0">
                  <div
                    v-for="(item1, i1) in detailData"
                    :key="i1"
                    :class="
                      item1.evaluationStatus === 0
                        ? 'cc-kaoping2'
                        : 'cc-kaoping2 cc-kaoping1'
                    "
                  >
                    <div class="cck-top">
                      <div>
                        <div
                          :style="
                            item1.evaluationStatus === 0
                              ? 'color:#01F500;'
                              : 'color:#CCC;'
                          "
                        >
                          <Icon name="passed" />
                        </div>
                        <div>{{ item1.scoringThemeName }}</div>
                      </div>
                      <div>
                        <div>评分</div>
                        <div
                          @click="setReason(item1, i1)"
                          :style="
                            item1.scoring === 0 || item1.scoring
                              ? ''
                              : 'color:#B9B6B6'
                          "
                        >
                          {{
                            item1.scoring === 0 || item1.scoring
                              ? item1.scoring
                              : "输入分值"
                          }}
                        </div>
                        <!--  -->
                      </div>
                    </div>
                    <div class="cck-bottom">
                      <div
                        :style="item1.operationReason ? '' : 'color:#B9B6B6'"
                        @click="setReason(item1, i1)"
                      >
                        {{
                          item1.operationReason
                            ? item1.operationReason
                            : "请输入评分原因"
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="no-data"
            v-if="moniData.length <= 0 && showTitleid === item2.id"
          >
            <Button loading loading-type="spinner"></Button>
            <!-- <div>
              <Icon name="info-o" />
            </div> -->
            暂无相关评分项
          </div>
        </div>
      </div>
      <!-- <div v-if="this.moniData.length === 0" class="content1">
        <Icon class="warn-o" name="warn-o" />当前暂无考评对象<br />
      </div> -->
      <Popup v-model="showPopup">
        <div class="reason-title">
          <div>{{ reasonData.name }}</div>
          <div>
            <div>评分</div>
            <div
              v-if="
                outShowNum !== null && moniData[outShowNum].scoingStyle !== 0
              "
            >
              {{ reasonData.score }}
            </div>
            <input
              v-if="
                outShowNum !== null && moniData[outShowNum].scoingStyle === 0
              "
              type="number"
              placeholder="输入分值"
              v-model="reasonData.score"
              @keyup="numRule()"
            />
          </div>
        </div>
        <div
          v-if="outShowNum !== null && moniData[outShowNum].scoingStyle === 0"
          class="reason-max"
        >
          *评分范围在&nbsp;&nbsp;{{
            maxMinNumber[0] + " 到 " + maxMinNumber[1]
          }}&nbsp;&nbsp;之间
        </div>
        <div
          v-if="outShowNum !== null && moniData[outShowNum].scoingStyle === 2"
          class="reason-max"
        >
          *该项为禁止性指标，1为达标，0为不达标
        </div>
        <Field
          v-model="messageReason"
          rows="3"
          autosize
          autofocus="true"
          type="textarea"
          maxlength="50"
          placeholder="请输入详细评分原因"
          show-word-limit
        />
        <div class="reason-save" @click="saveMessage">保存</div>
      </Popup>
      <div class="goEntry" @click="goEntry">考评<br />入口</div>
      <div class="bottom1"></div>
      <div class="bottom">
        <div v-if="dateL" class="save-time">上次保存时间：{{ dateL }}</div>
        <div v-if="!dateL" class="save-time">
          暂未保存
        </div>
        <Button :loading="load" type="info" size="large" @click="goSave"
          >保存</Button
        >
        <Button
          style="margin-left:0.2rem"
          plain
          :loading="load1"
          type="info"
          size="large"
          @click="exportExcel"
          >导出</Button
        >
        <div class="b-warn">
          <span style="color:red;">注：</span
          >以最后一次保存为提交版，在截至日期前均可修改
        </div>
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
} from "vant";
import moment from "moment";
import axios from "axios";
import Vue from "vue";
import {
  findItem,
  findItems,
  saved,
  beSave,
  findState,
  findItemData,
  findSavedTime,
  progressBar,
  // exportExcel,
} from "@api/user";

// let messageReason= ""; //详细原因
export default {
  name: "scoreState",
  components: { Icon, Progress, Button, Picker, Field, Popup, Notify },
  data: function() {
    return {
      excelData: {},
      findAllitemData: {
        item: "",
        roleId: "",
        scoringItemCategory: "", //评分项类别0党政机关
      },
      findItemDatas: {},
      saveNum: -1,
      statePingfenxiang: 0, //评分项判断
      questionTitle: [
        /* "一、基础工作",
        "二、重点工作",
        "三、专项工作",
        "四、表彰、奖励、激励加分",
        "五、领导评价",
        "六、镇街评价",
        "七、禁止性指标",
        "八、全区经济社会发展实绩考核指标",
        "九、平安建设成效补充评价指标",
        "十、以上情况由区级相关部门提供", */
      ],
      questionTitle1: [
        { title: "基础工作", id: 0 },
        { title: "重点工作", id: 1 },
        { title: "专项工作", id: 2 },
        { title: "表彰、奖励、激励加分", id: 3 },
        { title: "领导评价", id: 4 },
        { title: "镇街评价", id: 5 },
        { title: "禁止性指标", id: 6 },
      ],
      questionTitle2: [
        { title: "全区经济社会发展实绩考核指标", id: 7 },
        { title: "平安建设成效补充评价指标", id: 8 },
        { title: "禁止性指标", id: 6 },
        { title: "表彰、奖励、激励加分", id: 3 },
      ],
      showTitleid: -1,
      state1: "",
      dateL: null,
      numScore: null,
      maxNumber: 2,
      minNumber: -1,
      maxMinNumber: [-1, 2],
      whichObj: "", //党政机关or街道
      showPopup: false, //详细问题原因编辑判断
      reasonData: { name: "", score: "", num: -1 },
      messageReason: "",
      allData: 0, //进度值
      load: false, //点击保存数据保存前加载
      load1: false,
      compuData: {
        优秀: 1,
        良好: 0.8,
        达标: 0.6,
        不达标: 0,
      }, //给详细问题的评分赋值
      compuDataJIN: {
        达标: 1,
        不达标: 0,
      }, //给详细问题的评分赋值
      compuData1: {
        优秀: 0,
        良好: 1,
        达标: 2,
        不达标: 3,
      }, //给详细问题的状态赋值
      compuDataJIN1: {
        达标: 0,
        不达标: 1,
      }, //给详细问题的状态赋值
      compuData2: ["优秀", "良好", "达标", "不达标"], //详细问题下拉显示
      compuDataJIN2: ["达标", "不达标"], //详细问题下拉显示
      moniData: [
        /* {
          item:
            "1、平安建设各项制度机制不健全、不完善或执行不到位的，每项扣0.2分。",
          warn: "最高扣2分",
          state0: 0,
          state1: 15,
        },
        {
          item: "2、内部安全保卫工作,按等次记分,4分。",
          warn: null,
          state0: 9,
          state1: 5,
        },
        {
          item:
            "3、平字建设改革创新举措被党中央、国务院采纳或全国推广的，每项加1分；被市委、市政府采纳或在全国、全市推广的，每项加0.5分。",
          warn: null,
          state0: 0,
          state1: 15,
        },
        {
          item: "4、领导班子成员收到党纪政务处分的，每人次扣0.2分。",
          warn: null,
          state0: 19,
          state1: 0,
        }, */
      ], //党政击观考评问题及考评进度统计
      showArr: [], //详细问题下拉评分弹框
      outShowArr: [], //党政机关考评问题点击显示详细问题判断
      outShowNum: null, //当前考评的哪个问题
      columns: ["优秀", "良好", "达标", "不达标"], //下拉评分选项
      columnsJIN: ["达标", "不达标"], //下拉评分选项
      detailData: [
        /* { state: 0, scoringThemeName: "区法院1", score: 1, reason: "加分" },
        { state: 1, scoringThemeName: "区法院2", score: 0.8, reason: "" },
        { state: null, scoringThemeName: "区法院3", score: null, reason: "" },
        { state: 1, scoringThemeName: "区法院4", score: 0.8, reason: "" },
        { state: 2, scoringThemeName: "区法院5", score: 0.6, reason: "" },
        { state: 2, scoringThemeName: "区法院6", score: 0.6, reason: "" },
        { state: 0, scoringThemeName: "区法院7", score: 1, reason: "" },
        { state: 1, scoringThemeName: "区法院8", score: 0.8, reason: "" },
        { state: 3, scoringThemeName: "区法院9", score: 0, reason: "" }, */
      ], //详细问题的考评对象
    };
  },
  watch: {},
  methods: {
    download(data) {
      if (!data) {
        return;
      }
      const url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute(
        "download",
        `等次评价表_${moment(Date.parse(new Date())).format("YYYY-MM-DD")}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href); // 释放URL 对象
      document.body.removeChild(link);
      link = null;
    },
    exportExcel() {
      this.load1 = true;
      /* findItemData(this.findItemDatas)
        .then((res) => {
          console.log(res);
          let state = false;
          res.map((v) => {
            if (v.state0 !== "0") {
              state = true;
            }
          });
          if (state) {
            Notify({
              type: "warning",
              message: "评分暂未完成，请考评后进行导出",
            });
          } else { */
      axios({
        method: "post",
        url: "/api/role/export",
        responseType: "arraybuffer",
        data: this.excelData,
        /* headers: {
          token: this.token,
        }, */
      })
        .then((res) => {
          console.log(res.data);
          this.download(res.data); // 注意，这里一定是res.data，不然导出的excel会乱码
          // console.log(err);
        })
        .catch(() => {
          this.$dialog.error("导出失败，暂无数据");
        })
        .finally(() => {
          this.load1 = false;
        });
      /* exportExcel(this.excelData)
              .then((res) => {
                // window.open(res.url);
              })
              .catch(() => {
                this.$dialog.error("导出失败，暂无数据");
              }); */
      /* }
        })
        .catch(() => {
          this.$dialog.error("导出失败,请刷新重试");
        })
        .finally(() => {
          this.load1 = false;
          this.progressBar(this.findItemDatas);
        }); */
    },
    setReason(item1, i1) {
      this.reasonData.name = item1.scoringThemeName;
      this.reasonData.score = item1.scoring;
      this.reasonData.num = i1;
      this.messageReason = item1.operationReason;
      this.showPopup = true;
      if (this.moniData[this.outShowNum].scoingStyle === 0) {
        this.maxMinNumber = item1.threshold.split(",");

        console.log(a);
      }
    },
    SearchData(i2) {
      this.moniData = [];
      this.outShowNum = null;
      if (this.showTitleid === i2) {
        this.showTitleid = -1;
        if (this.saveNum !== -1) {
          this.saved(this.detailData[this.saveNum]);
          this.saveNum = -1;
        }
      } else {
        this.showTitleid = i2;
        this.findAllitemData.title = i2;
        this.findAllitem(this.findAllitemData);
      }

      //点击机关考评问题对象时进行以下操作
      //给outShowArr进行赋值，方便之后操作
      this.outShowArr = [];
      this.moniData.map(() => {
        this.outShowArr.push(false);
      });
    },
    numRule(value) {
      console.log(value);
      if (this.reasonData.score < 0) {
        let a = this.reasonData.score * -1;
        a = a.toString().match(/^\d+(?:\.\d{0,2})?/)[0];
        this.reasonData.score = a * -1;
      } else {
        this.reasonData.score = this.reasonData.score
          .toString()
          .match(/^\d+(?:\.\d{0,2})?/)[0];
      }

      if (this.reasonData.score > this.maxMinNumber[1]) {
        this.reasonData.score = this.maxMinNumber[1];
      }
      if (this.reasonData.score < this.maxMinNumber[0]) {
        this.reasonData.score = this.maxMinNumber[0];
      }
    },
    goSave() {
      this.load = true;

      if (this.saveNum !== -1) {
        // console.log("暂存", this.detailData[this.saveNum]);
        this.saved(this.detailData[this.saveNum]);
        this.saveNum = -1;
      }
      setTimeout(this.beSave(), 1000);
    },
    beSave() {
      findItemData(this.findItemDatas)
        .then((res) => {
          console.log(res);
          let state = false;
          res.map((v) => {
            if (v.state0 !== "0") {
              state = true;
            }
          });
          if (state) {
            Notify({
              type: "warning",
              message: "评分暂未完成，请考评后进行保存",
            });
          } else {
            beSave()
              .then((res) => {
                console.log(res);
                Toast.success("保存成功");
              })
              .catch(() => {
                this.$dialog.error("保存失败,请刷新重试");
              });
          }
        })
        .catch(() => {
          this.$dialog.error("保存失败,请刷新重试");
        })
        .finally(() => {
          this.load = false;
          this.progressBar(this.findItemDatas);
        });
    },
    goEntry() {
      this.$router.push("/scoreEntry");
    },
    onConfirm(value) {
      if (value === "优秀") {
        let num = 0;
        let all = this.detailData.length;
        this.detailData.map((v, i) => {
          if (v.status === 0) {
            num++;
          }
        });
        if (((num + 1) * 1.0) / all > 0.4) {
          Notify({ type: "danger", message: "已超过优秀指标，请重新选择" });
          return;
        }
      }
      if (value === "良好") {
        let num = 0;
        let all = this.detailData.length;
        this.detailData.map((v, i) => {
          if (v.status === 1) {
            num++;
          }
        });
        if (((num + 1) * 1.0) / all > 0.5) {
          Notify({ type: "danger", message: "已超过良好指标，请重新选择" });
          return;
        }
      }
      /* this.showArr.map((v, i) => {
        if (v) {
          if (this.detailData[i].scoingStyle === 2) {
            this.detailData[i].complianceStatus = this.detailData[i].status;
          }
        }
      }); */

      this.showArr.map((v, i) => {
        if (v) {
          /* if (this.saveNum === -1) {
            this.saveNum = i;
          } else {
            this.saved(this.detailData[this.saveNum]);
            this.saveNum = i;
          } */
          this.saved(this.detailData[i]);
          Vue.set(this.showArr, i, false);
          if (this.moniData[this.outShowNum].scoingStyle === 1) {
            this.detailData[i].status = this.compuData1[value];
            this.detailData[i].scoring =
              this.compuData[value] * this.detailData[i].bottomScore;
          } else {
            this.detailData[i].status = this.compuDataJIN1[value];
            this.detailData[i].complianceStatus = this.compuDataJIN1[value];
            this.detailData[i].scoring = this.compuDataJIN[value];
          }
        }
      });

      //暂存对象操作
      /* let num = this.detailData.length;
      this.detailData.map((v) => {
        if (v.state === 0 || v.state) {
          num--;
        }
      });
      this.moniData[this.outShowNum].state0 = num;
      this.moniData[this.outShowNum].state1 = this.detailData.length - num; */
    },
    dangerDo(text) {
      Notify({ type: "danger", message: text });
    },
    //详细问题的点击
    setShowFalse(num, state) {
      this.showArr.map((v) => {
        if (v) {
          v = false;
        }
      });
      Vue.set(this.showArr, num, state);
    },

    //机关问题的点击
    setOutShowFalse(num, state) {
      //点击进行保存操作
      //移至点击显示详细问题处，产生相应问题再做相应操作
      if (this.saveNum !== -1) {
        // console.log("暂存", this.detailData[this.saveNum]);
        this.saved(this.detailData[this.saveNum]);
        this.saveNum = -1;
      }
      if (state) {
        this.outShowNum = num;
        console.log(this.moniData[num]);
        this.findItems(this.moniData[num].roleId, this.moniData[num].id);
      } else {
        this.outShowNum = null;
      }

      this.outShowArr.map((v, i) => {
        if (v) {
          Vue.set(this.outShowArr, i, false);
        }
      });
      Vue.set(this.outShowArr, num, state);
    },
    saveMessage() {
      //保存评分原因
      if (!this.reasonData.score && this.reasonData.score !== 0) {
        Notify({ type: "danger", message: "未进行评分或格式错误，请重新填写" });
        return;
      }
      if (isNaN(this.reasonData.score)) {
        Notify({ type: "danger", message: "评分格式有误，请重新填写" });
        return;
      }
      this.showPopup = false;
      this.detailData[this.reasonData.num].operationReason = this.messageReason;
      this.detailData[this.reasonData.num].scoring = this.reasonData.score;
      /* if (this.moniData[this.outShowNum].scoingStyle === 0) {
        //做保存处理
        // console.log("暂存：", this.detailData[this.reasonData.num]);
        this.saved(this.detailData[this.reasonData.num]);
      } */
      this.saved(this.detailData[this.reasonData.num]);
    },
    //查找所有题目和评分状态
    findAllitem() {
      findItem(this.findAllitemData)
        .then((res) => {
          console.log(res);
          this.moniData = JSON.parse(JSON.stringify(res)) || [];
        })
        .catch(() => {
          this.$dialog.error("查询失败，请重新登录");
          this.$router.replace({ path: "/login" });
        })
        .finally(() => {
          console.log(this.moniData, "this.moniData");
          if (this.outShowNum || this.outShowNum === 0) {
            this.findItems(
              this.moniData[this.outShowNum].roleId,
              this.moniData[this.outShowNum].id
            );
            this.findSavedTime(this.moniData[this.outShowNum].roleId);
          }
          /* if (this.moniData.length > 0) {
            this.findState(this.moniData[0].roleId, this.moniData[0].id);
          } */
        });
    },
    findItemData() {
      findItemData(this.findItemDatas)
        .then((res) => {
          console.log(res);
          this.moniData = JSON.parse(JSON.stringify(res)) || [];
        })
        .catch(() => {
          this.$dialog.error("查询失败，请重新登录");
          this.$router.replace({ path: "/login" });
        })
        .finally(() => {
          console.log(this.moniData, "this.moniData");
          if (this.outShowNum || this.outShowNum === 0) {
            this.findItems(
              this.moniData[this.outShowNum].roleId,
              this.moniData[this.outShowNum].id
            );
          }
          /* if (this.moniData.length > 0) {
            this.findState(this.moniData[0].roleId, this.moniData[0].id);
          } */
        });
    },
    findItems(roleId, scoringItemId) {
      findItems({ roleId, scoringItemId })
        .then((res1) => {
          console.log(res1);
          this.detailData = JSON.parse(JSON.stringify(res1));
          this.showArr = [];
          this.detailData.map(() => {
            this.showArr.push(false);
          });
        })
        .catch(() => {
          this.$dialog.error("考评失败，请重新登录");
          // this.$router.replace({ path: "/login" });
        });
    },
    saved(data) {
      saved(data)
        .then((res) => {
          console.log(res);
        })
        .catch(() => {
          this.$dialog.error("当前数据疑似丢失,请不要频繁操作");
        })
        .finally(() => {
          this.findAllitem(this.findAllitemData);
        });
    },
    findSavedTime(data) {
      findSavedTime({ id: data })
        .then((res) => {
          if (Object.getOwnPropertyNames(res).length !== 0) {
            this.dateL = res;
          } else {
            this.dateL = null;
          }
        })
        .catch(() => {
          this.dateL = null;
        });
    },
    progressBar(data) {
      progressBar(data)
        .then((res) => {
          this.allData = res.progress || 0;
        })
        .catch(() => {
          this.allData = 0;
        });
    },

    findState(roleId, scoringItemId) {
      let i = this.statePingfenxiang;
      findState({ roleId: roleId, scoringItemId: scoringItemId })
        .then((res1) => {
          // return res1
          this.statePingfenxiang++;
          // this.statePingfenxiang[i].state1 = res1.ok;
          this.moniData[i].state0 = res1.notOk;
          this.moniData[i].state1 = res1.ok;
          /* console.log(res1);
          this.detailData = JSON.parse(JSON.stringify(res1))
          this.showArr = [];
          this.detailData.map(() => {
            this.showArr.push(false);
          }); */
        })
        .catch(() => {
          this.$dialog.error("考评失败，请重新登录");
          // this.$router.replace({ path: "/login" });
        })
        .finally(() => {
          if (this.statePingfenxiang >= this.moniData.length) {
            this.statePingfenxiang = 0;
            console.log(this.outShowNum);
            if (this.outShowNum || this.outShowNum === 0) {
              this.findItems(
                this.moniData[this.outShowNum].roleId,
                this.moniData[this.outShowNum].id
              );
            }
          } else {
            this.findState(
              this.moniData[this.statePingfenxiang].roleId,
              this.moniData[this.statePingfenxiang].id
            );
          }
        });
    },
  },
  mounted() {
    let loginData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!loginData) {
      this.$router.push("/login");
    }
    this.excelData = { role: loginData.role, roleId: loginData.id };
    if (this.$route.query.name) {
      this.whichObj = this.$route.query.name;
      this.findAllitemData = {
        roleId: loginData.id,
      };
      this.findSavedTime(loginData.id);
      this.questionTitle = [];
      if (this.whichObj === "党政机关") {
        this.questionTitle = this.questionTitle1; //.slice(0, 7);
        this.findAllitemData.scoringItemCategory = 0;
      } else {
        this.questionTitle = this.questionTitle2; //.slice(6);
        this.findAllitemData.scoringItemCategory = 1;
      }
      this.findItemDatas = JSON.parse(JSON.stringify(this.findAllitemData));
      this.progressBar(this.findItemDatas);
    } else {
      this.$router.push("scoreEntry");
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
  z-index: 8;
}
.top {
  position: fixed;
  background-color: #f1efef;
  width: 100%;
  height: 2rem;
  color: black;
  padding: 0 0.2rem;
  top: 0;
  left: 0;
  z-index: 99;
}
.top1 {
  height: 2rem;
}
.top-title {
  text-align: center;
  font-weight: bold;
  margin-top: 0.1rem;
}
.top-far {
  display: flex;
  font-weight: bold;
  margin-top: 0.2rem;
}
.top-far > div:first-child {
  /* background-color: red; */
  width: 1.8rem;
  height: 0.5rem;
  line-height: 0.5rem;
}
.top-color {
  background-color: #ccc;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-left: 0.3rem;
  width: 5rem;
  text-align: right;
  padding-right: 0.2rem;
  color: white;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
}
.top-color > div {
  position: absolute;
  width: 5rem;
  height: 0.5rem;
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
  display: flex;
  justify-content: center;
}
.top-class > div {
  width: 2.2rem;
  margin: 0.2rem;
  display: flex;
  justify-content: space-around;
}
.top-class > div > div {
  line-height: 0.44rem;
}
.top-class > div > div:first-child {
  font-size: 0.44rem;
}
.content {
  padding: 0 0.6rem;
}
.content1 {
  margin: 2rem auto;
  text-align: center;
  color: #f5bd00;
  font-weight: bold;
  line-height: 0.5rem;
  position: relative;
}
.no-data {
  /* padding: 0.2rem; */
  height: 1rem;
  line-height: 1rem;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
  margin: 0.1rem 0;
  text-align: center;
  border-radius: 0.1rem;
  color: #f5bd00;
  display: flex;
  justify-content: center;
  align-content: center;
}
/* .no-data > div {
  color: red;
  margin: 0.05rem 0.05rem;
  font-size: 0.44rem;
  line-height: 1rem;
} */
.no-data > .van-button {
  padding: 0;
  margin: 0 0.1rem;
  border: 0;
  height: 0.96rem;
}
.no-data > .van-button > div > div > span {
  color: red !important;
}
.warn-o {
  font-size: 0.5rem;
  position: absolute;
  top: -0.05rem;
  left: 2rem;
  color: red;
  /* line-height: 0.5rem; */
}
.content > div > div:last-child {
  margin-bottom: 0;
}
.c-title {
  text-align: center;
  font-weight: bold;
  font-size: 0.3rem;
  /* margin: 0.1rem; */
  padding: 0.15rem 0rem;
  margin-top: 0.3rem;
  border-radius: 0.1rem;
  background-color: white;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
  position: relative;
}
.c-title > div {
  position: absolute;
  right: 0.1rem;
  font-size: 0.44rem;
  top: 0.14rem;
}
.c-content {
  margin: 0.1rem auto 0.5rem;
  background-color: #0892e3;
  border-radius: 0.1rem;
  padding: 0.1rem 0.1rem 0.15rem 0.6rem;
  color: white;
  position: relative;
}
.c-content1 {
  background-color: #fff;
  /* color: #bbb; */
  color: #b66f05;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.c-c-isOK {
  font-size: 0.44rem;
  position: absolute;
  left: 0.06rem;
  top: 50%;
  margin-top: -0.22rem;
}
.c-c-title {
  display: flex;
  justify-content: center;
}
.c-c-title > div {
  margin: 0 0.1rem;
}
.c-c-content {
  line-height: 0.5rem;
}
.ok-true {
  color: #3898da;
  font-weight: bold;
  /* text-align: center; */
}
.ok-right {
  color: #07f71b;
  font-weight: bold;
  /* text-align: center; */
}
.ok-false {
  font-weight: bold;
  color: #e30829;
  /* text-align: center; */
}
.bottom {
  position: fixed;
  background-color: #f1efef;
  width: 100%;
  height: 1.4rem;
  color: black;
  padding: 0 0.2rem;
  bottom: 0;
  text-align: center;
  left: 0;
  z-index: 9;
}
.goEntry {
  position: fixed;
  z-index: 10;
  border-radius: 50%;
  background-color: white;
  color: #0885ce;
  bottom: 1.2rem;
  right: 0.03rem;
  width: 0.66rem;
  height: 0.66rem;
  text-align: center;
  line-height: 0.33rem;
  box-sizing: content-box;
  padding: 0.2rem;
  border: 0.02rem solid rgba(0, 0, 0, 0.2);
  box-shadow: 0.04rem 0.1rem 0.1rem rgba(0, 0, 0, 0.35);
}
.bottom1 {
  height: 1.4rem;
}
.save-time {
  text-align: center;
  font-size: 0.24rem;
  color: #787575;
}
.b-save {
  border-radius: 0.08rem;
  height: 0.8rem;
  line-height: 0.8rem;
  width: 5.5rem;
  border: 0.01rem solid #0885ce;
  color: #0885ce;
  font-weight: 600;
  margin: 0 auto;
  text-align: center;
}
.b-warn {
  color: #f5bd00;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.44rem;
}
::v-deep .van-button--large {
  height: 0.7rem;
  width: 2.5rem;
  border-radius: 0.1rem;
  font-size: 0.32rem;
  /* margin: 0.1rem; */
}

/* 评分详细问题样式 */

.cc-kaoping > div,
.cc-kaoping2 > div {
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0;
}
.cc-kaoping .cck-top > div:first-child,
.cc-kaoping2 .cck-top > div:first-child {
  width: 3.8rem;
  height: 0.64rem;
  padding: 0.1rem 0;
  display: flex;
  background-color: #0892e3;
  color: white;
  /* justify-content: space-around; */
  border-radius: 0.1rem;
  border: 1px solid #0892e3;
}
.cc-kaoping1 .cck-top > div:first-child {
  background-color: #fff;
  color: #bbb;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.cc-kaoping .cck-top > div:nth-child(2) {
  position: relative;
}
.cc-kaoping2 .cck-top > div:nth-child(2) {
  display: flex;
  justify-content: center;
  height: 0.64rem;
  line-height: 0.64rem;
}
.cc-kaoping2 .cck-top > div:nth-child(2) > div:first-child {
  font-weight: bold;
  margin-right: 0.08rem;
}
.cc-kaoping2 .cck-top > div:nth-child(2) > div:last-child {
  color: #0885ce;
  font-size: 0.24rem;
  width: 1.6rem;
  text-align: center;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
}
.cc-kaoping2 .cck-top > div:nth-child(2) > input {
  color: #0885ce;
  font-size: 0.24rem;
  width: 1.6rem;
  text-align: center;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
}
.cc-kaoping .cck-bottom > div:nth-child(1) {
  display: flex;
  justify-content: center;
  height: 0.64rem;
  line-height: 0.64rem;
}
.cc-kaoping .cck-bottom > div:nth-child(1) > div:first-child {
  font-weight: bold;
  margin-right: 0.08rem;
}
.reason-title {
  display: flex;
  justify-content: space-around;
  margin-top: 0.3rem;
  height: 0.64rem;
  line-height: 0.64rem;
}

.reason-max {
  color: red;
  padding: 0.1rem 0.6rem 0;
  font-size: 0.24rem;
}

.reason-title > div:nth-child(2) {
  display: flex;
  justify-content: center;
  height: 0.64rem;
  line-height: 0.64rem;
}
.reason-title > div:nth-child(2) > div:first-child {
  font-weight: bold;
  margin-right: 0.08rem;
}
.reason-title > div:nth-child(2) > div:nth-child(2) {
  color: #0885ce;
  font-size: 0.24rem;
  width: 1.6rem;
  text-align: center;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
}
.reason-title > div:nth-child(2) > input {
  color: #0885ce;
  font-size: 0.24rem;
  width: 1.6rem;
  text-align: center;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
}
.reason-title > div:first-child {
  background-color: #0885ce;
  padding: 0 0.2rem;
  max-width: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 0.1rem;
  color: white;
}
.reason-save {
  border: 0.01rem solid #0885ce;
  margin: 0 auto;
  width: 5.5rem;
  padding: 0.2rem 0;
  color: #0885ce;
  border-radius: 0.1rem;
  text-align: center;
}
.cc-kaoping .cck-bottom > div:nth-child(1) > div:last-child {
  color: #0885ce;
  font-size: 0.24rem;
  width: 1.6rem;
  text-align: center;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
}
.cc-kaoping .cck-bottom > .bottom-reason,
.cc-kaoping2 .cck-bottom > div:nth-child(1) {
  height: 0.64rem;
  line-height: 0.64rem;
  color: #0885ce;
  font-size: 0.24rem;
  max-width: 3.8rem;
  min-width: 1.92rem;
  padding: 0 0.1rem;
  text-align: center;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cc-kaoping2 .cck-bottom > div:nth-child(1) {
  /* width: 100%; */
  max-width: 100%;
}
.down-sec {
  position: absolute;
  right: 0.1rem;
  top: 50%;
  margin-top: -0.18rem;
  font-size: 0.32rem;
  z-index: 1;
  color: #0885ce;
}
.cc-kaoping .cck-top > div:first-child > div {
  line-height: 0.44rem;
}
.cc-kaoping .cck-top > div:first-child > div:first-child {
  font-size: 0.44rem;
  margin-right: 0.1rem;
}
.cc-kaoping .cck-top > div:first-child > div:last-child {
  width: 3.2rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cc-kaoping2 .cck-top > div:first-child > div {
  line-height: 0.44rem;
}
.cc-kaoping2 .cck-top > div:first-child > div:first-child {
  font-size: 0.44rem;
  margin-right: 0.1rem;
}
.cc-kaoping2 .cck-top > div:first-child > div:last-child {
  width: 3.2rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
::v-deep .van-cell {
  width: 1.7rem;
  height: 0.64rem;
  padding: 0;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
  border-radius: 0.1rem;
}
::v-deep .van-field__control {
  color: #0885ce;
  height: 0.64rem;
  line-height: 0.64rem;
  padding-left: 0.2rem;
  font-size: 0.26rem;
}
::v-deep .van-picker-column__item {
  color: #0885ce;
}
::v-deep .van-popup--center {
  /* height: 3rem !important; */
  width: 6.5rem;
  height: 5.3rem;
}
::v-deep .van-popup--center > .van-cell {
  width: 5.5rem;
  height: 2.4rem;
  margin: 0.3rem auto;
  font-size: 0.44rem;
  line-height: 0.44rem;
}
.textInput {
  width: 5.5rem;
  height: 2.4rem;
  margin: 0rem auto 0.3rem;
  font-size: 0.44rem;
  line-height: 0.44rem;
  border: 0.01rem solid rgba(0, 0, 0, 0.2);
  overflow: auto;
  font-size: 0.26rem;
  padding: 0.1rem;
}
::v-deep .van-popup--center > .van-cell .van-field__control {
  color: black;
  padding: 0 0.1rem;
  height: 1.8rem;
}
.textInputSpan {
  padding-left: 0.5rem;
  margin-top: 0.3rem;
  display: inline-block;
}
</style>
