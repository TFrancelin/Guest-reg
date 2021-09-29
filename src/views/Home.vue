<template>
  <div class="home">
    <div class="container">
      <el-container style="height: 500px">
        <el-aside
          class="home-aside"
          width="200px"
          style="background-color: rgb(238, 241, 246)"
        >
          <!-- Drop-menu -->
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-message"></i>领航员</template
              >
              <el-menu-item-group>
                <el-menu-item index="1-1">选项 1</el-menu-item>
                <el-menu-item index="1-2">选项 2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container class="guest-content">
          <el-header
            class="guest-nav"
            style="text-align: right; font-size: 12px"
          >
         
           
            
               <el-input
                   class="search_bar"
                   placeholder="搜索信息"
                    v-model="input"
                   clearable>
              </el-input>
                   <!-- Drop-down options-->

               <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>背影</el-dropdown-item>
                <el-dropdown-item>添加</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <!-- Add Guest Button -->
            <el-button type="text" @click="dialogFormVisible = true"
              >添加客人</el-button
            >
            <!-- DialogBox with form in where to fill each user information -->
            <el-dialog title="" :visible.sync="dialogFormVisible">
              <h2 class="dialog_header" align="center">请添加你的信息</h2>
              <el-form :model="form">
                <el-form-item label="名字" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.visitorName"
                    autocomplete="on"
                    clearable="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.identification"
                    autocomplete="on"
                    clearable="true"
                  ></el-input>
                </el-form-item>

                <div class="datepicker">
                  <el-form-item
                    class="datetime"
                    label="开始时间"
                    :label-width="formLabelWidth"
                  >
                    <el-date-picker
                      v-model="form.startAt"
                      type="datetime"
                      placeholder="选择日期和时间"
                      clearable="true"
                    >
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item
                    class="datetime"
                    label="结束时间"
                    :label-width="formLabelWidth"
                  >
                    <el-date-picker
                      v-model="form.endAt"
                      type="datetime"
                      placeholder="选择日期和时间"
                      clearable="true"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>

                <el-form-item label="手机号码" :label-width="formLabelWidth">
                  <el-input
                    v-model.number="form.mobile"
                    autocomplete="off"
                    type="number"
                    clearable="true"
                  ></el-input>
                </el-form-item>
              </el-form>

              <!-- Cancel and confirm buttons at the dialogBox footer -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="add_guest(form)"
                  >确认</el-button
                >
              </span>
            </el-dialog>
          </el-header>

          <!-- table with users info per row, and each row with edit and delete buttons -->
          <el-main>
            <div class="demo-input-size">
              <el-table :data="users" style="width: 100%">
                <el-table-column
                  prop="visitorName"
                  label="名字"
                ></el-table-column>
                <el-table-column prop="identification" label="身份证号">
                </el-table-column>
                <el-table-column prop="startAt" label="开始日期">
                </el-table-column>
                <el-table-column prop="endAt" label="结束日期">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号">
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      style="color: blue"
                      @click="edit_guest(scope.row)"
                      type="text"
                      size="small"
                      >修改</el-button
                    >
                    <el-button
                      style="color: red"
                      type="text"
                      size="small"
                      @click.native.prevent="deleteRow(scope.$index, scope.row)"
                      >删除</el-button
                    >
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
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      input: "",
      users: [],
      dialogFormVisible: false,
      form: {
        visitorName: "",
        identification: "",
        startAt: 0,
        endAt: 0,
        mobile: "",
        approver: "",
        approverId: "",
        content: "",
        createdAt: 0,
        face_token: "",
        faceset: "",
        id: "",
        imgUrl: "",
        staff: "",
        staffId: "",
        visitorCompany: "",
        // type: "create",
      },
      formLabelWidth: "140px",
      checkInRecord: "",
    };
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {
      const axios = require("axios");
      let that = this;
      // that.startAt = new Date('2014-05-10 13:25:50').getTime();
      // console.log(that.startAt);
      axios
        .get("http://60.205.247.119:8080/visit-sys/visitor/list", {})
        .then(function (response) {
          console.log(response);
          if (response.data.code == 10001) {
            that.users = response.data.data;
            console.log(that.users);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },

    add_guest() {
      console.log(this.form);
      const axios = require("axios");
      let that = this;
      that.form.startAt = new Date(this.form.startAt).getTime();
      console.log(that.form.startAt);
      that.form.endAt = new Date(this.form.endAt).getTime();
      // console.log(that.form.endtAt);
      axios
        .post("http://60.205.247.119:8080/visit-sys/visitor/save", {
          identification: that.form.identification,
          startAt: that.form.startAt,
          endAt: that.form.endAt,
          mobile: that.form.mobile,
          approver: "",
          approverId: "",
          content: "",
          createdAt: 0,
          face_token: "",
          faceset: "",
          id: "",
          imgUrl: "",
          staff: "",
          staffId: "",
          visitorCompany: "",
          visitorName: that.form.visitorName,
        })
        .then((response) => {
          console.log(response);
          console.log(that.form);
          that.users.concat(that.users.push(this.form));
          // that.users = that.users.concat(response.data.data); //Users array already exist with data in, so it'll add new data in and insert in the database on the server side
          that.initData();
        })
        .catch(function (error) {
          console.log(error);
        });
      this.dialogFormVisible = false;
      // this.initData(); //Call back the function  and display the new list of users
    },
    //  getTable() {
    //   let that = this;
    //   this.$axios({
    //     method: "get",
    //     url: "/visitor/list",
    //   })
    //     .then((response) => {
    //       console.log(response.data.data);
    //       if (response.data.code === 10001) {
    //         that.users = response.data.data;
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    edit_guest(user) {
      this.form = user;
      console.log(this.form);
      this.dialogFormVisible = true;

      // console.log(user);
      // let that = this;
      // const axios = require("axios");
      // axios
      //   .put("http://60.205.247.119:8080/visit-sys/visitor/update", {
      //     visitor: this.form,
      //     identification: this.form.id_number,
      //     visitorName: this.form.name,
      //     telephone: this.form.telephone,
      //     startAt: this.form.date_time1,
      //   })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      // });
    },

    deleteRow(index, user) {
      const axios = require("axios");
      let that = this;
      // const sendData = new FormData();
      // sendData.append("id", this.form.identification);
      console.log(user);
      axios
        .delete("http://60.205.247.119:8080/visit-sys/visitor/del?id="+user.id)
        .then(function (response) {
          console.log(response);
          // console.log(that.users);
          // console.log(that.form.id);
          that.users.splice(index, 1);
          console.log(user.id);
          // that.form.identification = index;
          // console.log(index);
          // console.log(rows);
        })
        .catch(function (error) {
          console.log(error);
        });
      // that.users = new that.users;
    },
  },
};
</script>

<style lang="scss">
@import "./src/assets/scss/vendors/home.scss";
</style>
