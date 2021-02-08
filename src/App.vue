<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Customers</b-nav-item>
          <b-nav-item-dropdown text="Categories">
            <b-dropdown-item
              v-for="i in categories.concat({
                id: 'all-categories',
                name: 'All Categories',
              })"
              :key="i.id"
              :to="
                i.id == 'all-categories'
                  ? '/all-categories'
                  : '/categories/' + i.id
              "
            >
              {{ i.name }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/all-products">Products</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
import appApi from "./services/api";

export default {
  data() {
    return {
      categories: [],
    };
  },

  created() {
    appApi.listCategories().then((res) => {
      this.categories = res.data.data;
    });
  },
};
</script>

<style lang="scss">
.navbar {
  background: #000;
  .dropdown-menu {
    max-height: 400px;
    overflow-y: scroll;
  }

  .dropdown-toggle {
    &::after {
      position: relative;
      top: 2.3px;
    }
  }
}
</style>
