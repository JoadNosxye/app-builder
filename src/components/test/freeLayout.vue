<template>
  <div @drop="drop" @dragover="allowDrop" @dragstart="drag" class="layout">
    <el-row>
      <el-col :span="12" data-row-id="row1" data-col-id="col1">
        <component :is="item.component" v-for="item in col1Data" :key="item.id"></component>
        freelayout : {{col1Data?col1Data.length:0}}
      </el-col>
      <el-col :span="12" data-row-id="row1" data-col-id="col2">
        <component :is="item.component" v-for="item in col2Data" :key="item.id"></component>
        freelayout : {{col2Data?col2Data.length:0}}
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Store from '@/store'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['components'])
  },
  data() {
    return {
      storeState: Store.state,
      col1Data: [],
      col2Data: []
    }
  },
  created() {
    //
  },
  watch: {
    'storeState.builder.time': function() {
      if (this.components['row1']) {
        this.col1Data = this.components['row1']['col1']
        this.col2Data = this.components['row1']['col2']
      }
    }
  },
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      // 源组件ID
      // const id = ev.dataTransfer.getData("componentId");
      const name = ev.dataTransfer.getData('componentName')
      const rowId = ev.target.getAttribute('data-row-id')
      const colId = ev.target.getAttribute('data-col-id')

      this.$store.dispatch('addComponents', {
        rowId: rowId,
        colId: colId,
        component: name
      })
    },
    drag(ev) {
      ev.dataTransfer.setData('components', ev.target.id)
    }
  }
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





