<template>
  <div class="Container">
    <p>这是个测试页面</p>
    <canvas id="myCanvas" style="width:100%;height:100%;" @click="clickCavas()"></canvas>

  </div>
</template>
<script type="text/javascript">
  export default {
    data (){
      return {}
    },
    mounted(){
      this.init()
    },
    methods: {
        init(){
          this.manifest = [
            {id: 'stamp', src: 'static/stamp.png'},
            {id: 'paper', src: 'static/paper.png'},
            {id: 'paper_1', src: 'static/paper_1.png'},
            {id: 'paper_2', src: 'static/paper_2.png'},
            {id: 'paper_3', src: 'static/paper_3.png'},
            {id: 'paper_4', src: 'static/paper_4.png'},
            {id: 'paper_5', src: 'static/paper_5.png'},
            {id: 'paper_6', src: 'static/paper_6.png'},
            {id: 'stamp_1', src: 'static/stamp_1.png'}
          ];
          var self = this;
          this.preLoad(function () {
            self.startGame();
          });
        },
      /*加载之前，要执行的一些步骤*/
      preLoad(preLoadSuccess){
        this.preLoad(function () {
          var self = this;
          /*初始化舞台*/
          self.setStage();
          /*预加载资源*/
          self.loadImg(self.manifest, preLoadSuccess)
        })


      },
      /*设置舞台*/
      setStage(){
         var cavasId = document.getElementById('myCanvas');
         var scale = cavasId.offsetWidth / cavasId.offsetHeight;
         cavasId.width = 750;
         cavasId.height = 750 /scale;
         var stage = this.stage = new createjs.Stage(cavasId);
         createjs.Touch.enable(stage);

      },
      clickCavas(){
      }
    }
  }
</script>
<style>
  .Container {
    background-color: rgb(255, 103, 66);
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
  }

  .Container p {
    text-align: center;
    font-size: .38rem;
    color: #000;
    padding: 20px;
  }
</style>
