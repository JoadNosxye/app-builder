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
export default {
//   props: ['unit'],
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
  methods: {
    change() {
      const unit = this.unitModel.number + this.unitModel.unit
      this.$emit('change', unit)
    }
  }
}
</script>

