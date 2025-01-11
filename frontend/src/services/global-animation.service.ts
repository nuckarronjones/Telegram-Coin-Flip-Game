import { Injectable } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Injectable({
  providedIn: 'root',
})
export class AnimationService {

  getSelectionAnimation() {
    return trigger('selectionAnimation', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
          opacity: .7,
        })
      ),
      state(
        'selected',
        style({
          transform: 'scale(1.1)',
          opacity: 1.1,
        })
      ),

      transition('normal <=> selected', [animate('.3s ease-out')]),
    ]);
  }

}
