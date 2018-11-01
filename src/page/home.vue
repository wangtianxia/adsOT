<template>
  <div class="first_Container">

  </div>
</template>
<script type="text/javascript">

  import top from '../components/top/index';
  import top2 from '../components/video/index';
  import top3 from '../components/callList/index'
  import part from '../components/clock';

  import Tools from "../config/tool";
  import dataManager from "../dataManager/data";
  import md5 from '../config/md5'
  import ajax from '../config/ajax';

  export default {
    data() {
      return {

      }
    },
    mounted(){
      //进来调这个接口=>统计
//      (new ajax()).sendJSON('https://sf.xintiao100.com' + '/uvStatistics', {
//        user_id: dataManager.user_id,
//        group_openid: dataManager.group_openid,
//        bid: dataManager.bid,
//        ad_id: dataManager.ad_id,
//        sign: md5.makeSign({
//          user_id: dataManager.user_id,
//          group_openid: dataManager.group_openid,
//          bid: dataManager.bid,
//          ad_id: dataManager.ad_id
//        })
//      }, (data) => {
//        if (data) {
//        }
//      });

//        (new ajax()).sendJSON('https://sf.xintiao100.com' + '/receiveAdGift',{  //背包加礼物时调这个接口
//          user_id: dataManager.user_id,
//          group_openid: dataManager.group_openid,
//          bid: dataManager.bid,
//          gift_id:'367',
//          sign: md5.makeSign({
//            user_id: dataManager.user_id,
//            group_openid: dataManager.group_openid,
//            bid: dataManager.bid,
//            gift_id:'367'
//          })
//        },(data) => {
//          if(data){
//
//          }
//        });
//
//      (new ajax()).sendJSON('https://sf.xintiao100.com' + '/receiveAdGift',{  //背包加礼物时调这个接口
//        user_id: dataManager.user_id,
//        group_openid: dataManager.group_openid,
//        bid: dataManager.bid,
//        gift_id:'368',
//        sign: md5.makeSign({
//          user_id: dataManager.user_id,
//          group_openid: dataManager.group_openid,
//          bid: dataManager.bid,
//          gift_id:'368'
//        })
//      },(data) => {
//        if(data){
//
//        }
//      });
//
//      (new ajax()).sendJSON('https://sf.xintiao100.com' + '/receiveAdGift',{  //背包加礼物时调这个接口
//        user_id: dataManager.user_id,
//        group_openid: dataManager.group_openid,
//        bid: dataManager.bid,
//        gift_id:'369',
//        sign: md5.makeSign({
//          user_id: dataManager.user_id,
//          group_openid: dataManager.group_openid,
//          bid: dataManager.bid,
//          gift_id:'369'
//        })
//      },(data) => {
//        if(data){
//
//        }
//      })
    },
    components: {
//      top, top2, part, top3
    },
    methods: {

//        count(count){
//          this.number = count+'';
//        },

      /*左边按钮*/
//      leftClick(){
//        if(!this.isCanClick1){
//          return
//        }
//        (new ajax()).sendJSON('https://sf.xintiao100.com' + '/getAdReward', {
//          user_id: dataManager.user_id,
//          group_openid: dataManager.group_openid,
//          bid: dataManager.bid,
//          ad_id: dataManager.ad_id,
//          from: 2,
//          sign: md5.makeSign({
//            user_id: dataManager.user_id,
//            group_openid: dataManager.group_openid,
//            bid: dataManager.bid,
//            ad_id: dataManager.ad_id,
//            from: 2
//          })
//        },(reward) => {
//          if (reward) {
//            if (reward['add_lucky_star'] && reward['add_lucky_star'] > 0) {
//              this.isSuccess1 = true;
//              this.shareWord1 = '幸运星+' + reward['add_lucky_star'];
//            }
//          }
//          window.location.href = "https://mall.jd.com/index-747985.html"
//        });
//        this.isSuccess1 = true;
//      },
//      /*右边按钮*/
//      rightClick(){
//        if(!this.isCanClick2){
//          return;
//        }
//        (new ajax()).sendJSON('https://sf.xintiao100.com' + '/getAdReward', {
//          user_id: dataManager.user_id,
//          group_openid: dataManager.group_openid,
//          bid: dataManager.bid,
//          ad_id: dataManager.ad_id,
//          from: 3,
//          sign: md5.makeSign({
//            user_id: dataManager.user_id,
//            group_openid: dataManager.group_openid,
//            bid: dataManager.bid,
//            ad_id: dataManager.ad_id,
//            from: 3
//          })
//        },(reward) => {
//          if (reward) {
//            if (reward['add_lucky_star'] && reward['add_lucky_star'] > 0) {
//              this.isSuccess2 = true;
//              this.shareWord2 = '幸运星+' + reward['add_lucky_star'];
//            }
//          }
//            window.location.href = "http://dwz.cn/7NYh0D"
//        });
//        this.isSuccess2 = true;
//      }
    }
  }
</script>
<style scoped>
  .first_Container {
    background-color: rgb(32, 6, 67);
    position:relative;
  }
  .click_btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index:99;
  }

  .left_btn {
    width: 3.15rem;
    height: 1.22rem;
  }
  .right_btn {
    width: 4.35rem;
    height: 1.22rem;
  }
  .showSuccess1{
    /*background:rgba(0,0,0,.5);*/
    width:80%;
    height:.8rem;
    line-height:.8rem;
    position:fixed;
    bottom:0;
    font-size:.4rem;
    color:#fff;
    text-align: center;
    z-index: 999;
    top: 90%;
    left: 10%;
    animation: shareSuccess 5s ease;
    animation-fill-mode: both;
    -webkit-animation-fill-mode: both;
    -webkit-animation: shareSuccess 5s ease;
  }
  .showSuccess2{
    /*background:#fff;*/
    /*background:rgba(0,0,0,.5);*/
    width:80%;
    height:.8rem;
    position:fixed;
    right:10%;
    top:90%;
    line-height:.8rem;
    font-size:.4rem;
    color:#fff;
    text-align:center;
    z-index:999;
    bottom:0;
    animation:shareSuccess 5s ease;
    -webkit-animation-fill-mode:both;
    -webkit-animation:shareSuccess 5s ease;
  }
  @keyframes shareSuccess {
    from {
      transform:translateY(0);
      opacity:1;
    }
    to {
      transform:translateY(-10rem);
      opacity:0
    }
  }
</style>
