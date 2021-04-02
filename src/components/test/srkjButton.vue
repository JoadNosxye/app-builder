<template>
  <div>
    <!-- <el-button type="primary" v-if="text==='primary'">主要按钮</el-button>
    <el-button type="danger" v-if="text==='danger'">危险按钮</el-button> -->
    <el-button type="danger" @click="config">危险按钮</el-button>
  </div>

</template>
<script>
export default {
  props: ['params', 'attributes'],
  methods: {
    config() {
      alert('haha')
    }
  }

}
</script>







