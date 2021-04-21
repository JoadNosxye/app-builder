<template>
  <div>
    <el-button draggable="true" :data-component-id="params.componentId" :type="attributes.type" :size="attributes.size" :plain="attributes.plain" :style='style' @click="openAttributesPanel">{{attributes.name}}</el-button>
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
      'componentsStyles',
      'time'
    ]),
    watchObj() {
      return this.time
    }
  },
  data() {
    return {
      style: '',
      // 按钮组件的属性默认值
      attributes: {
        name: '按钮',
        type: 'primary',
        size: 'medium',
        plain: false
      }
    }
  },
  created() {
    // if (this.componentsAttributes[this.params.componentId]) {
    //   // this.attributes = this.componentsAttributes[this.params.componentId]
    //   this.refresh()
    // }
    this.refresh()
  },
  watch: {
    // 观察store中是否有任何组件的属性发生变化，若有，则从store中取出自己的属性，并进行设置
    watchObj: function() {
      // this.attributes = this.componentsAttributes[this.params.componentId]
      this.refresh()
    }
  },
  methods: {
    refresh() {
      this.getAttributes()
      this.getStyle()
    },
    getAttributes() {
      this.attributes = this.componentsAttributes[this.params.componentId]
    },
    getStyle() {
      this.style = this.componentsStyles[this.params.componentId]
    },
    // 打开属性配置面板
    openAttributesPanel(ev) {
      // 阻止点击事件向父级layout元素冒泡传递事件
      ev.stopPropagation()
      if (this.currentComponent.componentId !== this.params.componentId) {
        this.$store.dispatch('setCurrentComponent', {
          componentId: this.params.componentId,
          componentName: this.params.componentName
        })
      }
    }
  }
}
</script>







