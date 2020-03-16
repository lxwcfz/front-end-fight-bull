<template lang="pug">
    div.card-group.inline-block
        div.inline-block(
            v-for="(item, index) in list", 
            :key="index", 
            :class="isSelf ? 'self-item' : `item`",
            :style="{'left': `${index*30}px`}")
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
</style>