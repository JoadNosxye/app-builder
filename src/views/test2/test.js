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
      },
      data1: {
        tableData: [
          {
            date: '2016-05-02',
            name: 'aa',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: 'a',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '123',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: 'da',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
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
