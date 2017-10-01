import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State, GameState, NewState, WordResponse } from '../types/types';

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: []
})

export class GameComponent implements OnInit {
    @Input() state: State;
    @Output() gameStateEmitter = new EventEmitter<GameState>();

    gameState: GameState;
    wordObj: WordResponse;

    constructor(private http: HttpClient) {
        this.wordObj = {
            word: '',
            translation: ''
        };

        this.gameState = {
            correct: 0,
            total: 0,
            hint: '',
            hintCountCurrent: 0,
            hintCountTotal: 0,
        };
    }

    ngOnInit(): void {
        this.fetchWord();
    }

    emitGameState(newGameState: GameState): void {
        this.gameStateEmitter.emit(newGameState);
    }

    showHint(): void {
        if (this.gameState.hintCountCurrent <= this.wordObj.translation.length) {
            this.manageHints();
        }
    }

    manageHints(): void {
        if (this.gameState.hintCountCurrent < 1) {
            this.gameState.hint = this.wordObj.translation.replace(/\w/g, '_');
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

    nextWord(): void {
        this.fetchWord();
        this.gameState.hint = '';
        this.gameState.total ++;
        this.gameState.hintCountCurrent = 0;
        this.emitGameState(this.gameState);
    }

    fetchWord(): void  {
        const url = `http://localhost:8200/word/${this.state.language}/${this.state.level}`;
        this.http.get<WordResponse>(url).subscribe(res => this.wordObj = res);
    }
}
