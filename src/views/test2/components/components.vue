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
    <el-row data-name="layout" class='row' id="drag4" draggable="true">
      <el-col :span="6" class="col" id='drag4-col-1'>
        a
      </el-col>
      <el-col :span="6" class="col" id='drag4-col-2'>
        b
      </el-col>
      <el-col :span="6" class="col" id='drag4-col-3'>
        c
      </el-col>
      <el-col :span="6" class="col" id='drag4-col-4'>
        d
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      layout: {
        template: "<el-row data-name=\"layout\" class='row' id=\"drag4\" draggable=\"true\">\n" +
            "      <el-col :span=\"6\" class=\"col\" id='drag4-col-1'>\n" +
            '        a\n' +
            '      </el-col>\n' +
            "      <el-col :span=\"6\" class=\"col\" id='drag4-col-2'>\n" +
            '        b\n' +
            '      </el-col>\n' +
            "      <el-col :span=\"6\" class=\"col\" id='drag4-col-3'>\n" +
            '        c\n' +
            '      </el-col>\n' +
            "      <el-col :span=\"6\" class=\"col\" id='drag4-col-4'>\n" +
            '        d\n' +
            '      </el-col>\n' +
            '    </el-row>'
      },
      button: {
        template: '<button type="button" class="el-button el-button--primary" data-name="primary-button" draggable="true" id="201842504011"><!----><!----><span>主要按钮</span></button>'
      }
    }
  },
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
      if (ev.target.id === 'drag1') {
        ev.dataTransfer.setData('template', this.button.template)
      }
      if (ev.target.id === 'drag4') {
        ev.dataTransfer.setData('template', this.layout.template)
      }
      ev.dataTransfer.setData('if-clone', true)
    }
  }
}
</script>





