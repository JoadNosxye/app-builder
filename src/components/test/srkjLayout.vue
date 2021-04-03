<template>
  <div @drop="drop" @dragover="allowDrop" @dragstart="drag" class="layout-wrapper" @click="config">
    <el-row>
      <el-col :span="col.span" :data-row-id="params.rowName" :data-col-id="col.id" v-for="col in cols" :key="col.id">
        <component :is="item.componentName" :params="item.params" v-for="item in col.items" :key="item.componentId"></component>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Store from '@/store'
import { mapGetters } from 'vuex'
export default {
  props: ['params'],
  computed: {
    ...mapGetters([
      'componentsLayouts',
      'componentsParams',
      'componentsAttributes'
    ])
  },
  data() {
    return {
      storeState: Store.state,
      cols: [],
      watchObj: ''
    }
  },
  created() {
    this.getComponents()
  },
  watch: {
    // 当向该布局放置组件时，重新获取该布局的组件列表
    watchObj: function() {
      if (this.componentsLayouts[this.params.rowName]) {
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
        // 若store中存在该布局的数据，则从布局中取出当前列的数据(使用contact方法是返回数组的副本，因为这里要对数组元素进行赋值，但不希望修改原来数组的内容)
        col.items = this.componentsLayouts[rowName]
          ? this.componentsLayouts[rowName][i]
          : []
        if (col.items) {
          for (let index = 0; index < col.items.length; index++) {
            const element = col.items[index]
            // 从store中取出该组件的参数配置
            element.params = this.componentsParams[element.componentId]
            // 从store中取出该组件的属性配置
            element.attributes = this.componentsAttributes[element.componentId]
          }
        }
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
      const id = ev.dataTransfer.getData('componentId')
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
        componentId: id,
        params: params,
        attributes: attributes
      })

      // 设置当前组件为刚拖拽过来的组件
      this.$store.dispatch('setCurrentComponent', {
        componentId: id,
        componentName: name
      })

      // 更新watch对象，以便当前布局在被放置组件后，重新获取组件列表
      this.watchObj = new Date().toLocaleTimeString()
    },
    drag(ev) {
      // TODO 需要处理布局之间的拖拽
      ev.dataTransfer.setData('components', ev.target.id)
    },
    config(ev) {
      // 阻止向父级元素冒泡传递事件
      ev.stopPropagation()
      this.$store.dispatch('setCurrentComponent', {
        componentId: this.params.componentId,
        componentName: this.params.componentName
      })
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





