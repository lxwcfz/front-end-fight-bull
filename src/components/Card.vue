<template lang="pug">
    div.card-wrap(:class="`card-${number}`")
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
    border-radius 5px
    background-image url('../assets/cards.png')
.card-0
    background-image url('../assets/card-back.png')
    background-size 100% 100%
/**黑桃 */
.card-4
    background-position -216px -109px
.card-8
    background-position -288px -109px
.card-12
    background-position -360px -109px
.card-16
    background-position -432px -109px
.card-20
    background-position -504px -109px
.card-24
    background-position -576px -109px
.card-28
    background-position 0 0
.card-32
    background-position -72px 0
.card-36
    background-position -144px 0
.card-40
    background-position -216px 0
.card-44
    background-position -288px 0
.card-48
    background-position -360px 0
.card-52
    background-position -432px 0
/*梅花 */
.card-3
    background-position -288px -434px
.card-7
    background-position -360px -434px
.card-11
    background-position -432px -434px
.card-15
    background-position -504px -434px
.card-19
    background-position -576px -434px
.card-23
    background-position 0 -326px
.card-27
    background-position -72px -326px
.card-31
    background-position -144px -326px
.card-35
    background-position -216px -326px
.card-39
    background-position -288px -326px
.card-43
    background-position -360px -326px
.card-47
    background-position -432px -326px
.card-51
    background-position -504px -326px
/**红桃 */
.card-2
    background-position -576px -326px
.card-6
    background-position 0 -217px
.card-10
    background-position -72px -217px
.card-14
    background-position -144px -217px
.card-18
    background-position -216px -217px
.card-22
    background-position -288px -217px
.card-26
    background-position -360px -217px
.card-30
    background-position -432px -217px
.card-34
    background-position -504px -217px
.card-38
    background-position -576px -217px
.card-42
    background-position -72px -109px
.card-46
    background-position -144px -109px
.card-50
    background-position -216px -109px
/**方片 */
.card-1
    background-position 0 -543px
.card-5
    background-position -72px -543px
.card-9
    background-position -144px -543px
.card-13
    background-position -216px -543px
.card-17
    background-position -288px -543px
.card-21
    background-position -360px -543px
.card-25
    background-position -432px -543px
.card-29
    background-position -504px -543px
.card-33
    background-position -572px -543px
.card-37
    background-position 0 -434px
.card-41
    background-position -72px -434px
.card-45
    background-position -144px -434px
.card-49
    background-position -216px -434px
</style>