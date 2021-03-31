<template>
  <div>
    <!-- <el-row v-if="text==='1'"> -->
    <el-row :id="rowId">
      <el-col id="" :span="12">
        <component :is="item.component" v-for="item in items24" :key="item.id"></component>
        freelayout : {{items.length}}
      </el-col>
      <el-col :span="12">
        <component :is="item.component" v-for="item in items24" :key="item.id"></component>
        freelayout : {{items.length}}
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { FreeLayout, Component2, Component3 } from '@/views/test3/components'
export default {
  components: {
    FreeLayout,
    Component2,
    Component3
  },
  props: {
    rowId: {
      type: String
    },
    colIds: {
      type: Array
    }
  },
  computed: {
    ...mapGetters(['components'])
  },
  data() {
    return {
      items24: [],
      items12_12: [],
      items8_8_8: []
    }
  },
  created() {
    this.components.items24
  }
}
</script>
<style scoped>
.el-col {
  border: 1px solid red;
}
</style>






