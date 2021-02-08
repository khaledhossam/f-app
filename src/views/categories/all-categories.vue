<template>
  <div class="home">
    <b-container>
      <section id="table">
        <div class="inner_section">
          <div class="info_box">
            <div class="title">
              <Title medium bold>All Categories</Title>
            </div>
          </div>
          <div class="text-right">
            <Button bg_purple v-b-modal.create-category class="mr-3"
              >Create</Button
            >
            <Button bg_purple to="/categories/menu/sort-menu">Sort</Button>
          </div>

          <Table
            :items="categories"
            :fields="categories_fields"
            :pagination="meta"
            @page-changed="tablePagination($event)"
            @searchFn="tableSearch($event)"
          >
            <template v-slot:cell(last_order_at)="el">
              <span v-if="el.item.last_order_at == null">N/A</span>
              <span v-else>{{ el.item.last_order_at }}</span>
            </template>

            <template v-slot:cell(action)="el">
              <router-link
                class="table_action success"
                :to="'/categories/' + el.item.id"
                >View</router-link
              >
            </template>
          </Table>
        </div>

        <!-- create new category  -->
        <b-modal
          hide-footer
          centered
          id="create-category"
          ref="modal"
          title="Submit Your Name"
        >
          <form ref="form" @submit.stop.prevent="createProduct">
            <b-form-group>
              <b-form-input
                v-model="form.reference"
                placeholder="ٌReference"
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
  name: "categories",
  components: { Table, Button, Title },

  data() {
    return {
      categories: [],
      categories_fields: [
        {
          key: "name",
          label: "Name",
        },
        {
          key: "reference",
          label: "Reference",
        },
        {
          key: "action",
          label: "",
        },
      ],
      meta: {},

      form: {
        name: "",
        name_localized: null,
        reference: "",
        image: "https://mywebsite.com/image.png",
      },
    };
  },

  created() {
    appApi.listCategories("page=1&per_page=10").then((res) => {
      this.categories = res.data.data;
      this.meta = res.data.meta;
    });
  },

  methods: {
    tablePagination(pagination) {
      console.log(pagination);
      if (!pagination) {
        var page = "page=1&per_page=10";
      } else {
        page = `page=${pagination.current_page}&per_page=${pagination.per_page}`;
      }

      appApi.listCategories(page).then((res) => {
        this.categories = res.data.data;
        this.meta = res.data.meta;
      });
    },

    tableSearch(event) {
      appApi.searchCategories(event).then((res) => {
        this.categories = res.data.data;
        this.meta = res.data.meta;
      });
    },

    createProduct() {
      appApi
        .createCategory(this.form)
        .then((res) => {
          if (res.status == 200) {
            this.$bvToast.toast(`Done`, {
              title: "Created Successfully",
              variant: "success",
              autoHideDelay: 10000,
              solid: true,
            });
            this.$bvModal.hide("create-category");
          }
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
