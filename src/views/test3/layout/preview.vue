<template>
  <div id="preview-main">
    <freeLayout :params='params' :attributes="attributes"></freeLayout>
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
      attributes.gutter = 20
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







