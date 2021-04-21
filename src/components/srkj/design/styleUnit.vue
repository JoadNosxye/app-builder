<template>
  <div>
    <el-col :span=14>
      <el-input-number controls-position="right" :min="0" v-model="unitModel.number" style="width:90%" @change="change"></el-input-number>
    </el-col>
    <el-col :span=10>
      <el-select v-model="unitModel.unit" placeholder="" @change="change">
        <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['action'],
  computed: {
    ...mapGetters(['componentsStyles', 'currentComponent'])
  },
  data() {
    return {
      unitModel: {
        number: '',
        unit: ''
      },
      unitOptions: [
        {
          value: '%',
          label: '%'
        },
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
        }
      ]
    }
  },
  // watch currentComponent，不知道为什么页面初始化后，就无限回调这个方法，否则用这个方法来获取当前组件的值是很好的方法
  // watch: {
  //   currentComponent: function() {
  //     // if (this.componentsStyles[this.currentComponent.componentId]) {
  //     //   const value = this.componentsStyles[this.currentComponent.componentId][
  //     //     this.attribute
  //     //   ]
  //     //   this.unitModel.number = value.match('^[0-9]*$')
  //     //   this.unitModel.unit = value.substring(this.unitModel.number.size)
  //     // } else {
  //     //   this.unitModel.number = ''
  //     //   this.unitModel.unit = ''
  //     // }
  //     console.log('1111111')
  //   }
  // },
  methods: {
    change() {
      if (this.unitModel.number && this.unitModel.unit) {
        const unit = this.unitModel.number + this.unitModel.unit
        this.$emit('change', unit)
      }
    },
    clear() {
      this.unitModel.number = ''
      this.unitModel.unit = ''
    }
  }
}
</script>

