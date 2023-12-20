import {SmallBoard} from "./SmallBoard";
import {CurrentPlayer} from "./CurrentPlayer";

export class BigBoard{
  boards : SmallBoard [][];
  currentPlayer: CurrentPlayer;
  constructor() {
    this.boards = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => new SmallBoard())
    );
    this.currentPlayer = CurrentPlayer.PLAYER1;
  }
}
