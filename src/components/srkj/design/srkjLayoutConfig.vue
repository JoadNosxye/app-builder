<template>
  <div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="属性" name="attributeTab">
        <div style="margin: 20px;">行属性配置</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="layoutModel">
          <el-form-item label="栅格间隔">
            <el-input v-model="layoutModel.gutter"></el-input>
          </el-form-item>
          <el-form-item label="布局模式">
            <el-checkbox v-model="layoutModel.type"></el-checkbox>
          </el-form-item>
          <el-button type="primary" size="small" plain @click="addCols">增加列</el-button>
          <div style="margin: 20px;" v-for="col in layoutModel.cols">
            <div>列序号:{{col.id}}</div>
            <el-button type="primary" size="small" plain @click="deleteCols(col.id)">删除列</el-button>
            <el-form-item label="栅格占据的列数">
              <el-select v-model="col.span" placeholder="请选择">
                <el-option v-for="item in spanOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="样式" name="cssTab">
        <style-editor :params="params"></style-editor>
      </el-tab-pane>
    </el-tabs>
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
      labelPosition: 'right',
      activeTab: 'attributeTab',
      layoutModel: {},
      spanOptions: []
    }
  },
  watch: {
    // 当前组件变化时，获取store中当前组件的属性，对从store中取出的属性进行clone，使buttonConfigModel和store中的属性不是同一个引用
    currentComponent: function() {
      this.layoutModel = deepCopy(
        this.componentsAttributes[this.params.componentId]
      )
    },
    time: function() {
      this.layoutModel = deepCopy(
        this.componentsAttributes[this.params.componentId]
      )
    }
  },
  created() {
    for (let index = 0; index < 24; index++) {
      const option = {}
      option.label = index
      option.value = index
      this.spanOptions.push(option)
    }
    // 初始化按钮配置时，对从store中取出的属性进行clone，使buttonConfigModel和store中的属性不是同一个引用
    this.layoutModel = deepCopy(
      this.componentsAttributes[this.params.componentId]
    )
  },
  mounted() {
    const topic = this.params.componentId + '-'
    getBus().$on(topic + 'save', this.save)
    getBus().$on(topic + 'delete', this.delete)
  },
  methods: {
    save() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      // 将model对象clone之后再存储到store中，避免model对象与store使用相同的引用，这样在第一次提交后，只要修改model对象的值，不需要触发save方法也会自动改变store中的值，因为他们使用的是相同的引用
      componentAttributes[this.params.componentId] = deepCopy(this.layoutModel)
      this.$store.dispatch('setComponentAttributes', componentAttributes)
    },
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



