<template>
  <center>
    <h1>Not Found!</h1>
    <p>
      <router-link to="/">Go home?</router-link>
    </p>
  </center>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
center {
  margin: 15vw;
}

h1 {
  font-size: 2em;
}
</style>
