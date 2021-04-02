<template>
  <div>
    buttonConfig
    {{params.componentId}}
    {{params.componentName}}
  </div>

</template>
<script>
// import Store from '@/store'
export default {
  props: ['params', 'attributes'],
  methods: {
    config() {
      this.$store.dispatch('setCurrentComponent', {
        componentId: this.params.componentId,
        componentName: this.params.componentName
      })
    }
  }
}
</script>







