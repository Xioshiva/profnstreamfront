<template>
  <div class="streaming">
    <div class="player">
      <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate"
      :style="{width: progress+'%'}">
      </video-player>
    </div>
    
    <div class="btn">
    <button @click="request">Test an API call to Backend</button>
    </div>

  </div>
</template>

<script>
  import videojs from 'video.js'
  window.videojs = videojs
  // hls plugin for videojs6
  
  /*require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
   cette ligne casse le programme*/
  function request() {
        fetch('http://localhost:8091/api')  
          .then(response => response.json())
          .then(data => console.log(data));
        console.log("hey");
  }


  export default {
    data() {
      return {
        playerOptions: {
          // videojs and plugin options 
          autoplay: false,
          controls: true,
          techOrder: ['flash', 'html5'],
          sourceOrder: true,             
          muted: true,
          language: 'en',
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "http://127.0.0.1:7002/live/test.m3u8"
          }],
          poster: "https://profngo.ch/images/logo_profNgo_400x153.png",
          notSupportedMessage: " This video is temporarily unplayable. Please try again later ",
        }
      }
    },
    methods: {
      playerReadied(player) {
        player.tech_.hls.xhr.beforeRequest = function(options) {
          console.log(options)
          return options
        }
      },
      request: request
    }
  }
</script>

<style>
.streaming {
  float: left;
}
.player {
  display: flex;
}
.vjs-custom-skin {
  width: 100%;
  height: 100%;
}
</style>