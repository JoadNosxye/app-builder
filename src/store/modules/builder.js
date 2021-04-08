import { getCurrentTime } from '@/utils'

const builder = {
  state: {
    time: {},
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
      // params.rowId = rowId
      // params.colId = colId
      const attributes = component.attributes
      // 若该布局不存在，则创建一个布局对象
      if (!state.componentsLayouts[rowId]) {
        state.componentsLayouts[rowId] = {}
      }

      if (componentId && componentName) {
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

        // 属性发生变化时，更新state.time，以便组件watch，及时更新组件的属性
        state.time = getCurrentTime()
      }
    },
    // 设置当前选择的组件
    SET_CURRENT_COMPONENT: (state, component) => {
      state.currentComponent = component
    },
    // 设置组件的属性
    SET_COMPONENT_ATTRIBUTES: (state, component) => {
      const componentId = component.componentId
      // 将用户设置的属性存储到store中
      state.componentsAttributes[componentId] = component[componentId]
      // 属性发生变化时，更新state.time，以便组件watch，及时更新组件的属性
      state.time = getCurrentTime()
    },
    // 删除组件
    DELETE_COMPONENT: (state, componentId) => {
      const rowId = state.componentsParams[componentId].rowId
      const colId = state.componentsParams[componentId].colId
      const components = state.componentsLayouts[rowId][colId]

      // 删除componentsLayouts中对应的该组件数据
      let pos = -1
      for (let index = 0; index < components.length; index++) {
        const element = components[index]
        if (element.componentId === componentId) {
          pos = index
          break
        }
      }
      if (pos === -1) {
        console.log('在state.componentsLayouts中没有找到要删除的元素')
        return
      }
      components.splice(pos, 1)

      // 删除该组件的属性数据
      delete state.componentsAttributes[componentId]
      // 删除该组件的参数数据
      delete state.componentsParams[componentId]

      // 删除组件时，更新state.time，以便布局组件watch，及时更新布局中的组件
      state.time = getCurrentTime()
    },
    MOVE_COMPONENT: (state, componentId) => {
      const oldPosition = state.componentsParams[componentId]
      const components =
        state.componentsLayouts[oldPosition.rowId][oldPosition.colId]
      // 删除componentsLayouts中对应的该组件数据
      let pos = -1
      for (let index = 0; index < components.length; index++) {
        const element = components[index]
        if (element.componentId === componentId) {
          pos = index
          break
        }
      }
      if (pos === -1) {
        console.log('在state.componentsLayouts中没有找到要删除的元素')
        return
      }
      components.splice(pos, 1)
      // 移动组件时，更新state.time，以便布局组件watch，及时更新布局中的组件
      state.time = getCurrentTime()
    }
  },
  actions: {
    addComponents: ({ commit }, component) => {
      commit('ADD_COMPONENTS', component)
    },
    setCurrentComponent: ({ commit }, component) => {
      commit('SET_CURRENT_COMPONENT', component)
    },
    setComponentAttributes: ({ commit }, component) => {
      commit('SET_COMPONENT_ATTRIBUTES', component)
    },
    deleteComponent: ({ commit }, componentId) => {
      // 如果删除的是布局组件，需要将布局中的所有组件全部删除
      // 如果删除的是其他组件，则只删除该组件相关数据
      commit('DELETE_COMPONENT', componentId)
    },
    moveComponent: ({ commit }, componentId) => {
      commit('MOVE_COMPONENT', componentId)
    }
  }
}

export default builder
