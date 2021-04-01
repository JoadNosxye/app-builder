<template>
  <div id="preview-main">
  <!-- <div id="preview-main" @drop="drop" @dragover="allowDrop" @dragstart="drag"> -->
    <!-- <el-row>
      <el-col :span="24" data-row-id="preview-main-row" data-col-id="preview-main-col">
        <component :is="item.component" :params="item.params" v-for="item in items" :key="item.id"></component>
      </el-col>
    </el-row> -->
    <freeLayout :params='params'></freeLayout>
  </div>
</template>
<script>
import Store from '@/store'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['components']),
    params() {
      const params = {}
      params.rowName = 'preview-main-row'
      params.colNum = 1
      params.spans = '24'
      return params
    }
  },
  data() {
    return {
      storeState: Store.state,
      items: []
    }
  },
  created() {
    // this.$store.dispatch('addComponents', {
    //   rowId: 'preview-main-row',
    //   colId: 0,
    //   component: 'freeLayout'
    //   // params: JSON.parse(params)
    // })
  }
  // watch: {
  //   'storeState.builder.time': function() {
  //     if (this.components['preview-main-row']) {
  //       this.items = this.components['preview-main-row']['preview-main-col']
  //     }
  //   }
  // },
  // methods: {
  //   allowDrop(ev) {
  //     ev.preventDefault()
  //   },
  //   drop(ev) {
  //     ev.preventDefault()
  //     // 源组件ID
  //     // const id = ev.dataTransfer.getData("componentId");
  //     const name = ev.dataTransfer.getData('componentName')
  //     const params = ev.dataTransfer.getData('params')
  //     const rowId = ev.target.getAttribute('data-row-id')
  //     const colId = ev.target.getAttribute('data-col-id')

  //     this.$store.dispatch('addComponents', {
  //       rowId: rowId,
  //       colId: colId,
  //       component: name,
  //       params: JSON.parse(params)
  //     })
  //   },
  //   drag(ev) {
  //     ev.dataTransfer.setData('components', ev.target.id)
  //   }
  // }
}
</script>
<style scoped>
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
  border: 1px solid red;
}
.component {
  height: 100%;
}
</style>







