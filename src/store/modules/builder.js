import { getCurrentTime } from '@/utils';

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

      // 给属性增加一个时间戳，每次属性变化时都需要更新该时间戳，以便组件可以watch这个时间戳，及时更新组件的属性设置
      attributes.timestamp = getCurrentTime()
      // 存储组件的属性
      state.componentsAttributes[componentId] = attributes
    },
    // 设置当前选择的组件
    SET_CURRENT_COMPONENT: (state, component) => {
      state.currentComponent = component
    },
    // 设置组件的属性
    SET_COMPONENT_ATTRIBUTES: (state, component) => {
      // 若该组件的属性不存在，则为该组件创建属性对象
      if (!state.componentsAttributes[component.componentId]) {
        state.componentsAttributes[component.componentId] = {}
      }
      // 将用户设置的属性存储到store中
      state.componentsAttributes[component.componentId] =
        component[component.componentId]
      // 给属性增加一个时间戳，每次属性变化时都需要更新该时间戳，以便组件可以watch这个时间戳，及时更新组件的属性设置
      state.componentsAttributes[
        component.componentId
      ].timestamp = getCurrentTime()
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
    }
  }
}

export default builder
