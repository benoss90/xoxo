import {Map} from 'immutable'

const initialState = {
  board: Map(),
  turn: 'X',
  winner: null,
  error: null
};

const MOVE = 'MOVE';

const bad = (state, action) => {
  let error;
  if (action.player !== state.turn) {
    error = `Hey ${action.player}, wait your turn!`
  }
  const validCoords = [0, 1, 2];
  if (validCoords.indexOf(action.position[0]) < 0 || validCoords.indexOf(action.position[1]) < 0) {
    error = `
      Sorry, that is not a valid position.
      Please enter two numbers between 0 and 2, separated by a comma.
    `;
  }
  const {board} = state;
  if (board.hasIn(action.position)) {
    error = `Sorry, that place is already taken.`;
  }
  if (error) {
    console.log(error);
    return error;
  }
  return null;
}

export const move = (player, position) => ({type: MOVE, position, player});

const streak = (board, firstCoord, secondCoord, thirdCoord) => {
  const valueAtFirst = board.getIn(firstCoord);
  const valueAtSecond = board.getIn(secondCoord);
  const valueAtThird = board.getIn(thirdCoord);

  if (valueAtFirst !== undefined && valueAtFirst === valueAtSecond && valueAtSecond === valueAtThird) {
    return valueAtFirst;
  } else {
    return undefined;
  }
};

export function winner(board) {

  let diagDown = streak(board, [0, 0], [1, 1], [2, 2]);
  if(diagDown) return diagDown;

  let diagUp = streak(board, [0, 2], [1, 1], [2, 0]);
  if (diagUp) return diagUp;

  let topRow = streak(board, [0, 0], [0, 1], [0, 2]);
  if (topRow) return topRow;

  let midRow = streak(board, [1, 0], [1, 1], [1, 2]);
  if (midRow) return midRow;

  let bottomRow = streak(board, [2, 0], [2, 1], [2, 2]);
  if (bottomRow) return bottomRow;

  let leftCol = streak(board, [0, 0], [1, 0], [2, 0]);
  if (leftCol) return leftCol;

  let midCol = streak(board, [0, 1], [1, 1], [2, 1]);
  if (midCol) return midCol;

  let rightCol = streak(board, [0, 2], [1, 2], [2, 2]);
  if (rightCol) return rightCol;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
      if(!board.hasIn([r,c])) return null;
    }
  }

  return 'draw';
}

function turnReducer(turn = 'X', action) {
  if (action.type === MOVE) return turn === 'X' ? 'O' : 'X';
  return turn;
}

function boardReducer(board = Map(), action) {
  if (action.type === MOVE) return board.setIn(action.position, action.player);
  return board;
}

export default function reducer(state = initialState, action) {
  if (action.type === MOVE) {
    const error = bad(state, action);
    if (error !== null) {
      const newState = Object.assign({}, state, {error});
      return newState;
    }
    const updatedBoard = boardReducer(state.board, action);
    return {
      board: updatedBoard,
      turn: turnReducer(state.turn, action),
      winner: winner(updatedBoard),
      error: null
    };
  }
  else {
    return state;
  }
}
