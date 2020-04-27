<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;400&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
  background-position: cover;
  background-image: url("./assets/bcgimg.svg");
  font-family: "Poppins", sans-serif;
}
</style>
