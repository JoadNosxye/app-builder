<template>
  <div>
    <el-button type="primary" size="small" plain @click="setComponentAttributes">保存</el-button>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="buttonConfigModel">
      <el-form-item label="尺寸">
        <el-select v-model="buttonConfigModel.size" placeholder="请选择">
          <el-option v-for="item in sizeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="buttonConfigModel.type" placeholder="请选择">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否朴素">
        <el-checkbox v-model="buttonConfigModel.plain"></el-checkbox>
      </el-form-item>
    </el-form>

  </div>

</template>
<script>
export default {
  props: ['params', 'attributes'],
  data() {
    return {
      labelPosition: 'right',
      buttonConfigModel: {
        size: '',
        type: '',
        plain: false
      },
      size: '',
      sizeOptions: [
        {
          value: 'medium',
          label: 'medium'
        },
        {
          value: 'small',
          label: 'small'
        },
        {
          value: 'mini',
          label: 'mini'
        }
      ],
      typeOptions: [
        {
          value: 'primary',
          label: 'primary'
        },
        {
          value: 'success',
          label: 'success'
        },
        {
          value: 'warning',
          label: 'warning'
        },
        {
          value: 'danger',
          label: 'danger'
        },
        {
          value: 'info',
          label: 'info'
        },
        {
          value: 'text',
          label: 'text'
        }
      ]
    }
  },
  methods: {
    setComponentAttributes() {
      const componentAttributes = {
        componentId: this.params.componentId
      }
      componentAttributes[this.params.componentId] = this.buttonConfigModel
      this.$store.dispatch('setComponentAttributes', componentAttributes)
    }
  }
}
</script>







