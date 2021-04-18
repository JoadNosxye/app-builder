<template>
  <el-form ref="form" :model="styleModel" label-width="80px">
    <el-form-item label="样式">
      <el-input type="textarea" v-model="styleModel.style"></el-input>
    </el-form-item>
  </el-form>
</template>


<script>
import { getBus } from '@/utils/bus'
import { deepCopy } from '@/utils'
export default {
  props: ['params'],
  mounted() {
    getBus().$on(this.params.componentId + '-' + 'save', this.save)
  },
  data() {
    return {
      styleModel: {
        style: ''
      }
    }
  },
  methods: {
    save() {
      const component = { componentId: this.params.componentId }
      component.styles = deepCopy(this.styleModel).style
      this.$store.dispatch('setComponentStyles', component)
    }
  }
}
</script>