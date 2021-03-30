<template>
  <div id="panel">
    <input id="commitBtn" type="button" value="提起html" @click="getHtml">
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getHtml() {
      const element = document.getElementById('div2')
      console.log(element.innerHTML)
    }
  }
}
</script>
<style scoped>
#commitBtn {
  float: right;
}
</style>


