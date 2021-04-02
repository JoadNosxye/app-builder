<template>
  <div @dragover="allowDrop" @dragstart="drag">
    <el-button id='a' name="srkj-layout" type="primary" draggable="true">布局组件</el-button>
    <el-button id='b' name="component2" type="primary" draggable="true">文字组件</el-button>
    <el-button id='c' name="srkj-button" type="primary" draggable="true">按钮组件</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drag(ev) {
      const componentId =
        ev.target.name + '-' + Math.round(Math.random() * 1000)
      const componentName = ev.target.name
      ev.dataTransfer.setData('componentName', componentName)
      ev.dataTransfer.setData('componentId', componentId)
      const params = {}
      const attributes = {}
      if (ev.target.id === 'a') {
        params.rowName = 'row-' + Math.round(Math.random() * 1000)
        params.colNum = 2
        params.spans = '12,12'
        attributes.gutter = 0
      }
      params.componentId = componentId
      params.componentName = componentName
      ev.dataTransfer.setData('params', JSON.stringify(params))
      ev.dataTransfer.setData('attributes', JSON.stringify(attributes))
    }
  }
}
</script>





