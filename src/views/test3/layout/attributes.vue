<template>
<div>{{currentComponent.componentId}},{{currentComponent.componentName}}</div>
  
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'currentComponent'
    ])
  }
}
</script>

