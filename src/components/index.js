import srkjLayout from './srkj/design/srkjLayout'
import srkjLayoutConfig from './srkj/design/srkjLayoutConfig'
import srkjButton from './srkj/design/srkjButton'
import srkjButtonConfig from './srkj/design/srkjButtonConfig'
import testButton from './srkj/run/testButton'
import styleEditor from './srkj/design/styleEditor'
import styleUnit from './srkj/design/styleUnit'

export default (Vue) => {
  Vue.component('srkj-layout', srkjLayout)
  Vue.component('srkj-layout-config', srkjLayoutConfig)
  Vue.component('srkj-button', srkjButton)
  Vue.component('srkj-button-config', srkjButtonConfig)
  Vue.component('style-editor', styleEditor)
  Vue.component('style-unit', styleUnit)
  Vue.component('test-button', testButton)
}

