import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Customer from "../views/customer/_id.vue";

import Product from "../views/products/_id.vue";
import AllProduct from "../views/products/all-products.vue";

import AllCategories from "../views/categories/all-categories.vue";
import Category from "../views/categories/_id.vue";
import Menu from "../views/categories/menu/sort-menu.vue";

import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/customer/:id", component: Customer },
  { path: "/products/:id", component: Product },
  { path: "/all-products", component: AllProduct },
  { path: "/all-categories", component: AllCategories },
  { path: "/categories/:id", component: Category },
  { path: "/categories/menu/sort-menu", component: Menu },
  {
    path: "*",
    name: "Not Found",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
