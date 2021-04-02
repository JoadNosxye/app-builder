<template>
  <div id="preview-main">
    <srkj-layout :params='params' :attributes="attributes"></srkj-layout>
  </div>
</template>
<script>
export default {
  computed: {
    params() {
      const params = {}
      params.rowName = 'preview-main-row'
      params.colNum = 1
      params.spans = '24'
      return params
    },
    attributes() {
      const attributes = {}
      attributes.gutter = 0
      return attributes
    }
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







