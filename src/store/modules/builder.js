const builder = {
  state: {
    currentComponent: '',
    componentsParams: {},
    // params: {
    //   componentId: {
    //     name: 'abc'
    //   }
    // },
    componentsAttributes: {},
    // attributes: {
    //   componentId: {
    //     name: 'abc'
    //   }
    // },
    componentsLayouts: {}
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
      const componentId = component.componentId
      const componentName = component.componentName
      const params = component.params
      const attributes = component.attributes
      // 若该布局不存在，则创建一个布局对象
      if (!state.componentsLayouts[rowId]) {
        state.componentsLayouts[rowId] = {}
      }
      // 若该列不存在，则在布局中创建该列
      if (!state.componentsLayouts[rowId][colId]) {
        state.componentsLayouts[rowId][colId] = []
      }
      // 将放置到该列的组件和参数存储到state的layouts中
      const ele = {}
      ele.componentName = componentName
      ele.componentId = componentId
      state.componentsLayouts[rowId][colId].push(ele)

      // 存储组件的参数
      state.componentsParams[componentId] = params

      // 存储组件的属性
      state.componentsAttributes[componentId] = attributes
    },
    SET_CURRENT_COMPONENT: state => {}
  },
  actions: {
    addComponents: ({ commit }, component) => {
      commit('ADD_COMPONENTS', component)
    }
  }
}

export default builder
