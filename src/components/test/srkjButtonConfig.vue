<template>
  <div>
    <el-button type="primary" size="small" plain @click="setComponentAttributes">保存</el-button>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="buttonConfigModel">
      <el-form-item label="名称">
        <el-input v-model="buttonConfigModel.name"></el-input>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="buttonConfigModel.size" placeholder="请选择">
          <el-option v-for="item in sizeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="buttonConfigModel.type" placeholder="请选择">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否朴素">
        <el-checkbox v-model="buttonConfigModel.plain"></el-checkbox>
      </el-form-item>
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
      buttonConfigModel: {
        name: '按钮',
        size: 'medium',
        type: 'primary',
        plain: false
      },
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
      ],
      typeOptions: [
        {
          value: 'primary',
          label: 'primary'
        },
        {
          value: 'success',
          label: 'success'
        },
        {
          value: 'warning',
          label: 'warning'
        },
        {
          value: 'danger',
          label: 'danger'
        },
        {
          value: 'info',
          label: 'info'
        },
        {
          value: 'text',
          label: 'text'
        }
      ]
    }
  },
  watch: {
    // 当前组件变化时，获取store中当前组件的属性
    currentComponent: function() {
      this.buttonConfigModel = this.componentsAttributes[
        this.params.componentId
      ].attributes
    }
  },
  created() {
    this.buttonConfigModel = this.componentsAttributes[
      this.params.componentId
    ].attributes
  },
  methods: {
    setComponentAttributes() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      // 将model对象clone之后再存储到store中，避免model对象与store使用相同的引用，这样在第一次提交后，只要修改model对象的值，不需要触发setComponentAttributes方法也会自动改变store中的值，因为他们使用的是相同的引用
      componentAttributes[this.params.componentId] = deepCopy(this.buttonConfigModel)
      this.$store.dispatch('setComponentAttributes', componentAttributes)
    }
  }
}
</script>







