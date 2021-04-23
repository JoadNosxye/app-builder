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
      const componentType = ev.target.name
      const componentName = componentId
      ev.dataTransfer.setData('componentName', componentName)
      ev.dataTransfer.setData('componentId', componentId)
      ev.dataTransfer.setData('componentType', componentType)
      const params = {}
      let attributes = {}
      let datas = {}
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
        datas = {
          tableData: [
            {
              date: '2016-05-02',
              name: 'a',
              address: 'aa'
            },
            {
              date: '2016-05-04',
              name: 'b',
              address: 'bb'
            },
            {
              date: '2016-05-01',
              name: 'c',
              address: 'cc'
            },
            {
              date: '2016-05-03',
              name: 'd',
              address: 'dd'
            }
          ],
          tableColumns: [
            {
              prop: 'date',
              label: '日期'
            },
            {
              prop: 'name',
              label: '姓名'
            },
            {
              prop: 'address',
              label: '地址'
            }
          ]
        }
      }
      params.componentId = componentId
      params.componentName = componentName
      params.componentType = componentType
      ev.dataTransfer.setData('params', JSON.stringify(params))
      ev.dataTransfer.setData('attributes', JSON.stringify(attributes))
      ev.dataTransfer.setData('datas', JSON.stringify(datas))
    }
  }
}
</script>





