<template>
    <div class='clockDiv'>
        <section class='clockContent'>
            <img class='clockBg' src="../../static/timeBg.jpg"/>
            <div class='hourOther' ref='hour'>
                <img src="../../static/Clockwise.png"/>
            </div>
            <div class='minOther' ref='min'>
                <img src="../../static/minuteHand.png"/>
            </div>
            <img class='clockYuan' src="../../static/spot.png"/>
        </section>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                runTime: 0,
                isCanRun: true,
            }
        },
        mounted() {

            let min = this.$refs.min;
            let hour = this.$refs.hour;
            hour = hour > 12 ? hour - 12 : hour;
            let inteval = setInterval(() => {
                let time = new Date();
                let secondTime = time.getSeconds();
                // sec.style.transform = `rotate(${secondTime*6}deg)`;
                let minTime = time.getMinutes();
                // 1/10 = 1分针对应60s 1s对应6度
                min.style.transform = `rotate(${ secondTime * (1 / 10) + minTime * 6}deg)`;
                let hourTime = time.getHours();
                // 60分钟对应360度  （现在分针对应的度数+现在小时对应度数）
                hour.style.transform = `rotate(${(minTime / 60 * 30) + hourTime * 30}deg)`;
            }, 1000);

            let startX, startY, endX, endY, pX, pY, newTime;
            this.rotateTime(new Date().getTime());
            min.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX;
                startY = event.touches[0].clientY;
                clearInterval(inteval);
                if (this.runTime > 0) {
                    newTime = this.runTime
                } else {
                    newTime = new Date().getTime();
                }
            });

            hour.addEventListener('touchend', (event) => {
                console.log('touchend', event);
            });

            min.addEventListener('touchmove', (event) => {
                event.preventDefault();
                if (this.isCanRun) {
                    endX = event.touches[0].clientX;
                    endY = event.touches[0].clientY;
                    let px = parseInt(endX - startX);
                    newTime += 80000;
                    this.rotateTime(newTime);
                    this.runTime = newTime;
                }
                let time = new Date(newTime);
                let tempHour = time.getHours();
                let tempMin = time.getMinutes();
                if (tempHour > 12) {
                    tempHour = tempHour - 12;
                }

                if (tempHour == 5 && tempMin >= 19 && tempMin <= 21) {
                    if(this.isCanRun){
                        this.isCanRun = false;
                        this.$emit('showTimeAlert');
                    }
                }
            })
        },
        methods: {
            rotateTime(timer) {
                let time = new Date(timer);
                let min = this.$refs.min;
                let hour = this.$refs.hour;
                // let sec = this.refs.sec;
                hour = hour > 12 ? hour - 12 : hour;

                let secondTime = time.getSeconds();
                // sec.style.transform = `rotate(${secondTime*6}deg)`;
                let minTime = time.getMinutes();
                // // 1/10 = 1分针对应60s 1s对应6度
                min.style.transform = `rotate(${ secondTime * (1 / 10) + minTime * 6}deg)`;
                let hourTime = time.getHours();
                // // 60分钟对应360度  （现在分针对应的度数+现在小时对应度数）
                hour.style.transform = `rotate(${(minTime / 60 * 30) + hourTime * 30}deg)`;
            }
        }
    }
</script>
<style>
    .clockDiv {
        font-size: 0.3rem;
        top: 30%
    }

    .clockContent {
        position: relative;
        width: 7.5rem;
        height: 7.44rem;
    }

    .clockBg {
        width: 100%;
    }

    .clockBg > img {
        width: 100%;
    }

    .hourOther {
        position: absolute;
        left: 41%;
        top: 16%;
        transform-origin: center 2.4rem;
    }

    .minOther {
        position: absolute;
        left: 40.5%;
        top: 0;
        transform-origin: center 3.6rem;
    }

    .hourOther > img {
        height: 3.36rem;
        width: 1.3rem;
    }

    .minOther > img {
        width: 1.3rem;
    }

    .clockYuan {
        position: absolute;
        left: 40%;
        top: 39%;
        width: 1.42rem;
    }
</style>
