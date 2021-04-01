<template>
  <div @dragover="allowDrop" @dragstart="drag">
    <el-button id='a' name="FreeLayout" type="primary" draggable="true">布局组件</el-button>
    <el-button id='b' name="Component2" type="primary" draggable="true">文字组件</el-button>
    <el-button id='c' name="Component3" type="primary" draggable="true">按钮组件</el-button>
  </div>
</template>
<script>

export default {
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drag(ev) {
      // ev.dataTransfer.setData('componentId', ev.target.id)
      ev.dataTransfer.setData('componentName', ev.target.name)
    }
  }
}
</script>





