<template>
  <div @drop="drop" @dragover="allowDrop" @dragstart="drag" class="layout-wrapper" :style='style' @click="config">
    <el-row>
      <el-col :span="col.span" :data-component-id="params.componentId" :data-col-id="col.id" v-for="col in attributes.cols" :key="col.id">
        <component :is="item.componentName" :params="item.params" v-for="item in col.items" :key="item.componentId"></component>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { deepCopy } from '@/utils'
export default {
  props: ['params'],
  computed: {
    ...mapGetters([
      'componentsLayouts',
      'componentsParams',
      'componentsAttributes',
      'componentsStyles',
      'currentComponent',
      'time'
    ]),
    watchObj() {
      return this.time
    }
  },
  data() {
    return {
      style: '',
      dropTime: '',
      attributes: {}
    }
  },
  created() {
    this.refresh()
  },
  watch: {
    // 当向该布局放置组件时，重新获取该布局的组件列表
    dropTime: function() {
      if (this.componentsLayouts[this.params.componentId]) {
        this.refresh()
      }
    },
    watchObj: function() {
      this.refresh()
    }
  },
  methods: {
    refresh() {
      this.getStyle()
      this.getComponents()
    },
    getStyle() {
      this.style = this.componentsStyles[this.params.componentId]
    },
    // 获取该布局放置的组件列表
    getComponents() {
      // 获取该组件的属性，使用deepCopy对store中的对象进行clone，避免这里设置的内容污染了store中的数据
      this.attributes = deepCopy(
        this.componentsAttributes[this.params.componentId]
      )
      // 如果没有获取到任贺属性配置，则退出
      if (!this.attributes) {
        return
      }
      const colNum = this.attributes.cols.length
      const componentId = this.params.componentId

      for (let i = 0; i < colNum; i++) {
        const col = this.attributes.cols[i]
        // 若store中存在该布局的数据，则从布局中取出当前列的数据，并放到列的items中
        col.items = []
        const itemsInStore = this.componentsLayouts[componentId]
          ? this.componentsLayouts[componentId][i]
            ? this.componentsLayouts[componentId][i]
            : []
          : []
        for (let index = 0; index < itemsInStore.length; index++) {
          const element = deepCopy(itemsInStore[index])
          col.items.push(element)
        }

        if (col.items) {
          for (let index = 0; index < col.items.length; index++) {
            const element = col.items[index]
            // 从store中取出该组件的参数配置
            element.params = this.componentsParams[element.componentId]
          }
        }
        this.$set(this.attributes.cols, i, col)
      }
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
      const isMove = ev.dataTransfer.getData('move')
      // 获取布局的行和列ID，如果没有获取到，则循环查找其父级节点的行列ID，直到找到为止
      let node = ev.target
      let rowId = node.getAttribute('data-component-id')
      let colId = node.getAttribute('data-col-id')
      while (rowId === null || colId === null) {
        node = node.parentElement
        rowId = node.getAttribute('data-component-id')
        colId = node.getAttribute('data-col-id')
      }
      // 如果遍历了所有的父节点还没有找到行列ID，则退出该方法，放置元素失败
      if (rowId === null || colId === null) {
        console.log('没有找到合适的列放置该组件')
        return
      }
      let name = ''
      let params = ''
      let attributes = ''
      // 如果是从其他布局中移动过来的组件
      if (isMove) {
        // 从store中获取该组件的参数和属性
        params = this.componentsParams[id]
        name = params.componentName
        // 将该组件参数的行列ID更新为组件移动后的最新行列ID
        params.rowId = rowId
        params.colId = colId
        attributes = this.componentsAttributes[id]
      } else {
        name = ev.dataTransfer.getData('componentName')
        params = JSON.parse(
          ev.dataTransfer.getData('params')
            ? ev.dataTransfer.getData('params')
            : ''
        )
        params.rowId = rowId
        params.colId = colId
        attributes = JSON.parse(
          ev.dataTransfer.getData('attributes')
            ? ev.dataTransfer.getData('attributes')
            : ''
        )
      }
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
      this.dropTime = new Date().toLocaleTimeString()
    },
    drag(ev) {
      // 阻止向父级元素冒泡传递事件
      ev.stopPropagation()
      const node = ev.target
      const componentId = node.getAttribute('data-component-id')

      // 标识该组件是从其他布局中移动过来的
      ev.dataTransfer.setData('move', true)
      ev.dataTransfer.setData('componentId', componentId)

      // 如果被移动的组件上没有找到data-component-id，则循环查找其父级元素上是否有该属性
      // while (componentId === null) {
      //   node = node.parentElement
      //   componentId = node.getAttribute('data-component-id')
      // }
      // // 如果遍历了所有的父节点还没有找到行列ID，则退出该方法，放置元素失败
      // if (componentId === null) {
      //   console.log('没有找到要移动的组件ID')
      //   return
      // }

      // 将store中被移动的组件布局数据删除
      this.$store.dispatch('moveComponent', componentId)
    },
    config(ev) {
      // 阻止向父级元素冒泡传递事件
      ev.stopPropagation()
      if (this.currentComponent.componentId !== this.params.componentId) {
        this.$store.dispatch('setCurrentComponent', {
          componentId: this.params.componentId,
          componentName: this.params.componentName
        })
      }
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
  overflow: auto;
  border: 1px dashed red;
}
.layout-wrapper{
  width: 100%;
  height: 100%;
}
</style>





