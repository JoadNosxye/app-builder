<template>
  <div id="panel">
    <input id="commitBtn" type="button" value="html" @click="getHtml">
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getHtml() {
      const element = document.getElementById('preview-main')
      const html = '<template><div>' + element.innerHTML + '</div></template>'
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


