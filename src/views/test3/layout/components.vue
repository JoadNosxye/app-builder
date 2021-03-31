<template>
  <div @dragover="allowDrop" @dragstart="drag">
    <!-- {{content}}
    <el-input v-model="content" placeholder="请输入内容" draggable="true" id="input-currentTime"></el-input> -->
    <button @click="add('component1','我是A')">添加A组件</button>
    <button @click="add('component2','我是B')">添加B组件</button>
    <button @click="add('component3','danger')">添加C组件</button>
    <!-- <Component1/>
    <Component2/> -->

  </div>
</template>
<script>
import { Component1, Component2, Component3 } from '@/views/test3/components'

export default {
  components: {
    Component1,
    Component2,
    Component3
  },
  methods: {
    add(name, text) {
      // this.items.push({
      //   component: name,
      //   text: text
      // })
      this.$store.dispatch('addComponents', {
        component: name,
        text: text
      })
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    drag(ev) {
      ev.dataTransfer.setData('components', ev.target.id)
    }
  }
}
</script>





