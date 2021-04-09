export default {
  data() {
    return {
      attributes1: {
        name: '按钮1',
        type: 'danger',
        size: 'medium',
        plain: false
      },
      attributes2: {
        name: '按钮2',
        type: 'info',
        size: 'mini',
        plain: true
      }
    }
  },
  methods: {
    a() {
      alert('a')
    },
    b() {
      alert('b')
    }
  }
}
