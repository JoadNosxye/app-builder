<template>
  <div>
    <el-row>
      <el-col :span="4">
        <Org></Org>
      </el-col>
      <el-col :span="20">
        <User></User>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Org from '@/components/Org'
import { User } from '@/views/user/components'

export default {
  components: {
    Org,
    User
  }
}
</script>
