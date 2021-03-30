<template>
  <div @dragover="allowDrop" @dragstart="drag">
    <el-button type="primary" draggable="true" id="drag1">主要按钮</el-button>
    <i class="el-icon-delete" draggable="true" id="drag2"></i>
  </div>
</template>
<script>
export default {
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drag(ev) {
      ev.dataTransfer.setData('Text', ev.target.id)
      ev.dataTransfer.setData('if-clone', true)
    }
  }
}
</script>





