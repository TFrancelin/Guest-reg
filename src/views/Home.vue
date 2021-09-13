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
              >添加客人</el-button
            >

            <el-dialog title="" :visible.sync="dialogFormVisible">
              <h2 class="dialog_header">请添加你的信息</h2>
              <el-form :model="form">
                <el-form-item label="名字" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.id_number"
                    autocomplete="on"
                  ></el-input>
                </el-form-item>
                <div class="block">
                  <div class="block1">
                    <span class="demonstration">开始时间</span>
                    <el-date-picker
                      v-model="date_time1"
                      type="datetime"
                      placeholder="Select date and time"
                    >
                    </el-date-picker>
                  </div>
                  <div class="block2">
                    <span class="demonstration">结束时间</span>
                    <el-date-picker
                      v-model="date_time2"
                      type="datetime"
                      placeholder="Select date and time"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.telephone"
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
            <div class="guests">
              <el-table :data="users" style="width: 100%">
                <el-table-column prop="name" label="名字"> </el-table-column>
                <el-table-column fixed prop="id_number" label="身份证号">
                </el-table-column>
                <el-table-column prop="startAt" label="开始日期">
                </el-table-column>
                <el-table-column prop="endAt" label="结束日期">
                </el-table-column>
                <el-table-column prop="telephone" label="手机号">
                </el-table-column>
                <!-- <el-table-column prop="zip" label="Zip"> </el-table-column> -->
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleClick(scope.row.id)"
                      type="text"
                      size="small"
                      >修改</el-button
                    >
                    <el-button type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      users: [],
      current: "",
      size: "",
      dialogFormVisible: false,
      form: {
        name: "",
        id_number: "",
        date_time1: "",
        date_time2: "",
        telephone: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      id: "",
      checkInRecord: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "Today",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "Yesterday",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "A week ago",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },

  async created() {
    const axios = require("axios");
    let that = this;
    axios
      .post("http://60.205.247.119:8080/visit-sys/visitor/checkIn/save", {
        checkInRecord: this.checkInRecord,
        id: this.id,
        identification: this.form.id_number,
        visitorName: this.form.name,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://60.205.247.119:8080/visit-sys/visitor/list", {
        params: {},
      })
      .then(function (response) {
        console.log(response.data.data);
        if (response.data.code == 10001) {
          that.users = that.users.concat(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  },

  methods: {
    addGuest() {},
  },
};
</script>

<style lang="scss">
@import "./src/assets/scss/vendors/home.scss";
</style>
