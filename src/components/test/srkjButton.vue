<template>
  <div>
    <!-- <el-button type="primary" v-if="text==='primary'">主要按钮</el-button>
    <el-button type="danger" v-if="text==='danger'">危险按钮</el-button> -->
    {{componentsAttributesInStore}}
    <el-button :type="type" @click="openAttributesPanel">危险按钮</el-button>
  </div>

</template>
<script>
import Store from '@/store'
export default {
  props: ['params', 'attributes'],
  data() {
    return {
      componentsAttributesInStore:
        Store.state.builder.componentsAttributes[this.params.componentId].timestamp,
      type: ''
    }
  },
  created() {
    this.setAttributes()
  },
  watch: {
    // 观察store中该组件的属性是否发生变化，若变化则将最新的属性设置到当前组件上
    componentsAttributesInStore: function() {
      this.attributes = this.componentsAttributesInStore
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







