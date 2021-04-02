<template>
  <el-row :gutter="20">
    <el-col :span="6">
      a
    </el-col>
    <el-col :span="6">
     b
    </el-col>
    <el-col :span="6">
     c
    </el-col>
    <el-col :span="6">
     d
    </el-col>
  </el-row>
</template>

<script>
</script>
<style scoped>
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
  border: 1px dashed red;
}
</style>