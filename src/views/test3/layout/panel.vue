<template>
  <div id="panel">
    <el-row>
      <el-col :span=16>
        <el-button type="primary" size="small">水平居左</el-button>
        <el-button type="primary" size="small">水平居中</el-button>
        <el-button type="primary" size="small">水平居右</el-button>
        <el-button type="primary" size="small">垂直置顶</el-button>
        <el-button type="primary" size="small">垂直居中</el-button>
        <el-button type="primary" size="small">垂直置底</el-button>
      </el-col>
      <el-col :span=8>
        <el-button type="primary" @click="saveComponent">保存</el-button>
        <el-button type="primary" @click="deleteComponent">删除</el-button>
      </el-col>
    </el-row>

  </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getBus } from '@/utils/bus'
export default {
  computed: {
    ...mapGetters(['currentComponent'])
  },
  methods: {
    saveComponent() {
      getBus().$emit(this.currentComponent.componentId + '-param-save', '')
      getBus().$emit(this.currentComponent.componentId + '-attribute-save', '')
      getBus().$emit(this.currentComponent.componentId + '-style-save', '')
    },
    deleteComponent() {
      getBus().$emit(this.currentComponent.componentId + '-component-delete', '')
    }
  }
}
</script>
<style scoped>
.el-button {
  margin: 3px;
  float: right;
}
</style>


