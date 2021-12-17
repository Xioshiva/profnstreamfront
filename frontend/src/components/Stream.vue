<template>
  <div class="streaming">

    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate">
    </video-player>
    <button @click="request">Test an API call to Backend</button>

  </div>
</template>

<script>
  import videojs from 'video.js'
  window.videojs = videojs
  // hls plugin for videojs6
  /*require('videojs-contrib-hls/dist/videojs-contrib-hls.js') cette ligne casse le programme*/

  export default {
    data() {
      return {
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
            src: "http://127.0.0.1:8000/live/test.m3u8"
          }
        ],
        poster: "https://profngo.ch/images/logo_profNgo_400x153.png",
        notSupportedMessage: " This video is temporarily unplayable. Please try again later ",

      }
    }
    },
    methods: {
      onPlayerReadied() {
        if (!this.initialized) {
          this.initialized = true
          this.currentTech = this.player.techName_
        }
      },
      // record current time
      onTimeupdate(e) {
        console.log('currentTime', e.cache_.currentTime)
      },

      request() {
        fetch('http://localhost:8091/api')  
          .then(response => response.json())
          .then(data => console.log(data));
        console.log("hey");
  }
    }
  }
</script>

<style scoped>
.streaming {
  float: left;
  width: 80%;
  z-index: -1;
  padding-top: 3%;
}

</style>