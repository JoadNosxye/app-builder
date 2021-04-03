<template>
  <div>
    {{this.currentComponent.componentName}}:{{this.currentComponent.componentId}}:{{watchObj}}
    <component :is="component" :params="params"></component>
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
    },
    watchObj() {
      console.log('attribute ' + this.componentsAttributes[this.params.componentId].timestamp)
      return this.componentsAttributes[this.params.componentId].timestamp
    }
  }
}
</script>

