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
      params.componentId = componentId
      params.componentName = componentName
      params.componentType = componentType
      let attributes
      let datas
      if (ev.target.id === 'a') {
        attributes = {
          row: {
            gutter: 0
          },
          cols: [
            {
              // 第一列的id一定要从0开始
              id: '0',
              span: 12
            },
            {
              id: '1',
              span: 12
            }
          ]
        }
      }
      if (ev.target.id === 'b') {
        attributes = {
          name: '按钮',
          type: 'primary',
          size: 'medium',
          plain: false,
          nativeType: 'button'
        }
      }
      if (ev.target.id === 'c') {
        // attributes = {
        //   cols: [
        //     {
        //       id: '0',
        //       prop: 'date',
        //       label: '日期11'
        //     },
        //     {
        //       id: '1',
        //       prop: 'name',
        //       label: '姓名22'
        //     },
        //     {
        //       id: '2',
        //       prop: 'address',
        //       label: '地址33'
        //     }
        //   ]
        // }
        // datas = [
        //   {
        //     date: '2016-05-02',
        //     name: 'a',
        //     address: 'aa'
        //   },
        //   {
        //     date: '2016-05-04',
        //     name: 'b',
        //     address: 'bb'
        //   },
        //   {
        //     date: '2016-05-01',
        //     name: 'c',
        //     address: 'cc'
        //   },
        //   {
        //     date: '2016-05-03',
        //     name: 'd',
        //     address: 'dd'
        //   }
        // ]
      }

      ev.dataTransfer.setData('params', JSON.stringify(params))
      if (attributes) {
        ev.dataTransfer.setData('attributes', JSON.stringify(attributes))
      }
      if (datas) {
        ev.dataTransfer.setData('datas', JSON.stringify(datas))
      }
    }
  }
}
</script>





