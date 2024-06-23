/* Bpm */
export type Bpm = [number] | [number, number];

/* Read speed */
export type ReadSpeed = number;
export const speedMods = Array.from(Array(155).keys(), (_, i) =>
    round(0.25 + 0.05 * i, 2),
);
export type SpeedMod = (typeof speedMods)[number];

const speedModsClassic = [
    0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3, 3.25, 3.5,
    3.75, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8,
];

export function fmtSpeedMod(speedMod: SpeedMod): string {
    let str = speedMod.toFixed(2);

    if (str.endsWith("0")) str = str.slice(0, -1);
    if (str.endsWith("0")) str = str.slice(0, -1);
    if (str.endsWith(".")) str = str.slice(0, -1);

    return str;
}

function guessSpeedModClassic(bpm: number, readSpeed: number) {
    let guess = Math.min(0.25, Math.floor(readSpeed / bpm));
    while (guess <= 7.5) {
        const nextGuess = guess + (guess < 4.0 ? 0.25 : 0.5);
        if (readSpeed - nextGuess * bpm < 0) {
            break;
        }
        guess = nextGuess;
    }
    return guess;
}

export function guessSpeedMod(bpm: number, readSpeed: number) {
    let guess = Math.min(0.25, Math.floor(readSpeed / bpm));
    while (guess <= 7.95) {
        const nextGuess = guess + 0.05;
        if (readSpeed - nextGuess * bpm < 0) {
            break;
        }
        guess = nextGuess;
    }
    return guess;
}

function round(num: number, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = num * p * (1 + Number.EPSILON);
    return Math.round(n) / p;
}
