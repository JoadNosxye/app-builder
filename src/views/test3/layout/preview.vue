<template>
  <div id="preview-main" @drop="drop" @dragover="allowDrop" @dragstart="drag">
    
  </div>
</template>
<script>

export default {
  props: {
    item: []
  },
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      ev.preventDefault()
      // 源组件ID
      const id = ev.dataTransfer.getData('components')

      const element = document.getElementById(id).cloneNode(true)

      ev.target.appendChild(element)
    },
    drag(ev) {
      ev.dataTransfer.setData('components', ev.target.id)
    }
  }
}
</script>






