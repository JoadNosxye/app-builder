import srkjLayout from './srkj/srkjLayout'
import srkjLayoutConfig from './srkj/srkjLayoutConfig'
import srkjButton from './srkj/srkjButton'
import srkjButtonConfig from './srkj/srkjButtonConfig'
import testButton from './srkj/testButton'

export default (Vue) => {
  Vue.component('srkj-layout', srkjLayout)
  Vue.component('srkj-layout-config', srkjLayoutConfig)
  Vue.component('srkj-button', srkjButton)
  Vue.component('srkj-button-config', srkjButtonConfig)
  Vue.component('test-button', testButton)
}
