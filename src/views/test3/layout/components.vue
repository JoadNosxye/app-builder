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
      ev.dataTransfer.setData('componentName', ev.target.name)
      const id = ev.target.name + '-' + Math.round(Math.random() * 1000)
      ev.dataTransfer.setData('componentId', id)
      if (ev.target.id === 'a') {
        const params = {}
        params.rowName = 'row-' + Math.round(Math.random() * 1000)
        params.colNum = 2
        params.spans = '12,12'
        const attributes = {}
        attributes.gutter = 0
        ev.dataTransfer.setData('params', JSON.stringify(params))
        ev.dataTransfer.setData('attributes', JSON.stringify(attributes))
      } else {
        ev.dataTransfer.setData('params', JSON.stringify(''))
        ev.dataTransfer.setData('attributes', JSON.stringify(''))
      }
    }
  }
}
</script>





