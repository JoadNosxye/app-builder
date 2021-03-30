<template>
  <div id="app">
    <div id="div1" @drop="drop" @dragover="allowDrop">
      <input type="button" value="xixi" draggable="true" @dragstart="drag" id="drag1">
    </div>
    <div id="div2" @drop="drop" @dragover="allowDrop"></div>
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
    },
    drop(ev) {
      ev.preventDefault()
      var data = ev.dataTransfer.getData('Text')
      ev.target.appendChild(document.getElementById(data))
    }
  }
}
</script>
<style>
#div1,
#div2 {
  float: left;
  width: 198px;
  height: 66px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #aaaaaa;
}
</style>


