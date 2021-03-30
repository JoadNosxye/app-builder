<template>
<div id='app'>
  <div id="div2" @drop="drop" @dragover="allowDrop">
  </div>
  </div>
</template>
<script>
export default {
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      ev.preventDefault()
      const data = ev.dataTransfer.getData('component')
      const element = document.getElementById(data)
      const cloneElement = element.cloneNode(true)
      cloneElement.removeAttribute('draggable')
      ev.target.appendChild(cloneElement)
    },
    getHtml() {
      const element = document.getElementById('div2')
      console.log(element.innerHTML)
    }
  }
}
</script>


