<template>
  <div>
    <el-button type="primary" size="small" plain @click="setComponentAttributes">保存</el-button>
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
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
import { deepCopy } from '@/utils'
export default {
  props: ['params'],
  computed: {
    ...mapGetters(['currentComponent', 'componentsAttributes', 'time'])
  },
  data() {
    return {
      labelPosition: 'right',
      layoutModel: {
        // row: {
        //   gutter: 0,
        //   type: '',
        //   justify: 'start',
        //   align: 'top',
        //   tag: 'div'
        // },
        // cols: []
      },
      spanOptions: [
        {
          value: 12,
          label: 12
        },
        {
          value: 6,
          label: 6
        },
        {
          value: 8,
          label: 8
        }
      ]
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
    // 初始化按钮配置时，对从store中取出的属性进行clone，使buttonConfigModel和store中的属性不是同一个引用
    this.layoutModel = deepCopy(
      this.componentsAttributes[this.params.componentId]
    )
  },
  methods: {
    setComponentAttributes() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      // 将model对象clone之后再存储到store中，避免model对象与store使用相同的引用，这样在第一次提交后，只要修改model对象的值，不需要触发setComponentAttributes方法也会自动改变store中的值，因为他们使用的是相同的引用
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
    }
  }
}
</script>



