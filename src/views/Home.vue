<template>
  <div class="home">
    <b-container>
      <section id="table">
        <div class="inner_section">
          <div class="title">
            <Title medium bold>All Customer</Title>
          </div>
          <div class="text-right">
            <Button bg_purple v-b-modal.create-customer>Create</Button>
          </div>

          <Table
            :items="customers"
            :fields="customers_fields"
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
                :to="'/customer/' + el.item.id"
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
          <form ref="form" @submit.stop.prevent="createCustomer">
            <b-form-group>
              <label>email</label>
              <b-form-input
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <label>name</label>
              <b-form-input
                v-model="form.name"
                placeholder="Enter name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <label>Dial Code</label>
              <b-form-input
                v-model="form.dial_code"
                placeholder="Dial Code"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <label>Phone</label>
              <b-form-input
                v-model="form.phone"
                placeholder="Phone"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <label>Gender</label>
              <b-form-select
                v-model="form.gender"
                :options="gender"
                placeholder="Gender"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group>
              <label>Birthday</label>
              <b-form-datepicker
                v-model="form.birth_date"
                placeholder="Birthday"
                required
              ></b-form-datepicker>
            </b-form-group>

            <b-form-group>
              <label>Account Limit:</label>
              <b-form-input
                type="number"
                v-model="form.house_account_limit"
                placeholder="Account Limit:"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <label>Account Balance:</label>
              <b-form-input
                type="number"
                v-model="form.house_account_balance"
                placeholder="Account Balance:"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-checkbox v-model="form.is_loyalty_enabled"
              >Is Loyalty Enabled</b-form-checkbox
            >
            <b-form-checkbox v-model="form.is_blacklisted"
              >Is Blacklisted</b-form-checkbox
            >
            <b-form-checkbox v-model="form.is_house_account_enabled"
              >House Account Enabled</b-form-checkbox
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

import appApi from "../services/api";

export default {
  name: "Home",
  components: { Table, Button, Title },

  data() {
    return {
      customers: [],
      customers_fields: [
        {
          key: "name",
          label: "Name",
        },
        {
          key: "email",
          label: "Email",
        },
        {
          key: "phone",
          label: "Phone",
        },
        {
          key: "last_order_at",
          label: "Last Order At",
        },
        {
          key: "action",
          label: "",
        },
      ],
      meta: {},
      gender: [
        { value: null, text: "Please select an Gender" },
        { value: 1, text: "Male" },
        { value: 2, text: "Female" },
      ],
      form: {
        name: "",
        dial_code: null,
        phone: null,
        email: "",
        gender: null,
        birth_date: "",
        house_account_limit: null,
        house_account_balance: null,
        is_loyalty_enabled: false,
        is_blacklisted: false,
        is_house_account_enabled: false,
        tags: [
          {
            id: "92ac97b2-a5a7-4c6e-8885-d89c0e07661a",
          },
        ],
      },
    };
  },

  created() {
    appApi.listCustomers("page=1&per_page=10").then((res) => {
      this.customers = res.data.data;
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

      appApi.listCustomers(page).then((res) => {
        this.customers = res.data.data;
        this.meta = res.data.meta;
      });
    },

    tableSearch(event) {
      appApi.searchCustomers(event).then((res) => {
        this.customers = res.data.data;
        this.meta = res.data.meta;
      });
    },

    createCustomer() {
      this.form.dial_code = Number(this.form.dial_code);
      appApi
        .createCustomer(this.form)
        .then((res) => {
          if (res.status == 200) {
            this.$bvToast.toast(`Done`, {
              title: "Created Successfully",
              variant: "success",
              autoHideDelay: 10000,
              solid: true,
            });
            this.$bvModal.hide("create-customer");
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
