<template>
  <el-table border stripe highlight-current-row :data="tableData" tooltip-effect="dark" style="width: 100%" max-height="600" @selection-change="handleSelectionChange" @click.stop="openAttributesPanel">
    <el-table-column prop="date" label="日期" width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['params'],
  computed: {
    ...mapGetters([
      'currentComponent',
      'componentsParams',
      'componentsAttributes',
      'componentsStyles',
      'componentsDatas',
      'time'
    ]),
    watchObj() {
      return this.time
    }
  },
  created() {
    this.refresh()
  },
  watch: {
    // 观察store中是否有任何组件的属性发生变化，若有，则从store中取出自己的属性，并进行设置
    watchObj: function() {
      this.refresh()
    }
  },
  data() {
    return {
      tableData: [],
      style: '',
      // 按钮组件的属性默认值
      attributes: {
        // name: '按钮',
        // type: 'primary',
        // size: 'medium',
        // plain: false
      }
      // tableData: [
      //   {
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   },
      //   {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   },
      //   {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }
      // ]
    }
  },
  methods: {
    refresh() {
      this.getAttributes()
      this.getStyle()
      this.getData()
    },
    getAttributes() {
      this.attributes = this.componentsAttributes[this.params.componentId]
    },
    getStyle() {
      this.style = this.componentsStyles[this.params.componentId]
    },
    getData() {
      this.tableData = this.componentsDatas[this.params.componentId]['tableData']
    },
    // 打开属性配置面板
    openAttributesPanel(ev) {
      // 阻止点击事件向父级layout元素冒泡传递事件
      // ev.stopPropagation()
      if (this.currentComponent.componentId !== this.params.componentId) {
        this.$store.dispatch('setCurrentComponent', {
          componentId: this.params.componentId,
          componentName: this.params.componentName
        })
      }
    },
    handleSelectionChange() {}
  }
}
</script>







