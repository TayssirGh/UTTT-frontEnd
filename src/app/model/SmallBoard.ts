import {State} from "./State";

export class SmallBoard{
  board : State [][];
  winner : State;
  constructor() {
    this.board = [
      [State.NULL, State.NULL, State.NULL],
      [State.NULL, State.NULL, State.NULL],
      [State.NULL, State.NULL, State.NULL],
    ]
    this.winner = State.NULL;
  }
}
