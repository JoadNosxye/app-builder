<template>
  <div draggable="true" id="select-currentTime">
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '北京'
        },
        {
          value: '选项2',
          label: '上海'
        },
        {
          value: '选项3',
          label: '大连'
        },
        {
          value: '选项4',
          label: '长春'
        },
        {
          value: '选项5',
          label: '哈尔滨'
        }
      ],
      value: ''
    }
  }
}
</script>





