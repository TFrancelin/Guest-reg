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
              v-model="search"
              clearable
            >
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
            <el-button type="text" @click="add_guest_btn">添加客人</el-button>
            <!-- DialogBox with form in which to fill each user information -->
            <el-dialog
              title=""
              :visible.sync="dialogFormVisible"
              v-if="clicked == false"
            >
              <h2 class="dialog_header" align="center">请添加你的信息</h2>
              <el-form :model="form" :rules="rules" ref="form">
                <el-form-item
                  label="名字"
                  :label-width="formLabelWidth"
                  prop="visitorName"
                >
                  <el-input
                    v-model="form.visitorName"
                    autocomplete="on"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="身份证号"
                  :label-width="formLabelWidth"
                  prop="identification"
                >
                  <el-input
                    v-model="form.identification"
                    autocomplete="on"
                    clearable
                  ></el-input>
                </el-form-item>

                <div class="datepicker">
                  <el-form-item
                    class="datetime"
                    label="开始时间"
                    :label-width="formLabelWidth"
                    prop="startAt"
                  >
                    <el-date-picker
                      v-model="form.startAt"
                      type="datetime"
                      placeholder="选择日期和时间"
                      clearable
                    >
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item
                    class="datetime"
                    label="结束时间"
                    :label-width="formLabelWidth"
                    prop="endAt"
                  >
                    <el-date-picker
                      v-model="form.endAt"
                      type="datetime"
                      placeholder="选择日期和时间"
                      clearable
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>

                <el-form-item
                  label="手机号码"
                  :label-width="formLabelWidth"
                  prop="mobile"
                >
                  <el-input
                    v-model.number="form.mobile"
                    autocomplete="off"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>

              <!-- Cancel and confirm buttons at the dialogBox footer -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm(form)"
                  >确认</el-button
                >
              </span>
            </el-dialog>
            <el-dialog
              title=""
              :visible.sync="dialogFormVisible"
              v-if="clicked == true"
            >
              <h2 class="dialog_header" align="center">请修改你的信息</h2>
              <el-form :model="form1" :rules="rules" ref="form1">
                <el-form-item
                  label="名字"
                  :label-width="formLabelWidth"
                  prop="visitorName"
                >
                  <el-input
                    v-model="form1.visitorName"
                    autocomplete="on"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="身份证号"
                  :label-width="formLabelWidth"
                  prop="identification"
                >
                  <el-input
                    v-model="form1.identification"
                    autocomplete="on"
                    clearable
                  ></el-input>
                </el-form-item>

                <div class="datepicker">
                  <el-form-item
                    class="datetime"
                    label="开始时间"
                    :label-width="formLabelWidth"
                    prop="startAt"
                  >
                    <el-date-picker
                      v-model="form1.startAt"
                      type="datetime"
                      placeholder="选择日期和时间"
                      clearable
                    >
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item
                    class="datetime"
                    label="结束时间"
                    :label-width="formLabelWidth"
                    prop="endAt"
                  >
                    <el-date-picker
                      v-model="form1.endAt"
                      type="datetime"
                      placeholder="选择日期和时间"
                      clearable
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>

                <el-form-item
                  label="手机号码"
                  :label-width="formLabelWidth"
                  prop="mobile"
                >
                  <el-input
                    v-model.number="form1.mobile"
                    autocomplete="off"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>

              <!-- Cancel and confirm buttons at the dialogBox footer -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm(form1)"
                  >确认</el-button
                >
              </span>
            </el-dialog>
          </el-header>

          <!-- table with users info per row, and each row with edit and delete buttons -->
          <el-main>
            <div class="demo-input-size">
              <el-table
                :data="
                  users.filter(
                    (data) =>
                      !search ||
                      data.visitorName
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      data.identification
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  )
                "
                style="width: 100%"
              >
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
// import { required, minLength } from "vuelidate/lib/validators";
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      clicked: false,
      search: "",
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
      form1: {
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
      rules: {
        mobile: [
          { min: 11, max: 11, message: "手机号不能小或大于11位", trigger: "blur" },
        ],
        identification: [
          {
            required: true,
            message: "身份证号不能为空",
            trigger: ["blur", "change"],
          },
          {
            type: "tel",
            message: "身份证号不能小于或大于18位",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  // validations: {
  //   visitorName: {
  //     required,
  //   },
  //   identification: {
  //     required,
  //     minLength: minLength(18),
  //   },
  // },

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
        .get("/visitor/list", {})
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

    add_guest_btn() {
      this.form.identification = "";
      this.form.startAt = "";
      this.form.endAt = "";
      this.form.mobile = "";
      this.form.visitorName = "";
      this.dialogFormVisible = true;
    },

    confirm(element) {
      console.log(this.form);
      const axios = require("axios");
      let that = this;
      if (element == this.form) {
        console.log("Element is equal to form");
        let times = new Date(this.form.startAt).getTime();
        that.form.startAt = times / 1000;
        console.log(that.form.startAt);
        let times1 = new Date(this.form.endAt).getTime();
        that.form.endAt = times1 / 1000;

        this.$refs.form.validate((valid) => {
          if (valid) {
            axios
              .post("/visitor/save", {
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
                that.users.concat(that.users.push(this.form)); //Users array already exist with data in, so it'll add new data in and insert in the database on the server side
                that.initData();
              })
              .catch(function (error) {
                console.log(error);
              });
            this.dialogFormVisible = false;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else if (element == this.form1) {
        let that = this;
        // const axios = require("axios");
        console.log('We"re editing');
        let times = new Date(this.form1.startAt).getTime();
        that.form1.startAt = times / 1000;
        console.log(that.form1.startAt);
        let times1 = new Date(this.form1.endAt).getTime();
        that.form1.endAt = times1 / 1000;

        this.$refs.form1.validate((valid) => {
          if (valid) {
            axios
              .put("/visitor/update", {
                identification: that.form1.identification,
                startAt: that.form1.startAt,
                endAt: that.form1.endAt,
                mobile: that.form1.mobile,
                approver: that.form1.approver,
                approverId: that.form1.approverId,
                content: that.form1.content,
                createdAt: that.form1.createdAt,
                face_token: that.form1.face_token,
                faceset: that.form1.faceset,
                id: that.form1.id,
                imgUrl: that.form1.imgUrl,
                staff: that.form1.staff,
                staffId: that.form1.staffId,
                visitorCompany: that.form1.visitorCompany,
                visitorName: that.form1.visitorName,
              })
              .then(function (response) {
                console.log(response);
                // that.form = that.form1;
                // console.log(that.form);
              })
              .catch(function (error) {
                console.log(error);
              });
            this.dialogFormVisible = false;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },

    cancel() {
      // this.form = this.form1;
      this.dialogFormVisible = false;
    },

    // validateNumber: (event) => {
    //   let keyCode = event.keyCode;
    //   if (keyCode < 48 || keyCode > 57) {
    //     event.preventDefault();
    //   }
    //   console.log(keyCode);
    // },

    edit_guest(user) {
      this.clicked = true;
      this.form1 = user;
      this.dialogFormVisible = true;
      // console.log(this.form);
      console.log(user);
    },

    deleteRow(index, user) {
      const axios = require("axios");
      let that = this;
      console.log(user);
      axios
        .delete("/visitor/del?id=" + user.id)
        .then(function (response) {
          console.log(response);
          that.users.splice(index, 1);
          console.log(user.id);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "./src/assets/scss/vendors/home.scss";
</style>
