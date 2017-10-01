import { Component, EventEmitter, Input, Output } from '@angular/core';
import { State, NewState } from '../types/state';

@Component({
    selector: 'app-body',
    templateUrl: 'body.component.html',
    styleUrls: ['body.component.css']
})

export class BodyComponent {
    @Input() state: State;
    @Output() updatedState = new EventEmitter<NewState>();

    setState(newState: NewState): void {
        this.updatedState.emit(newState);
    }

    startGame(): void {
        setTimeout(() => this.setState({key: 'started', value: true}), 250);
    }

    onEvent(pageChange: boolean): void {
        this.state.started = pageChange;
    }
}

