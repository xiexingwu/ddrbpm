export const diffs = ["b", "B", "D", "E", "C"] as const;
export type Diff = typeof diffs[number];

export type Levels = Record<Diff, number>
