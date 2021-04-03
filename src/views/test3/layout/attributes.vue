<template>
  <div>
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
      console.log(this.currentComponent.componentId)
      return this.componentsParams[this.currentComponent.componentId]
    }
  }
}
</script>

