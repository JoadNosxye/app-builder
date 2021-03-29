// import { _getUserListByOrgId } from '@/api/org'
// import { _deleteUser, _editUser, _addUser, _deleteUserList } from '@/api/user'
// import { deepCopy, showMsg, showConfirmMsg, resetForm } from '@/utils/index'
// import { mapGetters } from 'vuex'
import Store from '@/store'
export default {
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (new RegExp('^\\w+$').test(value)) {
    //     callback()
    //   } else {
    //     callback(new Error('用户名只能包含字母数字和下划线'))
    //   }
    // }

    // const validatePassword = (rule, value, callback) => {
    //   if (new RegExp('^\\w+$').test(value)) {
    //     callback()
    //   } else {
    //     callback(new Error('密码只能包含字母数字和下划线'))
    //   }
    // }

    // const validateName = (rule, value, callback) => {
    //   if (new RegExp('^[\u4e00-\u9fa5]*$').test(value)) {
    //     callback()
    //   } else {
    //     callback(new Error('姓名只能包含中文'))
    //   }
    // }

    // const validatePhone = (rule, value, callback) => {
    //   if (
    //     new RegExp(
    //       '^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\\d{8}$'
    //     ).test(value)
    //   ) {
    //     callback()
    //   } else {
    //     callback(new Error('请输入正确的手机号'))
    //   }
    // }

    // const validateEmail = (rule, value, callback) => {
    //   if (
    //     new RegExp('^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$').test(
    //       value
    //     )
    //   ) {
    //     callback()
    //   } else {
    //     callback(new Error('请输入正确的邮箱'))
    //   }
    // }

    return {
      storeState: Store.state,
      users: [],
      multipleSelection: [],
      currentPage: 1,
      pageSizeList: [10, 30, 50],
      pageSize: 10,
      totalRecord: 0,
      editDialogFormVisible: false,
      addDialogFormVisible: false,
      editUserModel: {},
      addUserModel: {},
      searchInputModel: '',
      searchSelectModel: 'name',
      formLabelWidth: '70px',
      editable: true,
      batchDeleteUserList: [],
      validateUserRules: {
        // username: [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     validator: validateUsername
        //   }
        // ],
        // password: [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     validator: validatePassword
        //   },
        //   {
        //     min: 3,
        //     max: 6,
        //     message: '密码长度在 3 到 6 个字符',
        //     trigger: 'blur'
        //   }
        // ],
        // name: [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     validator: validateName
        //   }
        // ],
        // orgId: [
        //   {
        //     required: true,
        //     trigger: 'blur'
        //   }
        // ],
        // phone: [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     validator: validatePhone
        //   }
        // ],
        // email: [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     validator: validateEmail
        //   }
        // ]
      }
    }
  },
  computed: {
    // ...mapGetters(['currentOrg'])
  },
  created() {
    // this.getUserList()
  },
  watch: {
    // 观察currentOrg是否变化，若变化，则根据最新的currentOrg获取用户
    // 'storeState.user.currentOrg': function() {
    //   this.getUserList()
    // }
  },
  methods: {
    getUserList() {
    },
    switchToEdit() {
    },
    editUser() {
    },
    deleteUser(row) {
    },
    addUser() {
    },
    openAddUserDialog() {
    },
    openEditUserDialog(row) {
    },
    handleSelectionChange(userList) {
    },
    changePageNum(pageNum) {
    },
    chanagePageSize(pageSize) {
    },
    batchDeleteUsers() {
    },
    search() {
    }
  }
}
