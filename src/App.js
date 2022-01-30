import { Client } from 'boardgame.io/react'
import { TicTacToe } from './Game'
import { TicTacToeBoard } from './Board'

const App = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
});

export default App

/* You can turn off the Debug Panel by passing debug: false in the Client config. */

