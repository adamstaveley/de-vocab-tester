import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State, GameState, NewState, WordResponse } from '../types/types';
import { defaultGameState } from '../types/defaults';

@Component({
    selector: 'app-body',
    templateUrl: 'body.component.html',
    styleUrls: ['body.component.css']
})

export class BodyComponent {
    @Input() state: State;
    @Output() stateEmitter = new EventEmitter<NewState>();
    @Output() gameStateEmitter = new EventEmitter<GameState>();

    gameState: GameState;
    wordObj: WordResponse;

    hintCountCurrent: number;

    answer = '';
    answered = false;
    feedback = false;
    correct = false;

    constructor(private http: HttpClient) {
        this.wordObj = {
            word: '',
            translation: ''
        };

        this.gameState = Object.create(defaultGameState);

        this.hintCountCurrent = 0;
    }

    emitState(newState: NewState): void {
        this.stateEmitter.emit(newState);
    }

    emitGameState(newGameState: GameState): void {
        this.gameStateEmitter.emit(newGameState);
    }

    changeStartedState(): void {
        if (this.state.started) {
            // started -> finished (game -> end)
            this.emitState({key: 'finished', value: !this.state.finished});
            this.emitState({key: 'started', value: !this.state.started});
            if (this.answered || this.feedback) { this.gameState.playedCountTotal ++; }
            this.gameState.endTime = new Date().getTime();
        } else if (this.state.finished) {
            // finished -> none (end -> start)
            this.emitState({key: 'finished', value: !this.state.finished});
            this.gameState = Object.create(defaultGameState);
        } else {
            // none -> started (start -> game)
            this.gameState.startTime = new Date().getTime();
            this.fetchWord();
            setTimeout(() => this.emitState({key: 'started', value: !this.state.started}), 250);
        }
        this.emitGameState(this.gameState);
    }

    showHint(): void {
        console.log('showHint');
        console.log('hintCountCurrent:', this.hintCountCurrent);
        console.log('translationLen:', this.wordObj.translation.replace(/\s\(irr\.\)/, '').length);
        if (this.hintCountCurrent <= this.wordObj.translation.replace(/\s\(irr\.\)/, '').length) {
            this.manageHints();
        }
    }

    manageHints(): void {
        console.log('manageHints');
        if (this.hintCountCurrent < 1) {
            const irregular = this.wordObj.translation.search(/\(irr\.\)/) > -1;
            this.gameState.hint = this.wordObj.translation.replace(/\w/g, '_');
            if (irregular) { this.gameState.hint = this.gameState.hint.replace('(___.)', '(irr.)'); }
            this.gameState.hint += `(${this.wordObj.translation.length})`;
        } else {
            const index = this.randomIndex();
            this.insertNewCharacterHint(index);
        }
        this.hintCountCurrent ++;
        this.gameState.hintCountTotal ++;
        this.emitGameState(this.gameState);
    }

    randomIndex(): number {
        const index = Math.floor(Math.random() * this.wordObj.translation.length);
        return this.gameState.hint[index].search('_') > -1 ? index : this.randomIndex();
    }

    insertNewCharacterHint(index: number): void {
        const hint = this.gameState.hint;
        const newChar = this.wordObj.translation[index];
        this.gameState.hint = hint.substr(0, index) + newChar + hint.substr(index + newChar.length);
    }

    submitTranslation(): void {
        if (this.wordObj.translation.includes(this.answer)) {
            this.gameState.statusText = 'Correct!';
            this.correct = true;
        } else {
            this.gameState.statusText = 'Incorrect!';
            this.answered = true;
        }
        this.emitGameState(this.gameState);
    }

    incorrectOptions(choice: string): void {
        this.answered = false;
        switch (choice) {
            case 'retry':
                this.gameState.statusText = '';
                this.answer = '';
                this.gameState.retryCount ++;
                break;
            case 'show':
                this.gameState.statusText = this.wordObj.translation;
                this.feedback = true;
        }
    }

    answerFeedback(positive: boolean): void {
        if (positive) {
            this.correct = true;
            this.nextWord();
        } else {
            this.nextWord();
        }
        this.feedback = false;
    }

    nextWord(): void {
        this.fetchWord();

        this.gameState.hint = '';
        this.gameState.statusText = '';
        if (this.correct) { this.gameState.playedCountCorrect++; }
        this.gameState.playedCountTotal ++;
        this.emitGameState(this.gameState);

        this.answer = '';
        this.hintCountCurrent = 0;
        this.correct = false;
        this.answered = false;
        this.feedback = false;
    }

    fetchWord(): void  {
        const url = `http://localhost:8200/word/${this.state.language}/${this.state.level}`;
        this.http.get<WordResponse>(url).subscribe(res => this.wordObj = res);
    }
}
