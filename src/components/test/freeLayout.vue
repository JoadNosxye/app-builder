<template>
  <div @drop="drop" @dragover="allowDrop" @dragstart="drag" class="layout">
    <el-row>
      <el-col :span="col.span" :data-row-id="params.rowName" :data-col-id="col.id" v-for="col in cols" :key="col.id">
        <component :is="item.component" :params="item.params" v-for="item in col.items" :key="item.id"></component>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Store from '@/store'
import { mapGetters } from 'vuex'
export default {
  props: ['params'],
  computed: {
    ...mapGetters(['components'])
  },
  data() {
    return {
      storeState: Store.state,
      cols: [],
      watchObj: ''
    }
  },
  created() {
    console.log('rowname:' + this.params.rowName + ' created')
    this.getComponents()
  },
  watch: {
    watchObj: function() {
      if (this.components[this.params.rowName]) {
        console.log('rowname:' + this.params.rowName + ' watch')
        this.getComponents()
      }
    }
  },
  methods: {
    getComponents() {
      console.log('rowname:' + this.params.rowName + ' methods')
      const rowName = this.params.rowName
      const colNum = this.params.colNum
      const spans = this.params.spans
      const cols = []
      const spanArray = spans.split(',')
      for (let i = 0; i < colNum; i++) {
        const col = {}
        col.id = i
        col.num = colNum
        col.rowName = rowName
        col.span = Number(spanArray[i])
        col.items = this.components[rowName] ? this.components[rowName][i] : []
        cols.push(col)
      }
      this.cols = cols
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      const name = ev.dataTransfer.getData('componentName')
      const params = JSON.parse(ev.dataTransfer.getData('params'))
      const rowId = ev.target.getAttribute('data-row-id')
      const colId = ev.target.getAttribute('data-col-id')

      this.$store.dispatch('addComponents', {
        rowId: rowId,
        colId: colId,
        component: name,
        params: params
      })

      this.watchObj = new Date().toLocaleTimeString()
    },
    drag(ev) {
      ev.dataTransfer.setData('components', ev.target.id)
    }
  }
}
</script>
<style scoped>
.el-row {
  height: 50%;
}
.el-col {
  height: 100%;
  border: 1px dashed red;
}
</style>





