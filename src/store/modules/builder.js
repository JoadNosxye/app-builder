
const builder = {
  state: {
    components: []
  },
  mutations: {
    ADD_COMPONENTS: (state, component) => {
      state.components.push(component)
    }
  },
  actions: {
    addComponents: ({ commit }, component) => {
      commit('ADD_COMPONENTS', component)
    }
  }
}

export default builder
