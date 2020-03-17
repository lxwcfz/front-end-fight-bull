<template lang="pug">
  //- html
  div.room-list-wrap.relative.h100
    header.header.absolute.left0.top0
      BtnBack.ml2.mt2.absolute.left0.top0
      div.flex.align-center.justify-center
        span.orange.f4.title 房间列表（{{ list.length }}）
    div.px4.pb4.h100.overflow-y.room-list
      div.room-wrap.overflow(@click="toRoom(item)", v-for="item in list", :key="item.id")
        span.name.f4.orange {{ item.name }}
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import {getRoomList} from "@/api";
import BtnBack from "@/components/BtnBack.vue";

@Component({
  components: {
    BtnBack
    
  }
})
export default class RoomList extends Vue {
  //props
  
  //data
  list: RoomInfo[] = [];
  //生命周期
  mounted() {
    getRoomList().then(res => {
      this.list = res.data;
    });
  }
  
  //methods
  toRoom(item) {
    this.$router.push({
      name: 'room',
      query: {
        id: item.id
      }
    });
  }
}
</script>

<style lang="stylus" scoped>
.room-list-wrap
  padding-top 46px
  .title
    background rgba(0,0,0,.3)
    padding 5px 40px
    border-radius 20px
  .header
    padding 0 45px
    .flex
      flex-basis 100%
  .room-list
    display flex
    align-items center
    justify-content space-between
    flex-flow row wrap
    width 100%
    &:after
      content ''
      display block
      width 100px
      height 0
  .room-wrap
    width 100px
    height 100px
    margin 10px
    border-radius 10px
    box-shadow 0 0 5px #ddd
    .name
      height 24px
      width 100%
      text-align center
      display inline-block
      line-height 24px
      background rgba(0,0,0,.3)
</style>