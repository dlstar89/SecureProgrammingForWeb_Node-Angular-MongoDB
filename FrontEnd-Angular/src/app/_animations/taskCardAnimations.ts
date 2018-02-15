import { animate, animateChild, keyframes, query, state, style, transition, trigger, stagger } from '@angular/animations';

export const cardFadeIn =
  trigger('cardFadeIn', [
    transition('* => *', [
      query(':enter', style({ opacity: 0 }), { optional: true }),
      query(':enter', stagger('100ms', [animate('1s', style({ opacity: 1 }))]), { optional: true })
    ])
  ]);
