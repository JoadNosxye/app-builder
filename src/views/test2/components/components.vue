<template>
  <div @dragover="allowDrop" @dragstart="drag">
    <el-button data-name="primary-button" type="primary" draggable="true" id="drag1">主要按钮</el-button>
    <i data-name="icon-delete" class="el-icon-delete" draggable="true" id="drag2"></i>
    <el-tabs data-name="tab" id="drag3" draggable="true">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drag(ev) {
      // 根据组件名称(data-name)找到对应组件的如下内容设置进去
      // 组件对应的html，用来预览
      // 组件的vue template，用来生成代码
      // 组件对应的js，用来生成代码
      ev.dataTransfer.setData('components', ev.target.id)
      ev.dataTransfer.setData('if-clone', true)
    }
  }
}
</script>





