<template>
  <div @drop.stop.prevent="drop" @dragover="allowDrop" @dragstart.stop="drag" class="layout-wrapper" :style='style' @click.stop="openAttributesPanel">
    <el-row :gutter="attributes.row.gutter" :type="attributes.row.type" :justify="attributes.row.justify" :align="attributes.row.align" :tag="attributes.row.tag">
      <el-col :data-component-id="params.componentId" :data-col-id="col.id" :tag="col.tag" :xl="col.xl" :lg="col.lg" :md="col.md" :sm="col.sm" :xs="col.xs" :pull="col.pull" :push="col.push" :offset="col.offset" :span="col.span" v-for="col in attributes.cols" :key="col.id">
        <component :is="item.componentType" :params="item.params" v-for="item in col.items" :key="item.componentId"></component>
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
      'componentsDatas',
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
    // 获取样式
    getStyle() {
      this.style = this.componentsStyles[this.params.componentId]
    },
    // 获取该布局放置的组件列表
    getComponents() {
      // 获取该组件的属性，使用deepCopy对store中的对象进行clone，避免这里设置的内容污染了store中的数据
      this.attributes = deepCopy(
        this.componentsAttributes[this.params.componentId]
      )
      // 如果没有获取到任何属性配置，则退出
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
    // 向该布局中放置组件时触发
    drop(ev) {
      const id = ev.dataTransfer.getData('componentId')
      if (!id || id === 'null') {
        console.log('移动的组件的html中缺少data-component-id')
        return
      }
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
      let type = ''
      let params = ''
      let attributes = ''
      let datas = ''
      // 如果是从其他布局中移动过来的组件
      if (isMove) {
        // 从store中获取该组件的参数和属性
        params = this.componentsParams[id]
        name = params.componentName
        type = params.componentType
        // 将该组件参数的行列ID更新为组件移动后的最新行列ID
        params.rowId = rowId
        params.colId = colId
        attributes = this.componentsAttributes[id]
        datas = this.componentsDatas[id] ? this.componentsDatas[id] : ''
      } else {
        name = ev.dataTransfer.getData('componentName')
        type = ev.dataTransfer.getData('componentType')
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
        datas = JSON.parse(
          ev.dataTransfer.getData('datas')
            ? ev.dataTransfer.getData('datas')
            : ''
        )
      }
      // 将拖拽的组件存储到store中对应的布局中
      this.$store.dispatch('addComponents', {
        rowId: rowId,
        colId: colId,
        componentName: name,
        componentType: type,
        componentId: id,
        params: params,
        attributes: attributes,
        datas: datas
      })
      // 设置当前组件为刚拖拽过来的组件
      this.$store.dispatch('setCurrentComponent', {
        componentId: id,
        componentName: name,
        componentType: type
      })
      // 更新watch对象，以便当前布局在被放置组件后，重新获取组件列表
      this.dropTime = new Date().toLocaleTimeString()
    },
    // 从该布局组件中向其他布局拖拽组件时触发
    drag(ev) {
      const node = ev.target
      const componentId = node.getAttribute('data-component-id')
      if (!componentId) {
        console.log('移动的组件的html中缺少data-component-id')
        return
      }

      // 标识该组件是从其他布局中移动过来的
      ev.dataTransfer.setData('move', true)
      ev.dataTransfer.setData('componentId', componentId)

      // 将store中被移动的组件布局数据删除
      this.$store.dispatch('moveComponent', componentId)
    },
    openAttributesPanel(ev) {
      if (this.currentComponent.componentId !== this.params.componentId) {
        this.$store.dispatch('setCurrentComponent', {
          componentId: this.params.componentId,
          componentName: this.params.componentName,
          componentType: this.params.componentType
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
.layout-wrapper {
  width: 100%;
  height: 100%;
}
</style>





