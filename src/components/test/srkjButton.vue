<template>
  <div>
    <el-button :type="type" :size="size" :plain="plain" @click="openAttributesPanel">{{content}}</el-button>
  </div>

</template>
<script>
export default {
  props: ['params', 'attributes'],
  computed: {
    watchObj() {
      return this.$store.state.builder.componentsAttributes[
        this.params.componentId
      ].timestamp
    }
  },
  data() {
    return {
      content: '',
      type: '',
      size: '',
      plain: ''
    }
  },
  created() {
    this.setAttributes()
  },
  watch: {
    // 观察store中该组件的属性的时间戳是否发生变化，若变化则将最新的属性设置到当前组件上
    watchObj: function() {
      this.attributes = this.$store.state.builder.componentsAttributes[
        this.params.componentId
      ].attributes
      this.setAttributes()
    }
  },
  methods: {
    // 设置属性
    setAttributes() {
      this.content = this.attributes.content ? this.attributes.content : '按钮'
      this.type = this.attributes.type ? this.attributes.type : 'primary'
      this.size = this.attributes.size ? this.attributes.size : 'medium'
      this.plain = this.attributes.plain ? this.attributes.plain : false
    },
    // 打开属性配置面板
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







