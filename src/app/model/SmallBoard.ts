import {State} from "./State";

export class SmallBoard{
  board : State [] [];
  constructor() {
    this.board = [
      [State.NULL, State.NULL, State.NULL],
      [State.NULL, State.NULL, State.NULL],
      [State.NULL, State.NULL, State.NULL],
    ]
  }
}
