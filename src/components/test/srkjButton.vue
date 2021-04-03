<template>
  <div>
    {{this.params.componentName}}:{{this.params.componentId}}:{{watchObj}}:{{haha}}
    <el-button :type="attributes.type" :size="attributes.size" :plain="attributes.plain" @click="openAttributesPanel">{{attributes.name}}</el-button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['params'],
  computed: {
    ...mapGetters([
      'currentComponent',
      'componentsParams',
      'componentsAttributes',
      'time'
    ]),
    watchObj() {
      console.log(
        'button ' + this.componentsAttributes[this.params.componentId].timestamp
      )
      return this.componentsAttributes[this.params.componentId].timestamp
    },
    haha() {
      return this.time
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
  watch: {
    // 观察store中该组件的属性的时间戳是否发生变化，若变化则将最新的属性设置到当前组件上
    watchObj: function() {
      this.attributes = this.$store.state.builder.componentsAttributes[
        this.params.componentId
      ].attributes
    },
    haha: function() {
      console.log('haha-' + this.params.componentId)
      console.log('button-' + this.$store.state.builder.componentsAttributes[this.params.componentId].attributes)
      this.attributes = this.$store.state.builder.componentsAttributes[this.params.componentId].attributes
    }
  },
  methods: {
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







