<template>
  <v-layout column>
    <v-flex>
      <panel title="Browse">
        <div v-for="song in songs" :key="song.title">
          {{song.title}}
          {{song.artist}}
          {{song.album}}
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      songs: [
        {
          title: 'Roundabout',
          artist: 'Yes',
          album: 'JoJo\'s Bizarre Adventure'
        }
      ]
    }
  }
}
</script>

<style>

</style>
