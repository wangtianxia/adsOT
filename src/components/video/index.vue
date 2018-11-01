<template>
    <section class="videoInfo">
        <video v-show="isShow" class="videoArea" controls preload poster="static/top2.png" ref="video"  webkit-playsinline="true" playsinline="true">
            <source src="https://starcdn.xintiao100.com/starResources/videos/ID/reba.mp4" type="video/mp4" />
        </video>
        <img class="video" src="static/video_fengmian.png" ref="fenmian"  @click="videoClick" alt="">
    </section>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                isShow:false
            }
        },
        methods:{
            videoClick(){
                let video = this.$refs.video;
                video.addEventListener('play',(e)=> {
                    this.$refs.fenmian.style.display = 'none';
                    this.isShow = true;
                });
                video.play();
                video.addEventListener('ended',(e)=>{
                    this.$refs.fenmian.style.display = 'block';
                    this.isShow = false;
                });
                video.addEventListener('pause',(e)=>{
                    this.isShow = false;
                    this.$refs.fenmian.style.display = 'block';
                })
            }
        }
    }
</script>

<style scoped>
    .videoInfo{
        position: relative;
        width: 100%;
        height: 4.51rem;
    }
    .video{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 11;
    }
    .videoArea{
        position: absolute;
        width: 100%;
        height: 4.51rem;
        left: 0;
        top: 0;
        z-index: 10;
    }
</style>
