<template>
  <div class="first_container">
    <section class="top_container">
      <img style="width:100%;" src="../../static/top1.jpg" alt="">
      <img style="width:100%;" src="../../static/top2.jpg" alt="">
      <ul class="sign_ul">
        <li v-for="(item,index) in allData" :key="index">
          <img v-if="item.status == 1" src="../../static/outsign.png" alt="">
          <img v-else-if="item.status == -1" src="../../static/outTime.png" alt="">
          <img v-else src="../../static/sign.png" @click="togetSign(item)" alt="">
        </li>
      </ul>
      <img style="width:100%;" src="../../static/top3.jpg" alt="">
      <!--时钟部分-->
      <clockContent @showTimeAlert="showTimeAlert"></clockContent>

      <!--clock弹窗-->
      <timeAlert v-if="timeAlert1" @closeTimeAlert="closeTimeAlert" @showGetStart='showGetStart'></timeAlert>

      <img style="width:100%;" src="../../static/head.jpg" alt="">
      <!--打榜部分-->
      <div class="call_box">
        <ul class="call_ul">
          <li v-for="(item,index) in call" :key="index">
            <div class="tocallBox">
              <p>{{item['callNum']}}</p>
              <img @click="starfirst(item['bid'],index)" src="../../static/call.png" alt="">
            </div>

          </li>
        </ul>
        <!--打榜弹窗-->
        <div v-if="callAlert" class="callAlertBox">
          <div class="callAlertBg">
            <img src="../../static/call_alert.png" alt="">
            <div class="close_call_alert" @click="closeCallAlert"></div>
            <div class="toLocationLink" @click="toOTLink"></div>
          </div>
        </div>
      </div>

      <!--底部部分-->
      <div class="part_box">
        <img src="../../static/h5_part1.jpg" alt="">
        <img src="../../static/h5_part2.jpg" alt="">
        <!--<img src="../../static/h5_part3_1.jpg" alt="">-->
        <!--轮播图部分-->
        <swiper :options="swiperOption" ref="mySwiper" :class>
          <!-- 这部分放你要渲染的那些内容 -->
          <!--<swiper-slide v-for="(i,index) in arrItem" :key="index">-->
            <!--<img class="img" style="height:5.32rem;" :src="i.imgUrl">-->
          <!--</swiper-slide>-->
          <swiper-slide>
            <img class="img" style="height:5.32rem;" src="../../static/h5_part3_1.jpg" >
          </swiper-slide>
          <swiper-slide>
            <img class="img" style="height:5.32rem;" src="../../static/h5_part3_2.jpg" >
          </swiper-slide>
          <swiper-slide>
            <img class="img" style="height:5.32rem;" src="../../static/h5_part3_3.jpg" >
          </swiper-slide>

          <!-- 这是轮播的小圆点 -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <img src="../../static/h5_part4.jpg" alt="">

        <div v-if="ifShowBtn" @click="toFindBtn" style="width:100%;text-align: center;position:fixed;bottom:0;z-index:1000">
          <img src="../../static/findBtn.png" alt="">
        </div>
        <div  class="showSucess" v-show="isSucess">
          <span>{{shareWord}}</span>
        </div>
      </div>
    </section>
    <transition name='fade'>
      <section class="worimg" v-if="showWorming">
            {{worimg}}
      </section>
    </transition>
  </div>
</template>
<script>
import clockContent from "@/components/clock.vue";
import timeAlert from "@/components/timeAlert.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ajaxData from "../config/ajax.js";
import DataManager from "../dataManager/data";
import md5 from "../config/md5";

export default {
  data() {
    return {
      ifShowBtn:true,
      timeAlert1: false,
      callAlert: false,
      call_num: "",
      isSucess: false,
      changeStyle: true,
      shareWord: "",
      arrItem: [
        {
          imgUrl: "../../static/h5_part3_1.jpg"
        },
        {
          imgUrl: "../../static/h5_part3_2.jpg"
        },
        {
          imgUrl: "../../static/h5_part3_3.jpg"
        }
      ],
      swiperOption: {
        preloadImages: false,   //默认为true，Swiper会强制加载所有图片。
        paginationClickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        speed: 1000, //滑动速度，即slider自动滑动开始到结束的时间（单位ms），也是触摸滑动时释放至贴合的时间。
        loop: true,
        preventLinksPropagation: false,   //阻止click冒泡。拖动Swiper时阻止click事件。
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          delay: 1500,
          disableOnInteraction: false    //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        }

//        loop:true,
//        loopedSlides: 2,
//        observer:true,
//        observeParents:true,
//        slidesPerview:'auto',
//        effect:'slide',
//        direction:'horizontal',
//        pagination:{
//            el:'.swiper-pagination',
//            bulletClass:'pagination-bullet-self',
//            bulletActiveClass:'pagination-bullet-active-self'
//        }
      },

      allData: {},
      worimg: "",
      showWorming: false,
      call: []
    };
  },
  mounted() {
    this.init();
    let data = {
      user_id: DataManager.user_id,
      group_openid: DataManager.group_openid,
      bid: DataManager.bid,
      type:6,
      ad_id: DataManager.ad_id
    };
    data.sign = md5.makeSign(data);
    new ajaxData().sendJSON(
      "https://sf.xintiao100.com/auBehavior",
      data,
      res => {
      }
    );
  },
  swiper() {
    return this.$refs.mySwiper.swiper;
  },

  components: { clockContent, timeAlert, swiper, swiperSlide },

  methods: {

    init() {
      //获取签到信息
      let data = {
        user_id: DataManager.user_id,
        group_openid: DataManager.group_openid,
        bid: DataManager.bid
      };
      data.sign = md5.makeSign(data);
      new ajaxData().sendJSON(
        "https://sf.xintiao100.com/otSignInfo",
        data,
        res => {
          if (res["st"] == 1) {
            this.allData = res["data"];
            for (let i in res["call"]) {
              let bid = i.split("_")[1];
              let callNum = res["call"][i];
              let data = {
                bid: bid,
                callNum: callNum
              };
              this.call.push(data);
            }
          } else if (res["st"] == 2) {
            console.log(res, "获取签到信息失败！");
          }
        }
      );
    },

    // 签到点击
    togetSign(item) {
      if (!item.sign_in) {
        this.showWorming = true;
        this.worimg = "还没到时间哦";
        setTimeout(() => {
          this.showWorming = false;
        }, 2000);
        return;
      }
      let data = {
        user_id: DataManager.user_id,
        group_openid: DataManager.group_openid,
        bid: DataManager.bid
      };
      data.sign = md5.makeSign(data);
      new ajaxData().sendJSON(
        "https://sf.xintiao100.com/otSignIn",
        data,
        res => {
          if (res["st"] == 1) {
            this.init();
            //gift=true时，礼物可领取
            if (res["data"]["gift"]) {
              this.showWorming = true;
              this.worimg = "获取的OT同款礼物";
              setTimeout(() => {
                this.showWorming = false;
              }, 2000);
            }
          } else if (res["st"] == 2) {
            console.log("签到出错！");
          }
        }
      );
    },

    //转动到520弹窗
    showTimeAlert() {
      let data = {
        user_id: DataManager.user_id,
        group_openid: DataManager.group_openid,
        bid: DataManager.bid
      };
      data.sign = md5.makeSign(data);
      let self = this;
      new ajaxData().sendJSON(
        "https://sf.xintiao100.com/otIncreaseStarHot",
        data,
        res => {
          if (res["st"] == 1) {
            if (res["data"]["status"]) {
              self.showWorming = true;
              self.worimg = "成功为爱豆增加520热度";
              setTimeout(() => {
                self.showWorming = false;
              }, 2000);
              self.timeAlert1 = true;
              self.ifShowBtn = false
            } else {
              self.showWorming = true;
              self.worimg = "今日已领取过";
              setTimeout(() => {
                self.showWorming = false;
              }, 2000);
              self.timeAlert1 = true;
              self.ifShowBtn = false;
            }
          }
        }
      );
    },
    closeTimeAlert() {
      this.timeAlert1 = false;
      this.ifShowBtn = true;
    },

    // 520 弹窗上的按钮点击
    showGetStart(str) {
      this.showWorming = true;
      this.worimg = str;
      setTimeout(() => {
        this.showWorming = false;
      }, 2000);
    },

    //打call弹窗
    starfirst(bid, index) {
      let data = {
        user_id: DataManager.user_id,
        group_openid: DataManager.group_openid,
        bid: bid
      };
      data.sign = md5.makeSign(data);
      let self = this;
      new ajaxData().sendJSON(
        "https://sf.xintiao100.com/otCall",
        data,
        res => {
          if (res["st"] == 1) {
            this.$set(
              this.call[index],
              "callNum",
              (this.call[index]["callNum"] += 1)
            );
            this.showWorming = true;
            this.worimg = "打call成功";
            setTimeout(() => {
              this.showWorming = false;
            }, 2000);
            if (res["data"]["pop"]) {
              this.callAlert = true;
              this.ifShowBtn = false
            }
          }
          if (res["st"] == 2) {
//            this.showWorming = true;
//            this.worimg = "今天次数已用完";
            setTimeout(() => {
              this.showWorming = false;
            }, 1000);
          }
          if (res["data"]["pop"]) {
            this.callAlert = true;
            this.ifShowBtn = false
          }
        }
      );
    },
    // 关闭打call 弹窗
    closeCallAlert() {
      this.callAlert = false;
      this.ifShowBtn = true;
    },

    //查看同款
    toFindBtn() {
      let data = {
        user_id: DataManager.user_id,
        group_openid: DataManager.group_openid,
        bid: DataManager.bid,
        type: 13,
        ad_id: DataManager.ad_id
      };
      data.sign = md5.makeSign(data);
      new ajaxData().sendJSON(
        "https://sf.xintiao100.com/auBehavior",
        data,
        res => {
          window.location.href = 'http://render.m.taobao.com/shop/container-page.htm?wh_weex=true&pathInfo=shop/activity&userId=3554586239&shopId=415919561&pageId=168281286&showHeader=true'
        }
      );
    },
    //弹窗查看同款
    toOTLink() {
      let data = {
        user_id: DataManager.user_id,
        group_openid: DataManager.group_openid,
        bid: DataManager.bid,
        type: 12,
        ad_id: DataManager.ad_id
      };
      data.sign = md5.makeSign(data);
      new ajaxData().sendJSON(
        "https://sf.xintiao100.com/auBehavior",
        data,
        res => {
           window.location.href = 'http://render.m.taobao.com/shop/container-page.htm?wh_weex=true&pathInfo=shop/activity&userId=3554586239&shopId=415919561&pageId=168281286&showHeader=true'
        }
      );
    }
  }
};
</script>
<style>
.first_container {
  width: 100%;
  height: 100%;
}

.top_container {
  width: 100%;
}

.top_container .sign_ul {
  padding-left: 0.53rem;
  padding-right: 0.53rem;
  display: flex;
  justify-content: flex-start;
  -webkit-justify-content: flex-start;
}

.top_container ul li {
  width: calc(100% - 0.53 * 2);
}

.top_container ul li img {
  width: 1.85rem;
  margin-right: 0.3rem;
  margin-left: 0.08rem;
}

.time_box {
  width: 100%;
  height: 7.44rem;
  background: url("../../static/timeBg.jpg") no-repeat;
  background-size: 100% 100%;
}

.call_box {
  width: 100%;
  height: 5.29rem;
  background: url("../../static/starNumber.jpg") no-repeat;
  background-size: 100% 100%;
}

.part_box {
  width: 100%;
}

.part_box img {
  width: 100%;
}

.swiper-container {
  width: 100%;
  height: 5.32rem;
}

.call_ul {
  width: calc(100% - 0.53 * 2);
  height: 5rem;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
}

.call_ul li {
  display: flex;
  justify-content: space-between;
  -webkit-justify-content: center;

  width: 100%;
  height: 1.8rem;
  font-size: 0.7rem;
  color: #fff;
  font-weight: bold;
}

.call_ul li p {
  padding-top: 0.8rem;
  margin-right: 0.9rem;
  font-style: italic;
  margin-left: 2.2rem;
  text-align: center;
  line-height: 1.2;
}

.call_ul li img {
  padding-top: 0.5rem;
  width: 1.87rem;
  height: 0.74rem;
}

/*打call*/
.callAlertBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-justify-content: center;
  flex-direction: column;
  z-index: 100;
}

.callAlertBg {
  position: relative;
  /*height:5.3rem;*/
}

.callAlertBg img {
  height: 6.35rem;
  z-index: 101;
}

/*关闭打call弹窗*/
.close_call_alert {
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  top: 0;
  right: 0.1rem;
  z-index: 101;
}

/*打call弹窗点击*/
.toLocationLink {
  position: absolute;
  bottom: 0.6rem;
  left: 0.15rem;
  width: 4.88rem;
  height: 0.95rem;
}

.showSucess {
  position: fixed;
  width: 100%;
  text-align: center;
  z-index: 100;
  bottom: 50%;
  font-size: 0.8rem;
  color: white;
  animation: shareScess 3s ease;
  -webkit-animation: shareScess 3s ease;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
}

@keyframes shareScess {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-10rem);
    opacity: 0;
  }
}

.worimg {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  text-align: center;
  z-index: 100;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 0.2rem;
  font-size: 0.4rem;
  text-align: center;
  min-width: 4.5rem;
  z-index: 112;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-to,
.fade-leave-to {
  opacity: 1;
}
.fade-enter,
.fade-leave {
  opacity: 0;
}
  .tocallBox{
    width:10rem;
    line-height:1rem;
    height:1rem;
    display:flex;
    -webkit-justify-content: center;
    justify-content: center;

  }
</style>
