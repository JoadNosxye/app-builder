<template>
  <layout>
    <div slot="orgTree">
      <Org></Org>
    </div>
    <div slot="control">
      <el-button type="primary" size="medium" @click="openAddUserDialog">添加</el-button>
      <el-button type="primary" size="medium" @click="batchDeleteUsers">删除</el-button>
    </div>
    <div slot="search">
      <div style="line-height:60px">
        <el-input placeholder="请输入内容" v-model="searchInputModel" class="input-with-select">
          <el-select v-model="searchSelectModel" slot="prepend" placeholder="请选择">
            <el-option label="姓名" value="name"></el-option>
            <el-option label="邮箱" value="email"></el-option>
            <el-option label="用户名" value="username"></el-option>
            <el-option label="手机号" value="phone"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
    </div>
    <div slot="table">
      <el-table ref="multipleTable" border stripe highlight-current-row :data="users" tooltip-effect="dark" style="width: 100%" max-height="600" @selection-change="handleSelectionChange">
        <el-table-column type="selection" disabled/>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="phone" label="手机" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="org.name" label="所属机构" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="openEditUserDialog(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="page">
      <div class="block" style="padding-left:25%;padding-bottom:5%;position:fixed;bottom:0">
        <el-pagination @size-change="chanagePageSize" @current-change="changePageNum" :current-page="currentPage" :page-sizes="pageSizeList" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
        </el-pagination>
      </div>
      <!-- details dialog -->
    <el-dialog title="用户详情" :visible.sync="editDialogFormVisible" top="5vh">
      <div>
        <el-button type="primary" icon="el-icon-edit" plain @click="switchToEdit" style="float:right;margin-right:5%"></el-button>
      </div>
      <br/>
      <!-- <div style="margin:5%; height:600px; overflow:auto"> -->
      <div style="margin:5%;">
        <el-form :model="editUserModel" :rules="validateUserRules" ref="editUserForm">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="editUserModel.username" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="editUserModel.name" auto-complete="off" :disabled="editable"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth">
            <el-input v-model="editUserModel.phone" auto-complete="off" :disabled="editable"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="editUserModel.email" auto-complete="off" :disabled="editable"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- add dialog -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible" top="5vh">
      <br/>
      <div>
        <el-form :model="addUserModel" :rules="validateUserRules" ref="addUserForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop='username'>
            <el-input v-model="addUserModel.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop='password'>
            <el-input type="password" v-model="addUserModel.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop='name'>
            <el-input v-model="addUserModel.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth" prop='phone'>
            <el-input v-model="addUserModel.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
            <el-input v-model="addUserModel.email" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </layout>
</template>
<script>
import layout from './layout'
import Org from '@/components/Org'
import test from './test'
export default {
  ...test,
  components: {
    layout,
    Org
  }
}
</script>


