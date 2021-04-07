<template>
  <div @dragover="allowDrop" @dragstart="drag">
    <el-button id='a' name="srkj-layout" type="primary" draggable="true">布局组件</el-button>
    <el-button id='b' name="srkj-button" type="primary" draggable="true">按钮组件</el-button>
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
      let attributes = {}
      if (ev.target.id === 'a') {
        // params.rowName = 'row-' + Math.round(Math.random() * 1000)
        // params.colNum = 2
        // params.spans = '12,12'
        attributes = {
          row: {
            gutter: 0
          },
          cols: [
            {
              // 第一列的id一定要从0开始
              id: '0',
              span: 12,
              offset: ''
            },
            {
              id: '1',
              span: 12,
              offset: ''
            }
          ]
        }
      }
      if (ev.target.id === 'b') {
        attributes = {
          name: '按钮',
          type: 'primary',
          size: 'medium',
          plain: false
        }
      }
      params.componentId = componentId
      params.componentName = componentName
      ev.dataTransfer.setData('params', JSON.stringify(params))
      ev.dataTransfer.setData('attributes', JSON.stringify(attributes))
    }
  }
}
</script>





