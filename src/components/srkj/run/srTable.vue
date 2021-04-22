<template>
  <el-table border stripe highlight-current-row :data="datas.tableData" tooltip-effect="dark" style="width: 100%" max-height="600" @selection-change="handleSelectionChange" @click.stop="openAttributesPanel">
    <el-table-column prop="date" label="日期" width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
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









