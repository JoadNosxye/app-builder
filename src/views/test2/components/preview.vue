<template>
  <div id="app">
    <div id="div2" @drop="drop" @dragover="allowDrop"></div>
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
      const data = ev.dataTransfer.getData('Text')
      const element = document.getElementById(data).cloneNode()
      element.removeAttribute('draggable')
      ev.target.appendChild(element)
    }
  }
}
</script>
<style>
#div2 {
  float: left;
  width: 198px;
  height: 66px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #aaaaaa;
}
</style>


