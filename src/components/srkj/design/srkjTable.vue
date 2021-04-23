<template>
  <div draggable="true" :data-component-id="params.componentId" @click.stop="openAttributesPanel">
    <el-table border stripe highlight-current-row :data="tableData" tooltip-effect="dark" style="width: 100%" max-height="600" @selection-change="handleSelectionChange">
      <el-table-column :prop="column.prop" :label="column.label" v-for="column in tableColumns" :key="column.prop"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['params'],
  computed: {
    ...mapGetters([
      'currentComponent',
      'componentsParams',
      'componentsAttributes',
      'componentsStyles',
      'componentsDatas',
      'time'
    ]),
    watchObj() {
      return this.time
    }
  },
  created() {
    this.refresh()
  },
  watch: {
    // 观察store中是否有任何组件的属性发生变化，若有，则从store中取出自己的属性，并进行设置
    watchObj: function() {
      this.refresh()
    }
  },
  data() {
    return {
      tableData: [],
      tableColumns: [],
      style: '',
      // 表格组件的属性默认值
      attributes: {}
    }
  },
  methods: {
    refresh() {
      this.getAttributes()
      this.getStyle()
      this.getData()
    },
    getAttributes() {
      this.attributes = this.componentsAttributes[this.params.componentId]
    },
    getStyle() {
      this.style = this.componentsStyles[this.params.componentId]
    },
    getData() {
      this.tableData = this.componentsDatas[this.params.componentId]['tableData']
      this.tableColumns = this.componentsDatas[this.params.componentId]['tableColumns']
    },
    // 打开属性配置面板
    openAttributesPanel(ev) {
      if (this.currentComponent.componentId !== this.params.componentId) {
        this.$store.dispatch('setCurrentComponent', {
          componentId: this.params.componentId,
          componentName: this.params.componentName,
          componentType: this.params.componentType
        })
      }
    },
    handleSelectionChange() {}
  }
}
</script>







