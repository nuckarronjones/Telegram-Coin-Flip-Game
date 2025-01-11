import { Component } from '@angular/core';
import { AnimationService } from '../../../services/global-animation.service';
import { GameState, GameStateModel } from '../../../services/game-state.service';
import { userOption, userSelectons } from '../../shared/enums/userOption';
import { NgClass } from '@angular/common';
 import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-selection',
  standalone: true, 
  imports: [NgClass],
  templateUrl: './user-selection.component.html',
  styleUrl: './user-selection.component.scss',
  animations: [
    AnimationService.prototype.getSelectionAnimation.call(AnimationService)
  ]
})

export class UserSelectionComponent implements OnInit {

  public spinnerState: boolean = false;
  public userOption = userOption;
  public state: GameStateModel | any = null;

  private _gameStateSubscription: Subscription | null = null;

  constructor(
    private _animationService: AnimationService,
    public gameState: GameState
  ){}

  ngOnInit(): void {
    this._gameStateSubscription = this.gameState.gameState$.subscribe((state)=>{
      this.state = state;
    })
  }
  public getUserSelection(selected: userOption):void{
    this.gameState.updateUserSelection(selected);
    this.gameState.updateBettingState(false);
  }

}
