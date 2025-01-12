import { Injectable } from '@angular/core';
import {
  choices,
  userSelectons,
  userAmounts,
  result,
} from '../app/shared/enums/userOption';
import { BehaviorSubject } from 'rxjs';

export interface GameStateModel {
  spinnerState: boolean;
  userCanSelect: boolean;
  result: result;
  userOptionSelection: userSelectons;
  userAmounts: userAmounts;
  disableBetting: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private _gameStateSubject = new BehaviorSubject<GameStateModel>({
    spinnerState: false,
    disableBetting: true,
    userCanSelect: true,
    result: {
      result: '',
      imagePath: 'placeholder',
    },
    userAmounts: {
      userBet: 0,
      userBalance: 100,
    },
    userOptionSelection: {
      redPill: false,
      bluePill: false,
    },
  });
  gameState$ = this._gameStateSubject.asObservable();

  private _resetUserSelection() {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      userOptionSelection: {
        redPill: false,
        bluePill: false,
      },
    });
  }

  private _disableSpinner() {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      spinnerState: false,
    });
  }

  private _enableSpinner() {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      spinnerState: true,
    });
  }

  private _disableBetting() {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      disableBetting: true,
    });
  }

  private _setUserSelection(state: boolean) {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      userCanSelect: state,
    });
  }

  private _chooseResult() {
    const currentState = this._gameStateSubject.value;
    const choiceKeys = Object.keys(choices) as Array<keyof typeof choices>;
    const randomIndex = Math.floor(Math.random() * choiceKeys.length);
    const result = choiceKeys[randomIndex];

    const returnVal = {
      result,
      imagePath: result === choices.bluePill ? 'reveal-blue' : 'reveal-red',
    };

    this._gameStateSubject.next({
      ...currentState,
      result: returnVal,
    });
  }

  private _resetResult() {
    const currentState = this._gameStateSubject.value;

    this._gameStateSubject.next({
      ...currentState,
      result: {
        result: '',
        imagePath: 'placeholder',
      },
    });
  }

  private _resetRound() {
    this._resetUserSelection();
    this._setUserSelection(true);
    this._resetResult();
  }

  private _decideWinner() {
    const currentState = this._gameStateSubject.value;
    const userSelectedOption = Object.entries(currentState.userOptionSelection)
      .find(([key, value]) => value)?.[0]
      .toString();
    const outcome = currentState.result.result;
    const bet = currentState.userAmounts.userBet;
    let balance = currentState.userAmounts.userBalance;

    if (userSelectedOption == outcome) {
      balance += bet;
    } else {
      balance -= bet;
    }

    this._gameStateSubject.next({
      ...currentState,
      userAmounts: {
        ...currentState.userAmounts,
        userBalance: balance,
      },
    });
  }

  public enableBetting() {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      disableBetting: false,
    });
  }

  public updateUserSelection(selected: choices): void {
    const newSelection = {
      redPill: selected === choices.redPill,
      bluePill: selected === choices.bluePill,
    };

    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      userOptionSelection: newSelection,
    });
  }

  public placeBet(bet: number): void {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      userAmounts: {
        ...currentState.userAmounts,
        userBet: bet,
      },
    });
  }

  public startRound() {
    this._enableSpinner();
    this._disableBetting();
    this._setUserSelection(false);

    setTimeout(() => {
      this._chooseResult();
      this._disableSpinner();
      this._decideWinner();
    }, 1000);

    setTimeout(() => {
      this._resetRound();
    }, 3000);
  }
}
