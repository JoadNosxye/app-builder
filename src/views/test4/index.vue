<template>
  <div id="app">
    <p>{{ message }}</p>
    <button @click="add('component1')">添加A组件</button>
    <button @click="add('component2')">添加B组件</button>
    <component :is="item.component" v-for="item in items" :key="item.id"></component>
  </div>
</template>

<script>
// 引入要添加的所有组件
import component1 from './component1.vue'
import component2 from './component2.vue'
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
        component: name
      })
    }
  },
  components: {
    component1,
    component2
  }
}
</script>