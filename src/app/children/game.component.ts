import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewState } from '../types/state';

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: []
})

export class GameComponent {
    @Input() state;

    @Output() pageChange = new EventEmitter<NewState>();

    previousScreen() {
        this.pageChange.emit({key: 'started', value: false});
    }
}
