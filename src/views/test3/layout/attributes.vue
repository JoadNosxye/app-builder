<template>
  <div>
    <component :is="component" :params="params" :key="currentComponent.componentId"/>
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
      return this.currentComponent.componentName + '-config'
    },
    params() {
      return this.componentsParams[this.currentComponent.componentId]
    }
  }
}
</script>
  
