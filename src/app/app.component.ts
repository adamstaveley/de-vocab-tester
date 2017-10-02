import { Component } from '@angular/core';
import { State, GameState, NewState } from './types/types';
import { defaultState, defaultGameState } from './types/defaults';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  state: State;
  gameState: GameState;
  info: string;

  constructor() {
    this.state = Object.create(defaultState);
    this.gameState = Object.create(defaultGameState);
    this.info = 'a game hint';
  }

  setState(newState: NewState): void {
    this.state[newState.key] = newState.value;
  }

  setGameState(newGameState) {
    this.gameState = newGameState;
  }
}
