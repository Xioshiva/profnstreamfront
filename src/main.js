import Vue from 'vue'
import App from './App.vue'
import VueVideoPlayer from 'vue-video-player'

process.env.VUE_APP_TEST_URL = "afsighpasvnas";

console.log(process.env);

Vue.config.productionTip = false
Vue.use(VueVideoPlayer)


new Vue({
  render: h => h(App),
}).$mount('#app')