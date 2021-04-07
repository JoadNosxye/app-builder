<template>
  <div>
    <el-button type="primary" size="small" plain @click="setComponentAttributes">保存</el-button>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="layoutModel">
      <el-form-item label="栅格间隔">
        <el-input v-model="layoutModel.gutter"></el-input>
      </el-form-item>
      <el-form-item label="布局模式">
        <el-checkbox v-model="layoutModel.type"></el-checkbox>
      </el-form-item>

      <div style="margin: 20px;" v-for="col in layoutModel.cols">
        <div>列序号:{{col.id}}</div>
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
    ...mapGetters(['currentComponent', 'componentsAttributes'])
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
  watch: {
    // 当前组件变化时，获取store中当前组件的属性，对从store中取出的属性进行clone，使buttonConfigModel和store中的属性不是同一个引用
    currentComponent: function() {
      this.buttonConfigModel = deepCopy(
        this.componentsAttributes[this.params.componentId]
      )
    }
  },
  created() {
    // 初始化按钮配置时，对从store中取出的属性进行clone，使buttonConfigModel和store中的属性不是同一个引用
    this.buttonConfigModel = deepCopy(
      this.componentsAttributes[this.params.componentId]
    )
  },
  methods: {
    setComponentAttributes() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      // 将model对象clone之后再存储到store中，避免model对象与store使用相同的引用，这样在第一次提交后，只要修改model对象的值，不需要触发setComponentAttributes方法也会自动改变store中的值，因为他们使用的是相同的引用
      componentAttributes[this.params.componentId] = deepCopy(
        this.buttonConfigModel
      )
      this.$store.dispatch('setComponentAttributes', componentAttributes)
    }
  }
}
</script>







