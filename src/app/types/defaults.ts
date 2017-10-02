import { State, GameState } from './types';

export let defaultState: State = {
    language: 'de',
    level: 1,
    started: false,
    finished: false
};

export let defaultGameState: GameState = {
    playedCountCorrect: 0,
    playedCountTotal: 0,
    hint: '',
    hintCountCurrent: 0,
    hintCountTotal: 0,
    startTime: new Date().getTime(),
    endTime: 0,
    statusText: ''
};

