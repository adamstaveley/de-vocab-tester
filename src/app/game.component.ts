import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: []
})

export class GameComponent {
    @Input() language: string;
    @Input() level: number;

    @Output() pageChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    previousScreenChange() {
        this.pageChange.emit(false);
    }
}
