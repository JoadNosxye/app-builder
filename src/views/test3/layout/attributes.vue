<template>
  <div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="参数" name="paramTab">
        <el-form :model="paramModel" label-width="80px">
          <el-form-item label="组件ID">
            <el-input v-model="paramModel.componentId"></el-input>
          </el-form-item>
          <el-form-item label="组件类型">
            <el-input v-model="paramModel.componentType"></el-input>
          </el-form-item>
          <el-form-item label="组件名称">
            <el-input v-model="paramModel.componentName"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="属性" name="attributeTab">
        <component :is="component" :params="params" :key="currentComponent.componentId" />
      </el-tab-pane>
      <el-tab-pane label="样式" name="cssTab">
        <style-editor></style-editor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'currentComponent',
      'componentsParams',
      'componentsAttributes'
    ]),
    component() {
      return this.currentComponent.componentType + '-config'
    },
    params() {
      return this.componentsParams[this.currentComponent.componentId]
    }
  },
  watch: {
    currentComponent: function() {
      this.paramModel.componentId = this.currentComponent.componentId
      this.paramModel.componentType = this.currentComponent.componentType
      this.paramModel.componentName = this.currentComponent.componentName
    }
  },
  data() {
    return {
      paramModel: {
        componentId: '',
        componentType: '',
        componentName: ''
      },
      activeTab: 'paramTab'
    }
  }
}
</script>
  
