<template lang="pug">
  //- html
  img.btn-back(src="@/assets/返回.png", @click="back")
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component({
  components: {
    
  }
})
export default class BtnBack extends Vue {
  //props
  
  //data
  
  //生命周期
  mounted() {
    
  }
  
  //methods
  back() {
    this.$audio.pop();
    this.$router.go(-1);
  }
}
</script>

<style lang="stylus" scoped>
.btn-back
  width 35px
  height 35px
  &:active
    opacity .7
</style>