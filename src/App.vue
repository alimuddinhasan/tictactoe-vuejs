<template>
  <div id="tic-tac-toe">
    <div class="row header">
      <h1 class="span3">Tic Tac Toe</h1>
      <a v-if="!showSettingForm" class="btn btn-mini span3 btn-setting" href="#" @click="showSettingHandler"><i class="icon-cog"></i> Setting</a>

    </div>
    <div class="row header" v-show="showSettingForm">
      <label>Size</label>
      <input type="text" v-model="sizeSetting" class="setting-input">
      <span v-if="isFieldError('sizeSetting')"  class="text-error">{{ validate('sizeSetting') }}</span>
      <a href="#" class="btn-default btn" @click="cancelUpdateSize">Cancel</a>
      <a href="#" class="btn-primary btn" @click="updateSize">Set and Start!</a>
    </div>
    
    <div class="row header" v-show="!showSettingForm">
      <ScoreBoards />
    </div>
    <GameBoards ref="gameBoards" :size="size" @onGameOver="gameOverHandler" v-show="!showSettingForm" />
    <div class="clr" v-show="!showSettingForm">&nbsp;</div>
    <div class="row" v-show="!showSettingForm">
      <a href="#" id="reset" class="btn-success btn span3" @click="restartHandler">Restart</a>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, numeric, minValue, integer } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import _ from 'lodash'

import GameBoards from './components/GameBoards/GameBoards'
import ScoreBoards from './components/ScoreBoards/ScoreBoards'

export default {
  name: 'App',
  mixins: [validationMixin],
  validations: {
    sizeSetting: {
      required,
      numeric,
      minValue: minValue(2),
      integer
    }
  },
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
      size: 3,
      sizeSetting: null,
      showSettingForm: false
    }
  },
  methods: {
    cancelUpdateSize (e) {
      e.preventDefault()
      this.sizeSetting = null
      this.showSettingForm = false
    },
    updateSize (e) {
      e.preventDefault()
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.size = Number(this.sizeSetting)
        this.showSettingForm = false
      }
    },
    gameOverHandler (winner) {
      if (winner) {
        const newPlayer = this.players.map(player => {
          return player.label === winner.label ? { ...player, score: player.score + 1 } : { ...player }
        })
        this.$store.dispatch('players/submitPlayers', newPlayer)
      }
    },
    showSettingHandler (e) {
      e.preventDefault()
      this.sizeSetting = this.size
      this.showSettingForm = true
    },
    restartHandler (e) {
      if (e) {
        e.preventDefault()
      }
      this.$refs.gameBoards.initialize()
    },
    validate (field) {
      if (_.get(this.$v, field)?.required === false) return 'Field is required'
      if (_.get(this.$v, field)?.numeric === false) return 'Must be a number'
      if (_.get(this.$v, field)?.minValue === false) return 'Must be higher than 1'
      if (_.get(this.$v, field)?.integer === false) return 'Must be an integer'
    },
    isFieldError (field) {
      return _.get(this.$v, field)?.$error
    },
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

  /* width: 90%; */
  margin: 0 auto;
}
.header {
  display: flex;
	flex-direction: column;
}

.btn-setting {
  margin-bottom: 2em;
}

.setting-input {
  /* width: 100%; */
  text-align: center;
  font-size: 1.2em;
  padding: .2em;
}
/*******tic-tac-toe END******/

</style>
