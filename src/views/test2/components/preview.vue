<template>
  <div id="preview-main" @drop="drop" @dragover="allowDrop" @dragstart="drag">
    <div id="currentPage"></div>
  </div>
</template>
<script>
import { getCurrentTime } from '@/utils'
export default {
  data() {
    return {
      currentPage: '<button type="button" class="el-button el-button--primary" data-name="primary-button" draggable="true" id="201842504011"><!----><!----><span>主要按钮</span></button>'
    }
  },
  mounted() {
    document.getElementById('currentPage').outerHTML = this.currentPage
  },
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




