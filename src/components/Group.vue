<template lang="pug">
    div(:class="data.role.id == userInfo.id ? 'self-group' : `group-${position}`", v-if="data")
        Role(:info="data.role")
        CardGroup(:list="data.list" :isSelf="data.role.id == userInfo.id")
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import Role from '@/components/Role.vue';
import CardGroup from '@/components/CardGroup.vue';
import getter from '../store/getter';

@Component({
    components: {
        CardGroup,
        Role
    }
})
export default class Group extends Vue {
    @Prop()
    data!: GroupInfo;
    @Prop()
    position!: number;

    userInfo: RoleInfo = {
        name: 'name',
        img: require('../assets/role-male.png'),
        id: 1,
        score: 100
    };
}
</script>

<style lang="stylus">
.self-group
  height: 121px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform translateX(-50%)
  white-space nowrap
  .role-wrap
    position absolute!important
    left 0
    top 50%
    transform translateX(-100%) translateY(-50%)
.group-1
  display inline-block
  position: absolute;
  width: 220px;
  text-align: left;
  height: 120px;
  top: 5px;
  left: 50%;
  transform: translateX(-262px);
  .card-group
    transform scale(.7)
    position: absolute;
    right: -28px;
    bottom: -16px;
.group-2
  display: inline-block;
  position: absolute;
  width: 220px;
  text-align: right;
  height: 120px;
  top: 5px;
  left: 50%;
  transform: translateX(42px);
  .card-group
    transform scale(.7)
    position: absolute;
    left: -28px;
    bottom: -16px;
.group-3
  display inline-block
  position: absolute;
  width: 220px;
  text-align: left;
  height: 120px;
  top: 110px;
  left: 20px;
  .card-group
    transform scale(.7)
    position: absolute;
    right: -10px;
    bottom: -16px;
.group-4
  display inline-block
  position: absolute;
  width: 220px;
  text-align: right;
  height: 120px;
  top: 110px;
  right: 20px;
  .card-group
    transform scale(.7)
    position: absolute;
    left: 0;
    bottom: -16px;
</style>