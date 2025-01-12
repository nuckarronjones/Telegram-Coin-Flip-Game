import { Component } from '@angular/core';
import { GameState, GameStateModel } from '../../services/game-state.service';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{
  constructor(public gamestate: GameState){}

  private _userBalanceSubscription: Subscription | null = null;
  public currentGameState: GameStateModel | null = null;
  public userBalance: number = 0;

  ngOnInit(): void {
    this._userBalanceSubscription = this.gamestate.gameState$.subscribe((state)=>{
      this.currentGameState = state;
      this.userBalance = this.currentGameState.userAmounts.userBalance
    })
  }

}
