<template>
  <div>
    <test-button :attributes='attributes'>a</test-button>
    <test-button :attributes='attributes' @click="xixi">b</test-button>
  </div>
</template>
<script>
import test from './test'
export default {
  ...test
}
</script>

<style scoped>

</style>