<template>
  <div @dragover="allowDrop" @dragstart="drag">
    <el-button id='a' name="srkj-layout" type="primary" draggable="true">布局组件</el-button>
    <el-button id='b' name="srkj-button" type="primary" draggable="true">按钮组件</el-button>
    <el-button id='c' name="srkj-table" type="primary" draggable="true">表格组件</el-button>
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
      const datas = {}
      if (ev.target.id === 'a') {
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
      if (ev.target.id === 'c') {
        datas[componentId] = {}
        datas[componentId]['tableData'] = [
          {
            date: '2016-05-02',
            name: 'aa',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: 'a',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '123',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: 'da',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
      params.componentId = componentId
      params.componentName = componentName
      ev.dataTransfer.setData('params', JSON.stringify(params))
      ev.dataTransfer.setData('attributes', JSON.stringify(attributes))
      ev.dataTransfer.setData('datas', JSON.stringify(datas))
    }
  }
}
</script>





