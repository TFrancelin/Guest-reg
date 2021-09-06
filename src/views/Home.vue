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
                ><i class="el-icon-message"></i>Navigator One</template
              >
              <el-menu-item-group>
                <template slot="title">Group 1</template>
                <el-menu-item index="1-1">Option 1</el-menu-item>
                <el-menu-item index="1-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="1-3">Option 3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">Option4</template>
                <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-menu"></i>Navigator Two</template
              >
              <el-menu-item-group>
                <template slot="title">Group 1</template>
                <el-menu-item index="2-1">Option 1</el-menu-item>
                <el-menu-item index="2-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="2-3">Option 3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <template slot="title">Option 4</template>
                <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"
                ><i class="el-icon-setting"></i>Navigator Three</template
              >
              <el-menu-item-group>
                <template slot="title">Group 1</template>
                <el-menu-item index="3-1">Option 1</el-menu-item>
                <el-menu-item index="3-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="3-3">Option 3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="3-4">
                <template slot="title">Option 4</template>
                <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
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
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span @click="addGuest">Add guest</span>
          </el-header>

          <el-main>
            <div class="demo-input-size">
              <el-input
                size="mini"
                placeholder="Please input your name"
                accept="text"
                v-model="input1"
              >
              </el-input>
              <el-input
                size="mini"
                placeholder="Please input yuour ID"
                accept="number"
                v-model="input2"
              >
              </el-input>
              <el-input
                size="mini"
                placeholder="started at"
                type="datetime-local"
                v-model="input3"
              >
              </el-input>
              <el-input
                size="mini"
                placeholder="endind at"
                type="datetime-local"
                v-model="input4"
              >
              </el-input>
              <el-input
                size="mini"
                placeholder="Telephone number"
                accept="number"
                v-model="input5"
              >
              </el-input>
              <i class="el-icon-edit">Edit</i>
              <i class="el-icon-delete">Delete</i>
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
        input1: "",
        input2: "",
        input3: "",
        input4: "",
      },
    };
  },
  methods: {
    addGuest() {
      console.log("guest added");
    },
  },
};
</script>

<style lang="scss">
@import "./src/assets/scss/vendors/home.scss";
</style>
