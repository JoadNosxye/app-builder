<template>
  <div id="preview-main" @drop="drop" @dragover="allowDrop" @dragstart="drag">
    <div id="currentPage"></div>
    <div id="vueTemplate" hidden></div>
    <!-- <el-row class='row'>
      <el-col :span="6" class="col">
        a
      </el-col>
      <el-col :span="6" class="col">
        b
      </el-col>
      <el-col :span="6" class="col">
        c
      </el-col>
      <el-col :span="6" class="col">
        d
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
import { getCurrentTime } from '@/utils'
export default {
  data() {
    return {
      currentPage:
        '<button type="button" class="el-button el-button--primary" data-name="primary-button" draggable="true" id="201842504011"><!----><!----><span>主要按钮</span></button>'
    }
  },
  mounted() {
    // 将之前设计的页面添加到预览区中
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
      // 根据组件名称(data-name)获取以下信息
      // 获取html，并根据html生成元素，添加到放置的元素中
      //
      let element = document.getElementById(id)
      // 若需要clone，则对拖拽的元素进行clone，并为其生成一个id
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






