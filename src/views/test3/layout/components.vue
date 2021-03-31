<template>
  <div @dragover="allowDrop" @dragstart="drag">
    <!-- {{content}}
    <el-input v-model="content" placeholder="请输入内容" draggable="true" id="input-currentTime"></el-input> -->
    <button @click="add('component1')">添加A组件</button>
    <button @click="add('component2')">添加A组件</button>
    <button @click="add('component3')">添加A组件</button>
    <Component1/>
    <Component2/>
    <component :is="item.component" v-for="item in items" :key="item.id"></component>

  </div>
</template>
<script>
import { Component1, Component2 } from '@/views/test3/components'

export default {
  components: {
    Component1,
    Component2
  },
  data() {
    return {
      ele: []
    }
  },
  methods: {
    add(name) {
      this.ele.push({
        component: name
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





