<template>
  <div>
    <el-button :type="type" @click="openAttributesPanel">危险按钮</el-button>
  </div>

</template>
<script>
// import Store from '@/store'
export default {
  props: ['params', 'attributes'],
  computed: {
    watchObj() {
      return this.$store.state.builder.componentsAttributes[this.params.componentId].timestamp
    }
  },
  data() {
    return {
      type: ''
    }
  },
  created() {
    this.setAttributes()
  },
  watch: {
    // 观察store中该组件的属性是否发生变化，若变化则将最新的属性设置到当前组件上
    watchObj: function() {
      this.attributes = this.$store.state.builder.componentsAttributes[this.params.componentId].attributes
      this.setAttributes()
    }
  },
  methods: {
    setAttributes() {
      this.type = this.attributes.type ? this.attributes.type : 'success'
    },
    openAttributesPanel(ev) {
      // 阻止点击事件向父级layout元素冒泡传递事件
      ev.stopPropagation()
      this.$store.dispatch('setCurrentComponent', {
        componentId: this.params.componentId,
        componentName: this.params.componentName
      })
    }
  }
}
</script>







