<template>
  <div draggable="true" :data-component-id="params.componentId" @click.stop="openAttributesPanel">
    <el-table border stripe highlight-current-row :data="datas" tooltip-effect="dark" style="width: 100%" max-height="600" @selection-change="handleSelectionChange">
      <el-table-column :prop="col.prop" :label="col.label" v-for="col in attributes.cols" :key="col.prop"></el-table-column>
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
      style: '',
      datas: '',
      attributes: ''
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
      const data = this.componentsDatas[this.params.componentId]
      if (Object.prototype.toString.call(data) == '[object Array]') {
        this.datas = data
      } else {
        this.datas = []
      }
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







