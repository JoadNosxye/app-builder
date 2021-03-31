import Cookies from 'js-cookie'

const builder = {
  state: {
    items: []
  },
  mutations: {
    ADD_ITEM: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: {
    addItem: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default builder
