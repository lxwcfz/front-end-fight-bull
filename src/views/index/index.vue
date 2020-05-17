<template lang="pug">
  div.index-page.h100.tc
    div.header.tl.white
      div.flex.align-center
        div.head-item
          img.head-img(@click="showHeadList = true", :src="handleHead(loginUser.img) || require('@/assets/role-bull.png')")
          div.name-title-wrap
            span.name.tl.text-overflow {{ loginUser.name }}
            span.title.inline-block.ml1(:class="loginUser.score > 100 ? 'badge-red' : 'badge-blue'") {{ getTitle(loginUser.score) }}
        div.score-wrap
          img(src="@/assets/douzi.png")
          span.score {{ loginUser.score }}
      div.btn-logout.btn-normal.pointer(@click="logout")
        img(src="@/assets/注销.png")
        span 注销
    content.h100
      div.role-wrap.inline-block.relative
        //- img(src="@/assets/niuniu.png", @click="showRule = true")
        div.flash-wrap
          span.flash
          img.pointer(src="@/assets/beauty.png", @click="showRule = true")
        div.rule-tip-wrap.overflow.tl
          span.rule-tip.relative(@click="showRule = true") 不知道怎么玩？点我啊
      div.option-wrap.inline-block
        div.btn-go(@click="toRoom")
          img.btn-go-img(src="@/assets/logo.png")
          span.btn-go-span 房间列表
        div.btn-go.ml2(@click="toCreate")
          img.btn-go-img(src="@/assets/logo.png")
          span.btn-go-span 创建房间
    //- 规则
    vantPopup.rule-wrap(v-model="showRule")
      div.rule
        div.title 游戏规则
        div.content
          span.overflow-y.px1.h100.inline-block
            span.mt2.inline-block(v-for="(item,index) in rule", :key="index") {{ item }}
    //- 选择头像
    head-selection(v-show="showHeadList", @submit="onSubmitHead")
    //- 新建房间
    van-action-sheet.create-pop(v-model="showCreate", title="创建房间")
      div.w100.p4.flex.align-center.justify-center.create-wrap
        span.f4.dark 请输入房间名：
        input.create-input(v-model="newRoomName", placeholder="房间名")
        div.f4.white.btn-normal.btn-create-room.justify-center(@click="ensureCreateRoom") 确定
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Getter} from "vuex-class";
  import {Popup, Notify, Tag, ActionSheet} from 'vant';
  import {storageName, RULE, TITLE} from '../../config/config';
  import {socket, WsEventType, WsSendData} from "@/socket";
  import HeadSelection from "@/components/HeadSelection.vue";
  import {checkExpireApi, submitHeadPicApi} from "@/api";
  import {setStorage} from "@/utils/storage";
  import {dispatchSetLoginUser} from "@/store/dispatches";

  @Component({
    components: {
      HeadSelection,
      vantPopup: Popup,
      vanTag: Tag,
      vanActionSheet: ActionSheet
    }
  })
  export default class Home extends Vue {
    @Getter loginUser;

    rule = RULE;
    showRule = false;
    ws: WebSocket | null = null;
    showCreate = false;
    newRoomName = '';
    timer: any = '';
    showHeadList = false;

    mounted() {
        checkExpireApi();
        const ws = socket({
            [WsEventType.newRoom]: this.handleNewRoom
        });
        this.ws = ws;
    }

    handleNewRoom(data) {
      if (JSON.parse(data.creator).id == this.loginUser.id) {
        this.setMovement(`${data.name}创建成功`);
      } else {
        this.setMovement(`有人创建了房间-${data.name}`);
      }
      this.$audio.success();
      this.showCreate = false;
      this.newRoomName = '';
    }

    setMovement(msg) {
      const div = document.createElement('div');
      div.className = 'movement orange';
      div.innerHTML = msg;
      (<any>document).body.querySelector('.index-page').appendChild(div);
      this.timer = setTimeout(() => {
        (<any>document).body.querySelector('.index-page').removeChild(div);
      }, 7000);
    }

    beforeDestroy() {
      clearTimeout(this.timer);
      this.ws && this.ws.close();
    }

    toRoom() {
      this.$audio.pop();
      this.$router.push({
        name: "roomList"
      });
    }

    onSubmitHead(name) {
      submitHeadPicApi({ name }).then(res => {
          const user = JSON.parse(JSON.stringify(this.loginUser));
          user.img = name;
          setStorage(storageName, user);
          dispatchSetLoginUser(user);
          this.showHeadList = false;
      })
    }

    handleHead(src) {
        if (!src) {
            return '';
        }
        return require(`@/assets/${src}`);
    }

    toCreate() {
      this.$audio.pop();
      this.showCreate = true;
    }

    ensureCreateRoom() {
      this.$audio.pop();
      const data: WsSendData = {
        type: WsEventType.newRoom,
        data: {
          name: this.newRoomName
        }
      };
      (<WebSocket>this.ws).send(JSON.stringify(data));
    }

    logout() {
      this.$audio.pop();
      this.$removeStorage(storageName);
      const url = window.location.href;
      window.location.href = url.replace(/#\/.*/, 'login.html');
      window.location.reload();
    }

    getTitle(score) {
      let title = '';
      TITLE.forEach((val, key) => {
        if (key.test(score)) {
          title = val;
        }
      });
      return title;
    }
  }
</script>
<style lang="stylus">
  @keyframes rotateTag {
    0% {
      background: linear-gradient(45deg, #29bdd9 0%, #276ace 100%);
    }
    10% {
      background: linear-gradient(81deg, #29bdd9 0%, #276ace 100%);
    }
    20% {
      background: linear-gradient(127deg, #29bdd9 0%, #276ace 100%);
    }
    30% {
      background: linear-gradient(161deg, #29bdd9 0%, #276ace 100%);
    }
    40% {
      background: linear-gradient(197deg, #29bdd9 0%, #276ace 100%);
    }
    50% {
      background: linear-gradient(233deg, #29bdd9 0%, #276ace 100%);
    }
    60% {
      background: linear-gradient(269deg, #29bdd9 0%, #276ace 100%);
    }
    70% {
      background: linear-gradient(305deg, #29bdd9 0%, #276ace 100%);
    }
    80% {
      background: linear-gradient(341deg, #29bdd9 0%, #276ace 100%);
    }
    90% {
      background: linear-gradient(-17deg, #29bdd9 0%, #276ace 100%);
    }
    100% {
      background: linear-gradient(45deg, #29bdd9 0%, #276ace 100%);
    }
  }

  @keyframes scaling {
    0% {
      transform scale(1)
    }
    50% {
      transform scale(1.05)
    }
    100% {
      transform scale(1)
    }
  }

  @keyframes transforming {
    0% {
      background: linear-gradient(to right, transparent, #1293e4 30%, transparent);
    }
    13% {
      background: linear-gradient(to right, transparent, #1293e4 40%, transparent);
    }
    26% {
      background: linear-gradient(to right, transparent, #1293e4 50%, transparent);
    }
    40% {
      background: linear-gradient(to right, transparent, #1293e4 60%, transparent);
    }
    50% {
      background: linear-gradient(to right, transparent, #1293e4 70%, transparent);
    }
    60% {
      background: linear-gradient(to right, transparent, #1293e4 60%, transparent);
    }
    74% {
      background: linear-gradient(to right, transparent, #1293e4 50%, transparent);
    }
    87% {
      background: linear-gradient(to right, transparent, #1293e4 40%, transparent);
    }

    100% {
      background: linear-gradient(to right, transparent, #1293e4 30%, transparent);
    }
  }

  @keyframes widthToggle {
    0% {
      width 0
    }
    60% {
      width 0
    }
    90% {
      width 200px
    }
    100% {
      width 200px
    }
  }

  @keyframes movement {
    from {
      transform none
    }
    to {
      transform translateX(-1000px)
    }
  }

  .index-page {
    background-image: url('../../assets/index-bg.png');
    background-size: 100% 100%;
    width: 100%;

    .btn-go {
      position: relative;
      display: inline-block;
      width: 100px;
      cursor: pointer;
      transform translate(15px, -30px)

      &:active {
        opacity: 0.7;
      }
    }

    .btn-go-img {
      width: 90px;
      border-radius: 50%;
    }

    .btn-go-span {
      font-size: 20px;
      height: 26px;
      line-height: 26px;
      position: absolute;
      left: 50%;
      bottom: -5px;
      transform: translateX(-50%);
      color: #fff;
      font-weight: bold;
      background: linear-gradient(to right, transparent, #1293e4, transparent);
      white-space: nowrap;
      width: 100%;
      text-align: center;
      z-index: 10;
      animation: transforming 1.5s infinite;
    }

    .tag {
      z-index: 5;
      width: 10px;
      height: 26px;
      display: inline-block;
      position: absolute;
      bottom: -5px;
    }
  }

  .index-page .header
    display flex
    flex-direction row
    align-items center
    justify-content space-between

    .btn-logout
      margin-right 20px
      height 32px
      background: rgba(0, 0, 0, .3)

    .head-item
      background rgba(0, 0, 0, 0.3)
      border-radius 19px
      height 38px
      margin-left 20px
      display inline-flex
      align-items center

      .head-img
        width: 38px;
        height: 38px;
        border-radius: 19px;

      .name-title-wrap
        height 38px
        display flex
        flex-direction column
        align-items flex-start
        justify-content center
        font-size 0

      .name
        font-size 14px
        width 100px
        display inline-block
        line-height 22px
        height 22px
        padding 0 5px
        box-sizing border-box

      .title
        height 16px
        line-height 16px
        font-size 12px
        color #fff
        padding 0 5px
        text-align: center;
        border-radius: 5px;
        background: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
        transform: translateY(-1px);
        animation rotateTag 1s ease infinite
  .score-wrap
    height 30px
    border-radius 15px
    margin-left 20px
    display inline-flex
    align-items center
    background rgba(0, 0, 0, 0.3)
    padding 0 10px

    img
      width 20px

    .score
      font-size 14px
      margin 0 10px

  .index-page
    padding-top 46px
    position relative
    box-sizing border-box

    .header
      position absolute
      left 0
      top 0

    content
      height 100%

    .role-wrap, .option-wrap
      width 50%
      height 100%
      display inline-flex
      align-items center
      vertical-align top
      justify-content center

    .role-wrap
      img
        width 100px
        animation scaling 2s ease infinite

    .rule
      border-radius: 10px;
      background: #d0a066;
      overflow hidden

      .title
        font-size 12px
        height 30px
        line-height 30px

      .content
        padding: 10px 25px 20px 25px;
        background: #e8dfd0;
        color: #bb6f10;
        text-align: left;
        font-size: 12px;
        height: 200px;

    .rule-wrap.van-popup
      background none

    .rule-tip-wrap
      white-space: nowrap;
      left: 50%;
      top: 50%;
      transform: translate(26px, -60px);
      position absolute
      height 30px
      animation widthToggle 10s ease infinite

    .rule-tip
      width: 141px;
      white-space: nowrap;
      color: #fff;
      left 17px
      top 5px
      // background: rgba(255,255,255,.3);
      border: 1px solid #56a6cc;
      padding: 4px 10px 4px 4px;
      border-radius: 4px;
      border-left: none;

      &:before
        content ''
        display block
        position absolute
        left -9px
        top -6px
        transform rotate(60deg)
        width 1px
        height 24px
        background #56a6cc

      &:after
        content ''
        display block
        position absolute
        left -9px
        bottom -6px
        transform rotate(-60deg)
        width 1px
        height 24px
        background #56a6cc
  .create-input
    font-size 14px
    color #666
    padding 0 10px
    border 1px solid #eee
    width 200px
    height 30px
    margin-left 10px
    box-sizing border-box
    line-height 30px
    border-radius 4px
  .btn-create-room
    margin-left 10px
    display inline-block
    width 100px
    text-align center
    background #168de1
    color #fff
  .create-wrap
    height 100px
    background: #e8dfd0;
  .create-pop
    background #d0a066
    .van-action-sheet__close
      color #323233
  .movement
    position: fixed;
    display inline-block
    right: 0;
    top: 46px;
    height: 30px;
    font-size 14px
    line-height: 30px;
    background: rgba(0,0,0,.3);
    padding: 0 20px;
    border-radius: 10px;
    animation movement 10s linear
</style>
