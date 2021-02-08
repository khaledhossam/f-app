<template>
  <div class="product_page">
    <b-container>
      <div class=" text-center">
        <div class="title">
          <Title medium bold>Category Details</Title>
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
                {{ category.name }}
              </div>
            </b-col>

            <b-col md="3">
              <div
                :class="category.deleted_at == null ? 'green' : 'red'"
                class="info_box text-center"
              >
                <div class="title">
                  <Title small no_spaces bold>Is Deleted</Title>
                </div>
                <span v-if="category.deleted_at == null">Not Deleted</span>
                <span v-else>Deleted</span>
              </div>
            </b-col>
          </b-row>

          <div class="actions text-center">
            <Button bg_purple v-b-modal.edit-category class="mr-3">Edit</Button>
            <Button bg_red @clickFn="deleteCategory" class="mr-3"
              >Delete</Button
            >

            <Button
              v-if="category.deleted_at !== null"
              bg_purple
              @clickFn="restoreCategory"
              >Restore</Button
            >
          </div>
        </div>
      </section>

      <!-- edit category  -->
      <b-modal
        hide-footer
        centered
        id="edit-category"
        ref="modal"
        title="Edit category"
      >
        <form ref="form" @submit.stop.prevent="editCategory">
          <b-form-group>
            <label>Name</label>
            <b-form-input
              v-model="category.name"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label>Enter reference</label>
            <b-form-input
              v-model="category.reference"
              placeholder="Enter reference"
              required
            ></b-form-input>
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
  name: "Category",

  components: {
    Title,
    Button,
  },

  data() {
    return {
      category: {},
    };
  },

  created() {
    this.getCategory();
  },

  watch: {
    "$route.params.id": {
      handler: function(id) {
        this.getCategory();
      },
    },
  },

  methods: {
    async getCategory() {
      await appApi.getCategory(this.$route.params.id).then((res) => {
        this.category = res.data.data;
      });
    },

    editCategory() {
      const payload = {
        name: this.category.name,
        reference: this.category.reference,
      };
      appApi.editCategory(this.$route.params.id, payload).then((res) => {
        if (res.status == 200) {
          this.$bvToast.toast(`Edited Successfully`, {
            title: "Edited Successfully",
            variant: "success",
            autoHideDelay: 5000,
          });
          this.$bvModal.hide("edit-category");
        }
      });
    },

    deleteCategory() {
      appApi.deleteCategory(this.$route.params.id).then((res) => {
        if (res.status == 200) {
          this.$bvToast.toast(`Deleted Successfully`, {
            title: "Deleted Successfully",
            variant: "danger",
            autoHideDelay: 5000,
          });

          this.getCategory();
        }
      });
    },

    restoreCategory() {
      appApi.restoreCategory(this.$route.params.id).then((res) => {
        if (res.status == 200) {
          this.$bvToast.toast(`Restored Successfully`, {
            title: "Restored Successfully",
            variant: "success",
            autoHideDelay: 5000,
          });

          this.getCategory();
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
