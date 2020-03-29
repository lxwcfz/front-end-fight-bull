<template lang="pug">
    img.card-wrap(:src="require(`../assets/card-${number}.png`)")
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
    @Prop() private number!: number;
}
</script>

<style lang="stylus">
.card-wrap
    width 69px
    height 107px
    overflow hidden
    border 1px solid #999
    border-radius 5px
</style>