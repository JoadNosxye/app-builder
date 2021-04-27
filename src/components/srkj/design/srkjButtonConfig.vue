<template>
  <el-form :label-position="labelPosition" label-width="80px" size='small' :model="buttonModel">
    <el-form-item label="名称">
      <el-input v-model="buttonModel.name"></el-input>
    </el-form-item>
     <el-form-item label="原生类型">
      <el-select v-model="buttonModel.nativeType" placeholder="请选择">
        <el-option v-for="item in nativeTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="buttonModel.type" placeholder="请选择">
        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="尺寸">
      <el-select v-model="buttonModel.size" placeholder="请选择">
        <el-option v-for="item in sizeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="图标类名">
      <el-input v-model="buttonModel.icon"></el-input>
    </el-form-item>
    <el-form-item label="朴素">
      <el-checkbox v-model="buttonModel.plain"></el-checkbox>
    </el-form-item>
    <el-form-item label="圆角">
      <el-checkbox v-model="buttonModel.round"></el-checkbox>
    </el-form-item>
    <el-form-item label="圆形">
      <el-checkbox v-model="buttonModel.circle"></el-checkbox>
    </el-form-item>
    <el-form-item label="加载中">
      <el-checkbox v-model="buttonModel.loading"></el-checkbox>
    </el-form-item>
    <el-form-item label="禁用">
      <el-checkbox v-model="buttonModel.disabled"></el-checkbox>
    </el-form-item>
    
    <el-form-item label="默认聚焦">
      <el-checkbox v-model="buttonModel.autofocus"></el-checkbox>
    </el-form-item>
   
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
import { deepCopy } from '@/utils'
import { getBus } from '@/utils/bus'
export default {
  props: ['params'],
  computed: {
    ...mapGetters(['currentComponent', 'componentsAttributes'])
  },
  data() {
    return {
      labelPosition: 'right',
      buttonModel: {},
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
      ],
      nativeTypeOptions: [
        {
          value: 'button',
          label: 'button'
        },
        {
          value: 'submit',
          label: 'submit'
        },
        {
          value: 'reset',
          label: 'reset'
        }
      ]
    }
  },
  created() {
    // 初始化按钮配置时，对从store中取出的属性进行clone，使buttonModel和store中的属性不是同一个引用
    this.buttonModel = deepCopy(
      this.componentsAttributes[this.params.componentId]
    )
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
  methods: {
    // 保存组件属性
    save() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      // 将model对象clone之后再存储到store中，避免model对象与store使用相同的引用，否则在第一次提交后，只要修改model对象的值，不需要触发setComponentAttributes方法也会自动改变store中的值，因为他们使用的是相同的引用
      componentAttributes[this.params.componentId] = deepCopy(this.buttonModel)
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







