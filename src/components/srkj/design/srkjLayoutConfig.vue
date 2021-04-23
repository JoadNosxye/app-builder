<template>
  <div>
    <div style="margin: 20px;">行属性配置</div>
    <el-form :label-position="labelPosition" label-width="70px" size='small' :model="layoutModel">
      <el-form-item label="栅格间隔">
        <el-input v-model="layoutModel.gutter"></el-input>
      </el-form-item>
      <el-form-item label="布局模式">
        <el-checkbox v-model="layoutModel.type"></el-checkbox>
      </el-form-item>
      <el-button type="primary" plain @click="addCols">增加列</el-button>
      <div  v-for="col in layoutModel.cols">
        <div>列序号:{{col.id}}</div>
        <el-button type="primary" plain @click="deleteCols(col.id)">删除列</el-button>
        <el-form-item label="列宽">
           <el-input-number v-model="col.span" :min="1" :max="24"></el-input-number>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { deepCopy } from '@/utils'
import { getBus } from '@/utils/bus'
export default {
  props: ['params'],
  computed: {
    ...mapGetters([
      'currentComponent',
      'componentsAttributes',
      'time',
      'componentsLayouts'
    ])
  },
  data() {
    return {
      lastComponent: '',
      labelPosition: 'right',
      activeTab: 'attributeTab',
      layoutModel: {}
      // spanOptions: []
    }
  },
  watch: {
    // // 当前组件变化时，获取store中当前组件的属性，对从store中取出的属性进行clone，使buttonConfigModel和store中的属性不是同一个引用
    // currentComponent: function() {
    //   this.layoutModel = deepCopy(
    //     this.componentsAttributes[this.params.componentId]
    //   )
    // },
    // 当前组件变化时，获取store中当前组件的属性，对从store中取出的属性进行clone，使layoutModel和store中的属性不是同一个引用
    time: function() {
      this.layoutModel = deepCopy(
        this.componentsAttributes[this.params.componentId]
      )
    }
  },
  created() {
    // 初始化spanOptions
    // for (let index = 1; index <= 24; index++) {
    //   const option = {}
    //   option.label = index
    //   option.value = index
    //   this.spanOptions.push(option)
    // }
    // 初始化按钮配置时，对从store中取出的属性进行clone，使buttonConfigModel和store中的属性不是同一个引用
    this.layoutModel = deepCopy(
      this.componentsAttributes[this.params.componentId]
    )
  },
  mounted() {
    // 注册保存组件和删除组件事件
    // const topic = this.params.componentId + '-'
    // getBus().$off(topic + 'save')
    // getBus().$off(topic + 'delete')
    // getBus().$on(topic + 'save', this.save)
    // getBus().$on(topic + 'delete', this.delete)

    // 因为config类组件每次都需要重新渲染，所以mounted方法会被回调多次，所以这里先删除之前注册的事件，再重新注册事件，以免事件注册多次，事件触发时就执行了多次，应确保同一个事件只注册一次
    getBus().$off(this.params.componentId + '-attribute-' + 'save')
    getBus().$off(this.params.componentId + '-component-' + 'delete')
    getBus().$on(this.params.componentId + '-attribute-' + 'save', this.save)
    getBus().$on(this.params.componentId + '-component-' + 'delete', this.delete)
  },
  destroyed() {
    // const topic = this.params.componentId + '-'
    // getBus().$off(topic + 'save')
    // getBus().$off(topic + 'delete')
    getBus().$off(this.params.componentId + '-attribute-' + 'save')
    getBus().$off(this.params.componentId + '-component-' + 'delete')
  },
  methods: {
    // 保存组件属性
    save() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      // 将model对象clone之后再存储到store中，避免model对象与store使用相同的引用，这样在第一次提交后，只要修改model对象的值，不需要触发save方法也会自动改变store中的值，因为他们使用的是相同的引用
      componentAttributes[this.params.componentId] = deepCopy(this.layoutModel)
      this.$store.dispatch('setComponentAttributes', componentAttributes)
    },
    // 添加列
    addCols() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      const attributes = deepCopy(this.layoutModel)
      const col = {}
      col.id = attributes.cols.length
      attributes.cols.push(col)
      componentAttributes[this.params.componentId] = attributes
      this.$store.dispatch('setComponentAttributes', componentAttributes)
    },
    // 删除列
    deleteCols(id) {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      const attributes = deepCopy(this.layoutModel)
      // 遍历数组中的列，找到要删除的列
      let pos = -1
      for (let index = 0; index < attributes.cols.length; index++) {
        const element = attributes.cols[index]
        if (element.id === id) {
          pos = index
          break
        }
      }
      // 没有匹配到要删除的列
      if (pos === -1) {
        console.log('没有匹配到要删除的列')
        return
      }
      // 删除指定列
      attributes.cols.splice(pos, 1)
      componentAttributes[this.params.componentId] = attributes
      this.$store.dispatch('setComponentAttributes', componentAttributes)
    },
    // 删除组件
    delete() {
      // 删除布局组件时，需要将布局中的所有组件都删除，通过递归的方式，查找出当前布局组件中的所有组件

      if (this.params.componentId === 'preview-main-row') {
        console.log('不能删除preview-main-row')
        return
      }
      const list = this.findAllComponents(this.params.componentId, {
        componentIdList: [],
        layoutIdList: []
      })
      // // 将要删除的布局组件ID也添加到被删除的组件ID列表中
      // componentIdList.push(this.params.componentId)
      // for (let index = 0; index < list.componentIdList.length; index++) {
      //   this.$store.dispatch('deleteComponent', list.componentIdList[index])
      // }

      // for (let index = 0; index < list.layoutIdList.length; index++) {
      //   this.$store.dispatch('deleteLayout', list.layoutIdList[index])
      // }
      this.$store.dispatch('deleteComponent', list.componentIdList)
      this.$store.dispatch('deleteLayout', list.layoutIdList)
    },
    // 查找布局中所有的组件
    findAllComponents(componentId, list) {
      // 从state的componentsLayouts中查找布局组件对应的数据
      const layoutComponent = this.componentsLayouts[componentId]
      // 若找到了，则代表该组件是一个布局组件，则需要将布局组件内部的所有组件添加到componentIdList中
      if (layoutComponent) {
        list.layoutIdList.push(componentId)
        // 遍历该布局组件的所有列
        for (const col in layoutComponent) {
          // 获取到该列中所有的组件
          const components = layoutComponent[col]
          // 遍历该列中的所有组件
          for (let index = 0; index < components.length; index++) {
            // 若该组件还是一个布局组件，则递归调用findAllComponents方法
            if (this.componentsLayouts[components[index].componentId]) {
              this.findAllComponents(components[index].componentId, list)
            } else {
              // 若该组件不是布局组件，则将该组件添加到componentIdList中
              list.componentIdList.push(components[index].componentId)
            }
          }
        }
      }
      list.componentIdList.push(componentId)
      return list
    }
  }
}
</script>



