<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" size='small' :model="model">
      <el-form-item label="高度">
        <el-input-number v-model="model.height" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="最大高度">
        <el-input-number v-model="model.maxHeight" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="model.size" placeholder="请选择">
          <el-option v-for="item in sizeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="斑马纹">
        <el-checkbox v-model="model.stripe"></el-checkbox>
      </el-form-item>
      <el-form-item label="纵向边框">
        <el-checkbox v-model="model.border"></el-checkbox>
      </el-form-item>
      <el-form-item label="自撑开">
        <el-checkbox v-model="model.fit"></el-checkbox>
      </el-form-item>
      <el-form-item label="显示表头">
        <el-checkbox v-model="model.showHeader"></el-checkbox>
      </el-form-item>
      <el-form-item label="高亮">
        <el-checkbox v-model="model.highlightCurrentRow"></el-checkbox>
      </el-form-item>
      <el-form-item label="排序列">
        <el-checkbox v-model="model.defaultSort"></el-checkbox>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span=8 :offset=8>
        <el-button type="primary" plain @click="openColConfigPanel">表格列属性配置</el-button>
      </el-col>
    </el-row>
    <el-dialog title="表格列属性配置" :visible.sync="colDialogVisible" top="5vh">
      <el-form :label-position="labelPosition" label-width="160px" size='small' :model="model">
        <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
          <el-tab-pane :key="col.id" v-for="(col, index) in model.cols" :label="col.id" :name="col.id">
            <el-row>
              <el-col :span=12>
                <el-form-item label="标题">
                  <el-input v-model="col.label" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item label="字段名">
                  <el-input v-model="col.prop" placeholder=""></el-input>
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
import { showConfirmMsg } from '@/utils/index'
export default {
  props: ['params'],
  computed: {
    ...mapGetters(['componentsAttributes', 'time'])
  },
  data() {
    return {
      editableTabsValue: '0',
      colDialogVisible: false,
      labelPosition: 'right',
      model: {},
      size: '',
      sizeOptions: [
        {
          value: 'medium',
          label: 'medium'
        },
        {
          value: 'small',
          label: 'small'
        },
        {
          value: 'mini',
          label: 'mini'
        }
      ]
    }
  },
  created() {
    // 从store中获取表格的属性
    this.model = deepCopy(this.componentsAttributes[this.params.componentId])
  },
  mounted() {
    // 注册保存组件和删除组件的事件
    getBus().$on(this.params.componentId + '-attribute-' + 'save', this.save)
    getBus().$on(
      this.params.componentId + '-component-' + 'delete',
      this.delete
    )
  },
  destroyed() {
    // 取消注册保存组件和删除组件的事件
    getBus().$off(this.params.componentId + '-attribute-' + 'save')
    getBus().$off(this.params.componentId + '-component-' + 'delete')
  },
  watch: {
    // 当前组件变化时，获取store中当前组件的属性
    time: function() {
      this.model = deepCopy(this.componentsAttributes[this.params.componentId])
    }
  },
  methods: {
    handleTabsEdit(id, action) {
      if (action === 'add') {
        this.editableTabsValue = this.addCols().id
      }
      if (action === 'remove') {
        showConfirmMsg(this, '此操作将删除该列, 是否继续?')
          .then(() => {
            this.deleteCols(id)
            this.editableTabsValue = '0'
          })
          .catch(msg => {
            console.log(msg + '删除该列')
          })
      }
    },
    // 添加列
    addCols() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      const attributes = deepCopy(this.model)
      const col = {}
      // 列的id必须是字符串类型，否则添加删除列时会有问题
      if (attributes.cols) {
        col.id = attributes.cols.length + ''
      } else {
        col.id = '0'
        attributes.cols = []
      }
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
      const attributes = deepCopy(this.model)
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
      // 更新所有列的id
      for (let index = 0; index < attributes.cols.length; index++) {
        const col = attributes.cols[index]
        col.id = index + ''
      }
      componentAttributes[this.params.componentId] = attributes
      this.$store.dispatch('setComponentAttributes', componentAttributes)
    },
    openColConfigPanel() {
      this.colDialogVisible = true
    },
    // 保存组件属性
    save() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      // 将model对象clone之后再存储到store中，避免model对象与store使用相同的引用，否则在第一次提交后，只要修改model对象的值，不需要触发setComponentAttributes方法也会自动改变store中的值，因为他们使用的是相同的引用
      componentAttributes[this.params.componentId] = deepCopy(this.model)
      this.$store.dispatch('setComponentAttributes', componentAttributes)
    },
    // 删除组件
    delete() {
      const list = []
      list.push(this.params.componentId)
      this.$store.dispatch('deleteComponent', list)
    }
  }
}
</script>







