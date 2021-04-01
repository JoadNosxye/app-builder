import freeLayout from './test/freeLayout.vue'
import component2 from './test/component2.vue'
import component3 from './test/component3.vue'

export default (Vue) => {
  Vue.component('freeLayout', freeLayout)
  Vue.component('component2', component2)
  Vue.component('component3', component3)
}
