<template>
  <v-layout column>
    <v-flex>
      <panel title="Login">
        <div>
          <v-text-field type="email" label="Email" placeholder="username@example.com" filled v-model="email"></v-text-field>
          <br>
          <v-text-field type="password" label="Password" placeholder="Password" filled v-model="password"></v-text-field>
          <br>
          <div class="error" v-html="error" />
          <br>
          <v-btn color="primary" dark elevation="2" rounded @click="login">Login</v-btn>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
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
<style scoped>
.error {
  color: red;
}
</style>
