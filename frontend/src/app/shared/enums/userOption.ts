export enum userOption{
    redPill = "redPill",
    bluePill = "bluePill"
}

export interface userSelectons{
    redPill : boolean;
    bluePill : boolean;
}

export interface userAmounts{
        userBet: number,
        userBalance: number
}