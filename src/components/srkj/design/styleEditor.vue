<template>
  <el-form size="small" ref="form" :model="styleModel" label-width="80px">
    <!-- <el-form-item label="样式">
      <el-input type="textarea" v-model="styleModel.style"></el-input>
    </el-form-item> -->
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane label="颜色" name="color">
        <el-form-item label="字体颜色">
          <el-input id="color" v-model="styleModel.color" class="form-control input-lg" @blur='setColor'></el-input>
        </el-form-item>
        <el-form-item label="背景颜色">
          <el-input id="backgroundColor" v-model="styleModel.backgroundColor" class="form-control input-lg" @blur='setBackgroundColor'></el-input>
        </el-form-item>
        <el-form-item label="边框颜色">
          <style-unit @change='styleModel.borderColor=$event'></style-unit>
        </el-form-item>
        <el-form-item label="上边颜色">
          <style-unit @change='styleModel.borderTopColor=$event'></style-unit>
        </el-form-item>
        <el-form-item label="左边颜色">
          <style-unit @change='styleModel.borderLeftColor=$event'></style-unit>
        </el-form-item>
        <el-form-item label="右边颜色">
          <style-unit @change='styleModel.borderRightColor=$event'></style-unit>
        </el-form-item>
        <el-form-item label="底边颜色">
          <style-unit @change='styleModel.borderBottomColor=$event'></style-unit>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="边框" name="border">
        <el-form-item label="边框宽度">
          <style-unit @change='styleModel.borderWidth=$event'></style-unit>
        </el-form-item>
        <el-form-item label="上边宽度">
          <style-unit @change='styleModel.borderTopWidth=$event'></style-unit>
        </el-form-item>
        <el-form-item label="左边宽度">
          <style-unit @change='styleModel.borderLeftWidth=$event'></style-unit>
        </el-form-item>
        <el-form-item label="右边宽度">
          <style-unit @change='styleModel.borderRightWidth=$event'></style-unit>
        </el-form-item>
        <el-form-item label="底边宽度">
          <style-unit @change='styleModel.borderBottomWidth=$event'></style-unit>
        </el-form-item>
        <el-form-item label="边框样式">
          <el-select v-model="styleModel.borderStyle" placeholder="请选择">
            <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上边样式">
          <el-select v-model="styleModel.borderTopStyle" placeholder="请选择">
            <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="左边样式">
          <el-select v-model="styleModel.borderLeftStyle" placeholder="请选择">
            <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="右边样式">
          <el-select v-model="styleModel.borderRightStyle" placeholder="请选择">
            <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="底边样式">
          <el-select v-model="styleModel.borderBottomStyle" placeholder="请选择">
            <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>

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
      activeTab: 'color',
      styleModel: {
        color: '#000000',
        backgroundColor: 'transparent',
        borderWidth: '',
        borderTopWidth: '',
        borderLeftWidth: '',
        borderRightWidth: '',
        borderBottomWidth: '',
        borderColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderStyle: '',
        borderTopStyle: '',
        borderLeftStyle: '',
        borderRightStyle: '',
        borderBottomStyle: ''
      },
      borderStyleOptions: [
        {
          value: 'none',
          label: 'none'
        },
        {
          value: 'solid',
          label: 'solid'
        },
        {
          value: 'double',
          label: 'double'
        },
        {
          value: 'groove',
          label: 'groove'
        },
        {
          value: 'ridge',
          label: 'ridge'
        },
        {
          value: 'inset',
          label: 'inset'
        },
        {
          value: 'outset',
          label: 'outset'
        },
        {
          value: 'dashed',
          label: 'dashed'
        },
        {
          value: 'dotted',
          label: 'dotted'
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
    },
    xixi(unit, e) {
      unit = e
    }
  }
}
</script>