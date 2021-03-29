<template>
  <div>
    <el-row>
      <el-col :span="4">
        <Components/>
      </el-col>
      <el-col :span="20">
        <Preview/>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { Components, Preview } from '@/views/test2/components'

export default {
  components: {
    Components,
    Preview
  }
}
</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    height: 600px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #bf9999;
  }
  .bg-purple {
    background: #dfe6d3;
  }
  .bg-purple-light {
    background: #0d2869;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fcf9;
  }
</style>
