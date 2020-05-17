<template lang="pug">
    div.role-wrap.inline-block(v-if="info")
        img.head-img(:src="handleHead(info.img) || getRandomHead()")
        div.name.w100.tc.text-overflow {{ info.name }}
        div.score.w100.tc.text-overflow {{ score }}
        span.money(:class="{'crease': showIncrease}") {{ increase > 0 ? `+${increase}` : `${increase}` }}
        img.ready-icon(:class="{'left-ready': position % 2 == 0}", src="@/assets/ok.png", v-show="ready")
        img.crown(src='@/assets/crown.png', v-if="host && host.id == info.id")
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { getStorage } from '../utils/storage';
import { storageName } from '../config/config';
import { Getter } from 'vuex-class';

@Component({})
export default class Role extends Vue {
    name = 'Role';
    @Prop()
    info!: GroupInfo;
    @Prop()
    ready!: boolean;
    @Prop()
    host!: GroupInfo;
    @Prop()
    position!: number;

    score = this.info.score;
    increase = 0;
    showIncrease = false;

    @Watch('info', { immediate: true })
    onInfoChange(info) {
        this.increase = info.score - this.score;
        if (this.increase !== 0) {
            this.showIncrease = true;
            setTimeout(() => {
                this.showIncrease = false;
                this.increase = 0;
            }, 3900);
        }
        this.setScore(this.score > info.score ? -1 : 1);
    }

    @Getter loginUser;

    setScore(add) {
        if (this.score != this.info.score) {
            this.score += add;
            setTimeout(() => {
                this.setScore(add);
            }, 100)
        }
    }
    getRandomHead() {
        return require('../assets/role-bull.png')
    }
    handleHead(src) {
        if (!src) {
            return '';
        }
        return require(`@/assets/${src}`);
    }
}
</script>

<style lang="stylus" scoped>
@keyframes crown {
    0% {
        width 0
        height 0
    }
    100% {
        width 30px
        height 30px
    }
}
@keyframes increase {
    0% {
        top 25px
        opacity 1
    }
    50% {
        opacity 1
        top 25px
    }
    100% {
        opacity 0
        top -20px
    }
}
.role-wrap
    padding: 5px 5px 5px 50px;
    position: relative;
    height: 50px;
    width: 120px;
    box-shadow: 0 0 5px 0 #ddd;
    border-radius: 5px;
    background rgba(222,222,222,.1)
    .ready-icon
        width 30px
        position absolute
        right -50px
        top 10px
    .left-ready
        left -50px
    .head-img
        width 40px
        height 40px
        position absolute
        left 10px
        top 5px
    .name
        color #fff
        height 20px
        line-height 20px
    .score
        color #f5f910
        height 20px
        line-height 20px
    .crown
        width: 30px;
        height 30px
        animation crown 2s ease
        position: absolute;
        left: -5px;
        top: -6px;
        background: rgba(23, 22, 21, 0.5);
        border-radius: 50%;
    .money
        color #f5f910
        height 20px
        line-height 20px
        position absolute
        right 5px
        opacity 0
        top 25px
    .crease
        animation increase 4s ease
</style>