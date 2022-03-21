<template>
  <div>
    <div :style="CollapseStream" class="streaming">

      <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate">
      </video-player>

      <div class="Description cours">
        <h2>Électrodynamique</h2>
          <p>L'électrodynamique est la discipline physique qui étudie et traite des actions dynamiques entre les courants électriques. On distingue l'électrodynamique classique et l'électrodynamique quantique. Tout phénomène d'électrodynamique classique est décrit par les équations de Maxwell. </p>
        <h2>Histoire</h2>
          <p>En 1820, André-Marie Ampère, après avoir été informé de l'expérience de Hans Christian Ørsted mettant en évidence l'interaction entre un courant électrique et un aimant, formalise mathématiquement, pour la première fois, les forces d'interaction entre aimants et courants et les forces mutuelles entre courants. Il publiera une suite d'articles entre 1820 et 1825 qui seront recueillis dans son ouvrage de 1826 intitulé "Théorie mathématique des phénomènes électrodynamiques, uniquement déduite de l'expérience"1. Ces travaux fondent l'électrodynamique et influencent considérablement la physique du XIXe siècle. La contribution de Michael Faraday mettant en évidence le phénomène d'induction et introduisant la notion de champ magnétique ont complété les bases expérimentales de l'électrodynamique. Les travaux d'Ampère et Faraday ont permis à James Clerk Maxwell de formaliser, avec l'utilisation d'équations différentielles, les équations qui portent aujourd'hui son nom. De fait, Maxwell publie en 1865 sa théorie sous la forme de vingt équations à vingt inconnues. C'est Oliver Heaviside qui, en 1884, réécrivit ces équations sous la forme de quatre équations vectorielles aux dérivées partielles qui constituent la base de l'électromagnétisme. </p>
        <h2>Les limites de l'électrodynamique classique</h2>
          <p>Comme toute théorie physique, l'électrodynamique classique a ses limites d'application : elle n'est pas valable à très petites distances et à très hauts champs, à cause de la physique quantique. Elle pourrait également ne plus être applicable à très grandes distances2. </p>  
        <h2>Musées</h2>
          <p>Plusieurs musées d'histoire de l'électricité dans le monde permettent de retracer l'histoire de l'électrodynamique. Parmi eux nous pouvons citer le Musée Ampère près de Lyon, ou le Michel Faraday Museum à Londres. </p>
      </div>
    </div>
    <Chat @collapse="collapse"></Chat>
  </div>
</template>

<script>
  import videojs from 'video.js'
  import Chat from './Chat.vue'

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
            src: "http://127.0.0.1:7002/live/bruh.m3u8"
          }
        ],
        poster: "https://i.ibb.co/4R5J8G6/Dessin-sans-titre-3-1.png",
        notSupportedMessage: " This video is temporarily unplayable. Please try again later ",

      }
    }
    },
    methods: {

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
    },  mounted(){
      const thisInstance = this
      this.$root.$on('clearSource', function(){
      thisInstance.clearSource()
    })},
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
    }
  }
</script>

<style scoped>
h2 {
  font-size: 3vh;
}
.streaming {
  float: left;
  width: 80%;
  z-index: -1;
  padding-top: 3%;
  color: white;
}
@media only screen and (max-width: 800px){
  .streaming {
    width: 100% !important;
    height: 50% !important;
  }
}
</style>