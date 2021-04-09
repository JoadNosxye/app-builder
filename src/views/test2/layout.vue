<template>
  <el-row>
    <el-col :span="8">
       <el-row>
         <el-col :span="12">
           <slot name="a1">a1</slot>
         </el-col>
         <el-col :span="12">
           <slot name="a2">a2</slot>
         </el-col>
       </el-row>
    </el-col>
    <el-col :span="8">
      <slot name="b">b</slot>
    </el-col>
    <el-col :span="8">
      <slot name="c">c</slot>
    </el-col>
  </el-row>
</template>

