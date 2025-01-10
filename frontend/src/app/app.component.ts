import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GameBoardComponent } from './game-board/game-board.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NavBarComponent, GameBoardComponent],
  standalone: true,
})
export class AppComponent {
  
}
