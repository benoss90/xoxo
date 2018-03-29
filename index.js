import inquirer from 'inquirer'
import { ai } from './game/ai'
import gameReducer, { move } from './game'
import { createStore } from 'redux'

const printBoard = () => {
	const { board } = game.getState()
	for (let r = 0; r != 3; ++r) {
		for (let c = 0; c != 3; ++c) {
			process.stdout.write(board.getIn([r, c], '_'))
		}
		process.stdout.write('\n')
	}
}

const getInput = player => async () => {
	const { turn } = game.getState()
	if (turn !== player) return
	const ans = await inquirer.prompt([
		{
			type: 'input',
			name: 'coord',
			message: `${turn}'s move (row,col):`
		}
	])
	const [row = 0, col = 0] = ans.coord.split(/[,\s+]/).map(x => +x)
	game.dispatch(move(turn, [row, col]))
}

const checkForWinner = () => {
	const { winner } = game.getState()
	switch (winner) {
		case 'draw':
			console.log('We have a tie.')
			process.exit(0)
			break
		case null:
			break
		default:
			console.log(`${winner} won!`)
			process.exit(0)
	}
}
// Create the store
const game = createStore(gameReducer)

// Debug: Print the state

game.subscribe(printBoard)
game.subscribe(getInput('X'))
game.subscribe(ai('O'))
game.subscribe(checkForWinner)

// game.subscribe(() => {
//   const { error } = game.getState();
//   if (error) console.log(error);
// });

// We dispatch a dummy START action to call all our
// subscribers the first time.
game.dispatch({ type: 'START' })
