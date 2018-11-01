<template>
    <div class="time_alert_content">
        <div class="time_alert_content_div">
            <img class="starImg" :src="starImgStr" alt="">
            <img class="closeAlert" @click="toCloseAlert" src="../../static/close_btn.png" alt="">
            <div class="toLocation_btn" @click="toLocation">
                <img  src="../../static/alert1_btn2.png"  alt="">
            </div>
            <!--<img class="right_img" src="../../static/alert1_right.png" alt="">-->
            <div class="showAlertSucess" v-show="isActiveSuccess">
              <span>{{ activeWord }}</span>
            </div>
        </div>
    </div>
</template>
<script >
import ajaxData from "../config/ajax";
import DataManager from "../dataManager/data";
import md5 from "../config/md5";
export default {
  data() {
    return {
      starImgStr: "",
      isCanClick: true,
      isActiveSuccess: false,
      activeWord: "幸运星+20"
    };
  },
  mounted() {
    this.$emit("increment2", "1");
    this.starImgStr = `static/${DataManager.bid}.png`
  },
  methods: {
    toCloseAlert() {
      this.$emit("closeTimeAlert"); //关闭弹窗的事件，通过emit通知父组件关闭弹窗
    },
    toLocation() {
      this.isCanClick = false;
      let data = {
        user_id: DataManager.user_id,
        group_openid: DataManager.group_openid,
        bid: DataManager.bid,
        type: 11,
        ad_id: DataManager.ad_id
      };
      data.sign = md5.makeSign(data);
      new ajaxData().sendJSON(
        "https://sf.xintiao100.com/auBehavior",
        data,
        res => {
          if (res["st"] == 1) {
            if (res["add_lucky_star"] > 0) {
              this.activeWord = "幸运星+" + res["add_lucky_star"];
              this.$emit("showGetStart", this.activeWord);
              return;
            }
            this.activeWord = "领取成功！";
            this.$emit("showGetStart", "领取成功！");
          } else if (res["st"] == 2) {
            this.activeWord = "领取出错！";
            this.$emit("showGetStart", "领取出错！");
          }
          window.location.href = 'http://render.m.taobao.com/shop/container-page.htm?wh_weex=true&pathInfo=shop/activity&userId=3554586239&shopId=415919561&pageId=168281286&showHeader=true'
        }
      );
    }
  }
};
</script>
<style>
.time_alert_content {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 110;
}

.time_alert_content_div {
  width: 100%;
  height: 8rem;
  position: relative;
}

.starImg {
  width: 6.49rem;
  height: 6.47rem;
  position: absolute;
  top: 0;
  left: .5rem;
  z-index: 9;
}

.closeAlert {
  width: 0.6rem;
  height: 0.49rem;
  position: absolute;
  top: 0;
  right: 0.5rem;
  font-size: 30px;
  color: white;
  z-index: 99;
}

.toLocation_btn {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 12;
  text-align: center;
}

.toLocation_btn img {
  width: 4.85rem;
  height: 0.97rem;
}

.right_img {
  width: 3.38rem;
  height: 2.21rem;
  position: absolute;
  right: 0.5rem;
  bottom: 2rem;
  z-index: 12;
}
/*弹窗跳转效果*/
.showAlertSucess {
  position: fixed;
  width: 100%;
  text-align: center;
  z-index: 100;
  bottom: 10%;
  font-size: 0.8rem;
  color: white;
  animation: shareScess 3s ease;
  -webkit-animation: shareScess 3s ease;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
}
.showSucess {
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
</style>
