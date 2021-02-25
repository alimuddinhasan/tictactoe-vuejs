<template>
  <ul class="row" id="game">
    <template v-for="(row) in size">
      <template v-for="(col) in size">
        <GameBoard :key="`${row}_${col}`" />
      </template>
    </template>
  </ul>
</template>

<script>
import GameBoard from './GameBoard/GameBoard'
export default {
  components: {
    GameBoard
  },
  props: {
    size: {
      type: Number
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
#game {
  float: left;
  padding: 0;
  clear: both;
}
</style>