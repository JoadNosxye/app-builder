<template>
  <el-button @click="handle">默认按钮</el-button>
</template>

<script>
export default {
  props: {
    a: {
      type: String
    }
  },
  methods: {
    handle() {
      alert('haha')
    }
  }
}
</script>

<style scoped>

</style>