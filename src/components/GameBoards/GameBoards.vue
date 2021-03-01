<template>
  <ul class="row" id="game">
    <template v-for="(row) in size">
      <div :key="row">
        <template v-for="(col) in size">
          <GameBoard @onClick="boardClicked(row - 1, col - 1)" :selected="gameMatrix[row - 1] ? gameMatrix[row - 1][col - 1] : null" :key="`${row - 1}_${col - 1}`" />
        </template>
      </div>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

import GameBoard from './GameBoard/GameBoard'

export default {
  components: {
    GameBoard
  },
  watch: {
    size (to, from) {
      this.initialize()
    }
  },
  props: {
    size: {
      type: Number
    }
  },
  mounted () {
    this.initialize()
  },
  computed: {
    ...mapGetters({
      players: 'players/getPlayers'
    })
  },
  data () {
    return {
      gameMatrix: [],
      diagonals: [[], []],
      winner: null
    }
  },
  methods: {
    initialize () {
      this.winner = null
      this.gameMatrix = []
      
      for (let row = 0; row < this.size; row++) {
        this.gameMatrix.push([])
        
        // Initiation of diagonal index value
        this.diagonals[0].push([row,row])
        this.diagonals[1].push([row, (this.size - 1 - row)])

        for (let col = 0; col < this.size; col++) {
          this.gameMatrix[row].push(null)
        }
      }
    },
    boardClicked (row, col) {

      // Get the index of active player
      const playerIndex = this.players.findIndex(player => player.active)
      const player = this.players[playerIndex]

      const matrix = JSON.parse(JSON.stringify(this.gameMatrix))

      // Check if still don't have the winner
      if (!this.winner) {
        if (!matrix[row][col]) {
          matrix[row][col] = player
          this.gameMatrix = matrix
          if (this.isGameOver(matrix, row, col)) {
            this.$emit('onGameOver', player)
            this.winner = player
            alert(`${player.label.toUpperCase()} wins`)
          }
      
          let newTurnIndex = playerIndex + 1
          // Check if new index is more than players length
          if (newTurnIndex > this.players.length - 1) newTurnIndex = 0

          const newPlayers = this.players.map((player, index) => {
            return index === newTurnIndex ? {...player, active: true} : {...player, active: false}
          })

          this.$store.dispatch('players/submitPlayers', newPlayers)
          return true
        } else {
          // Check if still have null in the matrix
          if (this.gameMatrix.flat().some(doc => doc === null)) {
            alert('Already selected')
          } else {
            alert('Its a tie. It will restart.')
            this.initialize()
          }
          return false
        }
      } else {
        alert(`${this.winner.label.toUpperCase()} has won the game. Start a new game`)
        this.initialize()
        return false
      }
    },
    isGameOver (matrix, row, col) {
      let winner = this.checkHorizontalVertical(matrix, row, col) || this.checkHorizontalVertical(matrix, row, col, false) || this.checkDiagonal(matrix, row, col)
      return winner
    },
    checkHorizontalVertical (matrix, row, col, horizontal = true) {
      let winner = matrix[row][col]
      for (let line = 0; line < this.size; line++) {
        if (
          (horizontal && matrix[row][line] && matrix[row][line].label === winner.label) ||
          (!horizontal && matrix[line][col] && matrix[line][col].label === winner.label)
        ) {
          if (line < this.size - 1) continue
        } else {
          winner = null
          break
        }
      }
      return winner
    },
    checkDiagonal (matrix, row, col) {
    let winner = matrix[row][col]

    // Check if row and col on diagonal position
    const filters = this.diagonals.filter(diagonal => {
      return diagonal.find(doc => {
        return doc[0] === row && doc[1] === col
      })
    })
    
    if (filters.length) {
      diagonalScope:
      for (let diagonal = 0; diagonal < filters.length; diagonal++) {
        for (let cell = 0; cell < filters[diagonal].length; cell++) {
          const [diagonalRow, diagonalCol] = filters[diagonal][cell]
          if (matrix[diagonalRow][diagonalCol] && matrix[diagonalRow][diagonalCol].label === winner.label) {
            if (cell < filters[diagonal].length - 1) continue
            // If until last index have same label then it's the winner
            if (cell === filters[diagonal].length - 1) break diagonalScope
          } else {
            // Check if in the last index of diagonal then make winner null
            if (diagonal === filters.length - 1) {
              winner = null
            }
            break
          }
        }
      }
    } else {
      winner = null
    }
    return winner
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