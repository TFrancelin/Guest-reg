<template>
  <div class="home">
    <div class="container">
      <el-container style="height: 500px">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
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
          <!-- <el-header
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
          </el-header> -->

          <el-main>
            <el-table :data="tableData">
              <el-table-column prop="name" label="Name" width="140">
              </el-table-column>
              <el-table-column prop="id" label="Id" width="120">
              </el-table-column>
              <el-table-column prop="startedAt" label="StartedAt">
              </el-table-column>
              <el-table-column prop="endAt" label="EndAt"> </el-table-column>
              <el-table-column prop="phone" label="Phone"> </el-table-column>
            </el-table>
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
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    };
    return {
      tableData: Array(20).fill(item),
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

.container { 
  el-aside { 
    border: 1px solid rgba(245, 245, 245, 0.804);
    border-radius: 10px;
  }
}

.guest-content {
  margin: 0 5px;
  padding: 0 5px;
  border: 1px solid rgba(245, 245, 245, 0.804);
  border-radius: 8px;

  .guest-nav {
    height: 41px !important;
    line-height: 43px !important;
    text-align: right;
    font-size: 12px;
    margin-top: 10px;
    border-radius: inherit;

    span:hover {
      color:whitesmoke;
    }
  }
}
</style>
