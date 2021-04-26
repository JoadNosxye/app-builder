<template>
  <!-- <input type="button" value="aa" @dblclick="haha"></input> -->
  <el-button type="primary" @dblclick="haha">主要按钮</el-button>

</template>
<script>
export default {
  methods: {
    haha() {
      alert('123')
    }
  }
}
</script>
<style scoped>

</style>








