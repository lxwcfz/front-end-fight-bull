<template lang="pug">
    div.role-wrap.inline-block(v-if="info")
        img.head-img(:src="info.img")
        div.name.w100.tc.text-overflow {{ info.name }}
        div.score.w100.tc.text-overflow {{ info.score }}
</template>

<script>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

export default {
    name: 'Role',
    props: ['info']
}
</script>

<style lang="stylus" scoped>
.role-wrap
    padding: 5px 5px 5px 50px;
    position: relative;
    height: 50px;
    width: 120px;
    box-shadow: 0 0 5px 0 #ddd;
    border-radius: 5px;
    background rgba(222,222,222,.1)
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
</style>