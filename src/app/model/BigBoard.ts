import {SmallBoard} from "./SmallBoard";

export class BigBoard{
  boards : SmallBoard [][];
  constructor() {
    this.boards = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => new SmallBoard())
    );
  }
}
