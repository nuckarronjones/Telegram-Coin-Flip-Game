export enum choices {
  redPill = 'redPill',
  bluePill = 'bluePill',
}

export interface userSelectons {
  redPill: boolean;
  bluePill: boolean;
}

export interface userAmounts {
  userBet: number;
  userBalance: number;
}

export interface result{
    result: string,
    imagePath: string
}
