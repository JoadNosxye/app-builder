const builder = {
  state: {
    components: {}
    // components: {
    //   row1: {
    //     col1: [{ component: '1' }],
    //     col2: [{ component: '2' }]
    //   }
    // }
  },
  mutations: {
    // 添加组件
    ADD_COMPONENTS: (state, component) => {
      const rowId = component.rowId
      const colId = component.colId
      const componentName = component.componentName
      const params = component.params
      // 若该布局不存在，则创建一个布局对象
      if (!state.components[rowId]) {
        state.components[rowId] = {}
      }
      // 若该列不存在，则在布局中创建该列
      if (!state.components[rowId][colId]) {
        state.components[rowId][colId] = []
      }
      // 将放置到该列的组件和参数存储到state中
      const ele = {}
      ele.component = componentName
      ele.params = params

      state.components[rowId][colId].push(ele)
    }
  },
  actions: {
    addComponents: ({ commit }, component) => {
      commit('ADD_COMPONENTS', component)
    }
  }
}

export default builder
