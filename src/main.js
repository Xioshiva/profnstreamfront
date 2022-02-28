import Vue from 'vue'
import App from './App.vue'
import VueVideoPlayer from 'vue-video-player'

Vue.config.productionTip = false
Vue.use(VueVideoPlayer)


new Vue({
  render: h => h(App),
}).$mount('#app')
