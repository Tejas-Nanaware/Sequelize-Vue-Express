<template>
  <v-layout column>
    <v-flex>
      <div class="white elevation-2">
        <v-toolbar flat dense class="blue" dark>
          <v-toolbar-title>Register</v-toolbar-title>
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
      <v-btn color="primary" dark elevation="2" rounded @click="register">Register</v-btn>
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
  // watch: {
  //   email (value) {
  //     console.log('Email changed to', value)
  //   }
  // },
  // mounted () {
  //   setTimeout(() => {
  //     this.email = 'Timeout@Changes.Email'
  //   }, 2000)
  // },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
