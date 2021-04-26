<template>
  <div id="preview-main">
    <srkj-layout :params="params"></srkj-layout>
  </div>
</template>
<script>
export default {
  computed: {
    componentName() {
      return 'preview-main-row'
    },
    componentId() {
      return 'preview-main-row'
    },
    componentType() {
      return 'srkj-layout'
    },
    params() {
      const params = {}
      params.componentId = this.componentId
      params.componentName = this.componentName
      params.componentType = this.componentType
      return params
    },
    attributes() {
      const attributes = {}
      attributes.row = { gutter: 0 }
      attributes.cols = [{ id: '0', span: 24 }]
      return attributes
    }
  },
  created() {
    this.$store.dispatch('addComponents', {
      rowId: 'preview-init-row',
      colId: 0,
      componentName: this.componentName,
      componentId: this.componentId,
      componentType: this.componentType,
      params: this.params,
      attributes: this.attributes
    })

    // this.$store.dispatch('addComponents', {
    //   rowId: 'preview-main-row',
    //   colId: 0
    // })

    // 设置当前组件为刚拖拽过来的组件
    this.$store.dispatch('setCurrentComponent', {
      componentId: this.componentId,
      componentName: this.componentName,
      componentType: this.componentType
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







