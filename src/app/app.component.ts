import { Component } from '@angular/core';
import { State, NewState } from './types/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  state: State = {
    language: 'de',
    level: 1,
    started: false
  };

  constructor() {
    console.log(this.state);
    // this.state.language = 'de';
    // this.state.level = 1;
    // this.state.started = false;
  }

  setState(newState: NewState): void {
    this.state[newState.key] = newState.value;
  }
}
