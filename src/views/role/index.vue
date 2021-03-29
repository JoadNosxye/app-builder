<template>
  <div>
    <el-row>
      <el-col :span="4">
        <Org></Org>
      </el-col>
      <el-col :span="20">
        <Role></Role>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Org from '@/components/Org'
import { Role } from '@/views/role/components'

export default {
  components: {
    Org,
    Role
  }
}
</script>
