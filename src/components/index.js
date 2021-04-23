import srkjLayout from './srkj/design/srkjLayout'
import srkjLayoutConfig from './srkj/design/srkjLayoutConfig'
import srkjButton from './srkj/design/srkjButton'
import srkjButtonConfig from './srkj/design/srkjButtonConfig'

import styleEditor from './srkj/design/styleEditor'
import paramEditor from './srkj/design/paramEditor'
import srkjTable from './srkj/design/srkjTable'
import srkjTableConfig from './srkj/design/srkjTableConfig'
// import styleUnit from './srkj/design/styleUnit'
import srButton from './srkj/run/srButton'
import srTable from './srkj/run/srTable'

export default (Vue) => {
  Vue.component('srkj-layout', srkjLayout)
  Vue.component('srkj-layout-config', srkjLayoutConfig)
  Vue.component('srkj-button', srkjButton)
  Vue.component('srkj-button-config', srkjButtonConfig)
  Vue.component('style-editor', styleEditor)
  Vue.component('param-editor', paramEditor)
  Vue.component('srkj-table', srkjTable)
  Vue.component('srkj-table-config', srkjTableConfig)
  // Vue.component('style-unit', styleUnit)
  Vue.component('sr-button', srButton)
  Vue.component('sr-table', srTable)
}

