import srkjLayout from './test/srkjLayout'
import srkjLayoutConfig from './test/srkjLayoutConfig'
import srkjButton from './test/srkjButton'
import srkjButtonConfig from './test/srkjButtonConfig'

export default (Vue) => {
  Vue.component('srkj-layout', srkjLayout)
  Vue.component('srkj-layout-config', srkjLayoutConfig)
  Vue.component('srkj-button', srkjButton)
  Vue.component('srkj-button-config', srkjButtonConfig)
}
