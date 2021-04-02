<template>
  <!-- <div>{{currentComponent.componentId}},{{currentComponent.componentName}}</div> -->
  <component :is="component" :params="params" :attributes="attributes"></component>

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
    attributes() {
      return this.componentsAttributes[this.currentComponent.componentId]
    }
  }
}
</script>

