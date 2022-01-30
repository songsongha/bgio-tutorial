import { INVALID_MOVE } from 'boardgame.io/core';

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
    const positions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]
  
    const isRowComplete = row => {
      const symbols = row.map(i => cells[i]);
      return symbols.every(i => i !== null && i === symbols[0])
    }
  
    return positions.map(isRowComplete).some(i => i === true)
  }
  
  // Return true if all `cells` are occupied.
  function IsDraw(cells) {
    return cells.filter(c => c === null).length === 0;
  }

export const TicTacToe = {
    setup: () => ({ cells: Array(9).fill(null) }),

    turn: {
        minMoves: 1,
        maxMoves: 1,
      },

    moves: {
      clickCell: (G, ctx, id) => {
        if (G.cells[id] !== null) {
            return INVALID_MOVE
          }
        G.cells[id] = ctx.currentPlayer
      },
    },

      /* 
      endIf takes a function that determines if the game is over. If it returns anything at all, 
      the game ends and the return value is available at ctx.gameover.
      */

    endIf: (G, ctx) => {
        if (IsVictory(G.cells)) {
          return { winner: ctx.currentPlayer }
        }
        if (IsDraw(G.cells)) {
          return { draw: true }
        }
      },
    // bot function
    ai: {
        // enumerate function should return an array of possible moves
        enumerate: (G, ctx) => {
        let moves = [];
        for (let i = 0; i < 9; i++) {
            if (G.cells[i] === null) {
            moves.push({ move: 'clickCell', args: [i] });
            }
        }
        return moves;
        },
    },
  }

  /* 
    The setup function will receive ctx as its first argument. 
    This is useful if you need to customize the initial state based on some field 
    in ctx — the number of players, for example — but we don’t need that for Tic-Tac-Toe.

    Setup function will set the initial value of the game state G, and a moves object containing the moves that make up the game.
    A move function receives the game state G and updates it to the desired new state. 
    It also receives ctx, an object managed by boardgame.io that contains metadata like turn and currentPlayer. 
    After G and ctx, moves can receive arbitrary arguments that you pass in when making the move.

    In Tic-Tac-Toe, we only have one type of move and we will name it clickCell. It will take the ID of the cell that was clicked 
    and update that cell with the ID of the player who clicked it.

    */