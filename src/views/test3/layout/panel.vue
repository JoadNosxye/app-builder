<template>
  <div id="panel">
    <input id="commitBtn" type="button" value="html" @click="getHtml">
    <input id="commitBtn" type="button" value="template" @click="getTemplate">
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getHtml() {
      const element = document.getElementById('preview-main')
      // const html = '<template><div>' + element.innerHTML + '</div></template>'
      const html = element.innerHTML
      console.log(html)
    },
    getTemplate() {
      const element = document.getElementById('vue-template')
      const html = element.innerHTML
      console.log(html)
    }
  }
}
</script>
<style scoped>
#commitBtn {
  float: right;
}
</style>


