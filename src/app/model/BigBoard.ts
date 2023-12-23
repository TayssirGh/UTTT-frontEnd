import {SmallBoard} from "./SmallBoard";
import {CurrentPlayer} from "./CurrentPlayer";
import {State} from "./State";

export class BigBoard{
  boards : SmallBoard [][];
  currentPlayer: CurrentPlayer;
  winner : State;
  constructor() {
    this.boards = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => new SmallBoard())
    );
    this.currentPlayer = CurrentPlayer.PLAYER1;
    this.winner = State.NULL;
  }
}
