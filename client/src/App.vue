<template>
  <v-app>
    <div id="app">
      <page-header />
      <v-main>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
