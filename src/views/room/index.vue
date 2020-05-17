<template>
  <div class="room-home h100" :class="{'room-home-rotate': rotate}">
    <img class="btn-back" src="@/assets/返回.png" @click="outRoom" alt="">
    <span v-show="!selfReady" class="btn-ready" @click="ready">点击准备</span>
    <span v-show="end" class="btn-ready" @click="playAgain">再来一局</span>
    <span class="host-time" v-show="allReady && hostRestTime > 0">准备抢庄（{{ hostRestTime }}s）</span>
    <span class="host-time" v-show="selfReady && !allReady && !end && !rotate">等待其他玩家准备...</span>
    <span v-show="allReady && hostRestTime == 0 && !host" class="btn-ready" @click="getHost">抢庄</span>
    <Group @finish="onFinish" @open="onOpen" v-for="(item,index) in data" :host="host" :key="index" :position="index+1" :data="item"></Group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Group from '@/components/Group.vue';
import { Getter } from 'vuex-class';
import {socket, WsEventType} from "@/socket";
import { log } from 'util';
import { storageName } from '../../config/config';
import { dispatchSetLoginUser } from '../../store/dispatches';

@Component({
  components: {
    Group
  },
})
export default class Home extends Vue {
  data: GroupInfo[] = [];
  ws: WebSocket | null = null;
  host: {id: string | number} | null = null;
  hostRestTime = 3;
  rotate = false;
  end = false;

  get roomId() {
    return <string>this.$route.query.id;
  }
  get selfReady() {
    return this.data.some(item => {
      return item.ready && item.role.id == this.loginUser.id;
    });
  }
  get allReady() {
    const ready = this.data.length > 1 && this.data.every(item => item.ready) && !this.data.some(item => item.ready && item.finish);
    return ready;
  }

  @Getter loginUser;

  mounted() {
    this.ws = socket({
      [WsEventType.intoRoom]: this.handleIntoRoom.bind(this),
      [WsEventType.outRoom]: this.handleOutRoom.bind(this),
      [WsEventType.ready]: this.handleReady.bind(this),
      [WsEventType.handOutCard]: this.handleIntoRoom.bind(this),
      [WsEventType.getHost]: this.handleGetHost.bind(this),
      [WsEventType.finish]: this.handleFinish.bind(this),
      [WsEventType.again]: this.handleAgain.bind(this),
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

  startTimeout() {
    this.$audio.countDown();
    setTimeout(() => {
      this.hostRestTime -= 1;
      if (this.hostRestTime > 0) {
        this.startTimeout();
      }
    }, 1000);
  }

  ready() {
    this.$audio.pop();
    (<WebSocket>this.ws).send(JSON.stringify({
      type: WsEventType.ready,
      data: {
        roomId: this.roomId
      }
    }));
  }

  getHost() {
    this.$audio.btn4();
    // console.log('抢庄');
    (<WebSocket>this.ws).send(JSON.stringify({
      type: WsEventType.getHost,
      data: {
        roomId: this.roomId
      }
    }));
  }

  playAgain() {
    this.$audio.pop();
    this.host = null;
    this.hostRestTime = 3;
    this.rotate = false;
    this.end = false;
    (<WebSocket>this.ws).send(JSON.stringify({
      type: WsEventType.again,
      data: {
        roomId: this.roomId
      }
    }));
  }

  onFinish(item) {
    this.$audio.btn1();
    (<WebSocket>this.ws).send(JSON.stringify({
      type: WsEventType.finish,
      data: {
        roomId: this.roomId
      }
    }));
  }
  onOpen() {
    this.$audio.btn2();
    this.rotate = true;
  }

  handleGetHost(data) {
    // console.log('host:', data);
    this.host = data;
  }

  handleFinish(data) {
    if (data.end) {
      setTimeout(() => {
        this.end = true;
      }, 1000);
      this.updateScore(data.member);
    }
    this.handleIntoRoom(data.member);
  }
  handleAgain(data) {
    data.forEach((item, index) => {
      item.user.score = this.data[index].role.score;
    });
    this.handleIntoRoom(data);
  }
  updateScore(member) {
    const info = this.loginUser;
    member.forEach(item => {
      if (item.user.id == info.id) {
        info.score += item.money;
        item.money > 0 ? this.$audio.victory() : this.$audio.fail();
        this.$setStorage(storageName, info);
        dispatchSetLoginUser(info);
      }
    });
  }

  beforeDestroy() {
    this.ws && this.ws.close();
  }

  outRoom() {
    this.$audio.pop();
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
  handleReady(data) {
    this.handleIntoRoom(data);
    if (this.allReady) {
      this.startTimeout();
    }
  }

  handleIntoRoom(data) {
    // console.log(data);
    const list: GroupInfo[] = [];
    data.forEach(item => {
      list.push({
        role: item.user,
        list: item.card,
        ready: item.ready,
        score: item.score,
        finish: item.finish
      });
    });
    this.data = list;
  }
  handleOutRoom(data) {
    if (data.front) {

    } else {
      this.data = this.data.filter(item => item.role.id != data.outId);
    }
  }
}
</script>
<style lang="stylus">
.room-home
  background-image url('../../assets/bg.png')
  background-size 100% 100%
  .btn-back
    position absolute
    left 0
    top 0
  .btn-ready
    position absolute
    width 80px
    border-radius 35px
    left 50%
    top 50%
    transform translateX(-50%) translateY(-50%)
    height: 30px;
    line-height: 30px;
    background: linear-gradient(45deg, #4fc0e2, #56a3da);
    color: #fff;
    font-weight: bold;
  .host-time
    font-size 14px
    position absolute
    transform translateX(-50%) translateY(-50%)
    left 50%
    top 50%
    background: linear-gradient(to left, rgba(22, 141, 225, 0.3), rgb(22, 141, 225), rgba(22, 141, 225, 0.3));
    padding: 0 30px;
    color: #fff;
    height: 30px;
    line-height: 30px;
</style>
<style lang="stylus">
@keyframes rotate {
  from {
    transform rotateY(0deg)
  }
  to {
    transform rotateY(360deg)
  }
}
.room-home-rotate .self-group
  .card-item
    animation rotate 2s ease
</style>
