exports.submitPlayers = ({
  commit
}, data) => {
  commit('setPlayers', data)
}