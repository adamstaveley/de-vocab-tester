import { Component, EventEmitter, Input, Output } from '@angular/core';
import { State, GameState, NewState } from '../types/types';

@Component({
    selector: 'app-body',
    templateUrl: 'body.component.html',
    styleUrls: ['body.component.css']
})

export class BodyComponent {
    @Input() state: State;
    @Output() updatedState = new EventEmitter<NewState>();
    @Output() updatedGameState = new EventEmitter<GameState>();

    setState(newState: NewState): void {
        this.updatedState.emit(newState);
    }

    setGameState(newGameState: GameState) {
        this.updatedGameState.emit(newGameState);
    }

    startGame(): void {
        setTimeout(() => this.setState({key: 'started', value: true}), 250);
    }
}

