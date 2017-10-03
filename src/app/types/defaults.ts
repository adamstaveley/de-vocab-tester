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
    hintCountTotal: 0,
    retryCount: 0,
    startTime: 0,
    endTime: 0,
    statusText: ''
};

