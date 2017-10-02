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

    answer = '';
    showResult = false;
    result: string;
    answered = false;
    feedback = false;

    constructor(private http: HttpClient) {
        this.wordObj = {
            word: '',
            translation: ''
        };

        this.gameState = Object.create(defaultGameState);
    }

    setState(newState: NewState): void {
        this.stateEmitter.emit(newState);
    }

    emitGameState(newGameState: GameState): void {
        this.gameStateEmitter.emit(newGameState);
    }

    changeStartedState(): void {
        this.fetchWord();
        if (this.state.started) {                                  //
            this.gameState = Object.create(defaultGameState);      // PLACEHOLDER
            this.emitGameState(this.gameState);                    //
        }
        setTimeout(() => this.setState({key: 'started', value: !this.state.started}), 250);
    }

    showHint(): void {
        if (this.gameState.hintCountCurrent <= this.wordObj.translation.replace(/\s\(irr\.\)/, '').length) {
            this.manageHints();
        }
    }

    manageHints(): void {
        if (this.gameState.hintCountCurrent < 1) {
            const irregular = this.wordObj.translation.search(/\(irr\.\)/) > -1;
            this.gameState.hint = this.wordObj.translation.replace(/\w/g, '_');
            if (irregular) { this.gameState.hint = this.gameState.hint.replace('(___.)', '(irr.)'); }
            this.gameState.hint += `(${this.wordObj.translation.length})`;
        } else {
            const index = this.randomIndex();
            this.insertNewCharacterHint(index);
        }
        this.gameState.hintCountCurrent ++;
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
        this.wordObj.translation.includes(this.answer) ? this.correctAnswer() : this.wrongAnswer();
    }

    correctAnswer() {
        this.gameState.playedCountCorrect ++;
        this.answer = '';
        this.nextWord();
    }

    wrongAnswer() {
        this.gameState.statusText = 'Incorrect!';
        this.answered = true;
    }

    retry() {
        this.gameState.statusText = '';
        this.answer = '';
        this.answered = false;
    }

    showAnswer() {
        this.answered = false;
        this.gameState.statusText = this.wordObj.translation;
        this.feedback = true;
    }

    nextWord(): void {
        this.fetchWord();
        this.gameState.hint = '';
        this.gameState.playedCountTotal ++;
        this.gameState.hintCountCurrent = 0;
        this.emitGameState(this.gameState);
    }

    fetchWord(): void  {
        const url = `http://localhost:8200/word/${this.state.language}/${this.state.level}`;
        this.http.get<WordResponse>(url).subscribe(res => this.wordObj = res);
    }
}
