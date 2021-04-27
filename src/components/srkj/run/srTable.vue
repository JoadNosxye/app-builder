<template>
  <el-table border stripe highlight-current-row :data="datas.tableData" tooltip-effect="dark" style="width: 100%" max-height="600">
    <el-table-column :prop="column.prop" :label="column.label" v-for="column in datas.tableColumns" :key="column.prop"></el-table-column>
  </el-table>
</template>
<script>
export default {
  props: ['attributes', 'datas'],
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>









