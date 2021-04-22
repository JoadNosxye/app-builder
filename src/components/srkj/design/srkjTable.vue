<template>
  <el-table draggable="true" :data-component-id="params.componentId" border stripe highlight-current-row :data="datas.tableData" tooltip-effect="dark" style="width: 100%" max-height="600" @selection-change="handleSelectionChange" @click.stop="openAttributesPanel">
    <el-table-column :prop="column.prop" :label="column.label" v-for="column in datas.tableColumns" :key="column.prop"></el-table-column>
  </el-table>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['params', 'datas'],
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
      // tableData: [],
      style: '',
      // 表格组件的属性默认值
      attributes: {
      }

    }
  },
  methods: {
    refresh() {
      this.getAttributes()
      this.getStyle()
    },
    getAttributes() {
      this.attributes = this.componentsAttributes[this.params.componentId]
    },
    getStyle() {
      this.style = this.componentsStyles[this.params.componentId]
    },
    // 打开属性配置面板
    openAttributesPanel(ev) {
      // 阻止点击事件向父级layout元素冒泡传递事件
      // ev.stopPropagation()
      if (this.currentComponent.componentId !== this.params.componentId) {
        this.$store.dispatch('setCurrentComponent', {
          componentId: this.params.componentId,
          componentName: this.params.componentName
        })
      }
    },
    handleSelectionChange() {}
  }
}
</script>







