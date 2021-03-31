const getters = {
  sidebar: state => state.app.sidebar,
  username: state => state.user.username,
  password: state => state.user.password,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  currentRole: state => state.user.currentRole,
  currentOrg: state => state.user.currentOrg,
  permissions: state => state.user.permissions,
  components: state => state.builder.components
}
export default getters
