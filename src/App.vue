<template>
  <div id="tic-tac-toe">
    <div class="span3 new_span">
      <div class="row">
        <h1 class="span3">Tic Tac Toe</h1>
        <ScoreBoards :players="players" />
      </div>
      <GameBoards :size="size" />
      <div class="clr">&nbsp;</div>
      <div class="row">
        <a href="#" id="reset" class="btn-success btn span3">Restart</a>
      </div>
    </div>
  </div>
</template>

<script>
import GameBoards from './components/GameBoards/GameBoards'
import ScoreBoards from './components/ScoreBoards/ScoreBoards'

export default {
  name: 'App',
  components: {
    GameBoards,
    ScoreBoards
  },
  data () {
    return {
      size: 3,
      players: [
        { label: 'o', color: 'primary', score: 0 },
        { label: 'x', color: 'info', score: 0 }
      ]
    }
  }
}
</script>

<style scoped>
/*******tic-tac-toe******/
#tic-tac-toe .disable {
  text-transform: uppercase;
  font-size: 30px;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
#tic-tac-toe #game li {
  float: left;
  padding: 0;
  list-style: none;
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  height: 60px;
  line-height: 60px;
  font-size: 40px;
  color: #ccc;
}
#tic-tac-toe #game li.disable {
  color: #fff;
}
#tic-tac-toe #game {
  float: left;
  padding: 0;
  clear: both;
}
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
.input-prepend span.pre_text {
  width: 55px;
}
.input-prepend .span1 {
  width: 93px;
}
.input-prepend {
  margin-bottom: 10px;
}
.clr {
  clear: both;
  height: 0;
}
#tic-tac-toe h1 {
  text-align: center;
  font-size: 28px;
}
#tic-tac-toe li::-moz-selection {
  background: none;
  color: #000;
}
#tic-tac-toe li::-webkit-selection {
  background: none;
  color: #000;
}
#tic-tac-toe {
  width: 220px;
  margin: 0 auto;
}
.input-append .win_times {
  background: #fff;
  width: 101px;
}
.input-append .win_text {
  width: 52px;
}
/*******tic-tac-toe END******/

</style>
