<template>
  <el-form size="small" ref="form" :model="styleModel" label-width="80px">
    <!-- <el-form-item label="样式">
      <el-input type="textarea" v-model="styleModel.style"></el-input>
    </el-form-item> -->
    <el-tabs v-model="activeTab">
      <el-tab-pane label="宽高" name="heightWidth">
        <el-form-item label="整体宽度">
          <style-unit @change='styleModel.width=$event'></style-unit>
        </el-form-item>
        <el-form-item label="整体高度">
          <style-unit @change='styleModel.height=$event'></style-unit>
        </el-form-item>
        <el-form-item label="溢出选项">
          <el-select v-model="styleModel.overflow" placeholder="">
            <el-option v-for="item in overflowOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="颜色" name="color">
        <el-form-item label="字体颜色">
          <el-input id="color" v-model="styleModel.color" class="form-control input-lg" @blur='styleModel.color = $event.srcElement.value'></el-input>
        </el-form-item>
        <el-form-item label="背景颜色">
          <el-input id="backgroundColor" v-model="styleModel.backgroundColor" class="form-control input-lg" @blur='styleModel.backgroundColor = $event.srcElement.value'></el-input>
        </el-form-item>
        <el-form-item label="边框颜色">
          <el-input id="borderColor" v-model="styleModel.borderColor" class="form-control input-lg" @blur='styleModel.borderColor = $event.srcElement.value'></el-input>
        </el-form-item>
        <el-form-item label="上边颜色">
          <el-input id="borderTopColor" v-model="styleModel.borderTopColor" class="form-control input-lg" @blur='styleModel.borderTopColor = $event.srcElement.value'></el-input>
        </el-form-item>
        <el-form-item label="左边颜色">
          <el-input id="borderLeftColor" v-model="styleModel.borderLeftColor" class="form-control input-lg" @blur='styleModel.borderLeftColor = $event.srcElement.value'></el-input>
        </el-form-item>
        <el-form-item label="右边颜色">
          <el-input id="borderRightColor" v-model="styleModel.borderRightColor" class="form-control input-lg" @blur='styleModel.borderRightColor = $event.srcElement.value'></el-input>
        </el-form-item>
        <el-form-item label="底边颜色">
          <el-input id="borderBottomColor" v-model="styleModel.borderBottomColor" class="form-control input-lg" @blur='styleModel.borderBottomColor = $event.srcElement.value'></el-input>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="边距" name="padding">
        <el-form-item label="内侧边距">
          <style-unit @change='styleModel.padding=$event'></style-unit>
        </el-form-item>
        <el-form-item label="上内边距">
          <style-unit @change='styleModel.paddingTop=$event'></style-unit>
        </el-form-item>
        <el-form-item label="左内边距">
          <style-unit @change='styleModel.paddingLeft=$event'></style-unit>
        </el-form-item>
        <el-form-item label="右内边距">
          <style-unit @change='styleModel.paddingRight=$event'></style-unit>
        </el-form-item>
        <el-form-item label="底内边距">
          <style-unit @change='styleModel.paddingBottom=$event'></style-unit>
        </el-form-item>
        <el-form-item label="外侧边距">
          <style-unit @change='styleModel.padding=$event'></style-unit>
        </el-form-item>
        <el-form-item label="上外边距">
          <style-unit @change='styleModel.marginTop=$event'></style-unit>
        </el-form-item>
        <el-form-item label="左外边距">
          <style-unit @change='styleModel.marginLeft=$event'></style-unit>
        </el-form-item>
        <el-form-item label="右外边距">
          <style-unit @change='styleModel.marginRight=$event'></style-unit>
        </el-form-item>
        <el-form-item label="底外边距">
          <style-unit @change='styleModel.marginBottom=$event'></style-unit>
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
          <el-select v-model="styleModel.borderStyle" placeholder="">
            <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上边样式">
          <el-select v-model="styleModel.borderTopStyle" placeholder="">
            <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="左边样式">
          <el-select v-model="styleModel.borderLeftStyle" placeholder="">
            <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="右边样式">
          <el-select v-model="styleModel.borderRightStyle" placeholder="">
            <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="底边样式">
          <el-select v-model="styleModel.borderBottomStyle" placeholder="">
            <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="文字" name="font">
        <el-form-item label="文字字体">
          <el-select v-model="styleModel.fontFamily" placeholder="">
            <el-option v-for="item in fontFamilyOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文字大小">
          <el-select v-model="styleModel.fontSize" placeholder="">
            <el-option v-for="item in fontSizeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文字粗细">
          <el-select v-model="styleModel.fontWeight" placeholder="">
            <el-option v-for="item in fontWeightOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="文字样式">
          <el-select v-model="styleModel.fontStyle" placeholder="">
            <el-option v-for="item in fontStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文字变量">
          <el-select v-model="styleModel.fontVariant" placeholder="">
            <el-option v-for="item in fontVariantOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文字行高">
          <style-unit @change='styleModel.lineHeight=$event'></style-unit>
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
    $('#borderColor').colorpicker()
    $('#borderTopColor').colorpicker()
    $('#borderLeftColor').colorpicker()
    $('#borderRightColor').colorpicker()
    $('#borderBottomColor').colorpicker()
  },
  data() {
    return {
      activeTab: 'heightWidth',
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
        borderBottomStyle: '',
        width: '',
        height: '',
        overflow: '',
        padding: '',
        paddingTop: '',
        paddingLeft: '',
        paddingRight: '',
        paddingBottom: '',
        margin: '',
        marginTop: '',
        marginLeft: '',
        marginRight: '',
        marginBottom: '',
        fontFamily: '',
        fontSize: '',
        fontWeight: '',
        fontStyle: '',
        fontVariant: '',
        lineHeight: ''
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
      ],
      overflowOptions: [
        {
          value: 'visible',
          label: 'visible'
        },
        {
          value: 'hidden',
          label: 'hidden'
        },
        {
          value: 'scroll',
          label: 'scroll'
        },
        {
          value: 'auto',
          label: 'auto'
        }
      ],
      fontFamilyOptions: [
        {
          value: 'serif',
          label: 'serif'
        },
        {
          value: 'sans-serif',
          label: 'sans-serif'
        },
        {
          value: 'cursive',
          label: 'cursive'
        },
        {
          value: 'fantasy',
          label: 'fantasy'
        },
        {
          value: 'monospace',
          label: 'monospace'
        }
      ],
      fontSizeOptions: [
        {
          value: '9pt',
          label: '9pt'
        },
        {
          value: '10pt',
          label: '10pt'
        },
        {
          value: '12pt',
          label: '12pt'
        },
        {
          value: '14pt',
          label: '14pt'
        },
        {
          value: '16pt',
          label: '16pt'
        },
        {
          value: 'xx-small',
          label: 'xx-small'
        },
        {
          value: 'x-small',
          label: 'x-small'
        },
        {
          value: 'small',
          label: 'small'
        },
        {
          value: 'large',
          label: 'large'
        },
        {
          value: 'x-large',
          label: 'x-large'
        },
        {
          value: 'xx-large',
          label: 'xx-large'
        }
      ],
      fontWeightOptions: [
        {
          value: 'normal',
          label: 'normal'
        },
        {
          value: 'bold',
          label: 'bold'
        }
      ],
      fontStyleOptions: [
        {
          value: 'normal',
          label: 'normal'
        },
        {
          value: 'italic',
          label: 'italic'
        },
        {
          value: 'oblique',
          label: 'oblique'
        }
      ],
      fontVariantOptions: [
        {
          value: 'normal',
          label: 'normal'
        },
        {
          value: 'small-caps',
          label: 'small-caps'
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