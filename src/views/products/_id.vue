<template>
  <div class="product_page">
    <b-container>
      <div class="text-center">
        <div class="title">
          <Title medium bold>Product Details</Title>
        </div>
      </div>
      <section id="product_info">
        <div class="inner_section">
          <b-row>
            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>Name</Title>
                </div>
                {{ product.name }}
              </div>
            </b-col>

            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>SKU</Title>
                </div>
                {{ product.sku }}
              </div>
            </b-col>

            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>Pricing Method</Title>
                </div>
                {{ product.pricing_method }}
              </div>
            </b-col>

            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>Price</Title>
                </div>
                <span>{{ product.price }}</span>
              </div>
            </b-col>

            <b-col md="3">
              <div class="info_box text-center">
                <div class="title">
                  <Title small no_spaces bold>Category</Title>
                </div>
                {{ product.category.name }}
              </div>
            </b-col>

            <b-col md="3">
              <div
                :class="product.deleted_at == null ? 'green' : 'red'"
                class="info_box text-center"
              >
                <div class="title">
                  <Title small no_spaces bold>Is Deleted</Title>
                </div>
                <span v-if="product.deleted_at == null">Not Deleted</span>
                <span v-else>Deleted</span>
              </div>
            </b-col>
          </b-row>

          <div class="actions text-center">
            <Button bg_purple v-b-modal.edit-product class="mr-3">Edit</Button>
            <Button bg_red @clickFn="deleteProduct" class="mr-3">Delete</Button>

            <Button
              v-if="product.deleted_at !== null"
              bg_purple
              @clickFn="restoreProduct"
              >Restore</Button
            >
          </div>
        </div>
      </section>

      <!-- edit product  -->
      <b-modal
        hide-footer
        centered
        id="edit-product"
        ref="modal"
        title="Edit Product"
      >
        <form ref="form" @submit.stop.prevent="editProduct">
          <b-form-group>
            <label>Name</label>
            <b-form-input
              v-model="product.name"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label>Enter SKU</label>
            <b-form-input
              v-model="product.sku"
              placeholder="Enter SKU"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label>Price</label>
            <b-form-input
              v-model="product.price"
              placeholder="price"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label>
              Pricing Method
            </label>
            <b-form-select
              v-model="product.pricing_method"
              :options="pricing_method_arr"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group>
            <b-form-select
              text-field="name"
              value-field="id"
              v-model="product.category.id"
              :options="categories"
              placeholder="category"
              required
            ></b-form-select>
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
  name: "Product",

  components: {
    Title,
    Button,
  },

  data() {
    return {
      product: {},
      categories: [],
      pricing_method_arr: [
        { value: null, text: "Please select an Gender" },
        { value: 1, text: "Fixed Price" },
        { value: 2, text: "Open Price" },
      ],
    };
  },

  created() {
    this.getProduct();
    this.getCategories();
  },

  methods: {
    async getProduct() {
      await appApi.getProduct(this.$route.params.id).then((res) => {
        this.product = res.data.data;
        console.log(this.product);
      });
    },

    editProduct() {
      const payload = {
        name: this.product.name,
        email: this.product.email,
        phone: this.product.phone,
        gender: this.product.gender,
        order_count: this.product.order_count,
        birth_date: this.product.birth_date,
        last_order_at: this.product.last_order_at,
        pricing_method: this.product.pricing_method,
      };
      appApi.editProduct(this.$route.params.id, payload).then((res) => {
        if (res.status == 200) {
          this.$bvToast.toast(`Edited Successfully`, {
            title: "Edited Successfully",
            variant: "success",
            autoHideDelay: 5000,
          });
          this.$bvModal.hide("edit-product");
        }
      });
    },

    deleteProduct() {
      appApi.deleteProduct(this.$route.params.id).then((res) => {
        if (res.status == 200) {
          this.$bvToast.toast(`Deleted Successfully`, {
            title: "Deleted Successfully",
            variant: "danger",
            autoHideDelay: 5000,
          });

          this.getProduct();
        }
      });
    },

    restoreProduct() {
      appApi.restoreProduct(this.$route.params.id).then((res) => {
        if (res.status == 200) {
          this.$bvToast.toast(`Restored Successfully`, {
            title: "Restored Successfully",
            variant: "success",
            autoHideDelay: 5000,
          });

          this.getProduct();
        }
      });
    },
    async getCategories() {
      await appApi.listCategories().then((res) => {
        this.categories = res.data.data;
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
