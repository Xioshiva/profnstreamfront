<template>
  <div id="app">
    <NavBar/>
    <Player msg="Lolixdé"/>
    <Chat/>
  </div>
</template>

<script>
import Player from './components/Player.vue'
import 'video.js/dist/video-js.css'
import NavBar from '@/components/NavBar'
import Chat from '@/components/Chat'
export default {
  name: 'App',
  components: {
    NavBar,
    Player,
    Chat,
  }
}
</script>

<style>
body {
  background-color: purple;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: purple;
}
</style>
