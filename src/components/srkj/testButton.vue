<template>
  <el-button :type="attributes.type" :size="attributes.size" :plain="attributes.plain" @click="click">{{attributes.name}}</el-button>
</template>
<script>
export default {
  props: ['attributes'],
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>









