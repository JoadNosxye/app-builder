<template>
  <div>
    <div id="123">
      <p>aaa</p>
    </div>
    <el-row :class="a" >
    <!-- <el-row :class="a" :style="b"> -->
      <el-col :span="24" class="col">bbb</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      a: 'row1 row2',
      b: 'border:1px solid  black'
    }
  }
}
</script>


<style scoped>
.row1 {
  background-color: brown;
  border: 1px solid red;
}
.row2 {
  border: 1px solid yellow;
}
.col {
  background-color: white;
}
</style>




