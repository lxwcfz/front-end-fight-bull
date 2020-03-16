<template>
  <div class="home h100">
    <img class="logo" src="@/assets/logo.png" alt="">
    <Group v-for="(item,index) in data" :key="index" :position="index+1" :data="item"></Group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Group from '@/components/Group.vue';

@Component({
  components: {
    Group
  },
})
export default class Home extends Vue {
  data: GroupInfo[] = [
    {
      role: {
        name: '赌神',
        score: 100,
        id: 0,
        img: require('@/assets/role-female.png')
      },
      list: [1,2,3,4,5]
    },
    {
      role: {
        name: '赌神',
        score: 100,
        id: 0,
        img: require('@/assets/role-female.png')
      },
      list: [1,2,3,4,5]
    },
    {
      role: {
        name: '赌神',
        score: 100,
        id: 0,
        img: require('@/assets/role-female.png')
      },
      list: [1,2,3,4,5]
    },
    {
      role: {
        name: '赌神',
        score: 100,
        id: 0,
        img: require('@/assets/role-female.png')
      },
      list: [1,2,3,4,5]
    },
    {
      role: {
        name: '赌神',
        score: 100,
        id: 1,
        img: require('@/assets/role-female.png')
      },
      list: [1,2,3,4,5]
    },
  ]
}
</script>
<style lang="stylus">
.home
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
