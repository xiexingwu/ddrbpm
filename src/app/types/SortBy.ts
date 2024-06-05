export const sortBys = ["Version" , "Name" , "Level"] as const;
export type SortBy = typeof sortBys[number];

