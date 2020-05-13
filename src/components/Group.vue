<template lang="pug">
    div.relative(:class="isSelf ? 'self-group' : `group-${position}`", v-if="data")
        slot(name="ready")
        Role(:info="data.role", :position="position" :host="host", :ready="data.ready && data.list.length == 0")
        CardGroup(:list="getList", :score="data.score", :isSelf="isSelf")
        span.btn-open(v-show="isSelf && host && !open", @click="openCard") 翻牌
        span.btn-open(v-show="isSelf && host && open && !data.finish", @click="finish") 开牌
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import Role from '@/components/Role.vue';
import CardGroup from '@/components/CardGroup.vue';
import getter from '../store/getter';
import { Getter } from 'vuex-class';

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
    host!: GroupInfo;
    @Prop()
    position!: number;

    @Watch('data')
    onDataChange(data) {
      if (this.open == true && data.list.length == 0) {
        this.open = false;
      }
    }

    @Getter loginUser;
    get isSelf() {
      return this.data.role.id == this.loginUser.id
    }
    get getList() {
      const backList = this.data.list.length > 0 ? ['back','back','back','back','back'] : [];
      if (this.isSelf) {
        return this.open ? this.data.list : backList;
      } else {
        return this.data.finish ? this.data.list : backList;
      }
    }
    open = false;

    finish() {
      this.$emit('finish', this.data)
    }
    openCard() {
      this.$emit('open');
      setTimeout(() => {
        this.open = true;
      }, 1000);
    }
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
.btn-open
  width: 65px;
  text-align: center;
  display: inline-block;
  height: 30px;
  background: linear-gradient(45deg, #4fc0e2, #56a3da);
  color: #fff;
  font-weight: bold;
  border-radius: 7px;
  line-height: 30px;
  vertical-align: top;
  position: absolute;
  right: -80px;
  top: 36px;
</style>