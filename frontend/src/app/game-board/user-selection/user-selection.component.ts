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
  public currentGameState: GameStateModel | any = null;

  private _gameStateSubscription: Subscription | null = null;

  constructor(
    private _animationService: AnimationService,
    public gameState: GameState
  ){}

  ngOnInit(): void {
    this._gameStateSubscription = this.gameState.gameState$.subscribe((state)=>{
      this.currentGameState = state;
    })
  }
  
  public getUserSelection(selected: userOption):void{
    if(this.currentGameState.userCanSelect){
      this.gameState.updateUserSelection(selected);
      this.gameState.disableBetting(false);
    }
  }

}
