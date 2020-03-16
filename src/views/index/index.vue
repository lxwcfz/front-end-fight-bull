<template lang="pug">
    div.index-page.h100.tc
        div.header.tl.white
            div.flex.align-center
                div.head-item
                    img.head-img(:src="loginUser.img")
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
                    span.btn-go-span 进入房间
        //- 规则
        vantPopup(v-model="showRule")
            div.rule
                div.title 游戏规则
                div.content 
                    span.overflow-y.px1.h100.inline-block 
                        span(v-for="(item,index) in rule", :key="index") {{ item }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Group from "@/components/Group.vue";
import { Getter } from "vuex-class";
import { Popup, Tag } from 'vant';
import { storageName, RULE, TITLE } from '../../config/config';

@Component({
  components: {
      vantPopup: Popup,
      vanTag: Tag
  }
})
export default class Home extends Vue {
    @Getter loginUser;

    rule = RULE;
    showRule = false;

    toRoom() {
        this.$router.push({
            name: "room"
        });
    }
    logout() {
        this.$removeStorage(storageName);
        const url = window.location.href;
        window.location.href = url.replace(/#\/.*/, 'login.html');
        window.location.reload();
    }
    getTitle(score) {
        let title = '';
        TITLE.forEach((val, key) => {
            if(key.test(score)) {
                title = val;
            }
        })
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
    animation: transforming 1.5s infinite ;
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
.header
    width: 100%;
    height: 46px;
    box-shadow: 0 0 15px #524e4e;
    background: rgba(255,255,255,.3);
    display flex
    flex-direction row
    align-items center
    justify-content space-between
    .btn-logout
        margin-right 20px
        height 32px
        background: rgba(0, 0, 0, .3)
    .head-item
        background rgba(0,0,0,0.3)
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
        .badge-blue
            // background-image url('../../assets/badge-blue.png')
        .badge-red
            // background-image url('../../assets/badge-red.png')
    .score-wrap
        height 30px
        border-radius 15px
        margin-left 20px
        display inline-flex
        align-items center
        background rgba(0,0,0,0.3)
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
    .role-wrap,.option-wrap
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
        background: #e2a253;
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
    .van-popup
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
</style>
