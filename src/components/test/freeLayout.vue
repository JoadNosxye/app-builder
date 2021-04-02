<template>
  <div @drop="drop" @dragover="allowDrop" @dragstart="drag" class="layout">
    <el-row :gutter="attributes.gutter">
      <el-col :span="col.span" :data-row-id="params.rowName" :data-col-id="col.id" v-for="col in cols" :key="col.id">
        <component :is="item.component" :params="item.params" :attributes="item.attributes" v-for="item in col.items" :key="item.id"></component>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Store from '@/store'
import { mapGetters } from 'vuex'
export default {
  props: ['params', 'attributes'],
  computed: {
    ...mapGetters(['components'])
  },
  data() {
    return {
      storeState: Store.state,
      cols: [],
      watchObj: ''
    }
  },
  created() {
    console.log(this.attributes.gutter)
    this.getComponents()
  },
  watch: {
    // 当向该布局放置组件时，重新获取该布局的组件列表
    watchObj: function() {
      if (this.components[this.params.rowName]) {
        this.getComponents()
      }
    }
  },
  methods: {
    // 获取该布局放置的组件列表
    getComponents() {
      const rowName = this.params.rowName
      const colNum = this.params.colNum
      const spans = this.params.spans
      const cols = []
      const spanArray = spans.split(',')
      for (let i = 0; i < colNum; i++) {
        const col = {}
        col.id = i
        col.num = colNum
        col.rowName = rowName
        col.span = Number(spanArray[i])
        col.items = this.components[rowName] ? this.components[rowName][i] : []
        cols.push(col)
      }
      this.cols = cols
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      // 阻止放置默认事件
      ev.preventDefault()
      // 阻止向父级元素冒泡传递事件
      ev.stopPropagation()
      const name = ev.dataTransfer.getData('componentName')
      const params = JSON.parse(
        ev.dataTransfer.getData('params')
          ? ev.dataTransfer.getData('params')
          : ''
      )
      const attributes = JSON.parse(
        ev.dataTransfer.getData('attributes')
          ? ev.dataTransfer.getData('attributes')
          : ''
      )
      const rowId = ev.target.getAttribute('data-row-id')
      const colId = ev.target.getAttribute('data-col-id')

      // 将拖拽的组件存储到store中对应的布局中
      this.$store.dispatch('addComponents', {
        rowId: rowId,
        colId: colId,
        componentName: name,
        params: params,
        attributes: attributes
      })
      // 更新watch对象，以便当前布局在被放置组件后，重新获取组件列表
      this.watchObj = new Date().toLocaleTimeString()
    },
    drag(ev) {
      // TODO 需要处理布局之间的拖拽
      ev.dataTransfer.setData('components', ev.target.id)
    }
  }
}
</script>
<style scoped>
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
  border: 1px dashed red;
}
</style>





