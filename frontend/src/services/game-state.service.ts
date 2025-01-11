import { Injectable } from '@angular/core';
import { userOption, userSelectons } from '../app/shared/enums/userOption';
import { BehaviorSubject } from 'rxjs';

export interface GameStateModel {
  spinnerState: boolean;
  userOptionSelection: userSelectons;
  disableBetting: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private _gameStateSubject = new BehaviorSubject<GameStateModel>({
    spinnerState: false,
    userOptionSelection: {
      redPill: false,
      bluePill: false,
    },
    disableBetting: true,
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

  public updateBettingState(state: boolean): void {
    const currentState = this._gameStateSubject.value;
    this._gameStateSubject.next({
      ...currentState,
      disableBetting: state,
    });
  }

  public placeBet(): void {
    this.setSpinnerState(true);
  }

  public resetGameState(): void {
    this._gameStateSubject.next({
      spinnerState: false,
      userOptionSelection: {
        redPill: false,
        bluePill: false,
      },
      disableBetting: true,
    });
  }

  // private _spinnerStateSubject = new BehaviorSubject<boolean>(false);
  // spinnerState$ = this._spinnerStateSubject.asObservable();

  // private _userOptionSelectionSubject = new BehaviorSubject<userSelectons>({
  //     redPill: false,
  //     bluePill: false
  // });
  // selectionSubject$ = this._userOptionSelectionSubject.asObservable();

  // private _bettingSubject = new BehaviorSubject<boolean>(true);
  // disableBetting$ = this._spinnerStateSubject.asObservable();

  // public userSelection(selected : userOption):void{
  //     if (selected === userOption.redPill){
  //         this._userOptionSelectionSubject.next({
  //             redPill: true,
  //             bluePill: false
  //         });
  //     }else{
  //         this._userOptionSelectionSubject.next({
  //             redPill: false,
  //             bluePill: true
  //         });
  //     }
  // }

  // public placeBet():void{
  //     this._spinnerStateSubject.next(true);
  // }
  //Bet amount
  //User balance
  //Random outcome
  //Detect if user won or not
}
