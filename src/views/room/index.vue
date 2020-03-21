<template>
  <div class="room-home h100">
    <img src="@/assets/返回.png" @click="outRoom" alt="">
    <img class="logo" src="@/assets/logo.png" @click="ready" alt="">
    <Group v-for="(item,index) in data" :key="index" :position="index+1" :data="item">
      <span slot="ready" v-show="item.ready" class="white absolute left0 top0">已准备</span>
    </Group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Group from '@/components/Group.vue';
import { Getter } from 'vuex-class';
import {socket, WsEventType} from "@/socket";

@Component({
  components: {
    Group
  },
})
export default class Home extends Vue {
  data: GroupInfo[] = [];
  ws: WebSocket | null = null;

  get roomId() {
    return <string>this.$route.query.id;
  }

  @Getter loginUser;

  mounted() {
    const _this = this;
    this.ws = socket({
      [WsEventType.intoRoom]: this.handleIntoRoom.bind(this),
      [WsEventType.outRoom]: this.handleOutRoom.bind(this),
      [WsEventType.ready]: this.handleIntoRoom.bind(this),
      [WsEventType.handOutCard]: this.handleIntoRoom.bind(this)
    });
    this.ws.onopen = () => {
      (<WebSocket>this.ws).send(JSON.stringify({
        type: WsEventType.intoRoom,
        data: {
          roomId: this.roomId
        }
      }));
    }
  }

  ready() {
    (<WebSocket>this.ws).send(JSON.stringify({
      type: WsEventType.ready,
      data: {
        roomId: this.roomId
      }
    }));
  }

  beforeDestroy() {
    this.ws && this.ws.close();
  }

  outRoom() {
    (<WebSocket>this.ws).send(JSON.stringify({
      type: WsEventType.outRoom,
      data: {
        roomId: this.roomId,
        front: true
      }
    }));
    this.$nextTick(() => {
      this.$router.go(-1);
    });
  }

  handleIntoRoom(data) {
    const list: GroupInfo[] = [];
    data.forEach(item => {
      list.push({
        role: item.user,
        list: item.card,
        ready: item.ready
      });
    });
    this.data = list;
  }
  handleOutRoom(data) {
    console.log(data);
    if (data.front) { // 

    } else {
      this.handleIntoRoom(data);
    }
  }
}
</script>
<style lang="stylus">
.room-home
  background-image url('../../assets/bg.png')
  background-size 100% 100%
  .logo
    position absolute
    width 80px
    border-radius 35px
    left 50%
    top 50%
    transform translateX(-50%) translateY(-50%)
</style>
