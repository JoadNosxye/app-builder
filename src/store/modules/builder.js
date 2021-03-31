const builder = {
  state: {
    time: '',
    components: {}
    // components: {
    //   row1: {
    //     col1: [{ component: '1' }],
    //     col2: [{ component: '2' }]
    //   }
    // }
  },
  mutations: {
    ADD_COMPONENTS: (state, { rowId, colId, component }) => {
      if (!state.components[rowId]) {
        state.components[rowId] = {}
      }
      if (!state.components[rowId][colId]) {
        state.components[rowId][colId] = []
      }
      const ele = {}
      ele.component = component
      state.components[rowId][colId].push(ele)
      state.time = new Date().toLocaleTimeString()
    }
  },
  actions: {
    addComponents: ({ commit }, component) => {
      commit('ADD_COMPONENTS', component)
    }
  }
}

export default builder
