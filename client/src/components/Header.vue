<template>
  <v-toolbar fixed dark color="blue">
    <v-toolbar-title class="mr-4" @click="navigateTo({name: 'root'})">
      MyApp
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn text dark>
        <router-link to="/browse">Browse</router-link>
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn"
        text dark @click="navigateTo({name: 'register'})">
          Register
      </v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn"
        text dark @click="navigateTo({name: 'login'})">
          Login
      </v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn"
        text dark @click="logout">
          Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
</style>
