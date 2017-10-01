import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  state = {
    language: 'de',
    level: 1,
    started: false
  };

  checkLanguageToggle(code: string): any {
    return this.state.language === code ? 'is-active' : null;
  }

  setState(key: string, value: any): void {
    this.state[key] = value;
  }

  startGame(): void {
    setTimeout(() => this.state.started = true, 250);
  }

  onEvent(pageChange: boolean): void {
    this.state.started = pageChange;
  }

}
