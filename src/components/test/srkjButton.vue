<template>
  <div>
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
      return this.time
    }
  },
  data() {
    return {
      // 按钮组件的属性默认值
      attributes: {
        name: '按钮',
        type: 'primary',
        size: 'medium',
        plain: false
      }
    }
  },
  watch: {
    // 观察store中是否有任何组件的属性发生变化，若有，则从store中取出自己的属性，并进行设置
    watchObj: function() {
      this.attributes = this.$store.state.builder.componentsAttributes[
        this.params.componentId
      ]
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







