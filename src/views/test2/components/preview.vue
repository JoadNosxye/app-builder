<template>
  <div id="preview-main" @drop="drop" @dragover="allowDrop" @dragstart="drag"></div>
</template>
<script>
import { getCurrentTime } from '@/utils'
export default {
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      ev.preventDefault()
      const id = ev.dataTransfer.getData('components')
      const ifClone = ev.dataTransfer.getData('if-clone')
      let element = document.getElementById(id)
      if (ifClone === 'true') {
        element = element.cloneNode(true)
        element.setAttribute('id', getCurrentTime())
      }
      ev.target.appendChild(element)
    },
    drag(ev) {
      ev.dataTransfer.setData('components', ev.target.id)
    }
  }
}
</script>




