<template>
  <div id="app">
    <router-view/>
    <audio id="audio"></audio>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component
  export default class App extends Vue {
      mounted() {
          if (!Vue.prototype.$audio) {
              Vue.prototype.$audio = (<any>document).getElementById('audio');
              const _this = Vue.prototype;
              function setSrc(src) {
                  _this.$audio.src = require(`@/assets/${src}.mp3`);
                  _this.$audio.play();
              }
              Vue.prototype.$audio.success = () => {
                  setSrc('success');
              }
              Vue.prototype.$audio.pop = () => {
                  setSrc('pop');
              }
              Vue.prototype.$audio.countDown = () => {
                  setSrc('countDown');
              }
              Vue.prototype.$audio.btn1 = () => {
                  setSrc('effect1');
              }
              Vue.prototype.$audio.btn2 = () => {
                  setSrc('effect2');
              }
              Vue.prototype.$audio.btn3 = () => {
                  setSrc('effect3');
              }
              Vue.prototype.$audio.btn4 = () => {
                  setSrc('effect4');
              }
              Vue.prototype.$audio.victory = () => {
                  setSrc('victory');
              }
              Vue.prototype.$audio.fail = () => {
                  setSrc('fail');
              }
          }
      }
  }
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  font-size 12px
#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
