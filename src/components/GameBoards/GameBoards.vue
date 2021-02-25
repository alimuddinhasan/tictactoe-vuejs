<template>
  <ul class="row" id="game">
    <template v-for="(row) in size">
      <template v-for="(col) in size">
        <GameBoard @onClick="boardClicked(row - 1, col - 1)" :selected="gameMatrix[row - 1] ? gameMatrix[row - 1][col - 1] : null" :key="`${row - 1}_${col - 1}`" />
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
    },
    players: {
      type: Array
    }
  },
  mounted () {
    for (let row = 0; row < this.size; row++) {
      this.gameMatrix.push([])
      for (let col = 0; col < this.size; col++) {
        this.gameMatrix[row].push(null)
      }
    }
  },
  data () {
    return {
      gameMatrix: []
    }
  },
  methods: {
    boardClicked (row, col) {
      console.log('ROW COL', row, col)
      const data = this.$store.getters['game_turn/getGameTurn']

      const matrix = JSON.parse(JSON.stringify(this.gameMatrix))
      console.log('matrix', matrix)
      if (!matrix[row][col]) {
        matrix[row][col] = data
        this.gameMatrix = matrix
        // if (isGameOver(matrix, row, col)) {
        //   onGameOver(data)
        //   alert('MENANG', data)
        // }
    
        let newTurnIndex = this.$store.getters['game_turn/getTurnIndex'] + 1
        if (newTurnIndex > this.players.length - 1) newTurnIndex = 0

        this.$store.dispatch('game_turn/submitTurnIndex', newTurnIndex)
        this.$store.dispatch('game_turn/submitGameTurn', this.players[newTurnIndex])
        return true
      } else {
        alert('Already selected')
        return false
      }
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