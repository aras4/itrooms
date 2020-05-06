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
  background-image: url("./assets/background.jpg");
  background-size: cover;
  font-family: "Poppins", sans-serif;
}

/* scaling for smaller phones than usual */
@media screen and (max-width: 425px) {
  body {
    background-image: none !important;
    background-color: black;
  }
}
</style>
