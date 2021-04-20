<template>
  <el-row>
    <el-col :span=24>
      <div id="cp2" class="input-group colorpicker-component" title="Using input value">
        <input type="text" class="form-control input-lg" value="#DD0F20" />
        <span class="input-group-addon">
          <i></i>
        </span>
      </div>
    </el-col>
  </el-row>

</template>
<script>
export default {
  mounted() {
    $('#cp2').colorpicker()
  }
}
</script>
<style scoped>

</style>








