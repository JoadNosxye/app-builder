<template>
    <el-row>
      <el-col :span="4">
        <slot name="orgTree">orgTree</slot>
      </el-col>
      <el-col :span="20">
        <el-row>
          <el-col :span="4">
            <slot name="control">control</slot>
          </el-col>
          <el-col :span="10" :offset="10">
            <slot name="search">search</slot>
          </el-col>
        </el-row>
        <el-row>
          <slot name="table">table</slot>
        </el-row>
        <el-row>
          <el-col>
            <slot name="page">page</slot>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
</template>

