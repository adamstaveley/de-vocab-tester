import { Component, EventEmitter, Input, Output } from '@angular/core';
import { State, GameState, NewState } from '../types/types';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent {
    @Input() state: State;
    @Input() gameState: GameState;
    @Output() updatedState = new EventEmitter<NewState>();

    setState(newState: NewState): void {
        this.updatedState.emit(newState);
    }
}

