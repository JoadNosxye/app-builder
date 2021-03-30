<template>
  <div class="page-build">
    <el-row class="page-build">
      <el-col :span="4" class="components">
        <Components/>
        
      </el-col>
      <el-col :span="20" class="preiview">
        <el-row class="preview-panel">
          <Panel/>
        </el-row>
        <el-row class="preview-main">
          <Preview/>
        </el-row>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import { Components, Preview, Panel } from '@/views/test2/components'

export default {
  components: {
    Components,
    Preview,
    Panel
  }
}
</script>

