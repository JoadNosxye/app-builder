<template>
  <el-tabs v-model="activeTab" type="card">
    <el-tab-pane label="参数" name="paramTab">
      <param-editor></param-editor>
    </el-tab-pane>
    <el-tab-pane label="属性" name="attributeTab">
      <component :is="component" :params="params" :key="currentComponent.componentId" />
    </el-tab-pane>
    <el-tab-pane label="事件" name="eventTab">
    </el-tab-pane>
    <el-tab-pane label="样式" name="cssTab">
      <style-editor></style-editor>
    </el-tab-pane>
  </el-tabs>
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
  data() {
    return {
      activeTab: 'paramTab'
    }
  }
}
</script>
  
