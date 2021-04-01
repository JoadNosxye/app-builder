<template>
  <div id="preview-main" @drop="drop" @dragover="allowDrop" @dragstart="drag">
    <!-- <component id='preview-main-components' :is="item.component" :text="item.text" v-for="item in components" :key="item.id"></component> -->
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
import { FreeLayout, Component2, Component3 } from '@/views/test3/components'
export default {
  components: {
    FreeLayout,
    Component2,
    Component3
  },
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
    // 观察currentOrg是否变化，若变化，则根据最新的currentOrg获取用户
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
      // 源组件ID
      const id = ev.dataTransfer.getData('components')
      const rowId = ev.target.getAttribute('data-row-id')
      const colId = ev.target.getAttribute('data-col-id')

      // if (id === 'a') {
      //   this.$store.dispatch('addComponents', {
      //     component: 'freeLayout',
      //     items: this.components
      //   })
      // }

      if (id === 'b') {
        this.$store.dispatch('addComponents', {
          rowId: rowId,
          colId: colId,
          component: 'component2',
          text: '222'
        })
      }

      if (id === 'c') {
        this.$store.dispatch('addComponents', {
          rowId: rowId,
          colId: colId,
          component: 'component3',
          text: 'danger'
        })
      }

      // const element = document.getElementById(id).cloneNode(true)

      // ev.target.appendChild(element)
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







