<template>
  <div class="home">
    <div class="container">
      <el-container style="height: 500px">
        <el-aside
          class="home-aside"
          width="200px"
          style="background-color: rgb(238, 241, 246)"
        >
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-message"></i>领航员</template
              >
              <el-menu-item-group>
                <template slot="title">组 1</template>
                <el-menu-item index="1-1">选项 1</el-menu-item>
                <el-menu-item index="1-2">选项 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="1-3">选项 3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项 4</template>
                <el-menu-item index="1-4-1">选项 4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container class="guest-content">
          <el-header
            class="guest-nav"
            style="text-align: right; font-size: 12px"
          >
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>背影</el-dropdown-item>
                <el-dropdown-item>添加</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="text" @click="dialogFormVisible = true"
              >修改</el-button
            >

            <el-dialog
              title="Shipping address"
              :visible.sync="dialogFormVisible"
              type="number"
            >
              <el-form :model="form" type="number">
                <el-form-item
                  label="Name"
                  :label-width="formLabelWidth"
                  type="number"
                >
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Id Number" :label-width="formLabelWidth">
                  <el-input v-model="form.idBox1" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Stat At" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.statBox1"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="End At" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.endBox1"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="Telephone" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.telephoneBox1"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                  >Confirm</el-button
                >
              </span>
            </el-dialog>
          </el-header>

          <el-main>
            <div class="demo-input-size">
              <el-input
                size="small"
                placeholder="输入你的名字"
                type="text"
                v-model="user.name"
                clearable="true"
              >
              </el-input>
              <el-input
                size="small"
                placeholder="输入你的 ID"
                type="number"
                v-model="user.idNumber"
                clearable="true"
              >
              </el-input>
              <div class="block">
                <el-date-picker
                  size="small"
                  v-model="user.datetime"
                  type="datetimerange"
                  range-separator="到"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  clearable="true"
                >
                </el-date-picker>
              </div>
              <el-input
                size="small"
                placeholder="手机号"
                type="number"
                v-model="user.telephone"
                clearable="true"
              >
              </el-input>
              <i class="el-icon-edit" @click="edit" color="#1e90ff">编辑</i>
              <i class="el-icon-delete" @click="remove" color="#ff0000">删除</i>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      user: {
        name: "",
        idNumber: "",
        telephone: "",
        datetime: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10),
        ],
      },
      dialogFormVisible: false,
      form: {
        name: "",
        idbox1: "",
        statBox1: "",
        endBox1: "",
        telephoneBox1: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    addGuest() {
      console.log("guest added");
      const div = document.createElement("div");
      div.innerHTML = `<el-input
                size="small"
                placeholder="Please input your name"
                type="text"
                v-model="user.name"
                clearable="true"
              >
              </el-input>
              <el-input
                size="small"
                placeholder="Please input yuour ID"
                type="number"
                v-model="user.idNumber"
                clearable="true"
              >
              </el-input>
              <div class="block">
                <el-date-picker
                  size="small"
                  v-model="user.datetime"
                  type="datetimerange"
                  range-separator="To"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  clearable="true"
                >
                </el-date-picker>
              </div>
              <el-input
                size="small"
                placeholder="Telephone number"
                accept="number"
                v-model="user.telephone"
                clearable="true"
              >
              </el-input>
              <i class="el-icon-edit" @click="edit" color="#1e90ff">Edit</i>
              <i class="el-icon-delete" @click="remove" color="#ff0000"
                >Delete</i
              >`;
      // el-main.insertBefore(div, el-main.children[0]);
    },

    edit() {},

    remove() {},
  },
  editGuest() {},
};
</script>

<style lang="scss">
@import "./src/assets/scss/vendors/home.scss";
</style>
