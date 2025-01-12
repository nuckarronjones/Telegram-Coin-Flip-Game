import { Injectable } from '@angular/core';
import { userOption, userSelectons, userAmounts } from '../app/shared/enums/userOption';
import { BehaviorSubject } from 'rxjs';

export interface GameStateModel {
  spinnerState: boolean;
  userCanSelect: boolean,
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
    userAmounts:{
      userBet: 100,
      userBalance: 100
    },
    userOptionSelection: {
      redPill: false,
      bluePill: false,
    }
  });

  gameState$ = this._gameStateSubject.asObservable();

  public setSpinnerState(state: boolean): void {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      spinnerState: state,
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

  public disableBetting(state: boolean): void {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      disableBetting: state,
    });
  }

  public allowUserSelection(state: boolean): void{
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      userCanSelect: state,
    });
  }

  public placeBet(bet : number): void {
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
      userAmounts:{
        userBet: 100,
        userBalance: 100
      },
      disableBetting: true,
    });
  }

}
