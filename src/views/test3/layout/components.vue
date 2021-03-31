<template>
  <div @dragover="allowDrop" @dragstart="drag">
    <el-button id='a' type="primary" draggable="true">组件A</el-button>
    <el-button id='b' type="primary" draggable="true">组件B</el-button>
    <el-button id='c' type="primary" draggable="true">组件C</el-button>
  </div>
</template>
<script>

export default {
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drag(ev) {
      ev.dataTransfer.setData('components', ev.target.id)
    }
  }
}
</script>





