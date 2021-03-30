<template>
  <div id="preview-main" @drop="drop" @dragover="allowDrop" @dragstart="drag">
    <div id="current-page"></div>
    <div id="vue-template" hidden></div>
    <!-- <div id="tmp-template" hidden></div> -->

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
    document.getElementById('current-page').outerHTML = this.currentPage
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
      // 将元素添加到指定的元素中
      ev.target.appendChild(element)

      const template = ev.dataTransfer.getData('template')

      // 创建临时节点，并添加到vue-template中
      // const previewMain = document.getElementById('preview-main')
      const vueTemplate = document.getElementById('vue-template')
      const tmpTemplate = document.createElement('div')
      tmpTemplate.setAttribute('id', 'tmp-template')
      // tmpTemplate.setAttribute('hidden', true)
      vueTemplate.appendChild(tmpTemplate)
      tmpTemplate.outerHTML = template
      // const tmpTemplate = document.createElement('tmp-template')

      // vueTemplate.appendChild(tmpTemplate)

      // 将拖拽的节点对应的vue模板赋值给临时模板元素
      // document.getElementById('tmp-template').outerHTML = template
    },
    drag(ev) {
      ev.dataTransfer.setData('components', ev.target.id)
    }
  }
}
</script>






