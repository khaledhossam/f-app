<template>
  <div class="home">
    <b-container>
      <section id="table">
        <div class="inner_section">
          <div class="info_box">
            <div class="title">
              <Title medium bold>All Products</Title>
            </div>
          </div>
          <div class="text-right">
            <Button bg_purple v-b-modal.create-customer>Create</Button>
          </div>

          <Table
            :items="products"
            :fields="products_fields"
            :pagination="meta"
            @page-changed="tablePagination($event)"
            @searchFn="tableSearch($event)"
          >
            <template v-slot:cell(last_order_at)="el">
              <span v-if="el.item.last_order_at == null">N/A</span>
              <span v-else>{{ el.item.last_order_at }}</span>
            </template>
            <template v-slot:cell(price)="el">
              <span v-if="el.item.pricing_method == 1">{{
                el.item.price
              }}</span>
              <span v-else>Open price</span>
            </template>

            <template v-slot:cell(action)="el">
              <router-link
                class="table_action success"
                :to="'/products/' + el.item.id"
                >View</router-link
              >
            </template>
          </Table>
        </div>

        <!-- create new customer  -->
        <b-modal
          hide-footer
          centered
          id="create-customer"
          ref="modal"
          title="Submit Your Name"
        >
          <form ref="form" @submit.stop.prevent="createProduct">
            <b-form-group>
              <b-form-input
                v-model="form.sku"
                placeholder="SKU"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-input
                v-model="form.name"
                placeholder="Enter name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-input
                v-model="form.barcode"
                placeholder="Barcode"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-input
                v-model="form.description"
                placeholder="description"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-input
                v-model="form.price"
                placeholder="Price"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-input
                v-model="form.cost"
                placeholder="cost"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-input
                v-model="form.calories"
                placeholder="calories"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-select
                text-field="name"
                value-field="id"
                v-model="form.category_id"
                :options="categories"
                placeholder="category"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group>
              <b-form-select
                text-field="name"
                value-field="id"
                v-model="form.tax_group_id"
                :options="tax_group_arr"
                placeholder="category"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group>
              <label>
                Pricing Method
              </label>
              <b-form-select
                v-model="form.pricing_method"
                :options="pricing_method_arr"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-checkbox v-model="form.is_active"
              >Is Active</b-form-checkbox
            >
            <b-form-checkbox v-model="form.is_stock_product"
              >Is Stock Product</b-form-checkbox
            >
            <div class="text-right">
              <Button bg_purple type="submit">Save</Button>
            </div>
          </form>
        </b-modal>
      </section>
    </b-container>
  </div>
</template>

<script>
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import Title from "@/components/ui/Title";
import appApi from "../../services/api";

export default {
  name: "Products",
  components: { Table, Button, Title },

  data() {
    return {
      products: [],
      tax_group_arr: [],
      categories: [],
      products_fields: [
        {
          key: "name",
          label: "Name",
        },
        {
          key: "sku",
          label: "SKU",
        },
        {
          key: "category.name",
          label: "Category",
        },
        {
          key: "price",
          label: "Price",
        },
        {
          key: "action",
          label: "",
        },
      ],
      meta: {},
      pricing_method_arr: [
        { value: null, text: "Please select an Gender" },
        { value: 1, text: "Fixed Price" },
        { value: 2, text: "Open Price" },
      ],
      form: {
        sku: "",
        barcode: null,
        name: "",
        name_localized: null,
        description: "",
        description_localized: "",
        image: "https://path-to-image/",
        is_active: false,
        is_stock_product: false,
        pricing_method: null,
        selling_method: 2,
        costing_method: 1,
        preparation_time: 90,
        price: "",
        cost: "",
        calories: "",
        tax_group_id: "92acb73c-74d0-4314-9ce1-a1cdd702d5b9",
        category_id: "92ac9a0b-5c5f-4cc7-ad44-6762c706aa49",
      },
    };
  },

  created() {
    appApi.listProducts("page=1&per_page=10").then((res) => {
      this.products = res.data.data;
      this.meta = res.data.meta;
    });

    this.getCategoriesAndTaxGroups();
  },

  methods: {
    getCategoriesAndTaxGroups() {
      appApi.listCategories().then((res) => {
        this.categories = res.data.data;
      });
      appApi.getTaxGroups().then((res) => {
        this.tax_group_arr = res.data.data;
      });
    },
    tablePagination(pagination) {
      console.log(pagination);
      if (!pagination) {
        var page = "page=1&per_page=10";
      } else {
        page = `page=${pagination.current_page}&per_page=${pagination.per_page}`;
      }

      appApi.listProducts(page).then((res) => {
        this.products = res.data.data;
        this.meta = res.data.meta;
      });
    },

    tableSearch(event) {
      appApi.searchProducts(event).then((res) => {
        this.customers = res.data.data;
        this.meta = res.data.meta;
      });
    },

    createProduct() {
      appApi
        .createProducts(this.form)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          Object.keys(e.response.data.errors).map((key) => {
            this.$bvToast.toast(e.response.data.errors[key][0], {
              title: "Error",
              variant: "danger",
              solid: true,
              "no-auto-hide": true,
            });
          });
        });
    },
  },
};
</script>
