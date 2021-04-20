<template>
  <el-form size="small" ref="form" :model="styleModel" label-width="80px">
    <!-- <el-form-item label="样式">
      <el-input type="textarea" v-model="styleModel.style"></el-input>
    </el-form-item> -->
    <el-form-item label="字体颜色">
      <el-input id="color" v-model="styleModel.color" class="form-control input-lg" @blur='setColor'></el-input>
    </el-form-item>
    <el-form-item label="背景颜色">
      <el-input id="backgroundColor" v-model="styleModel.backgroundColor" class="form-control input-lg" @blur='setBackgroundColor'></el-input>
    </el-form-item>
    <el-form-item label="边框宽度">
      <el-col :span=14>
        <el-input-number controls-position="right" :min="0" v-model="styleModel.borderWidth" style="width:90%"></el-input-number>
      </el-col>
      <el-col :span=10>
        <el-select v-model="styleModel.borderWidthUnit" placeholder="请选择">
          <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
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
    ...mapGetters(['componentsStyles'])
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
        backgroundColor: '',
        borderWidth: ''
      },
      borderWidthUnit: 'px',
      unitOptions: [
        {
          value: 'px',
          label: 'px'
        },
        {
          value: 'pt',
          label: 'pt'
        },
        {
          value: 'em',
          label: 'em'
        },
        {
          value: 'ex',
          label: 'ex'
        },
        {
          value: 'pc',
          label: 'pc'
        },
        {
          value: 'cm',
          label: 'cm'
        },
        {
          value: 'mm',
          label: 'mm'
        },
        {
          value: 'in',
          label: 'in'
        },
        {
          value: '%',
          label: '%'
        }
      ]
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