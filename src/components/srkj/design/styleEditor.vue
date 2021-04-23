<template>
  <el-form :label-position="labelPosition" size="small" ref="form" :model="styleModel" label-width="70px">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="宽高" name="heightWidth">
        <el-form-item label="整体宽度">
          <el-input v-model="styleModel.width" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="整体高度">
          <el-input v-model="styleModel.height" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="溢出选项">
          <el-select v-model="styleModel.overflow" placeholder="">
            <el-option v-for="item in overflowOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="定位" name="location">
        <el-form-item label="资源定位">
          <el-select v-model="styleModel.position" placeholder="">
            <el-option v-for="item in positionOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示属性">
          <el-select v-model="styleModel.display" placeholder="">
            <el-option v-for="item in displayOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可见">
          <el-select v-model="styleModel.visibility" placeholder="">
            <el-option v-for="item in visibilityOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="距离顶部">
          <el-input v-model="styleModel.top" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="距离左边">
          <el-input v-model="styleModel.left" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="距离右边">
          <el-input v-model="styleModel.right" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="距离底边">
          <el-input v-model="styleModel.bottom" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="优先等级">
          <el-input-number v-model="styleModel.zIndex" :min="0" :max="10" label="优先等级"></el-input-number>
        </el-form-item>
        <el-form-item label="清除属性">
          <el-select v-model="styleModel.clear" placeholder="">
            <el-option v-for="item in clearOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="浮动属性">
          <el-select v-model="styleModel.float" placeholder="">
            <el-option v-for="item in floatOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="水平排列">
          <el-select v-model="styleModel.textAlign" placeholder="">
            <el-option v-for="item in textAlignOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="垂直排列">
          <el-select v-model="styleModel.verticalAlign" placeholder="">
            <el-option v-for="item in verticalAlignOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="颜色" name="color">
        <el-form-item label="字体颜色">
          <el-color-picker v-model="styleModel.color" show-alpha :predefine="predefineColors"/>
        </el-form-item>
        <el-form-item label="边框颜色">
          <el-color-picker v-model="styleModel.borderColor" show-alpha :predefine="predefineColors"/>
        </el-form-item>
        <el-form-item label="上边颜色">
          <el-color-picker v-model="styleModel.borderTopColor" show-alpha :predefine="predefineColors"/>
        </el-form-item>
        <el-form-item label="左边颜色">
          <el-color-picker v-model="styleModel.borderLeftColor" show-alpha :predefine="predefineColors"/>
        </el-form-item>
        <el-form-item label="右边颜色">
          <el-color-picker v-model="styleModel.borderRightColor" show-alpha :predefine="predefineColors"/>
        </el-form-item>
        <el-form-item label="底边颜色">
          <el-color-picker v-model="styleModel.borderBottomColor" show-alpha :predefine="predefineColors"/>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="边距" name="padding">
        <el-form-item label="内侧边距">
          <el-input v-model="styleModel.padding" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="上内边距">
          <el-input v-model="styleModel.paddingTop" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="左内边距">
          <el-input v-model="styleModel.paddingLeft" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="右内边距">
          <el-input v-model="styleModel.paddingRight" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="底内边距">
          <el-input v-model="styleModel.paddingBottom" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="外侧边距">
          <el-input v-model="styleModel.padding" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="上外边距">
          <el-input v-model="styleModel.marginTop" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="左外边距">
          <el-input v-model="styleModel.marginLeft" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="右外边距">
          <el-input v-model="styleModel.marginRight" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="底外边距">
          <el-input v-model="styleModel.marginBottom" placeholder=""></el-input>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="边框" name="border">
        <el-form-item label="边框宽度">
          <el-input v-model="styleModel.borderWidth" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="上边宽度">
          <el-input v-model="styleModel.borderTopWidth" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="左边宽度">
          <el-input v-model="styleModel.borderLeftWidth" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="右边宽度">
          <el-input v-model="styleModel.borderRightWidth" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="底边宽度">
          <el-input v-model="styleModel.borderBottomWidth" placeholder=""></el-input>
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
        <el-form-item label="文字修饰">
          <el-select v-model="styleModel.textDecoration" placeholder="">
            <el-option v-for="item in textDecorationOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文字行高">
          <el-input v-model="styleModel.lineHeight" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="文本缩进">
          <el-input v-model="styleModel.textIndent" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="文字间距">
          <el-input v-model="styleModel.letterSpacing" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="字母间距">
          <el-input v-model="styleModel.wordSpacing" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="文字转换">
          <el-select v-model="styleModel.textTransform" placeholder="">
            <el-option v-for="item in textTransformOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="背景" name="background">
        <el-form-item label="背景颜色">
          <el-color-picker v-model="styleModel.backgroundColor" show-alpha :predefine="predefineColors"/>
        </el-form-item>
        <el-form-item label="背景图片">
          <el-input v-model="styleModel.backgroundImage" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="背景拉伸">
          <el-select v-model="styleModel.backgroundRepeat" placeholder="">
            <el-option v-for="item in backgroundRepeatOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="背景定位">
          <el-select v-model="styleModel.backgroundPosition" placeholder="">
            <el-option v-for="item in backgroundPositionOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="附加属性">
          <el-select v-model="styleModel.backgroundAttachment" placeholder="">
            <el-option v-for="item in backgroundAttachmentOptions" :key="item.value" :label="item.label" :value="item.value">
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
  computed: {
    ...mapGetters(['componentsStyles', 'currentComponent'])
  },
  created() {
    this.getStyles()
  },
  mounted() {
    if (this.currentComponent.componentId) {
      getBus().$on(
        this.currentComponent.componentId + '-style-' + 'save',
        this.save
      )
      this.lastComponent = this.currentComponent
    }
  },
  destroyed() {
    // 取消注册保存事件
    getBus().$off(
      this.currentComponent.componentId + '-style-' + 'save' + 'save'
    )
  },
  watch: {
    currentComponent: function() {
      if (
        this.lastComponent.componentId !== this.currentComponent.componentId
      ) {
        getBus().$off(this.lastComponent.componentId + '-style-' + 'save')
        getBus().$on(
          this.currentComponent.componentId + '-style-' + 'save',
          this.save
        )
        this.lastComponent = this.currentComponent
        this.getStyles()
      }
    }
  },
  data() {
    return {
      labelPosition: 'right',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      lastComponent: '',
      activeTab: 'heightWidth',
      styleModel: {
        color: '',
        backgroundColor: '',
        borderWidth: '',
        borderTopWidth: '',
        borderLeftWidth: '',
        borderRightWidth: '',
        borderBottomWidth: '',
        borderColor: '',
        borderTopColor: '',
        borderLeftColor: '',
        borderRightColor: '',
        borderBottomColor: '',
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
        lineHeight: '',
        textDecoration: '',
        textIndent: '',
        letterSpacing: '',
        wordSpacing: '',
        textTransform: '',
        clear: '',
        float: '',
        textAlign: '',
        verticalAlign: '',
        position: '',
        display: '',
        top: '',
        left: '',
        visibility: '',
        right: '',
        bottom: '',
        zIndex: '',
        backgroundImage: '',
        backgroundRepeat: '',
        backgroundPosition: '',
        backgroundAttachment: ''
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
      ],
      textDecorationOptions: [
        {
          value: 'none',
          label: 'none'
        },
        {
          value: 'underline',
          label: 'underline'
        },
        {
          value: 'overline',
          label: 'overline'
        },
        {
          value: 'underline overline',
          label: 'underline overline'
        },
        {
          value: 'line-through',
          label: 'line-through'
        },
        {
          value: 'blink',
          label: 'blink'
        }
      ],
      textTransformOptions: [
        {
          value: 'none',
          label: 'none'
        },
        {
          value: 'capitalize',
          label: 'capitalize'
        },
        {
          value: 'lowercase',
          label: 'lowercase'
        },
        {
          value: 'uppercase',
          label: 'uppercase'
        }
      ],
      clearOptions: [
        {
          value: 'none',
          label: 'none'
        },
        {
          value: 'left',
          label: 'left'
        },
        {
          value: 'right',
          label: 'right'
        },
        {
          value: 'both',
          label: 'both'
        }
      ],
      floatOptions: [
        {
          value: 'none',
          label: 'none'
        },
        {
          value: 'left',
          label: 'left'
        },
        {
          value: 'right',
          label: 'right'
        }
      ],
      textAlignOptions: [
        {
          value: 'left',
          label: 'left'
        },
        {
          value: 'right',
          label: 'right'
        },
        {
          value: 'center',
          label: 'center'
        },
        {
          value: 'justify',
          label: 'justify'
        }
      ],
      verticalAlignOptions: [
        {
          value: 'baseline',
          label: 'baseline'
        },
        {
          value: 'top',
          label: 'top'
        },
        {
          value: 'middle',
          label: 'middle'
        },
        {
          value: 'bottom',
          label: 'bottom'
        },
        {
          value: 'text-top',
          label: 'text-top'
        },
        {
          value: 'text-bottom',
          label: 'text-bottom'
        },
        {
          value: 'super',
          label: 'super'
        },
        {
          value: 'sub',
          label: 'sub'
        },
        {
          value: 'inherit',
          label: 'inherit'
        },
        {
          value: '30%',
          label: '30%'
        }
      ],
      positionOptions: [
        {
          value: 'static',
          label: 'static'
        },
        {
          value: 'relative',
          label: 'relative'
        },
        {
          value: 'absolute',
          label: 'absolute'
        },
        {
          value: 'fixed',
          label: 'fixed'
        }
      ],
      visibilityOptions: [
        {
          value: 'visible',
          label: 'visible'
        },
        {
          value: 'hidden',
          label: 'hidden'
        }
      ],
      displayOptions: [
        {
          value: 'none',
          label: 'none'
        },
        {
          value: 'block',
          label: 'block'
        },
        {
          value: 'inline',
          label: 'inline'
        },
        {
          value: 'inline-block',
          label: 'inline-block'
        },
        {
          value: 'list-item',
          label: 'list-item'
        },
        {
          value: 'run-in',
          label: 'run-in'
        },
        {
          value: 'table',
          label: 'table'
        },
        {
          value: 'table-row-group',
          label: 'table-row-group'
        },
        {
          value: 'table-header-group',
          label: 'table-header-group'
        },
        {
          value: 'table-footer-group',
          label: 'table-footer-group'
        },
        {
          value: 'table-row',
          label: 'table-row'
        },
        {
          value: 'table-column-group',
          label: 'table-column-group'
        },
        {
          value: 'table-column',
          label: 'table-column'
        },
        {
          value: 'table-cell',
          label: 'table-cell'
        },
        {
          value: 'table-caption',
          label: 'table-caption'
        }
      ],
      backgroundRepeatOptions: [
        {
          value: 'repeat',
          label: 'repeat'
        },
        {
          value: 'repeat-x',
          label: 'repeat-x'
        },
        {
          value: 'repeat-y',
          label: 'repeat-y'
        },
        {
          value: 'no-repeat',
          label: 'no-repeat'
        },
        {
          value: 'inherit',
          label: 'inherit'
        }
      ],
      backgroundPositionOptions: [
        {
          value: 'top left',
          label: 'top left'
        },
        {
          value: 'top center',
          label: 'top center'
        },
        {
          value: 'top right',
          label: 'top right'
        },
        {
          value: 'center left',
          label: 'center left'
        },
        {
          value: 'center center',
          label: 'center center'
        },
        {
          value: 'center right',
          label: 'center right'
        },
        {
          value: 'bottom left',
          label: 'bottom left'
        },
        {
          value: 'bottom center',
          label: 'bottom center'
        },
        {
          value: 'bottom right',
          label: 'bottom right'
        }
      ],
      backgroundAttachmentOptions: [
        {
          value: 'fixed',
          label: 'fixed'
        },
        {
          value: 'scroll',
          label: 'scroll'
        }
      ]
    }
  },
  methods: {
    // 保存当前组件设置的样式
    save() {
      const component = { componentId: this.currentComponent.componentId }
      component.styles = deepCopy(this.styleModel)
      this.$store.dispatch('setComponentStyles', component)
    },
    getStyles() {
      // 从store中获取当前组件的样式，若获取到则对styleModel赋值，若没有获取到则重置styleModel的所有属性值为初始值
      if (this.componentsStyles[this.currentComponent.componentId]) {
        this.styleModel = deepCopy(
          this.componentsStyles[this.currentComponent.componentId]
        )
      } else {
        this.restStyleModel(this.styleModel)
      }
    },
    // 重置styleModel的属性值为初始值
    restStyleModel(model) {
      for (const key in model) {
        model[key] = ''
      }
    }
  }
}
</script>
<style scoped>

</style>
