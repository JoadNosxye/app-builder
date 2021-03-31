<template>
  <div id="preview-main" @drop="drop" @dragover="allowDrop" @dragstart="drag">
    <component :is="item.component" :text="item.text" v-for="item in components" :key="item.id"></component>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Component1, Component2, Component3 } from '@/views/test3/components'
export default {
  // data() {
  //   return {
  //     components: [
  //       {
  //         component: 'component2',
  //         text: '111'
  //       }
  //     ]
  //   }
  // },
  components: {
    Component1,
    Component2,
    Component3
  },
  computed: {
    ...mapGetters(['components'])
  },
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      ev.preventDefault()
      // 源组件ID
      const id = ev.dataTransfer.getData('components')

      const element = document.getElementById(id).cloneNode(true)

      ev.target.appendChild(element)
    },
    drag(ev) {
      ev.dataTransfer.setData('components', ev.target.id)
    }
  }
}
</script>






