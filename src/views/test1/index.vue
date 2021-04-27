<template>
<el-row>
  <el-col :offset="col.off" :span="col.span" v-for="col in attributes.cols" :key="col.id">aaa</el-col>
</el-row>
</template>
<script>
export default {
  data() {
    return {
      attributes: {}
    }
  },
  created() {
    this.attributes['cols'] = []
    const col1 = { span: 12 }
    const col2 = { span: 12 }
    // const col1 = { off: 2, span: 12 }
    // const col2 = { off: 2, span: 12 }
    this.attributes['cols'].push(col1)
    this.attributes['cols'].push(col2)
  },
  methods: {
    haha() {
      alert('123')
    }
  }
}
</script>
<style scoped>

</style>








