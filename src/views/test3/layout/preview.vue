<template>
  <div id="preview-main">
    <srkj-layout :params='params' :attributes="attributes"></srkj-layout>
  </div>
</template>
<script>
export default {
  computed: {
    componentName() {
      return 'srkj-layout'
    },
    componentId() {
      return this.componentName + '-' + Math.round(Math.random() * 1000)
    },
    params() {
      const params = {}
      params.rowName = 'preview-main-row'
      params.colNum = 1
      params.spans = '24'
      params.componentId = 0
      params.componentName = this.componentName
      return params
    },
    attributes() {
      const attributes = {}
      attributes.gutter = 0
      return attributes
    }
  },
  created() {
    this.$store.dispatch('addComponents', {
      rowId: 'preview-main-row',
      colId: 1,
      componentName: this.componentName,
      componentId: this.componentId,
      params: this.params,
      attributes: this.attributes
    })

    // 设置当前组件为刚拖拽过来的组件
    this.$store.dispatch('setCurrentComponent', {
      componentId: this.componentId,
      componentName: this.componentName
    })
  }
}
</script>
<style scoped>
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
  border: 1px solid red;
}
.component {
  height: 100%;
}
</style>







