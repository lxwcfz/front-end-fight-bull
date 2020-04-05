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
        span.number {{ item.member ? JSON.parse(item.member).length : 0 }} / 5
        span.close.f4.orange(v-if="canDel(item)", @click.stop="deleteRoom(item)") 删除
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from "vue-property-decorator";
import {getRoomList} from "@/api";
import { Getter } from 'vuex-class';
import BtnBack from "@/components/BtnBack.vue";
import {socket, WsEventType} from "@/socket";

@Component({
  components: {
    BtnBack
    
  }
})
export default class RoomList extends Vue {

  @Getter loginUser;
  //props
  
  //data
  list: RoomInfo[] = [];
  ws: WebSocket | null = null;

  @Watch('list', { immediate: true })
  onListChange(list) {
    list.forEach(item => {
      if (typeof item.creator === 'string') {
        item.creator = JSON.parse(item.creator);
      }
    });
  }

  //生命周期
  mounted() {
    getRoomList().then(res => {
      this.list = res.data;
    });
    this.ws = socket({
      [WsEventType.newRoom]: this.handleNewRoom.bind(this),
      [WsEventType.deleteRoom]: this.handleDeleteRoom.bind(this),
      [WsEventType.intoRoom]: this.handleIntoRoom.bind(this),
      [WsEventType.outRoom]: this.handleIntoRoom.bind(this),
    });
  }

  handleIntoRoom(data) {
    getRoomList().then(res => this.list = res.data);
  }

  handleNewRoom(data) {
    this.list.push(data);
  }

  handleDeleteRoom(data) {
    this.list = data;
  }

  canDel(item) {
    const data = typeof item.member == 'string' ? JSON.parse(item.member) : item.member;
    // console.log(data);
    return item.creator.id == this.loginUser.id && !(data && data.length > 0);
  }

  beforeDestroy() {
    this.ws && this.ws.close();
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
  deleteRoom(item) {
    (<WebSocket>this.ws).send(JSON.stringify({
      type: WsEventType.deleteRoom,
      data: {
        id: item.id
      }
    }));
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
    align-items flex-start
    justify-content flex-start
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
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      width 100%
      text-align center
      display inline-block
      line-height 24px
      background rgba(0,0,0,.3)
  .number
    color #fff
    font-size 24px
    line-height 47px
  .close
    width: 100%;
    display: inline-block;
    text-align: center;
    background: rgba(255,255,255,.3);
    height: 30px;
    line-height: 30px;
</style>