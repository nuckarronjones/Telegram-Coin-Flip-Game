import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { BetOptionsComponent } from './bet-options/bet-options.component';

@Component({
  selector: 'app-game-board',
  imports: [HeaderComponent, UserSelectionComponent, BetOptionsComponent],
  standalone: true,
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {

}
