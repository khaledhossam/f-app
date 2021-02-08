<template>
  <div class="customer_page">
    <b-container>
      <div class=" text-center">
        <div class="title">
          <Title medium bold>Customer Details</Title>
        </div>
      </div>
      <section id="customer_info">
        <div class="inner_section">
          <b-row>
            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>Name</Title>
                </div>
                {{ customer.name }}
              </div>
            </b-col>

            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>Email</Title>
                </div>
                {{ customer.email }}
              </div>
            </b-col>

            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>Phone Number</Title>
                </div>
                {{ customer.phone }}
              </div>
            </b-col>

            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>Last Order At</Title>
                </div>
                <span v-if="customer.last_order_at == null">N/A</span>
                <span v-else>{{ customer.last_order_at }}</span>
              </div>
            </b-col>

            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>Order Count</Title>
                </div>
                {{ customer.order_count }}
              </div>
            </b-col>

            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>Birth Date</Title>
                </div>
                {{ customer.birth_date }}
              </div>
            </b-col>

            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>Gender</Title>
                </div>
                <span v-if="customer.gender == 1">Male</span>
                <span v-else>FeMale</span>
              </div>
            </b-col>

            <b-col md="3">
              <div
                :class="customer.deleted_at == null ? 'green' : 'red'"
                class="info_box text-center"
              >
                <div class="title">
                  <Title small no_spaces bold>Is Deleted</Title>
                </div>
                <span v-if="customer.deleted_at == null">Not Deleted</span>
                <span v-else>Deleted</span>
              </div>
            </b-col>
          </b-row>

          <div class="actions text-center">
            <Button bg_purple v-b-modal.edit-customer class="mr-3">Edit</Button>
            <Button bg_red @clickFn="deleteCustomer" class="mr-3"
              >Delete</Button
            >

            <Button
              v-if="customer.deleted_at !== null"
              bg_purple
              @clickFn="restoreCustomer"
              >Restore</Button
            >
          </div>
        </div>
      </section>

      <!-- edit customer  -->
      <b-modal
        hide-footer
        centered
        id="edit-customer"
        ref="modal"
        title="Edit Customer"
      >
        <form ref="form" @submit.stop.prevent="editCustomer">
          <b-form-group>
            <b-form-input
              v-model="customer.name"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input
              v-model="customer.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input
              v-model="customer.phone"
              placeholder="Phone"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-select
              v-model="customer.gender"
              :options="gender"
              placeholder="Gender"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group>
            <b-form-input
              v-model="customer.order_count"
              placeholder="Order Count"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-datepicker
              v-model="customer.birth_date"
              placeholder="Birthday"
              required
            ></b-form-datepicker>
          </b-form-group>

          <b-form-group>
            <b-form-datepicker
              v-model="customer.last_order_at"
              placeholder="Last Order At"
              required
            ></b-form-datepicker>
          </b-form-group>

          <div class="text-right">
            <Button bg_purple type="submit">Save</Button>
          </div>
        </form>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import appApi from "../../services/api";

export default {
  name: "Customer",

  components: {
    Title,
    Button,
  },

  data() {
    return {
      customer: {},
      gender: [
        { text: "Male", value: 1 },
        { text: "FeMale", value: 2 },
      ],
    };
  },

  created() {
    this.getCustomer();
  },

  methods: {
    getCustomer() {
      appApi.getCustomer(this.$route.params.id).then((res) => {
        this.customer = res.data.data;
      });
    },

    editCustomer() {
      const payload = {
        name: this.customer.name,
        email: this.customer.email,
        phone: this.customer.phone,
        gender: this.customer.gender,
        order_count: this.customer.order_count,
        birth_date: this.customer.birth_date,
        last_order_at: this.customer.last_order_at,
      };
      appApi.editCustomer(this.$route.params.id, payload).then((res) => {
        if (res.status == 200) {
          this.$bvToast.toast(`Edited Successfully`, {
            title: "Edited Successfully",
            variant: "success",
            autoHideDelay: 5000,
          });
          this.$bvModal.hide("edit-customer");
        }
      });
    },

    deleteCustomer() {
      appApi.deleteCustomer(this.$route.params.id).then((res) => {
        if (res.status == 200) {
          this.$bvToast.toast(`Deleted Successfully`, {
            title: "Deleted Successfully",
            variant: "danger",
            autoHideDelay: 5000,
          });

          this.getCustomer();
        }
      });
    },

    restoreCustomer() {
      appApi.restoreCustomer(this.$route.params.id).then((res) => {
        if (res.status == 200) {
          this.$bvToast.toast(`Restored Successfully`, {
            title: "Restored Successfully",
            variant: "success",
            autoHideDelay: 5000,
          });

          this.getCustomer();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.info_box {
  margin: 2rem 0;
  padding: 1rem 0;
  background: #f3f3f3;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.green {
  background: #d1e6d1;
}

.red {
  background: #fdadad;
}
</style>
