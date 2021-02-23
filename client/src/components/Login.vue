<template>
  <v-layout column>
    <v-flex>
      <div class="white elevation-2">
        <v-toolbar flat dense class="blue" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
      </div>
    </v-flex>
    <div>
      <v-text-field type="email" label="Email" placeholder="username@example.com" filled v-model="email"></v-text-field>
      <br>
      <v-text-field type="password" label="Password" placeholder="Password" filled v-model="password"></v-text-field>
      <br>
      <div class="error" v-html="error" />
      <br>
      <v-btn color="primary" dark elevation="2" rounded @click="login">Login</v-btn>
    </div>
  </v-layout>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'HelloWorld',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
