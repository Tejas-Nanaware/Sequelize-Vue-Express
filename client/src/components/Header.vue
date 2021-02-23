<template>
  <v-toolbar fixed dark color="blue">
    <v-toolbar-title class="mr-4">
      <router-link to="/">MyApp</router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn text dark color="blue">
        <router-link to="/browse">Browse</router-link>
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn text dark color="blue">
        <router-link to="/register">Register</router-link>
      </v-btn>
      <v-btn text dark color="blue">
        <router-link to="/login">Login</router-link>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>
