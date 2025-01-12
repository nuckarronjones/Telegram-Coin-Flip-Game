import { Component } from '@angular/core';
import {
  GameState,
  GameStateModel,
} from '../../../services/game-state.service';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userSelectons } from '../../shared/enums/userOption';

@Component({
  selector: 'app-bet-options',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bet-options.component.html',
  styleUrl: './bet-options.component.scss',
})
export class BetOptionsComponent implements OnInit {
  public disableBetting: boolean = true;
  public userBet: number = 0;
  public currentGameState: GameStateModel | any = null;

  private _gameStateSubscription: Subscription | null = null;

  constructor(public gameState: GameState) {}

  ngOnInit(): void {
    this._gameStateSubscription = this.gameState.gameState$.subscribe(
      (state) => {
        this.currentGameState = state;
        this.disableBetting = this.currentGameState.disableBetting;
      }
    );
  }

  public placeBet(): void {
    const userBalance = this.currentGameState.userAmounts.userBalance;
    const userHasSelectedOption = Object.values(
      this.currentGameState.userOptionSelection
    ).some((value) => value === true);

    if (this.userBet > userBalance || this.userBet <= 0) {
      alert(`Improper bet, please try again.`);
    } else {
      if(userHasSelectedOption){
        this.gameState.setSpinnerState(true);
        this.gameState.disableBetting(true);
        this.gameState.allowUserSelection(false);
      }
    }
  }
}
