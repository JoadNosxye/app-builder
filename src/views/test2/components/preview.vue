<template>
  <div id="preview-main" @drop="drop" @dragover="allowDrop" @dragstart="drag">
    <!-- <div id="current-page"></div> -->
    <div id="vue-template" hidden></div>
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
    // document.getElementById('current-page').outerHTML = this.currentPage
  },
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      ev.preventDefault()
      // 源组件ID
      const id = ev.dataTransfer.getData('components')
      // 是否clone
      const ifClone = ev.dataTransfer.getData('if-clone')

      // 根据组件名称(data-name)获取以下信息
      // 获取html，并根据html生成元素，添加到放置的元素中
      //
      let element = document.getElementById(id)
      // 若需要clone，则对拖拽的元素进行clone，并为其生成一个id，以及对应的vue模板ID
      const currentTime = getCurrentTime()
      if (ifClone === 'true') {
        element = element.cloneNode(true)
      }
      const tmpHtml = document.createElement('div')
      tmpHtml.setAttribute('id', 'tmp-html')
      // 将元素添加到指定的元素中
      ev.target.appendChild(tmpHtml)
      tmpHtml.appendChild(element)
      const str = tmpHtml.innerHTML.replace(/currentTime/g, currentTime)
      tmpHtml.outerHTML = str

      const template = ev.dataTransfer.getData('template')

      // 创建临时节点，并添加到vue-template中
      const targetId =
        ev.target.id === 'preview-main' ? 'vue-template' : ev.target.id + '-vue'
      const targetElement = document.getElementById(targetId)
      const tmpTemplate = document.createElement('div')
      tmpTemplate.setAttribute('id', 'tmp-template')
      targetElement.appendChild(tmpTemplate)
      // TODO**********************************
      // 预览页面内移动元素时，template为空，移动之后，vue-template下面没有对应元素，需要获取有效的template才能执行此操作
      tmpTemplate.outerHTML = template.replace(/currentTime/g, currentTime + '-vue')
    },
    drag(ev) {
      ev.dataTransfer.setData('components', ev.target.id)
      // 删除vue-template下面对应的元素
      const element = document.getElementById(ev.target.id + '-vue')
      element.remove()
    }
  }
}
</script>






