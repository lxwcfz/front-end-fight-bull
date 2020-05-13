<template lang="pug">
    div.card-group.inline-block
        span.score.orange(v-show="score > -1") {{ bullText }}
        div.inline-block.card-item(
            v-for="(item, index) in list", 
            :key="index",
            :class="isSelf ? `self-item card${index}` : `item card${index}`",)
            Card(:number="item")
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
    components: {
        Card
    }
})
export default class CardGroup extends Vue {
    @Prop()
    list!: number[];
    @Prop()
    isSelf!: boolean;
    @Prop({ default: -1 })
    score!: number;

    get bullText() {
        if (this.score > -1) {
            if (this.score == 0) {
                return '没 牛';
            }
            if (this.score == 0.5) {
                return '五小牛';
            }
            if (this.score == 10) {
                return '牛 牛';
            }
            if (this.score == 11) {
                return '五花牛';
            }
            return `牛 ${this.score}`;
        }
        return '';
    }
}
</script>

<style lang="stylus">
.card-group
    position relative
    height 107px
    min-width 190px
    .self-item
        margin-left 5px
    .item
        position absolute
        top 0px
    .card0
        left 0
    .card1
        left 30px
    .card2
        left 60px
    .card3
        left 90px
    .card4
        left 120px
    .score
        min-width: 90px;
        font-size: 24px;
        display inline-block
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(-15deg);
        text-align: justify;
        background: rgba(0,0,0,.4);
        border: 1px dashed;
        z-index 10
        white-space normal
        font-weight bolder
        padding 5px 10px
        border-radius 4px
        height 42px
        &:after
            content:'';
            width: 100%;
            display: inline-block;
            height: 0;
</style>