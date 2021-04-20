<template>
  <el-form ref="form" :model="styleModel" label-width="80px">
    <!-- <el-form-item label="样式">
      <el-input type="textarea" v-model="styleModel.style"></el-input>
    </el-form-item> -->
    <el-form-item label="字体颜色">
      <el-input id="color" v-model="styleModel.color" class="form-control input-lg" @blur='setColor'></el-input>
    </el-form-item>
    <el-form-item label="背景颜色">
      <el-input id="backgroundColor" v-model="styleModel.backgroundColor" class="form-control input-lg" @blur='setBackgroundColor'></el-input>
    </el-form-item>
  </el-form>
</template>


<script>
import { mapGetters } from 'vuex'
import { getBus } from '@/utils/bus'
import { deepCopy } from '@/utils'
export default {
  props: ['params'],
  computed: {
    ...mapGetters([
      'componentsStyles'
    ])
  },
  created() {
    if (this.componentsStyles[this.params.componentId]) {
      this.styleModel = this.componentsStyles[this.params.componentId]
    }
  },
  mounted() {
    getBus().$on(this.params.componentId + '-' + 'save', this.save)
    $('#color').colorpicker()
    $('#backgroundColor').colorpicker()
  },
  data() {
    return {
      styleModel: {
        color: '',
        backgroundColor: ''
      }
    }
  },
  methods: {
    save() {
      const component = { componentId: this.params.componentId }
      component.styles = deepCopy(this.styleModel)
      this.$store.dispatch('setComponentStyles', component)
    },
    setColor(e) {
      this.styleModel.color = e.srcElement.value
    },
    setBackgroundColor(e) {
      this.styleModel.backgroundColor = e.srcElement.value
    }
  }
}
</script>