<template>
  <div class="text-center">
    <draggable v-model="categories">
      <transition-group>
        <div class="draggable" v-for="element in categories" :key="element.id">
          {{ element.name }}
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import appApi from "../../../services/api";
import draggable from "vuedraggable";

export default {
  components: { draggable },
  data() {
    return {
      categories: [],
    };
  },
  created() {
    appApi.listCategories("page=1&per_page=10").then((res) => {
      this.categories = res.data.data;
      this.meta = res.data.meta;
    });
  },
  watch: {
    async categories() {
      let sortedMenu = [];
      this.categories.map((e) => {
        sortedMenu.push({
          category_id: e.id,
          children: [],
        });
      });
      await appApi.putSortedDisplay(sortedMenu);
      await appApi.getSortedDisplay(sortedMenu).then((res) => {
        console.log(res);
      });
    },
  },
  methods: {},
};
</script>
<style>
.draggable {
  width: 30%;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px dashed #000;
  cursor: move;
}
</style>
