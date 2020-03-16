<template>
  <div class="home h100">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Group from '@/components/Group.vue';

@Component({
  components: {
  },
})
export default class Home extends Vue {
  
}
</script>
<style lang="stylus">
.home
  background-image url('../assets/index-bg.png')
  background-size 100% 100%
  .logo
    position absolute
    width 80px
    border-radius 35px
    left 50%
    top 50%
    transform translateX(-50%) translateY(-50%)
</style>
