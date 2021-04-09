<template>
  <layout>
    <div slot="a1"><test-button :attributes='attributes1' @click="a"/></div>
    <div slot="a2"><test-button :attributes='attributes2' @click="b"/></div>
    <div slot="b">bbbbbbb</div>
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


