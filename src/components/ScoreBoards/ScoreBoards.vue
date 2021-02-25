<template>
  <div class="span3">
    <!-- <template > -->
      <ScoreBoard v-for="(player, index) in players" :key="index" :name="player.label" :score="player.score" />
    <!-- </template> -->
  </div>
</template>

<script>
import ScoreBoard from './ScoreBoard/ScoreBoard'

export default {
  components: {
    ScoreBoard
  },
  props: {
    players: {
      type: Array
    }
  }
}
</script>