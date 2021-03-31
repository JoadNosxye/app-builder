<template>
  <div @dragover="allowDrop" @dragstart="drag">
    <!-- {{content}}
    <el-input v-model="content" placeholder="请输入内容" draggable="true" id="input-currentTime"></el-input> -->
    <SelectPlus/>

  </div>
</template>
<script>
import SelectPlus from './selectPlus'
export default {
  components: {
    SelectPlus
  },
  data() {
    return {
    }
  },
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drag(ev) {
      ev.dataTransfer.setData('components', ev.target.id)
    }
  }
}
</script>





