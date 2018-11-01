<template>
  <section class="callInfo">
    <img class="bg" src="static/top3.png" alt="">
    <div class="wrapper">
      <section class="content">
        <section class="contentList" v-for="(item,index) in allList" :key="index">
          <section class="head" v-if="item">
            <img class="headImg" :src="item.user_pic" alt="">
            <section class="headImgInfo">
              <p class="p1">{{item.user_name|userName}}</p>
              <p class="p2">{{item.time|time}}</p>
            </section>
          </section>
          <section class="info" v-if="item">
            <img src="static/1.png" v-if="item.num == 1" alt=""> <span class="infoBlock"
                                                                       v-if="item.num == 1">吾心向迪，永不分离</span>
            <img v-if="item.num == 1" src="static/1.png" alt="">
            <img src="static/2.png" v-if="item.num == 2" alt=""> <span class="infoBlock"
                                                                       v-if="item.num == 2">丽藻春葩，迪美如花</span>
            <img v-if="item.num == 2" src="static/2.png" alt="">
            <img src="static/3.png" v-if="item.num == 3" alt=""> <span class="infoBlock"
                                                                       v-if="item.num == 3">倾尽天下，唯迪独尊</span>
            <img v-if="item.num == 3" src="static/3.png" alt="">
            <img src="static/4.png" v-if="item.num == 4" alt=""> <span class="infoBlock"
                                                                       v-if="item.num == 4">天南海北，我迪最美</span>
            <img v-if="item.num == 4" src="static/4.png" alt="">
          </section>
        </section>
      </section>
    </div>
    <selectsImg @tip="tip" @tip2="tip2" v-if="showSelect"></selectsImg>
    <img class="callBtn" src="static/call_btn.png" @click="callBtn" alt="">
  </section>
</template>

<script>
  import BScroll from 'better-scroll';
  import ajaxData from '../../config/ajax';
  import DataManager from '../../dataManager/data';
  import md5 from '../../config/md5';
  import selectsImg from './select'

  export default {
    name: "index",
    data() {
      return {
        showSelect: false,
        allList: [],
        page_num: 1,
        isCanPush: true
      }
    },
    components: {
      selectsImg
    },
    filters: {
      userName(strName) {
        function hexToDec(str) {
          str = str.replace(/\\/g, "%");
          return htmlDecode(unescape(str));
        };

        function htmlDecode(str) {
          var s = "";
          if (str.length == 0) return s;
          s = str.replace(/&amp;/g, "&");
          s = s.replace(/&lt;/g, "<");
          s = s.replace(/&gt;/g, ">");
          s = s.replace(/&nbsp;/g, " ");
          s = s.replace(/&#39;/g, "\'");
          s = s.replace(/&quot;/g, "\"");
          s = s.replace(/<br>/g, "\n");
          return s + '';
        }

        return String(hexToDec(strName));
      },
      time(time) {
        let tempDate = new Date(time);
        let timeTemp = '';
        let year = tempDate.getFullYear();
        let month = tempDate.getMonth() + 1;
        let data = tempDate.getDate();
        let hourse = tempDate.getHours();
        let minut = tempDate.getMinutes();
        let second = tempDate.getSeconds();
        if (month < 10) {
          month = '0' + month
        }
        if (minut < 10) {
          minut = '0' + minut;
        }

        if (hourse < 10) {
          hourse = '0' + hourse;
        }

        timeTemp += year + '' + month + '' + data + '  ' + hourse + ':' + minut + ':' + second;
        return timeTemp
      }
    },
    mounted() {

      const wrapper = document.querySelector('.wrapper');
      let scroll = this.scroll = new BScroll(wrapper, {
        scrollY: true,
        freeScroll: true,
        probeType: 3,
        pullUpLoad: {
          threshold: 50
        }
      });
      scroll.on('pullingUp', (e) => {
        if (this.isCanPush) {
          this.isCanPush = false;
          this.callList();
        }
      });
      this.callList();
    },

    methods: {
      callList() {
        let data = {
          user_id: DataManager.user_id,
          group_openid: DataManager.group_openid,
          page_num: this.page_num,
          page_size: 10
        };
        data.sign = md5.makeSign(data);
        (new ajaxData().sendJSON('https://sf.xintiao100.com/callList', data, (res) => {
          this.isCanPush = true;
          if (res['st'] == 1) {
            this.allList = this.allList.concat(res['data']['list']);
            if (res['data']['list'].length >= 10) {
              this.page_num += 1;
            }
            this.scroll.refresh();
            this.scroll.finishPullUp();
            this.$emit('count', res['data']['call_num']);
          }
        }))
      },

      callBtn() {
        this.showSelect = true;
      },

      tip() {
        this.page_num = 1;
        this.allList = [];
        this.callList();
        this.showSelect = false;
      },

      tip2() {
        this.page_num = 1;
        this.allList = [];
        this.callList();
      }
    }
  }
</script>

<style scoped>
  .callInfo {
    width: 100%;
    position: relative;
  }

  .wrapper {
    width: 100%;
    height: 2.8rem;
    overflow: hidden;
    position: absolute;
    top: 0.8rem;
  }

  .content {
    width: 100%;
  }

  .head {
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .headImg {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }

  .info {
    width: 50%;
    text-align: right;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.24rem;
  }

  .info > img {
    width: 0.22rem;
  }

  .infoBlock {
    display: inline-block;
    margin: 0 0.20rem;
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  .contentList {
    width: 100%;
    height: 0.8rem;
    font-size: .3rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.6rem;
  }

  .p1 {
    width: 2.3rem;
    font-size: 0.24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .p2 {
    font-size: 0.18rem;
    color: #6f64c0;
  }

  .headImgInfo {
    margin-left: 0.2rem;
  }

  .headImg {
    background-color: black;
  }

  .callBtn {
    margin-top: 4.2rem;
    width: 100%;
  }
</style>
