<template>
  <div>
    {{this.$store.state.builder.componentsAttributes[
        this.params.componentId
      ].timestamp}}
    <el-button :type="attributes.type" :size="attributes.size" :plain="attributes.plain" @click="openAttributesPanel">{{attributes.name}}</el-button>
  </div>

</template>
<script>
export default {
  props: ['params'],
  computed: {
    watchObj() {
      return this.$store.state.builder.componentsAttributes[
        this.params.componentId
      ].timestamp
    }
  },
  data() {
    return {
      attributes: {
        name: '按钮',
        type: 'primary',
        size: 'medium',
        plain: false
      }
    }
  },
  created() {
    // TODO 获取该组件的默认属性配置，并对data中的attributes进行赋值
  },
  watch: {
    // 观察store中该组件的属性的时间戳是否发生变化，若变化则将最新的属性设置到当前组件上
    watchObj: function() {
      this.attributes = this.$store.state.builder.componentsAttributes[
        this.params.componentId
      ].attributes
      // this.setAttributes()
    }
  },
  methods: {
    // 设置属性
    // setAttributes() {
    //   this.content = this.attributes.content ? this.attributes.content : '按钮'
    //   this.type = this.attributes.type ? this.attributes.type : 'primary'
    //   this.size = this.attributes.size ? this.attributes.size : 'medium'
    //   this.plain = this.attributes.plain ? this.attributes.plain : false
    // },
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







