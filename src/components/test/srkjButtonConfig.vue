<template>
  <div>
    <!-- buttonConfig {{params.componentId}} {{params.componentName}} -->

    <el-button type="primary" size="small" plain @click="save">保存</el-button>
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
      <el-form-item label="是否朴素按钮">
        <el-checkbox v-model="buttonConfigModel.plain">是</el-checkbox>
      </el-form-item>
    </el-form>

  </div>

</template>
<script>
// import Store from '@/store'
export default {
  props: ['params', 'attributes'],
  data() {
    return {
      labelPosition: 'right',
      buttonConfigModel: {
        size: '',
        type: '',
        plain: ''

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
    config() {
      this.$store.dispatch('setCurrentComponent', {
        componentId: this.params.componentId,
        componentName: this.params.componentName
      })
    },
    save() {
      alert('haha')
    }
  }
}
</script>







