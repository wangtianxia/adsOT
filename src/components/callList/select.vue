<template>
    <section class="selectContent" v-disabletouchmove>
        <img class="closeImg" src="static/activeClose.png" @click="closeImg" alt="">
        <section class="selectContentItemTop">
            <img class="alertTop" src="static/alert_top.png" alt="">
            <section class="selectContentItem">
                <img src="static/active_info1.png" ref="info1"  @click="imgClick(1,$event)" alt="">
                <img src="static/active_info2.png" ref="info2" @click="imgClick(2,$event)" alt="">
                <img src="static/active_info3.png" ref="info3" @click="imgClick(3,$event)" alt="">
                <img src="static/active_info4.png" ref="info4" @click="imgClick(4,$event)" alt="">
            </section>
            <img class="btn" src="static/send_btn.png" @click="send" alt="">
        </section>
        <section v-show="showTotals" id="callItem" class="showTotals">{{msg}}</section>
    </section>
</template>

<script>
    import ajaxData from '../../config/ajax';
    import DataManager from '../../dataManager/data';
    import md5 from '../../config/md5';
    import index from "../../router";

    export default {

        data() {
            return {
                index: 1,
                msg: '',
                showTotals: false,
            }
        },

        mounted(){
            this.$refs['info1'].style.backgroundColor = 'rgb(42,10,81)'
        },

        methods: {
            imgClick(index, e) {
                this.index = index;
                let refs = this.$refs;
                for (let i in refs) {
                    refs[i].style.backgroundColor = 'rgb(71,16,138)'
                }
                e.target.style.backgroundColor = 'rgb(42,10,81)';
            },

            send() {
                if(this.index == 0){
                    this.showTotals = true;
                    //document.getElementById('callItem').style.backgroundColor='red';
                    setTimeout(() => {
                        this.showTotals = false
                    }, 3000);
                    return;
                }

                let data = {
                    user_id: DataManager.user_id,
                    group_openid: DataManager.group_openid,
                    num: this.index
                };

                data.sign = md5.makeSign(data);
                (new ajaxData().sendJSON('https://sf.xintiao100.com/dlrbCallRecord', data, (res) => {
                    if (res['st'] == 1) {
                        this.$emit('tip2');
                        this.showTotals = true;
                        this.msg = '打call成功';
                        // document.getElementById('callItem').style.backgroundColor='white';
                        // document.getElementById('callItem').style.color='black';
                        setTimeout(() => {
                            this.showTotals = false
                        }, 3000);
                    }else if(res['st'] == 2){
                        this.showTotals = true;
                        this.msg = '今日打call次数已用完';
                        setTimeout(() => {
                            this.showTotals = false
                        }, 3000);
                        //document.getElementById('callItem').style.backgroundColor='red';
                    }
                }));
            },

            closeImg() {
                this.$emit('tip')
            }
        }
    }
</script>

<style scoped>
    .selectContent {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        z-index: 100;
    }

    .selectContentItem {
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
    }

    .selectContentItemTop {
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        height: 100%;
        z-index: 12;
    }

    .selectContentItem > img {
        width: 3rem;
        height: 2.36rem;
        display: inline-block;
        margin-left: 0.1rem;
        margin-top: 0.1rem;
        background-color: rgb(71, 16, 138);
    }

    .btn {
        width: 100%;
        margin-top: 1rem;
    }

    .alertTop {
        width: 100%;
    }

    .showTotals {
        position: absolute;
        left: 10%;
        top: 50%;
        background-color: rgba(0,0,0,.5);
        font-size: 0.3rem;
        color: white;
        z-index: 1000;
        width: 80%;
        text-align: center;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        animation:shareSuccess 5s ease;
        -webkit-animation-fill-mode:both;
        -webkit-animation:shareSuccess 5s ease;
    }


    .closeImg {
        position: absolute;
        right: 1rem;
        top: 1rem;
        z-index: 100;
        width: 0.64rem;
        height: 0.64rem;
    }
    .imgStar1{
        background-color: rgb(42,10,81);
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
