<template>
  <div id="app">
    <NavBar/>
    <Stream msg="Lolixdé"/>
    <Chat/>
  </div>
</template>

<script>
import Stream from './components/Stream.vue'
import 'video.js/dist/video-js.css'
import NavBar from '@/components/NavBar'
import Chat from '@/components/Chat'
export default {
  name: 'App',
  components: {
    NavBar,
    Stream,
    Chat,
  }
}
</script>

<style>
body {
  background-color: #6f30a0;
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #6f30a0;
  height: 100%;
  width: 100%;
}
</style>
