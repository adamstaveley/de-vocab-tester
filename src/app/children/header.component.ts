import { Component, EventEmitter, Input, Output } from '@angular/core';
import { State, NewState } from '../types/state';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent {
    @Input() state: State;
    @Output() updatedState = new EventEmitter<NewState>();

    setState(newState: NewState): void {
        this.updatedState.emit(newState);
    }
}

