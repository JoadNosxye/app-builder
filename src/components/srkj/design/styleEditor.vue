<template>
    <el-form ref="form" :model="styleModel" label-width="80px">
        <el-form-item label="样式">
            <el-input type="textarea" v-model="styleModel.style"></el-input>
        </el-form-item>
    </el-form>
</template>


<script>
export default {
  data() {
    return {
      styleModel: {
        style: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>