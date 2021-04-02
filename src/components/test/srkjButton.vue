<template>
  <div>
    <!-- <el-button type="primary" v-if="text==='primary'">主要按钮</el-button>
    <el-button type="danger" v-if="text==='danger'">危险按钮</el-button> -->
    <el-button type="danger" @click="config">危险按钮</el-button>
  </div>

</template>
<script>
// import Store from '@/store'
export default {
  props: ['params', 'attributes'],
  methods: {
    config(ev) {
      // 阻止向父级元素冒泡传递事件
      ev.stopPropagation()
      this.$store.dispatch('setCurrentComponent', {
        componentId: this.params.componentId,
        componentName: this.params.componentName
      })
    }
  }

}
</script>







