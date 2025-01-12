import { Injectable } from '@angular/core';
import {
  userOption,
  userSelectons,
  userAmounts,
} from '../app/shared/enums/userOption';
import { BehaviorSubject } from 'rxjs';

export interface GameStateModel {
  spinnerState: boolean;
  userCanSelect: boolean;
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
    userAmounts: {
      userBet: 100,
      userBalance: 100,
    },
    userOptionSelection: {
      redPill: false,
      bluePill: false,
    },
  });

  gameState$ = this._gameStateSubject.asObservable();

  public disableSpinner() {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      spinnerState: false,
    });
  }

  public enableSpinner() {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      spinnerState: true,
    });
  }

  public enableBetting() {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      disableBetting: false,
    });
  }

  public disableBetting() {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      disableBetting: true,
    });
  }

  public updateUserSelection(selected: userOption): void {
    const newSelection = {
      redPill: selected === userOption.redPill,
      bluePill: selected === userOption.bluePill,
    };

    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      userOptionSelection: newSelection,
    });
  }

  public allowUserSelection() {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      userCanSelect: true,
    });
  }

  public disableUserSelection() {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      userCanSelect: false,
    });
  }

  public placeBet(bet: number): void {
    this._gameStateSubject.value.userAmounts.userBet = bet;
  }

  public resetGameState(): void {
    this._gameStateSubject.next({
      spinnerState: false,
      userCanSelect: true,
      userOptionSelection: {
        redPill: false,
        bluePill: false,
      },
      userAmounts: {
        userBet: 100,
        userBalance: 100,
      },
      disableBetting: true,
    });
  }
}
