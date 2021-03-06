import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/', redirect: '/dashboard' },

  {
    path: '/dashboard',
    component: Layout,
    name: '产品特性',
    children: [{
      path: 'index',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '产品特性', icon: 'example' }
    }],
    permission: 'dashboard'
  },
  {
    path: '/user',
    component: Layout,
    name: '用户管理',
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'example' }
      }
    ],
    permission: 'user'
  },
  {
    path: '/role',
    component: Layout,
    name: '角色管理',
    children: [
      {
        path: 'index',
        name: 'role',
        component: () => import('@/views/role/index'),
        meta: { title: '角色管理', icon: 'example' }
      }
    ],
    permission: 'role'
  },
  // {
  //   path: '/project',
  //   component: Layout,
  //   name: '项目管理',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'role',
  //       component: () => import('@/views/role/index'),
  //       meta: { title: '项目管理', icon: 'example' }
  //     }
  //   ],
  //   permission: 'role'
  // },
  // {
  //   path: '/shop',
  //   component: Layout,
  //   name: '组件商店',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'role',
  //       component: () => import('@/views/role/index'),
  //       meta: { title: '组件商店', icon: 'example' }
  //     }
  //   ],
  //   permission: 'role'
  // },
  {
    path: '/test',
    component: Layout,
    name: '测试页面',
    meta: { title: '测试页面', icon: 'example' },
    children: [
      {
        path: 'test1',
        name: 'test1',
        component: () => import('@/views/test1/index'),
        meta: { title: '测试页面1', icon: 'example' }
      },
      {
        path: 'test2',
        name: 'test2',
        component: () => import('@/views/test2/index'),
        meta: { title: '测试页面2', icon: 'example' }
      },
      {
        path: 'test3',
        name: 'test3',
        component: () => import('@/views/test3/index'),
        meta: { title: '测试页面3', icon: 'example' }
      },
      {
        path: 'test4',
        name: 'test4',
        component: () => import('@/views/test4/index'),
        meta: { title: '测试页面4', icon: 'example' }
      }
    ],
    permission: 'test'
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

