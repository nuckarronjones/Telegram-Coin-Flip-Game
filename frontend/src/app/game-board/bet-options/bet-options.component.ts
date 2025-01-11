import { Component } from '@angular/core';
import { GameState, GameStateModel } from '../../../services/game-state.service';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-bet-options',
  imports: [],
  templateUrl: './bet-options.component.html',
  styleUrl: './bet-options.component.scss',
})
export class BetOptionsComponent implements OnInit {
  public disableBetting: boolean = true;
  public state: GameStateModel | any = null;

  private _gameStateSubscription: Subscription | null = null;

  constructor(public gameState: GameState) {}

  ngOnInit(): void {
    this._gameStateSubscription = this.gameState.gameState$.subscribe(
      (state) => {
        this.state = state;
        this.disableBetting = this.state.disableBetting;
      }
    );
  }

  public placeBet(): void {
    this.gameState.placeBet();
  }
}
