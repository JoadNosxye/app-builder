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


