<template>
  <div id="preview-main" @drop="drop" @dragover="allowDrop" @dragstart="drag">
    <el-row>
      <el-col :span="24" data-row-id="preview-main-row" data-col-id="preview-main-col">
        <component :is="item.component" v-for="item in items" :key="item.id"></component>
        freelayout : {{items?items.length:0}}

        <div v-for="item in items" :key="item.id">
          aaa {{item.component}} bbb
        </div>
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
      items: []
    }
  },
  created() {
    //
  },
  watch: {
    'storeState.builder.time': function() {
      if (this.components['preview-main-row']) {
        this.items = this.components['preview-main-row']['preview-main-col']
      }
    }
  },
  // methods: {
  //   allowDrop(ev) {
  //     ev.preventDefault()
  //   },
  //   drop(ev) {
  //     ev.preventDefault()
  //     // 源组件ID
  //     const id = ev.dataTransfer.getData('components')
  //     const rowId = ev.target.getAttribute('data-row-id')
  //     const colId = ev.target.getAttribute('data-col-id')

  //     // if (id === 'a') {
  //     //   this.$store.dispatch('addComponents', {
  //     //     component: 'freeLayout',
  //     //     items: this.components
  //     //   })
  //     // }

  //     if (id === 'b') {
  //       this.$store.dispatch('addComponents', {
  //         rowId: rowId,
  //         colId: colId,
  //         component: 'component2',
  //         text: '222'
  //       })
  //     }

  //     if (id === 'c') {
  //       this.$store.dispatch('addComponents', {
  //         rowId: rowId,
  //         colId: colId,
  //         component: 'component3',
  //         text: 'danger'
  //       })
  //     }

  //     // const element = document.getElementById(id).cloneNode(true)

  //     // ev.target.appendChild(element)
  //   },
  //   drag(ev) {
  //     ev.dataTransfer.setData('components', ev.target.id)
  //   }
  // }
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      ev.preventDefault()
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







