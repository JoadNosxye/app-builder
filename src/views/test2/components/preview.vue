<template>
  <div @drop="drop" @dragover="allowDrop" @dragstart="drag"></div>
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
      const id = ev.dataTransfer.getData('Text')
      const ifClone = ev.dataTransfer.getData('if-clone')
      let element = document.getElementById(id)
      if (ifClone === 'true') {
        element = element.cloneNode(true)
        // const d = new Date()
        // const year = d.getFullYear()
        // const month = d.getMonth() + 1
        // const date = d.getDate()
        // const hours = d.getHours()
        // const minutes = d.getMinutes()
        // const seconds = d.getSeconds()
        // const time = '' + year + month + date + hours + minutes + seconds
        element.setAttribute('id', getCurrentTime())
      }
      ev.target.appendChild(element)
    },
    drag(ev) {
      ev.dataTransfer.setData('Text', ev.target.id)
    }
  }
}
</script>




