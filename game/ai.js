import reducer, {move, bad} from '.'

/**
 * moves(State) -> [...Action]
 *
 * Return an array of actions which are valid moves from the given state.
 */
const COORDS = [
  [0, 0], [0, 1], [0, 2],
  [1, 0], [1, 1], [1, 2],
  [2, 0], [2, 1], [2, 2]
]

export const moves = game => moves[game.turn].filter(move => !bad(game, move))

moves.X = COORDS.map(coord => move('X', coord))
moves.O = COORDS.map(coord => move('O', coord))

/**
 * score(game: State, move: Action) -> Number
 *
 * Given a game state and an action, return a score for how good
 * a move the action would be for the player whose turn it is.
 *
 * Scores will be numbers from -1 to +1. 1 is a winning state, -1
 * is state from which we can only lose.
 */
const score = (game, move) => {
  const future = reducer(game, move)
  if(future.winner === move.player) return 1
  if(future.winner === 'draw') return 0
  if(future.winner === null) {
    const possibleMoves = moves(future)
    const scoresOfPossibleMoves = possibleMoves.map(move => score(move))
    const best = -Math.max(scoresOfPossibleMoves)
    return best
  }
}

/**
 * play(state: State) -> Action
 *
 * Return the best action for the current player.
 */
export default state => moves(state)
  .map(move => Object.assign({}, move, {
    score: score(state, move)
  }))
  .sort((a, b) => b.score - a.score)[0]
