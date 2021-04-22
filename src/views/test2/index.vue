<template>
  <layout>
    <div slot="a1"><sr-button :attributes='attributes1' @click="a"/></div>
    <div slot="a2"><sr-button :attributes='attributes2' @click="b"/></div>
    <div slot="b"><sr-table :datas='data1'></sr-table></div>
    <div slot="c">ccccccc</div>
  </layout>
</template>
<script>
import layout from './layout'
import test from './test'
export default {
  ...test,
  components: {
    layout
  }

}
</script>


