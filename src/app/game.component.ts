import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: []
})

export class GameComponent {
    @Input() language: string;
    @Input() level: number;
}
