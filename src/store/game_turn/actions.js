exports.submitGameTurn = ({
  commit
}, data) => {
  commit('setGameTurn', data)
}

exports.submitTurnIndex = ({
  commit
}, data) => {
  commit('setTurnIndex', data)
}