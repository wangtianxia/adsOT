<template>
    <section class="topSection">
        <section class="topSection1">
            <img class="bg" src="static/top1.jpg" alt="">
            <section class="personCount">
                <section class="personCountItem" v-for="(item,index) in num">
                    {{item}}
                </section>
            </section>
        </section>
    </section>
</template>

<script>
    export default {
        name: "top",
        data(){
            return {
                num:[]
            }
        },

        props:['number1'],

        methods:{
            change(){

                this.num = [];
                let chaLen = 8-this.number1.length;
                for(let i=0;i<chaLen;i++){
                    this.num.push('0');
                }
                for(let j in this.number1){
                    this.num.push(this.number1[j]);
                }
            }
        },

        mounted(){
            this.change();
        },
        watch:{
            number1(){
                this.change();
            }
        }
    }
</script>

<style scoped>
    .topSection{
        position: relative;
    }
    .bg{
        width: 100%;
    }
    .personCount{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0.15rem;
        width: 100%;
        left: 0;
        font-size: 0.5rem;
        font-weight: bold;
    }
    .topSection1{
        position: relative;
        font-size: 0;
    }
    .personCountItem{
        background-color: white;
        margin-left: 0.07rem;
        width: 0.45rem;
        height: 0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .personCountItem::after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 50%;
        width: 100%;
        height: 1px;
        background-color: black;
    }

</style>