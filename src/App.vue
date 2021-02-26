<template>
  <div id="tic-tac-toe">
    <!-- <div class="span3 new_span"> -->
      <div class="row header">
        <h1 class="span3">Tic Tac Toe</h1>
        <ScoreBoards />
      </div>
      <GameBoards ref="gameBoards" :size="size" @onGameOver="gameOverHandler" />
      <div class="clr">&nbsp;</div>
      <div class="row">
        <a href="#" id="reset" class="btn-success btn span3" @click="restartHandler">Restart</a>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import GameBoards from './components/GameBoards/GameBoards'
import ScoreBoards from './components/ScoreBoards/ScoreBoards'

export default {
  name: 'App',
  components: {
    GameBoards,
    ScoreBoards
  },
  mounted () {
    const players = [
      { label: 'o', color: 'primary', score: 0, active: true },
      { label: 'x', color: 'info', score: 0 }
    ]
    this.$store.dispatch('players/submitPlayers', players)
  },
  computed: {
    ...mapGetters({
      players: 'players/getPlayers'
    })
  },
  data () {
    return {
      size: 3
    }
  },
  methods: {
    gameOverHandler (winner) {
      if (winner) {
        const newPlayer = this.players.map(player => {
          return player.label === winner.label ? { ...player, score: player.score + 1 } : { ...player }
        })
        // this.players = newPlayer
        this.$store.dispatch('players/submitPlayers', newPlayer)
      }
    },
    restartHandler (e) {
      e.preventDefault()
      this.$refs.gameBoards.initialize()
    }
  }
}
</script>

<style scoped>
/*******tic-tac-toe******/
.new_span {
  width: 226px;
}
#tic-tac-toe #reset {
  padding: 5px 10px;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  clear: both;
  cursor: pointer;
  float: left;
  text-align: center;
  text-transform: uppercase;
  outline: none;
  width: 204px;
}
.clr {
  clear: both;
  height: 0;
}
#tic-tac-toe h1 {
  text-align: center;
  font-size: 28px;
}
#tic-tac-toe {
  display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	align-content: center;

  width: 90%;
  margin: 0 auto;
}
.header {
  display: flex;
	flex-direction: column;
}
/*******tic-tac-toe END******/

</style>
