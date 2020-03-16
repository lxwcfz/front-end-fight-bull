<!--编写规范参照例子-->
<template lang="pug">
  div.about
    h1 This is demo
</template>
<script lang="ts">
import { Component,Vue, Watch, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  components: {},
  mixins: []
})
export default class Demo extends Vue {

 /*
  props
 */
  @Prop({ default: '' })
  propData!: string[]

 /*
   data
  */
 demoData: string = ''

 /*
  computed & vuex
  */
  get computedData() {
    return 1
  }
  @Getter('token')


  /*
  watch
   */
  @Watch('demoData')
  onDemoDataChange() {
  }

  /*
  生命周期函数
   */
  beforeCreate(){}
  created() {}
  beforemount(){}
  mounted(){}
  beforeUpdate(){}
  updated(){}
  beforeDestroy(){}
  destroyed(){}

  /*
  methods
   */
  getData(){}
}

</script>

<style lang="stylus" scoped>

</style>