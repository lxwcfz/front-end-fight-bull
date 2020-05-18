<template lang="pug">
  //- html
  div.head-selection
    content
      div.item(v-for="(item, index) in headList", :key="index", @click="currentImg = item.name")
        span.btn-select(:class="{'selected': currentImg == item.name}")
        img(:src="item.src")
      span.btn-ensure(@click="ensureHead") 确定
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import {Getter} from "vuex-class";

@Component({
  components: {
    
  }
})
export default class HeadSelection extends Vue {
  //props
  
  //data

  headList = [
    {
      name: 'role-male.png',
      src: require('@/assets/role-male.png')
    },
    {
      name: 'role-bull.png',
      src: require('@/assets/role-bull.png')
    },
    {
      name: 'role-female.png',
      src: require('@/assets/role-female.png')
    }
  ];
  currentImg = '';

  @Getter loginUser;
  //生命周期
  mounted() {
    this.currentImg = this.loginUser.img;
  }
  
  //methods
  ensureHead() {
    this.$emit('submit', this.currentImg);
  }
}
</script>

<style lang="stylus" scoped>
  .head-selection
    width 100%
    height 100%
    position fixed
    left 0
    top 0
    z-index 1000
    background rgba(0,0,0,.5)
    padding 20px 40px
    box-sizing border-box
    content
      width 100%
      height 100%
      position relative
      padding 10px
      background #fff
      padding-bottom 70px
      display flex
      align-items center
      justify-content space-around
      background: linear-gradient(45deg, #e4a15c, #c3b490);
      border-radius: 10px;
      .item
        width 30%
        height 100%
        position relative
        padding 40px 10px 10px 10px
        border-radius 10px
        display flex
        align-items center
        justify-content center
        border: 1px solid #eee;
        box-shadow: 0 0 15px 5px #eee;
        img
          width auto
          height auto
          max-width 100%
          max-height 100%
        .btn-select
          width 20px
          height 20px
          border-radius 50%
          border 1px solid #1293e4
          position absolute
          right 10px
          top 10px
        .selected
          background #1293e4
          border 2px solid #fff
      .btn-ensure
        width 80px
        height 30px
        line-height 30px
        border-radius 8px
        text-align center
        color #fff
        background linear-gradient(180deg, #91cce0, #169be1)
        position absolute
        bottom 10px
        left 50%
        transform translateX(-50%)
</style>
