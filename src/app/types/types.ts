export interface State {
    language: string;
    level: number;
    started: boolean;
    finished: boolean;
}

export interface GameState {
    playedCountCorrect: number;
    playedCountTotal: number;
    hint: string;
    hintCountCurrent: number;
    hintCountTotal: number;
    startTime: number;
    endTime: number;
    statusText: string;
}

export interface NewState {
    key: string;
    value: any;
}

export interface WordResponse {
    word: string;
    translation: string;
}
