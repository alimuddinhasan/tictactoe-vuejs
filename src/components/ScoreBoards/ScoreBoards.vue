<template>
  <div class="span3">
    <ScoreBoard v-for="(player, index) in players" :key="index" :name="player.label" :score="player.score" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScoreBoard from './ScoreBoard/ScoreBoard'

export default {
  components: {
    ScoreBoard
  },
  computed: {
    ...mapGetters({
      players: 'players/getPlayers'
    })
  },
}
</script>