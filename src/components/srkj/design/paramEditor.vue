<template>
  <el-form :model="paramModel" label-width="80px">
    <el-form-item label="组件ID">
      <el-input v-model="paramModel.componentId" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="组件类型">
      <el-input v-model="paramModel.componentType" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="组件名称">
      <el-input v-model="paramModel.componentName"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
import { getBus } from '@/utils/bus'
import { deepCopy } from '@/utils'
export default {
  computed: {
    ...mapGetters(['componentsParams', 'currentComponent'])
  },
  created() {
    this.getParams()
  },
  mounted() {
    // 注册保存事件
    if (this.currentComponent.componentId) {
      getBus().$on(
        this.currentComponent.componentId + '-param-' + 'save',
        this.save
      )
      this.lastComponent = this.currentComponent
    }
  },
  destroyed() {
    // 取消注册保存事件，但是paramEditor这个组件会重复利用，所以destroyed是不会被回调的。
    getBus().$off(this.lastComponent.componentId + '-param-' + 'save')
  },
  watch: {
    // 监听当前组件是否变化，若变化，则取消原有组件注册的参数保存事件，并注册新组件的参数保存事件
    currentComponent: function() {
      if (
        this.lastComponent.componentId !== this.currentComponent.componentId
      ) {
        getBus().$off(this.lastComponent.componentId + '-param-' + 'save')
        getBus().$on(
          this.currentComponent.componentId + '-param-' + 'save',
          this.save
        )
        this.lastComponent = this.currentComponent
        this.getParams()
      }
    }
  },
  data() {
    return {
      lastComponent: '',
      paramModel: {
        componentId: '',
        componentType: '',
        componentName: ''
      }
    }
  },
  methods: {
    // 保存当前组件设置的参数
    save() {
      const component = { componentId: this.currentComponent.componentId }
      component.params = deepCopy(this.paramModel)
      this.$store.dispatch('setComponentParams', component)
    },
    getParams() {
      // 从store中获取当前组件的参数，若获取到则对paramModel赋值，若没有获取到则重置paramModel的所有属性值为初始值
      if (this.componentsParams[this.currentComponent.componentId]) {
        this.paramModel = deepCopy(
          this.componentsParams[this.currentComponent.componentId]
        )
      } else {
        this.restParamModel(this.paramModel)
      }
    },
    // 重置paramModel的属性值为初始值
    restParamModel(model) {
      for (const key in model) {
        model[key] = ''
      }
    }
  }
}
</script>