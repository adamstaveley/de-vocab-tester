import { Component } from '@angular/core';
import { State, GameState, NewState } from './types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  state: State;
  gameState: GameState;

  constructor() {
    this.state = {
      language: 'de',
      level: 1,
      started: false,
      finished: false
    };

    this.gameState = {
      correct: 0,
      total: 0,
      hint: '',
      hintCountCurrent: 0,
      hintCountTotal: 0
    };
  }

  setState(newState: NewState): void {
    this.state[newState.key] = newState.value;
  }

  setGameState(newGameState) {
    this.gameState = newGameState;
  }
}
