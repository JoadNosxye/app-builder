<template>
  <div @drop="drop" @dragover="allowDrop" @dragstart="drag"></div>
</template>
<script>
export default {
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      ev.preventDefault()
      const data = ev.dataTransfer.getData('Text')
      const ifClone = ev.dataTransfer.getData('if-clone')
      let element = document.getElementById(data)
      if (ifClone) {
        element = element.cloneNode(true)
      }
      // cloneElement.removeAttribute('draggable')
      ev.target.appendChild(element)
    },
    drag(ev) {
      ev.dataTransfer.setData('Text', ev.target.id)
    }
  }
}
</script>




