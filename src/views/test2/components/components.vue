<template>
  <div id="app">
    <div id="div1" @dragover="allowDrop">
      <input type="button" value="xixi" draggable="true" @dragstart="drag" id="drag1">
    </div>
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
    }
  }
}
</script>
<style>
#div1{
  float: left;
  width: 198px;
  height: 66px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #aaaaaa;
}
</style>


