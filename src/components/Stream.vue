<template>
  <div>
    <div :style="CollapseStream" class="streaming">

      <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" :key="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate">
      </video-player>

      
    </div>
    <Chat @collapse="collapse"></Chat>
  </div>
</template>

<script>
  import videojs from 'video.js'
  import Chat from './Chat.vue'

  require('dotenv').config()

  const BACKEND_URL = process.env.VUE_APP_BACK_ADDR;


  const myHeader = new Headers({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    //'Access-Control-Allow-Origin': 'http://localhost:8081',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  window.videojs = videojs
  // hls plugin for videojs6
  /*require('videojs-contrib-hls/dist/videojs-contrib-hls.js') cette ligne casse le programme*/

  export default {
    components: { Chat },
      data() {
        return {
          isOpen: true,
          initialized: false,
          currentTech: '',
          streams: {
            rtmp: '',
          },
          playerOptions: {
          // videojs and plugin options 
            preferFullWindow: true,
            responsive: true,
            autoSetup: true,
            aspectRatio : "16:9",
    
            autoplay: true,
            controls: true,
            techOrder: ['flash', 'html5'],
            sourceOrder: true,             
            muted: true,
            language: 'en',
            flash: { hls: { withCredentials: false }},
            html5: { hls: { withCredentials: false }}, 
            sources: [
              {
                withCredentials: false,
                type: "application/x-mpegURL",
                src: "",
              }
            ],
            poster: "https://i.ibb.co/4R5J8G6/Dessin-sans-titre-3-1.png",
            notSupportedMessage: " This video is temporarily unplayable. Please try again later ",
        }
      }
    },
    methods: {
      getStreamUrl(){
        let url = window.location.href;
        let arr = url.split("/");
        let profID = arr[arr.length - 1];
        return fetch(BACKEND_URL+ "/stream/get/"+ profID + "/userName",{ method: 'get', headers: myHeader})
        .then(res=>{
          return res.json().then(o=>{
          return o["url"];
          })
        });
      },
      clearSource(){
        this.sources.src = "";
      },
      onPlayerReadied() {
        if (!this.initialized) {
          this.initialized = true
          this.currentTech = this.player.techName_
        }
      },
      // record current time
      onTimeupdate() {
      },
      collapse(e) {
        this.isOpen = e
      }
    },
    mounted: function(){
      console.log("MOUNTING MFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
      const thisInstance = this
      this.$root.$on('clearSource', function(){
        thisInstance.clearSource()
      })
      this.getStreamUrl().then( a=>{
        console.log("OOOOOOOOOOOOOH")
        var streamSource = a;                                                                                                                                                                                                                                                               
        console.log(streamSource)
        this.sources.src = "http://localhost:7002/live/bruh.m3u8";
        this.$forceUpdate();
      });
      this.playerOptions.sources[0].src = "http://localhost:7002/live/bruh.m3u8";
    },
    computed :{
      CollapseStream() {
        if(this.isOpen) {
          return {
            width: '80%'
          }
        }else{
          return {
            width: '100%'
          }
        }
      }
    },
  }
  
</script>

<style scoped>
h2 {
  font-size: 3vh;
}
.streaming {
  float: left;
  width: 100%;
  z-index: -1;
  padding-top: 3%;
  color: white;
}
@media only screen and (max-width: 800px){
  .streaming {
    width: 100% !important;
    height: 100% !important;
    padding-top: 13%;
  }
}
</style>