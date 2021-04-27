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
    </el-form>
    <el-button type="primary" plain @click="openColConfigPanel">配置列属性</el-button>
    <el-dialog title="列属性配置" :visible.sync="colDialogVisible" top="5vh">
      <el-form :label-position="labelPosition" label-width="160px" size='small' :model="layoutModel">
        <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
          <el-tab-pane :key="col.id" v-for="(col, index) in layoutModel.cols" :label="col.id" :name="col.id">
            <el-row>
              <el-col :span=12>
                <el-form-item label="栅格占据的列数">
                  <el-input-number v-model="col.span" :min="1" :max="24"></el-input-number>
                </el-form-item>
                <el-form-item label="栅格左侧的间隔格数">
                  <el-input-number v-model="col.offset" :min="0" :max="24"></el-input-number>
                </el-form-item>
                <el-form-item label="栅格向右移动格数">
                  <el-input-number v-model="col.push" :min="0" :max="24"></el-input-number>
                </el-form-item>
                <el-form-item label="栅格向左移动格数">
                  <el-input-number v-model="col.pull" :min="0" :max="24"></el-input-number>
                </el-form-item>
                <el-form-item label="自定义元素标签">
                  <el-input v-model="col.tag" placeholder="" style="width:130px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item label="<768px 响应式栅格数">
                  <el-input-number v-model="col.xs" :min="0" :max="24"></el-input-number>
                </el-form-item>
                 <el-form-item label="≥768px 响应式栅格数">
                  <el-input-number v-model="col.sm" :min="0" :max="24"></el-input-number>
                </el-form-item>
                <el-form-item label="≥992px 响应式栅格数">
                  <el-input-number v-model="col.md" :min="0" :max="24"></el-input-number>
                </el-form-item>
                <el-form-item label="≥1200px 响应式栅格数">
                  <el-input-number v-model="col.lg" :min="0" :max="24"></el-input-number>
                </el-form-item>
                <el-form-item label="≥1920px 响应式栅格数">
                  <el-input-number v-model="col.xl" :min="0" :max="24"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-dialog>
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
      colDialogVisible: false,
      lastComponent: '',
      labelPosition: 'right',
      activeTab: 'attributeTab',
      layoutModel: {},
      editableTabsValue: ''
    }
  },
  watch: {
    // 当前组件变化时，获取store中当前组件的属性，对从store中取出的属性进行clone，使layoutModel和store中的属性不是同一个引用
    time: function() {
      this.layoutModel = deepCopy(
        this.componentsAttributes[this.params.componentId]
      )
    }
  },
  created() {
    // 初始化按钮配置时，对从store中取出的属性进行clone，使buttonConfigModel和store中的属性不是同一个引用
    this.layoutModel = deepCopy(
      this.componentsAttributes[this.params.componentId]
    )
  },
  mounted() {
    // 注册保存组件和删除组件事件
    getBus().$on(this.params.componentId + '-attribute-' + 'save', this.save)
    getBus().$on(
      this.params.componentId + '-component-' + 'delete',
      this.delete
    )
  },
  destroyed() {
    // 取消注册保存组件和删除组件事件
    getBus().$off(this.params.componentId + '-attribute-' + 'save')
    getBus().$off(this.params.componentId + '-component-' + 'delete')
  },
  methods: {
    renameColsId(cols) {
      for (let index = 0; index < cols.length; index++) {
        const col = cols[index]
        col.id = index
      }
    },
    handleTabsEdit(id, action) {
      if (action === 'add') {
        this.editableTabsValue = this.addCols().id
      }
      if (action === 'remove') {
        if (id === '0') {
          console.log('不允许删除第0列')
          return
        }
        this.deleteCols(id)
        this.renameColsId(this.layoutModel.cols)
        this.editableTabsValue = '0'
        // this.editableTabsValue = this.layoutModel.cols[id + 1]
        //   ? this.layoutModel.cols[id + 1].id
        //   : this.layoutModel.cols[id - 1]
        //     ? this.layoutModel.cols[id - 1].id
        //     : ''
      }
    },
    openColConfigPanel() {
      this.colDialogVisible = true
    },
    // 保存组件属性
    save() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      // 将model对象clone之后再存储到store中，避免model对象与store使用相同的引用，否则在第一次提交后，只要修改model对象的值，不需要触发save方法也会自动改变store中的值，因为他们使用的是相同的引用
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
      // 列的id必须是字符串类型，否则添加删除列时会有问题
      col.id = attributes.cols.length + ''
      // col.offset = 0
      // col.push = 0
      // col.pull = 0
      // col.xs = ''
      // col.sm = ''
      // col.md = ''
      // col.lg = ''
      // col.xl = ''
      attributes.cols.push(col)
      componentAttributes[this.params.componentId] = attributes
      this.$store.dispatch('setComponentAttributes', componentAttributes)
      return col
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
      if (this.params.componentId === 'preview-main-row') {
        console.log('不能删除preview-main-row')
        return
      }
      // 删除布局组件时，需要将布局中的所有组件都删除，通过递归的方式，查找出当前布局组件中的所有组件
      const list = this.findAllComponents(this.params.componentId, {
        componentIdList: [],
        layoutIdList: []
      })

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



