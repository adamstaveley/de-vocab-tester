export interface State {
    language: string;
    level: number;
    started: boolean;
    finished: boolean;
}

export interface GameState {
    correct: number;
    total: number;
    hint: string;
    hintCountCurrent: number;
    hintCountTotal: number;
}

export interface NewState {
    key: string;
    value: any;
}

export interface WordResponse {
    word: string;
    translation: string;
}
