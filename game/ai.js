import reducer, {move, bad} from '.'

/**
 * moves(State) -> [...Action]
 *
 * Return an array of actions which are valid moves from the given state.
 */
export const moves = game => {
  const arr = [];

  for(let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if(!bad())
    }
  }
  return arr;
} // TODO

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
  // TODO
}

/**
 * play(state: State) -> Action
 *
 * Return the best action for the current player.
 */
export default state => undefined // TODO
