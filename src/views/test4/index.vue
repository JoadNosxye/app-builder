<template>
  <div id="app">
    <p>{{ message }}</p>
    <button @click="add('component1', '我是A')">添加A组件</button>
    <button @click="add('component2', '我是B')">添加B组件</button>
    <button @click="add('component3', 'primary')">添加C组件</button>
    <button @click="add('component3', 'danger')">添加D组件</button>
    <component :is="item.component" :text="item.text" v-for="item in items" :key="item.id"></component>
  </div>
</template>

<script>
// 引入要添加的所有组件
import component1 from './component1.vue'
import component2 from './component2.vue'
import component3 from './component3.vue'

export default {
  data() {
    return {
      message: 'Hello Vue.js!',
      items: []
    }
  },
  methods: {
    add(name, text) {
      this.items.push({
        component: name,
        text: text
      })
    }
  },
  components: {
    component1,
    component2,
    component3
  }
}
</script>