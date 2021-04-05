<template>
  <div @drop="drop" @dragover="allowDrop" @dragstart="drag" class="layout-wrapper" @click="config">
    <el-row>
      <el-col :span="col.span" :data-component-id="params.componentId" :data-col-id="col.id" v-for="col in attributes.cols" :key="col.id">
        <component :is="item.componentName" :params="item.params" v-for="item in col.items" :key="item.componentId"></component>
        <!-- {{attributes}} -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
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
      watchObj: '',
      // attributes: {
      //   row: {},
      //   cols: []
      // },
      attributes: {}
      // attributes: {
      //   row: {
      //     id: ''
      //   },
      //   cols: [
      //     {
      //       id: '',
      //       span: '',
      //       offset: ''
      //     },
      //     {
      //       id: '',
      //       span: '',
      //       offset: ''
      //     }
      //   ]
      // }
    }
  },
  created() {
    // 从store中获取当前布局组件的属性配置
    this.getComponents()
  },
  watch: {
    // 当向该布局放置组件时，重新获取该布局的组件列表
    watchObj: function() {
      if (this.componentsLayouts[this.params.componentId]) {
        this.getComponents()
      }
    }
  },
  methods: {
    // 获取该布局放置的组件列表
    getComponents() {
      const componentAttributes = this.componentsAttributes[
        this.params.componentId
      ]
      if (!componentAttributes) {
        return
      }
      const colNum = componentAttributes.cols.length
      // const rowId = componentAttributes.row.id
      const componentId = this.params.componentId
      for (let i = 0; i < colNum; i++) {
        const col = componentAttributes.cols[i]
        // 若store中存在该布局的数据，则从布局中取出当前列的数据
        col.items = this.componentsLayouts[componentId]
          ? this.componentsLayouts[componentId][i]
          : []
        if (col.items) {
          for (let index = 0; index < col.items.length; index++) {
            const element = col.items[index]
            // 从store中取出该组件的参数配置
            element.params = this.componentsParams[element.componentId]
          }
        }
      }
      this.attributes = componentAttributes
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
      const rowId = ev.target.getAttribute('data-component-id')
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





