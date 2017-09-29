import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  language = 'de';
  level = 1;
  started = false;

  checkLanguageToggle(code: string): any {
    return this.language === code ? 'is-active' : null;
  }

  checkLevelToggle(code: number): any {
    return this.level === code ? 'is-active' : null;
  }

  setLanguage(code: string): void {
    this.language = code;
  }

  setLevel(code: number): void {
    this.level = code;
  }

  startGame(): void {
    setTimeout(() => this.started = true, 250);
  }

  onEvent(pageChange: boolean): void {
    this.started = pageChange;
  }

}
